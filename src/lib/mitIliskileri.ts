interface MiteBaglananOge {
  data: { sira: number; ilgiliMitler: string[] };
}

export const miteBagliOgeler = <T extends MiteBaglananOge>(ogeler: T[], mit: string): T[] =>
  ogeler.filter((oge) => oge.data.ilgiliMitler.includes(mit)).sort((a, b) => a.data.sira - b.data.sira);
