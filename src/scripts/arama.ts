type AramaKaydi = {
  baslik: string;
  ozet: string;
  bolum: string;
  adres: string;
};

let aramaVerisiYuklemesi: Promise<AramaKaydi[]> | null = null;

function aramaVerisiniYukle(): Promise<AramaKaydi[]> {
  aramaVerisiYuklemesi ??= fetch('/arama.json')
    .then((yanit) => (yanit.ok ? yanit.json() : []))
    .catch(() => {
      aramaVerisiYuklemesi = null;
      return [];
    });
  return aramaVerisiYuklemesi;
}

function sonucOgesi(kayit: AramaKaydi): HTMLAnchorElement {
  const baglanti = document.createElement('a');
  baglanti.className = 'sonuc';
  baglanti.href = kayit.adres;
  const baslik = document.createElement('strong');
  baslik.textContent = kayit.baslik;
  const bilgi = document.createElement('small');
  bilgi.textContent = kayit.bolum;
  baglanti.append(baslik, bilgi);
  return baglanti;
}

function aramayiBagla(): void {
  const perde = document.querySelector<HTMLElement>('[data-arama-perdesi]');
  const kutu = document.querySelector<HTMLInputElement>('[data-arama-kutusu]');
  const sonuclar = document.querySelector<HTMLElement>('[data-arama-sonuclari]');
  const acmaDugmesi = document.querySelector<HTMLButtonElement>('[data-arama-ac]');
  if (!perde || !kutu || !sonuclar || !acmaDugmesi) return;

  async function listele(): Promise<void> {
    const kayitlar = await aramaVerisiniYukle();
    const aranan = kutu!.value.trim().toLocaleLowerCase('tr');
    const bulunanlar = kayitlar.filter((kayit) =>
      [kayit.baslik, kayit.ozet, kayit.bolum].join(' ').toLocaleLowerCase('tr').includes(aranan),
    );
    if (bulunanlar.length === 0) {
      const bos = document.createElement('p');
      bos.className = 'bos';
      bos.textContent = 'Bu aramayla eşleşen bir şey bulunamadı.';
      sonuclar!.replaceChildren(bos);
      return;
    }
    sonuclar!.replaceChildren(...bulunanlar.map(sonucOgesi));
  }

  function kapat(): void {
    perde!.classList.remove('acik');
    document.body.style.overflow = '';
    acmaDugmesi!.focus();
  }

  acmaDugmesi.addEventListener('click', () => {
    perde.classList.add('acik');
    document.body.style.overflow = 'hidden';
    kutu.value = '';
    void listele();
    kutu.focus();
  });
  kutu.addEventListener('input', () => void listele());
  perde.querySelector('[data-arama-kapat]')?.addEventListener('click', kapat);
  perde.addEventListener('click', (olay) => {
    if (olay.target === perde) kapat();
  });
  document.addEventListener('keydown', (olay) => {
    if (olay.key === 'Escape' && perde.classList.contains('acik')) kapat();
  });
}

aramayiBagla();
