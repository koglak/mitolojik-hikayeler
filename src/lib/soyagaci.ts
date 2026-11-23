import { aramaIcinSadelestir } from './aramaMetni';
import type { EbeveynIliskisi, Kisi, Soyagaci } from './soyagaciSemasi';

export interface Akrabalar {
  ebeveynler: Kisi[];
  alternatifEbeveynler: { kisi: Kisi; kaynak: string }[];
  esler: Kisi[];
  cocuklar: Kisi[];
}

interface Dizin {
  kisiler: Map<string, Kisi>;
  anaEbeveynler: Map<string, string[]>;
  anaCocuklar: Map<string, string[]>;
  esler: Map<string, string[]>;
  alternatifEbeveynler: Map<string, EbeveynIliskisi[]>;
}

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
    alternatifEbeveynler: new Map(),
  };
  for (const iliski of veri.iliskiler) {
    if (iliski.tur === 'es') {
      const [a, b] = iliski.kisiler;
      ekle(yeni.esler, a, b);
      ekle(yeni.esler, b, a);
    } else if (iliski.anlati === 'ana') {
      ekle(yeni.anaEbeveynler, iliski.cocuk, iliski.ebeveyn);
      ekle(yeni.anaCocuklar, iliski.ebeveyn, iliski.cocuk);
    } else {
      ekle(yeni.alternatifEbeveynler, iliski.cocuk, iliski);
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

export function torunlar(veri: Soyagaci, kimlik: string): Set<string> {
  return gez(kimlik, dizin(veri).anaCocuklar);
}

export function odakKumesi(veri: Soyagaci, kimlik: string): Set<string> {
  return new Set([kimlik, ...atalar(veri, kimlik), ...torunlar(veri, kimlik), ...(dizin(veri).esler.get(kimlik) ?? [])]);
}

export function akrabalar(veri: Soyagaci, kimlik: string): Akrabalar {
  const d = dizin(veri);
  return {
    ebeveynler: kisilereCevir(veri, d.anaEbeveynler.get(kimlik)),
    alternatifEbeveynler: (d.alternatifEbeveynler.get(kimlik) ?? [])
      .map((iliski) => ({ kisi: d.kisiler.get(iliski.ebeveyn), kaynak: iliski.kaynak }))
      .filter((a): a is { kisi: Kisi; kaynak: string } => Boolean(a.kisi)),
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
