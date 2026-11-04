# Faz 7 — Kontrol ve yayın hazırlığı

4 Kasım 2026. Faz 6 formu ve pasaport bağlantısı eklendikten sonra bütün site bu dalın son hâliyle yeniden kontrol edildi (plan: brief s. 11–12).

## Kod ve derleme

- `npm run build` (TypeScript dâhil) ve `npm run lint` temiz.
- `npm test` → 18/18: 12 veri/yerelleştirme/pasaport adresi testi + 6 form testi.
- `git diff --check` temiz. Üretilen `public/data`, `dist`, `node_modules` depoya alınmaz.

## Yerleşim ve bağlantılar

[Kontrol betiği](kontrol.cjs), yerel üretim önizlemesi, Chromium. Sonuç: [matris.json](matris.json).

- 8 adres (demo + 7 tanıtım sayfası) × EN/TR × 360/768/1440 px = **48 durum**: hepsinde doğru `lang`, tek h1, main var, yatay taşma yok, bozuk görsel yok.
- Sayfalardaki **22 iç bağlantı** 200 döndü.
- **8 dış kaynak bağlantısı** (EUR-Lex, Avrupa Komisyonu pasaport sayfaları, ETKB-EVÇED, UNFCCC COP31, OSTİM Teknik Üniversitesi, OSTİM Vakfı) listelendi; bu ortamdan dış ağa erişim olmadığı için açılışları denenmedi.
- Konsolda error/warn yok.
- QR → `/hakkimizda/` → demo akışı ve demo kökü değişmedi. Pasaport adresi, bilinmeyen kimlik ve 404: [önceki kayıt](../eksik-tamamlama/INCELEME.md). Form durumları: [Faz 6](../faz-6/INCELEME.md).

## Belgeler

README (form kurulumu, testler), [YAYIN_KONTROL_LISTESI.md](../../YAYIN_KONTROL_LISTESI.md) (izin durumu, teslim bağlantıları, nihai liste), [faz planı](../../WEB_SITESI_FAZ_PLANI.md) ve [DURUM.md](../../DURUM.md) güncellendi.

## Yayın

Değişiklikler `claude/laughing-hawking-xsk5nj` dalına gönderildi. Vercel üretim yayını `main` dalından tetiklenir; bu sürüm `main`'e birleştirilince yayımlanır. Yayından sonra canlıda pasaport bağlantısı, 404, QR okutma ve kapalı form görünümü bir kez daha kontrol edilmelidir.

## Açık kalanlar (dış teslim veya gerçek cihaz gerektirir)

- Gerçek telefon/tablette dokunma; OS “hareketi azalt” (UX-05); VoiceOver/TalkBack/NVDA ile okuma (UX-10).
- Dış kaynak bağlantılarının yayın günü açıldığının kontrolü.
- İçerik/izin teslimleri, sunum PDF'i/video ve form açılışı: kontrol listesi Bölüm 1.
