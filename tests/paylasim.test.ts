import { describe, expect, it } from 'vitest';
import { facebookPaylasimAdresi, pinterestPaylasimAdresi, whatsappPaylasimAdresi, xPaylasimAdresi } from '../src/lib/paylasim';

const adres = 'https://mitolojikhikayeler.com/';

describe('xPaylasimAdresi', () => {
  it('metni ve adresi kodlanmış olarak taşır', () => {
    const sonuc = new URL(xPaylasimAdresi(adres, 'Hikâyeler & Tanrılar'));
    expect(sonuc.origin + sonuc.pathname).toBe('https://x.com/intent/post');
    expect(sonuc.searchParams.get('text')).toBe('Hikâyeler & Tanrılar');
    expect(sonuc.searchParams.get('url')).toBe(adres);
  });

  it('boşlukları artı işareti yerine yüzde koduyla yazar', () => {
    expect(xPaylasimAdresi(adres, 'Yunan Mitleri')).toContain('text=Yunan%20Mitleri');
  });
});

describe('facebookPaylasimAdresi', () => {
  it('adresi kodlanmış olarak taşır', () => {
    const sonuc = new URL(facebookPaylasimAdresi(adres));
    expect(sonuc.origin + sonuc.pathname).toBe('https://www.facebook.com/sharer/sharer.php');
    expect(sonuc.searchParams.get('u')).toBe(adres);
  });
});

describe('whatsappPaylasimAdresi', () => {
  it('başlığı ve adresi tek metinde taşır', () => {
    const sonuc = new URL(whatsappPaylasimAdresi(adres, 'Hikâyeler & Tanrılar'));
    expect(sonuc.origin + sonuc.pathname).toBe('https://wa.me/');
    expect(sonuc.searchParams.get('text')).toBe(`Hikâyeler & Tanrılar ${adres}`);
  });
});

describe('pinterestPaylasimAdresi', () => {
  it('adresi, görseli ve açıklamayı kodlanmış olarak taşır', () => {
    const gorsel = 'https://mitolojikhikayeler.com/paylasim/site.png';
    const sonuc = new URL(pinterestPaylasimAdresi(adres, 'Yunan Mitleri', gorsel));
    expect(sonuc.origin + sonuc.pathname).toBe('https://www.pinterest.com/pin/create/button/');
    expect(sonuc.searchParams.get('url')).toBe(adres);
    expect(sonuc.searchParams.get('media')).toBe(gorsel);
    expect(sonuc.searchParams.get('description')).toBe('Yunan Mitleri');
  });
});
