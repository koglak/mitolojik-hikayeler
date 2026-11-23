function kanaliDogrusallastir(kanal: number): number {
  const oran = kanal / 255;
  return oran <= 0.03928 ? oran / 12.92 : ((oran + 0.055) / 1.055) ** 2.4;
}

function goreliParlaklik(hex: string): number {
  const deger = hex.replace('#', '');
  const [kirmizi, yesil, mavi] = [0, 2, 4].map((baslangic) =>
    kanaliDogrusallastir(parseInt(deger.slice(baslangic, baslangic + 2), 16)),
  );
  return 0.2126 * kirmizi + 0.7152 * yesil + 0.0722 * mavi;
}

export function kontrastOrani(onPlan: string, arkaPlan: string): number {
  const [acik, koyu] = [goreliParlaklik(onPlan), goreliParlaklik(arkaPlan)].sort((a, b) => b - a);
  return (acik + 0.05) / (koyu + 0.05);
}
