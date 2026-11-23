import { z } from 'astro/zod';

export const kayitSemasi = z.object({
  ad: z.string().min(1),
  sira: z.number().int().positive(),
  ozet: z.string().min(1),
  bilgiler: z
    .array(z.object({ etiket: z.string().min(1), deger: z.string().min(1) }))
    .min(2)
    .max(5),
  kaynak: z.string().min(1),
  ilgiliMitler: z.array(z.string().min(1)).default([]),
  konum: z
    .object({ enlem: z.number().min(-90).max(90), boylam: z.number().min(-180).max(180) })
    .optional(),
});

export type Kayit = z.infer<typeof kayitSemasi>;
