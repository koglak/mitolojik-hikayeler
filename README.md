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
