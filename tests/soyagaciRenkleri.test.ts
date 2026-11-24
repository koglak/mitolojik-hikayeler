import { describe, expect, it } from 'vitest';
import { kontrastOrani } from '../src/lib/kontrast';
import { kisiTanimi, renkKodlari, renkKodu } from '../src/lib/soyagaciRenkleri';
import type { Kisi } from '../src/lib/soyagaciSemasi';

const kisi = (tur: Kisi['tur'], cinsiyet: Kisi['cinsiyet']): Kisi => ({ kimlik: 'x', ad: 'X', tur, cinsiyet });

describe('renkKodu', () => {
  it.each([
    ['olimposlu', 'erkek', 'tanri'],
    ['olimposlu', 'kadin', 'tanrica'],
    ['tanri', 'erkek', 'tanri'],
    ['tanri', 'kadin', 'tanrica'],
    ['ilkel', 'kadin', 'tanrica'],
    ['titan', 'kadin', 'titan'],
    ['titan', 'erkek', 'titan'],
    ['canavar', 'kadin', 'canavar'],
    ['olumlu', 'kadin', 'kadin'],
    ['olumlu', 'erkek', 'erkek'],
    ['ilkel', 'yok', 'diger'],
    ['olumlu', 'yok', 'diger'],
  ] as const)('%s + %s → %s', (tur, cinsiyet, kod) => {
    expect(renkKodu(kisi(tur, cinsiyet)).kod).toBe(kod);
  });
});

describe('renkKodlari', () => {
  it('kodlar ve renkler tekrarsız', () => {
    expect(new Set(renkKodlari.map((r) => r.kod)).size).toBe(renkKodlari.length);
    expect(new Set(renkKodlari.map((r) => r.renk)).size).toBe(renkKodlari.length);
  });

  it.each(renkKodlari.map((r) => [r.ad, r.renk]))('%s rengi kutu zeminlerinde seçilir', (_, renk) => {
    for (const zemin of ['#202834', '#111821', '#19202a']) expect(kontrastOrani(renk, zemin)).toBeGreaterThanOrEqual(4.5);
  });
});

describe('kisiTanimi', () => {
  it('renk adını, gerekirse türle birlikte verir', () => {
    expect(kisiTanimi(kisi('olimposlu', 'kadin'))).toBe('Tanrıça · Olimposlu');
    expect(kisiTanimi(kisi('olumlu', 'erkek'))).toBe('Erkek');
    expect(kisiTanimi(kisi('titan', 'kadin'))).toBe('Titan');
  });
});
