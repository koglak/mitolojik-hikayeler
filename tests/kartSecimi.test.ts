import { describe, expect, it } from 'vitest';
import { enGorunurKart, sesHatasiSesiKapatir } from '../src/lib/kartSecimi';

describe('enGorunurKart', () => {
  it('ekranı en çok kaplayan kartı seçer', () => {
    expect(enGorunurKart([1, 0, 0], 0)).toBe(0);
    expect(enGorunurKart([0.3, 0.7, 0], 0)).toBe(1);
  });

  it('kenarı değen kartı seçmez', () => {
    expect(enGorunurKart([1, 0.001, 0], 0)).toBe(0);
  });

  it('ekrandan uzun bölümde geri kaydırınca önceki bölüme döner', () => {
    expect(enGorunurKart([0, 0, 0.8, 0.2], 3)).toBe(2);
  });

  it('eşitlikte mevcut kart korunur', () => {
    expect(enGorunurKart([0.5, 0.5], 1)).toBe(1);
  });

  it('hiçbir kart görünmüyorsa mevcut kart korunur', () => {
    expect(enGorunurKart([0, 0, 0], 2)).toBe(2);
    expect(enGorunurKart([], 0)).toBe(0);
  });
});

describe('sesHatasiSesiKapatir', () => {
  it('AbortError sesi kapatmaz', () => {
    expect(sesHatasiSesiKapatir(new DOMException('iptal', 'AbortError'))).toBe(false);
  });

  it('autoplay engeli ve diğer hatalar sesi kapatır', () => {
    expect(sesHatasiSesiKapatir(new DOMException('izin yok', 'NotAllowedError'))).toBe(true);
    expect(sesHatasiSesiKapatir(new Error('bilinmeyen'))).toBe(true);
    expect(sesHatasiSesiKapatir(undefined)).toBe(true);
  });
});
