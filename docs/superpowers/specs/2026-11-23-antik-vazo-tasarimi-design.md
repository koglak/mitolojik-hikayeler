# Antik Vazo Tasarımı: Görsel Yenileme

Tarih: 2026-11-23
Önceki spec: `2026-11-23-mitolojik-hikayeler-design.md`. O belgedeki "ilk sürümde görselsiz" kararının yerini bu belge alır. Geri kalan her şey (içerik modeli, ses, ilerleme, deploy) aynen geçerlidir.

## Niyet

Kullanıcı mevcut görsel tasarımı beğenmedi ve sitenin her yerinde illüstrasyon istiyor. Hedef kitle telefonda takılan, okumayı pek sevmeyen genç ve yetişkinler. Görsel, metni okutmanın kancası: kullanıcı her kaydırmada yeni bir sahne görmeli ve hikâyeyi görselden de takip edebilmeli.

Kullanıcının seçtiği tarz: **antik Yunan siyah figür vazo resmi**. Terracotta zemin üstünde siyah siluet figürler, figürlerin içinde zemin renginde kazıma çizgiler, meander bordürler. Referans: `tarz-secenekleri` artifact'ındaki "B Antik vazo" maketi (Prometheus, kart 6).

## Hedefler

- Her hikâye kartında o karta özel bir sahne olacak. Kullanıcı bunu seçti (yaklaşım 2).
- Her mitosun bir kapak sahnesi olacak. Kapak; hikâyenin ilk ekranında, ana sayfadaki listede ve Günün Mitosu kutusunda kullanılacak.
- Sitenin bütün sayfaları aynı vazo dünyasına ait görünecek: ana sayfa, hikâye, quiz, "Bunu zaten biliyorsun", son bölüm ve 404.
- Bütün sahneler aynı ustanın elinden çıkmış gibi tutarlı olacak.

## Hedef dışı

- Animasyonlu çizimler, karakter animasyonu, parallax.
- Açık ve koyu tema seçeneği. Site tek temalı olacak.
- Gerçek müze fotoğrafları.
- Yeni mitler eklemek ya da metinleri değiştirmek.

## Anti-hedefler (çalışsa bile başarısızlık sayılır)

- Sahne metinle çelişiyor. Örnekler: İkaros'ta kule çizmek, Persephone'de birden fazla nar tanesi göstermek, Truva'da Sinon'u Laokoon'dan önce göstermek.
- Clip-art ya da çizgi film görünümü. Figürler vazo resminin oranlarına ve profil duruşlarına sadık kalmalı.
- Kan ve vahşet. Prometheus'un ciğeri, Medusa'nın kesik başı, Laokoon'un boğulması ima edilir, ayrıntılı çizilmez.
- Çıplaklık. Antik vazolarda yaygındır ama burada figürler khiton ya da himation giyer, savaşçılar zırhlıdır.
- Ağır sayfa. Hikâye sayfası 3G'de bile hızlı açılmalı.
- Okunaksız metin. Metin paneli her zaman koyu zemin üstünde açık renkte olacak, çizimin üstüne binmeyecek.

## Yaklaşımlar

| | Yaklaşım | Artısı | Eksisi |
|---|---|---|---|
| 1 | Mitos başına 3–4 sahne, ardışık kartlar sahne paylaşır (~40 çizim) | Daha az iş, kalite kolay tutarlı kalır | Kartların bir kısmı aynı görseli gösterir |
| **2** | **Her karta ayrı sahne (~110 çizim)** | **En sürükleyici sonuç: her kaydırmada yeni sahne** | **En uzun iş, kalite dalgalanma riski** |
| 3 | Kamu malı müze fotoğrafları ve SVG süsler | En otantik görünüm | Her sahnenin vazosu yok, tutarsız renk ve kalite, ağır dosyalar, kaynak gösterme zorunluluğu |

**Seçilen: 2.** Kullanıcı seçti. Kalite dalgalanma riskini iki önlem azaltır: ortak figür kütüphanesi ve mitos mitos onay (bkz. Üretim süreci).

## Sayılar

10 mitos, 99 kart (Akhilleus 9, diğerleri 10), 10 kapak. Toplam **109 hikâye sahnesi**. Bunlara ek olarak:

- ana sayfa başlık süslemesi,
- quiz amblemi (Athena'nın baykuşu),
- "Bunu zaten biliyorsun" amblemi (kandil),
- 404 sahnesi (Kerberos ve Hades'in kapısı),
- favicon (amfora).

## Görsel dil

**Renkler (tek tema, `:root` üzerinde tanımlanır):**

| Token | Değer | Kullanım |
|---|---|---|
| zemin | `#121010` | Sayfa ve metin paneli |
| kil | `#c8662f` | Sahne zemini (terracotta) |
| siyah figür | `#121010` | Siluetler |
| kazıma | kil rengi | Figürlerin içindeki detay çizgileri |
| yazı | `#f1d3bd` | Metin |
| soluk yazı | `#b89a85` | İkincil metin. Kontrast ≥4.5 olmalı, uygulamada doğrulanır. |
| vurgu | `#d9773f` | İlerleme çubuğu, düğme kenarları, bağlantılar |
| doğru / yanlış | Yeşil ve kırmızı ton, koyu zeminde ≥4.5 kontrast | Quiz |

Mitos başına renk (`renk` alanı) artık arayüzde kullanılmaz. Bütün mitler aynı kil ve siyah paletini paylaşır, çünkü vazo dünyasının bütünlüğü bunu ister. *(Benim kararım.)* `renk` alanı şemadan ve içerik dosyalarından kaldırılır.

**Yazı tipleri:**
- Başlıklar ve kart metni: Marcellus (Google Fonts).
- Quiz seçenekleri, küçük arayüz metinleri ve uzun versiyon: Inter. Uzun okumada daha rahattır.
- Cinzel kaldırılır.

**Süsleme:** Meander (Yunan anahtarı) bandı sitenin her yerinde bölüm ayırıcıdır: sahnenin üstünde ve altında, bölümler arasında, footer'da. Kart numarası Roma rakamıyla yazılır (I, II … X). Kapak "Ω" ya da mitos başlığıyla açılır.

## Kart düzeni (telefon, dikey)

```
┌──────────────────────────┐
│ ←  ▬▬▬▬▬▬▬░░░░░░░   🔊  │  sabit üst çubuk (koyu, yarı saydam)
│▚▞▚▞▚▞ meander ▚▞▚▞▚▞▚▞▚│
│                          │
│     terracotta sahne     │  ~%55 yükseklik, siyah figürler
│      (karta özel)        │
│▚▞▚▞▚▞ meander ▚▞▚▞▚▞▚▞▚│
│ VI                       │  Roma rakamı, vurgu rengi
│ Prometheus ateşi bir     │  Marcellus, açık renk, koyu zemin
│ rezene sapına sakladı…   │
└──────────────────────────┘
```

- Sahnenin en-boy oranı sabittir (viewBox `0 0 400 300`). Geniş ekranda kart en fazla `42rem` genişliğindedir ve sahne ortalanır.
- Kısa ekranlarda (yükseklik < 640px) sahne küçülür. Metin her zaman tam görünür, kesilmez.
- Kart aktif olduğunda sahne hafifçe belirir (opacity ve 1.02'den 1'e ölçek, 400ms). `prefers-reduced-motion` açıksa animasyon olmaz.

## Sayfalar

**Hikâye sayfası:**
- Kapak: kapak sahnesi, başlık, özet, süre.
- Kartlar: düzen yukarıdaki gibi.
- "Bunu zaten biliyorsun": kandil amblemi ve meander çerçeve.
- Quiz: baykuş amblemi. Seçenekler vazo kenarlı düğmeler. Doğru ve yanlış cevap renk dışında ✓ / ✗ işaretiyle de belli olur.
- Son bölüm: sıradaki mitosun kapak sahnesi küçük boyutta, "Sıradaki mitos →", uzun versiyon, "Tüm mitler".

**Ana sayfa:**
- Başlık: meander çerçeveli "Mitolojik Hikâyeler" ve altında bir figür frizi (yürüyen figürler dizisi).
- Günün Mitosu: o günün mitosunun kapak sahnesi ve başlığı. İstemci tarafında seçilir, bu yüzden 10 kapağın hepsi sayfada bulunur ve yalnızca seçilen görünür. Bu, M7'deki (önce Prometheus'un görünüp sonra değişmesi) titremeyi de çözer: seçim yapılana kadar kutu boş iskelet gösterir.
- Mitos listesi: her satırda kapak sahnesinin küçük hali (kare kırpılmış), başlık, süre, ✓.
- "Kelimelerin Arkasındaki Mitler": vazo kenarlı çipler.

**404:** Kerberos ve kapı sahnesi, mevcut metin aynen kalır.

## Teknik tasarım

**Sahneler satır içi SVG'dir ve Astro bileşeni olarak yazılır.**
- Neden SVG: Vazo stili düz renk ve siluet olduğu için SVG'ye çok uygun. Dosyalar küçük kalır, her ekranda keskin görünür, ek bağımlılık gerekmez.
- Neden satır içi: Ortak figür parçaları `<img>` ile yüklenen ayrı SVG dosyalarından çağrılamaz, çünkü tarayıcı dış kaynaklı `<use>` referanslarını engeller. Bu yüzden sahneler derleme anında birleştirilip HTML'e gömülür.

**Figür kütüphanesi** (`src/sahneler/figurler/`): Parametreli Astro bileşenleri: konum, ölçek, yön (sola veya sağa bakış) ve duruş varyantı.
- Başlangıç kütüphanesi: erkek figür (ayakta, yürüyen, koşan, diz çökmüş, uzanmış), kadın figür (aynı duruşlar), savaşçı (miğfer, kalkan, mızrak), yaşlı / kral (asa), tanrı nitelikleri (Zeus'un yıldırımı, Hermes'in kanatlı şapkası, Athena'nın miğferi ve aigisi), kartal, at, yılan, gemi, sütun ve tapınak, ağaç, kaya, dalga, alev, çiçek.
- Çizerken yeni parça gerekirse kütüphaneye eklenir. Bir sahneye özel tek seferlik şekiller sahne dosyasında kalabilir.

**Sahne dosyaları:** `src/sahneler/<slug>/<n>.astro`. `0` kapaktır, `1..n` kartlardır. Bu, ses dosyalarındaki numaralamanın aynısıdır.
- Ortak çerçeve: Her sahne aynı `VazoSahnesi.astro` sarmalayıcısını kullanır. Sarmalayıcı viewBox'ı, kil zemini, meander bantlarını ve ortak `<defs>`'i sağlar.
- Sahne bulma: `import.meta.glob('/src/sahneler/*/*.astro', { eager: true })` ile slug ve numaraya göre bulunur.
- Eksik sahne: Sayfa çökmez, o kartta sade bir meander paneli gösterilir.

**SVG kimlik çakışması:** Bir sayfada çok sayıda satır içi SVG olacağı için `<defs>` (meander deseni vb.) sayfada bir kez, sayfa düzeninde tanımlanır. Sahneler yalnızca o ortak kimliklere başvurur. Sahneye özel kimlik gerekirse önüne `<slug>-<n>-` eklenir.

**Erişilebilirlik:**
- Kart sahneleri `aria-hidden="true"` olur, çünkü aynı içerik kart metninde ve seste zaten var. *(Benim kararım.)*
- Ana sayfadaki kapak küçük resimleri de dekoratiftir. Bağlantının adı başlıktır.

**Boyut bütçesi:**
- Tek bir sahne SVG çıktısı ≤ 10 KB (sıkıştırılmamış).
- Bir hikâye sayfasının toplam HTML'i ≤ 200 KB (sıkıştırılmamış). Gzip ile bunun yaklaşık 4'te 1'i iner.
- Ana sayfa 10 kapak içerdiği için aynı sınır onun için de geçerlidir.

**Testler:**
- Her mitosun her kartı (ve kapağı) için bir sahne dosyası vardır. Yeni mitos eklenip sahnesi unutulursa test kırılır.
- Derlenmiş her hikâye sayfası bütçenin altındadır. Ölçüm `dist` üzerinde yapılır.
- Kontrast: yazı / zemin, soluk yazı / zemin ve vurgu / zemin oranları test edilir. Hesaplama fonksiyonu `src/lib` altına konur.
- Var olan 68 test yeşil kalır. `renk` kaldırıldığı için ilgili şema testleri güncellenir.

**Değişmeyenler:** Kart akışı mantığı (`hikaye.ts`, `kartSecimi.ts`), ilerleme, quiz mantığı, ses, deploy. Yalnızca işaretleme ve stiller değişir. `data-*` kancaları korunur.

## Üretim süreci

Çizim kalitesini ancak kullanıcı görerek onaylayabilir. Ben ekran görüntüsü alamıyorum. Bu yüzden iş onay kapılarıyla ilerler:

1. **Temel ve ilk mitos:** Yeni tema, sayfa düzenleri, figür kütüphanesi ve Prometheus'un 11 sahnesi. Bunlar bir **galeri artifact'ında** yayımlanır: telefon çerçevesinde her kart, sahnesi ve metni. **Kullanıcı onaylamadan diğer mitlere geçilmez.** Burada gelen geri bildirim kütüphaneyi ve üslubu düzeltir.
2. **Kalan 9 mitos:** 3'erli gruplar halinde çizilir. Her grup galeriye eklenir. Kullanıcı sahneleri hem görsel kalite hem de metinle uyum açısından gözden geçirir.
3. **Ana sayfa, 404 ve amblemler.**
4. **Son kontrol:** Testler, derleme, boyut bütçesi. Kullanıcının kendi telefonunda `npm run dev` ile ya da preview ortamında bakması.

Galeri yalnızca gözden geçirme aracıdır, sitenin parçası değildir.

## Builder'a kalanlar

- Figür kütüphanesinin iç yapısı ve parametre adları.
- Her sahnenin kompozisyonu, metne sadık kalmak şartıyla.
- Küçük ekran kırılım noktalarının tam değerleri.
- Doğru ve yanlış renklerinin tam tonları (kontrast şartını sağlamak koşuluyla).
- Galeri artifact'ının düzeni.
