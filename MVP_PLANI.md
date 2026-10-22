# COP31 — Tam Pipeline Geliştirme Planı

Tarih: 22 Ekim 2026 · Sürüm: 0.4 · Statü: Geliştirme öncesi çalışma planı

## 1. Hedef ve kapsam kararı

Hedef, Excalidraw pipeline’ının tamamını çalışan bir COP31 batarya karar destek demosuna dönüştürmektir. Arayüz referansı, `BinBin_Proje_Teklifi.pdf` dosyasının 10. sayfasındaki bakım öncelik listesi ve tek batarya operasyon panelidir.

**Tam pipeline hedefi korunur.** 23 Ekim’deki BinBin görüşmesi için ayrıca bir sunum kapsamı tanımlanmıştır: Sentetik veri ve açıklanabilir kurallarla çalışan ürün prototipi; ML eğitimi ve QR bu sunumda gerekli değildir. Amaç, BinBin’in desteği ve verisiyle geliştirilmek istenen sistemi somut göstermektir. Gerçek saha ML çalışması ayrı bir sonraki adımdır; sunum prototipi saha doğrulaması tamamlanmış ürün kabul edilmez.

Toplam **8 aşama** vardır. Aşamalar gün sayısı veya kişi dağılımı değildir; her biri birden fazla geliştirme–inceleme turu içerebilir. Eski beş günlük takvim ve teknoloji seçimleri bağlayıcı değildir.

Promptlar önceden hazırlanmaz. Mevcut kod ve çalışan sonuç incelendikten sonra yalnız sıradaki işin Claude Code promptu belirlenir. Uygulama kodunu Claude Code yazar; ChatGPT analiz ve teknik yönlendirmeyi üstlenir.

**İlk demo uygulama kararı:** Kullanıcının basit çalışan demoyla başlama yönlendirmesi üzerine, mevcut uygulama bulunmadığı kontrol edilerek [demo kararları](DEMO_KARARLARI.md) ve yalnız [ilk geliştirme görevi](ILK_GELISTIRME_PROMPTU.md) hazırlandı. İlk uygulama Vite/React/TypeScript ve Node veri üreticisi kullanacak, tamamen sentetik olacak. Bu yakın demo için kaynak arşivi entegrasyonu ön koşul olmaktan çıkarıldı; aşağıdaki tam pipeline’ın kaynak/Python/ML ve pasaport hedefleri sonraki çalışmalar için korunuyor. Henüz yapılmış gibi sunulmayacaklar.

## 2. Gerçekleştirilecek pipeline

**Kaynak edinme → alan/birim/zaman doğrulama → referans profil çıkarma → sentetik filo ve telemetri üretimi → senaryolar → özellikler ve hesaplamalar → doğrulanmış veri paketi → etkileşimli panel/profil/pasaport → çevrimiçi ve yerel gösterim.**

Temel ilkeler:

- Gösterilen filo, kullanım geçmişi ve olaylar sentetiktir. Gerçek hücre deneylerinden hangi ilişkilerin alındığı ayrıca kaydedilir.
- Panelin sayıları, öncelik sırası, baskın sinyali ve önerilen aksiyonu üretim/hesaplama hattından gelir. Ekranı doldurmak için elle yazılmış sonuçlar teslim verisi kabul edilmez.
- Batarya, senaryo, gün ve veri sürümü bütün ekranlarda eşleşir.
- Anomali, simüle SOH, veri kalitesi ve bakım önceliği ayrı anlamlar taşır.
- Eksik ölçüm sıfır veya sağlıklı durum değildir. Geçici sıcaklık sapması tek başına kalıcı kapasite kaybı sayılmaz.
- Yerel gösterimin temel akışı dış servis gerektirmeden açılır.
- Geliştirme sırasında küçük test verileri kullanılabilir; bunlar tam pipeline’ın yerine teslim edilmiş sayılmaz.

## 3. Tamamlanmış sistemin kapsamı

| Bileşen | Hedeflenen sonuç |
|---|---|
| Kaynak | Seçilmiş açık deney verisi; sürüm, lisans, dosya özeti ve dönüşüm kayıtları |
| Sentetik filo | 500 sanal batarya, 30 sanal gün, 5 dakikalık telemetri |
| Senaryolar | Normal durum, sıcaklık sapması, hücre/grup dengesizliği, veri kaybı |
| Hesaplama | Günlük özellikler, anomali, simüle SOH, veri kapsamı, açıklanabilir bakım önceliği |
| Veri paketi | Manifest, kimlikler, günlük filo durumları, geçmişler, vitrin detayları, pasaportlar, veri kökeni |
| Öncelik listesi | Batarya ID, simüle SOH, öncelik, baskın sinyal, önerilen aksiyon; arama/filtre/sıralama |
| Operasyon paneli | Batarya özeti, hücre/sağlık göstergeleri, bakım ve risk değerlendirmesi, aksiyon açıklaması, grafikler |
| Zaman kontrolleri | 1–30 gün, senaryo seçimi, aynı günün normal durumuyla karşılaştırma, sıfırlama |
| Sağlık geçmişi | 500 bataryada günlük geçmiş; 6 vitrin bataryasında ayrıntılı telemetri |
| Demo pasaport | 500 kimlik için kayıt/yol; kaynak, yaşam döngüsü ve sabit çevrimiçi adrese QR |
| Yaşam döngüsü ve emisyon | Sentetik yaşam döngüsü görünümü; yöntemi/varsayımları açıklanmış operasyonel enerji ve emisyon kartı |
| Kullanım ve teslim | Masaüstü/stand, tablet/mobil; yerel/çevrimiçi sürüm, yönerge, yedek, prova |

500/30/6 değerleri mevcut pipeline’ın hedefidir. Testler değişiklik gerektirirse gerekçe ve kapsam açıkça güncellenir; sessizce azaltılmaz.

### Arayüz referansının uygulanması

İki ana görünüm birlikte gerçekleştirilir:

1. **Bakım ve risk yönetimi listesi:** Kolay taranan satırlar; kimlik, sağlık, öncelik, baskın sinyal ve aksiyon. Kritik/uyarı/normal ayrımı yanında veri incelemesi de anlaşılır biçimde gösterilir.
2. **Tek batarya operasyon paneli:** Kimlik/model/durum özeti; hücre ve sağlık göstergeleri; bakım önceliği ve nedenleri; aksiyon kartı; geçmişi açıklayan grafikler.

Koyu lacivert zemin, kart hiyerarşisi ve renkli öncelik vurguları başlangıç görsel yönüdür. Fotoğraftaki tablet çerçevesi/atölye uygulama bileşeni değildir; ekrandaki bilgi düzeni işlevsel bir web arayüzüne dönüştürülür. Masaüstünde liste ve seçili batarya birlikte sunulabilir; dar ekran akışı geliştirmede değerlendirilir.

Referans görseldeki her metin/sayı teknik gereksinim sayılmaz. RUL ve arıza olasılığı gibi hesaplanmayan sonuçlar uydurulmaz. RUL alanı korunursa “Bu demoda hesaplanmıyor” yazılır. SOH simüle olarak etiketlenir; “doğrulanmış SOH” denmez. Veri yetersizliği yeşil/düşük risk sayılmaz. Baskın sinyal, yorum ve aksiyonun dayanağı birbirinden ayrılır.

### Demo ile saha projesinin sınırı

Tamamlanacak kapsam mevcut COP31 demo pipeline’ıdır. Teklifteki uzun vadeli saha pilotu otomatik olarak bu kapsama taşınmaz. Gerçek BMS/IoT erişimi, gerçek yetkilendirme, kalıcı iş emri entegrasyonu, kişisel veri toplama ve sahada doğrulanmış RUL/arıza tahmini kapsam dışıdır.

Başlangıç yaklaşımı önceden hesaplanmış senaryolardır. Serbest olay zamanı/şiddeti, birleşik arızalar veya canlı model servisi gerekirse ayrı mimari değişiklik olarak değerlendirilir. Mimari seçimler değişebilir; veri–sonuç tutarlılığı korunur.

## 4. Sekiz aşama

| Aşama | Ana çıktı | Kabul kapısı |
|---|---|---|
| 1 — Gereksinimler ve veri sözleşmesi | Ekran–veri–hesap eşlemesi, kapsam, kabul listesi | Her göstergenin kaynağı/anlamı belli |
| 2 — Kaynak verinin hazırlanması | Okunmuş kaynak, normalleştirilmiş profiller, kaynak kayıtları | Gerçek dosyalar/alanlar doğrulanmış |
| 3 — Yazılım temeli ve küçük uçtan uca akış | Küçük üretim → paket → ekran | Temiz başlangıç ve veri bağlantısı çalışıyor |
| 4 — Tam sentetik filo ve senaryolar | 500 batarya/30 gün; normal + üç olay | Üretim tekrarlanabilir ve tutarlı |
| 5 — Hesaplamalar ve veri paketi | Skor, neden, aksiyon, geçmiş, manifest | Sayısal kontroller ve paket bütünlüğü geçiyor |
| 6 — Tam arayüz ve entegrasyon | Referans paneller, grafik, pasaport, yaşam döngüsü | Bütün akışlar üretilmiş veriyle çalışıyor |
| 7 — Sistem doğrulaması ve sağlamlaştırma | Sayısal/işlevsel/görsel/cihaz/çevrimdışı kabul | Engelleyici veya anlamı bozan hata yok |
| 8 — Sürüm teslimi, yayın ve prova | Aynı sürümün yerel/çevrimiçi paketi ve yönergesi | Tekrarlanabilir açılış ve beş hatasız gösterim |

Temel sıra: **1 → 2 → 3 → 4 → 5 → 6 → 7 → 8.** Küçük veri bağlantısı çalıştıktan sonra arayüzün görsel geliştirmesi 4–5 sürerken ilerleyebilir; tam entegrasyon 5’in çıktısına bağlıdır. Bu sıra kişi/ajan görevlendirmesi değildir.

### Aşama 1 — Gereksinimler ve veri sözleşmesi

**Amaç:** Pipeline ile referans ekranları ortak bir ürün tanımına dönüştürmek.

**Çıktılar:** Mevcut kod/ortam incelemesi; ekran–alan eşlemesi; kimlik/senaryo/gün/sürüm ve zaman kuralları; birimler/null/veri yeterliliği; eşikler, öncelik sırası, baskın sinyal ve aksiyon tanımları; veri dosyaları/okuyucu sözleşmesi ve sürümleme.

**Kabul:** Her görünür göstergenin girdisi/hesabı veya açık “hesaplanmıyor” durumu bellidir. Öncelik ve veri inceleme durumları hesap/ekran arasında eşleşir. Varsa mevcut kod görülmeden yeniden kurulum kararı verilmez. Varsayımlar doğrulanmış bulgulardan ayrılır.

### Aşama 2 — Kaynak verinin hazırlanması

**Amaç:** Açık deney verisini fiilen okuyup sentetik üretimde kullanılabilir hale getirmek.

**Çıktılar:** Arşiv/sürüm/lisans/atıf/SHA-256 kaydı; dosya ve kolon eşlemesi; zaman, örnekleme, V/I/T birimleri ve akım işareti; profil parçaları/deney koşulları; eksik/hatalı ölçüm kuralları; hücreden varsayımsal pakete dönüşüm kaydı. Gerçek kaynak, türetilmiş profil ve tamamen sentetik alanlar ayrılır.

**Kabul:** Seçilen profiller okunur, dönüşümler örnek değerlerle doğrulanır. Ham dosya okunmadan kaynak entegrasyonu tamamlanmış sayılmaz. Kaynak erişilemiyorsa sorun çözülür veya açık kapsam değişikliği yapılır; elle yazılmış veriye kaynak entegrasyonu denmez.

Bir hücrenin deneylerinden türetilen 500 kimlik, 500 bağımsız gerçek gözlem değildir. Kaynak, uzun dönem SOH veya çok hücreli dengesizlik için doğrulanmış etiket kabul edilmez.

### Aşama 3 — Yazılım temeli ve küçük uçtan uca akış

**Amaç:** Üretim hattı ile ekranın bağlantısını küçük ölçekte kanıtlamak.

**Çıktılar:** Web/veri hazırlık kodunun çalışma düzeni; sabitlenmiş bağımlılıklar ve yönerge; kaynak profillerinden yararlanan yaklaşık 10 bataryalık deterministik üretim; sözleşmeyle dışa aktarım/okuyucu doğrulaması; küçük liste, batarya seçimi ve doğru telemetriyi gösteren başlangıç ekranı; erken yerel üretim derlemesi.

**Kabul:** Küçük üretim paketi ekrana ulaşır. Seçilen batarya/gün ile görülen değerler eşleşir. Temiz başlangıç ve üretim derlemesi çalışır. Geliştirme örnekleri teslim verisiyle karıştırılmaz.

### Aşama 4 — Tam sentetik filo ve senaryolar

**Amaç:** Pipeline’ın tam veri hacmini ve olay davranışını üretmek.

**Çıktılar:** 500 kimlik, başlangıç kapasitesi/sağlığı, kullanım düzeni ve paket varsayımları; 30 gün × günlük 288 yuva; V/I/T/SOC/ΔV; profil/seed/yapılandırma kökeni; normal durum ile sıcaklık/dengesizlik/veri kaybı dalları; olay zamanı/hedef kimlikleri; tüm günlük geçmişler ve 6 vitrin ayrıntısı. Temel üretim 4.320.000 telemetri yuvasıdır.

**Kabul:** Aynı kaynak/seed/yapılandırma/sabit bağımlılıklar aynı içerik özetlerini verir. SOC–akım–kapasite ve hücre/paket gerilim ilişkileri tutarlıdır. SOC sınırında sınırsız enerji akışı sürmez. Eksik yuvalar korunur, ölçümler null olur. Günlük tepe değerleri olayları gizlemez. Her senaryonun etkilemesi/etkilememesi gereken alanlar kontrol edilir.

Mevcut taslağın 8. gün başlangıcı ve ayrı hedef kimlikleri adaydır; Aşama 1 sözleşmesiyle kesinleştirilir.

### Aşama 5 — Hesaplamalar ve dağıtılabilir veri paketi

**Amaç:** Paneldeki karar destek sonuçlarını aynı telemetriden üretmek.

**Sunum/ML ayrımı:** 23 Ekim sürümünde bu aşamanın veri kapsamı, simüle SOH, eşik uyarıları, bakım önceliği, neden ve aksiyon hesapları çalışır; model eğitimi yapılmaz. Model skoru yerine sıfır veya uydurma sonuç yazılmaz. Göstergeler “kural tabanlı uyarı” olarak adlandırılır. Aşağıdaki model eğitimi/değerlendirme hedefleri daha sonraki ML çalışmasına aittir. Bunun için BinBin verisinin kapsamı, etiket ihtiyacı ve doğrulama yöntemi ayrıca değerlendirilecektir.

**Çıktılar:** İlgili gün sonuna kadar veriden günlük özellikler; normal referanslarla anomali modeli (aday: Isolation Forest); kapasite oranından simüle SOH ve tanımlı sağlık eğilimi; veri kapsamı; kritik eşik kuralları; bakım seviyesi/sırası; neden kodları, baskın sinyal ve önerilen demo aksiyonu. Model/kurallar sürümü, özellik sırası, eğitim/değerlendirme ayrımı ve sonuçları kayıtlı olur.

Paket; manifest, kimlikler, günlük filo durumları, geçmişler, vitrin detayları, pasaport, yaşam döngüsü ve köken kayıtlarını içerir. Dört senaryoda toplam 60.000 günlük özet hedeflenir. Dosyalar gün/batarya/senaryo bazında parçalanır; bütün ham filo tarayıcıya yüklenmez.

**Kabul:** Seçilmiş sonuçlar aynı telemetriden bağımsız kontrol edilir. Yetersiz girdide model skoru null; bilinen kritik ihlal eksik veri yüzünden kaybolmaz. IF çıktısı arıza olasılığı değildir. Geçici olay SOH’yi nedensiz düşürmez. Sıra kararlıdır; baskın sinyal ve aksiyonun dayandığı neden bulunur. Dosya kimlikleri, referanslar ve sürümler doğrulanır.

Aynı profilin yakın varyasyonları eğitim/değerlendirmeye bağımsız gerçek örnekler gibi dağıtılarak başarı iddiası kurulmaz. Değerlendirme sentetik senaryo davranışıyla sınırlıdır.

Enerji/emisyon kartı için şebekeden şarja alınan enerji ve açıklanmış faktör kullanılır; gerekiyorsa şarj verimi uygulanır. Kaynak/bölge/yıl bilinmiyorsa varsayımsal faktör açıkça etiketlenir. Eksik enerji aralıkları gizlenmez; resmî ürün karbon ayak izi veya kanıtlanmış tasarruf iddiası yapılmaz.

### Aşama 6 — Tam arayüz ve entegrasyon

**Amaç:** Referans panelleri, pipeline’ın üretilmiş çıktılarıyla çalışan uygulamaya dönüştürmek.

**Çıktılar:** Bakım listesi ve operasyon paneli; arama/filtre/sıralama; sağlık/veri yeterliliği/baskın sinyal/aksiyon; V/I/T/SOC/ΔV ve sağlık grafikleri; dört senaryo ve 1–30 gün; aynı günün baseline karşılaştırması; sıfırlama ve son günde duran oynatma; 500 pasaport yolu, QR, yaşam döngüsü ve enerji/emisyon kartı; yüklenme/boş sonuç/bilinmeyen kimlik/uyumsuz paket/okuma hatası; masaüstü/tablet/mobil ve yerel varlıklar.

**Kabul:** Listeden seçilen batarya doğru paneli açar. Liste/kart/grafik/aksiyon aynı sürüm/senaryo/güne aittir. Hızlı seçimde eski okuma yeni durumu bozmaz. Etkin kontroller çalışır. Veri yetersizliği düşük risk gibi görünmez. Bütün pasaportlar ulaşılabilir; olmayan kimlik açıklayıcı hata verir. QR sabit çevrimiçi adrese gider. Ekran referansla görsel olarak karşılaştırılır; yalnız derleme başarısı arayüz kabulü sayılmaz.

Bakım önerisi gerçek ekipmana komut göndermez. Rol görünümü eklenirse gösterim niteliği açıklanır; statik paket gerçek yetkilendirme sağlamaz.

### Aşama 7 — Sistem doğrulaması ve sağlamlaştırma

**Amaç:** Veri, hesap, görünüm ve kullanım ortamını birlikte doğrulamak.

Kontroller: Kaynak dönüşümleri/birimler/sınırlar/kimlikler/tekrar üretim; olay öncesi/sonrası ve eksik veri; bağımsız örnek hesaplar; gelecekteki veriyi kullanmama ve eğitim/değerlendirme ayrımı; hızlı seçim/karşılaştırma/sıfırlama/başarısız yükleme; üretim çıktısında doğrudan pasaport/yenileme/404/sürüm uyumsuzluğu; internet kapalı ve önbellek boş yerel soğuk başlangıç; daha önce açılmamış detaylar; cihaz/dar ekran/klavye/okunabilirlik/renk dışı durum açıklaması; boyut/performans/dış ağ; sentetik/model/SOH/karbon etiketleri ve lisans.

**Kabul:** Gösterimi engelleyen veya verinin/sonucun anlamını değiştiren hata açık kalmaz. Sonuç, cihaz, ölçüm koşulları ve kalan küçük sorunlar kayıtlıdır. Üretim çıktısı kontrol edilir.

İlk performans hedefleri: ilk ekran verisi sıkıştırılmış ≤1 MiB; bir detay ham ≤100 KiB; hedef cihazda ilk kullanılabilir ekran ≤3 saniye; yüklenmiş gün/senaryo geçişi ≤300 ms. Bunlar henüz ölçülmüş sonuç değildir.

### Aşama 8 — Sürüm teslimi, yayın ve prova

**Amaç:** Aynı sürümü çevrimiçi ve yerelde tekrarlanabilir biçimde göstermek.

**Çıktılar:** Kod/veri/sürüm kimliği eşleşmiş paket ve kaynak/model/kurallar kayıtları; aynı çıktının çevrimiçi yayını ve yerel kopyası; başlatma yönergesi, önceden hazırlanmış ortam ve yedek; üç dakikalık akış, teknik soru-cevap ve bilinen sınırlamalar.

**Kabul:** Beş ardışık gösterim hatasız tamamlanır. Başka biri yönergeyle yerel kopyayı açabilir. İnternet kapalı yeniden başlatma başarılıdır. Çevrimiçi pasaport telefonda açılır. Yerel standın çevrimdışı çalışması, ziyaretçi telefonunun internet gereksinimi veya ortak oturumla karıştırılmaz.

## 5. Mimari yaklaşım ve değişiklik yönetimi

Başlangıç önerisi: Python hazırlık hattı + sürümlü statik veri + TypeScript/React arayüz. Next.js statik çıktı adayıdır; teknoloji mevcut kod/ortam ve kabul ihtiyaçlarıyla netleşir. Barındırma sağlayıcısı henüz bağlayıcı değildir.

Tarayıcı önceden hesaplanmış paketleri seçer; anomali/SOH/önceliği başka kurallarla tekrar hesaplamaz. Veri erişimi ekranlardan ayrılır. Python–TypeScript uyumu sözleşme ve paket doğrulamasıyla kontrol edilir.

Mimari değişiklikte çözülen ihtiyaç, seçenek, karar gerekçesi ve veri/çevrimdışı çalışma/test etkisi kaydedilir. Veritabanı, mikroservis ve model sunucusu mevcut pipeline’ın zorunlu bileşenleri değildir; gereksinim varsa değerlendirilir.

## 6. Tam MVP’nin toplu kabulü

- [ ] Kaynak dosyaları gerçekten okunmuş; kaynak/lisans/dönüşümler kayıtlı.
- [ ] 500 batarya/30 gün/normal + üç olay için deterministik üretim tamam.
- [ ] SOC/kapasite/gerilim/enerji ve veri kalitesi kontrolleri geçiyor.
- [ ] Özellik/anomali/SOH/öncelik/neden/aksiyon aynı telemetriden geliyor.
- [ ] Paket ve okuyucu sözleşmesi doğrulanmış; kimlik/senaryo/gün/sürüm tutarlı.
- [ ] Referanstaki liste ve operasyon paneli işlevsel/görsel olarak kontrol edilmiş.
- [ ] 500 günlük geçmiş, 6 ayrıntılı profil ve 500 pasaport yolu çalışıyor.
- [ ] Yaşam döngüsü ve enerji/emisyon kartı hesap/köken açıklamasıyla tamam.
- [ ] Karşılaştırma/sıfırlama/hata durumları ve üretim çıktısı kabul edilmiş.
- [ ] Yerel soğuk başlangıç, çevrimiçi yollar/QR, yönerge/yedek ve beş prova tamam.

## 7. 23 Ekim BinBin görüşmesi — ürün prototipi

**Amaç:** “Bu arayüz ve çalışma akışına sahip sistemi sizin desteğiniz ve verilerinizle geliştirmek istiyoruz” anlatısını çalışan yazılımla somutlaştırmak.

Sunumun hedefi; referanstaki bakım listesi ve operasyon panelinin sentetik veri üretimi, günlük hesaplar, açıklanabilir bakım kuralları, neden/aksiyon ve senaryo değişimleriyle birlikte çalışmasıdır. Panelin anlamlı sayıları gerçekten üretim hattından gelir. Senaryo/gün/batarya seçimlerinde liste, detay ve grafikler aynı durumu gösterir.

- **ML eğitimi/çıkarımı sunum kapsamı dışında.** Sentetik veriyle eğitilmiş bir modelin hazır olması, BinBin sahasında geçerli bir çözümün doğrulanması anlamına gelmez. Sentetik ML ileride teknik hat denemesi için kullanılabilir; bu görüşmenin ön koşulu değildir.
- **QR sunum kapsamı dışında.** Uzun vadeli pasaport/QR hedefi planda korunur.
- **Gerçek çalışan hesaplar:** Veri kapsamı, simüle kapasite/SOH, sıcaklık/ΔV eşikleri, bakım sırası ve açıklanabilir öneriler. Bunlar ML sonucu diye adlandırılmaz.
- **Görünür açıklamalar:** Sentetik demo, simüle SOH ve kural tabanlı değerlendirme. Hesaplanmayan RUL/arıza olasılığı/model sonucu uydurulmaz.
- **Sonraki ML adımı:** BinBin veri erişimi ve yeterliliği → hedef/etiket tanımı → basit karşılaştırma → model geliştirme → ayrılmış gerçek veride ve saha sürecinde doğrulama. Gerekli etiket, seçilen hedefe göre belirlenir.

Bu kayıt sunum hedefini belirler; henüz çalışan kodu veya süreyi doğrulamaz. Tam pipeline hedefleri ayrıca korunur. Diğer ekranların ne kadarının sunulacağı mevcut uygulama ve kalan süre üzerinden değerlendirilir.

## 8. Dayanak ve doğrulama sınırı

22 Ekim’de Excalidraw, yerel mimari/veri sözlüğü ve teklifin ilgili arayüz/veri/model/karar destek bölümleri incelendi. Teklifin 10. sayfası ve kullanıcının paylaştığı görsel arayüz referansıdır. Teklifin uzun vadeli saha pilotu ile COP31 sentetik demosu ayrıdır.

Henüz uygulama kodu, ham kaynak arşivi, üretim hattı, model veya çalışan demo doğrulanmış değildir. Plan, uygulamanın tamamlandığını ifade etmez.

- [Pipeline](https://excalidraw.com/#room=3c0185e193c2d35e7bc6,TXfL4zOBQqwim3RwzyoqVw)
- [Teklif PDF](../BinBin_Proje_Teklifi.pdf)
- [Önceki mimari](../docs/cop31-demo-plan/architecture.md)
- [Önceki veri sözlüğü](../docs/cop31-demo-plan/data-dictionary.md)
- [Next.js statik çıktı](https://nextjs.org/docs/app/guides/static-exports)
- [Isolation Forest](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html)
- [Aday açık veri kaynağı](https://data.mendeley.com/datasets/wykht8y7tg/1)
