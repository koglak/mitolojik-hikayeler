import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { beklemeSuresi, tekrarDenenmeli } from './istek.mjs';
import { ssmlOlustur } from './ssml.mjs';

const MIT_KLASORU = join(process.cwd(), 'src/content/mitler');
const SES_KLASORU = join(process.cwd(), 'public/ses');
const CIKTI_BICIMI = 'audio-24khz-48kbitrate-mono-mp3';
const EN_FAZLA_TEKRAR = 5;
const ISTEKLER_ARASI_MS = 3200;

const anahtar = process.env.AZURE_SPEECH_KEY;
const bolge = process.env.AZURE_SPEECH_REGION;

if (!anahtar || !bolge) {
  console.error(
    'AZURE_SPEECH_KEY ve AZURE_SPEECH_REGION ortam değişkenleri gerekli.\n' +
      'Örnek: AZURE_SPEECH_KEY=xxx AZURE_SPEECH_REGION=westeurope npm run ses',
  );
  process.exit(1);
}

const argumanlar = process.argv.slice(2);
const yenidenUret = argumanlar.includes('--yeniden');
const istenenSluglar = argumanlar.filter((arguman) => !arguman.startsWith('--'));

function mitleriOku() {
  return readdirSync(MIT_KLASORU)
    .filter((dosya) => dosya.endsWith('.md'))
    .map((dosya) => ({
      slug: dosya.replace(/\.md$/, ''),
      veri: matter(readFileSync(join(MIT_KLASORU, dosya), 'utf8')).data,
    }))
    .filter(({ slug }) => istenenSluglar.length === 0 || istenenSluglar.includes(slug));
}

function seslendirilecekMetinler(veri) {
  return [`${veri.baslik}. ${veri.ozet}`, ...veri.kartlar.map((kart) => kart.metin)];
}

function bekle(ms) {
  return new Promise((coz) => setTimeout(coz, ms));
}

async function sesUret(metin) {
  for (let denemeNo = 0; ; denemeNo++) {
    const yanit = await fetch(`https://${bolge}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': anahtar,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': CIKTI_BICIMI,
        'User-Agent': 'mitolojik-hikayeler',
      },
      body: ssmlOlustur(metin),
    });
    if (yanit.ok) return Buffer.from(await yanit.arrayBuffer());
    if (denemeNo < EN_FAZLA_TEKRAR && tekrarDenenmeli(yanit.status)) {
      const sure = beklemeSuresi(denemeNo, yanit.headers.get('retry-after'));
      console.log(`  … HTTP ${yanit.status}, ${Math.round(sure / 1000)} sn sonra tekrar denenecek`);
      await bekle(sure);
      continue;
    }
    throw new Error(`HTTP ${yanit.status} ${yanit.statusText}: ${await yanit.text()}`);
  }
}

const mitler = mitleriOku();
if (mitler.length === 0) {
  console.error(`Mitos bulunamadı: ${istenenSluglar.join(', ')}`);
  process.exit(1);
}

let uretilen = 0;
let atlanan = 0;
let hatali = 0;

for (const { slug, veri } of mitler) {
  const klasor = join(SES_KLASORU, slug);
  mkdirSync(klasor, { recursive: true });
  const metinler = seslendirilecekMetinler(veri);

  for (const [no, metin] of metinler.entries()) {
    const dosya = join(klasor, `${no}.mp3`);
    if (existsSync(dosya) && !yenidenUret) {
      atlanan++;
      continue;
    }
    try {
      if (uretilen + hatali > 0) await bekle(ISTEKLER_ARASI_MS);
      writeFileSync(dosya, await sesUret(metin));
      uretilen++;
      console.log(`✓ ${slug}/${no}.mp3`);
    } catch (hata) {
      hatali++;
      console.error(`✗ ${slug}/${no}.mp3 — ${hata.message}`);
    }
  }
}

console.log(`\nÜretilen: ${uretilen}, atlanan: ${atlanan}, hatalı: ${hatali}`);
process.exit(hatali > 0 ? 1 : 0);
