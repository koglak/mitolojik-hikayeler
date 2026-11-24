import { sanatSuz } from '../lib/sanatSorgu';

const galeri = document.querySelector<HTMLElement>('[data-sanat-galerisi]');

if (galeri) {
  const kutu = galeri.querySelector<HTMLInputElement>('[data-sanat-ara]');
  const muzeSecimi = galeri.querySelector<HTMLSelectElement>('[data-sanat-muze]');
  const turDugmeleri = Array.from(galeri.querySelectorAll<HTMLButtonElement>('[data-sanat-tur]'));
  const sonucSayisi = galeri.querySelector<HTMLElement>('[data-sonuc-sayisi]');
  const sonucYok = galeri.querySelector<HTMLElement>('[data-sonuc-yok]');
  const ogeler = Array.from(galeri.querySelectorAll<HTMLElement>('[data-sanat-ogesi]')).map((oge) => ({
    oge,
    aranan: oge.dataset.aranan ?? '',
    tur: oge.dataset.tur ?? '',
    muze: oge.dataset.muze ?? '',
    adres: oge.dataset.adres ?? '',
  }));
  let tur = '';

  const suz = () => {
    const secim = { aranan: kutu?.value ?? '', tur, muze: muzeSecimi?.value ?? '' };
    const eslesenler = sanatSuz(ogeler, secim);
    const eslesenKume = new Set(eslesenler);
    for (const kayit of ogeler) kayit.oge.classList.toggle('gizli', !eslesenKume.has(kayit));
    sonucYok?.classList.toggle('gizli', eslesenler.length > 0);
    if (sonucSayisi) sonucSayisi.textContent = `${eslesenler.length} eser`;
    document.dispatchEvent(new CustomEvent('sanat-suzuldu', { detail: { adresler: eslesenler.map(({ adres }) => adres) } }));
  };

  for (const dugme of turDugmeleri) {
    dugme.addEventListener('click', () => {
      tur = dugme.dataset.sanatTur ?? '';
      for (const diger of turDugmeleri) diger.setAttribute('aria-pressed', String(diger === dugme));
      suz();
    });
  }
  kutu?.addEventListener('input', suz);
  muzeSecimi?.addEventListener('change', suz);
  galeri.querySelector('[data-suzgeci-temizle]')?.addEventListener('click', () => {
    if (kutu) kutu.value = '';
    if (muzeSecimi) muzeSecimi.value = '';
    turDugmeleri.find((dugme) => dugme.dataset.sanatTur === '')?.click();
  });
  if (kutu?.value || muzeSecimi?.value) suz();
}
