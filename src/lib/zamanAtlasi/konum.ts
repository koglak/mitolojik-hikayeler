import { koordinat } from './yil';

export const aralikKonumu = ({ bas, son }: { bas: number; son: number }) => `--bas:${koordinat(bas)};--son:${koordinat(son)}`;

export const yilKonumu = (yil: number) => `--konum:${koordinat(yil)}`;

export const gorunumKonumu = ({ bas, son }: { bas: number; son: number }) => `--g-bas:${koordinat(bas)};--g-son:${koordinat(son)}`;
