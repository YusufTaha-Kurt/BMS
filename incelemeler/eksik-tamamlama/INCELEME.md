# Durum analizi ve kalan teknik eksiklerin tamamlanması

4 Kasım 2026. Kullanıcı projenin güncel durumunun belirlenmesini ve kalan eksiklerin tamamlanmasını istedi; son düzenleme kullanıcıyla birlikte yapılacak.

## Analiz sonucu

- Başlangıç: `main` ile aynı (`681573c`). Temiz kurulumda (`npm ci`, Node 22) build, TypeScript, lint ve 11 veri testi geçti.
- Faz 1–5 boş alanlı arayüz kapsamında hazır; yayın yapılmış. Kalanlar iki gruptur:
  - **Dış teslimlere bağlı (uydurulmadı):** ekip/kurum/iş birliği içerikleri, e-posta, logolar ve izinler, pilot/karbon ölçümleri, sunum PDF'i/video. Ayrıntılı liste: [YAYIN_KONTROL_LISTESI.md](../../YAYIN_KONTROL_LISTESI.md).
  - **Faz 6 formu:** kullanıcı kararıyla arkadaşına bırakıldı; bu turda başlatılmadı.
- Kodla kapatılabilen eksikler:
  1. MVP planı Aşama 6/7: “500 pasaport yolu ve QR; olmayan kimlik açıklayıcı hata verir; doğrudan açılış/yenileme”. Demoda seçili batarya/senaryo/gün adrese yazılmıyordu; pasaport paylaşılamıyordu.
  2. Faz 7 / Aşama 7: bilinmeyen adresler için 404 sayfası yoktu (Vercel'in genel sayfası çıkıyordu).
  3. Faz 7: izin durum listesi, teslim bağlantıları ve nihai kontrol listesi tek belgede değildi.

## Yapılanlar

- **Paylaşılabilir demo görünümü:** `?battery=…&scenario=…&day=…&tab=…` ilk açılışta okunur; sonraki seçimler `replaceState` ile adrese yazılır. Varsayılan değerler yazılmaz, `lang` korunur; demo kökü `/` ve basılı QR değişmez. Mantık `web/shared/view.ts` içinde, tarayıcı adresi `web/src/lib/viewUrl.ts` içindedir.
- **Pasaport bağlantısı ve QR:** Pasaport sekmesinin altında aynı senaryo/günü açan adres, 104 px QR ve kopyala düğmesi. Yerel kopyada da yayındaki adresi üretir. Metin, kaydın sentetik olduğunu ve kayıtlı AB pasaportu olmadığını belirtir.
- **Bilinmeyen kimlik:** Filoda olmayan kimlik (ör. `BT-99999`) için geçerli aralığı söyleyen, kapatılabilir bildirim; varsayılan batarya açılır. Küçük harf kabul edilir. Kimlik listesi üretici ile aynı `batteryIds()` fonksiyonundan gelir (`web/shared/config.ts`); veri içeriği ve `contentHash` değişmedi.
- **Mobil:** Adres bir görünüm istiyorsa 1280 px altında doğrudan Batarya ayrıntısı açılır.
- **404:** `web/public/404.html` — iki dilli, bağımsız (JS olmadan da bağlantılar çalışır), tanıtımın kâğıt/bordo kimliğinde; tanıtım, demo ve iletişim bağlantıları seçilen dili taşır. `noindex`.
- **Test:** 12. veri testi eklendi: 500 kimliğin tamamı çözülür ve geçmiş dosyasıyla eşleşir; sınır dışı/yanlış biçimli kimlikler reddedilir; varsayılan görünüm adrese yazılmaz; senaryo yalnız verilince hedef batarya ve odak günü açılır; geçersiz değerler varsayılana döner.

## Kontroller

- `npm run build`, `npm run lint`, `npm run verify:data` → 12/12 geçti.
- Yerel üretim önizlemesinde ([kontrol betiği](kontrol.cjs), Chromium):
  - `/?lang=tr` adresi temiz kalır.
  - `?battery=DEMO-001&scenario=temp-drift&day=20&tab=passport` → başlık `DEMO-001`, Pasaport sekmesi seçili, karşılaştırma açık; pasaport adresi ve panoya kopyalanan değer `https://binbin-battery-intelligence.vercel.app/?lang=tr&battery=DEMO-001&scenario=temp-drift&day=20&tab=passport`.
  - Geçmiş sekmesine geçince `tab` adresten kalkar; Sıfırla tüm görünüm parametrelerini temizler.
  - `?battery=BT-99999` → bildirim gösterilir, adres `?lang=en` olur, kapat düğmesi çalışır.
  - 390 px'te pasaport adresi doğrudan ayrıntıyı açar; yatay taşma 0.
  - 404 sayfası TR/EN başlık ve dil taşıyan bağlantılar; 390 px'te taşma 0.
  - Tanıtım sayfaları açılıyor; konsolda error/warn yok.
- Ekranlar: [pasaport bağlantısı](pasaport-baglanti-tr.png), [mobil pasaport](pasaport-mobil-tr.png), [bilinmeyen kimlik](bilinmeyen-kimlik-en.png), [404 mobil](404-mobil-en.png).

## Açık kalanlar

- Bu sürüm henüz Vercel'e yayımlanmadı; canlıda pasaport bağlantısı, 404 davranışı ve telefonla QR okutma yayından sonra kontrol edilmeli. Bu ortamdan canlı alan adına ağ erişimi yoktu.
- Gerçek cihaz / ekran okuyucu kabulü (UX-05, UX-10), dış içerik ve izin teslimleri, Faz 6 formu.
