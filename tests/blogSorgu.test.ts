import { describe, expect, it } from 'vitest';
import { adresiCoz, adresiYaz, sayfadakiler, sayfayiSinirla, sayfaNumaralari, sayfaSayisi, yazilariSuz } from '../src/lib/blogSorgu';

const yazilar = [
  { kimlik: 'aspasia', aranan: 'Miletli Aspasia Mit ve kadın Perikles’in hayat arkadaşı' },
  { kimlik: 'hititler', aranan: 'Çivi Yazılı Işık Hititler Anadolu' },
  { kimlik: 'hektor', aranan: 'Hektor Truva Savaşı Anadolu' },
];
const suz = (aranan: string) => yazilariSuz(yazilar, aranan).map((yazi) => yazi.kimlik);

describe('yazilariSuz', () => {
  it('boş arama bütün yazıları sırasıyla verir', () => {
    expect(suz('   ')).toEqual(['aspasia', 'hititler', 'hektor']);
  });

  it('büyük küçük harf ve Türkçe karakter ayırt etmez', () => {
    expect(suz('civi YAZILI isik')).toEqual(['hititler']);
  });

  it('sözcüklerin sırası önemli değildir', () => {
    expect(suz('anadolu  truva')).toEqual(['hektor']);
  });

  it('sözcüklerin hepsi geçmelidir', () => {
    expect(suz('aspasia truva')).toEqual([]);
  });
});

describe('sayfalar', () => {
  it('sayfa sayısı yukarı yuvarlanır ve en az 1 olur', () => {
    expect([0, 1, 12, 13, 60].map(sayfaSayisi)).toEqual([1, 1, 1, 2, 5]);
  });

  it('sayfadakiler 12’şer bölünür, son sayfa kalanı verir', () => {
    const sayilar = Array.from({ length: 14 }, (_, sira) => sira);
    expect(sayfadakiler(sayilar, 1)).toEqual(sayilar.slice(0, 12));
    expect(sayfadakiler(sayilar, 2)).toEqual([12, 13]);
  });

  it('aralık dışındaki sayfa en yakın sayfaya çekilir', () => {
    expect([0, 3, 99].map((sayfa) => sayfayiSinirla(sayfa, 60))).toEqual([1, 3, 5]);
  });
});

describe('sayfaNumaralari', () => {
  it('yedi sayfaya kadar hepsini gösterir', () => {
    expect(sayfaNumaralari(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('daha fazlasında uçları ve komşuları gösterip arayı kısaltır', () => {
    expect(sayfaNumaralari(5, 10)).toEqual([1, null, 4, 5, 6, null, 10]);
    expect(sayfaNumaralari(1, 10)).toEqual([1, 2, null, 10]);
    expect(sayfaNumaralari(10, 10)).toEqual([1, null, 9, 10]);
  });

  it('tek sayfalık boşluğu kısaltmaz', () => {
    expect(sayfaNumaralari(4, 10)).toEqual([1, 2, 3, 4, 5, null, 10]);
  });
});

describe('adres', () => {
  it('varsayılan durum parametre taşımaz', () => {
    expect(adresiYaz({ aranan: ' ', sayfa: 1 })).toBe('/blog/');
  });

  it('arama ve sayfa adrese yazılıp geri okunur', () => {
    const durum = { aranan: 'çivi yazısı', sayfa: 2 };
    expect(adresiCoz(new URL(adresiYaz(durum), 'https://ornek.com').search)).toEqual(durum);
  });

  it.each(['', '?sayfa=abc', '?sayfa=-2', '?sayfa=1.5', '?sayfa=0'])('%s geçersiz sayfayı 1 sayar', (sorgu) => {
    expect(adresiCoz(sorgu)).toEqual({ aranan: '', sayfa: 1 });
  });
});
