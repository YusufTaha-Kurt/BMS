# Sabit tasarım inceleme kaydı

Tarih: 4 Kasım 2026. Kullanıcı önceki tetkiklerin sabitlenmesini ve sitenin “AI üretimi gibi görünmesi” açısından da değerlendirilmesini istedi.

Bu dosya, tasarım çalışmalarında dönülecek ortak referanstır. Bulguların kaydedilmesi, düzeltmelerin uygulandığı anlamına gelmez. Mevcut durum: **son bağımsız kontroldeki hash yan etkisi giderildi; özet/ayrıntı ayrımı ve stil temizliği uygulandı. On UX maddesinde yerel düzeltme/iyileştirme doğrulandı; UX-05/10 gerçek cihaz/yardımcı teknoloji kabulü açık. OZ/GS uygulaması ve son düzenlemeler kullanıcı incelemesine hazır; estetik son kabul kullanıcıya aittir.**

## Referanslar

1. [HIG / apple-design kullanılabilirlik incelemesi](incelemeler/hig-apple-design/INCELEME.md): 80 yerleşim durumu, etkileşim kanıtları ve 12 ana bulgu. Bu ilk rapor mevcut hâliyle korunur.
2. [Özgünlük ve şablon hissi incelemesi](incelemeler/hig-apple-design/OZGUNLUK_INCELEMESI.md): HIG ve doğrudan şablon estetiğini ele alan Anthropic frontend-design kaynaklarıyla ilişkilendirilen, tasarıma özgü yorumlar. Bunlar AI üretimini saptayan ölçümler değildir.
3. [Görsel sistem incelemesi](incelemeler/hig-apple-design/GORSEL_SISTEM_INCELEMESI.md): kullanıcının ek yönlendirmesiyle renk kombinasyonu, font seçimi, tipografik ölçek, bloklar, butonlar, boşluklar ve görsel kompozisyon ayrıca incelendi. Metin değişikliği tek başına yeterli kabul edilmez.

## Kullanılabilirlik bulguları — sabit kimlikler

Numaralar ilk rapordaki başlıklarla birebir eşleşir. Her madde, düzeltmesi ve uygun doğrulaması yapılana kadar açık kalır.

| Kimlik | Bulgu | Durum |
| --- | --- | --- |
| UX-01 | Mobil ayrıntı/liste geçişinde klavye odağı | Giderildi / doğrulandı |
| UX-02 | Rehber oklarının grafik tuşlarıyla çakışması | Giderildi / doğrulandı |
| UX-03 | Rehber açılış/kapanış odağı ve adım bildirimi | Giderildi / doğrulandı |
| UX-04 | Demo sekmelerinin klavye modeli | Giderildi / doğrulandı |
| UX-05 | Hareketi azaltma ve bekleyen otomatik kaydırmalar | Kısmi — cihaz testi açık |
| UX-06 | Doğrudan proje bölüm adresinin hedefe inmemesi | Giderildi — genel hedeflerin durum koruması ve özel hedefler doğrulandı |
| UX-07 | Küçük yardımcı metinler ve mobil yazı ölçeği | Giderildi / doğrulandı |
| UX-08 | Dokunma hedeflerinin rahatlığı | Giderildi / doğrulandı |
| UX-09 | Uzun sayfalarda bilgiye ulaşma maliyeti | İyileştirildi / yerelde doğrulandı — kullanıcı incelemesine hazır |
| UX-10 | Grafik adlandırması ve metinsel özetler | Kısmi — ekran okuyucu testi açık |
| UX-11 | Demoda içeriğe geçiş kısayolu | Giderildi / doğrulandı |
| UX-12 | Yatay/kısa ekranda rehberin hedefleri örtmesi | Giderildi / doğrulandı |

## Özgünlük incelemesi — öneri kimlikleri

| Kimlik | Tasarım değerlendirmesi | Durum |
| --- | --- | --- |
| OZ-01 | Farklı içerik türlerinde tekrarlanan kart düzenleri | Uygulandı / görsel kontrol yapıldı |
| OZ-02 | Projeye özgü bilgi yerine genel sloganların ağırlığı | Uygulandı / görsel kontrol yapıldı |
| OZ-03 | Genel batarya illüstrasyonunun ana görsel olması | Uygulandı / görsel kontrol yapıldı |
| OZ-04 | Tekrarlayan bölüm ritmi ve benzer vurgu düzeyleri | Uygulandı / görsel kontrol yapıldı |
| OZ-05 | Okuyucuya seslenmek yerine sunum yöntemini açıklayan metinler | Uygulandı / görsel kontrol yapıldı |
| OZ-06 | Gerçek proje/demoya ait malzemenin görünürlüğü | Uygulandı / görsel kontrol yapıldı |
| OZ-07 | Boş alanların form benzeri görsel sunumu | Uygulandı / görsel kontrol yapıldı |
| OZ-08 | Açık bir editoryal ses ve görsel vurgu kararının eksikliği | Uygulandı / görsel kontrol yapıldı |

## Görsel sistem incelemesi — öneri kimlikleri

Bu değerlendirme OZ maddelerini tamamlar; önceki kayıtların yerine geçmez.

| Kimlik | Tasarım değerlendirmesi | Durum |
| --- | --- | --- |
| GS-01 | Renk paletinin rolleri ve dağılımı | Uygulandı / görsel kontrol yapıldı |
| GS-02 | Font seçiminin kimlik açısından değerlendirilmesi | Uygulandı / görsel kontrol yapıldı |
| GS-03 | Yazı ölçeği ve ağırlık dengesi | Uygulandı / görsel kontrol yapıldı |
| GS-04 | Bilgi blokları ile tıklanabilir yüzeylerin benzerliği | Uygulandı / görsel kontrol yapıldı |
| GS-05 | Buton ailesi ve eylem hiyerarşisi | Uygulandı / görsel kontrol yapıldı |
| GS-06 | Boşluk ve sayfa kompozisyonu | Uygulandı / görsel kontrol yapıldı |
| GS-07 | Köşe, çizgi, rozet ve ikonların ortak dili | Uygulandı / görsel kontrol yapıldı |
| GS-08 | Ana görsel ve demo görsellerinin kompozisyondaki yeri | Uygulandı / görsel kontrol yapıldı |

## Korunacak kararlar

- **Güncel kullanıcı tercihi:** Demo arayüzünün yeşil zemini beğenilmedi; önceki lacivert/mavi palet geri getirildi. Demo arka planı/panel/kart/vurgu renkleri bu tercihe göre korunur. Tanıtımın açık zemin/bordo yönü sürer; demo ile aynı arka plan rengini kullanma zorunluluğu yoktur. Tanıtımdaki sekiz demo görseli mavi sürümden yenilendi. [Kontrol kaydı](incelemeler/mavi-demo/INCELEME.md).

- Bilinmeyen bilgiler boş kalır; kullanıcı ekipten aldıkça sağlar. Fotoğraf, logo, iş birliği, başarı veya ölçüm uydurulmaz.
- Brief'in sayfa kapsamı, kaynakları ve zorunlu sentetik veri/beklenen etki açıklamaları korunur.
- Proje teklif/pilot planlama aşamasındadır. Mevcut demo sentetik ve açıklanabilir kurallara dayalıdır.
- Kullanıcı Faz 6 formunu arkadaşına bıraktı. Form bekleyen iştir; tamamlandı sayılmaz. Bu inceleme form geliştirmesini yeniden başlatmaz.
- Dil desteği, basılı QR hedefi ve mevcut demo işlevleri korunur. Kullanıcının ek yönlendirmesiyle mevcut renk kombinasyonu ve font seçimi de değerlendirmeye açıktır; mevcut uygulama değişmez tasarım kararı sayılmaz. Varsa brief/kurumsal kimlik zorunlulukları gözetilir; alternatif görsel yön somut örneklerle değerlendirilir.
- Bu kayıt yerel tasarım uygulamasını izler. GitHub gönderimi, commit veya yayın yapılmadı.

## İzleme biçimi

Düzeltme yapıldığında ilgili kimliğe değişiklik özeti ve doğrulama kanıtı eklenir. İlk gözlem raporu sessizce yeniden yazılmaz; yeni test sonucu ayrı kaydedilir. Özgünlük önerileri uygulanmış sayılmadan önce gerçek içerik, iki dil ve mobil/masaüstü üzerinde tekrar değerlendirilir.

## Uygulama ve doğrulama — 4 Kasım 2026

**En son düzeltme turu:** [Son düzeltmeler ve kontroller](incelemeler/son-duzeltmeler/INCELEME.md). Genel hash yan etkisi giderildi. Ana sayfa/proje/karbon ilk okuma yükü azaltıldı; stiller birleştirildi. Build/lint/11 veri testi, 80 yerleşim ve 32 rehber adımı geçti. UX-05/10'un gerçek cihaz/yardımcı teknoloji kabulü açık. Önceki kontrol aşağıda tarihsel kayıt olarak korunur; güncel durum üstteki tablodur.

**Sonraki bağımsız kontrol:** [Tasarım güncellemesi ve faz karşılaştırması](incelemeler/tasarim-bagimsiz-kontrol/INCELEME.md). Üretim derlemesi, 11 veri testi ve 55 yerleşim durumu geçti. UX-06 için `#main`/`#top` hedeflerinin açılır alanları istemeden açması tekrar üretildi; UX-09 tam kapanmış kabul edilmedi. Aşağıdaki uygulama tabloları önceki uygulama turunun kanıtlarıdır; güncel durum üstteki takip tablosunda ve bağımsız rapordadır.

Bu tur 28 bağımsız yama olarak ele alınmadı. Önce demo klavye/odak akışları; ardından ortak renk–tipografi–eylem sistemi; sonrasında içerik türlerine göre sayfa kompozisyonları uygulandı. Ayrıntılı kanıt dizini: [Uygulama ve doğrulama](incelemeler/tasarim-uygulama/UYGULAMA_DOGRULAMA.md).

İlk üç inceleme dosyası ve eski kanıtları değiştirilmedi. `web/shared`, `web/scripts` ve ilk inceleme klasöründeki toplam 28 dosyanın uygulama öncesi/sonrası SHA-256 karşılaştırmasında değişiklik yok: [koruma kontrolü](incelemeler/tasarim-uygulama/preservation.json). Önceki yerel faz çalışmaları korunarak düzenleme yapıldı.

### Kullanılabilirlik

| Kimlik | Uygulanan çözüm | Kanıt / açık doğrulama |
| --- | --- | --- |
| UX-01 | Mobil ayrıntıda başlığa odak; filoya dönüşte seçilen kimlik düğmesine odak. Kaydırma ve odak aynı hedefe bağlandı; bekleyen frame iptal edilebilir. | [TR/EN akışları](incelemeler/tasarim-uygulama/flows.json): `panel-title` → Tab ile ayrıntı işlemi → `BT-10087`; arama ve filtre aynı. Üretim sürümünde tekrarlandı. |
| UX-02 | Ok kısayolları yalnız rehberin kendi bölgesinde; grafik ve sekmelerin tuşları korunur. Escape rehberi kapatır. | [Etkileşim](incelemeler/tasarim-uygulama/interaction-results.json), [üretim](incelemeler/tasarim-uygulama/production-interactions.json): grafik sağ oku rehberi 2/8'de bırakır. |
| UX-03 | Non-modal rehber açılırken kendi bölgesine odak; adım sayısı ve başlığı polite status; kapat/bitir/Escape sonrası tetikleyiciye dönüş. | [32 rehber adımı](incelemeler/tasarim-uygulama/guide-steps.json); TR/EN × mobil/masaüstü bitiş odağı `guide-trigger`. Duyurunun gerçek ekran okuyucuyla dinlenmesi UX-10 ile açık. |
| UX-04 | Roving tabindex, sağ/sol sarma, Home/End ve otomatik sekme etkinleştirme. Tab paneli odaklanabilir. Değiştirici tuşlar korunur. | [Etkileşim](incelemeler/tasarim-uygulama/interaction-results.json): Geçmiş → Telemetri, End → Pasaport, Home → Geçmiş; üretimde sol sarma → Pasaport. |
| UX-05 | CSS reduced-motion kaydırmayı kapatır. Mobil JS kaydırması anlık/smooth tercihini o anda okur. Rehberin 350 ms zamanlayıcısı ve otomatik kaydırmaları kaldırıldı; hedefe kullanıcı bağlantıyla gider. | Kod ve mevcut tercih altında tarayıcı akışı doğrulandı. **Açık:** OS Reduce Motion açıkken gerçek cihaz testi yapılmadı; tam kapanmış sayılmıyor. |
| UX-06 | Ortak şablon ilk hash'i, hashchange ve popstate'i işler; kapalı hedef ayrıntıları açılır. | [Bölüm ve dil testi](incelemeler/tasarim-uygulama/hash-and-language.json): TR/EN pilot doğrudan açılış/yenileme yaklaşık 48 px üst boşlukla hedefte; yöntem ayrıntısı açılır. [Üretim ileri/geri testi](incelemeler/tasarim-uygulama/production-interactions.json). |
| UX-07 | Tanıtım gövdesi 16–18 px, yardımcılar 12–14 px; daha hafif serif başlıklar. Demo küçük yardımcıları en az 12 px; grafik eksen/eşik etiketleri 12 px. | [Hesaplanan stiller](incelemeler/tasarim-uygulama/computed-styles.json), [80 yerleşim](incelemeler/tasarim-uygulama/layout-matrix.json), güncel TR/EN mobil/masaüstü görüntüler. |
| UX-08 | Dil, menü, demo araçları, sayfalama, gün okları, slider ve batarya düğmelerinde en az 44 px hedef; kişi bağlantıları da genişletildi. | [Kontrol ölçümleri](incelemeler/tasarim-uygulama/control-sizes.json); 320–1440 px yerleşim taraması. Bu ergonomi hedefidir, tüm WCAG ölçütleri için sertifika değildir. |
| UX-09 | Proje bölüm erişimi özet önüne alındı. Karbon/demo sayfalarına bölüm erişimi; sayfa ortasında görünen, üstbilgi/altbilgide gizlenen Başa dön. Süreç ve takvim kompakt satırlara dönüştü. | Bölüm bağlantıları, ileri/geri ve doğrudan adresler test edildi. Metinler büyüdüğü için bütün sayfaların kısaldığı iddia edilmiyor; güncel yükseklikler [matriste](incelemeler/tasarim-uygulama/layout-matrix.json). |
| UX-10 | Grafik application öğeleri görünür figcaption'a bağlandı; ölçüm aralığı, eşikler, eksik kayıt sayısı görünür; ilk/son kayıtlar ve karşılaştırma serisinin eksikliği yardımcı teknolojiye ayrıca sunulur. | DOM/AX adlandırması ve grafik klavye kullanımı doğrulandı. **Açık:** VoiceOver/NVDA/TalkBack ile gerçek okuma/duyuru sırası testi. |
| UX-11 | Demoya görünür odaklı içeriğe geçiş bağlantısı ve odaklanabilir main eklendi. | [Üretim testi](incelemeler/tasarim-uygulama/production-interactions.json): Enter sonrası `demo-main`. |
| UX-12 | Rehber sabit/yüzen katmandan sayfa akışına taşındı. Açıklama küçültülür; adım hedefi için açık bağlantı vardır. | [844×390 rehber](incelemeler/tasarim-uygulama/rehber-yatay-tr.jpg); hedef üstünü kapatan overlay yok. 390/1440 px iki dilde 32 adımda taşma yok. |

### Özgünlük ve görsel sistem

Aşağıdaki “uygulandı” durumu tasarım kararının koda ve gerçek ekranlara yansıdığını ifade eder; ziyaretçi araştırmasıyla ölçülmüş bir “AI hissi” puanı değildir.

| Kimlik | Uygulama | Doğrulama |
| --- | --- | --- |
| OZ-01 | Süreç için bağlı dikey akış; erişim için sıralı liste; yöntemler için karşılaştırma satırları; pilot için zaman çizelgesi; kişi için açılır liste. | Proje/ekip/karbon masaüstü ve mobil ekranları. |
| OZ-02 | Ekip, kurum, demo girişleri ve sayfa sonu gezinmesi projeye özgü doğrudan başlıklara kavuştu. | TR/EN ana sayfa ve demo sayfası. |
| OZ-03 | Genel dairesel batarya çizimi kaldırıldı; gerçek sentetik DEMO-001 gerekçe/gösterge ayrıntısı geldi. | [Masaüstü](incelemeler/tasarim-uygulama/ana-masaustu-tr.jpg), [mobil](incelemeler/tasarim-uygulama/ana-mobil-tr.jpg). |
| OZ-04 | Her bölümün aynı başlık/kart ritmi yerine anlatı, kayıt, süreç ve gezinmeye ayrı düzen; bölüm aralıkları görevine göre değişti. | Yedi sayfanın TR/EN gerçek ekranları. |
| OZ-05 | İş birliğinin durumu doğrudan anlatılır; karbon birim notu gerçek ölçüm/faktörün beklediğini açıklar. Zorunlu uyarı ve teknik sınırlar korunur. | TR/EN iletişim/karbon; karbon üst uyarısı değişmedi. |
| OZ-06 | Gerçek demo ayrıntısı ana sayfada mobilde de görünür; galeri altı güncel demo ekranıyla yenilendi. | Kaynak/sentetik etiketleri ve yeni sekme büyütme korunur. |
| OZ-07 | Bilinmeyen alanlar çerçevesiz, çizgilerle ayrılmış tanım listelerine dönüştü; boş değerler aynı kalır. | Kurumlar, iletişim, açık profil ve pilot/karbon alanları. |
| OZ-08 | Açık, somut ve ölçülü araştırma dili; güçlü ana fikir + okunabilir durum/koşul bilgileri. | Başlıklar, teknik içerik ve ana sayfa hiyerarşisi iki dilde gözden geçirildi. |
| GS-01 | Kâğıt/ink ana zemin; bordo ana eylem/kurumsal vurgu; yumuşak gri yüzey; demoda koyu operasyonel zemin ve ölçülü pembe seçili vurgu. Parlak lime dekorasyonu kaldırıldı. | [10 kontrast çifti](incelemeler/tasarim-uygulama/contrast.json), gerçek ekranlar. |
| GS-02 | Broşürde Inter yerine yerel sistem sans + Georgia başlıklar; demoda değer/arayüz okunurluğu için Inter kaldı. Ek font bağımlılığı yok. | Türkçe karakterler, EN uzun başlıklar, 320–1440 px kırılışlar ve hesaplanan fontlar. |
| GS-03 | Başlıklarda 790 ağırlık/çok sıkı aralık yerine 400 serif; gövde/yardımcı oranı dengelendi. | Ana başlık en çok 64 px, gövde 16–18 px; mobil 40 px başlangıç. |
| GS-04 | Etkileşimsiz bilgi düz/çizgili; gezinme satırları ok, hover ve underline ile etkileşim belirtir. Süreçte dekoratif oklar kaldırıldı. | Ana sayfa akışı ve gezinme; proje listeleri. |
| GS-05 | Tek bordo birincil demo işlemi; ikincil gezinme metin bağlantısı; dil seçimi ince alt çizgi. Ana sayfa ve demo tanıtımında üstbilgi demo tekrarı kaldırıldı. | Hover/active/focus stilleri; mobil ilk ekran ve klavye testleri. |
| GS-06 | Okuma genişliği ve farklı bölüm aralıkları; mobilde bağlı akışın iki sütunlu numara/içerik düzeni; kompakt kayıt alanları. | 80 yerleşim + üretimde 32 durum. |
| GS-07 | İçerikte kutu/rozet/kesik çerçeve azaltıldı. 2–3 px köşe yalnız uygun yüzey/eylemlerde; ikonlar eylem veya anlam taşır. | Kurum, yöntem, bekleyen materyal ve profil ekranları. |
| GS-08 | Ana sayfada yalnız gerekçe/gösterge ayrıntısı; galeri ayrı açıklamalarla tam ekranları sunar. Görsel mobilde kaldırılmaz. | Güncel görüntüler, dil eşleşmesi, alt metin, kaynak ve sentetik uyarıları. |

### Açık kalanlar

- UX-05 için azaltılmış hareketin gerçek cihaz/OS tercihi altında doğrulanması.
- UX-10 ve UX-03'ün canlı duyuruları için gerçek ekran okuyucu testi; tam yardımcı teknoloji kabulü verilmedi.
- Gerçek cihazda dokunma, yüzde 200 tarayıcı/metin büyütme ve farklı tarayıcı/motor kontrolleri bu turda yapılmadı.
- Gerçek ekip/kurum bilgileri, onaylı fotoğraf/logo, pilot ölçümleri, e-posta, sunum PDF'i/video ve izinler hâlâ bekliyor. Bilgi uydurulmadı.
- Faz 6 formu arkadaşın işi olarak bekliyor; başlamadı. Faz 7 yayın kabulü tamamlandı sayılmadı. Commit/push/yayın yok.
