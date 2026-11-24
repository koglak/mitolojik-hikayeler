# Sanat Eserleri: tasarım

Durum: onaylandı (2026-11-24)

## Amaç

Mitoloji ve antik tarihle ilgili dünyaca ünlü eserleri (heykel, resim ve benzerleri), bulundukları yer ve anlattıkları hikâyeyle birlikte sunan yeni bir bölüm.

Kullanıcının söyledikleri: ünlü eserler, nerede oldukları, anlattıkları hikâye; heykeller ve resimler; bölüm adı "Sanat Eserleri"; A yaklaşımı.

Varsayım (kullanıcı açıkça söylemedi): ziyaretçi eseri görsün, hikâyesini öğrensin, nerede görebileceğini bilsin ve sitedeki mitlere geçsin.

## Hedefler

- `/sanat-eserleri/` galerisi ve her eser için `/sanat-eserleri/<slug>/` sayfası.
- Türe, müzeye ve metne göre süzme; müze haritası.
- Eserden mit, tanrı, kahraman ve kent sayfalarına, oralardan da esere bağlantı.
- İlk partide 40 eser.

## Kapsam dışı

- Kayıp eserler.
- Telifi süren eserler.
- Ses, quiz, ziyaret saati ve bilet bilgisi.
- "Antik Kaynaklar" sayfalarındaki "atıf yapanlar" listesine sanat eserlerini eklemek.

## Kaçınılacaklar

- Lisansı doğrulanmamış fotoğraf.
- Reklamlı sitede kullanılamayacak lisans (NC, ND, yalnızca adil kullanım).
- Kaynağı olmayan ya da efsaneyi tarih gibi anlatan metin.

## Yaklaşımlar

- **A (seçildi): kendi veri yapısı olan galeri ve eser sayfaları.** Müze ve tür ayrı alanlar olur; süzme, harita, arama ve paylaşım eksiksiz çalışır. En çok emek isteyen yol.
- **B: var olan kayıt kalıbına dördüncü bölüm eklemek.** Hızlı, ancak kalıpta fotoğraf ve müze alanı yok; ortak şemayı bütün bölümler için genişletmek gerekir.
- **C: Kronoloji gibi tek etkileşimli sayfa.** Eserlerin kendi adresi olmadığı için paylaşım ve arama motoru tarafı zayıf kalır.

A, görsel, hikâye ve yer bilgisini eksiksiz taşıdığı için önerildi ve kullanıcı A'yı seçti.

## Veri

Yeni koleksiyon `sanat`: `src/content/sanat/<slug>.md`. Var olan `eserler` koleksiyonu edebi eserlere ait olduğu için bu ad kullanılmaz.

| Alan | Kural |
|---|---|
| `ad`, `ozet` | zorunlu metin |
| `ozgunAd` | isteğe bağlı |
| `sira` | tekrarsız pozitif tam sayı |
| `tur` | `heykel`, `resim`, `kabartma`, `mimari`, `mozaik`, `fresk`, `vazo`, `maden` |
| `sanatci` | isteğe bağlı; boşsa "Bilinmiyor" yazılır |
| `tarih` | görünen metin, örneğin "MÖ 2. yüzyıl" |
| `siralamaYili` | sıfır olmayan tam sayı; MÖ yıllar eksi |
| `malzeme` | zorunlu metin |
| `muze` | `src/data/muzeler.json` içindeki bir kimlik |
| `konumNotu` | isteğe bağlı: salon, kopya ya da ziyaret durumu notu |
| `kaynak` | isteğe bağlı antik metin atfı; var olan `bagliKaynak` ile bağlanır |
| `kaynakca` | en az bir `{ ad, adres }`; öncelik müzenin kendi sayfasında |
| `ilgiliMitler`, `ilgiliTanrilar`, `ilgiliKahramanlar`, `ilgiliKentler` | var olan kimlikler |
| `gorsel` | isteğe bağlı: `{ adres, genislik, yukseklik, alt, sahibi, lisans, lisansAdresi, kaynakAdresi }` |

`src/data/muzeler.json`: kimlik başına `ad`, `kent`, `ulke`, `enlem`, `boylam`. Yerinde duran eserler (Nemrut) için alan kaydı da bu dosyadadır.

Gövdede iki başlık zorunludur: `## Anlattığı hikâye` ve `## Eserin öyküsü`. İkincisi bulunuşunu, el değiştirmesini ve tartışmalı tarihlemesini anlatır.

## Fotoğraflar

- Fotoğraf depoya indirilmez (kullanıcı kararı, 2026-11-24); Wikimedia adresinden bağlantıyla, duyarlı boyutlarla gösterilir. Bağlantı açılmazsa çizim simgesi gelir.
- Kabul edilen lisanslar: kamu malı, CC0, CC BY, CC BY-SA. Aynı eser için önce kamu malı ve CC0 aranır. Üç boyutlu eserlerde hem eserin hem fotoğrafın hakkı denetlenir.
- Atıf (fotoğrafçı, lisans, kaynak bağlantısı) görselin altında görünür.
- `scripts/sanat-gorselleri.mjs`, görselin adresini, sahibini ve lisansını eser dosyasına yazar; kabul listesi dışındaki lisansta durur.
- Fotoğrafı olmayan eser yayınlanabilir: görsel yerine türünün çizim simgesi gösterilir.

## Galeri sayfası

1. Başlık, açıklama ve arama kutusu.
2. Tür düğmeleri ve müze seçimi; birlikte uygulanır, sonuç sayısı ve boş sonuç metni vardır.
3. Kart ızgarası: fotoğraf, ad, sanatçı ya da dönem, müze ve kent. Sıra `siralamaYili`.
4. Müze haritası: Leaflet, `KentHaritasi` ile aynı altlık. Müze başına tek işaret; pencerede oradaki eserler listelenir. Süzme haritaya da yansır.

JavaScript kapalıyken bütün eserler görünür.

## Eser sayfası

Sırasıyla: konum izi, ad ve özet, büyük fotoğraf ve atıf, künye, müze haritası ya da harita bağlantısı, hikâye, eserin öyküsü, kaynaklar, ilgili mitler ve kayıtlar, aynı müzedeki diğer eserler.

## Siteye bağlanma

- Ana menüye ve ana sayfaya eklenir. Ana sayfada altı kutu var; yedincisi alt satırda tam genişlik olur.
- Mit, tanrı, kahraman ve kent sayfalarında "Sanatta" başlığıyla ilgili eserler listelenir. Bağ yalnızca eser dosyasında tutulur, ters yön otomatik kurulur.
- Arama kayıtlarına, site haritasına, kırıntı ve `VisualArtwork` yapısal verisine eklenir.
- Paylaşım görseli fotoğrafın Wikimedia adresidir; fotoğraf yoksa site görseli kullanılır.

## İlk 40 eser

**Antik heykel (12):** Semadirek Nike'si, Milo Venüsü, Laokoon ve Oğulları, Belvedere Apollonu, Farnese Herakles'i, Farnese Boğası, Efes Artemisi, Artemision Bronzu, Delphi Arabacısı, Ölen Galyalı, Nefertiti Büstü, Olympia Hermes'i.

**Kabartma ve mimari (7):** Bergama Sunağı, Parthenon heykelleri, İskender Lahdi, Nereidler Anıtı, Hammurabi Steli, İştar Kapısı, Nemrut heykelleri.

**Mozaik (2):** İskender Mozaiği, Çingene Kızı.

**Vazo, fresk, maden (4):** François Vazosu, Exekias'ın Dionysos kyliksi, Knossos Boğa Freski, Agamemnon Maskesi.

**Sonraki heykel (4):** Bernini *Apollon ve Daphne*, Bernini *Persephone'nin Kaçırılışı*, Cellini *Perseus*, Canova *Eros ve Psykhe*.

**Resim (11):** Botticelli *Venüs'ün Doğuşu*, Raffaello *Atina Okulu*, Tiziano *Bacchus ve Ariadne*, Tiziano *Europa'nın Kaçırılışı*, Caravaggio *Medusa*, Caravaggio *Narkissos*, Velázquez *İplikçi Kadınlar*, Rubens *Paris'in Yargısı*, Bruegel *İkaros'un Düşüşü*, Goya *Satürn*, David *Sokrates'in Ölümü*.

Tarihleme ya da atfı tartışmalı olanlarda (Laokoon, Olympia Hermes'i, İkaros'un Düşüşü, Agamemnon Maskesi) tartışma metinde açıkça belirtilir.

## Denetim

Testler: şema, tekrarsız `sira`, geçerli müze ve ilgili kayıt kimlikleri, zorunlu başlıklar, lisans kabul listesi, görsel adresi, kullanılmayan müze olmaması, süzme mantığı, ters bağlantılar. Ardından `npm test`, `npm run build` ve galeri ile eser sayfasının masaüstü ve mobil genişlikte gözle denetimi.

## Yapımcıya bırakılanlar

Bileşen bölünmesi, kart oranı, boşluklar, hareketler ve simge çizimleri. Görünüm `src/styles/tema.css` değişkenlerine ve var olan sayfalara uyar. Koda yorum eklenmez.
