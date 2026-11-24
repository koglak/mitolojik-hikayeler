import { describe, expect, it } from 'vitest';
import { miteBagliOgeler } from '../src/lib/mitIliskileri';

const oge = (id: string, sira: number, ilgiliMitler: string[]) => ({ id, data: { sira, ilgiliMitler } });

describe('miteBagliOgeler', () => {
  it('yalnızca miti anan ögeleri sırayla verir', () => {
    const ogeler = [oge('zeus', 3, ['midas']), oge('hera', 2, []), oge('dionysos', 1, ['midas', 'arion'])];
    expect(miteBagliOgeler(ogeler, 'midas').map(({ id }) => id)).toEqual(['dionysos', 'zeus']);
  });

  it('verilen diziyi değiştirmez', () => {
    const ogeler = [oge('b', 2, ['midas']), oge('a', 1, ['midas'])];
    miteBagliOgeler(ogeler, 'midas');
    expect(ogeler.map(({ id }) => id)).toEqual(['b', 'a']);
  });

  it('bağ yoksa boş döner', () => {
    expect(miteBagliOgeler([oge('zeus', 1, [])], 'pyramos-ve-thisbe')).toEqual([]);
  });
});
