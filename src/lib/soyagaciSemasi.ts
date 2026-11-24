import { z } from 'astro/zod';

export const kisiTurleri = ['ilkel', 'titan', 'olimposlu', 'tanri', 'olumlu', 'canavar'] as const;

export const cinsiyetler = ['kadin', 'erkek', 'yok'] as const;

const kimlik = z.string().regex(/^[a-z0-9-]+$/);
const kaynak = z.string().trim().min(1);

const kisiSemasi = z.object({
  kimlik,
  ad: z.string().min(1),
  tur: z.enum(kisiTurleri),
  cinsiyet: z.enum(cinsiyetler),
  grup: z.boolean().optional(),
  kayit: z.object({ bolum: z.enum(['tanrilar', 'kahramanlar']), kimlik }).optional(),
  wikidata: z.string().regex(/^Q\d+$/).optional(),
  not: z.string().min(1).optional(),
});

const ebeveynIliskisiSemasi = z.object({
  tur: z.literal('ebeveyn'),
  ebeveyn: kimlik,
  cocuk: kimlik,
  kaynak,
  anlati: z.enum(['ana', 'alternatif']),
});

const esIliskisiSemasi = z.object({
  tur: z.literal('es'),
  kisiler: z.tuple([kimlik, kimlik]),
  kaynak,
  birliktelik: z.boolean().optional(),
});

export const soyagaciSemasi = z.object({
  kisiler: z.array(kisiSemasi),
  iliskiler: z.array(z.discriminatedUnion('tur', [ebeveynIliskisiSemasi, esIliskisiSemasi])),
});

export type KisiTuru = (typeof kisiTurleri)[number];
export type Kisi = z.infer<typeof kisiSemasi>;
export type EbeveynIliskisi = z.infer<typeof ebeveynIliskisiSemasi>;
export type EsIliskisi = z.infer<typeof esIliskisiSemasi>;
export type Iliski = EbeveynIliskisi | EsIliskisi;
export type Soyagaci = z.infer<typeof soyagaciSemasi>;
