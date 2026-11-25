import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { mitGorseli } from '../src/lib/mitGorselleri';

const sluglar = readdirSync(join(process.cwd(), 'src/content/mitler'))
  .filter((ad) => ad.endsWith('.md'))
  .map((ad) => ad.replace(/\.md$/, ''));

describe('mit görselleri', () => {
  it.each(sluglar)('%s için palet ve figür var', (slug) => {
    const gorsel = mitGorseli(slug);
    expect(gorsel.palet).toHaveLength(3);
    for (const renk of gorsel.palet) expect(renk).toMatch(/^#[0-9a-f]{6}$/);
    expect(gorsel.figur.length).toBeGreaterThan(0);
  });

  it('bilinmeyen slug için yedek görsel döner', () => {
    const gorsel = mitGorseli('olmayan-mit');
    expect(gorsel.palet).toHaveLength(3);
    expect(gorsel.figur.length).toBeGreaterThan(0);
  });

  it('yeni hikâyelerin kapakları birbirinden ve yedek görselden farklı', () => {
    const yeniMitler = [
      'antigone', 'medeia', 'iphigeneia-auliste', 'kassandra', 'dionysos-ve-pentheus',
      'alkestis', 'aineias-truvadan-kacis', 'afrodit-ve-adonis', 'kirke-ve-odysseus',
    ];
    const figurlar = yeniMitler.map((slug) => mitGorseli(slug).figur);
    expect(figurlar).not.toContain(mitGorseli('olmayan-mit').figur);
    expect(new Set(figurlar).size).toBe(yeniMitler.length);
  });

  it('figürler palet yer tutucularını kullanır, sabit renk içermez', () => {
    for (const slug of sluglar) {
      expect(mitGorseli(slug).figur, slug).not.toMatch(/#[0-9a-fA-F]{3,6}/);
    }
  });
});
