# Sade tasarım, logolar ve metin düzeltmesi

4 Kasım 2026. Kullanıcı logoların eklenmesini, bütün metinlerin yüklediği üslup kılavuzuna göre yazılmasını, sitenin sade görünmesini ve proje e-postasının kaldırılmasını istedi.

## Logolar

- Kılavuzun işaret ettiği `turkce-arayuz-uslubu` skill dosyası bu oturumda yoktu. Yüklenen `USLUP_KILAVUZU.md` esas alındı.
- `www.ostimteknik.edu.tr`, `www.ostimvakfi.com`, BinBin ve Sustain Bridge siteleri oturumun ağ ayarlarında izinli değildi (proxy 403, WebFetch ENOTFOUND). Proxy kuralı gereği engelin etrafından dolaşılmadı.
- Depodaki COP31 broşür görselinden iki logo kırpıldı ve arka planı şeffaf yapıldı: `web/src/about/assets/logo-ostim-teknik.png`, `logo-cop31.png`. Kaynak görsel artık kullanılmadığı için silindi.
- Kullanım yerleri: üst bilgi (üniversite), Kurumlar sayfası (üniversite), ana sayfa COP31 bölümü ve alt bilgi (COP31).
- Kaynak broşür görseli düşük çözünürlüklü ve sıkıştırılmış. Kurumların resmî vektör logoları gelirse aynı dosya adlarıyla değiştirilmeli.

## Sadeleştirme

- Boş alanlar, “—” işaretleri, “Teyit bekleniyor” etiketleri, logo yer tutucuları, sunum/video hazırlık kartları ve pilot/karbon bilgi alanları kaldırıldı. Bilgi geldiğinde ilgili kayıt dolunca görünür.
- Sayfa üstündeki kurum etiketi, bölüm içi gezinmeler, ana sayfadaki etiket şeridi ve “Proje dosyası” bağlantı ızgarası, sayfa sonu tekrar bağlantıları ve kayan “Başa dön” düğmesi kaldırıldı.
- Üst bilgideki uzun sentetik veri notu yalnız ekran okuyucuya okunur. Görünür not demo düğmesinin yanında, ana sayfada ve demo sayfasında durur.
- Altı stil dosyası tek `site.css` dosyasında toplandı. İç sayfalar aynı iki sütunlu düzeni kullanır.
- Masaüstü 1280 px sayfa boyları (önce → sonra): ana sayfa 3679 → 2137, kurumlar 2265 → 1173, ekip 1405 → 949, proje 4987 → 3958, demo 4467 → 1713, karbon 3295 → 2122, iş birliği 2624 → 1843. Ayrıntı: [sayfa-yukseklikleri.json](sayfa-yukseklikleri.json).

## Metinler

- Tanıtımın bütün TR/EN metinleri, form iletileri, 404 sayfası, demo rehberi, demo uyarıları ve bakım önerileri yeniden yazıldı.
- Uygulanan kurallar: noktalı virgül ve iki nokta yok, cümle bağlayan tire yok, parantez içi açıklama yok, büyük harfle vurgu yok, slogan ve yumuşatma yok, Türkçe yönergelerde “-iniz”. İçerik dosyaları bu kurallara karşı otomatik tarandı. Kalan iki eşleşme telefon için izin verilen karakterlerin listesidir.
- Bakım önerileri veri dosyalarına yazıldığı için `DATA_VERSION` 2.1.0 yapıldı ve veri yeniden üretildi. Hesaplar ve eşikler değişmedi.
- Demo ekran görüntüleri yeni metinlerle yeniden çekildi. Telemetri ve pasaport görüntüleri artık ilgili sekmeyi gösterir.

## Proje e-postası

`TEAM_EMAIL`, `CONTACTS`, `mailtoAll`, alt bilgideki e-posta sütunu ve iş birliği sayfasındaki e-posta alanı kaldırıldı. İletişim yalnız form ile yapılır. Formun alıcı adresi Vercel ortam değişkenindedir ve sitede gösterilmez.

## Kontroller

- `npm run build`, `npm run lint`, `npm test` 18/18.
- 8 adres × EN/TR × 360/768/1440 px = 48 durum: tek h1, doğru dil, yatay taşma ve bozuk görsel yok. 22 iç bağlantı 200. Konsolda error/warn yok.
- Pasaport bağlantısı, bilinmeyen kimlik bildirimi ve 404 sayfası tekrar denendi.
- Form kapalıyken gönderim yok. Açık deneme derlemesinde doğrulama özeti, canlı hatalar, sunucu alan hatası, bağlantı hatası, gönderiliyor, başarı ve sıfırlama tekrar denendi.
- Mobil üst bilgide proje adı 390 px'te iki satıra iner, 320 px'te taşma yok.
- Ekranlar: [ana sayfa](ana-sayfa-tr.jpg), [kurumlar](kurumlar-tr.jpg), [mobil ana sayfa](ana-sayfa-mobil-en.jpg). [Kontrol betiği](kontrol.cjs).
