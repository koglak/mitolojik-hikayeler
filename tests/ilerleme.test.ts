import { describe, expect, it } from 'vitest';
import {
  gununMitosu,
  ilerlemeOku,
  ilerlemeYaz,
  okunduIsaretle,
  seriHesapla,
  yerelGun,
  ziyaretiKaydet,
  type Ilerleme,
} from '../src/lib/ilerleme';

const ANAHTAR = 'mitolojik-hikayeler:ilerleme';

function bellekDeposu(baslangic: Record<string, string> = {}): Storage {
  const veri = new Map(Object.entries(baslangic));
  return {
    get length() {
      return veri.size;
    },
    clear: () => veri.clear(),
    getItem: (anahtar) => veri.get(anahtar) ?? null,
    key: (i) => [...veri.keys()][i] ?? null,
    removeItem: (anahtar) => void veri.delete(anahtar),
    setItem: (anahtar, deger) => void veri.set(anahtar, String(deger)),
  };
}

function firlatanDepo(): Storage {
  const hata = () => {
    throw new Error('SecurityError');
  };
  return {
    length: 0,
    clear: hata,
    getItem: hata,
    key: hata,
    removeItem: hata,
    setItem: hata,
  };
}

const bosIlerleme: Ilerleme = { okunanlar: [], sonGun: null, seri: 0 };

describe('seriHesapla', () => {
  it('ilk ziyarette seri 1', () => {
    expect(seriHesapla(null, 0, '2026-11-23')).toBe(1);
  });

  it('aynı gün ikinci ziyaret seriyi artırmaz', () => {
    expect(seriHesapla('2026-11-23', 4, '2026-11-23')).toBe(4);
  });

  it('ardışık gün seriyi artırır', () => {
    expect(seriHesapla('2026-11-22', 4, '2026-11-23')).toBe(5);
  });

  it('gün atlanınca seri 1e döner', () => {
    expect(seriHesapla('2026-11-20', 4, '2026-11-23')).toBe(1);
  });

  it('ay geçişinde ardışık gün sayılır', () => {
    expect(seriHesapla('2026-11-30', 2, '2026-12-01')).toBe(3);
  });

  it('yıl geçişinde ardışık gün sayılır', () => {
    expect(seriHesapla('2026-12-31', 7, '2027-01-01')).toBe(8);
  });
});

describe('yerelGun', () => {
  it('yerel saate göre gün döner', () => {
    expect(yerelGun(new Date(2026, 10, 23, 23, 59))).toBe('2026-11-23');
    expect(yerelGun(new Date(2026, 0, 5, 0, 1))).toBe('2026-01-05');
  });
});

describe('gununMitosu', () => {
  const mitler = ['a', 'b', 'c'];

  it('aynı gün farklı saatlerde aynı mitos', () => {
    expect(gununMitosu(mitler, new Date(2026, 10, 23, 0, 5))).toBe(
      gununMitosu(mitler, new Date(2026, 10, 23, 23, 55)),
    );
  });

  it('ardışık günlerde farklı mitos', () => {
    expect(gununMitosu(mitler, new Date(2026, 10, 23, 12))).not.toBe(
      gununMitosu(mitler, new Date(2026, 10, 24, 12)),
    );
  });
});

describe('ilerlemeOku / ilerlemeYaz', () => {
  it('boş depoda varsayılan döner', () => {
    expect(ilerlemeOku(bellekDeposu())).toEqual(bosIlerleme);
  });

  it('yazılanı geri okur', () => {
    const depo = bellekDeposu();
    const ilerleme: Ilerleme = { okunanlar: ['prometheus'], sonGun: '2026-11-23', seri: 2 };
    ilerlemeYaz(ilerleme, depo);
    expect(depo.getItem(ANAHTAR)).not.toBeNull();
    expect(ilerlemeOku(depo)).toEqual(ilerleme);
  });

  it('fırlatan depoda hata vermez', () => {
    const depo = firlatanDepo();
    expect(ilerlemeOku(depo)).toEqual(bosIlerleme);
    expect(() => ilerlemeYaz(bosIlerleme, depo)).not.toThrow();
  });

  it('depo yoksa hata vermez', () => {
    expect(ilerlemeOku(null)).toEqual(bosIlerleme);
    expect(() => ilerlemeYaz(bosIlerleme, null)).not.toThrow();
  });

  it('bozuk JSON varsayılan döner', () => {
    expect(ilerlemeOku(bellekDeposu({ [ANAHTAR]: '{bozuk' }))).toEqual(bosIlerleme);
  });

  it('eski sürümden kalan quiz puanlarını atar', () => {
    const eski = '{"okunanlar":["pandora"],"quizPuanlari":{"pandora":2},"sonGun":"2026-11-20","seri":4}';
    expect(ilerlemeOku(bellekDeposu({ [ANAHTAR]: eski }))).toEqual({ okunanlar: ['pandora'], sonGun: '2026-11-20', seri: 4 });
  });

  it('eksik alanlar varsayılanla tamamlanır', () => {
    expect(ilerlemeOku(bellekDeposu({ [ANAHTAR]: '{"seri":3}' }))).toEqual({ ...bosIlerleme, seri: 3 });
  });
});

describe('ziyaretiKaydet', () => {
  it('sonGun ve seriyi günceller', () => {
    const sonuc = ziyaretiKaydet({ ...bosIlerleme, sonGun: '2026-11-22', seri: 1 }, '2026-11-23');
    expect(sonuc.sonGun).toBe('2026-11-23');
    expect(sonuc.seri).toBe(2);
  });
});

describe('okunduIsaretle', () => {
  it('aynı slugı iki kez eklemez', () => {
    const bir = okunduIsaretle(bosIlerleme, 'prometheus');
    const iki = okunduIsaretle(bir, 'prometheus');
    expect(iki.okunanlar).toEqual(['prometheus']);
  });

  it('yeni slugı sona ekler', () => {
    const sonuc = okunduIsaretle({ ...bosIlerleme, okunanlar: ['pandora'] }, 'ikaros');
    expect(sonuc.okunanlar).toEqual(['pandora', 'ikaros']);
  });
});
