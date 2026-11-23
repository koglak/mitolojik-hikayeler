export interface KronolojiOlayi {
  yil: number;
  tarih: string;
  olay: string;
  tur: 'tarih' | 'gelenek';
  baglanti?: string;
}

export function yilEtiketi(yil: number): string {
  if (yil < 0) return `MÖ ${-yil}`;
  if (yil < 1000) return `MS ${yil}`;
  return String(yil);
}

export const kronoloji: KronolojiOlayi[] = [
  { yil: -3000, tarih: 'MÖ 3000 civarı', olay: 'Hisarlık tepesinde ilk yerleşim: Truva I.', tur: 'tarih', baglanti: '/antik-kentler/truva' },
  { yil: -1184, tarih: 'MÖ 1184', olay: 'Eratosthenes’in hesabına göre Truva düşer.', tur: 'gelenek', baglanti: '/mitler/truva-ati' },
  { yil: -750, tarih: 'MÖ 8. yüzyıl', olay: 'Homeros’a atfedilen İlyada ve Odysseia.', tur: 'tarih', baglanti: '/kahramanlar/akhilleus' },
  { yil: -700, tarih: 'MÖ 700 civarı', olay: 'Hesiodos Theogonia’yı yazar: tanrıların soy kütüğü.', tur: 'tarih', baglanti: '/tanrilar/zeus' },
  { yil: -550, tarih: 'MÖ 550 civarı', olay: 'Lydia kralı Kroisos’un desteğiyle Efes’te Artemis Tapınağı yükselir.', tur: 'tarih', baglanti: '/antik-kentler/efes' },
  { yil: -356, tarih: 'MÖ 356', olay: 'Herostratos, ünlü olmak için Artemis Tapınağı’nı yakar.', tur: 'tarih', baglanti: '/antik-kentler/efes' },
  { yil: -170, tarih: 'MÖ 2. yüzyıl', olay: 'Bergama’da Zeus Sunağı: tanrılarla devlerin savaşı mermere işlenir.', tur: 'tarih', baglanti: '/antik-kentler/bergama' },
  { yil: 8, tarih: 'MS 8', olay: 'Ovidius Dönüşümler’i (Metamorphoses) tamamlar.', tur: 'tarih', baglanti: '/mitler/narkissos' },
  { yil: 120, tarih: 'MS 2. yüzyıl başı', olay: 'Efes’te Celsus Kütüphanesi inşa edilir.', tur: 'tarih', baglanti: '/antik-kentler/efes' },
  { yil: 150, tarih: 'MS 1.–2. yüzyıl', olay: 'Apollodoros’a atfedilen Kütüphane: mitlerin el kitabı.', tur: 'tarih', baglanti: '/kahramanlar/herakles' },
  { yil: 1871, tarih: '1871', olay: 'Heinrich Schliemann Hisarlık’ta büyük kazılara başlar.', tur: 'tarih', baglanti: '/antik-kentler/truva' },
];
