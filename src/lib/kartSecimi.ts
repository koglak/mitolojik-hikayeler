const GORUNURLUK_ESIGI = 0.05;

export function enGorunurKart(gorunurlukOranlari: number[], mevcutKart: number): number {
  let secilen = mevcutKart;
  let enYuksekOran = gorunurlukOranlari[mevcutKart] ?? 0;
  gorunurlukOranlari.forEach((oran, sira) => {
    if (oran > enYuksekOran) {
      enYuksekOran = oran;
      secilen = sira;
    }
  });
  return enYuksekOran >= GORUNURLUK_ESIGI ? secilen : mevcutKart;
}

export function sesHatasiSesiKapatir(hata: unknown): boolean {
  const hataAdi = typeof hata === 'object' && hata !== null ? (hata as { name?: unknown }).name : undefined;
  return hataAdi !== 'AbortError';
}
