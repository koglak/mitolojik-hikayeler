import { mutlakAdres } from './site';
import { xmlKacir } from './xml';

export interface SiteHaritasiOgesi {
  yol: string;
  sonDegisiklik?: Date;
}

const ogeXml = ({ yol, sonDegisiklik }: SiteHaritasiOgesi) => {
  const adres = `<loc>${xmlKacir(mutlakAdres(yol))}</loc>`;
  const tarih = sonDegisiklik ? `<lastmod>${sonDegisiklik.toISOString()}</lastmod>` : '';
  return `  <url>${adres}${tarih}</url>`;
};

export const siteHaritasiXml = (ogeler: SiteHaritasiOgesi[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ogeler.map(ogeXml).join('\n')}\n</urlset>\n`;
