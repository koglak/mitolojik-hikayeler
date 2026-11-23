export type Ilerleme = {
  okunanlar: string[];
  sonGun: string | null;
  seri: number;
};

const DEPO_ANAHTARI = 'mitolojik-hikayeler:ilerleme';
const GUN_MS = 86_400_000;

function varsayilanIlerleme(): Ilerleme {
  return { okunanlar: [], sonGun: null, seri: 0 };
}

function ikiHane(sayi: number): string {
  return String(sayi).padStart(2, '0');
}

export function yerelGun(tarih: Date): string {
  return `${tarih.getFullYear()}-${ikiHane(tarih.getMonth() + 1)}-${ikiHane(tarih.getDate())}`;
}

function gunNumarasi(gun: string): number {
  const [yil, ay, gunSayisi] = gun.split('-').map(Number);
  return Math.round(Date.UTC(yil, ay - 1, gunSayisi) / GUN_MS);
}

export function seriHesapla(sonGun: string | null, seri: number, bugun: string): number {
  if (sonGun === null) return 1;
  const fark = gunNumarasi(bugun) - gunNumarasi(sonGun);
  if (fark === 0) return Math.max(seri, 1);
  if (fark === 1) return seri + 1;
  return 1;
}

export function gununMitosu<T>(mitler: T[], tarih: Date): T {
  const sira = gunNumarasi(yerelGun(tarih)) % mitler.length;
  return mitler[sira];
}

function varsayilanDepo(): Storage | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function ilerlemeOku(depo: Storage | null = varsayilanDepo()): Ilerleme {
  const ilerleme = varsayilanIlerleme();
  if (!depo) return ilerleme;
  try {
    const ham = depo.getItem(DEPO_ANAHTARI);
    if (!ham) return ilerleme;
    const okunan = JSON.parse(ham);
    if (Array.isArray(okunan.okunanlar)) ilerleme.okunanlar = okunan.okunanlar.filter((s: unknown) => typeof s === 'string');
    if (typeof okunan.sonGun === 'string') ilerleme.sonGun = okunan.sonGun;
    if (typeof okunan.seri === 'number') ilerleme.seri = okunan.seri;
    return ilerleme;
  } catch {
    return varsayilanIlerleme();
  }
}

export function ilerlemeYaz(ilerleme: Ilerleme, depo: Storage | null = varsayilanDepo()): void {
  if (!depo) return;
  try {
    depo.setItem(DEPO_ANAHTARI, JSON.stringify(ilerleme));
  } catch {
    return;
  }
}

export function ziyaretiKaydet(ilerleme: Ilerleme, bugun: string): Ilerleme {
  return { ...ilerleme, sonGun: bugun, seri: seriHesapla(ilerleme.sonGun, ilerleme.seri, bugun) };
}

export function okunduIsaretle(ilerleme: Ilerleme, slug: string): Ilerleme {
  if (ilerleme.okunanlar.includes(slug)) return ilerleme;
  return { ...ilerleme, okunanlar: [...ilerleme.okunanlar, slug] };
}
