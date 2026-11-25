import { aramaIcinSadelestir } from '../lib/aramaMetni';
import { sayfadakiler, sayfaNumaralari, sayfaSayisi, sayfayiSinirla } from '../lib/sayfalama';
import { sanatSuz } from '../lib/sanatSorgu';

const dizin = document.querySelector<HTMLElement>('[data-sayfali-dizin]');
const kutu = dizin?.querySelector<HTMLInputElement>('[data-kayit-ara]');
const sonucYok = dizin?.querySelector<HTMLElement>('[data-sonuc-yok]');
const durum = dizin?.querySelector<HTMLElement>('[data-dizin-durumu]');
const sayfalar = dizin?.querySelector<HTMLElement>('[data-dizin-sayfalari]');

if (dizin && kutu && sonucYok && durum && sayfalar) {
  const ogeler = [...dizin.querySelectorAll<HTMLElement>('[data-aranan]')];
  const sanatDizini = dizin.dataset.sayfaliDizin === 'sanat';
  const dugmeNiteligi = sanatDizini ? 'data-sanat-tur' : 'data-panteon-dugmesi';
  const dugmeler = [...dizin.querySelectorAll<HTMLButtonElement>(`[${dugmeNiteligi}]`)];
  const dugmeDegeri = (dugme: HTMLButtonElement) => dugme.getAttribute(dugmeNiteligi) ?? '';
  const suzgecAnahtari = sanatDizini ? 'tur' : 'panteon';
  const muzeSecimi = dizin.querySelector<HTMLSelectElement>('[data-sanat-muze]');
  const sonucSayisi = dizin.querySelector<HTMLElement>('[data-sonuc-sayisi]');
  const sanatEserleri = sanatDizini ? ogeler.map((oge) => ({
    oge,
    aranan: oge.dataset.aranan ?? '',
    tur: oge.dataset.tur ?? '',
    muze: oge.dataset.muze ?? '',
    adres: oge.dataset.adres ?? '',
  })) : [];
  const aramaMetni = dizin.dataset.sayfaliDizin === 'mitler'
    ? (metin: string) => metin.trim().toLocaleLowerCase('tr')
    : (metin: string) => aramaIcinSadelestir(metin.trim());
  let seciliSuzgec = '';
  let sayfa = 1;
  let sonHaritaSecimi: string | undefined;

  const sayfaAdresi = (numara: number) => {
    const adres = new URL(location.href);
    const aranan = kutu.value.trim();
    const parametreler = [
      ['ara', aranan],
      [suzgecAnahtari, seciliSuzgec],
      ['sayfa', numara > 1 ? String(numara) : ''],
    ];
    if (muzeSecimi) parametreler.push(['muze', muzeSecimi.value]);
    for (const [anahtar, deger] of parametreler) {
      if (deger) adres.searchParams.set(anahtar, deger);
      else adres.searchParams.delete(anahtar);
    }
    return adres;
  };

  const baglanti = (numara: number, metin: string, etiket: string) => {
    const oge = document.createElement('a');
    oge.href = sayfaAdresi(numara).href;
    oge.textContent = metin;
    oge.setAttribute('aria-label', etiket);
    oge.dataset.sayfa = String(numara);
    if (numara === sayfa) oge.setAttribute('aria-current', 'page');
    return oge;
  };

  const ciz = () => {
    const aranan = aramaMetni(kutu.value);
    const muze = muzeSecimi?.value ?? '';
    const eslesenEserler = sanatDizini ? sanatSuz(sanatEserleri, { aranan, tur: seciliSuzgec, muze }) : [];
    const eslesenler = sanatDizini
      ? eslesenEserler.map(({ oge }) => oge)
      : ogeler.filter((oge) =>
          (oge.dataset.aranan ?? '').includes(aranan) &&
          (!seciliSuzgec || oge.dataset.panteon === seciliSuzgec),
        );
    sayfa = sayfayiSinirla(sayfa, eslesenler.length);
    const sonSayfa = sayfaSayisi(eslesenler.length);
    const gorunenler = new Set(sayfadakiler(eslesenler, sayfa));
    for (const oge of ogeler) oge.classList.toggle('gizli', !gorunenler.has(oge));
    for (const dugme of dugmeler) {
      dugme.setAttribute('aria-pressed', String(dugmeDegeri(dugme) === seciliSuzgec));
    }

    sonucYok.classList.toggle('gizli', eslesenler.length > 0);
    if (sonucSayisi) sonucSayisi.textContent = `${eslesenler.length} eser`;
    durum.classList.toggle('gizli', sonSayfa === 1);
    sayfalar.classList.toggle('gizli', sonSayfa === 1);
    durum.textContent = `${eslesenler.length} ${sanatDizini ? 'eser' : 'kayıt'}, sayfa ${sayfa} / ${sonSayfa}`;

    if (sanatDizini) {
      const haritaSecimi = JSON.stringify([aranan, seciliSuzgec, muze]);
      if (haritaSecimi !== sonHaritaSecimi) {
        sonHaritaSecimi = haritaSecimi;
        document.dispatchEvent(new CustomEvent('sanat-suzuldu', {
          detail: { adresler: eslesenEserler.map(({ adres }) => adres) },
        }));
      }
    }

    const kontroller = sayfaNumaralari(sayfa, sonSayfa).map((numara) => {
      if (numara !== null) return baglanti(numara, String(numara), `${numara}. sayfa`);
      const bosluk = document.createElement('span');
      bosluk.textContent = '…';
      bosluk.setAttribute('aria-hidden', 'true');
      return bosluk;
    });
    if (sayfa > 1) kontroller.unshift(baglanti(sayfa - 1, '‹', 'Önceki sayfa'));
    if (sayfa < sonSayfa) kontroller.push(baglanti(sayfa + 1, '›', 'Sonraki sayfa'));
    sayfalar.replaceChildren(...kontroller);
  };

  const adrestenKur = () => {
    const sorgu = new URLSearchParams(location.search);
    kutu.value = sorgu.get('ara') ?? '';
    const suzgec = sorgu.get(suzgecAnahtari) ?? '';
    seciliSuzgec = dugmeler.some((dugme) => dugmeDegeri(dugme) === suzgec) ? suzgec : '';
    if (muzeSecimi) {
      muzeSecimi.value = sorgu.get('muze') ?? '';
      if (muzeSecimi.selectedIndex < 0) muzeSecimi.value = '';
    }
    const numara = Number(sorgu.get('sayfa'));
    sayfa = Number.isInteger(numara) && numara > 0 ? numara : 1;
    ciz();
  };

  const suzgeciGuncelle = (gecmiseEkle: boolean) => {
    sayfa = 1;
    ciz();
    const adres = sayfaAdresi(sayfa);
    if (gecmiseEkle) history.pushState(null, '', adres);
    else history.replaceState(history.state, '', adres);
  };

  kutu.addEventListener('input', () => suzgeciGuncelle(false));
  muzeSecimi?.addEventListener('change', () => suzgeciGuncelle(true));
  dizin.querySelector('[data-suzgeci-temizle]')?.addEventListener('click', () => {
    kutu.value = '';
    if (muzeSecimi) muzeSecimi.value = '';
    seciliSuzgec = '';
    suzgeciGuncelle(true);
  });
  for (const dugme of dugmeler) {
    dugme.addEventListener('click', () => {
      const suzgec = dugmeDegeri(dugme);
      if (suzgec === seciliSuzgec) return;
      seciliSuzgec = suzgec;
      suzgeciGuncelle(true);
    });
  }
  sayfalar.addEventListener('click', (olay) => {
    const hedef = (olay.target as Element).closest<HTMLAnchorElement>('a[data-sayfa]');
    if (!hedef || olay.metaKey || olay.ctrlKey || olay.shiftKey || olay.altKey) return;
    olay.preventDefault();
    const numara = Number(hedef.dataset.sayfa);
    if (numara === sayfa) return;
    sayfa = numara;
    ciz();
    history.pushState(null, '', sayfaAdresi(sayfa));
    durum.focus({ preventScroll: true });
    kutu.scrollIntoView({ block: 'start' });
  });
  window.addEventListener('popstate', adrestenKur);
  if (sanatDizini && document.readyState !== 'complete') {
    document.addEventListener('DOMContentLoaded', adrestenKur, { once: true });
  } else {
    adrestenKur();
  }
}
