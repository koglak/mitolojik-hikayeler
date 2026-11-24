import { atlasBolgeleri, type AtlasBolgesi } from '../lib/zamanAtlasi/bolgeler';
import { adresiOku, adresYaz, kayitBaslangicYili } from '../lib/zamanAtlasi/adres';
import {
  acikBaslayanBolgeler,
  atlasDonemleri,
  katmanAnahtarlari,
  varsayilanKayit,
  varsayilanYil,
  yakinKartSayisi,
  type AtlasDonemi,
  type Katman,
} from '../lib/zamanAtlasi/etiketler';
import type { AtlasVerisi } from '../lib/zamanAtlasi/sema';
import { gorunum, kayitlariDizinle, yakinOlaylar, yilKesiti, type YilKesiti } from '../lib/zamanAtlasi/sorgu';
import { hamAtlasVerisi } from '../lib/zamanAtlasi/veri';
import { eksenEtiketleri, eksenIsaretleri, koordinat, yilaCevir, yilKaydir, yilYaz } from '../lib/zamanAtlasi/yil';

export interface YilDegisimi {
  yil: number;
  kesit: YilKesiti;
}

declare global {
  interface DocumentEventMap {
    'zamanatlasi:yil': CustomEvent<YilDegisimi>;
  }
}

interface Durum {
  yil: number;
  kayit?: string;
  donem: AtlasDonemi;
  bolge: AtlasBolgesi | 'tum';
  arama: string;
  katmanlar: Set<Katman>;
  acikGruplar: Set<string>;
  suzulenOlaylar: ReadonlySet<string>;
  butunKartlar: boolean;
}

const kok = document.querySelector<HTMLElement>('[data-zaman-atlasi]')!;
const bul = <T extends HTMLElement>(secici: string) => kok.querySelector<T>(secici)!;
const hepsi = <T extends HTMLElement>(secici: string) => [...kok.querySelectorAll<T>(secici)];

const atlas = kayitlariDizinle(hamAtlasVerisi as unknown as AtlasVerisi);
const [tumCaglar] = atlasDonemleri;

const cerceve = bul('[data-cizelge-cercevesi]');
const cizelge = bul('[data-cizelge]');
const olcek = bul('[data-olcek]');
const izgara = bul('[data-izgara]');
const surgu = bul<HTMLInputElement>('[data-atlas-surgu]');
const yilYazisi = bul('[data-atlas-yil]');
const aramaKutusu = bul<HTMLInputElement>('[data-atlas-ara]');
const bolgeSecimi = bul<HTMLSelectElement>('[data-atlas-bolge]');
const sonucYazisi = bul('[data-atlas-sonuc]');
const panel = bul('[data-detay-paneli]');
const panelKapat = bul('[data-detay-kapat]');
const genelDetay = bul('[data-detay-genel]');
const tumKartlarDugmesi = bul('[data-kartlar-tumu]');
const panelKatmani = window.matchMedia('(max-width: 1099px)');

const donemDugmeleri = hepsi('[data-donem]');
const katmanDugmeleri = hepsi('[data-katman]');
const gruplar = hepsi('[data-grup]');
const satirlar = hepsi('[data-satir]');
const isaretler = hepsi('[data-isaret]');
const araliklar = hepsi('[data-bas]');
const kartlar = hepsi('[data-kart]');
const detaylar = hepsi('[data-detay]');
const kesitKayitlari = hepsi('[data-kesit-kaydi]');
const kesitBolgeleri = hepsi('[data-kesit-bolgesi]');
const secilebilirler = hepsi('[data-sec]');

const durum: Durum = {
  yil: varsayilanYil,
  kayit: varsayilanKayit,
  donem: tumCaglar,
  bolge: 'tum',
  arama: '',
  katmanlar: new Set(katmanAnahtarlari),
  acikGruplar: new Set(acikBaslayanBolgeler),
  suzulenOlaylar: new Set(),
  butunKartlar: false,
};

let panelAcan: HTMLElement | null = null;

const kaydiGetir = (kimlik: string) => atlas.kayitlar.get(kimlik)!;

const donemdeMi = (kimlik: string, { bas, son }: { bas: number; son: number }) =>
  kaydiGetir(kimlik).kayit.donemler.some((d) => d.bas <= son && bas <= d.son);

function eksenCiz(): void {
  const { bas, son } = durum.donem;
  cizelge.style.setProperty('--g-bas', String(koordinat(bas)));
  cizelge.style.setProperty('--g-son', String(koordinat(son)));
  const isaretOgesi = (yil: number, yazi = '') => {
    const oge = document.createElement('span');
    oge.style.setProperty('--konum', String(koordinat(yil)));
    oge.textContent = yazi;
    return oge;
  };
  olcek.replaceChildren(...eksenEtiketleri(bas, son).map((yil) => isaretOgesi(yil, yilYaz(yil))));
  izgara.replaceChildren(...eksenIsaretleri(bas, son).map((yil) => isaretOgesi(yil)));
  for (const oge of araliklar) {
    const ogeBasi = Number(oge.dataset.bas);
    const ogeSonu = Number(oge.dataset.son);
    oge.hidden = ogeSonu < bas || ogeBasi > son;
    oge.toggleAttribute('data-oncesi', ogeBasi < bas);
    oge.toggleAttribute('data-sonrasi', ogeSonu > son);
  }
  surgu.min = String(koordinat(bas));
  surgu.max = String(koordinat(son));
}

function kartlariGoster(): void {
  const { suzulenOlaylar, butunKartlar, yil } = durum;
  const sigar = suzulenOlaylar.size <= yakinKartSayisi;
  const gorunenler =
    butunKartlar || sigar ? suzulenOlaylar : new Set(yakinOlaylar(atlas, suzulenOlaylar, yil, yakinKartSayisi));
  for (const kart of kartlar) kart.hidden = !gorunenler.has(kart.dataset.kart!);
  bul('[data-kartlar-bos]').hidden = suzulenOlaylar.size > 0;
  const kismi = gorunenler.size < suzulenOlaylar.size;
  bul('[data-kart-ozeti]').textContent = kismi
    ? `${yilYaz(yil)} çevresindeki ${gorunenler.size} olay`
    : `${suzulenOlaylar.size} olay`;
  tumKartlarDugmesi.hidden = sigar;
  tumKartlarDugmesi.setAttribute('aria-pressed', String(butunKartlar));
  tumKartlarDugmesi.textContent = butunKartlar ? 'Yalnız yakındakiler' : `Tümünü göster (${suzulenOlaylar.size})`;
}

function suzgeciUygula(): void {
  const { arama, bolge, katmanlar, donem, acikGruplar } = durum;
  const g = gorunum(atlas, { arama, bolge, katmanlar, bas: donem.bas, son: donem.son });
  const aramaVar = arama.trim() !== '';
  for (const satir of satirlar) satir.hidden = !g.satirlar.has(satir.dataset.satir!);
  for (const isaret of isaretler) isaret.hidden = !g.isaretler.has(isaret.dataset.isaret!);
  durum.suzulenOlaylar = g.kartlar;
  kartlariGoster();
  for (const grup of gruplar) {
    const anahtar = grup.dataset.grup as AtlasBolgesi;
    const acik = aramaVar || acikGruplar.has(anahtar);
    grup.hidden = !g.bolgeler.has(anahtar);
    grup.querySelector('[data-grup-dugmesi]')!.setAttribute('aria-expanded', String(acik));
    grup.querySelector<HTMLElement>('[data-grup-govdesi]')!.hidden = !acik;
    grup.querySelector('[data-grup-sayisi]')!.textContent = String(g.bolgeler.get(anahtar) ?? 0);
  }
  bul('[data-cizelge-bos]').hidden = g.toplam > 0;
  const suzuldu = g.toplam !== atlas.kayitlar.size;
  sonucYazisi.textContent = suzuldu ? `${g.toplam} kayıt gösteriliyor` : '';
}

function yiliGoster(): void {
  const { yil } = durum;
  const kesit = yilKesiti(atlas, yil);
  const varOlanlar = new Set([...kesit.uygarliklar, ...kesit.hukumdarlar].map(({ kimlik }) => kimlik));
  cizelge.style.setProperty('--konum', String(koordinat(yil)));
  surgu.value = String(koordinat(yil));
  surgu.setAttribute('aria-valuetext', yilYaz(yil));
  yilYazisi.textContent = yilYaz(yil);
  bul('[data-kesit-yili]').textContent = yilYaz(yil);
  for (const oge of kesitKayitlari) oge.hidden = !varOlanlar.has(oge.dataset.kesitKaydi!);
  for (const bolge of kesitBolgeleri) {
    const dolu = bolge.querySelector('[data-kesit-kaydi]:not([hidden])') !== null;
    bolge.querySelector<HTMLElement>('[data-kesit-bos]')!.hidden = dolu;
  }
  bul('[data-genel-baslik]').textContent = `${yilYaz(yil)} yılında dünya`;
  bul('[data-genel-ozet]').textContent =
    `Bu yıl çizelgede ${kesit.uygarliklar.length} uygarlık ve ${kesit.hukumdarlar.length} hükümdar var.`;
  kartlariGoster();
  document.dispatchEvent(new CustomEvent<YilDegisimi>('zamanatlasi:yil', { detail: { yil, kesit } }));
}

function secimiGoster(): void {
  const { kayit } = durum;
  for (const detay of detaylar) detay.hidden = detay.dataset.detay !== kayit;
  genelDetay.hidden = kayit !== undefined;
  for (const oge of secilebilirler) oge.toggleAttribute('data-secili', oge.dataset.sec === kayit);
  for (const satir of satirlar) satir.toggleAttribute('data-secili', satir.dataset.satir === kayit);
  panel.scrollTop = 0;
}

function adresiGuncelle(): void {
  history.replaceState(history.state, '', adresYaz({ yil: durum.yil, kayit: durum.kayit }));
}

function donemiAyarla(donem: AtlasDonemi): void {
  durum.donem = donem;
  for (const dugme of donemDugmeleri) dugme.setAttribute('aria-pressed', String(dugme.dataset.donem === donem.kimlik));
  eksenCiz();
}

function paneliAc(acan: HTMLElement | null): void {
  panel.toggleAttribute('data-acik', true);
  if (!panelKatmani.matches) return;
  panelAcan = acan ?? panelAcan;
  panelKapat.focus({ preventScroll: true });
}

function paneliKapat(): void {
  if (!panel.hasAttribute('data-acik')) return;
  panel.removeAttribute('data-acik');
  if (panelKatmani.matches) panelAcan?.focus({ preventScroll: true });
  panelAcan = null;
}

function kaydiGorunurYap(kimlik: string): void {
  const { tur, kayit } = kaydiGetir(kimlik);
  const hedefler = [kimlik, ...(tur === 'uygarlik' ? [] : [kayit.uygarlik])];
  const satir = hedefler
    .map((hedef) => satirlar.find((oge) => oge.dataset.satir === hedef && !oge.hidden))
    .find((oge) => oge !== undefined);
  if (!satir) return;
  const eksenPayi = 60;
  const cerceveKutusu = cerceve.getBoundingClientRect();
  const satirKutusu = satir.getBoundingClientRect();
  const ustte = satirKutusu.top < cerceveKutusu.top + eksenPayi;
  const altta = satirKutusu.bottom > cerceveKutusu.bottom;
  const olcekKutusu = olcek.getBoundingClientRect();
  const { bas, son } = durum.donem;
  const oran = (koordinat(durum.yil) - koordinat(bas)) / (koordinat(son) - koordinat(bas));
  const yilX = olcekKutusu.left + oran * olcekKutusu.width;
  const gorunenSol = cerceveKutusu.left + (cizelge.clientWidth - olcek.clientWidth);
  const yandaDisarda = yilX < gorunenSol + 20 || yilX > cerceveKutusu.right - 20;
  cerceve.scrollTo({
    top: ustte || altta ? cerceve.scrollTop + satirKutusu.top - cerceveKutusu.top - cerceve.clientHeight / 2 : undefined,
    left: yandaDisarda ? cerceve.scrollLeft + yilX - (gorunenSol + cerceveKutusu.right) / 2 : undefined,
  });
}

function kayitSec(kimlik: string, { yiliKoru = false, acan = null as HTMLElement | null } = {}): void {
  durum.kayit = kimlik;
  if (!yiliKoru) durum.yil = kayitBaslangicYili(atlas, kimlik);
  const yilDisarda = durum.yil < durum.donem.bas || durum.yil > durum.donem.son;
  if (yilDisarda) {
    if (donemdeMi(kimlik, durum.donem)) durum.yil = durum.donem.bas;
    else donemiAyarla(tumCaglar);
  }
  durum.acikGruplar.add(kaydiGetir(kimlik).bolge);
  suzgeciUygula();
  yiliGoster();
  secimiGoster();
  kaydiGorunurYap(kimlik);
  adresiGuncelle();
  paneliAc(acan);
}

function yilSec(yil: number, { adres = true } = {}): void {
  durum.yil = yil;
  if (durum.kayit && !donemdeMi(durum.kayit, { bas: yil, son: yil })) {
    durum.kayit = undefined;
    secimiGoster();
    paneliKapat();
  }
  yiliGoster();
  if (adres) adresiGuncelle();
}

function izdenYil(iz: HTMLElement, x: number): number {
  const { left, width } = iz.getBoundingClientRect();
  const { bas, son } = durum.donem;
  const oran = Math.min(1, Math.max(0, (x - left) / width));
  return yilaCevir(Math.round(koordinat(bas) + oran * (koordinat(son) - koordinat(bas))));
}

kok.addEventListener('click', (olay) => {
  const hedef = olay.target as HTMLElement;

  const secim = hedef.closest<HTMLElement>('[data-sec]');
  if (secim) {
    const seritte = secim.hasAttribute('data-bas');
    const yiliKoru = secim.hasAttribute('data-yili-koru') || donemdeMi(secim.dataset.sec!, { bas: durum.yil, son: durum.yil });
    if (seritte && !yiliKoru) {
      const tiklananYil = izdenYil(secim.closest<HTMLElement>('[data-iz]')!, olay.clientX);
      durum.yil = Math.min(Number(secim.dataset.son), Math.max(Number(secim.dataset.bas), tiklananYil));
    }
    kayitSec(secim.dataset.sec!, { yiliKoru: seritte || yiliKoru, acan: panel.contains(secim) ? null : secim });
    return;
  }

  const donem = hedef.closest<HTMLElement>('[data-donem]');
  if (donem) {
    donemiAyarla(atlasDonemleri.find(({ kimlik }) => kimlik === donem.dataset.donem)!);
    const { bas, son } = durum.donem;
    if (durum.kayit && !donemdeMi(durum.kayit, durum.donem)) {
      durum.kayit = undefined;
      secimiGoster();
    }
    suzgeciUygula();
    yilSec(Math.min(son, Math.max(bas, durum.yil)));
    return;
  }

  const katman = hedef.closest<HTMLElement>('[data-katman]');
  if (katman) {
    const anahtar = katman.dataset.katman as Katman;
    if (!durum.katmanlar.delete(anahtar)) durum.katmanlar.add(anahtar);
    katman.setAttribute('aria-pressed', String(durum.katmanlar.has(anahtar)));
    suzgeciUygula();
    return;
  }

  const grup = hedef.closest<HTMLElement>('[data-grup-dugmesi]');
  if (grup) {
    const anahtar = grup.dataset.grupDugmesi!;
    if (!durum.acikGruplar.delete(anahtar)) durum.acikGruplar.add(anahtar);
    suzgeciUygula();
    return;
  }

  const adim = hedef.closest<HTMLElement>('[data-adim]');
  if (adim) {
    yilSec(yilKaydir(durum.yil, Number(adim.dataset.adim), durum.donem.bas, durum.donem.son));
    return;
  }

  if (hedef.closest('[data-kartlar-tumu]')) {
    durum.butunKartlar = !durum.butunKartlar;
    kartlariGoster();
    return;
  }

  if (hedef.closest('[data-detay-kapat]')) {
    paneliKapat();
    return;
  }

  const iz = hedef.closest<HTMLElement>('[data-iz]');
  if (iz) yilSec(izdenYil(iz, olay.clientX));
});

surgu.addEventListener('input', () => yilSec(yilaCevir(Number(surgu.value)), { adres: false }));
surgu.addEventListener('change', adresiGuncelle);

aramaKutusu.addEventListener('input', () => {
  durum.arama = aramaKutusu.value;
  suzgeciUygula();
});

bolgeSecimi.addEventListener('change', () => {
  durum.bolge = bolgeSecimi.value in atlasBolgeleri ? (bolgeSecimi.value as AtlasBolgesi) : 'tum';
  if (durum.bolge !== 'tum') durum.acikGruplar.add(durum.bolge);
  suzgeciUygula();
});

document.addEventListener('keydown', (olay) => {
  if (olay.key === 'Escape') paneliKapat();
});

const adres = adresiOku(atlas, location.search);
durum.arama = aramaKutusu.value;
if (adres.yil !== undefined) {
  durum.yil = adres.yil;
  durum.kayit = adres.kayit;
}
if (durum.kayit) durum.acikGruplar.add(kaydiGetir(durum.kayit).bolge);
eksenCiz();
suzgeciUygula();
yiliGoster();
secimiGoster();
if (durum.kayit) kaydiGorunurYap(durum.kayit);
if (adres.kayit) paneliAc(null);
