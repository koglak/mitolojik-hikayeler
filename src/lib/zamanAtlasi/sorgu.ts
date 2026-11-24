import { aramaIcinSadelestir } from '../aramaMetni';
import { atlasBolgeAnahtarlari, atlasBolgeleri, type AtlasBolgesi } from './bolgeler';
import type { Katman } from './etiketler';
import type { AtlasVerisi, Hukumdar, Olay, Uygarlik } from './sema';
import { atlasBasi, atlasSonu, koordinat, yilKaydir } from './yil';

export type AtlasKaydi =
  | { tur: 'uygarlik'; bolge: AtlasBolgesi; kayit: Uygarlik; aramaMetni: string }
  | { tur: 'hukumdar'; bolge: AtlasBolgesi; kayit: Hukumdar; aramaMetni: string }
  | { tur: 'olay'; bolge: AtlasBolgesi; kayit: Olay; aramaMetni: string };

export interface Atlas {
  veri: AtlasVerisi;
  kayitlar: Map<string, AtlasKaydi>;
}

export interface Aralik {
  bas: number;
  son: number;
}

export interface Suzgec extends Aralik {
  arama: string;
  bolge: AtlasBolgesi | 'tum';
  katmanlar: ReadonlySet<Katman>;
}

export interface Gorunum {
  satirlar: Set<string>;
  isaretler: Set<string>;
  kartlar: Set<string>;
  bolgeler: Map<AtlasBolgesi, number>;
  toplam: number;
}

export interface YilKesiti {
  yil: number;
  uygarliklar: Uygarlik[];
  hukumdarlar: Hukumdar[];
  olaylar: Olay[];
}

export function kayitlariDizinle(veri: AtlasVerisi): Atlas {
  const uygarliklar = new Map(veri.uygarliklar.map((u) => [u.kimlik, u]));
  const metin = (...parcalar: (string | undefined)[]) => aramaIcinSadelestir(parcalar.filter(Boolean).join(' '));
  const kayitlar = new Map<string, AtlasKaydi>();
  for (const kayit of veri.uygarliklar) {
    const { bolge } = kayit;
    kayitlar.set(kayit.kimlik, { tur: 'uygarlik', bolge, kayit, aramaMetni: metin(kayit.ad, kayit.yer, atlasBolgeleri[bolge].ad) });
  }
  for (const kayit of veri.hukumdarlar) {
    const uygarlik = uygarliklar.get(kayit.uygarlik)!;
    const { bolge } = uygarlik;
    kayitlar.set(kayit.kimlik, { tur: 'hukumdar', bolge, kayit, aramaMetni: metin(kayit.ad, uygarlik.ad, atlasBolgeleri[bolge].ad) });
  }
  for (const kayit of veri.olaylar) {
    const uygarlik = uygarliklar.get(kayit.uygarlik)!;
    const { bolge } = uygarlik;
    kayitlar.set(kayit.kimlik, { tur: 'olay', bolge, kayit, aramaMetni: metin(kayit.ad, kayit.yer, uygarlik.ad, atlasBolgeleri[bolge].ad) });
  }
  return { veri, kayitlar };
}

const kesisir = (donemler: Aralik[], bas: number, son: number) => donemler.some((d) => d.bas <= son && bas <= d.son);

export function yilKesiti({ veri }: Atlas, yil: number): YilKesiti {
  const oYil = ({ donemler }: { donemler: Aralik[] }) => kesisir(donemler, yil, yil);
  return {
    yil,
    uygarliklar: veri.uygarliklar.filter(oYil),
    hukumdarlar: veri.hukumdarlar.filter(oYil),
    olaylar: veri.olaylar.filter(oYil),
  };
}

export function bolgeBosluklari({ veri }: Atlas, bolge: AtlasBolgesi): Aralik[] {
  const donemler = veri.uygarliklar
    .filter((u) => u.bolge === bolge)
    .flatMap((u) => u.donemler)
    .sort((a, b) => a.bas - b.bas);
  const bosluklar: Aralik[] = [];
  let siradaki = atlasBasi;
  let bitti = false;
  for (const { bas, son } of donemler) {
    if (bas > siradaki) bosluklar.push({ bas: siradaki, son: yilKaydir(bas, -1) });
    if (son >= atlasSonu) bitti = true;
    else if (son >= siradaki) siradaki = yilKaydir(son, 1);
    if (bitti) break;
  }
  if (!bitti) bosluklar.push({ bas: siradaki, son: atlasSonu });
  return bosluklar;
}

function yilaUzaklik({ bas, son }: Aralik, yil: number): number {
  if (yil < bas) return koordinat(bas) - koordinat(yil);
  if (yil > son) return koordinat(yil) - koordinat(son);
  return 0;
}

export function yakinOlaylar({ veri }: Atlas, kimlikler: ReadonlySet<string>, yil: number, adet: number): string[] {
  return veri.olaylar
    .filter(({ kimlik }) => kimlikler.has(kimlik))
    .map(({ kimlik, donemler: [donem] }) => ({ kimlik, bas: donem.bas, uzaklik: yilaUzaklik(donem, yil) }))
    .sort((a, b) => a.uzaklik - b.uzaklik || a.bas - b.bas)
    .slice(0, adet)
    .sort((a, b) => a.bas - b.bas)
    .map(({ kimlik }) => kimlik);
}

function katmanda({ tur, kayit }: AtlasKaydi, katmanlar: ReadonlySet<Katman>): boolean {
  if (tur === 'uygarlik') return katmanlar.has('uygarliklar');
  if (kayit.nitelik === 'mitolojik') return katmanlar.has('mitolojik');
  return katmanlar.has(tur === 'hukumdar' ? 'hukumdarlar' : kayit.nitelik);
}

export function gorunum(atlas: Atlas, { arama, bolge, katmanlar, bas, son }: Suzgec): Gorunum {
  const aranan = aramaIcinSadelestir(arama.trim());
  const eslesenler = new Map<string, AtlasKaydi>();
  for (const [kimlik, oge] of atlas.kayitlar) {
    const uygun =
      (bolge === 'tum' || oge.bolge === bolge) &&
      katmanda(oge, katmanlar) &&
      kesisir(oge.kayit.donemler, bas, son) &&
      oge.aramaMetni.includes(aranan);
    if (uygun) eslesenler.set(kimlik, oge);
  }

  const satirlar = new Set<string>();
  const isaretler = new Set<string>();
  const kartlar = new Set<string>();
  const sayilar = new Map<AtlasBolgesi, number>();
  const uygarliklarAcik = katmanlar.has('uygarliklar');

  for (const [kimlik, { tur, bolge: ogeBolgesi, kayit }] of eslesenler) {
    sayilar.set(ogeBolgesi, (sayilar.get(ogeBolgesi) ?? 0) + 1);
    if (tur === 'uygarlik') {
      satirlar.add(kimlik);
      continue;
    }
    const uygarlikGorunur = uygarliklarAcik && kesisir(atlas.kayitlar.get(kayit.uygarlik)!.kayit.donemler, bas, son);
    if (uygarlikGorunur) satirlar.add(kayit.uygarlik);
    if (tur === 'hukumdar') {
      satirlar.add(kimlik);
      continue;
    }
    kartlar.add(kimlik);
    if (uygarlikGorunur) isaretler.add(kimlik);
    if (aranan || !uygarlikGorunur) satirlar.add(kimlik);
  }

  const bolgeler = new Map(
    atlasBolgeAnahtarlari.filter((anahtar) => sayilar.has(anahtar)).map((anahtar) => [anahtar, sayilar.get(anahtar)!]),
  );
  return { satirlar, isaretler, kartlar, bolgeler, toplam: eslesenler.size };
}
