# Faz 3 — Kurumlar ve iş birlikleri taslağı

Tarih: 4 Kasım 2026. Kullanıcı, netleşmemiş bilgiler dışında brief içeriğinin kullanılmasını ve sayfaların boş alanlarla hazırlanmasını istedi. Çalışma Faz 1–2'nin yerel uygulamasının üzerine eklendi.

## Kurumlar sayfası

`/hakkimizda/kurumlar/` altında OSTİM Vakfı ve OSTİM Teknik Üniversitesi tanıtımları, aralarındaki kurumsal ilişki, resmî bağlantılar ve yönetici kartları hazırlandı. Kısa kurum özetleri ana sayfayla aynı içerik kaydını kullanır. Kurumsal ilişki için Vakfın resmî kaynak bağlantısı gösterilir.

Brief'teki Orhan Aydın, Murat Yülek, Hasan Erbay ve Serdar Müldür isimleri taslak olarak yer alır; hepsi **Teyit bekleniyor** durumundadır. Görev/unvan, kurum ve resmî e-posta alanları boş bırakılmıştır. Ar-Ge/projeler sorumlusu kaydında ad-soyad alanı da boştur. Unvan veya e-posta internetten/hafızadan doldurulmadı.

## İş birlikleri ve iletişim sayfası

`/hakkimizda/iletisim/` altında:

- BinBin ve brief'teki tam şirket adı; **Önerilen pilot iş birliği** durumu; teklifin önerdiği BMS/IoT/bakım/veri altyapısı incelemesi, pilot planlama ve aşamalı ortak değerlendirme yaklaşımı.
- Sustain Bridge için başlık, **Kapsam bilgisi bekleniyor** durumu ve boş içerik alanları.
- Onaylı kapsam, projeye katkı ve resmî bağlantı alanları. Kesinleşmiş bir iş birliği veya mevcut veri erişimi iddiası yoktur.
- Kurumsal proje e-postası için boş alan; Faz 6'da kullanılacak `#collaboration-form` bölümü ve şu anda başvuru alınmadığını belirten açıklama.

Bu fazda form, giriş alanı, gönderim düğmesi, sunucu işlevi veya veri toplama eklenmedi. Boş `mailto:` veya sahte bağlantı yoktur. Logolar, yayın onaylı görseller sağlanana kadar boş alanlarla temsil edilir.

## Düzenlenebilir kayıtlar

- `web/src/about/organizations.ts`: `MANAGERS`, `COLLABORATIONS`, `ORGANIZATION_ASSETS`.
- Yönetici `role`, `institution`, `officialEmail` alanları ancak `confirmed: true` olduğunda gösterilir. Bu bayrak gerçek kurum teyidini temsil eder.
- İş birliğinde `proposal` kaynakta önerilen yaklaşımı taşır. `approvedScope` ve `contribution` ancak `status: 'confirmed'` durumunda gösterilir. BinBin `proposed`, Sustain Bridge `pending` olarak kalmıştır.
- Logo için `src`, iki dilli `alt` / `credit` ve izin sonrasında `approved: true` kullanılır. Mevcut dört kayıtta görsel yoktur.
- `web/src/site.ts` içindeki `TEAM_EMAIL` ortak proje iletişim adresidir ve hâlen boştur.
- Tüm yeni arayüz metinleri `content/en.ts` / `tr.ts` içindeki `organizations` kaydında; biçim sözleşmesi `content/types.ts` içindedir.
- Sayfa düzenleri `InstitutionsPage.tsx`, `CollaborationsPage.tsx` ve `organizations.css` içindedir. Mevcut ortak şablon ve dil sistemi kullanılır.

## Kaynaklar

- `COP31_Web_Sitesi_Brief_BinBin.pdf`: PDF s. 5 (kurumlar ve yönetici taslağı), s. 10 (iş birlikleri, iletişim ve form), s. 11 (ortak gereksinimler).
- `BinBin_Proje_Teklifi.pdf`: kapak, Bölüm XI ve 11.6 (sunulan kurum, önerilen pilot ve aşamalı ortak değerlendirme).
- Faz 2'de kontrol edilen [OSTİM Vakfı resmî tanıtımı](https://www.ostimvakfi.com/tr/detay/sayfalar/hakkimizda/205220) ve [resmî ana sayfası](https://www.ostimvakfi.com/tr): kısa kurum özetleri ve üniversiteyle ilişki.
- [OSTİM Teknik Üniversitesi resmî bağlantısı](https://www.ostimteknik.edu.tr/) korundu. Önceki incelemedeki araçla erişim sorunu nedeniyle bu fazda dış sitelerin canlı erişimi için yeni bir başarı iddiası yapılmadı.

## Doğrulama

Ortam: Node 22.23.1 / npm 10.9.8. Tarayıcı kontrolleri `http://127.0.0.1:4173` üretim önizlemesinde yapıldı.

| Kontrol | Sonuç |
|---|---|
| `npm run typecheck` | Geçti |
| `npm run lint` | Geçti |
| `npm run build` | Geçti |
| `git diff --check` | Geçti |
| Yedi sayfa × EN/TR × 360/768/1440 px | 42/42 geçti |
| İki Faz 3 sayfasında içerik/boş alan kontrolleri | 12/12 geçti |
| Aynı sayfada EN→TR / TR→EN | 12/12 geçti |
| TR seçiminden sonra yenileme | 6/6 geçti |
| İki sayfa arasında ilgili bağlantıyla gezinme | Geçti; dil korundu |
| Mobil menüyü Enter ile açma, Escape ile kapatma ve odak dönüşü | Geçti |
| Üretim konsolu | Hata/uyarı yok |

42 sayfalık matriste doğru dil, istenen ekran genişliği, tek `h1`, doğru aktif menü/adres, yedi menü bağlantısı, sayfa/OG başlığı eşleşmesi ve yatay taşma olmaması kontrol edildi. Kurumlar sayfasında beş yönetici kaydı, 16 boş yönetici alanı ve beş teyit bekleme etiketi doğrulandı. İletişim sayfasında iki iş birliği kaydı, BinBin öneri metni, Sustain Bridge'in dört boş alanı ve form yer tutucusu doğrulandı. Her iki sayfada ikişer logo yer tutucusu, sıfır gerçek görsel, sıfır form/giriş/submit alanı, sıfır e-posta bağlantısı ve sıfır boş bağlantı görüldü.

Dış bağlantıların hedefleri ve yeni sekme öznitelikleri kontrol edildi; dış kurum sitelerinin yayın durumu bu testin kapsamında değildir. Ayrıntılı sonuçlar: [kontroller.json](kontroller.json).

## Ekranlar

- [Kurumlar — masaüstü TR](kurumlar-masaustu-tr.jpg)
- [Kurumlar — mobil TR](kurumlar-mobil-tr.jpg)
- [İş birlikleri ve iletişim — masaüstü TR](iletisim-masaustu-tr.jpg)
- [İş birlikleri ve iletişim — mobil TR](iletisim-mobil-tr.jpg)

Faz 3 taslak arayüzü yerelde hazırdır. Kurum teyitleri, iş birliği onayları ve gerçek iletişim bilgileri beklenmektedir. Bu çalışma GitHub'a gönderilmedi veya Vercel'e yayımlanmadı. Faz 4–7 uygulanmadı.
