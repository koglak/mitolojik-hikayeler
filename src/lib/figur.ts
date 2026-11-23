export type Yon = 'sag' | 'sol';

export interface FigurKonumu {
  x: number;
  y: number;
  olcek?: number;
  yon?: Yon;
}

export function figurDonusumu(x: number, y: number, olcek = 1, yon: Yon = 'sag'): string {
  const yatayOlcek = yon === 'sol' ? -olcek : olcek;
  return `translate(${x} ${y}) scale(${yatayOlcek} ${olcek})`;
}
