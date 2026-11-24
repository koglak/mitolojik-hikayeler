import { z } from 'astro/zod';
import { atlasBolgeAnahtarlari } from './bolgeler';
import { dogrulamaAnahtarlari, kesinlikAnahtarlari, nitelikAnahtarlari, olayTuruAnahtarlari, uygarlikTuruAnahtarlari } from './etiketler';

const metin = z.string().trim().min(1);
const kimlik = z.string().regex(/^[a-z0-9-]+$/);
const eserKimligi = z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+$/);

const yil = z
  .number()
  .int()
  .refine((deger) => deger !== 0, 'Sıfır yılı yoktur');

const donem = z
  .object({ bas: yil, son: yil, kesinlik: z.enum(kesinlikAnahtarlari), not: metin.optional() })
  .refine(({ bas, son }) => bas <= son, 'Dönem başlangıcı bitişinden sonra olamaz');

const donemler = z
  .array(donem)
  .min(1)
  .refine((liste) => liste.every((d, i) => i === 0 || liste[i - 1].son < d.bas), 'Dönemler sıralı ve ayrık olmalı');

const baglantilar = z.object({
  mitler: z.array(kimlik).default([]),
  kentler: z.array(kimlik).default([]),
  tanrilar: z.array(kimlik).default([]),
  kahramanlar: z.array(kimlik).default([]),
  eserler: z.array(eserKimligi).default([]),
});

const ortakAlanlar = {
  kimlik,
  ad: metin,
  ozet: metin,
  donemler,
  iliskiliUygarliklar: z.array(kimlik).default([]),
  kaynakca: z.array(z.object({ kaynak: kimlik, yer: metin.optional() })).min(1),
  dogrulama: z.enum(dogrulamaAnahtarlari),
  baglantilar: baglantilar.prefault({}),
};

const uygarlikSemasi = z.object({
  ...ortakAlanlar,
  tur: z.enum(uygarlikTuruAnahtarlari),
  bolge: z.enum(atlasBolgeAnahtarlari),
  yer: metin,
  harita: z
    .object({
      merkez: z.object({ enlem: z.number().min(-90).max(90), boylam: z.number().min(-180).max(180) }).optional(),
      sinirlar: z.array(z.object({ bas: yil, son: yil, sinir: kimlik })).default([]),
    })
    .optional(),
});

const hukumdarSemasi = z.object({
  ...ortakAlanlar,
  uygarlik: kimlik,
  nitelik: z.enum(nitelikAnahtarlari),
});

const olaySemasi = z.object({
  ...ortakAlanlar,
  uygarlik: kimlik,
  nitelik: z.enum(nitelikAnahtarlari),
  tur: z.enum(olayTuruAnahtarlari),
  yer: metin.optional(),
});

const kaynakSemasi = z.object({
  kimlik,
  ad: metin,
  yazar: metin.optional(),
  kunye: metin.optional(),
  tur: z.enum(['antik', 'modern', 'cevrimici']),
  eser: eserKimligi.optional(),
  adres: z.url().optional(),
});

export const atlasSemasi = z.object({
  uygarliklar: z.array(uygarlikSemasi),
  hukumdarlar: z.array(hukumdarSemasi),
  olaylar: z.array(olaySemasi),
  kaynaklar: z.array(kaynakSemasi),
});

export type AtlasVerisi = z.infer<typeof atlasSemasi>;
export type Uygarlik = z.infer<typeof uygarlikSemasi>;
export type Hukumdar = z.infer<typeof hukumdarSemasi>;
export type Olay = z.infer<typeof olaySemasi>;
export type Kaynak = z.infer<typeof kaynakSemasi>;
export type Donem = z.infer<typeof donem>;
