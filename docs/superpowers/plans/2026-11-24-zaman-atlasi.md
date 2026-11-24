# Zaman Atlası Implementation Plan

**Goal:** `/kronoloji` sayfasında etkileşimli zaman atlası.
**Architecture:** JSON + zod → saf TypeScript sorguları → derlemede üretilen Astro bileşenleri → görünürlüğü yöneten istemci betiği.
**Tech Stack:** Astro 7, TypeScript, vitest; yeni bağımlılık yok.
**Spec:** `docs/superpowers/specs/2026-11-24-zaman-atlasi-design.md`

## Global Constraints
- Kodda yorum yok. Commit yapılmaz.
- Tek tema; `tema.css` değişkenleri kullanılır, `prefers-color-scheme` eklenmez.
- Sıfır yılı yok. Aralık -3500 … 500.

## Review Focus
- `?yil=0`, `?yil=abc`, `?kayit=yok` → varsayılanla hatasız açılır.
- MÖ 1'den bir ileri → MS 1.
- Kommagene MS 20 → eş zamanlı listede yok; MS 40 → var.
- Hiç sonuç vermeyen arama → boş durum mesajı.
- Türkçe harf farkı (`sumer`, `HİTİT`) → aynı sonuç.

## Görevler
- [x] 1. `src/lib/zamanAtlasi/yil.ts` — `koordinat`, `yilaCevir`, `gecerliYil`, `yilKaydir`, `yilYaz`, `aralikYaz`, `eksenIsaretleri`. Test: `tests/zamanAtlasiYil.test.ts`.
- [x] 2. `sema.ts`, `bolgeler.ts`, JSON verisi, `veri.ts`. Test: `tests/zamanAtlasiVerisi.test.ts` (şema, tekil kimlik, bağlantılar, dönem sırası, olayın uygarlık dönemine düşmesi, kaynakça, kontrast).
- [x] 3. `sorgu.ts` — `kayitlariDizinle`, `yilKesiti`, `bolgeBosluklari`, `gorunum`; `adres.ts` — `adresiOku`, `adresYaz`. Test: `tests/zamanAtlasiSorgu.test.ts`.
- [x] 4. `src/components/zamanAtlasi/*.astro`, `src/pages/kronoloji.astro`, `src/scripts/zamanAtlasi.ts`.
- [x] 5. Menü, sitemap, site araması, README.
- [x] 6. `npm test`, `npm run build`, `astro check` eşdeğeri `tsc --noEmit`, tarayıcıda masaüstü ve mobil doğrulama.
