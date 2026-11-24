import { aramaIcinSadelestir } from './aramaMetni';
import type { EbeveynIliskisi, Kisi, Soyagaci } from './soyagaciSemasi';

export interface KaynakliKisi {
  kisi: Kisi;
  kaynak: string;
}

export interface Akrabalar {
  ebeveynler: Kisi[];
  alternatifEbeveynler: KaynakliKisi[];
  esler: Kisi[];
  cocuklar: Kisi[];
  alternatifCocuklar: KaynakliKisi[];
}

interface Dizin {
  kisiler: Map<string, Kisi>;
  anaEbeveynler: Map<string, string[]>;
  anaCocuklar: Map<string, string[]>;
  esler: Map<string, string[]>;
  birliktelikler: Set<string>;
  alternatifEbeveynler: Map<string, EbeveynIliskisi[]>;
  alternatifCocuklar: Map<string, EbeveynIliskisi[]>;
}

const ciftAnahtari = (a: string, b: string) => [a, b].sort().join('+');

const dizinler = new WeakMap<Soyagaci, Dizin>();

function ekle<T>(harita: Map<string, T[]>, anahtar: string, deger: T) {
  const liste = harita.get(anahtar);
  if (liste) liste.push(deger);
  else harita.set(anahtar, [deger]);
}

function dizin(veri: Soyagaci): Dizin {
  const kayitli = dizinler.get(veri);
  if (kayitli) return kayitli;
  const yeni: Dizin = {
    kisiler: new Map(veri.kisiler.map((kisi) => [kisi.kimlik, kisi])),
    anaEbeveynler: new Map(),
    anaCocuklar: new Map(),
    esler: new Map(),
    birliktelikler: new Set(),
    alternatifEbeveynler: new Map(),
    alternatifCocuklar: new Map(),
  };
  for (const iliski of veri.iliskiler) {
    if (iliski.tur === 'es') {
      const [a, b] = iliski.kisiler;
      ekle(yeni.esler, a, b);
      ekle(yeni.esler, b, a);
      if (iliski.birliktelik) yeni.birliktelikler.add(ciftAnahtari(a, b));
    } else if (iliski.anlati === 'ana') {
      ekle(yeni.anaEbeveynler, iliski.cocuk, iliski.ebeveyn);
      ekle(yeni.anaCocuklar, iliski.ebeveyn, iliski.cocuk);
    } else {
      ekle(yeni.alternatifEbeveynler, iliski.cocuk, iliski);
      ekle(yeni.alternatifCocuklar, iliski.ebeveyn, iliski);
    }
  }
  dizinler.set(veri, yeni);
  return yeni;
}

function gez(baslangic: string, komsular: Map<string, string[]>): Set<string> {
  const bulunan = new Set<string>();
  const kuyruk = [...(komsular.get(baslangic) ?? [])];
  while (kuyruk.length > 0) {
    const kimlik = kuyruk.shift()!;
    if (bulunan.has(kimlik) || kimlik === baslangic) continue;
    bulunan.add(kimlik);
    kuyruk.push(...(komsular.get(kimlik) ?? []));
  }
  return bulunan;
}

function kisilereCevir(veri: Soyagaci, kimlikler: string[] | undefined): Kisi[] {
  const { kisiler } = dizin(veri);
  return [...new Set(kimlikler ?? [])].map((kimlik) => kisiler.get(kimlik)).filter((kisi): kisi is Kisi => Boolean(kisi));
}

export function atalar(veri: Soyagaci, kimlik: string): Set<string> {
  return gez(kimlik, dizin(veri).anaEbeveynler);
}

export function akrabalar(veri: Soyagaci, kimlik: string): Akrabalar {
  const d = dizin(veri);
  const kaynakliKisiler = (iliskiler: EbeveynIliskisi[] | undefined, uc: 'ebeveyn' | 'cocuk') =>
    (iliskiler ?? []).flatMap((iliski) => {
      const kisi = d.kisiler.get(iliski[uc]);
      return kisi ? [{ kisi, kaynak: iliski.kaynak }] : [];
    });
  return {
    ebeveynler: kisilereCevir(veri, d.anaEbeveynler.get(kimlik)),
    alternatifEbeveynler: kaynakliKisiler(d.alternatifEbeveynler.get(kimlik), 'ebeveyn'),
    alternatifCocuklar: kaynakliKisiler(d.alternatifCocuklar.get(kimlik), 'cocuk'),
    esler: kisilereCevir(veri, d.esler.get(kimlik)),
    cocuklar: kisilereCevir(veri, d.anaCocuklar.get(kimlik)),
  };
}

export function kayittanKisi(veri: Soyagaci, bolum: 'tanrilar' | 'kahramanlar', kayitKimligi: string): string | undefined {
  return veri.kisiler.find((kisi) => kisi.kayit?.bolum === bolum && kisi.kayit.kimlik === kayitKimligi)?.kimlik;
}

export function kisiAra(veri: Soyagaci, sorgu: string): Kisi[] {
  const aranan = aramaIcinSadelestir(sorgu.trim());
  if (!aranan) return [];
  const derece = (kisi: Kisi) => {
    const ad = aramaIcinSadelestir(kisi.ad);
    if (ad === aranan) return 0;
    if (ad.startsWith(aranan)) return 1;
    if (ad.includes(aranan)) return 2;
    return -1;
  };
  return veri.kisiler
    .map((kisi) => ({ kisi, derece: derece(kisi) }))
    .filter((sonuc) => sonuc.derece >= 0)
    .sort((a, b) => a.derece - b.derece || a.kisi.ad.localeCompare(b.kisi.ad, 'tr'))
    .slice(0, 8)
    .map((sonuc) => sonuc.kisi);
}

export const soyagaciAdresi = '/soyagaci/';

export const kisiAdresi = (kimlik: string) => `${soyagaciAdresi}?kisi=${kimlik}`;

export function adrestenKisi(veri: Soyagaci, adres: string): string | undefined {
  const kimlik = new URL(adres, 'https://soyagaci.invalid').searchParams.get('kisi');
  return kimlik && dizin(veri).kisiler.has(kimlik) ? kimlik : undefined;
}

export interface AileGrubu {
  es?: Kisi;
  evli: boolean;
  cocuklar: Kisi[];
}

export function aileGruplari(veri: Soyagaci, kimlik: string): AileGrubu[] {
  const d = dizin(veri);
  const gruplar = new Map<string | undefined, AileGrubu>();
  const grup = (esKimligi: string | undefined) => {
    const mevcut = gruplar.get(esKimligi);
    if (mevcut) return mevcut;
    const yeni: AileGrubu = { es: esKimligi ? d.kisiler.get(esKimligi) : undefined, evli: false, cocuklar: [] };
    gruplar.set(esKimligi, yeni);
    return yeni;
  };
  for (const es of kisilereCevir(veri, d.esler.get(kimlik))) grup(es.kimlik).evli = !d.birliktelikler.has(ciftAnahtari(kimlik, es.kimlik));
  for (const cocuk of kisilereCevir(veri, d.anaCocuklar.get(kimlik))) {
    grup(d.anaEbeveynler.get(cocuk.kimlik)?.find((ebeveyn) => ebeveyn !== kimlik)).cocuklar.push(cocuk);
  }
  const sirasi = (g: AileGrubu) => (g.evli ? 0 : g.es ? 1 : 2);
  return [...gruplar.values()].sort((x, y) => sirasi(x) - sirasi(y));
}

const oncelikliKokler = ['khaos', 'gaia'];

export function soyCizgisi(veri: Soyagaci, kimlik: string): Kisi[] {
  const { anaEbeveynler, kisiler } = dizin(veri);
  const altKomsu = new Map<string, string | undefined>([[kimlik, undefined]]);
  const kokler: string[] = [];
  for (const simdiki of altKomsu.keys()) {
    const ebeveynler = anaEbeveynler.get(simdiki) ?? [];
    if (ebeveynler.length === 0) kokler.push(simdiki);
    for (const ebeveyn of ebeveynler) if (!altKomsu.has(ebeveyn)) altKomsu.set(ebeveyn, simdiki);
  }
  const kok = oncelikliKokler.find((aday) => kokler.includes(aday)) ?? kokler[0];
  if (kok === kimlik) return [];
  const yol: Kisi[] = [];
  for (let adim: string | undefined = kok; adim; adim = altKomsu.get(adim)) yol.push(kisiler.get(adim)!);
  return yol;
}

export interface SoyDali {
  es?: Kisi;
  evli: boolean;
  cocuklar: SoyDugumu[];
}

export interface SoyDugumu {
  kisi: Kisi;
  dallar: SoyDali[];
}

export function soyAgaci(veri: Soyagaci, kokler: string[], uyeler: string[]): SoyDugumu[] {
  const { kisiler, anaEbeveynler } = dizin(veri);
  const siralar = new Map([...new Set([...kokler, ...uyeler])].map((kimlik) => [kimlik, uyeler.indexOf(kimlik)]));
  const sira = (kimlik: string) => siralar.get(kimlik) ?? Number.MAX_SAFE_INTEGER;
  const erisilenler = new Set(kokler);
  let oncekiSayi = 0;
  while (oncekiSayi !== erisilenler.size) {
    oncekiSayi = erisilenler.size;
    for (const uye of uyeler) if (anaEbeveynler.get(uye)?.some((ebeveyn) => erisilenler.has(ebeveyn))) erisilenler.add(uye);
  }
  const sahipler = new Map<string, string | undefined>(kokler.map((kok) => [kok, undefined]));
  for (const uye of erisilenler) {
    if (sahipler.has(uye)) continue;
    const [sahip] = (anaEbeveynler.get(uye) ?? []).filter((e) => erisilenler.has(e)).sort((a, b) => sira(a) - sira(b));
    sahipler.set(uye, sahip);
  }

  const dugumKur = (kimlik: string): SoyDugumu => {
    const dallar = aileGruplari(veri, kimlik)
      .map((grup) => ({
        es: grup.es,
        evli: grup.evli,
        cocuklar: grup.cocuklar
          .filter((cocuk) => sahipler.get(cocuk.kimlik) === kimlik)
          .sort((a, b) => sira(a.kimlik) - sira(b.kimlik)),
      }))
      .filter(({ es, evli, cocuklar }) => {
        if (cocuklar.length > 0) return true;
        if (!es || !siralar.has(es.kimlik)) return false;
        return !sahipler.has(es.kimlik) || (evli && sira(kimlik) < sira(es.kimlik));
      })
      .filter(({ es, cocuklar }) => {
        if (!es || cocuklar.length > 0) return true;
        return !aileGruplari(veri, es.kimlik).some(
          (grup) => grup.es?.kimlik === kimlik && grup.cocuklar.some((cocuk) => sahipler.get(cocuk.kimlik) === es.kimlik),
        );
      })
      .sort((a, b) => Number(b.evli) - Number(a.evli) || sira(a.cocuklar[0]?.kimlik) - sira(b.cocuklar[0]?.kimlik));
    return {
      kisi: kisiler.get(kimlik)!,
      dallar: dallar.map((dal) => ({ ...dal, cocuklar: dal.cocuklar.map((cocuk) => dugumKur(cocuk.kimlik)) })),
    };
  };
  return kokler.map(dugumKur);
}
