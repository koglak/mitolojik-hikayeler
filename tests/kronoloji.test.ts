import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { kronoloji, yilEtiketi } from '../src/lib/kronoloji';
import { yoldanBolum } from '../src/lib/bolumler';

describe('kronoloji', () => {
  it('en az 8 olay var', () => {
    expect(kronoloji.length).toBeGreaterThanOrEqual(8);
  });

  it('yıla göre eskiden yeniye sıralı', () => {
    const yillar = kronoloji.map((olay) => olay.yil);
    expect(yillar).toEqual([...yillar].sort((a, b) => a - b));
  });

  it('bağlantılar var olan içeriğe gider', () => {
    for (const olay of kronoloji) {
      if (!olay.baglanti) continue;
      const [, yol, slug] = olay.baglanti.split('/');
      const klasor = yol === 'mitler' ? 'mitler' : yoldanBolum(yol);
      expect(klasor, olay.baglanti).toBeDefined();
      expect(existsSync(join(process.cwd(), 'src/content', klasor!, `${slug}.md`)), olay.baglanti).toBe(true);
    }
  });
});

describe('yilEtiketi', () => {
  it('eksi yıllar MÖ olur', () => {
    expect(yilEtiketi(-356)).toBe('MÖ 356');
  });

  it('artı yıllar MS olur', () => {
    expect(yilEtiketi(8)).toBe('MS 8');
  });

  it('modern yıllar öneksiz yazılır', () => {
    expect(yilEtiketi(1871)).toBe('1871');
  });
});
