# Tasarım uygulaması ve doğrulama

4 Kasım 2026. Çalışma: `/Users/demirel/Desktop/Ders/COP31/BMS-inceleme`. Yalnız yerel uygulama; commit, push veya yayın yok. Bu dosya ilk incelemelerin yerine geçmez. [Bulgu bazındaki sabit kayıt](../../TASARIM_INCELEME_KAYDI.md).

## Uygulama sırası ve sonuç

1. Demo odak akışları, rehber/klavye kapsamı, sekmeler, hareket ve doğrudan bölüm adresleri.
2. Renk rolleri, font ailesi/ölçeği, ana eylem ve bağlantı hiyerarşisi.
3. Ana sayfa ve içeriklerin anlamına uygun süreç, liste, karşılaştırma, zaman çizelgesi ve kayıt düzenleri.
4. TR/EN gerçek ekranlar, üretim derlemesi ve bulgu bazında kanıt.

Yön: araştırma ve mühendislik içeriğini öne çıkaran açık kâğıt zemin, koyu mürekkep metin, kurumsal bordo ana eylem. Georgia başlıklar ile yerel sistem sans gövde kullanıldı; kontrol ve teknik değer yoğunluğu nedeniyle demoda Inter korundu. Yeni font veya animasyon bağımlılığı eklenmedi. Büyük başlıklardaki ağırlık/sıkışıklık azaltıldı; okunması gereken durum, koşul ve kaynak metinleri büyütüldü.

Ana sayfadaki genel batarya/döngü çizimi gerçek DEMO-001 gerekçe/gösterge ayrıntısıyla değiştirildi. Mobilde de görünür; sentetik veri ve kaynak etiketleri korunur. Altı galeri ekranı güncel çalışan demodan tekrar kaydedildi. Teknik süreç tek bir bağlı liste, veri erişimi sıralı seçenekler, yöntemler karşılaştırma satırları, pilot planı zaman çizelgesi olarak sunulur. Kurum ve kişi alanları aynı boş içerikle daha sakin tanım listeleridir. Sayfa sonu gezinmesi kart dizisi yerine bağlantı satırlarıdır.

Rehber artık veriyi örten bir katman değildir: sayfa akışında yer alır, açıklaması küçültülür ve incelenecek hedefe bağlantı verir. Yeni adım için otomatik kaydırma zamanlayıcısı yoktur. Mobil ayrıntı açılışı ve listeye dönüş klavye odağını korur. Sekmeler ok/Home/End ve tek Tab durağı uygular. Grafikler adlandırıldı, aralık/eşik/veri boşluğu özetleri eklendi. Bölüm hash'leri ilk açılış ve tarayıcı geçmişinde işlenir.

## Kaynak ve sınırlar

- İstenen altı başlangıç belgesi ve ilgili mevcut React/CSS dosyaları okundu. Brief'in önceki PDF renderları `/private/tmp/cop31-brief-review/page-02.png`, `page-03.png`, `page-11.png` üzerinden genel içerik, erişilebilirlik ve görsel kimlik şartları kontrol edildi. Sade/kurumsal tasarım ve kurum renkleriyle uyum istenir; mevcut font veya parlak lime dağılımı şart değildir.
- [Apple HIG tasarım ilkeleri](https://developer.apple.com/design/human-interface-guidelines/design-principles/), [yerleşim](https://developer.apple.com/design/human-interface-guidelines/layout/) ve [Emil Kowalski apple-design](https://github.com/emilkowalski/skills/blob/main/skills/apple-design/SKILL.md) hiyerarşi, kullanıcı kontrolü, anlık geri bildirim ve kesilebilir hareket açısından kullanıldı. Apple arayüzü kopyalanmadı; bu kaynaklara dayanarak bütün kartları yasaklayan bir kural ileri sürülmüyor.
- Bilinmeyen kişi, rol, fotoğraf, logo, ortaklık, ölçüm veya başarı eklenmedi. Kurum ve ekip veri kayıtları ile pilot/karbon alanları değişmedi. Karbonun zorunlu üst uyarısı aynen korundu.
- Demo veri üretimi, eşikler, karar kuralları ve karbon hesabı değişmedi. Basılı QR'ın mutlak hedefi `https://binbin-battery-intelligence.vercel.app/hakkimizda/`; demo `/`, tanıtım `/hakkimizda/` ve mevcut alt adresler korundu.
- Faz 6 formu başlamadı. Sağlanmamış PDF/video için dosya veya çalışan hizmet üretilmedi. Faz 7'nin tamamlandığı iddia edilmez.

## Gerçekte çalıştırılan kontroller

Node **22.23.1** kullanıldı. Komutlar `web/` altında çalıştırılır:

| Kontrol | Sonuç |
| --- | --- |
| `npm run lint` | Geçti; son kaynaklarla 0 hata/uyarı. |
| `npm run typecheck` | Geçti. |
| `npm run build` | Geçti; `prebuild` veri güncel olduğu için üretimi atladı; `tsc -b && vite build` tamamlandı. |
| `node --import tsx --test scripts/verify-data.test.ts` | **11/11 geçti.** Üretilen dosya/seed tutarlılığı, tüm senaryo/gün kimlikleri, olaylar, null/veri kapsamı, öncelikler, EN/TR hesap ve biçimleri. |
| `git diff --check` | Geçti. |
| Koruma özeti | [28 korunan dosyada fark yok](preservation.json): hesaplama/veri üretim kaynakları ve ilk inceleme raporu/kanıtları. |

İlk normal `npm run dev` denemesi sandbox içindeki tsx IPC soketi nedeniyle çalışmadı. Yerel Vite 127.0.0.1 üzerinden başlatıldı; standart `npm run build` gerekli yerel soket izniyle başarıyla çalıştırıldı. Geliştirme sırasında görülen ara sözdizimi/lint hataları giderildi; yukarıdaki sonuçlar son kontrollerdir.

### Tarayıcı kanıtları

- [80 durumluk yerleşim matrisi](layout-matrix.json): 320/390/768/1024/1440 px × TR/EN × sekiz adres. Yatay taşma yok. `pendingLazyImages`, sayfanın aşağısındaki henüz görünmemiş lazy görsellerdir; bozuk dosya sonucu değildir. Galeriye gidildiğinde yükleme ayrıca kontrol edildi.
- [Üretim yerleşimi](production-layout.json): derlenmiş çıktı 127.0.0.1:4174 üzerinde, 390/1440 px × TR/EN × sekiz adres, **32 durum**. Dil eşleşmesi ve yatay taşma kontrolü geçti.
- [Mobil TR/EN akışları](flows.json): Enter → `panel-title`; Tab → ayrıntı işlemi; Filoya dön → aynı `BT-10087` düğmesi. Arama ve teknik inceleme filtresi korunur. QR Escape ile kapanır ve tetikleyiciye döner; hedef sabit basılı adrestir. Mobil menü Escape sonrası tetikleyiciye döner. Aynı anda tek profil açılır.
- [Rehber adımları](guide-steps.json): 390/1440 px × TR/EN × sekiz adım = **32 adım**; taşma yok, Bitir sonrası odak `guide-trigger`.
- [Klavye kontrolleri](interaction-results.json): grafik sağ oku rehber adımını değiştirmez; sekme ArrowRight/Home/End modeli çalışır; aç/kapat odağı doğru.
- [Üretim etkileşimleri](production-interactions.json): skip link, mobil odak, sol okla sekme sarma, grafik/rehber ayrımı, grafikten Escape, geri bildirim/sıfırla, pilot bağlantısı ve tarayıcı ileri/geri.
- [Bölüm adresleri ve dil](hash-and-language.json): pilot doğrudan açılış/yenileme iki dilde hedefe iner; yöntem bölümü hash ile açılır. Dil değişimi yolu ve hash'i korur.
- [Yedi senaryo × üç sekme](production-scenarios.json): **21 durum**; seçili batarya ve sekme doğrulandı.
- [320 px ayrıntı](detail-320.json): veri kaybı senaryosunda TR/EN üç sekme; yatay taşma yok.
- [Yeni sekme/galeri/altbilgi](delivery-checks.json): demo yeni sekmede EN ile açılır; TR galeri görsellerinin tamamı yüklenir; sabit Başa dön altbilgide gizlidir.
- [Hedef boyutları](control-sizes.json): görünür mobil dil/menü/demo eylemleri ve demo buton/select/slider ölçümleri. 38 px rehber düğmesi son ölçümde 44 px'e düzeltildi.
- [Kontrast](contrast.json): seçilmiş 10 düz metin/zemin ve veri rengi çifti **4,55:1–12,21:1**. Gövde/kâğıt 11,98:1; yardımcı/kâğıt 6,07:1; beyaz/bordo ana eylem 9,75:1. Tüm etkileşim durumları için kapsamlı WCAG sertifikası değildir.
- [Hesaplanan stiller](computed-styles.json): gerçek font aileleri, ana metin/eylem boyutları ve renkler.
- [Üretim konsolu](production-console.json): yakalanan error/warn kaydı yok.

Metin büyüdüğü için bütün sayfaların kısaldığı ileri sürülmüyor. İyileştirme erken bölüm erişimi, daha az kart tekrarı, daha okunabilir açıklamalar ve anlamlı bilgi düzenidir. Yeni yükseklikler matriste saklıdır.

## Güncel ekranlar

| Alan | Masaüstü | Mobil |
| --- | --- | --- |
| Ana sayfa — TR | [İlk ekran](ana-masaustu-tr.jpg), [tam sayfa](hakkimizda-masaustu-tr.jpg) | [İlk ekran](ana-mobil-tr.jpg), [tam sayfa](hakkimizda-mobil-tr.jpg) |
| Ana sayfa — EN | [İlk ekran](ana-masaustu-en.jpg), [tam sayfa](hakkimizda-masaustu-en.jpg) | [İlk ekran](ana-mobil-en.jpg) |
| Kurumlar | [TR](kurumlar-masaustu-tr.jpg), [EN](kurumlar-masaustu-en.jpg) | [TR](kurumlar-mobil-tr.jpg) |
| Ekip | [TR](ekip-masaustu-tr.jpg), [EN](ekip-masaustu-en.jpg) | [TR](ekip-mobil-tr.jpg) |
| Proje | [TR](proje-masaustu-tr.jpg), [EN](proje-masaustu-en.jpg) | [TR](proje-mobil-tr.jpg) |
| Karbon | [TR](karbon-masaustu-tr.jpg), [EN](karbon-masaustu-en.jpg) | [TR](karbon-mobil-tr.jpg) |
| Demo tanıtımı | [TR](demo-masaustu-tr.jpg), [EN](demo-masaustu-en.jpg) | [TR](demo-mobil-tr.jpg) |
| İletişim | [TR](iletisim-masaustu-tr.jpg) | [TR](iletisim-mobil-tr.jpg) |
| Çalışan demo | [Telemetri](demo-telemetri-tr.jpg) | [Batarya ayrıntısı](demo-ayrinti-mobil-tr.jpg) |
| Kısa ekran | [844×390 rehber](rehber-yatay-tr.jpg) | Açıklama küçültülebilir; veri üzerine binmez. |

## Açık doğrulamalar ve teslimler

- **UX-05 açık doğrulama:** Reduce Motion açık bir gerçek cihazda otomatik kaydırma davranışı. Kaynakta tercih uygulanır; rehberde bekleyen otomatik kaydırma kalmadı.
- **UX-10 açık doğrulama:** VoiceOver/NVDA/TalkBack ile grafik adları, canlı adım duyuruları ve okuma sırası. DOM/AX adlandırması ve klavye kontrolleri geçti; duyurular dinlenmedi.
- Gerçek iPhone/iPad dokunma, yüzde 200 büyütme ve farklı tarayıcı motorları bu turda doğrulanmadı.
- Eksik gerçek içerikler, sunum/video, kurumsal e-posta ve izinler bekliyor. Faz 6 arkadaşın işi olarak açık. Yayın öncesi kapsamlı Faz 7 kabulü ayrıca gerekir.
