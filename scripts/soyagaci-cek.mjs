import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { beklemeSuresi, tekrarDenenmeli } from './istek.mjs';
import { soyagaciSorgusu, sonuclariCozumle } from './soyagaciWikidata.mjs';

const basliklar = { 'User-Agent': 'mitolojik-hikayeler-soyagaci/0.1', Accept: 'application/json' };
const mitolojiIzi = /greek myth|yunan mitoloji|greek god|greek deity|titan|primordial|hero/i;

const bekle = (ms) => new Promise((coz) => setTimeout(coz, ms));

async function getir(adres, secenekler = {}) {
  let sonDurum;
  for (let deneme = 0; deneme < 5; deneme++) {
    const yanit = await fetch(adres, { ...secenekler, headers: { ...basliklar, ...secenekler.headers } });
    if (yanit.ok) return yanit.json();
    sonDurum = yanit.status;
    if (!tekrarDenenmeli(yanit.status)) throw new Error(`${yanit.status} ${adres}`);
    await bekle(beklemeSuresi(deneme, yanit.headers.get('retry-after')));
  }
  throw new Error(`Yanıt alınamadı (${sonDurum}): ${adres}`);
}

async function wikidataAra(ad) {
  for (const dil of ['en', 'tr']) {
    const adres = `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&limit=10&language=${dil}&uselang=${dil}&search=${encodeURIComponent(ad)}`;
    const { search = [] } = await getir(adres);
    const bulunan = search.find((sonuc) => mitolojiIzi.test(sonuc.description ?? ''));
    if (bulunan) return bulunan.id;
  }
  return undefined;
}

function kayitlariOku() {
  const kayitlar = [];
  for (const bolum of ['tanrilar', 'kahramanlar']) {
    const klasor = join('src/content', bolum);
    for (const dosya of readdirSync(klasor).filter((ad) => ad.endsWith('.md'))) {
      const { data } = matter(readFileSync(join(klasor, dosya), 'utf8'));
      const adlar = String(data.ad).split(/\s+ve\s+/);
      for (const ad of adlar) kayitlar.push({ bolum, kimlik: dosya.replace(/\.md$/, ''), ad });
    }
  }
  return kayitlar;
}

const tohumlar = [];
const eslesmeyenler = [];
for (const kayit of kayitlariOku()) {
  const wikidata = await wikidataAra(kayit.ad);
  if (wikidata) tohumlar.push({ ...kayit, wikidata });
  else eslesmeyenler.push(`${kayit.bolum}/${kayit.kimlik} (${kayit.ad})`);
  await bekle(200);
}

const satirlar = [];
for (const tohum of new Set(tohumlar.map((t) => t.wikidata))) {
  const yanit = await getir('https://query.wikidata.org/sparql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/sparql-results+json' },
    body: new URLSearchParams({ query: soyagaciSorgusu([tohum]) }),
  });
  satirlar.push(...yanit.results.bindings);
  await bekle(1000);
}
const sparql = { results: { bindings: satirlar } };
const { kisiler, iliskiler } = sonuclariCozumle(sparql);

mkdirSync('veri-ham', { recursive: true });
writeFileSync('veri-ham/soyagaci-aday.json', JSON.stringify({ tohumlar, eslesmeyenler, kisiler, iliskiler }, null, 2));
console.log(`${tohumlar.length} tohum, ${kisiler.length} kişi, ${iliskiler.length} ilişki`);
if (eslesmeyenler.length) console.log(`Eşleşmeyenler:\n  ${eslesmeyenler.join('\n  ')}`);
