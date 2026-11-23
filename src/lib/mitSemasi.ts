import { z } from 'astro/zod';

export const mitSemasi = z.object({
  baslik: z.string().min(1),
  sira: z.number().int().positive(),
  sure: z.number().int().positive(),
  tur: z.enum(['Tanrılar', 'Kahramanlar', 'Ölümlüler']),
  ozet: z.string().min(1),
  kartlar: z
    .array(z.object({ metin: z.string().min(1) }))
    .min(8)
    .max(12),
  bugunBag: z.object({
    kelime: z.string().min(1),
    aciklama: z.string().min(1),
  }),
});

export type Mit = z.infer<typeof mitSemasi>;
export type MitTuru = Mit['tur'];
export const mitTurleri: MitTuru[] = ['Tanrılar', 'Kahramanlar', 'Ölümlüler'];
