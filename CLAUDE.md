# İklimTekOst — çalışma notları

Bu dosya yeni bir oturumun hızla devam edebilmesi içindir. Ayrıntılı geçmiş `DURUM.md`, açık işler `YAYIN_KONTROL_LISTESI.md` içindedir.

## Proje
- OSTİM Teknik Üniversitesi öğrenci ekibinin COP31 projesi. Güncel ad **İklimTekOst**; eski adı BinBin Battery Intelligence. Ad değişebilir.
- Uygulama `web/` altında: Vite + React 19 + TypeScript. Tanıtım sitesi `web/src/about/`, demo `web/src/` (App, components), sentetik veri üretimi `web/scripts/` ve `web/shared/`.
- Canlı: https://binbin-battery-intelligence.vercel.app (demo `/`, tanıtım `/hakkimizda/`). Alan adı ve basılı QR adresi değiştirilmez.
- `main` dalına gönderilen her commit Vercel üretim yayınını tetikler (proje `binbin-battery-intelligence`, ekip `ytkurt06-3576s-projects`, kök dizin `web`). Kullanıcı canlıda takip etmek istediğinde değişiklikleri main'e birleştirir.

## Komutlar (`web/` içinde, Node 22)
- `npm ci`, `npm run dev`, `npm run build` (TypeScript dâhil), `npm run lint`, `npm test` (veri + form testleri, 19 test).
- Veri `npm run data` ile üretilir, git'e girmez. `shared/rules.ts` içindeki öneri metinleri değişirse `shared/config.ts` → `DATA_VERSION` artırılır.

## Sık düzenlenen yerler
- Proje adı: `web/src/site.ts` → `PROJECT_NAME`; ayrıca `web/hakkimizda/*/index.html`, `web/index.html`, `web/public/404.html` başlıkları, `content/tr.ts` ve `en.ts` → `home.headline`, `content/privacy.*.ts`, `web/api/contact.ts` e-posta konusu.
- Metinler: `web/src/about/content/` (tr/en, technical, demo, privacy). Tipleri `content/types.ts`.
- Ekip: `web/src/site.ts` → `PROJECT_TEAM`, `COORDINATOR_PROFILE` (fotoğraf, kısa tanıtım, bağlantılar). CV içerikleri `web/src/about/teamCv.ts` (id ile eşleşir). Fotoğraflar `web/src/about/assets/people/`, 240 px kare.
- Kurumlar, yöneticiler, destekleyenler, logolar: `web/src/about/organizations.ts`. Logolar `web/src/about/assets/`; koyu tema sürümü varsa `srcDark`.
- Stiller: `web/src/about/site.css` (tanıtım), `contact-form.css`, `web/src/index.css` (demo). Tema `web/src/lib/theme.ts`.
- Form: `web/api/contact.ts`. Vercel ortam değişkenleri `SUPABASE_URL`, `SUPABASE_KEY` (yayımlanabilir anahtar) ayarlı. Tablo SQL'i `supabase/migrations/`. Anonim rol yalnız ekleme yapabilir. E-posta bildirimi için isteğe bağlı `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `RESEND_API_KEY`.

## Kullanıcının kuralları
- Kullanıcıya görünen metinler kullanıcının üslup kılavuzuna uyar. Noktalı virgül ve iki nokta yok. Cümleler tire ile bağlanmaz, aralık "2024 ile 2028" diye yazılır. Açıklama parantez içine sıkıştırılmaz. Büyük harfle vurgu, slogan ve yumuşatma yok. Türkçe yönergeler "-iniz" ile (Seçiniz). Kısa ve teknik.
- Bilgi uydurulmaz. Bilinmeyen alan sitede gösterilmez. Kişi fotoğrafı yalnız kullanıcının eşleştirdiği veya kimliği doğrulanmış resmî kaynaktan eklenir; kimin olduğu belirsizse kullanıcıya sorulur.
- Proje e-postası yok. Telefon numarası ve kişisel e-posta siteye konmaz.
- BinBin yalnız iş birliği sayfasındaki "Destekleyenler" bölümünde, logosuyla geçer. Sustain Bridge için bilgi bekleniyor.
- Her değişiklik TR ve EN, açık ve koyu tema, telefon genişliği için kontrol edilir.

## Ortam notları
- Kişisel "BMS" bulut ortamı kurum sitelerine, canlı siteye ve Supabase BMS-Web adresine erişebilir. `ostimteknik.edu.tr` bulut ortamından gelen bağlantıları reddeder; o siteden görsel gerekiyorsa kullanıcıdan istenir.
- Supabase MCP bağlantısı BMS-ARGE organizasyonunu görmez; tablo değişikliği için SQL kullanıcıya verilir.
