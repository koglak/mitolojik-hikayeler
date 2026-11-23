import { ilerlemeOku, ilerlemeYaz, okunduIsaretle, yerelGun, ziyaretiKaydet } from '../lib/ilerleme';
import { enGorunurKart, sesHatasiSesiKapatir } from '../lib/kartSecimi';

function kartAkisiniBaslat(akis: HTMLElement): void {
  const kartlar = Array.from(akis.querySelectorAll<HTMLElement>('[data-kart]'));
  const anlatiKartlari = Array.from(akis.querySelectorAll<HTMLElement>('[data-anlati]'));
  const sonAnlatiKarti = kartlar.indexOf(anlatiKartlari[anlatiKartlari.length - 1]);
  const slug = akis.dataset.slug ?? '';
  const cubuk = document.querySelector<HTMLElement>('[data-ilerleme-cubugu]');
  const sesDugmesi = document.querySelector<HTMLButtonElement>('[data-ses-dugmesi]');
  const sesIkonu = document.querySelector<HTMLElement>('[data-ses-ikon]');
  const oynatici = new Audio();
  oynatici.preload = 'none';

  let aktifKart = 0;
  let sesAcik = false;

  function cubuguGuncelle(): void {
    if (cubuk) cubuk.style.width = `${((aktifKart + 1) / kartlar.length) * 100}%`;
  }

  function sesDurumunuGoster(): void {
    sesDugmesi?.setAttribute('aria-pressed', String(sesAcik));
    if (sesIkonu) sesIkonu.textContent = sesAcik ? '⏸' : '🔊';
  }

  function aktifKartinSesiniCal(): void {
    const yol = kartlar[aktifKart]?.dataset.ses;
    if (!sesAcik || !yol) {
      oynatici.pause();
      return;
    }
    if (oynatici.getAttribute('src') !== yol) {
      oynatici.src = yol;
    } else if (!oynatici.paused) {
      return;
    }
    oynatici.play().catch((hata: unknown) => {
      if (!sesHatasiSesiKapatir(hata)) return;
      sesAcik = false;
      sesDurumunuGoster();
    });
  }

  oynatici.addEventListener('ended', () => {
    const sonraki = kartlar[aktifKart + 1];
    if (sonraki?.dataset.ses) {
      sonraki.scrollIntoView({ behavior: 'smooth' });
    } else {
      sesAcik = false;
      sesDurumunuGoster();
    }
  });

  sesDugmesi?.addEventListener('click', () => {
    sesAcik = !sesAcik;
    sesDurumunuGoster();
    if (sesAcik) {
      aktifKartinSesiniCal();
    } else {
      oynatici.pause();
    }
  });

  const gorunurlukOranlari = kartlar.map(() => 0);

  const gozlemci = new IntersectionObserver(
    (girdiler) => {
      for (const girdi of girdiler) {
        const sira = kartlar.indexOf(girdi.target as HTMLElement);
        if (sira === -1) continue;
        const ekranYuksekligi = girdi.rootBounds?.height || akis.clientHeight || 1;
        gorunurlukOranlari[sira] = girdi.isIntersecting ? girdi.intersectionRect.height / ekranYuksekligi : 0;
      }
      const yeniKart = enGorunurKart(gorunurlukOranlari, aktifKart);
      if (yeniKart === aktifKart) return;
      kartlar[aktifKart]?.classList.remove('aktif');
      aktifKart = yeniKart;
      kartlar[aktifKart]?.classList.add('aktif');
      cubuguGuncelle();
      aktifKartinSesiniCal();
      if (slug && sonAnlatiKarti !== -1 && aktifKart >= sonAnlatiKarti) {
        ilerlemeYaz(okunduIsaretle(ilerlemeOku(), slug));
      }
    },
    { root: akis, threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
  );

  kartlar.forEach((kart) => gozlemci.observe(kart));
  cubuguGuncelle();
}

const akis = document.querySelector<HTMLElement>('[data-akis]');
if (akis) kartAkisiniBaslat(akis);

ilerlemeYaz(ziyaretiKaydet(ilerlemeOku(), yerelGun(new Date())));
