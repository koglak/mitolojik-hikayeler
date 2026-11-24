import { atlasSemasi } from './sema';
import { kayitlariDizinle } from './sorgu';
import { hamAtlasVerisi } from './veri';

export const atlas = kayitlariDizinle(atlasSemasi.parse(hamAtlasVerisi));
