# Son düzeltmeler ve kullanıcı incelemesine hazırlık

4 Kasım 2026. Kullanıcı bağımsız incelemede bulunan sorunların giderilmesini, son kontrolleri ve kendi incelemesine sunulmasını istedi. Yerel üretim önizlemesi: `http://127.0.0.1:4173/hakkimizda/?lang=tr`. Commit, push veya yayın yapılmadı.

## Yapılan düzeltmeler

- **UX-06:** `SiteLayout` artık genel `#main`/`#top` hedeflerinin bütün alt `details` öğelerini açmaz. Yalnız doğrudan hedeflenen details, görünür olması için gereken ataları ve açıkça `data-hash-disclosure` ile ilişkilendirilmiş teknik bölümün doğrudan disclosure'ı açılır. Ekip profillerinin kullanıcının seçtiği durumu korunur.
- **UX-09:** Ana sayfada altı adımlı akış kısa tutuldu; ayrıntıları proje sayfasında kaldı. BMS/IoT açılımı görünür tutuldu. Tam ekip listesi ekip sayfasında; ana sayfada kısa tanıtım ve koordinatör bağlantısı kaldı. Sayfa sonu gezinmesi açıklamaları tekrar etmeyen kısa bağlantılara dönüştü.
- **Proje:** Pasaportun model/tekil batarya ayrımı görünür; kimlik, erişim ve yaşam döngüsü ayrıntıları tek bir yerel disclosure içinde. İç içe erişim ayrıntısına doğrudan adres verilince gerekli ataları açılır. Teknik içerik silinmedi.
- **Karbon:** Zorunlu üst uyarı, beklenen etkiler, göstergeler, yöntem ve sınırlar görünür kaldı. Henüz sağlanmamış on ölçüm/kaynak alanı, durum açıklaması görünür olan bir disclosure içinde toplandı. Bölüm adresi bunu doğrudan açar. Boş değerler doldurulmadı.
- **Stil bakımı:** `technical.css`, `organizations.css`, `showcase.css` içinde aynı seçiciye ait temel tanımlar birleştirildi ve ekran genişliği farkları ayrı kurallarda toplandı. Eski lime/dark adlandırmaları yerine `--accent-soft` ve tek `button-primary` kullanıldı; aynı görünen gereksiz DemoAccess varyantı kaldırıldı. Kurumlar ve demo tanıtımında 360/768/1440px hesaplanan stil karşılaştırmasında fark yok.

Renk/font yönü bu turda yeniden değiştirilmedi. Önceki görsel uygulama korunarak saptanan davranış, yoğunluk ve bakım sorunları ele alındı.

## Son kontroller

| Kontrol | Sonuç |
| --- | --- |
| Node 22.23.1, TypeScript / üretim derlemesi | `npm run build --prefix web` geçti; `tsc -b && vite build`. Veri güncel, üretim atlandı. |
| Lint | `npm run lint --prefix web` geçti. |
| Veri / yerelleştirme | `node --import tsx --test scripts/verify-data.test.ts`, 11/11 geçti. |
| Koruma | Veri/hesaplama betikleri, ortak veri kaynakları, kişi/kurum/pilot kayıtları için görev öncesi kaydedilen 11 dosyanın SHA-256 özetleri aynı. |
| Yerleşim | [80 durum](yerlesim.json): sekiz adres × TR/EN × 320/360/768/1024/1440px. Yatay taşma, eksik yerel hash hedefi, eksik img alt özniteliği veya h1/main sayısı hatası yok. |
| Hash regresyonu | [Etkileşim](etkilesim.json): iki dilde skip link kapalı alanları kapalı tutar; Başa dön Gizem profilini korur; yöntem bağlantısı yalnız ilgili alanı açar. Soğuk yükleme ve dil değişiminde iç içe pasaport hedefinin yalnız gerekli ataları açılır. Geri/ileri URL'leri korunur. |
| Demo | Mobil ayrıntıda `panel-title` odağı, sağ okla Telemetri sekmesi ve filoya dönüşte aynı batarya/arama doğrulandı. |
| Rehber | [32 adım](rehber-adimlari.json): 390/1440px × TR/EN × sekiz adım. Taşma yok; dört bitişte odak `guide-trigger`. 844×390 rehber normal sayfa akışında, veri üzerine binmiyor. |
| Galeri | [Sonuç](galeri.json): üç TR görseli yüklenir; pasaport görseli yeni sekmede 1425×990 açıldı. |
| Stil karşılaştırması | [Altı durum](stil-karsilastirma.json): kurumlar/demo × üç genişlik, aynı DOM öğelerinin hesaplanan font/renk/dolgu/çizgi/grid vb. değerlerinde fark yok. |
| Konsol | [Yakalanan error/warn](tarayici-gunlugu.json): boş. |
| Kaynak kontrolü | `git diff --check` ve yerel belge bağlantıları kontrol edildi. |

İlk sandbox build denemesi tsx IPC soketi kısıtına takılmadı; build bu ortam için gereken yerel izinle çalıştırıldı. Sonuçlar son derlenmiş sürüme aittir. Önceki raporların testleri bu turdaki sayılara eklenmedi.

## Mobil okuma yükündeki değişim

360×900, TR, kapalı başlangıç durumları:

| Sayfa | Düzeltme öncesi bağımsız kontrol | Son sürüm | Azalma |
| --- | ---: | ---: | ---: |
| Ana sayfa | 6305px | 5489px | yaklaşık %13 |
| Proje | 9657px | 8703px | yaklaşık %10 |
| Karbon | 6526px | 5970px | yaklaşık %9 |

Yazılar küçültülmedi. Ayrıntılar açıldığında sayfa doğal olarak uzar. Proje sayfası teknik kapsamı nedeniyle hâlâ uzundur; kullanıcı ayrıntılara bölüm bağlantıları ve disclosure'larla ulaşabilir. Başlangıç yüksekliği tek başına kullanılabilirlik kabul ölçütü değildir.

## İnceleme durumu ve açık teslimler

- UX-06 yerelde giderildi ve tekrar üretim adımları geçti.
- UX-09 için gereksiz tekrarlar azaltıldı ve özet/ayrıntı ayrımı uygulandı; görsel son kabul kullanıcıya sunuluyor.
- UX-05/10 için kod/DOM/klavye kontrolleri mevcut. Gerçek OS Reduce Motion ve VoiceOver/NVDA/TalkBack duyuru/okuma sırası testi bu ortamda yapılmadı; bu iki madde tam kabul olarak kapatılmadı. Gerçek cihaz dokunması, yüzde 200 büyütme ve farklı motorlarda kabul de açık.
- Bilinmeyen ekip/kurum bilgileri ve pilot/karbon kayıtları boş. Gerçek e-posta, teyit/izinler, PDF/video teslimleri bekliyor. Form kullanıcının arkadaşına bırakıldığı için başlatılmadı.
- Faz 1–5 boş alanlı arayüz kapsamıyla hazır. Faz 6 bekliyor. Faz 7'nin yerel kod/yerleşim/etkileşim kontrolleri ilerledi; eksik teslimler ve yayın kabulü tamamlanmış sayılmadı.

Ekranlar: [kısaltılmış ana sayfa akışı](ana-sayfa-akis.png), [tam ana sayfa](ana-sayfa-tam.png), [pasaport özeti](pasaport-ozet.png), [mobil giriş](ana-mobil.png), [yatay rehber](rehber-yatay.png). Kullanıcıya bırakılan tarayıcı ana sayfada; geçici viewport sıfırlandı, testte açılan görsel sekmesi kapatıldı.
