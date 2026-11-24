import { getCollection } from 'astro:content';

export const blogYazilariniGetir = async () =>
  (await getCollection('blog')).sort(
    (a, b) => b.data.tarih.getTime() - a.data.tarih.getTime() || a.data.baslik.localeCompare(b.data.baslik, 'tr'),
  );
