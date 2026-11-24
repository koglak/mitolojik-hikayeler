import { describe, expect, it } from 'vitest';
import { rssXml } from '../src/lib/rss';
import { siteHaritasiXml } from '../src/lib/siteHaritasi';

describe('siteHaritasiXml', () => {
  it('tarihi olan adrese lastmod yazar', () => {
    const xml = siteHaritasiXml([{ yol: '/mitler/midas/', sonDegisiklik: new Date('2026-11-24T09:30:21Z') }]);
    expect(xml).toContain(
      '<url><loc>https://mitolojikhikayeler.com/mitler/midas/</loc><lastmod>2026-11-24T09:30:21.000Z</lastmod></url>',
    );
  });

  it('tarihi olmayan adreste lastmod yazmaz', () => {
    const xml = siteHaritasiXml([{ yol: '/biz-kimiz/' }]);
    expect(xml).toContain('<loc>https://mitolojikhikayeler.com/biz-kimiz/</loc></url>');
    expect(xml).not.toContain('lastmod');
  });
});

describe('rssXml', () => {
  const kanal = { baslik: 'Blog', aciklama: 'Yazılar', yol: '/blog/', akisYolu: '/rss.xml' };
  const yazi = { baslik: 'Frig & Lidya', ozet: 'Kral <Midas>', yol: '/blog/frig/', tarih: new Date('2026-11-24') };

  it('özel karakterleri kaçırır ve tarihi RFC 822 biçiminde yazar', () => {
    const xml = rssXml(kanal, [yazi]);
    expect(xml).toContain('<title>Frig &amp; Lidya</title>');
    expect(xml).toContain('<description>Kral &lt;Midas&gt;</description>');
    expect(xml).toContain('<pubDate>Tue, 24 Nov 2026 00:00:00 GMT</pubDate>');
    expect(xml).toContain('<guid isPermaLink="true">https://mitolojikhikayeler.com/blog/frig/</guid>');
  });

  it('kendi adresini ve dili bildirir', () => {
    const xml = rssXml(kanal, []);
    expect(xml).toContain('<atom:link href="https://mitolojikhikayeler.com/rss.xml" rel="self" type="application/rss+xml"/>');
    expect(xml).toContain('<language>tr</language>');
  });
});
