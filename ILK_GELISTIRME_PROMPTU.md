# Claude Code — İlk Çalışan Demo Görevi

Bu mesaj, 22 Ekim’de uygulama kodu bulunmayan çalışma klasörü incelendikten sonra hazırlanmıştır. Yalnız bu ilk görev içindir. Sonraki görev kod incelemesinden sonra belirlenecek.

---

Çalışma klasörü: `/Users/demirel/Desktop/Ders/COP31/yazılım`.

23 Ekim’de BinBin ekibine göstermek üzere çalışan bir batarya bakım karar destek demosu geliştir. Amaç, onların desteği ve gerçek verileriyle geliştirmek istediğimiz ürünün arayüzünü ve işleyişini somutlaştırmak. Uygulamayı sen kodlayacaksın; çıkan kod ve ekran başka bir inceleme turunda değerlendirilecek.

Önce `DEMO_KARARLARI.md` ve `CALISMA_DUZENI.md` dosyalarını oku; ardından klasörü incele. Mevcut uygulama varsa önce durumunu değerlendir; yoksa `web/` altında başlat. Kök planlama dosyalarını koru. `MVP_PLANI.md` uzun vadeli hedeftir; bu görevde yalnız aşağıdaki ilk demoyu yap.

Görsel referans: `/Users/demirel/Desktop/Ders/COP31/yazılım/referanslar/binbin-panel-referansi.png`. Görseli aç ve incele. Koyu lacivert, okunaklı bir operasyon arayüzü kur: bakım öncelik listesi ile seçilen bataryanın operasyon paneli ana içerik olsun. Fotoğrafın atölyesini/tablet kasasını taklit etme. Gereksiz tanıtım alanları veya çalışmayan menüler ekleme. Türkçe arayüz kullan.

Teknoloji: React + TypeScript + Vite, Tailwind CSS, Recharts, Lucide React, npm. Veri üretimini Node üzerinde çalışan ayrı TypeScript betiğiyle yap; gerekiyorsa tsx kullan. Ek backend, veritabanı veya Python ortamı kurma. Uyumlu sürümleri seç, Node uyumunu kontrol et ve lock dosyasını kaydet. Büyük bir durum yönetimi veya yönlendirme altyapısı eklemeden React state ile başla.

**Veri hattı:** Sabit seed ve sabit simülasyon başlangıcıyla 500 sanal bataryanın 30 günlük, 5 dakikalık telemetrisini üret. V/I/T/SOC/ΔV ve sanal kapasiteyi tutarlı tut. Deşarj akımı pozitif olsun; SOC sınırında akım/modu uyarlansın. Günlük özet, kapsam, simüle SOH, neden, bakım önceliği ve aksiyon bu üretimden hesaplansın. Basit ve anlaşılır bir üretim modeli yeterli; fiziksel olarak doğrulanmış batarya simülatörü iddiası kurma.

Dört bağımsız senaryo oluştur: baseline; 8. günden itibaren DEMO-001 sıcaklık sapması; DEMO-002 hücre/grup dengesizliği; DEMO-003 veri kaybı. Olaylar hedef telemetriyi değiştirsin; bakım sonucunu senaryo adına bakıp elle atama. Günlük özet ve nedenler değişmiş telemetriden türesin. Olay öncesindeki kayıtlar baseline ile eşleşsin. Geçici ısınma SOH’yi birden düşürmesin.

Demo kuralları için başlangıç değerleri: sıcaklık uyarı/kritik 45/55 °C; ΔV uyarı/kritik 100/200 mV; veri kapsamı %95’in altındaysa veri incelemesi; simüle SOH %80’in altındaysa dikkat. Bunları tek yapılandırmada tut ve üretici sınırı diye sunma. Önce bilinen kritik ihlal, sonra veri incelemesi, sonra dikkat, sonra normal sıralansın; eşitlikte kararlı kimlik sırası olsun. Her önceliğin ölçümle ilişkili nedeni ve kısa, kural tabanlı demo aksiyonu bulunsun. Bilinen kritik ihlal eksik veri yüzünden kaybolmasın.

Veriyi bir hazırlık komutuyla JSON olarak üret. İlk kurulum/derleme sırasında unutulmasını önle. Ham telemetrinin tamamını tarayıcıya yükleme: senaryo/gün bazlı filo özetleri, günlük batarya geçmişleri ve DEMO-001…DEMO-006 için istek üzerine okunan ayrıntılar yeterli. Diğer bataryalarda günlük geçmişi göster; ayrıntı bulunmadığını açıkla. Seed/sürüm/batarya/senaryo/gün alanlarını taşı. Aynı seed aynı içerik üretsin; çalışma saati içerik özetini değiştirmesin.

**Arayüz:** Üstte filo ve durum sayıları, senaryo seçimi ve gün kontrolü; ana alanda arama/filtre/sayfalama destekli bakım listesi ve seçilen bataryanın detay paneli. Listede ID, simüle SOH, öncelik, baskın sinyal ve aksiyon olsun. Panelde SOC, sıcaklık, ΔV, veri kapsamı, bakım nedeni ve aksiyon kartı; günlük sağlık geçmişi ve vitrin bataryalarında telemetri grafikleri olsun. Birimleri doğru göster; eksik ölçümleri grafikte sıfırla doldurma.

Senaryo seçimi ilgili hedef bataryayı ve 8. günü açsın. Baseline karşılaştırması aynı batarya ve aynı günü karşılaştırsın. Sıfırla baseline/1. gün/DEMO-001 ve boş filtrelere dönsün. İlk ekrandaki varsayılan da bu olsun. Hızlı gün/senaryo/batarya değişiminde eski dosya cevabı yeni kart/grafik üstüne yazmasın. Filonun üst sayıları arama sonucuyla karışmasın; filtrelenen sonuç sayısı ayrıca belirtilebilir.

Tüm sayısal kartlar, tablo, grafikler ve aksiyonlar aynı veri durumuna ait olsun. Normal/kritik/veri yetersizliği yalnız renklerle anlatılmasın. Masaüstünde güçlü görünüm ve tablette/dar ekranda kullanılabilir düzen kur. Yüklenme, boş arama sonucu, eksik dosya ve başarısız okuma durumlarını ele al. Font/ikon/varlıklar kurulumdan sonra dış CDN gerektirmesin.

Kalıcı ve sade açıklama: “Sentetik demo · Kural tabanlı değerlendirme”. SOH “Simüle SOH” olarak görünsün. Bu görevde ML, model skoru, RUL/arıza olasılığı, gerçek BinBin verisi iddiası, QR, ayrı pasaport/karbon ekranı, kullanıcı hesabı veya iş emri entegrasyonu yok.

**Doğrulama ve teslim:** Veri üretimini çalıştır, anlamlı veri kontrollerini yap: 500 benzersiz kimlik; senaryo/gün eşleşmesi; aynı seed tekrar üretim; olay öncesi eşleşme ve olay sonrası beklenen değişim; kapsam/null ve öncelik kuralları. Tip kontrolü/lint/üretim derlemesini çalıştır. Tarayıcı erişimin varsa ana akışı ve yerleşimi kontrol et; yoksa bunu açıkça belirt. Çalıştırmadığın kontrolü geçti diye raporlama.

README’ye veri üretimi, geliştirme, build ve yerel önizleme komutlarını yaz. Sonunda değişen dosyaları, çalıştırılan kontrolleri, uygulamanın nasıl açılacağını ve kalan eksikleri kısa raporla. İlgili güncel durumu `DURUM.md` içine kaydet; uzun vadeli planı tamamlandı olarak işaretleme. Bu ilk çalışan demo sınırında dur.
