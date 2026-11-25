import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { bekle, ilkUygunGorsel } from './commonsGorsel.mjs';
import { onBilgiyeYaz } from './sanatGorsel.mjs';

const kok = process.cwd();
const icerikKlasoru = join(kok, 'src/content/sanat');
const liste = JSON.parse(readFileSync(join(kok, 'scripts/sanat-gorsel-listesi.json'), 'utf8'));
const argumanlar = process.argv.slice(2);
const yeniden = argumanlar.includes('--yeniden');
const istenenler = argumanlar.filter((arguman) => !arguman.startsWith('--'));
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
