export const blogAdi = 'Blog';
export const blogAdresi = '/blog/';
export const blogAciklamasi = 'Antik dünyanın kitapları, müziği, savaşları ve insanları üzerine yazılar.';

export const yaziAdresi = (kimlik: string) => `${blogAdresi}${kimlik}/`;

const dakikadakiSozcuk = 180;

export const okumaSuresi = (metin: string) =>
  Math.max(1, Math.ceil(metin.split(/\s+/).filter(Boolean).length / dakikadakiSozcuk));
