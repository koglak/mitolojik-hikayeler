export interface BaslikParcalari {
  ad: string;
  altBaslik: string;
}

export function basligiBol(baslik: string): BaslikParcalari {
  const ayirac = baslik.indexOf(':');
  if (ayirac === -1) return { ad: baslik.trim(), altBaslik: '' };
  return { ad: baslik.slice(0, ayirac).trim(), altBaslik: baslik.slice(ayirac + 1).trim() };
}
