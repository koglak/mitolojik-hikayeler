import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { kayitSemasi } from '../src/lib/kayitSemasi';
import { bolumler, bolumAnahtarlari, bolumAdresi, kayitAdresi, yoldanBolum } from '../src/lib/bolumler';
import { bolgeler } from '../src/lib/bolgeler';

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

describe('kentler konumu', () => {
  const klasor = join(icerik, 'kentler');
  const dosyalar = readdirSync(klasor).filter((ad) => ad.endsWith('.md'));

  it.each(dosyalar)('%s haritada gösterilebilecek konuma sahip', (dosya) => {
    const { data } = matter(readFileSync(join(klasor, dosya), 'utf8'));
    const sonuc = kayitSemasi.safeParse(data);
    expect(sonuc.success).toBe(true);
    const konum = sonuc.data?.konum;
    expect(konum, dosya).toBeDefined();
    expect(konum!.enlem).toBeGreaterThan(34);
    expect(konum!.enlem).toBeLessThan(43);
    expect(konum!.boylam).toBeGreaterThan(19);
    expect(konum!.boylam).toBeLessThan(45);
    expect(sonuc.data?.bolge, dosya).toBeDefined();
  });

  it('Likya kentleri var', () => {
    const likyaKentleri = dosyalar.filter(
      (dosya) => matter(readFileSync(join(klasor, dosya), 'utf8')).data.bolge === 'likya',
    );
    expect(likyaKentleri.length).toBeGreaterThanOrEqual(5);
  });

  it('Aiol kentleri var', () => {
    const aiolKentleri = dosyalar.filter(
      (dosya) => matter(readFileSync(join(klasor, dosya), 'utf8')).data.bolge === 'aiolis',
    );
    expect(aiolKentleri.length).toBeGreaterThanOrEqual(5);
  });

  it('bölge renkleri birbirinden farklı', () => {
    const renkler = Object.values(bolgeler).map((bolge) => bolge.renk.toLowerCase());
    expect(new Set(renkler).size).toBe(renkler.length);
  });
});

describe('bölüm adresleri', () => {
  it('antik kentler /antik-kentler altında', () => {
    expect(bolumAdresi('kentler')).toBe('/antik-kentler/');
    expect(kayitAdresi('kentler', 'efes')).toBe('/antik-kentler/efes');
  });

  it('her yol tek bir bölüme döner', () => {
    for (const bolum of bolumAnahtarlari) {
      expect(yoldanBolum(bolumler[bolum].yol)).toBe(bolum);
    }
  });
});
