import { aramaIcinSadelestir } from './aramaMetni';
import type { BolumAnahtari } from './bolumler';
import type { Muze } from './sanatSemasi';

interface SuzulenOge {
  aranan: string;
  tur: string;
  muze: string;
}

interface BaglantiliEser {
  id: string;
  data: {
    muze: string;
    ilgiliMitler: string[];
    ilgiliTanrilar: string[];
    ilgiliKahramanlar: string[];
    ilgiliKentler: string[];
  };
}

export type BaglantiAlani = BolumAnahtari | 'mitler';

export const baglantiAlanlari = {
  mitler: 'ilgiliMitler',
  tanrilar: 'ilgiliTanrilar',
  kahramanlar: 'ilgiliKahramanlar',
  kentler: 'ilgiliKentler',
} as const satisfies Record<BaglantiAlani, keyof BaglantiliEser['data']>;

export function sanatSuz<T extends SuzulenOge>(ogeler: T[], secim: SuzulenOge): T[] {
  const aranan = aramaIcinSadelestir(secim.aranan.trim());
  return ogeler.filter(
    (oge) =>
      (!secim.tur || oge.tur === secim.tur) &&
      (!secim.muze || oge.muze === secim.muze) &&
      aramaIcinSadelestir(oge.aranan).includes(aranan),
  );
}

export function muzelereGrupla<T extends BaglantiliEser>(eserler: T[], muzeler: Record<string, Muze>) {
  return Object.entries(muzeler)
    .map(([kimlik, muze]) => ({ kimlik, muze, eserler: eserler.filter((eser) => eser.data.muze === kimlik) }))
    .filter((grup) => grup.eserler.length > 0);
}

export const ilgiliEserler = <T extends BaglantiliEser>(eserler: T[], alan: BaglantiAlani, kimlik: string) =>
  eserler.filter((eser) => eser.data[baglantiAlanlari[alan]].includes(kimlik));
