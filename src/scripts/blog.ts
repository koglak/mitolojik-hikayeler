import { adresiCoz, adresiYaz, sayfadakiler, sayfaNumaralari, sayfaSayisi, sayfayiSinirla, yazilariSuz } from '../lib/blogSorgu';

const liste = document.querySelector<HTMLElement>('[data-blog-listesi]');
const kutu = document.querySelector<HTMLInputElement>('[data-blog-ara]');
const sonuc = document.querySelector<HTMLElement>('[data-blog-sonucu]');
const sonucYok = document.querySelector<HTMLElement>('[data-blog-sonuc-yok]');
const sayfalar = document.querySelector<HTMLElement>('[data-blog-sayfalari]');

if (liste && kutu && sonuc && sonucYok && sayfalar) {
  const yazilar = Array.from(liste.querySelectorAll<HTMLElement>('[data-aranan]')).map((oge) => ({
    oge,
    aranan: oge.dataset.aranan ?? '',
  }));
  let durum = adresiCoz(location.search);

  const sayfaBaglantisi = (sayfa: number, metin: string, etiket: string) => {
    const baglanti = document.createElement('a');
    baglanti.href = adresiYaz({ ...durum, sayfa });
    baglanti.textContent = metin;
    baglanti.setAttribute('aria-label', etiket);
    baglanti.dataset.sayfa = String(sayfa);
    return baglanti;
  };

  const sayfaOgesi = (numara: number | null) => {
    if (numara === null) {
      const bosluk = document.createElement('span');
      bosluk.textContent = '…';
      bosluk.setAttribute('aria-hidden', 'true');
      return bosluk;
    }
    const baglanti = sayfaBaglantisi(numara, String(numara), `${numara}. sayfa`);
    if (numara === durum.sayfa) baglanti.setAttribute('aria-current', 'page');
    return baglanti;
  };

  const sayfalariCiz = (sonSayfa: number) => {
    sayfalar.classList.toggle('gizli', sonSayfa === 1);
    const ogeler = sayfaNumaralari(durum.sayfa, sonSayfa).map(sayfaOgesi);
    if (durum.sayfa > 1) ogeler.unshift(sayfaBaglantisi(durum.sayfa - 1, '‹', 'Önceki sayfa'));
    if (durum.sayfa < sonSayfa) ogeler.push(sayfaBaglantisi(durum.sayfa + 1, '›', 'Sonraki sayfa'));
    sayfalar.replaceChildren(...ogeler);
  };

  const ciz = () => {
    const eslesenler = yazilariSuz(yazilar, durum.aranan);
    durum = { ...durum, sayfa: sayfayiSinirla(durum.sayfa, eslesenler.length) };
    const sonSayfa = sayfaSayisi(eslesenler.length);
    const gorunenler = new Set(sayfadakiler(eslesenler, durum.sayfa));
    for (const yazi of yazilar) yazi.oge.classList.toggle('gizli', !gorunenler.has(yazi));
    sonuc.textContent =
      sonSayfa > 1 ? `${eslesenler.length} yazı, sayfa ${durum.sayfa} / ${sonSayfa}` : `${eslesenler.length} yazı`;
    sonucYok.classList.toggle('gizli', eslesenler.length > 0);
    sayfalariCiz(sonSayfa);
  };

  const ara = (aranan: string) => {
    durum = { aranan, sayfa: 1 };
    ciz();
    history.replaceState(history.state, '', adresiYaz(durum));
  };

  const adrestenKur = () => {
    durum = adresiCoz(location.search);
    kutu.value = durum.aranan;
    ciz();
  };

  kutu.addEventListener('input', () => ara(kutu.value));
  sonucYok.querySelector('button')?.addEventListener('click', () => {
    kutu.value = '';
    ara('');
    kutu.focus();
  });
  sayfalar.addEventListener('click', (olay) => {
    const baglanti = (olay.target as Element).closest<HTMLAnchorElement>('a[data-sayfa]');
    if (!baglanti || olay.metaKey || olay.ctrlKey || olay.shiftKey || olay.altKey) return;
    olay.preventDefault();
    const sayfa = Number(baglanti.dataset.sayfa);
    if (sayfa === durum.sayfa) return;
    durum = { ...durum, sayfa };
    history.pushState(null, '', adresiYaz(durum));
    ciz();
    sonuc.focus({ preventScroll: true });
    sonuc.scrollIntoView({ block: 'start' });
  });
  window.addEventListener('popstate', adrestenKur);
  adrestenKur();
}
