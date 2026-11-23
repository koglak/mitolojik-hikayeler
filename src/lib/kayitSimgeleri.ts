import type { BolumAnahtari } from './bolumler';
import { kahramanSimgesi } from './kahramanSimgeleri';
import { tanriSimgesi } from './tanriSimgeleri';

const bolumSimgeleri: Partial<Record<BolumAnahtari, (slug: string) => string | undefined>> = {
  tanrilar: tanriSimgesi,
  kahramanlar: kahramanSimgesi,
};

export const kayitSimgesi = (bolum: BolumAnahtari, slug: string) => bolumSimgeleri[bolum]?.(slug);
