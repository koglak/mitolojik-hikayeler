import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { kayitSemasi } from '../src/lib/kayitSemasi';
import { bolumler, bolumAnahtarlari } from '../src/lib/bolumler';

const icerik = join(process.cwd(), 'src/content');

describe.each(bolumAnahtarlari)('%s', (bolum) => {
  const klasor = join(icerik, bolum);
  const dosyalar = existsSync(klasor) ? readdirSync(klasor).filter((ad) => ad.endsWith('.md')) : [];
  const kayitlar = dosyalar.map((dosya) => {
    const { data, content } = matter(readFileSync(join(klasor, dosya), 'utf8'));
    return { dosya, veri: data, govde: content };
  });

  it('bölüm tanımı var', () => {
    expect(bolumler[bolum].ad.length).toBeGreaterThan(0);
  });

  it('en az 3 kayıt var', () => {
    expect(kayitlar.length).toBeGreaterThanOrEqual(3);
  });

  it('sira değerleri tekrarsız', () => {
    const siralar = kayitlar.map((k) => k.veri.sira);
    expect(new Set(siralar).size).toBe(siralar.length);
  });

  it.each(kayitlar.map((k) => [k.dosya, k] as const))('%s şemaya uyuyor, gövdesi ve geçerli mit bağlantıları var', (_, kayit) => {
    expect(kayit.dosya).toMatch(/^[a-z0-9-]+\.md$/);
    const sonuc = kayitSemasi.safeParse(kayit.veri);
    expect(sonuc.success, JSON.stringify(sonuc.error?.issues)).toBe(true);
    expect(kayit.govde.trim().length).toBeGreaterThan(200);
    for (const mit of kayit.veri.ilgiliMitler ?? []) {
      expect(existsSync(join(icerik, 'mitler', `${mit}.md`)), mit).toBe(true);
    }
  });
});
