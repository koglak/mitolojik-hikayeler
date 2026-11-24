# Sanat Eserleri Implementation Plan

**Goal:** `/sanat-eserleri/` galerisi, 40 eser sayfası, müze haritası ve iki yönlü bağlantılar.
**Architecture:** `sanat` içerik koleksiyonu + `muzeler.json` → saf TypeScript yardımcıları → Astro sayfaları → süzmeyi yöneten istemci betiği. Fotoğraflar `src/assets/sanat` altından isteğe bağlı okunur.
**Tech Stack:** Astro 7, TypeScript, zod, Leaflet, sharp, vitest; yeni bağımlılık yok.
**Spec:** `docs/superpowers/specs/2026-11-24-sanat-eserleri-design.md`

## Global Constraints

- Kodda yorum yok. Kullanıcı istemeden commit yapılmaz.
- Koleksiyon adı `sanat`, adres `/sanat-eserleri/<slug>/`.
- Türler: `heykel`, `resim`, `kabartma`, `mimari`, `mozaik`, `fresk`, `vazo`, `maden`.
- Lisanslar: kamu malı, CC0, CC BY, CC BY-SA. NC ve ND reddedilir.
- Gövdede `## Anlattığı hikâye` ve `## Eserin öyküsü` zorunlu.
- Tek tema; yalnızca `tema.css` değişkenleri.
- Komutlar depo kökünden çalışır.

## Review Focus

- Fotoğrafı olmayan eser → simgeyle hatasız derlenir.
- Tür ve müze süzgeci birlikte sonuç vermezse → boş durum metni ve boş harita, hata yok.
- Türkçe harf farkı (`LAOKOON`, `cingene kizi`) → aynı sonuç.
- Aynı müzede birden çok eser → haritada tek işaret, içinde hepsi.
- Commons lisansı `CC BY-NC` ya da boş → betik o eseri atlar ve bildirir.

## Görevler

- [x] 1. **Veri modeli.** `src/lib/sanat.ts`: `sanatTurleri`, `sanatAdresi`, `sanatEserAdresi(kimlik)`, `lisansKabul(lisans: string): boolean`. `src/lib/sanatSemasi.ts`: `sanatSemasi`, `muzeSemasi`. `src/content.config.ts`: `sanat`. Test: `tests/sanat.test.ts` — `lisansKabul('CC BY-SA 4.0')` ve `'Public domain'` doğru, `'CC BY-NC 4.0'`, `'CC BY-ND 2.0'` ve `''` yanlış.
- [x] 2. **Saf yardımcılar.** `src/lib/sanatSorgu.ts`: `sanatSuz(ogeler, { aranan, tur, muze })`, `muzelereGrupla(eserler, muzeler)`, `ilgiliEserler(eserler, alan, kimlik)`. Aynı test dosyası: birleşik süzme, boş sonuç, Türkçe harf, tek müze iki eser, ters bağ.
- [x] 3. **İçerik.** `src/data/muzeler.json` ve `src/content/sanat/*.md` (40). Test: `tests/sanatVerisi.test.ts` — şema, tam 40 eser, tekrarsız `sira`, geçerli müze ve ilgili kimlikler, zorunlu başlıklar, kullanılmayan müze yok, görsel dosyası ile `gorsel` alanı eşleşiyor.
- [x] 4. **Sayfalar.** `src/components/SanatKarti.astro`, `SanatGorseli.astro`, `SanatSimgesi.astro`, `MuzeHaritasi.astro`, `SanattaBolumu.astro`; `src/pages/sanat-eserleri/index.astro` ve `[slug].astro`; `src/scripts/sanat.ts`.
- [x] 5. **Siteye bağlama.** Menü, ana sayfa kutusu, arama, site haritası, `sanatEseriVerisi` yapısal verisi (test: `tests/yapisalVeri.test.ts`), `/paylasim/sanat/<slug>.jpg`, `Temel.astro` içinde uzantıdan `og:image:type`, mit ve kayıt sayfalarında "Sanatta", README.
- [x] 6. **Fotoğraf betiği.** `scripts/sanat-gorselleri.mjs` ve `scripts/sanat-gorsel-listesi.json`; kullanıcı çalıştırır. Test: lisans reddi ve `gorsel` bloğunun ön bilgiye yazılması ağsız denenir.
- [x] 7. **Doğrulama.** `npm test`, `npm run build`, `tsc --noEmit`; ekran görüntüsü alınamadı (sandbox), gözle denetim kullanıcıda.
