import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { beklemeSuresi, tekrarDenenmeli } from './istek.mjs';
import { gorselBilgisi, onBilgiyeYaz } from './sanatGorsel.mjs';

const kok = process.cwd();
const icerikKlasoru = join(kok, 'src/content/sanat');
const liste = JSON.parse(readFileSync(join(kok, 'scripts/sanat-gorsel-listesi.json'), 'utf8'));
const argumanlar = process.argv.slice(2);
const yeniden = argumanlar.includes('--yeniden');
const istenenler = argumanlar.filter((arguman) => !arguman.startsWith('--'));
const enCokDeneme = 4;

const bekle = (sure) => new Promise((coz) => setTimeout(coz, sure));

async function getir(adres) {
  for (let deneme = 0; ; deneme += 1) {
    const yanit = await fetch(adres, { headers: { 'User-Agent': 'sanat-gorselleri/1.0' } });
    if (yanit.ok) return yanit;
    if (!tekrarDenenmeli(yanit.status) || deneme + 1 >= enCokDeneme) throw new Error(`HTTP ${yanit.status}: ${adres}`);
    await bekle(beklemeSuresi(deneme, yanit.headers.get('retry-after')));
  }
}

async function sor(sunucu, parametreler) {
  const sorgu = new URLSearchParams({ action: 'query', format: 'json', formatversion: '2', ...parametreler });
  return (await getir(`https://${sunucu}/w/api.php?${sorgu}`)).json();
}

async function makaleninDosyasi(makale) {
  const { query } = await sor('en.wikipedia.org', {
    titles: makale,
    redirects: '1',
    prop: 'pageimages',
    piprop: 'name',
    pilicense: 'free',
  });
  const ad = query?.pages?.[0]?.pageimage;
  if (!ad) throw new Error(`"${makale}" maddesinde özgür görsel yok`);
  return [`File:${ad}`];
}

async function aramaninDosyalari(arama) {
  const { query } = await sor('commons.wikimedia.org', {
    list: 'search',
    srsearch: `${arama} filetype:bitmap`,
    srnamespace: '6',
    srlimit: '8',
  });
  const adlar = (query?.search ?? []).map(({ title }) => title);
  if (adlar.length === 0) throw new Error(`"${arama}" aramasında dosya yok`);
  return adlar;
}

async function ilkUygunGorsel({ dosya, makale, arama }) {
  const adaylar = dosya ? [dosya] : makale ? await makaleninDosyasi(makale) : await aramaninDosyalari(arama);
  const hatalar = [];
  for (const aday of adaylar) {
    const { query } = await sor('commons.wikimedia.org', {
      titles: aday,
      prop: 'imageinfo',
      iiprop: 'url|size|mime|extmetadata',
      iiurlwidth: '1280',
    });
    const bilgi = query?.pages?.[0]?.imageinfo?.[0];
    try {
      if (!bilgi) throw new Error('Commons kaydı yok');
      return gorselBilgisi(bilgi);
    } catch (hata) {
      hatalar.push(`${aday}: ${hata.message}`);
    }
  }
  throw new Error(hatalar.join('; '));
}

const bilinmeyen = istenenler.filter((slug) => !liste[slug]);
if (bilinmeyen.length > 0) {
  console.error(`Listede yok: ${bilinmeyen.join(', ')}`);
  process.exit(1);
}

const basarisiz = [];
for (const [slug, kayit] of Object.entries(liste)) {
  if (istenenler.length > 0 && !istenenler.includes(slug)) continue;
  const yol = join(icerikKlasoru, `${slug}.md`);
  const metin = readFileSync(yol, 'utf8');
  if (matter(metin).data.gorsel && !yeniden) continue;
  try {
    const gorsel = await ilkUygunGorsel(kayit);
    const sahibi = kayit.sahibi ?? gorsel.sahibi;
    writeFileSync(yol, onBilgiyeYaz(metin, { ...gorsel, alt: kayit.alt, sahibi }));
    console.log(`✓ ${slug}: ${gorsel.lisans}, ${sahibi}`);
  } catch (hata) {
    basarisiz.push(slug);
    console.error(`✗ ${slug}: ${hata.message}`);
  }
  await bekle(500);
}

console.log(basarisiz.length === 0 ? 'Tamamlandı.' : `Görselsiz kalanlar: ${basarisiz.join(', ')}`);
process.exitCode = basarisiz.length === 0 ? 0 : 1;
