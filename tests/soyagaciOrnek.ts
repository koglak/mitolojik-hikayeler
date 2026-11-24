import type { Kisi, Soyagaci } from '../src/lib/soyagaciSemasi';

const kisi = (kimlik: string, ad: string, tur: Kisi['tur'], ek: Partial<Kisi> = {}): Kisi => ({ kimlik, ad, tur, cinsiyet: 'yok', ...ek });

const ebeveyn = (ebeveynKimligi: string, cocuk: string, anlati: 'ana' | 'alternatif' = 'ana') => ({
  tur: 'ebeveyn' as const,
  ebeveyn: ebeveynKimligi,
  cocuk,
  kaynak: 'Hesiodos, Theogonia',
  anlati,
});

const cift = (anne: string, baba: string, cocuk: string) => [ebeveyn(anne, cocuk), ebeveyn(baba, cocuk)];

export const ornek: Soyagaci = {
  kisiler: [
    kisi('khaos', 'Khaos', 'ilkel'),
    kisi('uranos', 'Uranos', 'ilkel'),
    kisi('gaia', 'Gaia', 'ilkel'),
    kisi('kronos', 'Kronos', 'titan'),
    kisi('rhea', 'Rhea', 'titan'),
    kisi('zeus', 'Zeus', 'olimposlu', { kayit: { bolum: 'tanrilar', kimlik: 'zeus' } }),
    kisi('hera', 'Hera', 'olimposlu'),
    kisi('alkmene', 'Alkmene', 'olumlu'),
    kisi('herakles', 'Herakles', 'olumlu'),
    kisi('tyndareos', 'Tyndareos', 'olumlu'),
    kisi('leda', 'Leda', 'olumlu'),
    kisi('kastor', 'Kastor', 'olumlu', { kayit: { bolum: 'kahramanlar', kimlik: 'kastor-ve-polydeukes' } }),
    kisi('polydeukes', 'Polydeukes', 'olumlu', { kayit: { bolum: 'kahramanlar', kimlik: 'kastor-ve-polydeukes' } }),
    kisi('kybele', 'Kybele', 'tanri'),
    kisi('eros', 'Eros', 'tanri'),
    kisi('iris', 'Iris', 'tanri'),
  ],
  iliskiler: [
    ...cift('gaia', 'uranos', 'kronos'),
    ...cift('gaia', 'uranos', 'rhea'),
    ...cift('rhea', 'kronos', 'zeus'),
    ...cift('rhea', 'kronos', 'hera'),
    ...cift('alkmene', 'zeus', 'herakles'),
    ...cift('leda', 'tyndareos', 'kastor'),
    ...cift('leda', 'zeus', 'polydeukes'),
    ebeveyn('khaos', 'eros', 'alternatif'),
    { tur: 'es', kisiler: ['zeus', 'hera'], kaynak: 'Hesiodos, Theogonia 921' },
  ],
};
