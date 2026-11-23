import { describe, expect, it } from 'vitest';
import { beklemeSuresi, tekrarDenenmeli } from '../scripts/istek.mjs';

describe('tekrarDenenmeli', () => {
  it('429 ve 5xx tekrar denenir', () => {
    expect(tekrarDenenmeli(429)).toBe(true);
    expect(tekrarDenenmeli(500)).toBe(true);
    expect(tekrarDenenmeli(503)).toBe(true);
  });

  it('istemci hataları tekrar denenmez', () => {
    expect(tekrarDenenmeli(400)).toBe(false);
    expect(tekrarDenenmeli(401)).toBe(false);
    expect(tekrarDenenmeli(404)).toBe(false);
  });
});

describe('beklemeSuresi', () => {
  it('Retry-After saniyesine uyar', () => {
    expect(beklemeSuresi(0, '7')).toBe(7000);
  });

  it('başlık yoksa üstel artar', () => {
    expect(beklemeSuresi(0, null)).toBe(2000);
    expect(beklemeSuresi(1, null)).toBe(4000);
    expect(beklemeSuresi(2, null)).toBe(8000);
  });

  it('geçersiz başlıkta üstel beklemeye döner', () => {
    expect(beklemeSuresi(1, 'abc')).toBe(4000);
  });
});
