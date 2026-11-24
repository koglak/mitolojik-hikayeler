import { mutlakAdres } from './site';
import { xmlKacir } from './xml';

export const rssAdresi = '/rss.xml';

export interface RssKanali {
  baslik: string;
  aciklama: string;
  yol: string;
  akisYolu: string;
}

export interface RssOgesi {
  baslik: string;
  ozet: string;
  yol: string;
  tarih: Date;
}

const ogeXml = ({ baslik, ozet, yol, tarih }: RssOgesi) => {
  const adres = xmlKacir(mutlakAdres(yol));
  return [
    '    <item>',
    `      <title>${xmlKacir(baslik)}</title>`,
    `      <link>${adres}</link>`,
    `      <guid isPermaLink="true">${adres}</guid>`,
    `      <description>${xmlKacir(ozet)}</description>`,
    `      <pubDate>${tarih.toUTCString()}</pubDate>`,
    '    </item>',
  ].join('\n');
};

export const rssXml = (kanal: RssKanali, ogeler: RssOgesi[]) =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${xmlKacir(kanal.baslik)}</title>`,
    `    <link>${xmlKacir(mutlakAdres(kanal.yol))}</link>`,
    `    <description>${xmlKacir(kanal.aciklama)}</description>`,
    '    <language>tr</language>',
    `    <atom:link href="${xmlKacir(mutlakAdres(kanal.akisYolu))}" rel="self" type="application/rss+xml"/>`,
    ...ogeler.map(ogeXml),
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
