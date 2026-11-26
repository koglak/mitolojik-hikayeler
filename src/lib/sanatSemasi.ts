import { z } from 'astro/zod';
import { lisansKabul, sanatTuruAnahtarlari } from './sanat';

const metin = z.string().trim().min(1);
const kimlik = z.string().regex(/^[a-z0-9-]+$/);
const adres = z.string().regex(/^https:\/\/\S+$/);
const kimlikler = z.array(kimlik).default([]);

export const sanatSemasi = z.object({
  ad: metin,
  ozgunAd: metin.optional(),
  sira: z.number().int().positive(),
  tur: z.enum(sanatTuruAnahtarlari),
  sanatci: metin.optional(),
  tarih: metin,
  siralamaYili: z
    .number()
    .int()
    .refine((yil) => yil !== 0, 'Sıfır yılı yoktur'),
  malzeme: metin,
  muze: kimlik,
  konumNotu: metin.optional(),
  ozet: metin,
  aramaTerimleri: z.array(metin).default([]),
  kaynak: metin.optional(),
  kaynakca: z.array(z.object({ ad: metin, adres })).min(1),
  ilgiliMitler: kimlikler,
  ilgiliTanrilar: kimlikler,
  ilgiliKahramanlar: kimlikler,
  ilgiliKentler: kimlikler,
  gorsel: z
    .object({
      adres: z.string().regex(/^(?:https:\/\/(?:upload|thumb)\.wikimedia\.org\/[^\s?]+|https:\/\/www\.museicapitolini\.org\/[^\s?]+|https:\/\/cdn\.sanity\.io\/images\/[^\s]+|https:\/\/www\.metmuseum\.org\/(?:[a-z]{2}\/)?-\/media\/[^\s]+|https:\/\/www\.datocms-assets\.com\/103094\/[^\s]+|https:\/\/media\.britishmuseum\.org\/media\/Repository\/Documents\/[^\s]+|https:\/\/www\.smb\.museum\/uploads\/tx_smb\/events\/[^\s]+|\/sanat-eserleri\/[a-z0-9-]+\.jpg)$/),
      genislik: z.number().int().positive(),
      yukseklik: z.number().int().positive(),
      alt: metin,
      sahibi: metin,
      lisans: z.string().refine(lisansKabul, 'Kabul edilmeyen lisans'),
      lisansAdresi: adres.optional(),
      kaynakAdresi: adres,
    })
    .optional(),
});

export type SanatEseri = z.infer<typeof sanatSemasi>;

export const muzeSemasi = z.object({
  ad: metin,
  kent: metin,
  ulke: metin,
  enlem: z.number().min(-90).max(90),
  boylam: z.number().min(-180).max(180),
});

export type Muze = z.infer<typeof muzeSemasi>;
