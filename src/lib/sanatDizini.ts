import { getCollection } from 'astro:content';
import hamMuzeler from '../data/muzeler.json';
import type { Muze } from './sanatSemasi';

export const muzeler: Record<string, Muze> = hamMuzeler;

export const sanatEserleriniGetir = async () =>
  (await getCollection('sanat')).sort((a, b) => a.data.siralamaYili - b.data.siralamaYili || a.data.sira - b.data.sira);
