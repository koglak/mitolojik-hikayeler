# Mitolojik Hikâyeler

Yunan mitlerini kart kart, sesli ve quizli anlatan mobil öncelikli statik site. Astro ile yazılır, Azure Static Web Apps'te yayınlanır.

## Yerel çalıştırma

```bash
npm install
npm run dev
npm test
npm run build
```

Node 22.23.4 veya üstü gerekir.

## Yeni mitos ekleme

1. `src/content/mitler/<slug>.md` dosyası oluştur. Slug yalnızca küçük harf, rakam ve tire içermeli (`truva-ati`).
2. Var olan bir mitosu örnek al. Kurallar:
   - `kartlar`: 8–12 kart, her biri en fazla 40 kelime
   - `quiz`: tam 3 soru, her soruda 4 seçenek, `dogru` 0–3 arası
   - `sira`: tekrarsız bir sayı
   - `renk`: `#rrggbb` biçiminde
3. `npm test` kuralları denetler.

## Antik kaynak ekleme

1. Yazar için `src/content/yazarlar/<yazar>.md`, her eseri için `src/content/eserler/<yazar>/<eser>.md` oluştur. Var olan bir dosyayı örnek al; her yazarın en az bir eseri olmalı.
2. Tanrı, kahraman ve kent sayfalarındaki `kaynak` satırları bu kayıtlara otomatik bağlanır. Eşleşme `ad`, `digerAdlar` ve `atifAdlari` alanlarıyla yapılır.
3. `npm test` kuralları denetler.

## Zaman atlası kaydı ekleme

`/kronoloji` sayfasının verisi `src/data/zaman-atlasi/` altındadır: `uygarliklar.json`, `hukumdarlar.json`, `olaylar.json`, `kaynaklar.json`. Alanlar `src/lib/zamanAtlasi/sema.ts` içinde tanımlıdır.

1. Yılları tarihsel yaz: MÖ 1274 için `-1274`, MS 72 için `72`. `0` geçersizdir.
2. Kesintili bir devlet için `donemler` listesine birden çok dönem ekle.
3. `kesinlik` tarihin güvenilirliğidir (`kesin`, `yaklasik`, `tartismali`, `geleneksel`). `nitelik` kaydın doğasıdır (`tarihsel`, `tartismali`, `mitolojik`) ve işaretin biçimini belirler.
4. `kaynakca` satırları `kaynaklar.json` kimliklerini kullanır. Tarihi kaynağıyla karşılaştırdıysan `dogrulama` değerini `dogrulandi` yap.
5. `baglantilar` site içeriğinin kimliklerini alır: `mitler`, `kentler`, `tanrilar`, `kahramanlar`, `eserler`.
6. `npm test` kuralları denetler.

Harita eklemek için `document` üzerindeki `zamanatlasi:yil` olayını dinle; `detail.kesit` o yıl var olan kayıtları taşır. Sınırlar için `harita.sinirlar` alanı ayrılmıştır.

## Sanat eseri ekleme

`/sanat-eserleri/` sayfasının verisi `src/content/sanat/<eser>.md` ve `src/data/muzeler.json` dosyalarındadır.

1. Var olan bir eseri örnek al. Gövdede `## Anlattığı hikâye` ve `## Eserin öyküsü` başlıkları zorunludur.
2. `muze` alanı `muzeler.json` içindeki bir kimliktir. Yeni müzeyi önce oraya ekle.
3. MÖ yıllar `siralamaYili` alanında eksi yazılır. `0` geçersizdir.
4. Fotoğraf için `scripts/sanat-gorsel-listesi.json` dosyasına eseri ekle (`makale`: İngilizce Wikipedia maddesi, `arama`: Commons araması ya da `dosya`: Commons dosyası) ve çalıştır:

```bash
npm run sanat-gorselleri
npm run sanat-gorselleri -- laokoon
npm run sanat-gorselleri -- laokoon --yeniden
```

Betik fotoğraf indirmez. Yalnızca kamu malı, CC0, CC BY ve CC BY-SA görsellerin Wikimedia adresini, ölçüsünü ve atıfını eser dosyasına yazar; ziyaretçi fotoğrafı doğrudan Wikimedia'dan yükler. Doğru görselin geldiğini gözle kontrol et. Fotoğrafsız eserde çizim simgesi gösterilir.

5. `npm test` kuralları denetler.

## Blog yazısı ekleme

1. `src/content/blog/<slug>.md` dosyası oluştur ve var olan bir yazıyı örnek al. Metin ön bilgiden sonra düz Markdown olarak yazılır.
2. `gorsel` alanına Wikimedia Commons'taki dosya sayfasından küçük resim adresini, ölçüsünü, sahibini ve lisansını yaz. Yalnızca kamu malı, CC0, CC BY ve CC BY-SA kabul edilir.
3. `ilgili...` alanları site kayıtlarının kimlikleridir; boş bırakılabilir.
4. `npm test` kuralları denetler.

## Sesli anlatım

Sesler Azure AI Speech ile bir kez üretilir ve `public/ses/<slug>/<n>.mp3` olarak repoya eklenir. `0.mp3` kapak, `1.mp3`… kartlardır. Bir kartın ses dosyası yoksa site o kart için ses çalmaz. Hiçbir ses dosyası yoksa ses düğmesi gösterilmez.

1. Azure Portal'da bir **Speech** kaynağı oluştur (ücretsiz F0 katmanı yeterli).
2. Anahtarı ve bölgeyi alıp çalıştır:

```bash
AZURE_SPEECH_KEY=... AZURE_SPEECH_REGION=westeurope npm run ses
AZURE_SPEECH_KEY=... AZURE_SPEECH_REGION=westeurope npm run ses -- prometheus
AZURE_SPEECH_KEY=... AZURE_SPEECH_REGION=westeurope npm run ses -- prometheus --yeniden
```

Var olan dosyalar `--yeniden` verilmedikçe atlanır. Metni değiştirdiğin mitosu `--yeniden` ile tekrar üret.

## Azure Static Web Apps'e deploy

1. Projeyi GitHub'a gönder.
2. Azure Portal'da **Static Web App** oluştur:
   - Plan: Free
   - Deployment source: **Other**
3. Kaynağın **Manage deployment token** menüsünden token'ı kopyala.
4. GitHub reposunda **Settings → Secrets and variables → Actions** altında `AZURE_STATIC_WEB_APPS_API_TOKEN` adıyla secret ekle.
5. `main` dalına her push'ta `.github/workflows/azure-static-web-apps.yml` testleri çalıştırır, siteyi build eder ve yayınlar. Pull request'ler için önizleme ortamı açılır.

SWA ayarları (404 sayfası, önbellek başlıkları) `public/staticwebapp.config.json` dosyasındadır.
