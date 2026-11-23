import { describe, expect, it } from 'vitest';
import { figurDonusumu } from '../src/lib/figur';

describe('figurDonusumu', () => {
  it('varsayılan sağa bakan, ölçek 1', () => {
    expect(figurDonusumu(120, 256)).toBe('translate(120 256) scale(1 1)');
  });

  it('sola bakan figürü yatayda aynalar', () => {
    expect(figurDonusumu(300, 256, 0.8, 'sol')).toBe('translate(300 256) scale(-0.8 0.8)');
  });
});
