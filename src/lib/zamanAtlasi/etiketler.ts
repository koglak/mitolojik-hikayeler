export const kesinlikAnahtarlari = ['kesin', 'yaklasik', 'tartismali', 'geleneksel'] as const;
export type Kesinlik = (typeof kesinlikAnahtarlari)[number];
export const kesinlikler: Record<Kesinlik, string> = {
  kesin: 'Kesin tarih',
  yaklasik: 'Yaklaşık tarih',
  tartismali: 'Tartışmalı tarih',
  geleneksel: 'Geleneksel tarih',
};

export const nitelikAnahtarlari = ['tarihsel', 'tartismali', 'mitolojik'] as const;
export type Nitelik = (typeof nitelikAnahtarlari)[number];
export const nitelikler: Record<Nitelik, string> = {
  tarihsel: 'Tarihsel',
  tartismali: 'Tartışmalı',
  mitolojik: 'Mitolojik ya da geleneksel',
};

export const uygarlikTuruAnahtarlari = ['devlet', 'egemenlik', 'kultur'] as const;
export type UygarlikTuru = (typeof uygarlikTuruAnahtarlari)[number];
export const uygarlikTurleri: Record<UygarlikTuru, string> = {
  devlet: 'Siyasi yapı',
  egemenlik: 'Dış egemenlik dönemi',
  kultur: 'Kültürel dönem',
};

export const olayTuruAnahtarlari = ['savas', 'antlasma', 'siyasi', 'kultur', 'anlati'] as const;
export type OlayTuru = (typeof olayTuruAnahtarlari)[number];
export const olayTurleri: Record<OlayTuru, string> = {
  savas: 'Savaş',
  antlasma: 'Antlaşma',
  siyasi: 'Siyasi dönüm noktası',
  kultur: 'Kültür ve inanç',
  anlati: 'Anlatı',
};

export const dogrulamaAnahtarlari = ['bekliyor', 'dogrulandi'] as const;
export type Dogrulama = (typeof dogrulamaAnahtarlari)[number];

export const katmanAnahtarlari = ['uygarliklar', 'hukumdarlar', 'tarihsel', 'tartismali', 'mitolojik'] as const;
export type Katman = (typeof katmanAnahtarlari)[number];
export const katmanlar: Record<Katman, string> = {
  uygarliklar: 'Devletler ve kültürler',
  hukumdarlar: 'Hükümdarlar',
  tarihsel: 'Tarihsel olaylar',
  tartismali: 'Tartışmalı olaylar',
  mitolojik: 'Mitolojik kayıtlar',
};

export interface AtlasDonemi {
  kimlik: string;
  ad: string;
  bas: number;
  son: number;
}

export const atlasDonemleri: AtlasDonemi[] = [
  { kimlik: 'tum', ad: 'Tüm çağlar', bas: -3500, son: 500 },
  { kimlik: 'tunc', ad: 'Tunç Çağı', bas: -3500, son: -1180 },
  { kimlik: 'demir', ad: 'Demir Çağı', bas: -1200, son: -550 },
  { kimlik: 'klasik', ad: 'Klasik', bas: -550, son: -323 },
  { kimlik: 'helenistik', ad: 'Helenistik', bas: -323, son: -30 },
  { kimlik: 'roma', ad: 'Roma', bas: -30, son: 500 },
];

export const hizliDuraklar = [
  { ad: 'Sargon', yil: -2334, kayit: 'akad-kurulusu' },
  { ad: 'Kadeş', yil: -1274, kayit: 'kades-savasi' },
  { ad: 'Troya', yil: -1184, kayit: 'troya-savasi' },
  { ad: 'Halys', yil: -585, kayit: 'halys-savasi' },
  { ad: 'İskender', yil: -334, kayit: 'granikos-savasi' },
  { ad: 'Kommagene', yil: -50, kayit: 'nemrut-kutsal-alani' },
  { ad: 'Roma’nın bölünmesi', yil: 395, kayit: 'roma-bolunmesi' },
];

export const varsayilanYil = -1274;
export const varsayilanKayit = 'kades-savasi';
export const yakinKartSayisi = 10;
export const acikBaslayanBolgeler = ['anadolu', 'mezopotamya'];
