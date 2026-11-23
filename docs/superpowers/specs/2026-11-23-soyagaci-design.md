# Soyağacı — Tasarım

Tarih: 2026-11-23

## Amaç ve neden

Kullanıcı tanrıları ve kahramanları bir arada gösteren, kapsamlı bir soyağacı istiyor. Sitedeki kayıtlar tek tek okunuyor ama kimin kimin nesi olduğu yalnızca künyedeki serbest metinde ("Anne-baba: Zeus ve Alkmene") duruyor. Soyağacı bu dağınık bilgiyi tek bir görsel haritada birleştirir: okur Khaos'tan Truva kuşağına kadar soyu gezebilir, bir kayıt sayfasından gelip o kişinin yerini görebilir.

Kullanıcı okurun tam olarak ne yapacağına dair kararı Claude'a bıraktı. Aşağıdaki "okur deneyimi" Claude'un kararıdır.

## Hedefler

- Ayrı bir `/soyagaci` sayfası: tanrılar, titanlar, ilkel varlıklar ve kahramanlar tek ağaçta, kuşaklar yukarıdan aşağı.
- Sitede kaydı olmayan figürler de ağaçta yer alır (Gaia, Uranos, Alkmene…). Sayfaları yoksa düğümleri bağlantısızdır.
- Ağaç kaydırılıp yakınlaştırılabilir. Bir kişiye tıklanınca o kişi **odaklanır**: ataları, torunları ve eşleri vurgulanır, geri kalan soluklaşır. Yanda veya altta küçük bir bilgi paneli açılır (ad, ebeveynler, eşler, çocuklar, varsa alternatif anlatılar ve kaynakları, varsa kayıt sayfasına bağlantı).
- Ağaç içinde isimle arama: yazınca kişi bulunur ve odaklanır.
- Her tanrı ve kahraman kayıt sayfasında, kişi ağaçta varsa "Soyağacında gör" bağlantısı. Bağlantı ağacı o kişiye odaklı açar (`/soyagaci?kisi=<kimlik>` ya da `#<kimlik>`, adres biçimi yapımcıya kalmış).
- Site başlığındaki menüye "Soyağacı" bağlantısı.

## Hedef olmayanlar

- Kayıt sayfalarında gömülü mini ağaç (sonra eklenebilir, veri bunu destekleyecek biçimde kurulur).
- Ağacın içinden veri düzenleme.
- Yunan dışı mitolojiler. Roma karşılıkları ağaçta ayrı düğüm olmaz.
- Künyedeki (`bilgiler`) serbest metnin otomatik güncellenmesi. Künye olduğu gibi kalır.

## Kaçınılacaklar (çalışsa bile başarısızlık sayılır)

- **Uydurma ya da kaynaksız akrabalık.** Her ilişki antik bir kaynağa dayanmalı. Emin olunamayan ilişki çizilmez.
- Çelişkili anlatıları sessizce tek birine indirmek. Ana anlatı çizilir, diğerleri kaynağıyla birlikte panelde not olarak görünür.
- Telefonda kullanılamaz bir ağaç: 360px ekranda okunamayan yazılar, takılan kaydırma, saniyeler süren açılış.
- Kesişen çizgilerden oluşan, kuşak düzeni okunamayan bir yumak.

## Kısıtlar

- Site tamamen statik (Astro `output: 'static'`, Azure Static Web Apps ücretsiz katmanı). Sunucu kodu yok.
- Önce mobil, 360px'ten başlayan tasarım. Mevcut tema (`src/styles/tema.css` değişkenleri, açık/koyu) kullanılır.
- Arayüz Türkçe, adresler ve kimlikler ASCII.
- İsimler sitedeki yazımla aynı olmalı (Akhilleus, Hephaistos, Athena; Türkçeleşmiş "Aşil" değil). Kaydı olan kişide ad kayıttaki `ad` alanından gelir.
- Kod içinde yorum satırı yok (kullanıcının genel kuralı).

## Yaklaşımlar

| Yaklaşım | Artısı | Eksisi |
|---|---|---|
| **A) Tek büyük soyağacı sayfası, kişiye odaklanabilen (seçildi)** | "Kapsamlı" isteğini karşılar; her kayıttan bağlantıyla bağlanır | En büyük veri işi; yerleşim kütüphanesi gerekir |
| B) Yalnızca kayıt sayfalarında küçük ağaç | Basit, veri az | Bütün soy görülemez, kapsamlı değil |
| C) Serbest ağ grafiği | Gösterişli | Kuşak düzeni kaybolur, soyağacı okunamaz |

Kullanıcı A'yı seçti.

## Nasıl yapılacak

### Veri modeli

Soyağacı tek bir veri dosyasında durur (ör. `src/data/soyagaci.json`) ve zod şemasıyla doğrulanır. Kayıt dosyalarına (`src/content/tanrilar`, `kahramanlar`) yeni alan eklenmez; ağaçla kayıtlar `kayit` alanıyla eşleşir.

- **kisiler**: `kimlik` (ASCII, kaydı olan kişide kayıt kimliğiyle aynı), `ad`, `tur` (`ilkel`, `titan`, `olimposlu`, `tanri`, `olumlu`, `canavar`; renk/simge için), isteğe bağlı `grup: true`, isteğe bağlı `kayit` (`{ bolum: 'tanrilar' | 'kahramanlar', kimlik }`), isteğe bağlı `wikidata` (Q kimliği), isteğe bağlı `not` (panelde gösterilecek kısa açıklama).
  - `canavar` türü yarı-insan ve canavarları kapsar: satirler (Marsyas), kentaurlar, Medusa, Minotauros, Ekhidna'nın çocukları. *(Claude'un kararı)*
  - Kalabalık topluluklar tek bir **grup düğümü** olur: Okeanidler, Nereidler, Kentaurlar, Kykloplar, Hekatonkheirler gibi. Tek tek üyeleri yalnızca sitede kaydı olan ya da soyu birbirine bağlayan kişilerse ayrı düğüm olur (ör. Metis bir Okeanid ama ayrı düğüm). *(Claude'un kararı)*
  - **İki kişiyi anlatan kayıtlar** (`kastor-ve-polydeukes`, `hero-ve-leandros`, `philemon-ve-baukis`) ağaçta iki ayrı kişidir. İkisi de aynı kayda `kayit` ile bağlanır. Bu kişilerin `kimlik`i kayıt kimliğinden farklıdır (ör. `kastor`, `polydeukes`). Ad testi bu kişilerde "kişinin adı kaydın adında geçiyor" biçiminde uygulanır. Kayıt sayfasındaki "Soyağacında gör" bağlantısı ağacı ilk kişiye odaklı açar. Kastor ile Polydeukes'in babaları farklıdır (Tyndareos, Zeus). *(Claude'un kararı)*
  - **Kybele** ağaçta akrabasız tek bir düğüm olarak yer alır. Notunda Frig kökenli olduğu ve Rhea ile özdeşleştirildiği yazar, ama Rhea'ya çizgi çekilmez. Bu sayede sayfasındaki bağlantı çalışır ve tahmine dayalı bir ilişki çizilmemiş olur. Latin kaynaklı figürler (Psykhe, Philemon, Baukis) normal kişi olarak girer, kaynakları Apuleius ve Ovidius'tur. *(Claude'un kararı)*
- **iliskiler**: iki tür.
  - `ebeveyn`: `ebeveyn`, `cocuk`, `kaynak` (antik metin), `anlati: 'ana' | 'alternatif'`.
  - `es`: iki kişi, `kaynak`. Evlilik ile birliktelik ayrımı tutulabilir (`birliktelik: true`), çizgide kesik/düz ayrımı için.
- Bir kişinin `ana` anlatıda en fazla iki ebeveyni olur. Tek ebeveynli doğumlar (Athena, Hesiodos'ta Hera'dan Hephaistos) geçerlidir.

### Kapsam: kimler girer

Başlangıç kümesi Claude'un kararı:
1. Sitedeki tüm tanrı ve kahraman kayıtları (şu an 45 + 63).
2. Bunların Khaos'a kadar bütün ataları.
3. Bu kişileri birbirine bağlayan ara figürler, eşler ve sitede adı geçen önemli çocuklar.

Hedef büyüklük kabaca 250–400 kişi. Wikidata'nın getirdiği ama bu kümeye bağlanmayan figürler alınmaz.

### Verinin toplanması

1. `scripts/` altında bir betik Wikidata SPARQL servisinden baba (P22), anne (P25), eş (P26), çocuk (P40) ilişkilerini başlangıç kümesi için çeker ve ham bir aday dosyası üretir. Wikidata verisi CC0'dır.
2. Adaylar elle ayıklanır: isimler site yazımına çevrilir, her ilişki Hesiodos (Theogonia), Homeros, Apollodoros (Bibliotheke) gibi kaynaklara karşı kontrol edilir. Kontrol için Wikipedia "Family tree of the Greek gods" ve Theoi kullanılır. Parada'nın Genealogical Guide'ı yalnızca doğrulama için okunur, içeriği kopyalanmaz.
3. Sitedeki künyelerle çelişki varsa künyedeki bilgi esas alınır (site kendi içinde tutarlı olmalı), ama ilişkinin `kaynak`ı yine o akrabalığı anlatan antik metin olmalıdır. Kaydın genel `kaynak` alanı tek başına yetmez. Künyede "sonraki anlatılar" gibi belirsiz ifadeler varsa (ör. Eros: "Afrodit ve Ares") ilişki, kaynağı bulunabildiği ölçüde `ana` olarak çizilir. Hesiodos'taki daha eski anlatı (Eros'un Khaos'tan çıkması) `alternatif` olarak eklenir.
4. **Kaynak biçimi** *(Claude'un kararı)*: En azından eser adı ("Hesiodos, Theogonia") yazılır. Bilinen yerde kitap/satır da eklenir ("Apollodoros 3.10.7"). Hiçbir antik esere bağlanamayan ilişki çizilmez.
5. **Onay** *(Claude'un kararı)*: Ayıklama Claude'un denetimiyle tamamlanır. Kullanıcıdan ilişki ilişki onay beklenmez. Bunun yerine, ayıklama sonunda kullanıcıya kısa bir rapor verilir: kaç kişi ve ilişki girdi, hangi kişiler çelişkili ya da alternatif anlatılı, neler bilerek dışarıda bırakıldı.
6. Ayıklanmış veri dosyası repoya girer. Betik tekrar çalıştırılabilir kalır ama siteyi derlemek için gerekmez; derleme ağ erişimi istemez.

### Yerleşim

- Düğüm konumları **derleme sırasında** hesaplanır (katmanlı yerleşim; ör. elkjs `layered`). Tarayıcıya hazır koordinatlarla bir SVG gider; tarayıcıda yerleşim hesabı yapılmaz.
- Eşler yan yana durur, çocuklar eş çiftinin altındaki bir birleşme noktasından iner (klasik soyağacı görünümü).
- Kendi kız kardeşiyle evlilik (Zeus ve Hera, Kronos ve Rhea) gibi döngü yaratmayan ama çizgi karmaşası yaratan durumlarda okunurluk önceliklidir; gerekirse bazı eş çizgileri çizilmez, yalnızca panelde gösterilir.
- Alternatif anlatılar çizilmez.

### Etkileşim

- Kaydırma ve yakınlaştırma: dokunmatik (iki parmak) ve fare (tekerlek, sürükleme). Küçük bir istemci betiği yeter; ağır bir grafik kütüphanesi şart değil.
- Odak: tıklanan kişinin ataları, torunları ve eşleri vurgulanır, gerisi soluklaşır, görünüm kişiye kayar. Paneli kapatmak odağı kaldırır.
- Adresle açılış: `kisi` parametresi verilirse sayfa o kişiye odaklı açılır.
- Arama: ağaç içindeki kişi adları üzerinde basit, Türkçe harfleri ve aksanları hoş gören arama (`src/lib/aramaMetni.ts` yeniden kullanılabilir).
- Klavye erişimi: düğümler odaklanabilir, Enter ile seçilir.

### Görünüm

- Mevcut tema renkleri ve başlık yazı tipi. Düğümün türü (ilkel, titan, olimposlu, diğer tanrı, ölümlü, canavar) renk veya kenarlıkla ayırt edilir, küçük bir açıklama (lejant) bulunur.
- Grup düğümleri tekil düğümlerden farklı görünür (ör. üst üste binmiş kart görünümü).
- Kaydı olan kişiler görsel olarak belirgin (ör. dolu düğüm), kaydı olmayanlar sade.
- Telefonda panel alttan açılan bir çekmece, geniş ekranda yan panel.

### Testler

Mevcut vitest düzeniyle:
- Veri dosyası şemaya uyuyor.
- Her `kayit` referansı gerçek bir kayda karşılık geliyor; her ilişki var olan kişilere işaret ediyor.
- `ana` ebeveyn ilişkilerinde döngü yok, kimsenin ikiden fazla ana ebeveyni yok.
- Kaydı olan kişide `ad`, kayıttaki `ad` ile aynı.
- Ata/torun bulma ve arama fonksiyonları için birim testleri.

## Yapımcıya bırakılanlar

- Veri dosyasının tam yolu ve biçimi (JSON/YAML), şemanın dosya adı.
- Yerleşim kütüphanesinin seçimi (elkjs, d3-dag veya benzeri), derlemede statik koşma koşuluyla.
- Kaydırma/yakınlaştırma kodu: elle yazılmış ya da küçük bir kütüphane.
- Odak adresinin biçimi (`?kisi=` veya `#`).
- Düğüm boyutları, renk eşlemesi, lejant düzeni (mevcut temaya uygun olmak koşuluyla).
- İlk açılışta ağacın hangi bölgeyi gösterdiği (öneri: Olimposlular ortada).
