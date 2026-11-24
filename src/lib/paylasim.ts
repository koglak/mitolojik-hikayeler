export const instagramAdresi = 'https://www.instagram.com/';

export const xPaylasimAdresi = (adres: string, metin: string) =>
  `https://x.com/intent/post?text=${encodeURIComponent(metin)}&url=${encodeURIComponent(adres)}`;

export const facebookPaylasimAdresi = (adres: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(adres)}`;

export const whatsappPaylasimAdresi = (adres: string, metin: string) =>
  `https://wa.me/?text=${encodeURIComponent(`${metin} ${adres}`)}`;

export const pinterestPaylasimAdresi = (adres: string, metin: string, gorsel: string) =>
  `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(adres)}&media=${encodeURIComponent(gorsel)}&description=${encodeURIComponent(metin)}`;
