export const atlasBolgeAnahtarlari = ['anadolu', 'mezopotamya', 'ege', 'misir', 'iran', 'akdeniz'] as const;

export type AtlasBolgesi = (typeof atlasBolgeAnahtarlari)[number];

export const atlasBolgeleri: Record<AtlasBolgesi, { ad: string; renk: string }> = {
  anadolu: { ad: 'Anadolu', renk: '#dd9468' },
  mezopotamya: { ad: 'Mezopotamya', renk: '#6fb8ab' },
  ege: { ad: 'Ege', renk: '#8eabe0' },
  misir: { ad: 'Mısır', renk: '#dcbf63' },
  iran: { ad: 'İran', renk: '#b79bdb' },
  akdeniz: { ad: 'Akdeniz', renk: '#e08ba4' },
};
