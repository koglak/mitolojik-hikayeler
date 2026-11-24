export const atlasBasi = -3500;
export const atlasSonu = 500;

export const koordinat = (yil: number) => (yil < 0 ? yil + 1 : yil);

export const yilaCevir = (konum: number) => (konum <= 0 ? konum - 1 : konum);

export const gecerliYil = (yil: number) => Number.isInteger(yil) && yil !== 0 && yil >= atlasBasi && yil <= atlasSonu;

export function yilKaydir(yil: number, adim: number, enAz = atlasBasi, enCok = atlasSonu): number {
  const konum = koordinat(yil) + adim;
  return yilaCevir(Math.min(koordinat(enCok), Math.max(koordinat(enAz), konum)));
}

export const yilYaz = (yil: number) => (yil < 0 ? `MÖ ${-yil}` : `MS ${yil}`);

export function aralikYaz(bas: number, son: number): string {
  if (bas === son) return yilYaz(bas);
  if (bas < 0 === son < 0) return `${yilYaz(bas)}–${Math.abs(son)}`;
  return `${yilYaz(bas)} – ${yilYaz(son)}`;
}

export function eksenAdimi(bas: number, son: number): number {
  const uzunluk = koordinat(son) - koordinat(bas);
  if (uzunluk > 2500) return 500;
  if (uzunluk > 1000) return 250;
  if (uzunluk > 400) return 100;
  return 50;
}

export function eksenIsaretleri(bas: number, son: number): number[] {
  const adim = eksenAdimi(bas, son);
  const isaretler = [bas];
  for (let yil = Math.ceil(bas / adim) * adim; yil < son; yil += adim) {
    const uclaraUzak = yil > bas + adim * 0.4 && yil < son - adim * 0.4;
    if (yil !== 0 && uclaraUzak) isaretler.push(yil);
  }
  return [...isaretler, son];
}

export function eksenEtiketleri(bas: number, son: number): number[] {
  const payliAdim = eksenAdimi(bas, son) * 1.05;
  return eksenIsaretleri(bas, son).filter(
    (yil) => yil === bas || yil === son || (yil > bas + payliAdim && yil < son - payliAdim),
  );
}
