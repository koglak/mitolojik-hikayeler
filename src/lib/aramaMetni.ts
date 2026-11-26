export function aramaIcinSadelestir(metin: string): string {
  return metin
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/ı/g, 'i');
}

export const aramaEsAnlamlari: Record<string, string[]> = {
  afrodit: ['Afrodit', 'Aphrodite', 'Afrodite', 'Venüs', 'Venus', 'Venere'],
};
