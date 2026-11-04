# Faz 2 — Ana sayfa ve ekip taslağı

Tarih: 4 Kasım 2026. Faz 1'in yerel uygulaması üzerine eklendi. Kullanıcı, bilinmeyen içerikler için etiketli boş alanlar bırakılarak sayfaların hazırlanmasını istedi; gerçek içerikleri ekipten aldıktan sonra iletecek.

## Hazırlananlar

- Ana sayfa: proje adı ve kısa tanıtım; teklif/pilot planlama durumu; sorun özeti; görünür altı adımlı önerilen sistem akışı; kısa ekip tanıtımı; OSTİM Vakfı ve üniversite için kısa özetler; COP31 bağlamı; proje, ekip, demo, karbon ve iş birliği yönlendirmeleri.
- `/hakkimizda/ekip/`: beş üye ve akademik koordinatör; sıra Gizem, Gamze, Erhan, Yusuf, Ahmed, Barış Taha Uludağ. Profiller kendi satırında açılır; aynı anda yalnız bir profil açıktır.
- Her profilde rol, çalışma paketi, katkı, kısa tanıtım ve bağlantı alanları vardır. Beş üyenin bilinmeyen değerleri “—” olarak görünür. Ekran okuyucuya ilgili bilginin henüz paylaşılmadığı açıklanır. Bilinmeyen fotoğraf veya bağlantı oluşturulmadı.
- Koordinatörün brief'te verilen görevi ve sorumlulukları eklendi; diğer alanları boş kaldı. Ana sayfadaki kişi bağlantısı ekip sayfasında ilgili profili açar.
- Ana sayfanın eski `#team` ve `#project` bölüm hedefleri korunur. Demo `/` ve QR `/hakkimizda/` adresleri aynı kalır. Başvuru formu veya yeni veri toplama eklenmedi.

## İçeriğin sonradan eklenmesi

Kişi kayıtları `web/src/site.ts` içindeki `PROJECT_TEAM` ve `COORDINATOR_PROFILE` alanlarındadır. `role`, `workPackage`, `contribution`, `bio` değerleri `{ tr, en }` biçiminde eklenir. Bir dilde bilgi yoksa o dilin alanı boş kalır. İsteğe bağlı fotoğraf/kaynak `photo` / `photoCredit`; bağlantılar `links` içindedir. Alanlar normal belge akışında büyür; içerik için sabit yükseklik veya karakter sınırı konmadı.

Ortak kural `WEB_SITESI_FAZ_PLANI.md` ve README'ye kaydedildi: bilinmeyen içerik sayfanın hazırlanmasını bekletmez; arayüzün hazır olması, gerçek içerik ve yayın izinlerinin tamamlanmasıyla ayrı izlenir.

## Kaynaklar

- Yerel `COP31_Web_Sitesi_Brief_BinBin.pdf`, özellikle PDF s. 4 ve 6; tüm site kuralları s. 2–3 ve 11.
- Yerel `BinBin_Proje_Teklifi.pdf`, özellikle s. 5, 7, 23 ve 28: sorun, sistem akışı, COP31 bağlamı ve çalışma paketleri.
- [OSTİM Vakfı — Hakkımızda](https://www.ostimvakfi.com/tr/detay/sayfalar/hakkimizda/205220): kurumun çalışma alanları ve üniversiteyle ilişkisi.
- [OSTİM Vakfı — Ana sayfa](https://www.ostimvakfi.com/tr): eğitim ve araştırma bağlamı.
- [OSTİM Teknik Üniversitesi](https://www.ostimteknik.edu.tr/): resmî bağlantı; arama sonucu üniversite-sanayi yaklaşımını destekliyor. Tam sayfa metni alma denemesi zaman aşımı/502 verdi; kurum özetinin dayanağı ayrıca Vakfın resmî sayfalarıdır. Canlı dış bağlantı erişimi yayın öncesinde tekrar kontrol edilmeli.
- [Avrupa Komisyonu — Digital Batteries Passport hazırlık rehberi](https://single-market-economy.ec.europa.eu/news/guidance-support-preparations-digital-batteries-passport-2026-08-21_en): LMT bataryaları ve 18 Şubat 2027 uygulama tarihi. Kaynak bağlantısı ana sayfada ilgili cümlenin yanındadır.

Kişi bazında görev dağılımı veya katkı bilgisi bu kaynaklarda bulunmadığından üyelere görev atanmadı. Projenin hedefleri mevcut demoda doğrulanmış saha sonuçları gibi sunulmadı.

## Doğrulama

Ortam: Node 22.23.1, npm 10.9.8. Üretim önizlemesi: `http://127.0.0.1:4173`. Bağımlılık veya kilit dosyası değiştirilmedi.

| Kontrol | Sonuç |
|---|---|
| `npm run build` (TypeScript + Vite) | Geçti |
| `npm run lint` | Geçti |
| `git diff --check` | Geçti |
| Ana sayfa + ekip × EN/TR × 360/768/1440 px | 12/12 geçti |
| 6 profil × EN/TR × 360/768/1440 px | 36/36 geçti |
| Açık koordinatör profilinde dil değiştirme | 6/6 geçti; profil açık kaldı |
| Klavyeyle Enter ile açma / Space ile kapatma | Geçti |
| Ana sayfadaki beş yönlendirmeyi tıklayıp geri dönme | Geçti; dil korundu |
| Ana sayfadan kişi bağlantısı | Gizem ve Ahmed profilleri doğru hash ile açıldı |
| Mobil ilk ekranda demo | Üstbilgi ve hero bağlantıları görünür |
| TR demo açılışı ve tanıtıma dönüş | 500 bataryalı demo yüklendi; dil korundu |
| Üretim konsolu | Hata/uyarı yok |

Her profil açılışında tek açık profil, beş etiketli alan, üye için beş / koordinatör için iki boş değer, fotoğraf veya diyalog bulunmaması ve yatay taşma olmaması kontrol edildi. Ana sayfada altı akış adımı, beş yönlendirme, doğru dil ve dış bağlantıların yeni sekme özniteliği doğrulandı. Dış kurum sitelerinin kendilerine ait yayın durumları bu arayüz kontrolünün kapsamı değildir.

Ayrıntılar: [kontroller.json](kontroller.json).

## Ekranlar

- [Ana sayfa — masaüstü TR](ana-sayfa-masaustu-tr.jpg)
- [Ana sayfa — mobil TR](ana-sayfa-mobil-tr.jpg)
- [Boş alanlı ekip profili — masaüstü TR](ekip-masaustu-tr.jpg)
- [Boş alanlı ekip profili — mobil TR](ekip-mobil-tr.jpg)

Faz 2 taslak arayüzü hazırdır. Kişi içerikleri ve yayın izinleri beklenmektedir. GitHub'a gönderim veya Vercel yayını yapılmadı; Faz 3–7 uygulanmadı.
