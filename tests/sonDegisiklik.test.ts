import { describe, expect, it } from 'vitest';
import { enSonTarih, gunlukTarihleri } from '../src/lib/sonDegisiklik';

describe('gunlukTarihleri', () => {
  it('her dosyaya en yeni kaydın tarihini verir', () => {
    const gunluk = [
      '>2026-11-24T12:30:21+03:00',
      '',
      'src/content/mitler/midas.md',
      '>2026-11-23T23:12:16+03:00',
      '',
      'src/content/mitler/midas.md',
      'src/content/mitler/arion.md',
    ].join('\n');
    const tarihler = gunlukTarihleri(gunluk);
    expect(tarihler.get('src/content/mitler/midas.md')).toEqual(new Date('2026-11-24T12:30:21+03:00'));
    expect(tarihler.get('src/content/mitler/arion.md')).toEqual(new Date('2026-11-23T23:12:16+03:00'));
  });

  it('sıra bozuk olsa da en yeni tarihi seçer', () => {
    const gunluk = '>2026-11-20T10:00:00Z\n\na.md\n>2026-11-22T10:00:00Z\n\na.md';
    expect(gunlukTarihleri(gunluk).get('a.md')).toEqual(new Date('2026-11-22T10:00:00Z'));
  });

  it('boş günlükte boş döner', () => {
    expect(gunlukTarihleri('').size).toBe(0);
  });
});

describe('enSonTarih', () => {
  it('tanımsızları atlayıp en yeniyi verir', () => {
    const eski = new Date('2026-11-20T00:00:00Z');
    const yeni = new Date('2026-11-24T00:00:00Z');
    expect(enSonTarih([eski, undefined, yeni])).toEqual(yeni);
    expect(enSonTarih([undefined])).toBeUndefined();
    expect(enSonTarih([])).toBeUndefined();
  });
});
