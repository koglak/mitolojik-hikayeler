import type { Kisi, KisiTuru } from './soyagaciSemasi';

export interface RenkKodu {
  kod: 'tanri' | 'tanrica' | 'titan' | 'canavar' | 'kadin' | 'erkek' | 'diger';
  ad: string;
  aciklama: string;
  renk: string;
  bicim: 'daire' | 'baklava' | 'ucgen' | 'kare';
}

export const renkKodlari: RenkKodu[] = [
  { kod: 'tanri', ad: 'Tanrı', aciklama: 'Erkek tanrılar', renk: '#f2cb5c', bicim: 'daire' },
  { kod: 'tanrica', ad: 'Tanrıça', aciklama: 'Tanrıçalar ve periler', renk: '#d7a0f2', bicim: 'daire' },
  { kod: 'titan', ad: 'Titan', aciklama: 'Titanlar ve çocukları', renk: '#4fcab8', bicim: 'baklava' },
  { kod: 'canavar', ad: 'Canavar', aciklama: 'Canavarlar, devler, yarı insanlar', renk: '#ff7b6b', bicim: 'ucgen' },
  { kod: 'kadin', ad: 'Kadın', aciklama: 'Ölümlü ve yarı tanrı kadınlar', renk: '#ffb3d1', bicim: 'kare' },
  { kod: 'erkek', ad: 'Erkek', aciklama: 'Ölümlü ve yarı tanrı erkekler', renk: '#86b8f7', bicim: 'kare' },
  { kod: 'diger', ad: 'Diğer', aciklama: 'Cinsiyetsiz, çift cinsiyetli ya da karışık topluluk', renk: '#b9b8b2', bicim: 'daire' },
];

const kodaGore = new Map(renkKodlari.map((renk) => [renk.kod, renk]));
const olumsuzKodlari = { erkek: 'tanri', kadin: 'tanrica', yok: 'diger' } as const;
const olumluKodlari = { erkek: 'erkek', kadin: 'kadin', yok: 'diger' } as const;
const ekTanimlar: Partial<Record<KisiTuru, string>> = { ilkel: 'İlk varlık', olimposlu: 'Olimposlu' };

export function renkKodu({ tur, cinsiyet }: Kisi): RenkKodu {
  if (tur === 'titan' || tur === 'canavar') return kodaGore.get(tur)!;
  return kodaGore.get(tur === 'olumlu' ? olumluKodlari[cinsiyet] : olumsuzKodlari[cinsiyet])!;
}

export const kisiTanimi = (kisi: Kisi) => [renkKodu(kisi).ad, ekTanimlar[kisi.tur]].filter(Boolean).join(' · ');
