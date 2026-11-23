import { describe, expect, it } from 'vitest';
import { basligiBol } from '../src/lib/baslikParcalari';

describe('basligiBol', () => {
  it('iki noktadan ad ve alt başlık ayırır', () => {
    expect(basligiBol('Prometheus: Ateşi Çalan Titan')).toEqual({ ad: 'Prometheus', altBaslik: 'Ateşi Çalan Titan' });
  });

  it('iki nokta yoksa alt başlık boş', () => {
    expect(basligiBol('Truva Atı')).toEqual({ ad: 'Truva Atı', altBaslik: '' });
  });

  it('yalnız ilk iki noktadan böler', () => {
    expect(basligiBol('A: B: C')).toEqual({ ad: 'A', altBaslik: 'B: C' });
  });
});
