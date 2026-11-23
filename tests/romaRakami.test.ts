import { describe, expect, it } from 'vitest';
import { romaRakami } from '../src/lib/romaRakami';

describe('romaRakami', () => {
  it.each([
    [1, 'I'],
    [4, 'IV'],
    [6, 'VI'],
    [9, 'IX'],
    [10, 'X'],
    [12, 'XII'],
  ])('%i → %s', (sayi, beklenen) => {
    expect(romaRakami(sayi)).toBe(beklenen);
  });

  it('sıfır için hata fırlatır', () => {
    expect(() => romaRakami(0)).toThrow();
  });
});
