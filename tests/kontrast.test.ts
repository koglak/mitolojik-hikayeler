import { describe, expect, it } from 'vitest';
import { kontrastOrani } from '../src/lib/kontrast';

describe('kontrastOrani', () => {
  it('siyah ile beyaz arasında 21', () => {
    expect(kontrastOrani('#000000', '#ffffff')).toBeCloseTo(21, 1);
  });

  it('aynı renk için 1', () => {
    expect(kontrastOrani('#c8662f', '#c8662f')).toBeCloseTo(1, 5);
  });

  it('ön ve arka plan sırasından bağımsız', () => {
    expect(kontrastOrani('#121010', '#f1d3bd')).toBeCloseTo(kontrastOrani('#f1d3bd', '#121010'), 5);
  });
});
