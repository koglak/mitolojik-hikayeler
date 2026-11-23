import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { tanriSimgesi } from '../src/lib/tanriSimgeleri';

const sluglar = readdirSync(join(process.cwd(), 'src/content/tanrilar'))
  .filter((ad) => ad.endsWith('.md'))
  .map((ad) => ad.replace(/\.md$/, ''));

describe('tanrı simgeleri', () => {
  it.each(sluglar)('%s için simge var ve tema rengini kullanıyor', (slug) => {
    const simge = tanriSimgesi(slug);
    expect(simge).toBeTruthy();
    expect(simge).not.toMatch(/#[0-9a-fA-F]{3,6}/);
    expect(simge).not.toMatch(/NaN|undefined/);
  });

  it('bilinmeyen slug için simge dönmez', () => {
    expect(tanriSimgesi('olmayan-tanri')).toBeUndefined();
  });
});
