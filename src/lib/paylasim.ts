export const instagramAdresi = 'https://www.instagram.com/';

export const xPaylasimAdresi = (adres: string, metin: string) =>
  `https://x.com/intent/post?text=${encodeURIComponent(metin)}&url=${encodeURIComponent(adres)}`;

export const facebookPaylasimAdresi = (adres: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(adres)}`;
