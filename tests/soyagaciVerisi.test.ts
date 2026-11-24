import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { soyagaciSemasi, type Soyagaci } from '../src/lib/soyagaciSemasi';
import { akrabalar, aileGruplari, atalar, kayittanKisi, soyAgaci, soyCizgisi, type SoyDugumu } from '../src/lib/soyagaci';
import { adrestenSoy, baslangicSoylari, kisininSoylari, soyAdresi } from '../src/lib/soyagaciBaslangic';

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

  it('iki ana ebeveynden ve her çiftten biri kadın, biri erkek', () => {
    const cinsiyet = new Map(veri.kisiler.map((k) => [k.kimlik, k.cinsiyet]));
    const ciftler = new Map<string, string[]>();
    for (const iliski of veri.iliskiler) {
      if (iliski.tur === 'es') ciftler.set(`es ${iliski.kisiler.join('+')}`, iliski.kisiler);
      else if (iliski.anlati === 'ana') ciftler.set(iliski.cocuk, [...(ciftler.get(iliski.cocuk) ?? []), iliski.ebeveyn]);
    }
    for (const [ad, cift] of ciftler) {
      if (cift.length !== 2) continue;
      expect(cift.map((k) => cinsiyet.get(k)).sort(), `${ad}: ${cift.join(' + ')}`).toEqual(['erkek', 'kadin']);
    }
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

  it('ayrıca gösterildiği söylenen herkes ağaçta var', () => {
    const adlar = new Set(veri.kisiler.map((k) => k.ad));
    for (const kisi of veri.kisiler) {
      const anilanlar = kisi.not?.match(/([^.]+) ayrıca gösterilir/)?.[1].trim().split(/, | ve /) ?? [];
      for (const ad of anilanlar) if (/^\p{Lu}\p{L}+$/u.test(ad)) expect(adlar.has(ad), `${kisi.kimlik}: ${ad}`).toBe(true);
    }
  });

  it.each([
    ['ares', 'antiope'],
    ['bias', 'anaksibia-pelias'],
    ['zeus', 'arkeisios'],
    ['klymene', 'phaethon'],
    ['iobates', 'philonoe'],
    ['atlas', 'pleiadlar'],
  ])('%s, %s kişisinin ana ebeveynidir', (ebeveyn, cocuk) => {
    expect(akrabalar(veri, cocuk).ebeveynler.map((k) => k.kimlik)).toContain(ebeveyn);
  });

  it.each([
    ['iphigeneia', ['theseus', 'helene']],
    ['hippolytos', ['hippolyte']],
    ['deianeira', ['dionysos']],
    ['parthenopaios', ['talaos', 'lysimakhe', 'ares']],
    ['endymion', ['zeus']],
    ['erikhthonios-atina', ['athena']],
    ['asopos', ['poseidon', 'zeus']],
    ['atalanta', ['skhoineus']],
    ['perieres', ['kynortas']],
    ['troilos', ['apollon']],
  ])('%s için başka anlatıdaki ebeveynler kayıtlı', (cocuk, ebeveynler) => {
    expect(akrabalar(veri, cocuk).alternatifEbeveynler.map((a) => a.kisi.kimlik)).toEqual(expect.arrayContaining(ebeveynler));
  });

  it.each([
    ['agamemnon', 'Pleisthenes'],
    ['menelaos', 'Pleisthenes'],
    ['tyndareos', 'Oibalos'],
    ['ikarios', 'Oibalos'],
    ['iksion', 'Antion'],
    ['atalanta', 'Hippomenes'],
    ['europa', 'Phoiniks'],
    ['iason', 'Alkimede'],
    ['iapetos', 'Asia'],
    ['omphale', 'Lamos'],
  ])('%s notunda ağaçta olmayan anlatı anılır: %s', (kimlik, ad) => {
    expect(veri.kisiler.find((k) => k.kimlik === kimlik)?.not).toContain(ad);
  });

  it('başlangıç kartlarındaki herkes ağaçta var ve tekrarsız', () => {
    expect(baslangicSoylari.length).toBeGreaterThanOrEqual(8);
    for (const soy of baslangicSoylari) {
      expect(soy.kisiler.length, soy.ad).toBeGreaterThanOrEqual(4);
      expect(new Set(soy.kisiler).size, soy.ad).toBe(soy.kisiler.length);
      for (const kimlik of soy.kisiler) expect(kimlikler.has(kimlik), `${soy.ad}: ${kimlik}`).toBe(true);
    }
  });

  it.each(baslangicSoylari.map((soy) => [soy.ad, soy] as const))('%s ağacı bütün üyelerini tam bir kez yerleştirir', (_, soy) => {
    const dugumler: string[] = [];
    const esler: string[] = [];
    const gez = (dugum: SoyDugumu) => {
      dugumler.push(dugum.kisi.kimlik);
      for (const dal of dugum.dallar) {
        if (dal.es) esler.push(dal.es.kimlik);
        dal.cocuklar.forEach(gez);
      }
    };
    soyAgaci(veri, soy.kokler, soy.uyeler).forEach(gez);
    expect(new Set(dugumler).size).toBe(dugumler.length);
    for (const uye of soy.uyeler) expect([...dugumler, ...esler], uye).toContain(uye);
    for (const kimlik of soy.kisiler) expect([...dugumler, ...esler], kimlik).toContain(kimlik);
    expect(dugumler.length).toBeLessThanOrEqual(40);
  });

  it('on iki Olimposlu, Olimposlular ağacında', () => {
    const olimpos = baslangicSoylari.find((soy) => soy.kimlik === 'olimposlular')!;
    for (const tanri of ['zeus', 'hera', 'poseidon', 'demeter', 'athena', 'apollon', 'artemis', 'ares', 'afrodit', 'hephaistos', 'hermes', 'dionysos', 'hestia']) {
      expect(olimpos.uyeler).toContain(tanri);
    }
  });

  it.each([
    ['olimposlular', ['eileithyia', 'triton', 'phobos', 'deimos']],
    ['titanlar', ['perses', 'hekate', 'pallas', 'nike', 'astraios']],
    ['canavarlar', ['stheno', 'euryale', 'graialar', 'geryon', 'orthos', 'nemea-aslani']],
    ['herakles', ['eurystheus', 'hyllos', 'therimakhos']],
    ['thebai', ['ino', 'agaue', 'pentheus', 'aktaion', 'kreon', 'haimon', 'thersandros']],
    ['girit', ['rhadamanthys', 'androgeos', 'idomeneus', 'palamedes']],
    ['mykenai', ['aigisthos', 'pelopia', 'tisamenos', 'pylades']],
    ['sparta', ['idas', 'lynkeus-aphareus', 'hilaeira', 'phoibe-leukippos']],
    ['truva', ['troilos', 'deiphobos', 'aisakos', 'hesione']],
    ['akhilleus', ['phokos', 'teukros', 'pylades']],
    ['aiolos', ['athamas', 'phriksos', 'helle', 'kephalos', 'pheres', 'akastos']],
    ['atina', ['erikhthonios-atina', 'erekhtheus', 'aigeus', 'theseus', 'daidalos', 'ikaros', 'hippolytos']],
  ])('%s ağacında eksik kalmış kişiler var', (kimlik, kisiler) => {
    expect(baslangicSoylari.find((soy) => soy.kimlik === kimlik)?.uyeler).toEqual(expect.arrayContaining(kisiler));
  });

  it('soy adresi geri okunur, bilinmeyen soy tanımsızdır', () => {
    for (const soy of baslangicSoylari) expect(adrestenSoy(soyAdresi(soy.kimlik))?.kimlik).toBe(soy.kimlik);
    for (const adres of ['', '?soy=', '?soy=yok', '?kisi=zeus']) expect(adrestenSoy(adres)).toBeUndefined();
  });

  it('kişinin yer aldığı soylar bulunur', () => {
    expect(kisininSoylari('priamos').map((soy) => soy.kimlik)).toEqual(['truva']);
    expect(kisininSoylari('pylades').map((soy) => soy.kimlik)).toEqual(['mykenai', 'akhilleus']);
    expect(kisininSoylari('kybele')).toEqual([]);
  });

  it('her ana çocuk ebeveyninin aile gruplarında tam bir kez görünür', () => {
    for (const kisi of veri.kisiler) {
      const gruptakiler = aileGruplari(veri, kisi.kimlik).flatMap((g) => g.cocuklar.map((c) => c.kimlik)).sort();
      expect(gruptakiler, kisi.kimlik).toEqual(akrabalar(veri, kisi.kimlik).cocuklar.map((c) => c.kimlik).sort());
    }
  });

  it('soy çizgisi her adımda ebeveynden çocuğa iner ve Zeus soyu Gaia dan başlar', () => {
    for (const kisi of veri.kisiler) {
      const yol = soyCizgisi(veri, kisi.kimlik);
      for (const [i, adim] of yol.slice(1).entries()) {
        expect(akrabalar(veri, adim.kimlik).ebeveynler, kisi.kimlik).toContain(yol[i]);
      }
    }
    expect(soyCizgisi(veri, 'herakles').map((k) => k.ad)).toEqual(['Gaia', expect.any(String), 'Zeus', 'Herakles']);
    expect(soyCizgisi(veri, 'hemera')[0].kimlik).toBe('khaos');
  });

  it('geniş kapsam korunur', () => {
    expect(veri.kisiler.length).toBeGreaterThanOrEqual(550);
  });
});
