# Antik Dünya Zaman Atlası — tasarım

Onay: 2026-11-24, sohbette. Referans: `prototypes/chronology.html`.

## Amaç
`/kronoloji` adresinde MÖ 3500 – MS 500 arası etkileşimli çizelge. Temel soru: "Bu yıl kimler vardı, ne oluyordu?" Anadolu merkezli; Mezopotamya, Ege, Mısır, İran ve Akdeniz ile birlikte.

## Kapsam dışı
Backend, yeni bağımlılık, harita, prototip dışı yeni kayıt. Eski `src/lib/kronoloji.ts` değişmez.

## Yaklaşımlar
- **A (seçilen):** Satırlar ve detaylar derlemede HTML olur, TypeScript yalnızca görünürlüğü ve durumu yönetir. `soyagaci` düzenine uyar; JS'siz okunur.
- B: İstemcide SVG. Erişilebilirlik ve SEO zayıf.
- C: Her kayda Markdown sayfası. Yaklaşık 100 ince sayfa üretir.

## Veri
- `src/data/zaman-atlasi/{uygarliklar,hukumdarlar,olaylar,kaynaklar}.json`, zod şemasıyla doğrulanır.
- Her kayıtta: `kimlik`, `ad`, `ozet`, `iliskiliUygarliklar`, `kaynakca`, `dogrulama`, `baglantilar` (mitler, kentler, tanrılar, kahramanlar, eserler).
- `kesinlik` tarihin güvenilirliğidir: kesin, yaklasik, tartismali, geleneksel. `nitelik` kaydın doğasıdır: tarihsel, tartismali, mitolojik. İşaret `nitelik`ten gelir.
- `donemler` bir listedir; kesintili siyasi dönemler böyle tutulur.
- Yıllar tarihsel yazılır (`-1274`, `72`), `0` geçersizdir. Hesap `koordinat(yil)` ile astronomik yılda yapılır.
- Çizelge sınırını aşan dönemler gerçek yıllarıyla tutulur ve görüntüde kırpılır (Uruk başlangıcı, Sasani ve Doğu Roma bitişi).
- Devletlerde isteğe bağlı `harita` alanı: merkez konumu ve döneme bağlı sınır kimlikleri.

## Davranış
- Dönem, bölge, katman ve metin süzgeçleri birlikte çalışır. Arama açıkken gruplar açık gösterilir.
- Yıl; sürgü, adım düğmeleri, hızlı duraklar ya da çizelgeye tıklayarak seçilir. Eş zamanlı panel bölgelere göre gruplanır; kaydı olmayan bölge "kayıt yok" der.
- Olay işareti, uygarlığının satırındadır. Arama açıkken ya da uygarlık satırı gizliyken kendi satırında görünür.
- Adres: `?yil=-1274&kayit=kades-savasi`. Bozuk değerler yok sayılır.
- `zamanatlasi:yil` olayı `{ yil, kesit }` taşır; gelecekteki harita bunu dinler.
- Mobil: ad sütunu sabit, çizelge yatay kayar, detay alttan panel.

## Yapan kararı
Bölge renkleri, boşluklar, satır yükseklikleri, menü eşiği.
