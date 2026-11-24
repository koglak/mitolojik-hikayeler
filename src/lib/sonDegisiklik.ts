import { execFileSync } from 'node:child_process';

export function enSonTarih(tarihler: (Date | undefined)[]): Date | undefined {
  const gecerliler = tarihler.filter((tarih): tarih is Date => tarih !== undefined);
  return gecerliler.length ? new Date(Math.max(...gecerliler.map((tarih) => tarih.getTime()))) : undefined;
}

export function gunlukTarihleri(gunluk: string): Map<string, Date> {
  const tarihler = new Map<string, Date>();
  let kayitTarihi: Date | undefined;
  for (const satir of gunluk.split('\n')) {
    if (satir.startsWith('>')) {
      kayitTarihi = new Date(satir.slice(1));
    } else if (satir && kayitTarihi) {
      tarihler.set(satir, enSonTarih([tarihler.get(satir), kayitTarihi])!);
    }
  }
  return tarihler;
}

const git = (...secenekler: string[]) =>
  execFileSync('git', secenekler, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });

export function dosyaTarihleri(): Map<string, Date> {
  try {
    if (git('rev-parse', '--is-shallow-repository').trim() === 'true') return new Map();
    return gunlukTarihleri(
      git('-c', 'core.quotepath=off', 'log', '--format=>%cI', '--name-only', '--', 'src/content', 'src/data'),
    );
  } catch {
    return new Map();
  }
}
