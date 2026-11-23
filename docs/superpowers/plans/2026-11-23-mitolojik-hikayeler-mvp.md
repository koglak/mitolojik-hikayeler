# Mitolojik Hikâyeler MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 10 Yunan mitosunu kart kart, sesli ve quizli anlatan, Azure Static Web Apps'e deploy edilen mobil öncelikli statik site.

**Architecture:** Astro statik site. Her mitos bir Markdown content collection girdisi. Etkileşim (kart kaydırma, ses, quiz, ilerleme) sayfa içi küçük TypeScript scriptleriyle yapılır. İş mantığı saf fonksiyonlarda (`src/lib`) durur ve Vitest ile test edilir.

**Tech Stack:** Astro (kurulum anındaki son kararlı sürüm, `package.json`'da sabitlenir), TypeScript, Zod (Astro'nun `astro/zod`'u), Vitest, gray-matter (yalnızca testte), Azure AI Speech REST API, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-11-23-mitolojik-hikayeler-design.md`

## Global Constraints

- Kodda yorum satırı yok (kullanıcı kuralı).
- Arayüz metinleri Türkçe ve doğru Türkçe karakterlerle; URL'ler ASCII: `/mitler/<slug>`.
- Mobil öncelikli: 360px genişlikte yatay kaydırma olmamalı.
- Kart başına en fazla 40 kelime, hikâye başına 8–12 kart, tam 3 quiz sorusu, her soruda 4 seçenek.
- Tamamen statik çıktı (`output: 'static'`), `dist/` klasörü.
- Ses dosyaları: `public/ses/<slug>/<n>.mp3`, `n` 1'den başlar. Ses: `tr-TR-AhmetNeural`.
- `localStorage` anahtarı: `mitolojik-hikayeler:ilerleme`.
- Açık ve koyu tema (`prefers-color-scheme`).

## Review Focus

1. **Günün Mitosu build gününe takılı kalmamalı:** Statik site haftalarca yeniden build edilmeyebilir. Seçim ziyaretçinin tarayıcısında, ziyaret gününe göre yapılmalı (Task 5).
2. **`localStorage` erişilemez olabilir** (gizli sekme, engellenmiş çerezler): Okuma ve yazma hata fırlatmamalı, site ilerleme olmadan da çalışmalı (Task 3 testi).
3. **Seri sayacı sınırları:** Aynı gün ikinci ziyaret seriyi artırmamalı, bir gün atlanınca seri 1'e dönmeli. Gün yerel saate göre hesaplanmalı, UTC'ye göre değil (Task 3 testleri).
4. **Mobil autoplay engeli:** Ses ancak kullanıcı ses düğmesine dokunduktan sonra çalmalı. Ses dosyası yoksa düğme hiç görünmemeli (Task 4).
5. **SSML özel karakterleri:** Metindeki `&`, `<`, `>`, `"`, `'` kaçırılmalı, aksi halde Azure isteği bozulur (Task 6 testi).

---

### Task 1: Proje iskeleti ve temel layout

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `.gitignore`
- Create: `src/layouts/Temel.astro`, `src/styles/tema.css`

**Interfaces:**
- Produces: `Temel.astro` props `{ baslik: string; aciklama: string; renk?: string }`. `renk` verilirse `--mit-renk` CSS değişkenine yazılır. `tema.css` tokenları: `--zemin`, `--yazi`, `--soluk`, `--vurgu`, `--kart-zemin`, `--mit-renk`.

- [ ] **Step 1:** `git init`, Astro'yu minimal şablonla kur (`npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git`), ardından `npm install` ve `npm install -D vitest gray-matter`.
- [ ] **Step 2:** `package.json` scriptleri: `dev`, `build` (`astro build`), `preview`, `test` (`vitest run`), `ses` (`node scripts/sesleri-uret.mjs`).
- [ ] **Step 3:** `Temel.astro`: `lang="tr"`, viewport meta, Google Fonts'tan başlık için `Cinzel`, gövde için `Inter`. `tema.css`'de açık ve koyu tema tokenları, `body` arka planı açıkça belirtilir.
- [ ] **Step 4:** `npm run build`. Beklenen: hatasız biter, `dist/index.html` oluşur.
- [ ] **Step 5:** Commit: `chore: astro iskeleti ve tema`

### Task 2: İçerik şeması ve ilk mitos (Prometheus)

**Files:**
- Create: `src/lib/mitSemasi.ts`, `src/content.config.ts`, `src/content/mitler/prometheus.md`
- Test: `tests/icerik.test.ts`

**Interfaces:**
- Produces: `mitSemasi` (zod object) ve `type Mit = z.infer<typeof mitSemasi>`:
  `{ baslik: string; sira: number; sure: number; ozet: string; renk: string; kartlar: { metin: string }[]; quiz: { soru: string; secenekler: string[]; dogru: number }[]; bugunBag: { kelime: string; aciklama: string } }`
  Slug dosya adından gelir. Koleksiyon adı: `mitler`.

- [ ] **Step 1: Failing test** `tests/icerik.test.ts`: `src/content/mitler/*.md` dosyalarını gray-matter ile okur ve her biri için şunları kontrol eder:
  - `mitSemasi.safeParse(frontmatter).success === true`
  - `kartlar.length` 8 ile 12 arasında
  - her kart `metin.split(/\s+/).length <= 40`
  - `quiz.length === 3`, her soruda `secenekler.length === 4`, `dogru` 0..3 arasında
  - `sira` değerleri tekrarsız
  - en az 1 dosya var
- [ ] **Step 2:** `npm test`. Beklenen: FAIL (`mitSemasi` bulunamadı).
- [ ] **Step 3:** `mitSemasi.ts`'i yaz (zod içinde kısıtlar: `kartlar.min(8).max(12)`, `quiz.length(3)`, `secenekler.length(4)`, `dogru.int().min(0).max(3)`, `renk` hex regex). `content.config.ts`'de `glob` loader ile `mitler` koleksiyonu. Prometheus mitosunu yaz: 10 kart, sade ve hafif esprili ton, `bugunBag: { kelime: "Prometheus" ... }` (ateş, teknoloji, insanlığa ışık getirme temaları üzerinden), Markdown gövdesinde uzun versiyon.
- [ ] **Step 4:** `npm test && npm run build`. Beklenen: PASS ve build hatasız.
- [ ] **Step 5:** Commit: `feat: icerik semasi ve prometheus`

### Task 3: İlerleme mantığı (saf fonksiyonlar + güvenli depolama)

**Files:**
- Create: `src/lib/ilerleme.ts`
- Test: `tests/ilerleme.test.ts`

**Interfaces:**
- Produces:
  - `type Ilerleme = { okunanlar: string[]; quizPuanlari: Record<string, number>; sonGun: string | null; seri: number }`
  - `yerelGun(tarih: Date): string` → `"YYYY-MM-DD"` yerel saate göre
  - `seriHesapla(sonGun: string | null, seri: number, bugun: string): number`
  - `gununMitosu<T>(mitler: T[], tarih: Date): T`: yerel gün sayısı mod `mitler.length`, aynı gün hep aynı mitos
  - `quizPuani(cevaplar: number[], dogrular: number[]): number`: doğru sayısı
  - `ilerlemeOku(depo?: Storage | null): Ilerleme`, `ilerlemeYaz(ilerleme: Ilerleme, depo?: Storage | null): void`: anahtar `mitolojik-hikayeler:ilerleme`, depo verilmezse `globalThis.localStorage`
  - `ziyaretiKaydet(ilerleme: Ilerleme, bugun: string): Ilerleme`
  - `okunduIsaretle(ilerleme: Ilerleme, slug: string, puan: number): Ilerleme`: slug tekrarsız eklenir, puan güncellenir

- [ ] **Step 1: Failing tests:**
  - `seriHesapla(null, 0, "2026-11-23") === 1`
  - `seriHesapla("2026-11-23", 4, "2026-11-23") === 4`
  - `seriHesapla("2026-11-22", 4, "2026-11-23") === 5`
  - `seriHesapla("2026-11-20", 4, "2026-11-23") === 1`
  - ay geçişi: `seriHesapla("2026-11-30", 2, "2026-12-01") === 3`
  - `yerelGun(new Date(2026, 10, 23, 23, 59)) === "2026-11-23"`
  - `gununMitosu(["a","b","c"], d)` aynı gün iki farklı saatte aynı sonucu verir, ardışık iki gün farklı sonuç verir
  - `quizPuani([0,2,1],[0,1,1]) === 2`
  - fırlatan sahte Storage ile `ilerlemeOku` varsayılanı döner (`okunanlar: []`, `seri: 0`), `ilerlemeYaz` hata fırlatmaz
  - bozuk JSON içeren depo varsayılanı döner
  - `okunduIsaretle` aynı slug'ı iki kez eklemez
- [ ] **Step 2:** `npm test`. Beklenen: FAIL.
- [ ] **Step 3:** `src/lib/ilerleme.ts`'i yaz. Tüm depo erişimleri try/catch içinde olur.
- [ ] **Step 4:** `npm test`. Beklenen: PASS.
- [ ] **Step 5:** Commit: `feat: ilerleme ve seri mantigi`

### Task 4: Hikâye sayfası

**Files:**
- Create: `src/pages/mitler/[slug].astro`
- Create: `src/components/KartAkisi.astro`, `src/components/Quiz.astro`, `src/components/BugunBag.astro`
- Create: `src/scripts/hikaye.ts`

**Interfaces:**
- Consumes: `getCollection('mitler')`, `Temel.astro`, `ilerlemeOku/ilerlemeYaz/okunduIsaretle/quizPuani` (Task 3)
- Produces: `/mitler/<slug>/` sayfaları. DOM sözleşmesi: kartlar `[data-kart]`, her birinde `data-ses="/ses/<slug>/<n>.mp3"` (yalnızca dosya varsa), quiz kökü `[data-quiz]` ve `data-slug`, `data-dogrular="[...]"`

- [ ] **Step 1:** `[slug].astro`: `getStaticPaths` koleksiyondan üretir. Build anında `fs.existsSync('public/ses/<slug>/1.mp3')` ile sesin varlığına bakar ve `sesVar` değerini bileşenlere geçirir. Sıradaki mitos `sira`'ya göre bulunur, sonuncudan sonra ilkine döner.
- [ ] **Step 2:** `KartAkisi.astro`: tam ekran (`100dvh`) dikey `scroll-snap-type: y mandatory`, üstte ince ilerleme çubuğu. `sesVar` ise sabit bir ses düğmesi gösterilir. Kapak kartında başlık, süre ve özet; ardından kartlar, `BugunBag`, `Quiz`, "Uzun versiyonu oku" (`<details>` içinde Markdown gövdesi) ve "Sıradaki mitos" bağlantısı.
- [ ] **Step 3:** `hikaye.ts`: `IntersectionObserver` ile görünen kartı takip eder ve ilerleme çubuğunu günceller. Ses düğmesine dokunulunca görünen kartın sesi çalar. `ended` olayında sonraki karta `scrollIntoView` yapılır ve sonraki ses çalar. Kullanıcı elle kaydırırsa ses yeni kartta devam eder. Düğmeye tekrar dokunulunca durur. Autoplay yalnızca ilk dokunuştan sonra.
- [ ] **Step 4:** `Quiz.astro` ve script: her soruda 4 düğme. Seçince doğru/yanlış renklenir ve doğru cevap gösterilir. 3 soru bitince puan yazılır ("3/3 — Olimpos seni kıskanır!" gibi kısa bir yorumla) ve `okunduIsaretle` çağrılır.
- [ ] **Step 5:** `npm run build`. Beklenen: `dist/mitler/prometheus/index.html` var. `npm run preview` ile 360px'te kontrol: yatay kaydırma yok, kartlar tek tek oturuyor, ses düğmesi görünmüyor (henüz ses yok).
- [ ] **Step 6:** Commit: `feat: kart kart hikaye sayfasi ve quiz`

### Task 5: Ana sayfa ve 404

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/pages/404.astro`, `src/scripts/anasayfa.ts`

**Interfaces:**
- Consumes: `getCollection('mitler')`, `gununMitosu`, `yerelGun`, `ilerlemeOku`, `ziyaretiKaydet`, `ilerlemeYaz` (Task 3)
- DOM sözleşmesi: Mitos listesi HTML'e statik basılır, her öğede `data-slug`. Günün Mitosu kutusu `[data-gunun-mitosu]`, mitos verisi `<script type="application/json" id="mitler-veri">` içinde (`slug`, `baslik`, `ozet`, `sure`, `renk`).

- [ ] **Step 1:** `index.astro`: başlık ve kısa slogan ("Mitler 3 dakikada. Kaydır, dinle, öğren."), Günün Mitosu kutusu (JS olmadan `sira` 1 gösterilir), seri rozeti alanı, hikâye kartları listesi, "Kelimelerin arkasındaki mitler" bölümü (her mitosun `bugunBag.kelime` değeri, mitosa bağlantılı).
- [ ] **Step 2:** `anasayfa.ts`: Günün Mitosu'nu **tarayıcıda** `gununMitosu(mitler, new Date())` ile seçip kutuyu günceller. Ziyareti kaydeder. Seri ≥ 1 ise "🔥 N gün" gösterir. Okunan hikâyelere ✓ işareti koyar.
- [ ] **Step 3:** `404.astro`: "Bu yol Hades'e çıkıyor" başlığı ve ana sayfa bağlantısı.
- [ ] **Step 4:** `npm run build && npm test`. Beklenen: hatasız, `dist/404.html` var.
- [ ] **Step 5:** Commit: `feat: ana sayfa ve 404`

### Task 6: Ses üretim scripti

**Files:**
- Create: `scripts/sesleri-uret.mjs`, `scripts/ssml.mjs`
- Test: `tests/ssml.test.ts`

**Interfaces:**
- Produces: `ssmlOlustur(metin: string, ses = "tr-TR-AhmetNeural"): string`, `xmlKacir(metin: string): string`
- CLI: `AZURE_SPEECH_KEY=... AZURE_SPEECH_REGION=... npm run ses [-- <slug>]`. Mevcut dosyaların üzerine `--yeniden` verilmedikçe yazmaz.

- [ ] **Step 1: Failing tests:**
  - `xmlKacir("Zeus & Hera <3 \"aşk\" 'mı'")` sonucunda `&amp;`, `&lt;`, `&quot;`, `&apos;` var, ham `&` ve `<` yok
  - `ssmlOlustur("Merhaba")` içinde `xml:lang="tr-TR"` ve `name="tr-TR-AhmetNeural"` var
- [ ] **Step 2:** `npm test`. Beklenen: FAIL.
- [ ] **Step 3:** `ssml.mjs`'i yaz. `sesleri-uret.mjs`: md dosyalarını gray-matter ile okur. Kapak sesi için `baslik + ". " + ozet`, ardından her kart için `POST https://<region>.tts.speech.microsoft.com/cognitiveservices/v1` isteği atar. Başlıklar: `Ocp-Apim-Subscription-Key`, `Content-Type: application/ssml+xml`, `X-Microsoft-OutputFormat: audio-24khz-48kbitrate-mono-mp3`. Kapak `0.mp3`, kartlar `1.mp3`..`n.mp3` olarak yazılır. Anahtar yoksa açıklayıcı bir mesajla çıkış kodu 1 döner. HTTP hatası olursa slug ve kart numarası yazdırılır.
- [ ] **Step 4:** `npm test` PASS. Anahtarsız `npm run ses` → açıklayıcı hata, çıkış 1.
- [ ] **Step 5:** Commit: `feat: azure speech ses uretim scripti`

Not: Task 4'teki `data-ses` numaralandırması bu düzenle uyumludur (kapak kartı `0`, içerik kartları `1..n`).

### Task 7: Kalan 9 mitos

**Files:**
- Create: `src/content/mitler/{pandora,narkissos,ikaros,akhilleus,truva-ati,perseus-ve-medusa,orpheus-ve-eurydike,persephone,sisifos}.md`

**Interfaces:**
- Consumes: `mitSemasi` (Task 2)

- [ ] **Step 1:** Her mitosu Prometheus ile aynı ton ve yapıda yaz. `sira` 2..10. `bugunBag` karşılıkları: Pandora'nın kutusu, narsisizm, İkaros paradoksu ("güneşe fazla yaklaşmak"), Aşil tendonu ve Aşil topuğu, Truva atı (bilgisayar virüsü), Medusa (kalkan, Versace logosu), "arkana bakma" motifi, mevsimler, Sisifos'un taşı ve "Sisifos işi". Her mitosa ayrı bir `renk`.
- [ ] **Step 2:** `npm test && npm run build`. Beklenen: içerik testi 10 dosya için PASS.
- [ ] **Step 3:** Commit: `feat: ilk 10 mitos icerigi`

### Task 8: Azure Static Web Apps deploy

**Files:**
- Create: `staticwebapp.config.json`, `.github/workflows/azure-static-web-apps.yml`, `README.md`

- [ ] **Step 1:** `staticwebapp.config.json`: `responseOverrides.404.rewrite = "/404.html"`, `/_astro/*` için `Cache-Control: public, max-age=31536000, immutable`, `/ses/*` için `max-age=604800`, `mimeTypes` içinde `.mp3: audio/mpeg`.
- [ ] **Step 2:** Workflow: `push` ile `main` ve `pull_request` tetikler. Önce `npm ci && npm test`, sonra `Azure/static-web-apps-deploy@v1` ile `app_location: "/"`, `output_location: "dist"`, `azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}`. PR kapanınca `action: close` adımı.
- [ ] **Step 3:** README: yerel çalıştırma, yeni mitos ekleme, ses üretme ve Azure'da SWA kaynağı oluşturup token'ı GitHub secret olarak ekleme adımları.
- [ ] **Step 4:** `node -e "JSON.parse(require('fs').readFileSync('staticwebapp.config.json'))"` ve `npm run build`. Beklenen: hatasız.
- [ ] **Step 5:** Commit: `chore: azure static web apps deploy`
