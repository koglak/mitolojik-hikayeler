import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { kayitSimgesi } from '../src/lib/kayitSimgeleri';

const simgeliBolumler = ['tanrilar', 'kahramanlar'] as const;

describe.each(simgeliBolumler)('%s simgeleri', (bolum) => {
  const sluglar = readdirSync(join(process.cwd(), 'src/content', bolum))
    .filter((ad) => ad.endsWith('.md'))
    .map((ad) => ad.replace(/\.md$/, ''));

  it.each(sluglar)('%s için simge var ve tema rengini kullanıyor', (slug) => {
    const simge = kayitSimgesi(bolum, slug);
    expect(simge).toBeTruthy();
    expect(simge).not.toMatch(/#[0-9a-fA-F]{3,6}/);
    expect(simge).not.toMatch(/NaN|undefined/);
  });

  it('bilinmeyen slug için simge dönmez', () => {
    expect(kayitSimgesi(bolum, 'olmayan-kayit')).toBeUndefined();
  });
});

it('kentlerin simgesi yok', () => {
  expect(kayitSimgesi('kentler', 'efes')).toBeUndefined();
});
