import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { soyagaciSemasi, type Soyagaci } from '../src/lib/soyagaciSemasi';
import { akrabalar, atalar, kayittanKisi } from '../src/lib/soyagaci';

const veri: Soyagaci = JSON.parse(readFileSync('src/data/soyagaci.json', 'utf8'));
const bolumler = ['tanrilar', 'kahramanlar'] as const;

const kayitlar = bolumler.flatMap((bolum) =>
  readdirSync(join('src/content', bolum))
    .filter((dosya) => dosya.endsWith('.md'))
    .map((dosya) => ({
      bolum,
      kimlik: dosya.replace(/\.md$/, ''),
      ad: String(matter(readFileSync(join('src/content', bolum, dosya), 'utf8')).data.ad),
    })),
);

const kimlikler = new Set(veri.kisiler.map((k) => k.kimlik));

describe('soyağacı verisi', () => {
  it('şemaya uyar', () => {
    const sonuc = soyagaciSemasi.safeParse(veri);
    expect(sonuc.success, JSON.stringify(sonuc.error?.issues.slice(0, 5))).toBe(true);
  });

  it('kimlikler tekrarsız', () => {
    expect(kimlikler.size).toBe(veri.kisiler.length);
  });

  it('her ilişki var olan kişilere işaret eder ve kimse kendisiyle ilişkili değil', () => {
    for (const iliski of veri.iliskiler) {
      const uclar = iliski.tur === 'es' ? iliski.kisiler : [iliski.ebeveyn, iliski.cocuk];
      for (const uc of uclar) expect(kimlikler.has(uc), `${JSON.stringify(iliski)} → ${uc}`).toBe(true);
      expect(uclar[0], JSON.stringify(iliski)).not.toBe(uclar[1]);
    }
  });

  it('aynı ilişki iki kez yazılmamış', () => {
    const anahtarlar = veri.iliskiler.map((i) =>
      i.tur === 'es' ? `es:${[...i.kisiler].sort().join('+')}` : `ebeveyn:${i.ebeveyn}>${i.cocuk}`,
    );
    const tekrarlar = anahtarlar.filter((a, i) => anahtarlar.indexOf(a) !== i);
    expect(tekrarlar).toEqual([]);
  });

  it('her kayıt referansı gerçek bir kayda karşılık gelir', () => {
    for (const kisi of veri.kisiler) {
      if (!kisi.kayit) continue;
      expect(kayitlar.some((k) => k.bolum === kisi.kayit!.bolum && k.kimlik === kisi.kayit!.kimlik), kisi.kimlik).toBe(true);
    }
  });

  it.each(kayitlar.map((k) => [`${k.bolum}/${k.kimlik}`, k] as const))('%s ağaçta bir kişiye bağlı ve adı tutarlı', (_, kayit) => {
    const bagli = veri.kisiler.filter((k) => k.kayit?.bolum === kayit.bolum && k.kayit.kimlik === kayit.kimlik);
    expect(bagli.length).toBeGreaterThan(0);
    expect(kayittanKisi(veri, kayit.bolum, kayit.kimlik)).toBe(bagli[0].kimlik);
    if (bagli.length === 1) {
      expect(bagli[0].ad).toBe(kayit.ad);
      expect(bagli[0].kimlik).toBe(kayit.kimlik);
    } else {
      for (const kisi of bagli) expect(kayit.ad).toContain(kisi.ad);
    }
  });

  it('Kastor ve Polydeukes ayrı kişiler, babaları farklı', () => {
    expect(akrabalar(veri, 'kastor').ebeveynler.map((k) => k.kimlik)).toContain('tyndareos');
    expect(akrabalar(veri, 'polydeukes').ebeveynler.map((k) => k.kimlik)).toContain('zeus');
    expect(kayittanKisi(veri, 'kahramanlar', 'kastor-ve-polydeukes')).toBe('kastor');
  });

  it('Kybele akrabasız durur', () => {
    expect(kimlikler.has('kybele')).toBe(true);
    const geciyor = veri.iliskiler.some((i) => (i.tur === 'es' ? i.kisiler.includes('kybele') : i.ebeveyn === 'kybele' || i.cocuk === 'kybele'));
    expect(geciyor).toBe(false);
  });

  it('ana anlatıda döngü yok ve kimsenin ikiden fazla ana ebeveyni yok', () => {
    for (const kisi of veri.kisiler) {
      expect(atalar(veri, kisi.kimlik).has(kisi.kimlik), kisi.kimlik).toBe(false);
      const ana = veri.iliskiler.filter((i) => i.tur === 'ebeveyn' && i.anlati === 'ana' && i.cocuk === kisi.kimlik);
      expect(ana.length, kisi.kimlik).toBeLessThanOrEqual(2);
    }
  });

  it('kalabalık topluluklar grup düğümüdür', () => {
    for (const grup of ['okeanidler', 'nereidler', 'kentaurlar', 'kykloplar', 'hekatonkheirler']) {
      expect(veri.kisiler.find((k) => k.kimlik === grup)?.grup, grup).toBe(true);
    }
  });

  it('kişi sayısı 250 ile 400 arasında', () => {
    expect(veri.kisiler.length).toBeGreaterThanOrEqual(250);
    expect(veri.kisiler.length).toBeLessThanOrEqual(400);
  });
});
