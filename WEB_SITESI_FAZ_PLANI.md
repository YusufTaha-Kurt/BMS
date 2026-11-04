# COP31 Web Sitesi — Faz Planı

Bu plan, hocanın hazırladığı **`COP31_Web_Sitesi_Brief_BinBin.pdf`** esas alınarak mevcut site için hazırlanmıştır. Fazlar işlerin kısa özetidir; ayrıntılı gereksinimler ve teslim ölçütleri için brief baz alınmalıdır. Teknik içeriklerin ana kaynağı **`BinBin_Proje_Teklifi.pdf`** dosyasıdır. Tamamlanan fazın kutusunu işaretleyelim.

## Güncel durum — 4 Kasım 2026

**Faz 1–5, kullanıcının bilinmeyen bilgileri boş bırakarak ilerleme kararı doğrultusunda arayüz ve mevcut içerik kapsamıyla hazırdır.** Sayfalar iki dilde çalışır; ekip/kurum/pilot/karbon bilgileri verilmediyse etiketli boş alanlar korunur. Bu kutular gerçek saha pilotunun, ölçümlerin veya bütün yayın izinlerinin tamamlandığı anlamına gelmez.

Son tasarım/kullanılabilirlik düzenlemeleri, genel bölüm bağlantısı düzeltmesi ve kullanıcının seçtiği **lacivert–mavi demo teması** bu sürüme dâhildir. Ana sayfa ve demo tanıtımındaki ekran görüntüleri mavi sürümden yenilenmiştir. Kaynaklar, sentetik veri açıklamaları, basılı QR hedefi ve demo hesaplama kuralları korunur.

| Faz | Mevcut kapsam | Kalan iş |
| --- | --- | --- |
| 1 — Ortak düzen | Yedi tanıtım adresi, ortak menü/altbilgi, mobil görünüm, EN/TR ve demo/QR akışı hazır. | Gerçek proje e-postası ve son cihaz kabulü. |
| 2 — Ana sayfa/ekip | Kısa proje tanıtımı ve yerinde açılan ekip profilleri hazır. | Ekipten gelecek rol, çalışma paketi, katkı, biyografi ve varsa izinli görseller. |
| 3 — Kurumlar/iş birlikleri | Kurumlar, taslak yönetici kayıtları ve önerilen/pending iş birliği alanları hazır. | Yazılı teyitler, onaylı kapsam/katkı, resmî iletişim ve logo izinleri. |
| 4 — Proje/karbon | Teknik anlatım, göreli pilot takvimi, beklenen etkiler ve hesaplama sınırları hazır. | Gerçek pilot bilgileri, enerji ölçümleri ve doğrulanmış faktör/kaynak kayıtları. |
| 5 — Demo/sunum | Çalışan sentetik demo, beş adımlı tanıtım rehberi ve iki dilde görseller hazır. | Koordinatörden sunum PDF'i/video; teslim sonrası dosya erişimi/oynatma kabulü. |
| 6 — Form | Kullanıcı tarafından arkadaşına bırakıldı; yalnız hazırlık bölümü var. | Form, alıcı, kurum onaylı aydınlatma, spam koruması ve gerçek test gönderimi. Başvuru alınmıyor. |
| 7 — Kontrol/yayın | Yerel build/TypeScript/lint, 11 veri testi, 80 yerleşim ve 32 rehber adımı doğrulandı; mavi tema ayrıca kontrol edildi. | Üretim yayınının doğrulanması, gerçek cihaz/ekran okuyucu kabulü, bekleyen teslimler ve nihai kontrol listesi. |

**Yayın kaydı:** Kullanıcı GitHub gönderimini ve Vercel üretim yayınını onayladı. Bu sürüm `main` dalından mevcut Vercel projesine gönderilecektir; canlı doğrulama sonucu bu bölüme eklenecektir. Hedef tanıtım: [binbin-battery-intelligence.vercel.app/hakkimizda/](https://binbin-battery-intelligence.vercel.app/hakkimizda/); demo: [binbin-battery-intelligence.vercel.app](https://binbin-battery-intelligence.vercel.app/).

Faz 6 ve 7 kutuları, açık işleri görünür tutmak için işaretlenmemiştir. Aşağıdaki faz açıklamaları ilk uygulama turlarının kayıtlarını da içerir; son durum için bu bölüm esas alınır. [Son düzeltme kontrolleri](incelemeler/son-duzeltmeler/INCELEME.md) · [Mavi demo tercihi ve kontrolü](incelemeler/mavi-demo/INCELEME.md).

**Sabit tasarım incelemeleri — 4 Kasım 2026:** [Tasarım inceleme kaydı](TASARIM_INCELEME_KAYDI.md), 12 kullanılabilirlik bulgusunu ve özgünlük/şablon hissi değerlendirmesini birlikte izler. [Son düzeltmeler](incelemeler/son-duzeltmeler/INCELEME.md): bağımsız kontroldeki genel hash yan etkisi giderildi; özet/ayrıntı ayrımı ve stil temizliği uygulandı. On UX maddesinde yerel düzeltme/iyileştirme doğrulandı; UX-05/10 gerçek cihaz/ekran okuyucu kabulü açık. Tasarım kullanıcı incelemesine hazırdır. Bu çalışma Faz 6 formunu başlatmaz veya Faz 7 yayın kabulünü tamamlamaz.

## AI ile çalışırken

**Yalnızca bu faz özetine bakarak uygulamaya başlanmamalı.** Her fazdan önce mevcut kod ve ilgili sayfalar incelenmeli; brief’in aşağıda belirtilen sayfaları, tüm siteye uygulanan kuralları (PDF s. 2–3, 11) ve teknik içerik için proje teklifinin ilgili bölümleri okunmalıdır. Faz, bu kaynaklardaki ayrıntılarla birlikte uygulanmalıdır; mevcut çalışan özellikler yeniden yapılmadan kullanılmalıdır.

Kaynak PDF’ler depoda bulunmayabilir. Çalışan kişiye ve kullandığı AI’a her iki dosya da erişilebilir şekilde verilmelidir. Dosyaya erişilemiyorsa ayrıntılar tahmin edilmemeli, eksik kaynak istenmelidir. Brief ile bu özet veya mevcut site arasında çelişki görülürse fark belirtilip netleştirilmelidir.

## Fazlar

- [x] **Faz 1 — Ortak site düzeni** — Brief: PDF s. 11.

  Yedi tanıtım sayfasının adreslerini, ortak üst menüyü, mobil menüyü ve altbilgiyi oluştur. Font, renk, buton ve sayfa düzenini ortaklaştır; sade ve kurumsal tasarımı koru. Tüm sayfalara EN/TR geçişini uygula; ilk ziyaret İngilizce açılsın, dil değişince aynı sayfanın karşılığı gösterilsin. Altbilgide kurum, proje iletişimi, son güncelleme ve kaynak/telif alanları bulunsun. Diğer fazların kullanabileceği ortak sayfa şablonunu hazırla.

  Yerel uygulama ve üretim önizlemesi doğrulandı (4 Kasım 2026). İnceleme: [Faz 1 kontrol kaydı](incelemeler/faz-1/INCELEME.md). Yeni sayfaların ayrıntılı içerikleri, gerçek proje e-postası ve yayın izinleri sonraki teslimlerde tamamlanacak; yayın yapılmadı.

- [x] **Faz 2 — Ana sayfa ve ekip** — Brief: PDF s. 4, 6.

  Ana sayfada BinBin Battery Intelligence adı, kısa proje tanıtımı, sorun/çözüm özeti, sistem akışı, kurumlar ve COP31 bağlamı yer alsın. Proje, ekip, demo, karbon ve iş birliği sayfalarına yönlendirme ver; demo ilk ekranda erişilebilir kalsın. Ayrı ekip sayfasında rol, çalışma paketi, katkı ve isteğe bağlı bağlantı alanları oluştur. Sıra Gizem, Gamze, Erhan, Yusuf, Ahmed; ardından akademik koordinatör Barış Taha Uludağ olsun. Kişi ve koordinatör profilleri bulundukları yerde genişlesin.

  Kullanıcının boş alanlarla ilerleme kararıyla ana sayfa ve ekip sayfası taslağı hazırlandı (4 Kasım 2026). Bilinmeyen kişi bilgileri etiketli “—” alanlarıdır; içerik ekleme bekliyor. İnceleme: [Faz 2 kontrol kaydı](incelemeler/faz-2/INCELEME.md).

- [x] **Faz 3 — Kurumlar ve iş birlikleri** — Brief: PDF s. 5, 10.

  Kurumlar sayfasında OSTİM Vakfı, OSTİM Teknik Üniversitesi, aralarındaki ilişki, resmî bağlantılar ve yönetici bilgileri için alanlar hazırla. İş birlikleri ve iletişim sayfasında BinBin ve Sustain Bridge için bölümler oluştur; form alanını Faz 6 ile koordine et. Yönetici unvanları, resmî iletişim bilgileri, logo izinleri ve iş birliği kapsamı brief’teki teyit koşullarına göre ele alınsın. BinBin ilişkisini onaylı kapsam doğrultusunda, önerilen pilot iş birliği olarak anlat; doğrulanmamış ortaklık iddiası ekleme.

  Brief bilgileriyle kurumlar ve iş birlikleri/iletişim sayfalarının taslağı hazırlandı (4 Kasım 2026). Yönetici unvanları/iletişimi, onaylı iş birliği kapsamları ve logolar boş alanlarla bırakıldı. Gerçek başvuru alınmıyor; form bölümü Faz 6 için ayrıldı. İnceleme: [Faz 3 kontrol kaydı](incelemeler/faz-3/INCELEME.md).

- [x] **Faz 4 — Proje detayları ve karbon** — Brief: PDF s. 7, 9.

  Proje sayfasında sade özet, amaç, hedef kitle, örnek saha senaryosu, sistem akışı, dört kademeli veri erişimi, planlanan yöntemler ve pilot zaman çizelgesini anlat. Salt-okunur erişimi, BMS güvenliğine müdahale edilmediğini ve son kararın teknik personelde kaldığını belirt. Pasaport kimliği, erişim seviyeleri ve yaşam döngüsü durumlarını açıkla. Ayrı karbon sayfasında beklenen etkileri, resmî batarya karbon ayak izi ile operasyonel emisyonların farkını, hesaplama yöntemini ve sınırlarını göster. Teklifteki gelecek hedeflerini mevcut demoda çalışan özellikler gibi sunma; kesin tasarruf, doğruluk veya emisyon azaltımı rakamı üretme.

  Kullanıcı onayıyla proje ve karbon sayfalarının iki dilli taslağı hazırlandı (4 Kasım 2026). Kesin pilot bilgileri ve gerçek karbon ölçümleri/kaynakları etiketli “—” alanlarıdır. Takvim teklifin göreli pilot Faz 0–5 planıdır; web sitesi fazlarıyla aynı değildir. Beklenen etkiler ölçülmüş sonuçlardan ayrıldı; demodan sayısal değer taşınmadı. İnceleme: [Faz 4 kontrol kaydı](incelemeler/faz-4/INCELEME.md). Yerelde doğrulandı; yayın yapılmadı.

- [x] **Faz 5 — Demo ve sunum** — Brief: PDF s. 8.

  Demoya yeni sekmede açılan belirgin bağlantı, 4–6 adımlık kısa kullanım anlatımı ve açıklamalı 2–3 ekran görüntüsü içeren tanıtım sayfasını oluştur. Demo düğmesinin yanında ve uygulama içinde verilerin sentetik olduğunu, gerçek BinBin filosunu veya nihai arayüzü göstermediğini belirt. Sunum PDF’i için görüntüleme/indirme, video için oynatma veya “Hazırlanıyor” alanı hazırla. Demodaki proje adını ve kimliği güncelle; mevcut EN/TR, etkileşimli rehber, mobil Filo/Ayrıntı akışı ve tanıtıma dönüşü koru.

  Kullanıcı onayıyla iki dilli demo/sunum sayfası, beş adımlı kısa rehber ve her dilde üç açıklamalı gerçek demo ekranı hazırlandı (4 Kasım 2026). Sunum PDF'i ve video sağlanmadığından iki hazırlık kartı durur; dosya uydurulmadı. Demo adı ve görsel kimliği tanıtımla uyumlandı. Mevcut sekiz adımlı rehber ve mobil akış doğrulandı. İnceleme: [Faz 5 kontrol kaydı](incelemeler/faz-5/INCELEME.md). Yerelde doğrulandı; yayın yapılmadı.

- [ ] **Faz 6 — İletişim formu** — Brief: PDF s. 10–11.

  **Kullanıcı kararı:** Form geliştirmesi arkadaşına bırakıldı. Bu iş bekliyor; tamamlandı sayılmadı. Gerçek başvuru alınmıyor.

  Ad-soyad, kurum, e-posta, isteğe bağlı telefon, öneri açıklaması ve aydınlatma kutusuyla iki dilli form hazırla. Alan kontrollerini, en az 20 karakterlik açıklamayı, spam korumasını ve gönderiliyor/başarı/hata durumlarını uygula. Gönderimleri belirlenen kurumsal adrese ilet veya güvenli serviste sakla; gizli anahtarları ortam değişkenlerinde tut. Alıcı adresi ve kurumun onayladığı aydınlatma metni hazır olmadan gerçek başvuru toplamaya açma. Formun tamamlanması için test gönderiminin doğru alıcıya ulaştığını doğrula.

- [ ] **Faz 7 — Kontrol ve yayın** — Brief: PDF s. 11–12.

  Sayfaları birleştir; telefon, tablet ve masaüstünde iki dili, gezinmeyi, erişilebilirliği ve yatay taşmayı kontrol et. İç/dış bağlantıları, QR → tanıtım → demo akışını, sunum/video erişimini ve formun başarı/hata durumlarını dene. Brief’in yayın öncesi içerik, teyit ve izin listesini tamamla; gerekli derleme ve kod kontrollerini çalıştır. README, düzenlenebilir TR/EN içerikler, izin durum listesi ve teslim bağlantılarını güncelle. Eksik dış teslimleri açıkça kaydederek önizlemeyi incele ve yayını doğrula.

**Çalışma sırası:** Önce Faz 1. Ardından Faz 2–6 paralel paylaşılabilir. Son olarak Faz 7.

**Notlar:** Eksik bilgiler “Hazırlanıyor” olarak gösterilecek; bilgi uydurulmayacak. Yer tutuculu arayüzün hazır olması, gerçek içerik ve izinlerin tamamlandığı anlamına gelmez. Her faz TR/EN içeriği ve mobil görünümüyle birlikte değerlendirilecek. Şimdilik Vercel kullanılacak; mevcut `/hakkimizda/` QR hedefi ve `/` demo girişi korunacak. Adres değişirse eski bağlantıların çalışması sağlanacak.

**İçerik çalışma kararı — 4 Kasım 2026:** Kullanıcı, henüz bilinmeyen bilgiler nedeniyle sayfa geliştirmesinin beklememesini istedi. Bilinen taslak ve doğrulanmış kaynaklarla sayfa/etkileşim hazır edilir; bilinmeyen alanlar etiketli boşluk veya “—” olarak bırakılır. Kullanıcı ekipten aldığı içerikleri daha sonra sağlayacaktır. Arayüzün hazır olması ile gerçek içerik ve yayın izinlerinin tamamlanması ayrı kaydedilir.
