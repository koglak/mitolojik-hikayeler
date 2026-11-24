import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { atlasBolgeAnahtarlari, atlasBolgeleri } from '../src/lib/zamanAtlasi/bolgeler';
import { atlasDonemleri, hizliDuraklar, varsayilanKayit, varsayilanYil } from '../src/lib/zamanAtlasi/etiketler';
import { atlasSemasi } from '../src/lib/zamanAtlasi/sema';
import { hamAtlasVerisi } from '../src/lib/zamanAtlasi/veri';
import { atlasBasi, atlasSonu, gecerliYil, koordinat } from '../src/lib/zamanAtlasi/yil';
import { kontrastOrani } from '../src/lib/kontrast';

const veri = atlasSemasi.parse(hamAtlasVerisi);
const kayitlar = [...veri.uygarliklar, ...veri.hukumdarlar, ...veri.olaylar];
const uygarliklar = new Map(veri.uygarliklar.map((u) => [u.kimlik, u]));
const kaynaklar = new Map(veri.kaynaklar.map((k) => [k.kimlik, k]));

describe('zaman atlası verisi', () => {
  it('temel savaş, antlaşma ve hükümdarları içerir', () => {
    const kimlikler = new Set(kayitlar.map((k) => k.kimlik));
    const beklenen = [
      'peloponnesos-savasi', 'thermopylai', 'salamis', 'leuktra', 'khaironeia', 'gaugamela', 'ipsos', 'magnesia', 'cannae',
      'karrhai', 'actium', 'edessa', 'kral-barisi', 'apameia', 'alaksandu-antlasmasi', 'mursili-ii', 'menua', 'gyges',
      'mausolos', 'eumenes-ii', 'dareios-i', 'philippos-ii', 'hadrianus', 'sapur-i',
    ];
    expect(beklenen.filter((kimlik) => !kimlikler.has(kimlik))).toEqual([]);
  });

  it('hükümdarlar ve olaylar eskiden yeniye sıralı', () => {
    for (const liste of [veri.hukumdarlar, veri.olaylar]) {
      const yillar = liste.map((k) => k.donemler[0].bas);
      expect(yillar).toEqual([...yillar].sort((a, b) => a - b));
    }
  });

  it('aynı ad iki kez kullanılmaz', () => {
    for (const liste of [veri.uygarliklar, veri.olaylar]) {
      const adlar = liste.map((k) => k.ad);
      expect(adlar.filter((ad, i) => adlar.indexOf(ad) !== i)).toEqual([]);
    }
    const hukumdarlar = veri.hukumdarlar.map((k) => `${k.ad} ${k.uygarlik}`);
    expect(new Set(hukumdarlar).size).toBe(hukumdarlar.length);
  });

  it('kimlikler bütün kayıtlar arasında tekrarsız', () => {
    expect(new Set(kayitlar.map((k) => k.kimlik)).size).toBe(kayitlar.length);
    expect(kaynaklar.size).toBe(veri.kaynaklar.length);
  });

  it('her bölgede uygarlık var', () => {
    for (const bolge of atlasBolgeAnahtarlari) expect(veri.uygarliklar.some((u) => u.bolge === bolge), bolge).toBe(true);
  });

  it('her kayıt çizelge aralığıyla kesişir', () => {
    for (const kayit of kayitlar)
      for (const { bas, son } of kayit.donemler) {
        expect(son, kayit.kimlik).toBeGreaterThanOrEqual(atlasBasi);
        expect(bas, kayit.kimlik).toBeLessThanOrEqual(atlasSonu);
      }
  });

  it('ilişkili uygarlıklar var ve kayıt kendisine işaret etmiyor', () => {
    for (const kayit of kayitlar)
      for (const kimlik of kayit.iliskiliUygarliklar) {
        expect(uygarliklar.has(kimlik), `${kayit.kimlik} → ${kimlik}`).toBe(true);
        expect(kimlik).not.toBe(kayit.kimlik);
      }
  });

  it('hükümdarların dönemi uygarlığınınkiyle kesişir, olaylar uygarlık dönemine düşer', () => {
    for (const kayit of [...veri.hukumdarlar, ...veri.olaylar]) {
      const uygarlik = uygarliklar.get(kayit.uygarlik);
      expect(uygarlik, kayit.kimlik).toBeDefined();
      for (const d of kayit.donemler)
        expect(uygarlik!.donemler.some((u) => u.bas <= d.son && d.bas <= u.son), kayit.kimlik).toBe(true);
    }
  });

  it('olayların tek dönemi var', () => {
    for (const olay of veri.olaylar) expect(olay.donemler, olay.kimlik).toHaveLength(1);
  });

  it('mitolojik kayıtların tarihi geleneksel sayılır', () => {
    for (const kayit of [...veri.hukumdarlar, ...veri.olaylar])
      if (kayit.nitelik === 'mitolojik') for (const d of kayit.donemler) expect(d.kesinlik, kayit.kimlik).toBe('geleneksel');
  });

  it('kaynakça var olan kaynaklara gider, kullanılmayan kaynak yok', () => {
    const anilan = new Set(kayitlar.flatMap((k) => k.kaynakca.map((a) => a.kaynak)));
    expect([...anilan].filter((kimlik) => !kaynaklar.has(kimlik))).toEqual([]);
    expect([...kaynaklar.keys()].filter((kimlik) => !anilan.has(kimlik))).toEqual([]);
  });

  it('bağlantılar var olan içeriğe gider', () => {
    const var_ = (klasor: string, kimlik: string) => existsSync(join('src/content', klasor, `${kimlik}.md`));
    for (const kayit of kayitlar)
      for (const [klasor, kimlikler] of Object.entries(kayit.baglantilar))
        for (const kimlik of kimlikler) expect(var_(klasor, kimlik), `${kayit.kimlik}: ${klasor}/${kimlik}`).toBe(true);
    for (const { kimlik, eser } of veri.kaynaklar) if (eser) expect(var_('eserler', eser), kimlik).toBe(true);
  });

  it('Kommagene kesintili', () => {
    expect(uygarliklar.get('kommagene')!.donemler.map(({ bas, son }) => [bas, son])).toEqual([[-163, 17], [38, 72]]);
  });
});

describe('atlas şeması', () => {
  const ilk = hamAtlasVerisi.uygarliklar[0];
  const dene = (donemler: unknown) => atlasSemasi.safeParse({ ...hamAtlasVerisi, uygarliklar: [{ ...ilk, donemler }] }).success;

  it('sıfır yılını, ters dönemi ve çakışan dönemleri reddeder', () => {
    expect(dene([{ bas: 0, son: 5, kesinlik: 'kesin' }])).toBe(false);
    expect(dene([{ bas: 5, son: -5, kesinlik: 'kesin' }])).toBe(false);
    expect(dene([{ bas: -10, son: 5, kesinlik: 'kesin' }, { bas: 5, son: 9, kesinlik: 'kesin' }])).toBe(false);
    expect(dene([])).toBe(false);
    expect(dene([{ bas: -10, son: 5, kesinlik: 'kesin' }, { bas: 6, son: 9, kesinlik: 'kesin' }])).toBe(true);
  });
});

describe('atlas sabitleri', () => {
  it('çağ süzgeçleri geçerli yıllar kullanır', () => {
    for (const { bas, son, ad } of atlasDonemleri) {
      expect(gecerliYil(bas) && gecerliYil(son), ad).toBe(true);
      expect(koordinat(bas)).toBeLessThan(koordinat(son));
    }
  });

  it('hızlı duraklar ve varsayılan seçim kaydın yılına gider', () => {
    for (const { kayit, yil } of [...hizliDuraklar, { kayit: varsayilanKayit, yil: varsayilanYil }]) {
      const olay = veri.olaylar.find((o) => o.kimlik === kayit);
      expect(olay?.donemler[0].bas, kayit).toBe(yil);
    }
  });

  it('bölge renkleri koyu zeminde ve üstlerindeki koyu yazıda okunur', () => {
    for (const { ad, renk } of Object.values(atlasBolgeleri)) {
      expect(kontrastOrani(renk, '#10151c'), ad).toBeGreaterThanOrEqual(4.5);
      expect(kontrastOrani(renk, '#202834'), ad).toBeGreaterThanOrEqual(4.5);
    }
  });
});
