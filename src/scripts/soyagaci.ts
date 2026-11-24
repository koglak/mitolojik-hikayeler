import hamVeri from '../data/soyagaci.json';
import { kayitAdresi } from '../lib/bolumler';
import {
  adrestenKisi,
  aileGruplari,
  akrabalar,
  kisiAdresi,
  kisiAra,
  soyagaciAdresi,
  soyAgaci,
  soyCizgisi,
  type AileGrubu,
  type KaynakliKisi,
  type SoyDali,
  type SoyDugumu,
} from '../lib/soyagaci';
import { adrestenSoy, kisininSoylari, soyAdresi, type BaslangicSoyu } from '../lib/soyagaciBaslangic';
import { kisiTanimi, renkKodu } from '../lib/soyagaciRenkleri';
import type { Kisi, Soyagaci } from '../lib/soyagaciSemasi';

const veri = hamVeri as unknown as Soyagaci;
const ilkBaslik = document.title;

function oge<K extends keyof HTMLElementTagNameMap>(
  ad: K,
  secenekler: { metin?: string; sinif?: string } = {},
  ...cocuklar: Node[]
): HTMLElementTagNameMap[K] {
  const yeni = document.createElement(ad);
  if (secenekler.metin) yeni.textContent = secenekler.metin;
  if (secenekler.sinif) yeni.className = secenekler.sinif;
  yeni.append(...cocuklar);
  return yeni;
}

function kisiBaglantisi(kisi: Kisi, sinif = 'isim'): HTMLAnchorElement {
  const { renk, bicim, ad } = renkKodu(kisi);
  const isaret = oge('span', { sinif: `isaret ${bicim}` });
  isaret.setAttribute('role', 'img');
  isaret.setAttribute('aria-label', ad);
  const baglanti = oge('a', { sinif: `${sinif} renkli`.trim() }, isaret, oge('span', { metin: kisi.ad }));
  baglanti.style.setProperty('--renk', renk);
  baglanti.href = kisiAdresi(kisi.kimlik);
  baglanti.dataset.kisi = kisi.kimlik;
  return baglanti;
}

const isimListesi = (kisiler: Kisi[], sinif = '') =>
  oge('ul', { sinif: `isimler ${sinif}`.trim() }, ...kisiler.map((kisi) => oge('li', {}, kisiBaglantisi(kisi))));

function soyCizgisiOgesi(yol: Kisi[]): HTMLElement {
  const adimlar = yol.map((kisi, sira) => {
    if (sira < yol.length - 1) return oge('li', {}, kisiBaglantisi(kisi, ''));
    const sonAdim = oge('span', { metin: kisi.ad });
    sonAdim.setAttribute('aria-current', 'true');
    return oge('li', {}, sonAdim);
  });
  const liste = oge('ol', { sinif: 'soy-cizgisi' }, ...adimlar);
  const cerceve = oge('nav', {}, liste);
  cerceve.setAttribute('aria-label', 'Soy çizgisi');
  return cerceve;
}

function kisiKarti(kisi: Kisi): HTMLElement {
  const baslik = oge('h2', { metin: kisi.ad });
  baslik.tabIndex = -1;
  const { renk, bicim } = renkKodu(kisi);
  const isaret = oge('span', { sinif: `isaret ${bicim}` });
  isaret.setAttribute('aria-hidden', 'true');
  const kart = oge('div', { sinif: 'kisi-karti' }, baslik, oge('p', { sinif: 'tanim' }, isaret, oge('span', { metin: kisiTanimi(kisi) })));
  kart.style.setProperty('--renk', renk);
  if (kisi.not) kart.append(oge('p', { metin: kisi.not, sinif: 'not' }));
  if (kisi.kayit) {
    const sayfa = oge('a', { metin: 'Sayfasına git', sinif: 'sayfa' });
    sayfa.href = kayitAdresi(kisi.kayit.bolum, kisi.kayit.kimlik);
    kart.append(sayfa);
  }
  return kart;
}

function grupOgesi(grup: AileGrubu, tekGrup: boolean): HTMLElement {
  const tekCocuk = grup.cocuklar.length === 1;
  const cocukEtiketi = grup.es || tekGrup ? (tekCocuk ? 'Çocuğu' : 'Çocukları') : tekCocuk ? 'Diğer çocuğu' : 'Diğer çocukları';
  const cocuklar = oge('div', { sinif: 'grup-cocuklari' }, oge('p', { metin: cocukEtiketi, sinif: 'etiket' }), isimListesi(grup.cocuklar));
  if (!grup.es) return oge('div', { sinif: 'grup essiz' }, cocuklar);
  const es = oge('div', {}, oge('p', { metin: grup.evli ? 'Eşi' : 'Birlikteliği', sinif: 'etiket' }), isimListesi([grup.es]));
  return oge('div', { sinif: 'grup' }, es, cocuklar);
}

function cocuksuzGrupOgesi(gruplar: AileGrubu[]): HTMLElement {
  const bolum = (metin: string, kisiler: Kisi[]) =>
    kisiler.length > 0 ? [oge('div', {}, oge('p', { metin, sinif: 'etiket' }), isimListesi(kisiler))] : [];
  const esler = (evli: boolean) => gruplar.filter((grup) => grup.evli === evli).flatMap((grup) => grup.es ?? []);
  const evliler = esler(true);
  return oge('div', { sinif: 'grup essiz' }, ...bolum(evliler.length > 1 ? 'Eşleri' : 'Eşi', evliler), ...bolum('Birlikteliği', esler(false)));
}

function baskaAnlati(baslik: string, kisiler: KaynakliKisi[]): Node[] {
  if (kisiler.length === 0) return [];
  const satirlar = kisiler.map(({ kisi, kaynak }) => oge('li', {}, kisiBaglantisi(kisi), oge('small', { metin: kaynak })));
  return [oge('div', { sinif: 'baska-anlati' }, oge('h3', { metin: baslik }), oge('ul', { sinif: 'isimler' }, ...satirlar))];
}

function aileOgeleri(kisi: Kisi): Node[] {
  const yakinlar = akrabalar(veri, kisi.kimlik);
  const gruplar = aileGruplari(veri, kisi.kimlik);
  const yol = soyCizgisi(veri, kisi.kimlik);
  const ogeler: Node[] = [];
  if (yol.length > 2) ogeler.push(soyCizgisiOgesi(yol));
  if (yakinlar.ebeveynler.length > 0) {
    ogeler.push(
      oge('div', { sinif: 'anne-baba' }, oge('p', { metin: 'Anne babası', sinif: 'etiket' }), isimListesi(yakinlar.ebeveynler)),
      oge('div', { sinif: 'bag' }),
    );
  }
  ogeler.push(kisiKarti(kisi));
  const cocuklular = gruplar.filter((grup) => grup.cocuklar.length > 0);
  const cocuksuzlar = gruplar.filter((grup) => grup.cocuklar.length === 0);
  if (gruplar.length > 0) {
    const grupOgeleri = cocuklular.map((grup) => grupOgesi(grup, cocuklular.length === 1));
    if (cocuksuzlar.length > 0) grupOgeleri.push(cocuksuzGrupOgesi(cocuksuzlar));
    ogeler.push(oge('div', { sinif: 'bag' }), oge('div', { sinif: 'gruplar' }, ...grupOgeleri));
  }
  ogeler.push(
    ...baskaAnlati('Başka anlatıda anne babası', yakinlar.alternatifEbeveynler),
    ...baskaAnlati('Başka anlatıda çocukları', yakinlar.alternatifCocuklar),
  );
  const soylar = kisininSoylari(kisi.kimlik);
  ogeler.push(
    oge(
      'nav',
      { sinif: 'alt-baglantilar' },
      ...soylar.map((soy) => icBaglanti(`${soy.ad} ağacı`, soyAdresi(soy.kimlik))),
      icBaglanti('Bütün soylar', soyagaciAdresi),
    ),
  );
  return ogeler;
}

function icBaglanti(metin: string, adres: string): HTMLAnchorElement {
  const baglanti = oge('a', { metin, sinif: 'ic-baglanti' });
  baglanti.href = adres;
  baglanti.dataset.gecis = '';
  return baglanti;
}

const yaprakMi = (dugum: SoyDugumu) => dugum.dallar.every((dal) => dal.cocuklar.length === 0);

function cocukOgeleri(cocuklar: SoyDugumu[]): HTMLLIElement[] {
  const yapraklar = cocuklar.filter(yaprakMi);
  const dallananlar = cocuklar.filter((cocuk) => !yaprakMi(cocuk));
  const ogeler = dallananlar.map(dugumOgesi);
  if (yapraklar.length > 0) {
    const kardesler = oge('ul', { sinif: yapraklar.length > 1 ? 'kardesler kutulu' : 'kardesler' }, ...yapraklar.map(dugumOgesi));
    ogeler.push(oge('li', {}, kardesler));
  }
  return ogeler;
}

const altKusak = (ogeler: HTMLLIElement[]) => oge('ul', { sinif: 'alt-kusak' }, ...ogeler);

function esOgesi(dal: SoyDali): HTMLElement {
  const isaret = oge('span', { metin: dal.evli ? '═' : '┄', sinif: 'es-isareti' });
  isaret.setAttribute('aria-label', dal.evli ? 'eşi' : 'birlikteliği');
  isaret.setAttribute('role', 'img');
  return oge('span', { sinif: 'es' }, isaret, ...(dal.es ? [kisiBaglantisi(dal.es, 'isim es-ismi')] : []));
}

function dugumOgesi({ kisi, dallar }: SoyDugumu): HTMLLIElement {
  const cocuksuzlar = dallar.filter((dal) => dal.cocuklar.length === 0);
  const cocuklular = dallar.filter((dal) => dal.cocuklar.length > 0);
  const tekCift = dallar.length === 1 && cocuklular.length === 1;
  const yanYana = tekCift && cocuklular[0].es ? cocuklular : cocuksuzlar;
  const satir = oge('div', { sinif: 'cift' }, kisiBaglantisi(kisi), ...yanYana.map(esOgesi));
  if (cocuklular.length === 0) return oge('li', {}, satir);
  if (tekCift) return oge('li', {}, satir, altKusak(cocukOgeleri(cocuklular[0].cocuklar)));
  const dalOgeleri = cocuklular.flatMap((dal) =>
    dal.es ? [oge('li', {}, oge('div', { sinif: 'cift' }, esOgesi(dal)), altKusak(cocukOgeleri(dal.cocuklar)))] : cocukOgeleri(dal.cocuklar),
  );
  return oge('li', {}, satir, altKusak(dalOgeleri));
}

function soyOgeleri(soy: BaslangicSoyu): Node[] {
  const baslik = oge('h2', { metin: soy.ad });
  baslik.tabIndex = -1;
  const agac = oge('div', { sinif: 'agac' }, oge('ul', { sinif: 'kokler' }, ...soyAgaci(veri, soy.kokler, soy.uyeler).map(dugumOgesi)));
  agac.tabIndex = 0;
  agac.setAttribute('role', 'region');
  agac.setAttribute('aria-label', `${soy.ad} ağacı`);
  return [
    oge('div', { sinif: 'soy-basligi' }, baslik, oge('p', { metin: soy.aciklama }), oge('p', { metin: '═ evli, ┄ evliliği anlatılmıyor. Ağaç, soyun öne çıkan kişilerini gösterir.', sinif: 'anahtar' })),
    agac,
    oge('nav', { sinif: 'alt-baglantilar' }, icBaglanti('Bütün soylar', soyagaciAdresi)),
  ];
}

function soyagaciniBaslat(kok: HTMLElement): void {
  const aile = kok.querySelector<HTMLElement>('[data-aile]')!;
  const aramaKutusu = kok.querySelector<HTMLElement>('.arama-kutusu')!;
  const aramaGirdisi = kok.querySelector<HTMLInputElement>('[data-kisi-ara]')!;
  const sonucListesi = kok.querySelector<HTMLElement>('[data-kisi-sonuclari]')!;

  function goster(adres: string): void {
    const kimlik = adrestenKisi(veri, adres);
    const kisi = veri.kisiler.find((aday) => aday.kimlik === kimlik);
    const soy = kisi ? undefined : adrestenSoy(adres);
    const acik = kisi ?? soy;
    kok.classList.toggle('kisi-acik', Boolean(acik));
    aile.hidden = !acik;
    aile.classList.toggle('genis', Boolean(soy));
    aile.replaceChildren(...(kisi ? aileOgeleri(kisi) : soy ? soyOgeleri(soy) : []));
    document.title = acik ? `${acik.ad} · ${ilkBaslik}` : ilkBaslik;
    agaciSigdir();
  }

  function agaciSigdir(): void {
    const agac = aile.querySelector<HTMLElement>('.agac');
    if (!agac) return;
    agac.classList.remove('sikisik', 'girintili');
    for (const gorunum of ['sikisik', 'girintili']) {
      if (agac.scrollWidth <= agac.clientWidth) return;
      agac.classList.add(gorunum);
    }
    agac.classList.remove('sikisik');
  }

  function aramayiKapat(): void {
    sonucListesi.hidden = true;
    sonucListesi.replaceChildren();
  }

  function git(adres: string): void {
    aramaGirdisi.value = '';
    aramayiKapat();
    history.pushState(null, '', adres);
    goster(adres);
    window.scrollTo({ top: 0, behavior: 'instant' });
    (aile.querySelector<HTMLElement>('h2') ?? aramaGirdisi).focus({ preventScroll: true });
  }

  kok.addEventListener('click', (olay) => {
    const baglanti = (olay.target as Element).closest<HTMLAnchorElement>('a[data-kisi], a[data-gecis]');
    if (!baglanti || olay.metaKey || olay.ctrlKey || olay.shiftKey || olay.button !== 0) return;
    olay.preventDefault();
    git(baglanti.getAttribute('href')!);
  });

  aramaGirdisi.addEventListener('input', () => {
    const sorgu = aramaGirdisi.value;
    const bulunanlar = kisiAra(veri, sorgu);
    const satirlar = bulunanlar.map((kisi) => {
      const baglanti = kisiBaglantisi(kisi, '');
      baglanti.append(oge('small', { metin: kisi.not ?? kisiTanimi(kisi) }));
      return oge('li', {}, baglanti);
    });
    const bos = oge('li', { metin: 'Bu isimde kimse yok.', sinif: 'bos' });
    sonucListesi.replaceChildren(...(satirlar.length > 0 ? satirlar : [bos]));
    sonucListesi.hidden = !sorgu.trim();
  });

  aramaGirdisi.addEventListener('keydown', (olay) => {
    if (olay.key !== 'Enter') return;
    const [ilk] = kisiAra(veri, aramaGirdisi.value);
    if (ilk) git(kisiAdresi(ilk.kimlik));
  });

  sonucListesi.addEventListener('mousedown', (olay) => olay.preventDefault());
  aramaKutusu.addEventListener('keydown', (olay) => {
    if (olay.key === 'Escape') aramayiKapat();
  });
  aramaKutusu.addEventListener('focusout', (olay) => {
    if (!aramaKutusu.contains(olay.relatedTarget as Node | null)) aramayiKapat();
  });

  window.addEventListener('resize', agaciSigdir);
  document.fonts.ready.then(agaciSigdir);
  window.addEventListener('popstate', () => goster(location.search));
  goster(location.search);
}

const kok = document.querySelector<HTMLElement>('[data-soyagaci]');
if (kok) soyagaciniBaslat(kok);
