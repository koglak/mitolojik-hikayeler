import { describe, expect, it } from 'vitest';
import { adresiOku, adresYaz } from '../src/lib/zamanAtlasi/adres';
import { katmanAnahtarlari, type Katman } from '../src/lib/zamanAtlasi/etiketler';
import { atlasSemasi } from '../src/lib/zamanAtlasi/sema';
import { bolgeBosluklari, gorunum, kayitlariDizinle, yakinOlaylar, yilKesiti, type Suzgec } from '../src/lib/zamanAtlasi/sorgu';
import { hamAtlasVerisi } from '../src/lib/zamanAtlasi/veri';

const atlas = kayitlariDizinle(atlasSemasi.parse(hamAtlasVerisi));
const suzgec = (degisen: Partial<Suzgec> = {}): Suzgec => ({
  arama: '',
  bolge: 'tum',
  katmanlar: new Set<Katman>(katmanAnahtarlari),
  bas: -3500,
  son: 500,
  ...degisen,
});
const haric = (...cikan: Katman[]) => new Set(katmanAnahtarlari.filter((k) => !cikan.includes(k)));

describe('yilKesiti', () => {
  const kimlikler = (yil: number) => yilKesiti(atlas, yil).uygarliklar.map((u) => u.kimlik);

  it('MÖ 1274 kesiti', () => {
    const kesit = yilKesiti(atlas, -1274);
    expect(kimlikler(-1274)).toEqual(expect.arrayContaining(['hitit', 'yeni-krallik', 'miken', 'troya-vi-viia', 'orta-asur']));
    expect(kimlikler(-1274)).not.toContain('mitanni');
    expect(kesit.hukumdarlar.map((h) => h.kimlik)).toEqual(['muvatalli-ii', 'ramses-ii', 'untas-napirisa']);
    expect(kesit.olaylar.map((o) => o.kimlik)).toEqual(['kades-savasi']);
  });

  it('yıllara yayılan olay süresi boyunca kesitte kalır', () => {
    const olaylar = (yil: number) => yilKesiti(atlas, yil).olaylar.map((o) => o.kimlik);
    expect(olaylar(-420)).toContain('peloponnesos-savasi');
    expect(olaylar(-403)).not.toContain('peloponnesos-savasi');
  });

  it('kesintili dönemde devlet yok', () => {
    expect(kimlikler(17)).toContain('kommagene');
    expect(kimlikler(20)).not.toContain('kommagene');
    expect(kimlikler(40)).toContain('kommagene');
  });

  it('çağ geçişinde süreklilik', () => {
    expect(kimlikler(-1)).toContain('roma-imparatorlugu');
    expect(kimlikler(1)).toContain('roma-imparatorlugu');
  });
});

describe('bolgeBosluklari', () => {
  it('Mısır’daki veri boşluklarını bulur', () => {
    expect(bolgeBosluklari(atlas, 'misir')).toEqual([
      { bas: -3500, son: -3101 },
      { bas: -2180, son: -2056 },
      { bas: -1649, son: -1551 },
      { bas: -331, son: -306 },
      { bas: -29, son: 500 },
    ]);
  });

  it('sınırda biten dönem boşluk bırakmaz, çakışanlar birleşir', () => {
    expect(bolgeBosluklari(atlas, 'anadolu')).toEqual([{ bas: -3500, son: -2501 }]);
  });
});

describe('gorunum', () => {
  it('süzgeçsiz bütün uygarlık ve hükümdarlar satır, olaylar işaret ve kart', () => {
    const g = gorunum(atlas, suzgec());
    const { uygarliklar, hukumdarlar, olaylar } = atlas.veri;
    expect(g.satirlar.size).toBe(uygarliklar.length + hukumdarlar.length);
    expect(g.isaretler.size).toBe(olaylar.length);
    expect(g.kartlar.size).toBe(olaylar.length);
    expect(g.toplam).toBe(atlas.kayitlar.size);
  });

  it('dönem süzgeci', () => {
    const g = gorunum(atlas, suzgec({ bas: -30, son: 500 }));
    expect(g.satirlar.has('hitit')).toBe(false);
    expect(g.satirlar.has('kommagene')).toBe(true);
    expect(g.kartlar.has('nemrut-kutsal-alani')).toBe(false);
  });

  it('bölge süzgeci', () => {
    const g = gorunum(atlas, suzgec({ bolge: 'misir' }));
    for (const kimlik of g.satirlar) expect(atlas.kayitlar.get(kimlik)!.bolge, kimlik).toBe('misir');
    expect(g.satirlar.has('ramses-ii')).toBe(true);
    expect(g.satirlar.has('hitit')).toBe(false);
    expect([...g.bolgeler.keys()]).toEqual(['misir']);
  });

  it('arama büyük küçük harfe ve Türkçe işaretlere duyarsız', () => {
    for (const arama of ['HİTİT', 'hitit', ' Hitit ']) expect(gorunum(atlas, suzgec({ arama })).satirlar.has('hitit')).toBe(true);
    for (const arama of ['sumer', 'SÜMER']) expect(gorunum(atlas, suzgec({ arama })).satirlar.has('sumer-kentleri')).toBe(true);
  });

  it('arama, bulunan olayı satır yapar ve uygarlığını da gösterir', () => {
    const g = gorunum(atlas, suzgec({ arama: 'marathon' }));
    expect(g.satirlar.has('marathon-savasi')).toBe(true);
    expect(g.satirlar.has('arkaik-yunanistan')).toBe(true);
    expect([...g.kartlar]).toEqual(['marathon-savasi']);
  });

  it('eşleşmeyen arama boş döner', () => {
    const g = gorunum(atlas, suzgec({ arama: 'zzzz' }));
    expect(g.toplam).toBe(0);
    expect(g.satirlar.size).toBe(0);
    expect(g.bolgeler.size).toBe(0);
  });

  it('katman kapatmak yalnız o katmanı gizler', () => {
    const olaysiz = gorunum(atlas, suzgec({ katmanlar: haric('tarihsel', 'tartismali') }));
    expect(olaysiz.kartlar.has('troya-savasi')).toBe(true);
    for (const kimlik of olaysiz.kartlar) expect(atlas.veri.olaylar.find((o) => o.kimlik === kimlik)!.nitelik).toBe('mitolojik');
    const hukumdarsiz = gorunum(atlas, suzgec({ katmanlar: haric('hukumdarlar') }));
    expect(hukumdarsiz.satirlar.has('hammurabi')).toBe(false);
    expect(hukumdarsiz.satirlar.has('gilgamis')).toBe(true);
    expect(gorunum(atlas, suzgec({ katmanlar: haric('mitolojik') })).satirlar.has('gilgamis')).toBe(false);
  });

  it('uygarlıklar gizliyken olaylar kendi satırında kalır', () => {
    const g = gorunum(atlas, suzgec({ katmanlar: haric('uygarliklar') }));
    expect(g.satirlar.has('hitit')).toBe(false);
    expect(g.satirlar.has('kades-savasi')).toBe(true);
  });
});

describe('yakinOlaylar', () => {
  const hepsi = new Set(atlas.veri.olaylar.map((o) => o.kimlik));

  it('yıla en yakın olayları eskiden yeniye verir', () => {
    const yakinlar = yakinOlaylar(atlas, hepsi, -480, 6);
    expect(yakinlar).toHaveLength(6);
    expect(yakinlar).toEqual(expect.arrayContaining(['thermopylai', 'salamis', 'plataia', 'mykale']));
    const yillar = yakinlar.map((kimlik) => atlas.kayitlar.get(kimlik)!.kayit.donemler[0].bas);
    expect(yillar).toEqual([...yillar].sort((a, b) => a - b));
  });

  it('süren olayın uzaklığı sıfırdır', () => {
    expect(yakinOlaylar(atlas, hepsi, -418, 1)).toEqual(['peloponnesos-savasi']);
  });

  it('yalnız verilen kimliklerden seçer', () => {
    expect(yakinOlaylar(atlas, new Set(['actium', 'kades-savasi']), -1274, 10)).toEqual(['kades-savasi', 'actium']);
    expect(yakinOlaylar(atlas, new Set(), -1274, 10)).toEqual([]);
  });
});

describe('adres', () => {
  it('geçerli değerleri okur', () => {
    expect(adresiOku(atlas, '?yil=-1274&kayit=kades-savasi')).toEqual({ yil: -1274, kayit: 'kades-savasi' });
    expect(adresiOku(atlas, '?yil=40')).toEqual({ yil: 40 });
  });

  it('yalnız kayıt verilince yılı kayıttan alır, çizelge sınırına kırpar', () => {
    expect(adresiOku(atlas, '?kayit=marathon-savasi')).toEqual({ yil: -490, kayit: 'marathon-savasi' });
    expect(adresiOku(atlas, '?kayit=uruk-donemi')).toEqual({ yil: -3500, kayit: 'uruk-donemi' });
  });

  it('bozuk değerleri yok sayar', () => {
    for (const arama of ['', '?', '?yil=0', '?yil=abc', '?yil=', '?yil=9999', '?kayit=yok', '?yil=0&kayit=__proto__']) {
      expect(adresiOku(atlas, arama), arama).toEqual({});
    }
  });

  it('yazdığını geri okur', () => {
    const adres = adresYaz({ yil: -585, kayit: 'halys-savasi' });
    expect(adres).toBe('/kronoloji/?yil=-585&kayit=halys-savasi');
    expect(adresiOku(atlas, adres.slice(adres.indexOf('?')))).toEqual({ yil: -585, kayit: 'halys-savasi' });
    expect(adresYaz({ yil: 72 })).toBe('/kronoloji/?yil=72');
  });
});
