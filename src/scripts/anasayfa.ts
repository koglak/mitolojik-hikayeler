import { ilerlemeOku, ilerlemeYaz, yerelGun, ziyaretiKaydet } from '../lib/ilerleme';

ilerlemeYaz(ziyaretiKaydet(ilerlemeOku(), yerelGun(new Date())));

for (const liste of document.querySelectorAll('[data-rastgele-secim]')) {
  const adaylar = Array.from(liste.children).flatMap((oge) =>
    oge instanceof HTMLTemplateElement ? Array.from(oge.content.children) : [oge],
  );
  const adet = Math.min(5, adaylar.length);

  for (let sira = 0; sira < adet; sira++) {
    const secilen = sira + Math.floor(Math.random() * (adaylar.length - sira));
    [adaylar[sira], adaylar[secilen]] = [adaylar[secilen], adaylar[sira]];
  }

  liste.replaceChildren(...adaylar.slice(0, adet));
}

const manset = document.querySelector('[data-manset]');
const slaytlar = manset?.querySelector<HTMLElement>('[data-rastgele-secim]');
const kontroller = manset?.querySelector<HTMLElement>('[data-manset-kontrolleri]');
const durum = manset?.querySelector('[data-manset-durum]');

if (slaytlar && kontroller && durum && slaytlar.children.length > 1) {
  const toplam = slaytlar.children.length;
  const etkinSira = () => Math.max(0, Math.min(toplam - 1, Math.round(slaytlar.scrollLeft / slaytlar.clientWidth)));
  const durumuGuncelle = () => {
    const metin = `${etkinSira() + 1} / ${toplam}`;
    if (durum.textContent !== metin) durum.textContent = metin;
  };

  kontroller.hidden = false;
  durumuGuncelle();
  slaytlar.addEventListener('scroll', durumuGuncelle, { passive: true });
  for (const dugme of kontroller.querySelectorAll<HTMLButtonElement>('[data-manset-adim]')) {
    dugme.addEventListener('click', () => {
      const hedef = (etkinSira() + Number(dugme.dataset.mansetAdim) + toplam) % toplam;
      slaytlar.scrollTo({ left: hedef * slaytlar.clientWidth });
    });
  }
}
