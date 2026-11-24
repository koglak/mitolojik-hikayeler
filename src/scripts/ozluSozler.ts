const gecisSuresi = 15000;

const kap = document.querySelector<HTMLElement>('[data-ozlu-sozler]');
const dugme = kap?.querySelector<HTMLButtonElement>('[data-soz-dugmesi]');

if (kap && dugme) {
  const sozler = [...kap.querySelectorAll<HTMLElement>('[data-soz]')];
  let etkin = 0;
  let zamanlayici: number | undefined;
  let durduruldu = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ustunde = false;

  const sonrakineGec = () => {
    sozler[etkin].classList.remove('etkin');
    etkin = (etkin + 1) % sozler.length;
    sozler[etkin].classList.add('etkin');
  };

  const guncelle = () => {
    window.clearInterval(zamanlayici);
    if (!durduruldu && !ustunde && !document.hidden) {
      zamanlayici = window.setInterval(sonrakineGec, gecisSuresi);
    }
    dugme.textContent = durduruldu ? 'Sözleri oynat' : 'Sözleri duraklat';
  };

  dugme.addEventListener('click', () => {
    durduruldu = !durduruldu;
    guncelle();
  });
  const sahne = kap.querySelector<HTMLElement>('[data-soz-sahnesi]');
  sahne?.addEventListener('pointerenter', (olay) => {
    if (olay.pointerType !== 'mouse') return;
    ustunde = true;
    guncelle();
  });
  sahne?.addEventListener('pointerleave', () => {
    ustunde = false;
    guncelle();
  });
  document.addEventListener('visibilitychange', guncelle);

  dugme.hidden = false;
  guncelle();
}
