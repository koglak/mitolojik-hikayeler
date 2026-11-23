export const yuvarla = (sayi: number) => Math.round(sayi * 10) / 10;

export const dolu = (d: string) => `<path d="${d}" fill="currentColor" stroke="none"/>`;

export const yaprak = (x: number, y: number, aci: number, en = 2.6, boy = 5.5, dolgulu = true) =>
  `<ellipse cx="${yuvarla(x)}" cy="${yuvarla(y)}" rx="${en}" ry="${boy}" transform="rotate(${yuvarla(aci)} ${yuvarla(x)} ${yuvarla(y)})"${
    dolgulu ? ' fill="currentColor" stroke="none"' : ''
  }/>`;

export const isinlar = (cx: number, cy: number, ic: number, dis: number, adet: number, baslangic = 0, bitis = 360) => {
  const adim = (bitis - baslangic) / (bitis - baslangic === 360 ? adet : adet - 1);
  return Array.from({ length: adet }, (_, i) => {
    const radyan = ((baslangic + i * adim) * Math.PI) / 180;
    const cos = Math.cos(radyan);
    const sin = Math.sin(radyan);
    return `M${yuvarla(cx + ic * cos)} ${yuvarla(cy + ic * sin)}L${yuvarla(cx + dis * cos)} ${yuvarla(cy + dis * sin)}`;
  }).join('');
};

export const yildiz = (cx: number, cy: number, r: number) => {
  const noktalar = Array.from({ length: 8 }, (_, i) => {
    const uzaklik = i % 2 === 0 ? r : r * 0.32;
    const radyan = (i * 45 * Math.PI) / 180 - Math.PI / 2;
    return `${yuvarla(cx + uzaklik * Math.cos(radyan))} ${yuvarla(cy + uzaklik * Math.sin(radyan))}`;
  });
  return dolu(`M${noktalar.join('L')}Z`);
};

export const alev = (x: number, y: number, olcek = 1) => {
  const o = (sayi: number) => yuvarla(sayi * olcek);
  return (
    `<path d="M${x} ${y - o(12)}c${-o(6)} ${o(7)} ${-o(8)} ${o(11)} ${-o(8)} ${o(15)}a${o(8)} ${o(8)} 0 0 0 ${o(16)} 0c0 ${-o(4)} ${-o(2)} ${-o(8)} ${-o(8)} ${-o(15)}Z"/>` +
    dolu(`M${x} ${y - o(2)}c${-o(2)} ${o(3)} ${-o(3)} ${o(4)} ${-o(3)} ${o(6)}a${o(3)} ${o(3)} 0 0 0 ${o(6)} 0c0 ${-o(2)} ${-o(1)} ${-o(3)} ${-o(3)} ${-o(6)}Z`)
  );
};
