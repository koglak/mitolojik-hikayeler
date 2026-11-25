import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { bekle, ilkUygunGorsel } from './commonsGorsel.mjs';

const kok = process.cwd();
const kentKlasoru = join(kok, 'src/content/kentler');
const liste = JSON.parse(readFileSync(join(kok, 'scripts/yapi-gorsel-listesi.json'), 'utf8'));
const argumanlar = process.argv.slice(2);
const yeniden = argumanlar.includes('--yeniden');
const istenenKentler = argumanlar.filter((arguman) => !arguman.startsWith('--'));

const gorselBlogu = (gorsel) => ['    gorsel:', ...Object.entries(gorsel).map(([alan, deger]) => `      ${alan}: ${JSON.stringify(deger)}`)];

function yapiyaGorselYaz(metin, yapiAdi, gorsel) {
  const satirlar = metin.split('\n');
  const yapilarBasi = satirlar.indexOf('yapilar:');
  const baslangic = satirlar.indexOf(`  - ad: ${JSON.stringify(yapiAdi)}`, yapilarBasi);
  if (yapilarBasi === -1 || baslangic === -1) throw new Error(`Yapı bulunamadı: ${yapiAdi}`);
  let bitis = baslangic + 1;
  while (bitis < satirlar.length && /^ {4,}/.test(satirlar[bitis])) bitis += 1;
  const ozellikler = satirlar.slice(baslangic + 1, bitis);
  const gorselsiz = [];
  let gorselIcinde = false;
  for (const satir of ozellikler) {
    if (/^ {4}gorsel:/.test(satir)) gorselIcinde = true;
    else if (/^ {4}\S/.test(satir)) gorselIcinde = false;
    if (!gorselIcinde) gorselsiz.push(satir);
  }
  satirlar.splice(baslangic + 1, bitis - baslangic - 1, ...gorselsiz, ...gorselBlogu(gorsel));
  return satirlar.join('\n');
}

function gorselVarMi(metin, yapiAdi) {
  const baslangic = metin.indexOf(`  - ad: ${JSON.stringify(yapiAdi)}`, metin.indexOf('\nyapilar:'));
  const sonraki = metin.indexOf('\n  - ad:', baslangic + 1);
  const parca = metin.slice(baslangic, sonraki === -1 ? undefined : sonraki);
  return /\n {4}gorsel:/.test(parca.split('\n---\n')[0]);
}

const basarisiz = [];
for (const kayit of liste) {
  if (istenenKentler.length > 0 && !istenenKentler.includes(kayit.kent)) continue;
  const yol = join(kentKlasoru, `${kayit.kent}.md`);
  const metin = readFileSync(yol, 'utf8');
  if (gorselVarMi(metin, kayit.ad) && !yeniden) continue;
  try {
    const gorsel = await ilkUygunGorsel(kayit);
    const sahibi = kayit.sahibi ?? gorsel.sahibi;
    writeFileSync(yol, yapiyaGorselYaz(metin, kayit.ad, { ...gorsel, alt: kayit.alt, sahibi }));
    console.log(`✓ ${kayit.kent} / ${kayit.ad}: ${gorsel.lisans}, ${sahibi}`);
  } catch (hata) {
    basarisiz.push(`${kayit.kent} / ${kayit.ad}`);
    console.error(`✗ ${kayit.kent} / ${kayit.ad}: ${hata.message}`);
  }
  await bekle(500);
}

console.log(basarisiz.length === 0 ? 'Tamamlandı.' : `Görselsiz kalanlar: ${basarisiz.join(', ')}`);
process.exitCode = basarisiz.length === 0 ? 0 : 1;
