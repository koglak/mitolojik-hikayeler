import { z } from 'astro/zod';
import { bolgeAnahtarlari } from './bolgeler';
import { gorselSemasi } from './yaziSemasi';

export const tapinakSemasi = z.object({
  ad: z.string().min(1),
  tanrilar: z.array(z.string().min(1)).min(1),
});

export const yapiSemasi = z.object({
  ad: z.string().min(1),
  aciklama: z.string().min(1),
  gorsel: gorselSemasi.optional(),
});

export const kayitSemasi = z.object({
  ad: z.string().min(1),
  sira: z.number().int().positive(),
  ozet: z.string().min(1),
  bilgiler: z
    .array(z.object({ etiket: z.string().min(1), deger: z.string().min(1) }))
    .min(2)
    .max(6),
  kaynak: z.string().min(1),
  ilgiliMitler: z.array(z.string().min(1)).default([]),
  ilgiliKentler: z.array(z.string().min(1)).default([]),
  ilgiliTanrilar: z.array(z.string().min(1)).default([]),
  ilgiliKahramanlar: z.array(z.string().min(1)).default([]),
  konum: z
    .object({ enlem: z.number().min(-90).max(90), boylam: z.number().min(-180).max(180) })
    .optional(),
  bolge: z.enum(bolgeAnahtarlari).optional(),
  kunyeGorseli: gorselSemasi
    .extend({
      adres: gorselSemasi.shape.adres
        .or(z.string().regex(/^\/kent-haritalari\/[a-z0-9-]+\.png$/))
        .or(z.string().regex(/^\/kent-gorselleri\/[a-z0-9-]+\.png$/)),
      lisans: gorselSemasi.shape.lisans.or(z.enum(['Free Art License', 'ODbL 1.0', 'AI-generated (OpenAI)'])),
      kaynakAdi: z.literal('OpenStreetMap').optional(),
      wikidata: z.string().regex(/^Q[1-9]\d*$/).optional(),
    })
    .optional(),
  tapinaklar: z.array(tapinakSemasi).default([]),
  yapilar: z.array(yapiSemasi).default([]),
});

export type Kayit = z.infer<typeof kayitSemasi>;
