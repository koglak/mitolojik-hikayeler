export function aramaIcinSadelestir(metin: string): string {
  return metin
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/ı/g, 'i');
}
