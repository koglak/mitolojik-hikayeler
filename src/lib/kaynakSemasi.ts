import { z } from 'astro/zod';
import { durumAnahtarlari, eserTuruAnahtarlari, gelenekAnahtarlari } from './antikKaynaklar';

const metin = z.string().min(1);

export const yazarSemasi = z.object({
  ad: metin,
  ozgunAd: metin,
  digerAdlar: z.array(metin).default([]),
  gelenek: z.enum(gelenekAnahtarlari),
  dil: z.enum(['Yunanca', 'Latince']),
  donem: metin,
  siralamaYili: z.number().int(),
  yer: metin,
  ugras: metin,
  ozet: metin,
});

export const eserSemasi = z.object({
  ad: metin,
  ozgunAd: metin,
  digerAdlar: z.array(metin).default([]),
  atifAdlari: z.array(metin).default([]),
  yazar: metin,
  sira: z.number().int().positive(),
  tur: z.enum(eserTuruAnahtarlari),
  donem: metin,
  durum: z.enum(durumAnahtarlari),
  ozet: metin,
});
