import type { Atlas } from './sorgu';
import { atlasBasi, atlasSonu, gecerliYil } from './yil';

export const kronolojiAdresi = '/kronoloji/';

export interface AtlasDurumu {
  yil?: number;
  kayit?: string;
}

export const kayitBaslangicYili = (atlas: Atlas, kimlik: string) =>
  Math.min(atlasSonu, Math.max(atlasBasi, atlas.kayitlar.get(kimlik)!.kayit.donemler[0].bas));

export function adresiOku(atlas: Atlas, arama: string): AtlasDurumu {
  const parametreler = new URLSearchParams(arama);
  const durum: AtlasDurumu = {};
  const yil = Number(parametreler.get('yil'));
  if (gecerliYil(yil)) durum.yil = yil;
  const kayit = parametreler.get('kayit');
  if (kayit && atlas.kayitlar.has(kayit)) {
    durum.kayit = kayit;
    durum.yil ??= kayitBaslangicYili(atlas, kayit);
  }
  return durum;
}

export function adresYaz({ yil, kayit }: AtlasDurumu): string {
  const parametreler = new URLSearchParams();
  if (yil !== undefined) parametreler.set('yil', String(yil));
  if (kayit) parametreler.set('kayit', kayit);
  const sorgu = parametreler.toString();
  return sorgu ? `${kronolojiAdresi}?${sorgu}` : kronolojiAdresi;
}
