# Yayın Kontrol Listesi — İçerik, İzin ve Teslim Durumu

Son güncelleme: 4 Kasım 2026. Faz 7'nin “izin durum listesi, teslim bağlantıları ve nihai kontrol listesi” maddesi için tek referans. Durumlar depodaki kayıtlardan alınmıştır; bir alanın arayüzde hazır olması içeriğin veya iznin tamamlandığı anlamına gelmez. Bilgi uydurulmaz; gelen içerik ilgili dosyaya girilir ve bu tablo güncellenir.

Durum anahtarı: **Hazır** içerik ve gerekiyorsa izin var. **Bekliyor** içerik veya izin gelmedi. **Kısmi** bir bölümü var.

## 1. İçerik ve izin durumu

Sade tasarım turundan (4 Kasım 2026) beri boş alanlar sitede gösterilmez. Bilgi geldiğinde ilgili dosyaya girilir ve sayfada kendiliğinden görünür. Projenin ortak e-posta adresi olmayacaktır; iletişim yalnız formla yapılır.

| # | Konu | Dosya / alan | Durum | Gereken |
| --- | --- | --- | --- | --- |
| 1 | Ekip üyeleri (Gizem, Gamze, Erhan, Yusuf, Ahmed) | `web/src/site.ts` → `PROJECT_TEAM` | Kısmi | Erhan, Yusuf ve Ahmed'in fotoğrafları eklendi. Gizem ve Gamze'nin fotoğrafları, herkesin CV'si, rol ve katkı bilgileri bekleniyor. |
| 3 | Akademik koordinatör | `COORDINATOR_PROFILE` | Kısmi | Fotoğraf, rol, çalışma paketi ve katkı var. CV ve bağlantılar bekleniyor. |
| 4 | Kurum yöneticileri | `web/src/about/organizations.ts` → `MANAGERS` | Hazır | Dört kişinin unvanı resmî sayfalardan eklendi. Orhan Aydın'ın fotoğrafı OSTİM Vakfı sitesinden, diğer üç fotoğraf kullanıcıdan alındı. Yayın izni kurumdan teyit edilmeli. |
| 5 | Destekleyenler | `COLLABORATIONS` | Kısmi | BinBin destekleyen kuruluş olarak yalnız bu bölümde, logosuyla. Sustain Bridge için bilgi ve logo bekleniyor. |
| 7 | Logolar | `web/src/about/assets/`, `ORGANIZATION_ASSETS` | Kısmi | OSTİM Teknik Üniversitesi ve COP31 broşür görselinden, OSTİM Vakfı (açık ve koyu sürüm) ostimvakfi.com'dan, BinBin (açık ve koyu sürüm) binbin.tech'ten alındı. Sustain Bridge için resmî site bulunamadı. Daha net üniversite logosu için ostimteknik.edu.tr'deki resmî dosya tercih edilmeli. |
| 8 | Pilot bilgileri | `web/src/about/content/technical.*.ts` → `project.pilot` | Bekliyor | Gerçek başlangıç tarihi, grup büyüklüğü, veri kapsamı ve doğrulama sonuçları. Takvim şu an teklifin göreli planıdır. |
| 9 | Karbon ölçümleri | `content/technical.*.ts` → `carbon` | Bekliyor | Ölçüm noktası ve dönemi, enerji, faktör değeri, yılı ve kaynağı, hesaplanan emisyon, tedarikçi belgeleri. Demo faktörü kullanılmaz. |
| 10 | Sunum (TR/EN) | `web/src/about/demoMedia.ts` → `DEMO_MEDIA` | Bekliyor | Dosya gelince `web/public/media/` altına eklenir. Bölüm dosya olmadan görünmez. |
| 11 | Tanıtım videosu (TR/EN) | `DEMO_MEDIA[*].video` | Bekliyor | Video ve aynı dilde WebVTT altyazı. |
| 12 | İletişim formu | `web/api/contact.ts`, `supabase/migrations/`, Vercel ortam değişkenleri | Kısmi | Form, aydınlatma metni ve Supabase kaydı hazır. Vercel'e BMS-Web projesinin `SUPABASE_URL` ve `SUPABASE_KEY` değerleri girildi ve canlı sürüm yeniden derlendi (5 Kasım 2026), form açık. Kalan iş migration SQL'inin BMS-Web'de çalıştırılması ve canlıda deneme gönderimi. Aydınlatma metninin üniversitenin KVKK birimince gözden geçirilmesi önerilir. |
| 13 | Demo ekran görüntüleri | `web/src/about/assets/demo/` | Hazır | Demo arayüzü değişirse yeniden alınmalı. Öneri metinleri bu turda sadeleşti, görüntülerdeki eski öneri cümlesi yenilenebilir. |
| 14 | Resmî kaynak bağlantıları | `web/src/about/sources.ts` | Hazır | Yayından önce açıldıkları kontrol edilmeli. |
| 15 | Son içerik güncelleme tarihi | `web/src/site.ts` → `SITE_CONTENT_UPDATED` | Hazır | İçerik eklendiğinde elle güncellenir. |

## 2. Teslim bağlantıları

| Teslim | Adres |
|---|---|
| Tanıtım (basılı QR hedefi) | https://binbin-battery-intelligence.vercel.app/hakkimizda/ |
| Demo | https://binbin-battery-intelligence.vercel.app/ |
| Örnek pasaport bağlantısı | https://binbin-battery-intelligence.vercel.app/?battery=DEMO-001&scenario=temp-drift&tab=passport |
| Kaynak kod | https://github.com/YusufTaha-Kurt/BMS |
| Faz planı | [WEB_SITESI_FAZ_PLANI.md](WEB_SITESI_FAZ_PLANI.md) |
| Güncel durum | [DURUM.md](DURUM.md) |
| Yerel kurulum | [KURULUM.txt](KURULUM.txt) |

Pasaport bağlantısı bu sürümle eklendi; üretim alan adında yeni yayından sonra çalışır.

## 3. Nihai kontrol listesi

Teknik kontroller (bu depoda tekrar çalıştırılabilir):

- [x] `npm run build` (TypeScript dâhil), `npm run lint`, `npm test` (12 veri + 6 form testi) geçiyor.
- [x] 8 adres × EN/TR × 360/768/1440 px = 48 durumda tek h1, doğru dil, taşma/bozuk görsel yok; 22 iç bağlantı 200 ([Faz 7 kaydı](incelemeler/faz-7/INCELEME.md)).
- [x] Form: kapalıyken gönderim yok; açık derlemede doğrulama, gönderiliyor, başarı ve dört hata durumu; bot tuzakları ve oran sınırı test edildi ([Faz 6 kaydı](incelemeler/faz-6/INCELEME.md)).
- [x] Yedi tanıtım adresi doğrudan açılıyor; EN/TR aynı sayfada değişiyor; demo yeni sekmede seçilen dille açılıyor.
- [x] Basılı QR → `/hakkimizda/` → demo akışı korunuyor; demo kökü `/` değişmedi.
- [x] 500 batarya kimliği için pasaport adresi (`?battery=…&tab=passport`) ve QR; bilinmeyen kimlikte açıklayıcı bildirim.
- [x] Bilinmeyen adresler için iki dilli 404 sayfası (`web/public/404.html`).
- [x] 390/1440 px'te yatay taşma yok; tarayıcı konsolunda error/warn yok (yerel üretim önizlemesi).
- [x] Sade tasarım turunda 48 yerleşim, 22 iç bağlantı, pasaport/404 ve form akışları yeniden geçti ([kayıt](incelemeler/sade-tasarim/INCELEME.md)).
- [ ] Bu dalın `main`'e birleştirilip Vercel'e yayımlanması; ardından canlıda pasaport bağlantısı, 404, QR okutma ve kapalı form kontrolü.
- [ ] Sekiz dış kaynak bağlantısının yayın günü açıldığının kontrolü (bu ortamdan dış ağ yoktu).
- [ ] Gerçek telefon/tablette dokunma, OS “hareketi azalt” (UX-05) ve VoiceOver/TalkBack/NVDA (UX-10) kabulü.
- [ ] Sunum PDF'i görüntüleme/indirme ve video oynatma/altyazı (dosyalar gelince).
- [ ] Form açıldıktan sonra canlıda doğru alıcıya gerçek test gönderimi.
- [ ] Bölüm 1'deki “Bekliyor/Kısmi” satırları kapatıldı; izinler yazılı olarak arşivlendi.
