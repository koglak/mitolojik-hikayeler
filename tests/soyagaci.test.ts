import { describe, expect, it } from 'vitest';
import { soyagaciSemasi } from '../src/lib/soyagaciSemasi';
import { adrestenKisi, aileGruplari, akrabalar, atalar, kayittanKisi, kisiAdresi, kisiAra, soyAgaci, soyCizgisi, type SoyDugumu } from '../src/lib/soyagaci';
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

  it('alternatif çocuk ana çocuklardan ayrı, kaynağıyla verilir', () => {
    expect(akrabalar(ornek, 'khaos').cocuklar).toEqual([]);
    expect(akrabalar(ornek, 'khaos').alternatifCocuklar).toEqual([
      { kisi: expect.objectContaining({ kimlik: 'eros' }), kaynak: 'Hesiodos, Theogonia' },
    ]);
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

describe('adrestenKisi', () => {
  it('adresteki bilinen kişiyi verir', () => {
    expect(adrestenKisi(ornek, '?kisi=zeus')).toBe('zeus');
    expect(adrestenKisi(ornek, 'https://x.test/soyagaci/?kisi=herakles')).toBe('herakles');
  });

  it.each(['?kisi=yok', '?kisi=', '', 'https://x.test/soyagaci/', '?kisi=%E0%A4%A'])('%j için tanımsız döner', (adres) => {
    expect(adrestenKisi(ornek, adres)).toBeUndefined();
  });
});

describe('kisiAdresi', () => {
  it('adrestenKisi ile geri okunabilen adres verir', () => {
    expect(kisiAdresi('kastor')).toBe('/soyagaci/?kisi=kastor');
    expect(adrestenKisi(ornek, kisiAdresi('kastor'))).toBe('kastor');
  });
});

describe('aileGruplari', () => {
  const ozet = (kimlik: string, veri = ornek) =>
    aileGruplari(veri, kimlik).map((g) => [g.es?.kimlik, g.evli, g.cocuklar.map((c) => c.kimlik)]);

  it('çocukları öteki ebeveyne göre gruplar, evlileri öne alır', () => {
    expect(ozet('zeus')).toEqual([
      ['hera', true, []],
      ['alkmene', false, ['herakles']],
      ['leda', false, ['polydeukes']],
    ]);
  });

  it('aynı çiftin çocuklarını tek grupta toplar', () => {
    expect(ozet('gaia')).toEqual([['uranos', false, ['kronos', 'rhea']]]);
  });

  it('öteki ebeveyni olmayan çocukları eşsiz grupta en sona koyar', () => {
    const veri = { ...ornek, iliskiler: [{ tur: 'ebeveyn' as const, ebeveyn: 'zeus', cocuk: 'iris', kaynak: 'x', anlati: 'ana' as const }, ...ornek.iliskiler] };
    expect(ozet('zeus', veri).at(-1)).toEqual([undefined, false, ['iris']]);
  });

  it('alternatif anlatıdaki çocuğu ve akrabasızı gruplamaz', () => {
    expect(ozet('khaos')).toEqual([]);
    expect(ozet('kybele')).toEqual([]);
  });
});

describe('soyCizgisi', () => {
  it('en eski atadan kişiye en kısa yolu verir', () => {
    expect(soyCizgisi(ornek, 'herakles').map((k) => k.kimlik)).toEqual(['gaia', 'kronos', 'zeus', 'herakles'].map((k) => (k === 'kronos' ? expect.stringMatching(/^(kronos|rhea)$/) : k)));
  });

  it('atası olmayan kişide boştur', () => {
    expect(soyCizgisi(ornek, 'kybele')).toEqual([]);
    expect(soyCizgisi(ornek, 'eros')).toEqual([]);
  });
});

describe('soyAgaci', () => {
  const yaz = (d: SoyDugumu): unknown => [d.kisi.kimlik, ...d.dallar.map((dal) => [dal.es?.kimlik ?? null, dal.cocuklar.map(yaz)])];

  it('kökten başlayıp yalnızca üyeleri, eşlerine göre dallandırır', () => {
    expect(soyAgaci(ornek, ['kronos'], ['kronos', 'zeus', 'hera', 'herakles']).map(yaz)).toEqual([
      ['kronos', ['rhea', [['zeus', ['hera', []], ['alkmene', [['herakles']]]], ['hera']]]],
    ]);
  });

  it('anne babası da ağaçta olan çocuğu listede önce gelen ebeveynin altına koyar', () => {
    const veri = {
      ...ornek,
      iliskiler: [
        ...ornek.iliskiler,
        ...['zeus', 'hera'].map((e) => ({ tur: 'ebeveyn' as const, ebeveyn: e, cocuk: 'iris', kaynak: 'x', anlati: 'ana' as const })),
      ],
    };
    const ilkZeus = soyAgaci(veri, ['kronos'], ['kronos', 'zeus', 'hera', 'iris']);
    expect(ilkZeus.map(yaz)).toEqual([['kronos', ['rhea', [['zeus', ['hera', [['iris']]]], ['hera']]]]]);
    const ilkHera = soyAgaci(veri, ['kronos'], ['kronos', 'hera', 'zeus', 'iris']);
    expect(ilkHera.map(yaz)).toEqual([['kronos', ['rhea', [['hera', ['zeus', [['iris']]]], ['zeus']]]]]);
  });

  it('öncelikli ebeveyn daha derinde olsa da çocuğu onun altına koyar', () => {
    expect(soyAgaci(ornek, ['gaia', 'alkmene'], ['gaia', 'kronos', 'zeus', 'alkmene', 'herakles']).map(yaz)).toEqual([
      ['gaia', ['uranos', [['kronos', ['rhea', [['zeus', ['alkmene', [['herakles']]]]]]]]]],
      ['alkmene'],
    ]);
  });

  it('çocuksuz birlikteliği, öteki kişi de ağaçta kendi yerindeyse göstermez', () => {
    const veri = { ...ornek, iliskiler: [...ornek.iliskiler, { tur: 'es' as const, kisiler: ['iris', 'kastor'] as [string, string], kaynak: 'x', birliktelik: true }] };
    expect(soyAgaci(veri, ['iris', 'kastor'], ['iris', 'kastor']).map(yaz)).toEqual([['iris'], ['kastor']]);
    expect(soyAgaci(veri, ['iris'], ['iris', 'kastor']).map(yaz)).toEqual([['iris', ['kastor', []]]]);
  });

  it('kardeşleri listedeki sıraya göre dizer ve birden çok kökü destekler', () => {
    expect(soyAgaci(ornek, ['leda', 'kybele'], ['leda', 'polydeukes', 'kastor', 'kybele']).map(yaz)).toEqual([
      ['leda', ['zeus', [['polydeukes']]], ['tyndareos', [['kastor']]]],
      ['kybele'],
    ]);
  });
});
