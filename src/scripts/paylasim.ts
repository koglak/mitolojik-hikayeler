const baglanti = document.querySelector<HTMLAnchorElement>('[data-instagram-paylas]');
const durum = document.querySelector<HTMLElement>('[data-paylasim-durumu]');
const kopyalandi = document.querySelector<HTMLElement>('[data-paylasim-kopyalandi]');
const kopyalanamadi = document.querySelector<HTMLElement>('[data-paylasim-kopyalanamadi]');

const dokunmatikMi = () => window.matchMedia('(pointer: coarse)').matches;

function sonucuGoster(basarili: boolean): void {
  if (durum) durum.hidden = false;
  if (kopyalandi) kopyalandi.hidden = !basarili;
  if (kopyalanamadi) kopyalanamadi.hidden = basarili;
}

async function adresiKopyala(adres: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(adres);
    sonucuGoster(true);
  } catch {
    sonucuGoster(false);
  }
}

async function paylas(adres: string, baslik: string): Promise<void> {
  if (!dokunmatikMi() || !navigator.share) {
    await adresiKopyala(adres);
    return;
  }
  try {
    await navigator.share({ title: baslik, url: adres });
  } catch (hata) {
    if (hata instanceof DOMException && hata.name === 'AbortError') return;
    await adresiKopyala(adres);
  }
}

baglanti?.addEventListener('click', (olay) => {
  olay.preventDefault();
  void paylas(baglanti.dataset.adres ?? location.href, baglanti.dataset.baslik ?? document.title);
});
