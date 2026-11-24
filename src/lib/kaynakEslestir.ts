export interface KaynakYazari {
  kimlik: string;
  adlar: string[];
}

export interface KaynakEseri {
  kimlik: string;
  yazar: string;
  adlar: string[];
}

export interface KaynakParcasi {
  metin: string;
  hedef?: string;
}

export interface ParcalanmisKaynak {
  parcalar: KaynakParcasi[];
  yazarlar: string[];
  eserler: string[];
}

interface Baglanti {
  baslangic: number;
  bitis: number;
  hedef: string;
}

const sozcukDevami = /[\p{L}\p{N}'’]/u;
const sozcukKarakteri = /[\p{L}\p{N}]/u;

const tamSozcuk = (metin: string, baslangic: number, bitis: number) =>
  !sozcukKarakteri.test(metin[baslangic - 1] ?? '') && !sozcukDevami.test(metin[bitis] ?? '');

const uzunAdOnce = <T extends { adlar: string[] }>(ogeler: T[]) =>
  ogeler
    .flatMap((oge) => oge.adlar.map((ad) => ({ ad, oge })))
    .sort((a, b) => b.ad.length - a.ad.length);

const basindaki = <T extends { adlar: string[] }>(metin: string, ogeler: T[]) =>
  uzunAdOnce(ogeler).find(({ ad }) => metin.startsWith(ad) && tamSozcuk(metin, 0, ad.length));

function icindekiEserler(metin: string, kayma: number, eserler: KaynakEseri[]): Baglanti[] {
  const bulunanlar: Baglanti[] = [];
  for (const { ad, oge } of uzunAdOnce(eserler)) {
    let konum = metin.indexOf(ad);
    while (konum !== -1) {
      const baslangic = kayma + konum;
      const bitis = baslangic + ad.length;
      const cakisir = bulunanlar.some((diger) => baslangic < diger.bitis && bitis > diger.baslangic);
      if (!cakisir && tamSozcuk(metin, konum, konum + ad.length)) bulunanlar.push({ baslangic, bitis, hedef: oge.kimlik });
      konum = metin.indexOf(ad, konum + ad.length);
    }
  }
  return bulunanlar.sort((a, b) => a.baslangic - b.baslangic);
}

const adiTekOlanlar = (eserler: KaynakEseri[]) =>
  eserler.map((eser) => ({
    ...eser,
    adlar: eser.adlar.filter((ad) => !eserler.some((diger) => diger.kimlik !== eser.kimlik && diger.adlar.includes(ad))),
  }));

function baglantilariUygula(metin: string, baglantilar: Baglanti[]): KaynakParcasi[] {
  const parcalar: KaynakParcasi[] = [];
  let konum = 0;
  for (const { baslangic, bitis, hedef } of baglantilar) {
    if (baslangic > konum) parcalar.push({ metin: metin.slice(konum, baslangic) });
    parcalar.push({ metin: metin.slice(baslangic, bitis), hedef });
    konum = bitis;
  }
  if (konum < metin.length) parcalar.push({ metin: metin.slice(konum) });
  return parcalar;
}

export function kaynagiParcala(kaynak: string, yazarlar: KaynakYazari[], eserler: KaynakEseri[]): ParcalanmisKaynak {
  const baglantilar: Baglanti[] = [];
  const bulunanYazarlar = new Set<string>();
  const bulunanEserler = new Set<string>();
  let oncekiYazar: string | undefined;
  let kayma = 0;

  for (const bolum of kaynak.split(';')) {
    const metin = bolum.trimStart();
    const baslangic = kayma + bolum.length - metin.length;
    kayma += bolum.length + 1;

    const yazar = basindaki(metin, yazarlar);
    if (yazar) {
      const { ad, oge } = yazar;
      const kalan = metin.slice(ad.length);
      const kendiEserleri = eserler.filter((eser) => eser.yazar === oge.kimlik);
      const anilanlar = icindekiEserler(kalan, baslangic + ad.length, kendiEserleri);
      oncekiYazar = oge.kimlik;
      bulunanYazarlar.add(oge.kimlik);
      baglantilar.push({ baslangic, bitis: baslangic + ad.length, hedef: oge.kimlik }, ...anilanlar);
      for (const anilan of anilanlar) bulunanEserler.add(anilan.hedef);
      if (anilanlar.length === 0 && kendiEserleri.length === 1 && /^\s+\d/.test(kalan)) bulunanEserler.add(kendiEserleri[0].kimlik);
      continue;
    }

    const eser =
      basindaki(metin, eserler.filter((aday) => aday.yazar === oncekiYazar)) ?? basindaki(metin, adiTekOlanlar(eserler));
    if (eser) {
      baglantilar.push({ baslangic, bitis: baslangic + eser.ad.length, hedef: eser.oge.kimlik });
      bulunanEserler.add(eser.oge.kimlik);
      bulunanYazarlar.add(eser.oge.yazar);
    }
  }

  return {
    parcalar: baglantilariUygula(kaynak, baglantilar),
    yazarlar: [...bulunanYazarlar],
    eserler: [...bulunanEserler],
  };
}
