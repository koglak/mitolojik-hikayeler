import { describe, expect, it } from 'vitest';
import { kanonikYol, mutlakAdres, sayfaBasligi } from '../src/lib/site';

describe('kanonikYol', () => {
  it('kök yol değişmez', () => {
    expect(kanonikYol('/')).toBe('/');
    expect(kanonikYol('')).toBe('/');
  });

  it('sayfa yollarına sonda eğik çizgi ekler', () => {
    expect(kanonikYol('/mitler')).toBe('/mitler/');
    expect(kanonikYol('/antik-kentler/efes')).toBe('/antik-kentler/efes/');
    expect(kanonikYol('/antik-kentler/efes/')).toBe('/antik-kentler/efes/');
  });

  it('index.html ve çift eğik çizgiyi temizler', () => {
    expect(kanonikYol('/tanrilar/zeus/index.html')).toBe('/tanrilar/zeus/');
    expect(kanonikYol('//tanrilar//zeus')).toBe('/tanrilar/zeus/');
  });

  it('dosya yollarına dokunmaz', () => {
    expect(kanonikYol('/paylasim/site.png')).toBe('/paylasim/site.png');
  });
});

describe('mutlakAdres', () => {
  it('alan adıyla birleştirir', () => {
    expect(mutlakAdres('/mitler/narkissos')).toBe('https://mitolojikhikayeler.com/mitler/narkissos/');
    expect(mutlakAdres('/')).toBe('https://mitolojikhikayeler.com/');
  });
});

describe('sayfaBasligi', () => {
  it('site adını sona ekler', () => {
    expect(sayfaBasligi('Zeus')).toBe('Zeus · Mitolojik Hikâyeler');
    expect(sayfaBasligi()).toBe('Mitolojik Hikâyeler');
  });
});
