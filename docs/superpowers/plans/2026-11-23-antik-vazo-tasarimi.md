# Antik Vazo Tasarımı Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Siteyi siyah figür vazo stiline taşımak ve her kart, kapak ve sayfa için satır içi SVG illüstrasyon eklemek.

**Architecture:** Sahneler Astro bileşenleri olarak yazılır ve ortak bir figür kütüphanesinden kurulur. Her sahne `VazoSahnesi.astro` çerçevesine sarılır, derleme anında HTML'e gömülür. Ortak `<defs>` (meander deseni) her sayfada bir kez `Temel.astro` içinde tanımlanır. `Sahne.astro`, `import.meta.glob` ile slug ve numaraya göre sahneyi bulur. Sahne yoksa sade bir meander paneline düşer. Kart akışı, ses, quiz ve ilerleme mantığı değişmez.

**Tech Stack:** Astro 7 (statik), Vitest 5, gray-matter, satır içi SVG, Google Fonts (Marcellus, Inter).

**Spec:** `docs/superpowers/specs/2026-11-23-antik-vazo-tasarimi-design.md` (önceki spec: `docs/superpowers/specs/2026-11-23-mitolojik-hikayeler-design.md`)

## Global Constraints

- Koda hiçbir yorum eklenmez (`//`, `/* */`, `<!-- -->`, docstring). Açıklama gerekiyorsa isimlendirme ile çözülür.
- Tanımlayıcılar mevcut kod gibi Türkçe ve ASCII'dir. Arayüz metinleri tam Türkçe karakterlidir.
- Tek tema kullanılır. `prefers-color-scheme` blokları kaldırılır.
- Renk değerleri: zemin `#121010`, kil `#c8662f`, siyah figür `#121010`, yazı `#f1d3bd`, soluk yazı `#b89a85`, vurgu `#d9773f`. Kontrast şartları: yazı/zemin ≥4.5, soluk/zemin ≥4.5, vurgu/zemin ≥3, doğru/zemin ≥4.5, yanlış/zemin ≥4.5.
- Yazı tipleri: başlık ve kart metni Marcellus, quiz seçenekleri, küçük arayüz metni ve uzun versiyon Inter. Cinzel kaldırılır.
- Sahne viewBox'ı `0 0 400 300`. Sahne dosyası yolu `src/sahneler/<slug>/<n>.astro`. `0` kapaktır, `1..n` kartlardır.
- Kart sahneleri ve kapak küçük resimleri `aria-hidden="true"` olur.
- Bütçe: tek sahnenin SVG çıktısı ≤ 10 KB. Hikâye sayfası ve ana sayfa HTML'i ≤ 200 KB (sıkıştırılmamış).
- Çizimlerde kan, vahşet ve çıplaklık olmaz. Figürler profilden, vazo oranlarında çizilir. Sahne kart metniyle çelişmez.
- Var olan `data-*` kancaları (`data-kart`, `data-ses`, `data-ilerleme-cubugu`, `data-ses-dugmesi`, `data-ses-ikon`, `data-quiz`, `data-soru`, `data-secenek`, `data-sonuc`, `data-slug`, `data-okundu`, `data-seri`, `data-gunun-mitosu`, `data-gm-*`) korunur.
- Derleme: `ASTRO_TELEMETRY_DISABLED=1 npm run build`. npm komutları `--cache $TMPDIR/npm-cache` ile çalışır.
- `git commit` bu oturumda izinsizdir. Commit adımlarında `git add` yapılır ve kullanıcıya hazır commit komutu bırakılır.
- Onay kapıları: Task 4 ve Task 5–7'nin sonunda galeri artifact'ı yayımlanır ve kullanıcı onayı beklenir. Bu, spec'in koyduğu zorunlu duraktır.

## Review Focus

1. Kısa ekran (iPhone SE, 375×667) ve yatay telefon: kart metni kesilmemeli, sahne küçülmeli. Gerekirse kart `100dvh`'yi aşar ve snap korunur.
2. Bir sahne dosyası eksik ya da yanlış numaralıysa sayfa çökmemeli. O kartta sade meander paneli görünmeli.
3. Satır içi SVG'lerde kimlik çakışması: Sahneye özel `id`'ler `<slug>-<n>-` önekli olmalı, ortak desenler yalnızca `Temel.astro`'daki tanımlara başvurmalı. 404 ve ana sayfa da bu tanımları içermeli.
4. `prefers-reduced-motion: reduce` açıkken sahne belirme animasyonu ve "Kaydır ↓" zıplaması çalışmamalı.
5. Ana sayfada JavaScript çalışmazsa Günün Mitosu sonsuza kadar boş iskelet kalmamalı. İlk mitosun kapağı görünmeli.

---

### Task 1: Tema, yazı tipleri, ortak SVG tanımları ve `renk` alanının kaldırılması

**Files:**
- Create: `src/lib/kontrast.ts`, `src/components/SvgTanimlari.astro`, `tests/tema.test.ts`, `tests/kontrast.test.ts`
- Modify: `src/styles/tema.css`, `src/layouts/Temel.astro`, `src/lib/mitSemasi.ts`, `src/content/mitler/*.md` (10 dosyadan `renk:` satırı), `src/scripts/anasayfa.ts`, `src/pages/index.astro`, `src/pages/mitler/[slug].astro`, `src/components/KartAkisi.astro`, `src/components/Quiz.astro`, `src/components/BugunBag.astro`, `tests/icerik.test.ts` (gerekirse)

**Interfaces:**
- Produces:
  - `kontrastOrani(onPlan: string, arkaPlan: string): number`. Girdiler `#rrggbb`, çıktı WCAG 2.x oranıdır.
  - CSS token'ları `--zemin`, `--kil`, `--figur`, `--yazi`, `--soluk`, `--vurgu`, `--dogru`, `--yanlis`, `--baslik-font` (Marcellus), `--govde-font` (Inter).
  - `SvgTanimlari.astro` görünmez bir `<svg>` içinde `<pattern id="meander">` tanımlar. Desen yolu mevcut maketteki `M1 21 H21 V3 H6 V15 H15 V9 H10` ile aynıdır. Tanım `Temel.astro`'da `<body>`'nin ilk çocuğudur.

- [ ] **Step 1: Kontrast testini yaz**

```ts
import { describe, expect, it } from 'vitest';
import { kontrastOrani } from '../src/lib/kontrast';

describe('kontrastOrani', () => {
  it('siyah/beyaz 21', () => expect(kontrastOrani('#000000', '#ffffff')).toBeCloseTo(21, 1));
  it('aynı renk 1', () => expect(kontrastOrani('#c8662f', '#c8662f')).toBeCloseTo(1, 5));
  it('sıradan bağımsız', () => expect(kontrastOrani('#121010', '#f1d3bd')).toBeCloseTo(kontrastOrani('#f1d3bd', '#121010'), 5));
});
```

- [ ] **Step 2: Tema testini yaz.** `tests/tema.test.ts`, `src/styles/tema.css` dosyasını okur. `:root` içindeki `--ad: #xxxxxx;` bildirimlerini regex ile bir sözlüğe çıkarır ve şunları doğrular:

```ts
expect(tokenlar['--zemin']).toBe('#121010');
expect(tokenlar['--kil']).toBe('#c8662f');
expect(tokenlar['--yazi']).toBe('#f1d3bd');
expect(tokenlar['--vurgu']).toBe('#d9773f');
expect(kontrastOrani(tokenlar['--yazi'], tokenlar['--zemin'])).toBeGreaterThanOrEqual(4.5);
expect(kontrastOrani(tokenlar['--soluk'], tokenlar['--zemin'])).toBeGreaterThanOrEqual(4.5);
expect(kontrastOrani(tokenlar['--vurgu'], tokenlar['--zemin'])).toBeGreaterThanOrEqual(3);
expect(kontrastOrani(tokenlar['--dogru'], tokenlar['--zemin'])).toBeGreaterThanOrEqual(4.5);
expect(kontrastOrani(tokenlar['--yanlis'], tokenlar['--zemin'])).toBeGreaterThanOrEqual(4.5);
expect(css).not.toMatch(/prefers-color-scheme/);
```

Aynı dosyaya bir test daha eklenir: hiçbir `src/content/mitler/*.md` frontmatter'ında `renk` anahtarı yoktur.

- [ ] **Step 3: Testlerin kırıldığını gör**

Run: `npx vitest run tests/kontrast.test.ts tests/tema.test.ts`
Expected: FAIL. `kontrast` modülü bulunamaz ve token'lar eşleşmez.

- [ ] **Step 4: `kontrastOrani`'yı yaz, `tema.css`'i yeniden yaz**
  - `kontrastOrani` WCAG göreli parlaklık formülünü kullanır (sRGB doğrusallaştırma, `(L1+0.05)/(L2+0.05)`).
  - `tema.css`:
    - Global Constraints'teki token'ları içerir. `--dogru` ve `--yanlis` tonlarını test geçecek şekilde sen seçersin (örnek başlangıç: `#7fc48f` ve `#f08a7e`).
    - `body` zemini `var(--zemin)`, rengi `var(--yazi)`, yazı tipi `var(--govde-font)` olur.
    - `--mit-renk` ve `--mit-yazi` kaldırılır. Bağlantılar `var(--vurgu)` olur.
    - `.kapsayici`, `.gizli` ve reduced-motion bloğu kalır.
    - `.meander-bant` yardımcı sınıfı eklenir: yüksekliği 14px, `fill: url(#meander)` kullanan tam genişlikte bir SVG şeridi.

- [ ] **Step 5: `renk` alanını her yerden kaldır**
  - Şemadan ve 10 md dosyasından silinir.
  - `Temel.astro`'dan `renk` prop'u ve `body style` kaldırılır. Google Fonts bağlantısı `Marcellus&family=Inter:wght@400;500;600` olur. `theme-color` tek değer alır: `#121010`. `<SvgTanimlari />` `<body>`'nin ilk çocuğu olarak eklenir.
  - `anasayfa.ts`'ten `renk` ve `--kutu-renk` kaldırılır.
  - `index.astro`, `[slug].astro`, `KartAkisi.astro`, `Quiz.astro` ve `BugunBag.astro` içindeki `--mit-renk`, `--kutu-renk` ve `--siradaki-renk` kullanımları `var(--vurgu)` ya da `var(--kil)` ile değiştirilir. Bu task'ta görünüm yalnızca derlenebilir ve okunabilir olmalıdır. Asıl düzen Task 3 ve Task 8'de gelir.

- [ ] **Step 6: Doğrula**

Run: `npm test && ASTRO_TELEMETRY_DISABLED=1 npm run build && grep -rn "renk\|Cinzel" src | grep -v "^src/content" ; echo "çıkış: $?"`
Expected: Bütün testler PASS, build başarılı. `grep` hiçbir satır basmaz (çıkış 1).

- [ ] **Step 7: Commit hazırla.** `git add -A`. Kullanıcıya önerilecek mesaj: `feat: vazo teması, ortak svg tanımları, renk alanı kaldırıldı`.

---

### Task 2: Sahne altyapısı: çerçeve, bulucu, figür kütüphanesi çekirdeği, kapsama testi

**Files:**
- Create:
  - `src/sahneler/VazoSahnesi.astro`, `src/sahneler/Sahne.astro`
  - `src/lib/sahneYolu.ts`, `src/lib/romaRakami.ts`
  - `src/sahneler/figurler/*.astro` (çekirdek parçalar)
  - `tests/sahneler.test.ts`, `tests/romaRakami.test.ts`

**Interfaces:**
- Produces:
  - `sahneYolu(slug: string, numara: number): string` → `/src/sahneler/${slug}/${numara}.astro`. Bu, `import.meta.glob` anahtarının biçimidir.
  - `romaRakami(sayi: number): string`, 1..39 aralığında çalışır.
  - `VazoSahnesi.astro`:
    - Props: `{ slug: string; numara: number; sinif?: string }`.
    - Çıktı: `<svg class="vazo-sahnesi {sinif}" viewBox="0 0 400 300" aria-hidden="true" focusable="false" data-sahne={`${slug}-${numara}`}>`.
    - İçerik sırası: kil rengi zemin `rect`, üstte ve altta 14 birimlik meander bandı (`fill="url(#meander)"`), sonra `<slot />`.
  - `Sahne.astro`:
    - Props: `{ slug: string; numara: number; sinif?: string }`.
    - Davranış: `import.meta.glob('/src/sahneler/*/*.astro', { eager: true })` içinden `sahneYolu(slug, numara)` anahtarını alıp `default` bileşenini render eder.
    - Anahtar yoksa içi boş bir `VazoSahnesi` render eder. Bu, sade meander paneli fallback'idir.
  - Figür bileşenlerinin ortak props'u: `{ x: number; y: number; olcek?: number; yon?: 'sag' | 'sol'; durus?: string }`.
    - Her figür `<g transform>` döndürür. Gövde `fill="var(--figur, #121010)"`, kazıma çizgileri `stroke="var(--kil, #c8662f)"`, `fill="none"` olur.
    - Çekirdek parçalar: `Erkek.astro` (duruşlar: ayakta, yuruyen, kosan, diz-cokmus, uzanmis), `Kadin.astro` (aynı duruşlar), `Savasci.astro`, `Kral.astro`, `Kartal.astro`, `Kaya.astro`, `Alev.astro`, `Agac.astro`, `Sutun.astro`, `Dalga.astro`.
    - Bu liste spec'teki başlangıç kütüphanesinin Prometheus için gerekli alt kümesidir. Kalan parçalar (at, yılan, gemi, çiçek, tanrı nitelikleri) gerektiği task'ta eklenir.

- [ ] **Step 1: Testleri yaz.**
  - `tests/romaRakami.test.ts`:
    - `romaRakami(1)` → `'I'`, `4` → `'IV'`, `6` → `'VI'`, `9` → `'IX'`, `10` → `'X'`, `12` → `'XII'`.
    - `romaRakami(0)` hata fırlatır.
  - `tests/sahneler.test.ts`:
    - Testin başında `const cizilenMitler: string[] = []` tanımlanır. Bu task'ta boştur, sonraki task'lar slug ekler.
    - Her `cizilenMitler` slug'ı için `src/sahneler/<slug>/0.astro` ile `1..kartSayisi` dosyalarının hepsi vardır ve fazladan numaralı dosya yoktur.
    - Ayrıca her figür ve sahne `.astro` dosyasında `id="` geçiyorsa değer `^[a-z0-9-]+-\d+-` önekine uyar. Ortak `meander` hariçtir; o yalnızca `SvgTanimlari.astro`'da tanımlıdır.
    - Bir de `sahneYolu('prometheus', 3)` → `'/src/sahneler/prometheus/3.astro'` testi vardır.

- [ ] **Step 2: Kırıldığını gör**

Run: `npx vitest run tests/romaRakami.test.ts tests/sahneler.test.ts`
Expected: FAIL, modüller bulunamaz.

- [ ] **Step 3: `romaRakami`, `sahneYolu`, `VazoSahnesi`, `Sahne` ve çekirdek figürleri yaz.** Figürlerin oranları ve stili `tarz-secenekleri.html` maketindeki Prometheus figürünü temel alır: profil baş, sivri sakal, khiton, adım atan bacaklar, kil renginde kazıma çizgileri. Maket şurada: `/private/tmp/claude-502/-Users-kardelen-ozen-Documents-GitHub-mitolojik-hikayeler/b2feb9f5-d628-4525-9d3b-8069144d4389/scratchpad/tarz-secenekleri.html`. Okunamazsa `Artifact read` ile https://claude.ai/artifact/T8wSBbcqN1S5AjVr7Hycjh adresinden alınır.

- [ ] **Step 4: Doğrula**

Run: `npm test && ASTRO_TELEMETRY_DISABLED=1 npm run build`
Expected: PASS, build başarılı.

- [ ] **Step 5: Commit hazırla.** Mesaj: `feat: sahne altyapısı ve figür kütüphanesi çekirdeği`.

---

### Task 3: Hikâye sayfası yeni düzen ve amblemler

**Files:**
- Create: `src/sahneler/amblemler/Baykus.astro`, `src/sahneler/amblemler/Kandil.astro`, `src/components/MeanderBant.astro`
- Modify: `src/components/KartAkisi.astro`, `src/components/Quiz.astro`, `src/components/BugunBag.astro`, `src/pages/mitler/[slug].astro`, `src/scripts/hikaye.ts`

**Interfaces:**
- Consumes: Task 2'deki `Sahne`, `romaRakami` ve `VazoSahnesi`. Task 1'deki token'lar.
- Produces:
  - `KartAkisi` props'una `slug: string` eklenir.
  - Aktif karta `aktif` sınıfı eklenir. `hikaye.ts` bunu `aktifKart` değişiminde yapar, başka bir mantık değişmez.

- [ ] **Step 1: Kart düzenini uygula.**
  - Her `.kart` iki bölüm içerir: `.sahne-alani` (içinde `<Sahne slug numara={i+1} />`) ve `.metin-paneli` (Roma rakamı + metin).
  - Kapak `numara=0` sahnesini, başlığı, özeti ve süreyi gösterir.
  - Ölçüler:
    - `.sahne-alani` `max-height: 55dvh`, SVG `width:100%; height:100%`, `preserveAspectRatio="xMidYMid meet"`.
    - `@media (max-height: 640px)` altında sahne `40dvh` olur.
    - `.kart` `min-height: 100dvh` kalır, böylece metin uzunsa kart büyür.
  - Belirme efekti `.kart.aktif .vazo-sahnesi` üzerinde 400ms opacity ve `scale(1.02 → 1)` geçişiyle yapılır. `prefers-reduced-motion: reduce` altında geçiş ve `zipla` animasyonu kapanır.
  - Üst çubuk koyu ve yarı saydam olur (`color-mix(in srgb, var(--zemin) 85%, transparent)`). İlerleme dolgusu ve ses düğmesi kenarı `var(--vurgu)` olur.

- [ ] **Step 2: Diğer bölümleri uygula.**
  - `BugunBag`: Kandil amblemi ve meander çerçeve.
  - `Quiz`:
    - Başlıkta baykuş amblemi.
    - Seçilen doğru seçeneğin sonuna görünür bir `✓`, yanlışın sonuna `✗` eklenir. Bu `hikaye.ts` içinde, mevcut `dogru` ve `yanlis` sınıflarının eklendiği yerde yapılır, `aria-hidden` olmayan bir `span` ile.
  - `[slug].astro` son bölümü:
    - Sıradaki mitosun kapağı küçük olarak gösterilir: `<Sahne slug={siradaki.id} numara={0} sinif="kucuk" />`.
    - "Sıradaki mitos →" düğmesi vurgu kenarlı olur.
    - Bölümler arasında `MeanderBant` kullanılır.

- [ ] **Step 3: Doğrula.** Sahne dosyası henüz olmadığı için bütün kartlar fallback paneli göstermelidir.

Run: `npm test && ASTRO_TELEMETRY_DISABLED=1 npm run build && grep -c 'class="vazo-sahnesi' dist/mitler/prometheus/index.html`
Expected: Testler PASS, build başarılı. Sayım 12'dir (kapak, 10 kart ve sıradaki kapak).

- [ ] **Step 4: Commit hazırla.** Mesaj: `feat: hikaye sayfasi vazo duzeni`.

---

### Task 4: Prometheus sahneleri ve galeri. ONAY KAPISI.

**Files:**
- Create: `src/sahneler/prometheus/0.astro` … `10.astro`, gerekirse yeni figür parçaları, `scripts/galeri.mjs`
- Modify: `tests/sahneler.test.ts` (`cizilenMitler`'e `'prometheus'` eklenir)

**Interfaces:**
- Consumes: Task 2'deki figür props'u ve `VazoSahnesi` props'u.
- Produces: `node scripts/galeri.mjs <slug...> --cikti <dosya>`.
  - Okuduğu dosyalar: `dist/mitler/<slug>/index.html` ve bağlı `/_astro/*.css` dosyaları. CSS'leri inline eder.
  - Ürettiği dosya: her slug için kapak ve kartların `390×844` telefon çerçevelerinde yan yana dizildiği tek bir HTML. `SvgTanimlari` içeriği de dosyaya dahil edilir.
  - Script testsizdir, çünkü yalnızca gözden geçirme aracıdır.

- [ ] **Step 1: Kapsama testini kırmızıya çevir.** `cizilenMitler = ['prometheus']`.

Run: `npx vitest run tests/sahneler.test.ts`
Expected: FAIL, `prometheus/0.astro` yok.

- [ ] **Step 2: 11 sahneyi çiz.** Her sahne kendi kartının metnini anlatır. Kapak, maketteki ateşi taşıyan Prometheus'tur. Kurallar Global Constraints'te.

- [ ] **Step 3: Doğrula**

Run: `npm test && ASTRO_TELEMETRY_DISABLED=1 npm run build`
Expected: PASS, build başarılı.

- [ ] **Step 4: Galeriyi üret ve yayımla.**
  - Çalıştır: `node scripts/galeri.mjs prometheus --cikti <scratchpad>/galeri.html`.
  - Çıktıyı Artifact olarak yayımla. Sonraki task'lar aynı `file_path` ile günceller, böylece URL değişmez.

- [ ] **Step 5: DUR. Kullanıcıdan onay al.** İki şey sorulur: görsel kalite ve sahnelerin metinle uyumu. Geri bildirim figür kütüphanesine ve sahnelere işlenir, Step 3–4 tekrarlanır. Onay gelmeden Task 5'e geçilmez.

- [ ] **Step 6: Commit hazırla.** Mesaj: `feat: prometheus sahneleri`.

---

### Task 5: Pandora, Narkissos ve İkaros sahneleri. ONAY KAPISI.

**Files:**
- Create: `src/sahneler/{pandora,narkissos,ikaros}/0..10.astro`, gerekli yeni figürler (örnek: `Kutu`, `Cicek`, `Su`, `Kanat`, `Gunes`)
- Modify: `tests/sahneler.test.ts`

- [ ] **Step 1:** Üç slug'ı `cizilenMitler`'e ekle. `npx vitest run tests/sahneler.test.ts` çalıştır. Beklenen: FAIL.
- [ ] **Step 2:** 33 sahneyi çiz. Metne bağlılık özellikle şu noktalarda kontrol edilir:
  - İkaros'ta kule yoktur, Girit'ten havalanılır.
  - Narkissos'ta su yansıması vardır.
  - Pandora'da çömleğin ya da kutunun kart metnindeki adı kullanılır.
- [ ] **Step 3:** `npm test && ASTRO_TELEMETRY_DISABLED=1 npm run build` çalıştır. Beklenen: PASS.
- [ ] **Step 4:** `node scripts/galeri.mjs prometheus pandora narkissos ikaros --cikti <aynı galeri yolu>` çalıştır ve aynı artifact'ı güncelle.
- [ ] **Step 5: DUR.** Kullanıcı onayı alınır, düzeltmeler yapılır.
- [ ] **Step 6:** Commit hazırla. Mesaj: `feat: pandora, narkissos, ikaros sahneleri`.

---

### Task 6: Akhilleus, Truva Atı ve Perseus sahneleri. ONAY KAPISI.

**Files:**
- Create: `src/sahneler/{akhilleus,truva-ati,perseus-ve-medusa}/…`. Akhilleus 0..9, diğerleri 0..10. Yeni figürler: `At`, `Yilan`, `Gemi`, `TahtaAt`, `Gorgon`, `Pegasos`.
- Modify: `tests/sahneler.test.ts`

- [ ] **Step 1:** Üç slug'ı ekle ve testi çalıştır. Beklenen: FAIL.
- [ ] **Step 2:** 32 sahneyi çiz. Metne bağlılık özellikle şu noktalarda kontrol edilir:
  - Truva'da Laokoon'un uyarısı ve mızrağı, Sinon'dan önceki kartta yer alır. Yılanlar Sinon kartında görünür.
  - Perseus'ta Graialar perilerden önce gelir. Medusa ancak kalkanda yansıma olarak görünür.
  - Kesik baş çantada kalır, kan çizilmez.
- [ ] **Step 3:** `npm test && ASTRO_TELEMETRY_DISABLED=1 npm run build` çalıştır. Beklenen: PASS.
- [ ] **Step 4:** Galeriyi bu üç slug ile güncelle.
- [ ] **Step 5: DUR.** Kullanıcı onayı alınır.
- [ ] **Step 6:** Commit hazırla. Mesaj: `feat: akhilleus, truva, perseus sahneleri`.

---

### Task 7: Orpheus, Persephone ve Sisifos sahneleri. ONAY KAPISI.

**Files:**
- Create: `src/sahneler/{orpheus-ve-eurydike,persephone,sisifos}/0..10.astro`. Yeni figürler: `Lir`, `Kerberos`, `Araba`, `Nar`, `Mesale`, `Tas`.
- Modify: `tests/sahneler.test.ts`. Bu task'ın sonunda `cizilenMitler` sabit liste olmaktan çıkar ve `src/content/mitler` içindeki bütün slug'lar olur.

- [ ] **Step 1:** Listeyi bütün mitlere çevir ve testi çalıştır. Beklenen: FAIL, eksik olan yalnızca bu üç mitostur.
- [ ] **Step 2:** 33 sahneyi çiz. Metne bağlılık:
  - Persephone'de tek bir nar tanesi vardır. Hades'in arabasını kara atlar çeker.
  - Orpheus geriye bakarken Eurydike'nin uzaklaştığı gösterilir.
- [ ] **Step 3:** `npm test && ASTRO_TELEMETRY_DISABLED=1 npm run build` çalıştır. Beklenen: PASS.
- [ ] **Step 4:** Galeriyi bu üç slug ile güncelle.
- [ ] **Step 5: DUR.** Kullanıcı onayı alınır.
- [ ] **Step 6:** Commit hazırla. Mesaj: `feat: orpheus, persephone, sisifos sahneleri`.

---

### Task 8: Ana sayfa, 404 ve favicon

**Files:**
- Create: `src/sahneler/amblemler/Friz.astro`, `src/sahneler/amblemler/Kerberos404.astro`
- Modify: `src/pages/index.astro`, `src/scripts/anasayfa.ts`, `src/pages/404.astro`, `public/favicon.svg`, `src/layouts/Temel.astro`

**Interfaces:**
- Consumes: `Sahne` (numara 0), `MeanderBant`.
- Produces:
  - `Temel.astro`'nun `<head>`'ine tek satırlık bir satır içi script eklenir: `document.documentElement.classList.add('js')`.
  - `anasayfa.ts` kutuya `data-hazir` ekler ve yalnızca `[data-gm-kapak="<slug>"]` görünür kalır.

- [ ] **Step 1: Ana sayfayı uygula.**
  - Başlık meander çerçeveli olur. Altında `Friz` vardır: yürüyen figürler dizisi.
  - Günün Mitosu:
    - Her mitos için `<div data-gm-kapak={slug} hidden={slug !== ilkMit.slug}><Sahne slug numara={0} /></div>` yazılır.
    - CSS kuralı `.js [data-gunun-mitosu]:not([data-hazir]) > *` iskelet görünümü verir, yani içerik görünmez ve kil tonunda bir kutu kalır.
    - JavaScript yoksa ilk mitos görünür kalır.
  - `anasayfa.ts`'te `gununMitosunuGoster` güncellenir. Seçilen slug'ın kapağı gösterilir, diğerleri `hidden` olur, sonra `data-hazir` konur.
  - Liste: her satırda kare kırpılmış kapak bulunur (`<Sahne … sinif="kucuk-resim" />`, CSS `aspect-ratio:1; object-fit` yerine SVG `preserveAspectRatio="xMidYMid slice"`).
  - Çipler vazo kenarlı olur.

- [ ] **Step 2: 404 ve favicon.**
  - 404: Kerberos ve kapı sahnesi, metin aynen kalır.
  - Favicon: siyah figür amfora, kil zemin üzerinde.

- [ ] **Step 3: Doğrula**

Run: `npm test && ASTRO_TELEMETRY_DISABLED=1 npm run build && grep -c 'data-gm-kapak' dist/index.html && grep -c 'vazo-sahnesi' dist/404.html`
Expected: Testler PASS. İlk sayım 10, ikinci sayım ≥1.

- [ ] **Step 4:** Galeriye ana sayfa ve 404'ü ekleyip güncelle. Commit hazırla. Mesaj: `feat: ana sayfa, 404 ve favicon vazo tasarimi`.

---

### Task 9: Boyut bütçesi testi ve CI sırası

**Files:**
- Create: `tests/boyut.test.ts`
- Modify: `.github/workflows/azure-static-web-apps.yml` (build `npm test`'ten önce çalışır), `README.md` (yeni mitos eklerken sahne dosyalarının da gerektiği eklenir)

- [ ] **Step 1: Testi yaz.**
  - `dist` yoksa test şu mesajla FAIL eder: `"Önce npm run build çalıştır"`. Sessizce atlamaz.
  - `dist/index.html` ve her `dist/mitler/*/index.html` için `Buffer.byteLength ≤ 200 * 1024` kontrol edilir.
  - Her `<svg class="vazo-sahnesi…">…</svg>` parçası ≤ 10 * 1024 bayt olmalıdır. Parçalar regex ile `</svg>`'ye kadar alınır. Sahne içinde iç içe `svg` kullanılmaz.

- [ ] **Step 2: Bütçeyi bilerek aşarak kırmızıyı gör.**
  - Geçici olarak bir sahneye 11 KB'lık bir `<path>` ekle, build al ve `npx vitest run tests/boyut.test.ts` çalıştır. Beklenen: FAIL.
  - Ekleneni geri al.

- [ ] **Step 3: Doğrula ve CI sırasını değiştir.** Workflow'da build adımı `npm test`'ten önce çalışır.

Run: `ASTRO_TELEMETRY_DISABLED=1 npm run build && npm test`
Expected: Bütün testler PASS. Bütçe aşılırsa en büyük sahneler sadeleştirilir.

- [ ] **Step 4:** Commit hazırla. Mesaj: `test: boyut butcesi, ci sirasi`.
