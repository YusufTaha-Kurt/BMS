# Faz 1 — Ortak site düzeni

Tarih: 4 Kasım 2026. Başlangıç sürümü: `02ea760`. Değişiklikler yereldir; GitHub'a gönderilmedi, Vercel'e yayımlanmadı.

## Kapsam

- `/hakkimizda/` ve altındaki `kurumlar/`, `ekip/`, `proje/`, `demo/`, `karbon/`, `iletisim/` adresleri ayrı HTML girişleri olarak üretildi. Hepsi ortak React girişi, üstbilgi, altbilgi ve EN/TR altyapısını kullanır.
- Mevcut ana sayfa içeriği ve satır içinde genişleyen ekip profilleri korundu. Altı yeni sayfada iki dilli başlık, açıklama ve hazırlık durumu var; demo tanıtım sayfasından çalışan demoya erişilebilir.
- Aktif sayfa göstergesi, mobil menü, klavye/Escape davranışı, içeriğe atlama, sayfa metaverileri, ortak butonlar ve sabit içerik güncelleme tarihi eklendi. Ortak metinler ayrı EN/TR dosyalarındadır.
- Demo açılışları yeni sekmededir; dil tercihi taşınır. Bağlantının yanındaki sentetik veri notu ekran okuyucu için de bağlantıyla ilişkilidir.

## Kaynaklar

- `WEB_SITESI_FAZ_PLANI.md` — GitHub'daki sürümle karşılaştırıldı.
- `COP31_Web_Sitesi_Brief_BinBin.pdf` — yerel Downloads dosyası; özellikle PDF s. 2–3 ve 11, ayrıca yedi sayfanın amaçları.
- `BinBin_Proje_Teklifi.pdf` — COP31 klasöründeki teklif; kapak, kullanım notu ve proje özeti.

Kaynak PDF'ler bu çalışmada yayımlanmadı veya depoya kopyalanmadı.

## Doğrulamalar

Başlangıçta mevcut üretim derlemesi ve lint geçti; tanıtımın EN/TR geçişi ve mobil demoya erişim tarayıcıda görüldü. Son kontroller:

| Kontrol | Sonuç |
|---|---|
| `npm run build` — TypeScript ve Vite üretim çıktısı | Geçti |
| `npm run lint` | Geçti |
| `git diff --check` | Geçti |
| Demo + 7 tanıtım HTML dosyası ve HTML'nin referans verdiği yerel betik/stil dosyaları | Mevcut |
| 360 / 768 / 1440 px × EN/TR × 7 sayfa | 42/42 geçti |
| Her sayfada EN→TR ve TR→EN, adresin aynı kalması | 14/14 geçti |
| Her alt sayfa dahil TR seçimiyle yenileme | 7/7 geçti |
| İlk ziyaret, açık URL tercihi, kayıtlı tercih, depolama kullanılamaması ve adres çözümleme | 11 davranış doğrulaması geçti |
| Mobil menü: Enter ile açma, Tab ile ilk bağlantı, Escape ile kapanma ve düğmeye odak dönüşü | Geçti |
| Menü bağlantısıyla gezinme ve yeni sayfada kapalı menü | Geçti |
| Tablet menüsünün iki sütunda açılması ve masaüstüne geçince kapanması | Geçti |
| Dil tercihi değiştirildikten sonra `?lang=` içermeyen başka sayfada tercihin korunması | Geçti |
| İçeriğe atlama bağlantısının `main` alanını odaklaması | Geçti |
| Tanıtım → yeni sekmede TR demo → 8 rehber adımı → TR tanıtıma dönüş | Geçti |
| Üretim önizlemesi konsolu | Hata/uyarı görülmedi |

42 sayfalık matriste doğru dil, tek `h1`, yedi menü bağlantısı, doğru aktif adres ve yatay taşma olmaması kontrol edildi. Masaüstünde ayrıca demo bağlantılarının hedefi/dili, metaveriler, kayıtlı güncelleme tarihi ve boş e-posta bağlantısı bulunmaması doğrulandı. Telefon/tablette kapalı menünün erişilebilirlik ağacından gizlenmesi ve menü düğmesinin görünürlüğü kontrol edildi.

Kontroller canlı siteye karşı değil, `http://127.0.0.1:4173` üretim önizlemesine karşı yapıldı. Tarayıcı matrisi ve dil geçişlerinin ayrıntıları [sayfa-kontrolleri.json](sayfa-kontrolleri.json) dosyasındadır. Başlangıç ortamı Node 25.2.1 / npm 11.7.0; son derleme/lint ayrıca projenin sabitlenmiş Node 22.23.1 / npm 10.9.8 ortamında çalıştırıldı. Bağımlılık eklenmedi veya kilit dosyası değiştirilmedi.

## Görsel kanıtlar

- [Masaüstü ana sayfa — EN](masaustu-ana-sayfa-en.jpg)
- [Mobil menü — TR](mobil-menu-tr.jpg)
- [Mobil demo tanıtımı ve altbilgi — TR](mobil-demo-tr.jpg)

## Kalan dış teslimler

- Kurumsal proje e-postası henüz verilmedi; altbilgide **Hazırlanıyor** gösteriliyor. Boş `mailto:` yok.
- Logo ve kişi yayın izinlerinin durumu henüz belgelenmedi. Yeni tanıtım üstbilgisi kurum adını metin olarak kullanıyor. Mevcut demo logosu bu fazda değiştirilmedi.
- Ayrıntılı sayfa içerikleri, sunum/video ve iletişim formu Faz 2–6 kapsamındadır. Form veya başvuru toplama eklenmedi.
- Yayın öncesi onay/izin listesi ve canlı Vercel doğrulaması Faz 7 kapsamındadır.

Faz 1 ortak altyapısı yerel olarak tamamlandı. Bu kayıt diğer fazların veya yayın hazırlığının tamamlandığı anlamına gelmez.
