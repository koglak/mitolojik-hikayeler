const BASAMAKLAR: [number, string][] = [
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

export function romaRakami(sayi: number): string {
  if (!Number.isInteger(sayi) || sayi < 1 || sayi > 39) {
    throw new RangeError(`Roma rakamına çevrilemez: ${sayi}`);
  }
  let kalan = sayi;
  let sonuc = '';
  for (const [deger, simge] of BASAMAKLAR) {
    while (kalan >= deger) {
      sonuc += simge;
      kalan -= deger;
    }
  }
  return sonuc;
}
