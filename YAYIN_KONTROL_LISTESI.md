# Yayın Kontrol Listesi — İçerik, İzin ve Teslim Durumu

Son güncelleme: 4 Kasım 2026. Faz 7'nin “izin durum listesi, teslim bağlantıları ve nihai kontrol listesi” maddesi için tek referans. Durumlar depodaki kayıtlardan alınmıştır; bir alanın arayüzde hazır olması içeriğin veya iznin tamamlandığı anlamına gelmez. Bilgi uydurulmaz; gelen içerik ilgili dosyaya girilir ve bu tablo güncellenir.

Durum anahtarı: **Hazır** = içerik ve gerekiyorsa izin var · **Bekliyor** = alan hazır, içerik/izin gelmedi · **Kısmi** = bir bölümü var.

## 1. İçerik ve izin durumu

| # | Konu | Dosya / alan | Durum | Gereken |
|---|---|---|---|---|
| 1 | Kurumsal proje e-postası | `web/src/site.ts` → `TEAM_EMAIL`, `CONTACTS` | Bekliyor | Kurumun onayladığı ortak adres. Boşken e-posta bağlantısı gösterilmez. |
| 2 | Ekip üyeleri (Gizem, Gamze, Erhan, Yusuf, Ahmed) | `web/src/site.ts` → `PROJECT_TEAM` | Bekliyor | Her kişi için TR/EN rol, çalışma paketi, katkı, kısa tanıtım; isteğe bağlı bağlantı. |
| 3 | Ekip fotoğrafları | `PROJECT_TEAM[].photo`, `photoCredit` | Bekliyor | Kişinin yayın izni ve fotoğraf kaynağı. |
| 4 | Akademik koordinatör | `COORDINATOR_PROFILE` | Kısmi | Rol/çalışma paketi/katkı var; kısa tanıtım ve bağlantılar bekliyor. |
| 5 | Kurum yöneticileri (4 isim + Ar-Ge/projeler sorumlusu) | `web/src/about/organizations.ts` → `MANAGERS` | Bekliyor | Kurumdan teyitli unvan, kurum ve resmî e-posta; ardından `confirmed: true`. |
| 6 | BinBin iş birliği | `COLLABORATIONS` → `binbin` (`proposed`) | Kısmi | Teklif yaklaşımı yayında; onaylı kapsam, katkı ve resmî web adresi için yazılı teyit. |
| 7 | Sustain Bridge iş birliği | `COLLABORATIONS` → `sustainBridge` (`pending`) | Bekliyor | Kapsam, katkı, resmî web adresi ve teyit. |
| 8 | Kurum logoları (OSTİM Vakfı, OSTİM Teknik Üniversitesi, BinBin, Sustain Bridge) | `ORGANIZATION_ASSETS` | Bekliyor | Logo dosyası, TR/EN alt metin, kaynak ve yayın izni (`approved: true`). Tanıtım ve demo üst bilgisi şu an metin tabanlıdır; broşürden alınmış `web/src/about/assets/ostim-cop31.png` dosyası depoda durur ama hiçbir sayfada kullanılmaz. |
| 9 | Pilot bilgileri (başlangıç, grup büyüklüğü, veri kapsamı, doğrulama) | `web/src/about/projectData.ts` → `PILOT_INFORMATION` | Bekliyor | Gerçek pilot verisi. Takvim yalnız teklifin göreli Faz 0–5 planıdır. |
| 10 | Karbon ölçümleri (10 alan) | `projectData.ts` → `CARBON_INFORMATION` | Bekliyor | Ölçüm noktası/dönemi, enerji, faktör değeri/yılı/kaynağı, emisyon, tedarikçi belgeleri. Demo faktörü (0,45 kg/kWh) buraya taşınmaz. |
| 11 | Sunum PDF'i (TR/EN) | `web/src/about/demoMedia.ts` → `DEMO_MEDIA` | Bekliyor | Koordinatörden dosya; `web/public/media/` altına eklenir. |
| 12 | Tanıtım videosu (TR/EN) | `DEMO_MEDIA[*].video` | Bekliyor | Video + aynı dilde WebVTT altyazı; isteğe bağlı poster. |
| 13 | İletişim formu (Faz 6) | `/hakkimizda/iletisim/#collaboration-form` | Bekliyor | Kullanıcı kararıyla arkadaşına bırakıldı. Alıcı adres, kurum onaylı aydınlatma metni, spam koruması, test gönderimi. Başvuru alınmıyor. |
| 14 | Demo ekran görüntüleri | `web/src/about/assets/demo/` | Hazır | Gerçek sentetik demodan TR/EN; demo arayüzü değişirse yeniden alınmalı. |
| 15 | Resmî kaynak bağlantıları | `web/src/about/sources.ts` | Hazır | Yayından önce bağlantıların hâlâ açıldığı kontrol edilmeli. |
| 16 | Son içerik güncelleme tarihi | `web/src/site.ts` → `SITE_CONTENT_UPDATED` | Hazır | Gerçek içerik eklendiğinde tarih elle güncellenir. |

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

- [x] `npm run build` (TypeScript dâhil), `npm run lint`, `npm run verify:data` (12 test) geçiyor.
- [x] Yedi tanıtım adresi doğrudan açılıyor; EN/TR aynı sayfada değişiyor; demo yeni sekmede seçilen dille açılıyor.
- [x] Basılı QR → `/hakkimizda/` → demo akışı korunuyor; demo kökü `/` değişmedi.
- [x] 500 batarya kimliği için pasaport adresi (`?battery=…&tab=passport`) ve QR; bilinmeyen kimlikte açıklayıcı bildirim.
- [x] Bilinmeyen adresler için iki dilli 404 sayfası (`web/public/404.html`).
- [x] 390/1440 px'te yatay taşma yok; tarayıcı konsolunda error/warn yok (yerel üretim önizlemesi).
- [ ] Yeni sürüm Vercel'e yayımlandıktan sonra canlıda pasaport bağlantısı, 404 ve QR okutma kontrolü.
- [ ] Gerçek telefon/tablette dokunma, OS “hareketi azalt” (UX-05) ve VoiceOver/TalkBack/NVDA (UX-10) kabulü.
- [ ] Sunum PDF'i görüntüleme/indirme ve video oynatma/altyazı (dosyalar gelince).
- [ ] Form başarı/hata durumları ve doğru alıcıya test gönderimi (Faz 6 gelince).
- [ ] Bölüm 1'deki “Bekliyor/Kısmi” satırları kapatıldı; izinler yazılı olarak arşivlendi.
