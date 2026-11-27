const kok = document.querySelector<HTMLElement>('[data-kent-rehberi]');
if (kok) {
  const yapilar = [
    { id: 'agora', ad: 'Agora', tur: 'Kamusal alan', aciklama: 'Kent yaşamının kalbi olan agora; alışverişin yapıldığı, haberlerin paylaşıldığı ve yurttaşların buluştuğu açık meydandı. Çevresinde dükkânlar, stoalar ve kamusal yapılar bulunurdu.' },
    { id: 'tapinak', ad: 'Tapınak', tur: 'Kutsal alan', aciklama: 'Tapınak, kentin tanrı ya da tanrıçasına adanırdı. İç bölümde tanrı heykeli bulunabilir; kurban ve törenler çoğunlukla dışarıdaki sunak çevresinde yapılırdı.' },
    { id: 'tiyatro', ad: 'Tiyatro', tur: 'Gösteri yapısı', aciklama: 'Yamaçlara yaslanan tiyatrolarda oyunlar, müzikli gösteriler ve kimi zaman kent toplantıları düzenlenirdi. Yarım daire oturma sıraları sahne yapısına bakardı.' },
    { id: 'stoa', ad: 'Stoa', tur: 'Sütunlu galeri', aciklama: 'Stoa, bir ya da daha fazla cephesi sütunlarla açılan uzun, üstü örtülü bir galeriydi. İnsanlar burada dolaşır, dinlenir ve dükkânlarda alışveriş yapardı.' },
    { id: 'odeon', ad: 'Odeon', tur: 'Müzik yapısı', aciklama: 'Odeon, müzik ve şiir dinletileri gibi etkinlikler için kullanılan, genellikle tiyatrodan daha küçük ve üstü örtülü bir gösteri yapısıydı.' },
    { id: 'hamam', ad: 'Hamam', tur: 'Yıkanma ve buluşma', aciklama: 'Hamamlar yıkanma, dinlenme ve sosyalleşme yerleriydi. Roma döneminde sıcak, ılık ve soğuk odalardan oluşan büyük hamam kompleksleri yaygınlaştı.' },
    { id: 'stadion', ad: 'Stadion', tur: 'Spor alanı', aciklama: 'Stadionda koşu yarışları ve atletik karşılaşmalar yapılırdı. Ölçüsü ve biçimi kentten kente değişse de uzun, açık bir yarış alanıydı.' },
    { id: 'nekropol', ad: 'Nekropol', tur: 'Mezarlık alanı', aciklama: 'Nekropol, kentin dışında ya da giriş yolları boyunca uzanan mezarlık alanıydı. Mezar anıtları ölüleri anmanın yanı sıra ailelerin ve kentlilerin statüsünü de gösterirdi.' },
    { id: 'sur', ad: 'Kent suru', tur: 'Savunma', aciklama: 'Surlar kenti ve çevresindeki önemli alanları korurdu. Kapılar, kuleler ve duvarlar savunmanın yanı sıra kentin sınırını ve girişlerini de belirlerdi.' },
    { id: 'gymnasion', ad: 'Gymnasion', tur: 'Eğitim ve beden eğitimi', aciklama: 'Gymnasionda gençler beden eğitimi alır, yarışlara hazırlanırdı. Bazı kentlerde alan; ders, felsefi sohbet ve toplumsal buluşmalar için de kullanılırdı.' },
    { id: 'bouleuterion', ad: 'Bouleuterion', tur: 'Kent meclisi', aciklama: 'Bouleuterion, kentin meclisinin toplandığı kapalı yapıydı. Kentin kararları, görevlileri ve ortak işleri burada görüşülürdü.' },
    { id: 'nymphaion', ad: 'Nymphaion', tur: 'Anıtsal çeşme', aciklama: 'Nymphaion, çoğu kez su perilerine adanmış, suyu kentlilere sunan anıtsal çeşmeydi. Roma döneminde cepheleri heykeller ve nişlerle süslenen örnekleri yaygınlaştı.' },
    { id: 'cesme', ad: 'Çeşme', tur: 'Su noktası', aciklama: 'Kamusal çeşmeler, suyun kentlilerin kullanımına ulaştığı noktalardı. İnsanlar burada kaplarını doldurur, su taşır ve karşılaşırdı.' },
    { id: 'sarnic', ad: 'Sarnıç', tur: 'Su depolama', aciklama: 'Sarnıçlar yağmur suyunu ya da başka kaynaklardan getirilen suyu depolardı. Özellikle kurak mevsimlerde ve kuşatma zamanlarında önemliydi.' },
    { id: 'su-kemeri', ad: 'Su kemeri', tur: 'Su yolu', aciklama: 'Su kemerleri kaynaklardan gelen suyu vadiler ve engebeli araziler üzerinden kente taşımaya yardım ederdi. Her kentte bulunmaz; uzun mesafeli su hatları özellikle Roma döneminde yaygınlaştı.' },
    { id: 'dukkanlar', ad: 'Dükkânlar ve atölyeler', tur: 'Üretim ve ticaret', aciklama: 'Dükkânlarda yiyecek ve gündelik eşyalar satılır, atölyelerde seramik, metal eşya ve kumaş gibi ürünler yapılırdı. Bu birimler çoğu zaman ana sokaklara ve agoraya yakın sıralanırdı.' },
    { id: 'konutlar', ad: 'Konut mahalleleri', tur: 'Gündelik yaşam', aciklama: 'Konutlar kentin en geniş alanlarından birini kaplardı. Evlerin planı, büyüklüğü ve donanımı döneme, bölgeye ve hane halkının imkânlarına göre değişirdi.' },
    { id: 'liman', ad: 'Liman ve tersane', tur: 'Deniz ticareti', aciklama: 'Kıyı kentlerinin limanları yolcu ve yük taşımacılığını sağlardı. Tersanelerde gemiler yapılır ya da onarılırdı; bu yapılar yalnızca kıyı kentlerinde bulunurdu.' },
    { id: 'kapi', ad: 'Kent kapısı', tur: 'Giriş ve savunma', aciklama: 'Kent kapıları surların kontrollü geçiş noktalarıydı. Ana yollar çoğunlukla kapılardan içeri girer; kapılar ticaret, güvenlik ve törenler açısından önem taşırdı.' },
    { id: 'ana-yol', ad: 'Ana cadde', tur: 'Kent içi ulaşım', aciklama: 'Ana caddeler kapıları kamusal merkezlere ve mahallelere bağlardı. Bazı kentlerde taş döşeli, sütunlu ve dükkânlarla çevrili caddeler bulunurdu.' },
    { id: 'kutsal-alan', ad: 'Kutsal alan ve sunak', tur: 'Ritüel alanı', aciklama: 'Kutsal alanlar tek bir tapınaktan ibaret olmayabilirdi; sunaklar, adaklar ve tören yolları da bu alanın parçalarıydı. Kurban ve ortak ritüeller genellikle açık havadaki sunak çevresinde yapılırdı.' },
    { id: 'kutuphane', ad: 'Kütüphane', tur: 'Bilgi ve eğitim', aciklama: 'Bazı büyük kentlerdeki kütüphaneler yazma eserlerin saklandığı ve okunduğu yapılardı. Her antik kentte bulunmaz; çoğu görkemli örnek Helenistik ya da Roma döneminden kalmadır.' },
    { id: 'bazilika', ad: 'Bazilika', tur: 'Kamusal ve ticari yapı', aciklama: 'Roma kentlerinde bazilika; mahkeme, ticaret ve resmi işler için kullanılan büyük bir kamusal salondu. Yunan kentlerinin her döneminde aynı işleve sahip değildi.' },
    { id: 'latrina', ad: 'Latrina', tur: 'Kamusal tuvalet', aciklama: 'Roma döneminin bazı kentlerinde latrinalar, su kanallarıyla temizlenen ortak tuvaletlerdi. Her yerleşimde bulunmaz; gelişmiş su ve kanalizasyon altyapısıyla birlikte düşünülmelidir.' },
  ];
  const baslik = kok.querySelector<HTMLElement>('[data-ad]');
  const aciklama = kok.querySelector<HTMLElement>('[data-aciklama]');
  const tur = kok.querySelector<HTMLElement>('.bilgi-tur');
  function sec(id: string) {
    const yapi = yapilar.find((oge) => oge.id === id);
    if (!yapi || !baslik || !aciklama || !tur) return;
    baslik.textContent = yapi.ad;
    aciklama.textContent = yapi.aciklama;
    tur.textContent = yapi.tur.toLocaleUpperCase('tr');
    kok!.querySelectorAll('[data-yapi]').forEach((oge) => {
      const secili = oge.getAttribute('data-yapi') === id;
      oge.classList.toggle('secili', secili);
      if (oge instanceof HTMLButtonElement) oge.setAttribute('aria-pressed', String(secili));
    });
  }
  kok.querySelectorAll<HTMLElement>('[data-yapi]').forEach((oge) => {
    oge.addEventListener('click', () => sec(oge.dataset.yapi ?? ''));
    if (oge.tagName.toLowerCase() !== 'button') oge.addEventListener('keydown', (olay) => {
      if (olay.key === 'Enter' || olay.key === ' ') { olay.preventDefault(); sec(oge.dataset.yapi ?? ''); }
    });
  });
  sec('agora');
}
