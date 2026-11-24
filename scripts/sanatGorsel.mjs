import { lisansKabul } from '../src/lib/sanat.ts';

const varliklar = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'", '&nbsp;': ' ' };

const temizMetin = (html) =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(amp|lt|gt|quot|#039|nbsp);/g, (varlik) => varliklar[varlik])
    .replace(/\s+/g, ' ')
    .trim();

export function gorselBilgisi(bilgi) {
  const ustVeri = bilgi.extmetadata ?? {};
  const lisans = temizMetin(ustVeri.LicenseShortName?.value ?? '');
  if (!lisansKabul(lisans)) throw new Error(`Kabul edilmeyen lisans: "${lisans}"`);
  if (!/^image\/(jpeg|png|tiff|webp)$/.test(bilgi.mime)) throw new Error(`Kullanılabilir resim değil: ${bilgi.mime}`);
  const lisansAdresi = (ustVeri.LicenseUrl?.value ?? '').replace(/^http:/, 'https:');
  const kucuk = bilgi.thumburl !== undefined;
  return {
    adres: (kucuk ? bilgi.thumburl : bilgi.url).replace(/\?.*$/, ''),
    genislik: kucuk ? bilgi.thumbwidth : bilgi.width,
    yukseklik: kucuk ? bilgi.thumbheight : bilgi.height,
    sahibi: temizMetin(ustVeri.Artist?.value ?? '') || 'Bilinmiyor',
    lisans: /^public domain$/i.test(lisans) ? 'Kamu malı' : lisans,
    ...(lisansAdresi.startsWith('https://') ? { lisansAdresi } : {}),
    kaynakAdresi: bilgi.descriptionurl,
  };
}

export function onBilgiyeYaz(metin, gorsel) {
  const son = metin.indexOf('\n---\n', 4);
  if (!metin.startsWith('---\n') || son === -1) throw new Error('Ön bilgi bulunamadı');
  const onBilgi = metin.slice(0, son).replace(/\ngorsel:(\n {2}.*)+/, '');
  const blok = Object.entries(gorsel).map(([alan, deger]) => `  ${alan}: ${JSON.stringify(deger)}`);
  return `${onBilgi}\ngorsel:\n${blok.join('\n')}${metin.slice(son)}`;
}
