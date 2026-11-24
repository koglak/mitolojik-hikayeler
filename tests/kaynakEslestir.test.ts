import { describe, expect, it } from 'vitest';
import { kaynagiParcala, type KaynakEseri, type KaynakYazari } from '../src/lib/kaynakEslestir';

const yazarlar: KaynakYazari[] = [
  { kimlik: 'homeros', adlar: ['Homeros'] },
  { kimlik: 'yasli-plinius', adlar: ['Yaşlı Plinius', 'Plinius'] },
  { kimlik: 'genc-plinius', adlar: ['Genç Plinius'] },
  { kimlik: 'strabon', adlar: ['Strabon'] },
  { kimlik: 'apollonios', adlar: ['Rodoslu Apollonios', 'Apollonios Rhodios'] },
  { kimlik: 'luka', adlar: ['Aziz Luka'] },
  { kimlik: 'herodotos', adlar: ['Herodotos'] },
  { kimlik: 'polybios', adlar: ['Polybios'] },
];
const eserler: KaynakEseri[] = [
  { kimlik: 'homeros/ilyada', yazar: 'homeros', adlar: ['İlyada'] },
  { kimlik: 'homeros/odysseia', yazar: 'homeros', adlar: ['Odysseia'] },
  { kimlik: 'yasli-plinius/naturalis-historia', yazar: 'yasli-plinius', adlar: ['Naturalis Historia'] },
  { kimlik: 'genc-plinius/mektuplar', yazar: 'genc-plinius', adlar: ['Mektuplar'] },
  { kimlik: 'strabon/geographika', yazar: 'strabon', adlar: ['Geographika'] },
  { kimlik: 'apollonios/argonautika', yazar: 'apollonios', adlar: ['Argonautika'] },
  { kimlik: 'luka/elcilerin-isleri', yazar: 'luka', adlar: ['Elçilerin İşleri'] },
  { kimlik: 'herodotos/tarihler', yazar: 'herodotos', adlar: ['Tarihler'] },
  { kimlik: 'polybios/tarihler', yazar: 'polybios', adlar: ['Tarihler'] },
];
const parcala = (kaynak: string) => kaynagiParcala(kaynak, yazarlar, eserler);
const baglantilar = (kaynak: string) =>
  parcala(kaynak)
    .parcalar.filter((parca) => parca.hedef)
    .map((parca) => [parca.metin, parca.hedef]);

describe('kaynagiParcala', () => {
  it('yazarı ve eseri bağlar, metni aynen korur', () => {
    const kaynak = 'Homeros, İlyada 6.119–236; Strabon, Geographika 13.1';
    expect(baglantilar(kaynak)).toEqual([
      ['Homeros', 'homeros'],
      ['İlyada', 'homeros/ilyada'],
      ['Strabon', 'strabon'],
      ['Geographika', 'strabon/geographika'],
    ]);
    expect(parcala(kaynak).parcalar.map((parca) => parca.metin).join('')).toBe(kaynak);
  });

  it('aynı parçadaki birden çok eseri ve yazarsız devam eden parçayı bağlar', () => {
    expect(parcala('Homeros, İlyada 3.15, Odysseia 4.351').eserler).toEqual(['homeros/ilyada', 'homeros/odysseia']);
    expect(parcala('Homeros, İlyada 5.385; Odysseia 8.266').eserler).toEqual(['homeros/ilyada', 'homeros/odysseia']);
  });

  it('iki Pliniusu ayırır', () => {
    expect(parcala('Genç Plinius, Mektuplar 10.98').yazarlar).toEqual(['genc-plinius']);
    expect(parcala('Plinius, Naturalis Historia 5.93').yazarlar).toEqual(['yasli-plinius']);
  });

  it('ekli ve türetilmiş adları yazar saymaz', () => {
    expect(parcala('Homerosçu Demeter İlahisi').yazarlar).toEqual([]);
    expect(parcala("Homeros'a atfedilen Apollon İlahisi 30–126").yazarlar).toEqual([]);
  });

  it('tek eserli yazarda yalnız bölüm numarası verilmişse eseri bulur', () => {
    expect(parcala('Strabon 14.2').eserler).toEqual(['strabon/geographika']);
    expect(parcala('Genç Plinius').eserler).toEqual([]);
  });

  it('adı tek olan eseri yazarsız da bulur, ortak adları bulmaz', () => {
    expect(parcala('Elçilerin İşleri 17.28').eserler).toEqual(['luka/elcilerin-isleri']);
    expect(parcala('Elçilerin İşleri 17.28').yazarlar).toEqual(['luka']);
    expect(parcala('Tarihler 1.14').eserler).toEqual([]);
  });

  it('bilinmeyen kaynağı olduğu gibi bırakır', () => {
    expect(parcala('Opramoas anıt mezarındaki yazıtlar')).toEqual({
      parcalar: [{ metin: 'Opramoas anıt mezarındaki yazıtlar' }],
      yazarlar: [],
      eserler: [],
    });
  });
});
