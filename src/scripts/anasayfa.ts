import { ilerlemeOku, ilerlemeYaz, yerelGun, ziyaretiKaydet } from '../lib/ilerleme';

ilerlemeYaz(ziyaretiKaydet(ilerlemeOku(), yerelGun(new Date())));
