import { describe, expect, it } from 'vitest';
import { soyagaciSemasi } from '../src/lib/soyagaciSemasi';
import { akrabalar, atalar, kayittanKisi, kisiAra, odakKumesi, torunlar } from '../src/lib/soyagaci';
import { ornek } from './soyagaciOrnek';

describe('soyagaciSemasi', () => {
  it('örnek veriyi kabul eder', () => {
    expect(soyagaciSemasi.safeParse(ornek).success).toBe(true);
  });

  it('ASCII olmayan kimliği reddeder', () => {
    const bozuk = { ...ornek, kisiler: [{ ...ornek.kisiler[0], kimlik: 'Zeus' }, ...ornek.kisiler.slice(1)] };
    expect(soyagaciSemasi.safeParse(bozuk).success).toBe(false);
  });

  it('boş kaynaklı ilişkiyi reddeder', () => {
    const bozuk = { ...ornek, iliskiler: [{ tur: 'es', kisiler: ['zeus', 'hera'], kaynak: '' }] };
    expect(soyagaciSemasi.safeParse(bozuk).success).toBe(false);
  });
});

describe('atalar', () => {
  it('ana anlatıdaki bütün ataları verir', () => {
    expect([...atalar(ornek, 'herakles')].sort()).toEqual(['alkmene', 'gaia', 'kronos', 'rhea', 'uranos', 'zeus']);
  });

  it('alternatif anlatıyı izlemez', () => {
    expect(atalar(ornek, 'eros').size).toBe(0);
  });
});

describe('torunlar', () => {
  it('bütün alt kuşakları verir', () => {
    expect(torunlar(ornek, 'kronos')).toEqual(new Set(['zeus', 'hera', 'herakles', 'polydeukes']));
  });
});

describe('odakKumesi', () => {
  it('kişiyi, atalarını, torunlarını ve eşlerini içerir', () => {
    const kume = odakKumesi(ornek, 'zeus');
    expect(kume.has('zeus')).toBe(true);
    expect(kume.has('kronos')).toBe(true);
    expect(kume.has('herakles')).toBe(true);
    expect(kume.has('hera')).toBe(true);
    expect(kume.has('kastor')).toBe(false);
  });
});

describe('akrabalar', () => {
  it('ebeveyn, eş ve çocukları verir', () => {
    const zeus = akrabalar(ornek, 'zeus');
    expect(zeus.ebeveynler.map((k) => k.kimlik).sort()).toEqual(['kronos', 'rhea']);
    expect(zeus.esler.map((k) => k.kimlik)).toEqual(['hera']);
    expect(zeus.cocuklar.map((k) => k.kimlik).sort()).toEqual(['herakles', 'polydeukes']);
  });

  it('alternatif ebeveyni kaynağıyla ayrı verir', () => {
    const eros = akrabalar(ornek, 'eros');
    expect(eros.ebeveynler).toEqual([]);
    expect(eros.alternatifEbeveynler.map((a) => a.kisi.kimlik)).toEqual(['khaos']);
    expect(eros.alternatifEbeveynler[0].kaynak).toBe('Hesiodos, Theogonia');
  });

  it('alternatif çocuk ana çocuklar arasında sayılmaz', () => {
    expect(akrabalar(ornek, 'khaos').cocuklar).toEqual([]);
  });
});

describe('kayittanKisi', () => {
  it('tek kişilik kayıtta o kişiyi verir', () => {
    expect(kayittanKisi(ornek, 'tanrilar', 'zeus')).toBe('zeus');
  });

  it('iki kişilik kayıtta ilk kişiyi verir', () => {
    expect(kayittanKisi(ornek, 'kahramanlar', 'kastor-ve-polydeukes')).toBe('kastor');
  });

  it('bilinmeyen kayıtta tanımsız döner', () => {
    expect(kayittanKisi(ornek, 'kahramanlar', 'yok')).toBeUndefined();
    expect(kayittanKisi(ornek, 'kahramanlar', 'zeus')).toBeUndefined();
  });
});

describe('kisiAra', () => {
  it('Türkçe büyük harfle arananı bulur', () => {
    expect(kisiAra(ornek, 'İR')[0]?.kimlik).toBe('iris');
  });

  it('tam eşleşmeyi öne alır, sonra başı eşleşenleri', () => {
    expect(kisiAra(ornek, 'HERA').map((k) => k.kimlik)).toEqual(['hera', 'herakles']);
  });

  it('içinde geçen adı da bulur', () => {
    expect(kisiAra(ornek, 'akles')[0].kimlik).toBe('herakles');
  });

  it('boş sorguda boş liste döner', () => {
    expect(kisiAra(ornek, '  ')).toEqual([]);
  });

  it('en fazla 8 sonuç döner', () => {
    expect(kisiAra(ornek, 'a').length).toBeLessThanOrEqual(8);
  });
});
