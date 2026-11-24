import { aramaIcinSadelestir } from './aramaMetni';
import { blogAdresi } from './blog';

export interface BlogDurumu {
  aranan: string;
  sayfa: number;
}

export const sayfaBoyu = 12;
const kisaltmasizSayfaSiniri = 7;

export function yazilariSuz<T extends { aranan: string }>(yazilar: T[], aranan: string): T[] {
  const sozcukler = aramaIcinSadelestir(aranan).split(/\s+/).filter(Boolean);
  return yazilar.filter((yazi) => {
    const metin = aramaIcinSadelestir(yazi.aranan);
    return sozcukler.every((sozcuk) => metin.includes(sozcuk));
  });
}

export const sayfaSayisi = (toplam: number) => Math.max(1, Math.ceil(toplam / sayfaBoyu));

export const sayfadakiler = <T>(ogeler: T[], sayfa: number): T[] =>
  ogeler.slice((sayfa - 1) * sayfaBoyu, sayfa * sayfaBoyu);

export const sayfayiSinirla = (sayfa: number, toplam: number) =>
  Math.min(Math.max(1, sayfa), sayfaSayisi(toplam));

export function sayfaNumaralari(sayfa: number, sonSayfa: number): (number | null)[] {
  const butunSayfalar = Array.from({ length: sonSayfa }, (_, sira) => sira + 1);
  if (sonSayfa <= kisaltmasizSayfaSiniri) return butunSayfalar;
  const gosterilenler = butunSayfalar.filter(
    (numara) => numara === 1 || numara === sonSayfa || Math.abs(numara - sayfa) <= 1,
  );
  return gosterilenler.flatMap((numara, sira) => {
    const bosluk = numara - (gosterilenler[sira - 1] ?? 0) - 1;
    if (bosluk === 0) return [numara];
    return [bosluk === 1 ? numara - 1 : null, numara];
  });
}

export function adresiYaz({ aranan, sayfa }: BlogDurumu): string {
  const parametreler = new URLSearchParams();
  if (aranan.trim()) parametreler.set('ara', aranan.trim());
  if (sayfa > 1) parametreler.set('sayfa', String(sayfa));
  const sorgu = parametreler.toString();
  return sorgu ? `${blogAdresi}?${sorgu}` : blogAdresi;
}

export function adresiCoz(sorgu: string): BlogDurumu {
  const parametreler = new URLSearchParams(sorgu);
  const sayfa = Number(parametreler.get('sayfa'));
  return {
    aranan: parametreler.get('ara') ?? '',
    sayfa: Number.isInteger(sayfa) && sayfa > 0 ? sayfa : 1,
  };
}
