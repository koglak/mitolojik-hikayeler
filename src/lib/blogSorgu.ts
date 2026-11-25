import { aramaIcinSadelestir } from './aramaMetni';
import { blogAdresi } from './blog';

export interface BlogDurumu {
  aranan: string;
  sayfa: number;
}

export { sayfaBoyu, sayfadakiler, sayfaNumaralari, sayfaSayisi, sayfayiSinirla } from './sayfalama';

export function yazilariSuz<T extends { aranan: string }>(yazilar: T[], aranan: string): T[] {
  const sozcukler = aramaIcinSadelestir(aranan).split(/\s+/).filter(Boolean);
  return yazilar.filter((yazi) => {
    const metin = aramaIcinSadelestir(yazi.aranan);
    return sozcukler.every((sozcuk) => metin.includes(sozcuk));
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
