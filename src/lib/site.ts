export const siteAdresi = 'https://mitolojikhikayeler.com';
export const siteAdi = 'Mitolojik Hikâyeler';
export const siteKisaAdi = 'Mythos';
export const varsayilanPaylasimGorseli = '/paylasim/site.png';

export const sayfaBasligi = (baslik?: string) => (baslik ? `${baslik} · ${siteAdi}` : siteAdi);

export function kanonikYol(yol: string): string {
  const temiz = yol.replace(/\/index\.html$/, '/').replace(/\/{2,}/g, '/');
  if (temiz === '' || temiz === '/') return '/';
  if (/\.[a-z0-9]+$/i.test(temiz)) return temiz;
  return temiz.endsWith('/') ? temiz : `${temiz}/`;
}

export const mutlakAdres = (yol: string) => new URL(kanonikYol(yol), siteAdresi).href;
