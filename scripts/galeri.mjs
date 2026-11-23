import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const argumanlar = process.argv.slice(2);
const ciktiSirasi = argumanlar.indexOf('--cikti');
if (ciktiSirasi === -1 || !argumanlar[ciktiSirasi + 1]) {
  console.error('Kullanım: node scripts/galeri.mjs <slug...> --cikti <dosya>');
  process.exit(1);
}
const ciktiYolu = argumanlar[ciktiSirasi + 1];
const sluglar = argumanlar.filter((_, i) => i !== ciktiSirasi && i !== ciktiSirasi + 1);
const dist = join(process.cwd(), 'dist');

function sayfaOku(slug) {
  const yol = join(dist, 'mitler', slug, 'index.html');
  if (!existsSync(yol)) throw new Error(`Bulunamadı: ${yol}. Önce npm run build çalıştır.`);
  return readFileSync(yol, 'utf8');
}

function stilleriTopla(html) {
  const bagliStiller = [...html.matchAll(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)"/g)].map(([, yol]) =>
    readFileSync(join(dist, yol), 'utf8'),
  );
  const satirIciStiller = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(([, icerik]) => icerik);
  return [...bagliStiller, ...satirIciStiller];
}

const stiller = new Set();
let tanimlar = '';
const bolumler = sluglar.map((slug) => {
  const html = sayfaOku(slug);
  stilleriTopla(html).forEach((stil) => stiller.add(stil));
  tanimlar ||= html.match(/<svg width="0" height="0"[\s\S]*?<\/svg>/)?.[0] ?? '';
  const baslik = html.match(/<title>([^|<]+)/)?.[1]?.trim() ?? slug;
  const kartlar = [...html.matchAll(/<section class="kart sahneli[\s\S]*?<\/section>/g)].map(([kart]) =>
    kart.replace('class="kart sahneli', 'class="kart sahneli aktif'),
  );
  const telefonlar = kartlar.map((kart, i) => `<figure class="telefon"><figcaption>${i === 0 ? 'Kapak' : `Kart ${i}`}</figcaption><div class="ekran">${kart}</div></figure>`);
  return `<section class="mitos"><h2>${baslik}</h2><div class="dizi">${telefonlar.join('')}</div></section>`;
});

const galeriStili = `
  :root { color-scheme: dark; }
  html, body { height: auto !important; }
  body { background: #0b0909; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 24px 48px; }
  .galeri-baslik { font-family: var(--baslik-font); color: var(--yazi); font-size: 1.6rem; margin: 0 0 4px; }
  .galeri-aciklama { color: var(--soluk); margin: 0 0 24px; max-width: 60ch; }
  .mitos h2 { color: var(--vurgu); font-size: 1.3rem; margin: 32px 0 16px; }
  .dizi { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
  .telefon { margin: 0; min-width: 0; }
  .telefon figcaption { color: var(--soluk); font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; }
  .ekran { border: 2px solid #3d2a20; border-radius: 22px; overflow: hidden; background: var(--zemin); }
  .ekran .kart { min-height: 0; padding: 0 0 22px; max-width: none; }
  .ekran .sahne-alani { height: auto; }
  .ekran .vazo-sahnesi { height: auto !important; aspect-ratio: 4 / 3; }
  .ekran .ipucu { animation: none; }
`;

const sayfa = `<title>Vazo Sahneleri</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600&display=swap">
<style>${[...stiller].join('\n')}${galeriStili}</style>
${tanimlar}
<h1 class="galeri-baslik">Vazo Sahneleri</h1>
<p class="galeri-aciklama">Her kart, telefonda göründüğü gibi: üstte sahne, altta metin. Görsel kaliteye ve sahnenin metinle uyumuna bakın.</p>
${bolumler.join('\n')}`;

writeFileSync(ciktiYolu, sayfa);
console.log(`${sluglar.length} mitos → ${ciktiYolu}`);
