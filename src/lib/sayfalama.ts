export const sayfaBoyu = 12;
const kisaltmasizSayfaSiniri = 7;

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
