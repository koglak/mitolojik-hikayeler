import { z } from 'astro/zod';
import { sanatSemasi } from './sanatSemasi';

const metin = z.string().trim().min(1);
const kimlikler = z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]);

export const gorselSemasi = sanatSemasi.shape.gorsel.unwrap();

export const yaziSemasi = z.object({
  baslik: metin,
  konu: metin,
  ozet: metin,
  tarih: z.coerce.date(),
  gorsel: gorselSemasi,
  ilgiliMitler: kimlikler,
  ilgiliTanrilar: kimlikler,
  ilgiliKahramanlar: kimlikler,
  ilgiliKentler: kimlikler,
  ilgiliEserler: z.array(z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+$/)).default([]),
});

export type YaziGorselVerisi = z.infer<typeof gorselSemasi>;
