# Mitolojik Hikâyeler — Tasarım

Tarih: 2026-11-23

## Amaç ve neden

İnsanlar uzun metin okumayı sevmiyor. Bu site, Yunan mitolojisini okuma alışkanlığı olmayan kişilere okutmak yerine **kaydırtarak, dinleterek ve oynatarak** öğretir.

**Hedef kitle:** Telefonda vakit geçiren ama bir şeyler öğrenmek isteyen gençler ve yetişkinler.

**Başarı:** Bir hikâyeye giren kişi onu sonuna kadar (kartlar + quiz) bitirir ve bir sonrakine geçer.

## Hedefler (ilk sürüm)

- 10 Yunan mitosu, her biri 3–4 dakikalık **kart kart** anlatımla
- Her kartın **sesli anlatımı** (Azure AI Speech)
- Her hikâyenin sonunda **3 soruluk quiz**
- Her hikâyede **"Bunu zaten biliyorsun"** bağlantısı (Aşil tendonu, Pandora'nın kutusu vb.)
- Ana sayfada **Günün Mitosu**, hikâye listesi ve "Kelimelerin arkasındaki mitler" bölümü
- Tarayıcıda tutulan **ilerleme**: okunan hikâyeler, quiz sonuçları, günlük seri sayacı
- Azure Static Web Apps'e GitHub Actions ile otomatik deploy

## Hedef olmayanlar (sonraki aşamalar)

- Kullanıcı hesabı, backend, yorumlar
- Soy ağacı, harita, "Sen olsan ne yapardın?" seçimleri, "Hangi tanrısın?" testi
- Yunan dışındaki mitolojiler, çoklu dil

## Kaçınılacaklar (çalışsa bile başarısızlık sayılır)

- Ekranı dolduran uzun metin blokları (kart başına en fazla ~40 kelime)
- Telefonda yavaş açılan sayfa
- Çocukça ya da ders kitabı gibi kuru bir anlatım tonu
- Mitosta olmayan uydurma ayrıntılar

## Kısıtlar

- Azure Static Web Apps ücretsiz katmanı: tamamen statik çıktı, sunucu kodu yok
- Önce mobil: 360px genişlikten başlayan tasarım
- Arayüz Türkçe, URL'ler ASCII (`/mitler/prometheus`)

## Yaklaşımlar

| Yaklaşım | Artısı | Eksisi |
|---|---|---|
| **A) Astro + Markdown (seçildi)** | Hızlı, SEO dostu, içerik dosya tabanlı, SWA ücretsiz katmanına uygun | Etkileşimli parçalar için küçük JS adaları yazmak gerekir |
| B) Next.js / React | Uygulama hissi, ileride karmaşık özelliklere esnek | İçerik sitesi için ağır, telefonda daha yavaş |
| C) Düz HTML/JS | En basit kurulum | Hikâye sayısı arttıkça sayfaları elle çoğaltmak gerekir |

Kullanıcı A'yı seçti. Ses için Azure AI Speech (Claude'un kararı); anahtar gelene kadar site sessiz çalışır.

## Nasıl yapılacak

### İçerik modeli
Her mitos `src/content/mitler/<slug>.md` dosyasıdır. Astro content collection ve zod şeması ile doğrulanır:

- `baslik`, `slug`, `sure` (dakika), `ozet`, `renk` (hikâyenin tema rengi), `sira`
- `kartlar`: `{ metin }` listesi (8–12 kart)
- `quiz`: 3 adet `{ soru, secenekler[4], dogru }`
- `bugunBag`: `{ kelime, aciklama }` — günümüzle bağlantı
- Markdown gövdesi: isteyenler için "uzun versiyon"

### Sayfalar
- `/` — Günün Mitosu (tarihe göre hikâye seçer), seri sayacı, hikâye listesi (okunanlar işaretli), "Kelimelerin arkasındaki mitler" listesi
- `/mitler/<slug>` — tam ekran dikey kaydırmalı kartlar (CSS scroll-snap), ses çal/durdur düğmesi, ilerleme çubuğu, son kartta "Bunu zaten biliyorsun", ardından quiz, en sonda "Sıradaki mitos"

### Ses
- `scripts/sesleri-uret.mjs`: `AZURE_SPEECH_KEY` ve `AZURE_SPEECH_REGION` ile her kart için `public/ses/<slug>/<n>.mp3` üretir. Ses: `tr-TR-AhmetNeural`
- Her kartın ayrı dosyası olduğundan kartla ses kendiliğinden eşleşir: bir kart bitince sonrakine kaydırılır ve onun sesi çalar
- Ses dosyası yoksa ses düğmesi gizlenir
- Script elle çalıştırılır ve üretilen dosyalar repoya eklenir; CI anahtar istemez

### İlerleme
- `localStorage` ile tutulur: okunan slug'lar, quiz puanları, son ziyaret günü ve seri
- Saf fonksiyonlar (`seriHesapla`, `gununMitosu`, `quizPuani`) Vitest ile test edilir

### Görsel kimlik
- İlk sürümde görselsiz, tipografi ağırlıklı kartlar: her hikâyenin kendi tema rengi, büyük ve okunaklı yazı, antik Yunan esintili başlık fontu
- Açık ve koyu tema
- Görseller (kamu malı klasik tablolar ya da çizimler) sonraki aşamaya kalır, kart modeline daha sonra `gorsel` alanı eklenir

### Deploy
- `staticwebapp.config.json` (404 sayfası, önbellek başlıkları)
- `.github/workflows/azure-static-web-apps.yml`: `Azure/static-web-apps-deploy`, `app_location: "/"`, `output_location: "dist"`, token için secret `AZURE_STATIC_WEB_APPS_API_TOKEN`

### İlk 10 mitos (Claude'un önerisi)
Prometheus, Pandora'nın Kutusu, Narkissos, İkaros, Akhilleus, Truva Atı, Perseus ve Medusa, Orpheus ve Eurydike, Persephone, Sisifos.
Her biri günümüzle sağlam bir bağ taşıdığı için seçildi.

## Uygulayana bırakılanlar
- CSS ayrıntıları, font seçimi (Google Fonts'tan antik esintili bir başlık fontu ve okunaklı bir gövde fontu)
- Quiz ve kart bileşenlerinin iç yapısı
- Hikâye metinlerinin yazımı: Claude taslak yazar, kullanıcı doğruluk açısından gözden geçirir (onaylandı)
