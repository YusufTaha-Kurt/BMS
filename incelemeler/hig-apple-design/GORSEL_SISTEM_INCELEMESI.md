# Görsel sistem incelemesi

4 Kasım 2026. Kullanıcı, önceki değerlendirmenin metin ağırlıklı kaldığını; blok, buton, renk kombinasyonu ve font seçiminin de sorun olarak ele alınmasını istedi. Bu ek, bu yönlendirmeyi esas alır. [Sabit kayıt](../../TASARIM_INCELEME_KAYDI.md).

Dayanak: mevcut CSS/React kaynakları ve önceki incelemede aynı sürümden kaydedilmiş masaüstü/mobil ekranlar. Bu turda canlı tarayıcı testi veya kullanıcı araştırması yapılmadı. Aşağıdakiler görsel tasarım değerlendirmeleridir; otomatik HIG/WCAG ihlali veya AI üretimi tespiti değildir. Ürün kodu değiştirilmedi.

## Ana değerlendirme

Şablon hissi, görsel kararların birleşiminde belirginleşiyor: koyu petrol zemin + parlak lime vurgu + iri ve sıkışık sans başlık + küçük yardımcı metin + ince çerçeveli kartlar + tekrar eden oklar. Bu bileşenlerin her biri kullanılabilir; mevcut dağılımları projenin özgül karakterinden çok genel bir teknoloji tanıtımı hissi veriyor.

Metin değişikliği, mevcut blok düzeni ve görsel ağırlıklar korunursa tek başına yeterli olmayacaktır. Önce renk rolleri, tipografik karakter, bileşenlerin görevleri ve sayfa kompozisyonu birlikte ele alınmalıdır.

## GS-01 — Renk paletinin rolleri ve dağılımı

**Gözlem:** `site.css` petrol `#0e2a2e`, bordo `#8b1538`, lime `#d6f451`, kâğıt `#f4f6f5` tanımlar. Lime; ana demo bağlantısı, büyük başlığın son satırı, konu etiketleri, çizim ve bazı metin bağlantılarında kullanılır. Bordo ise kurum adı, bölüm etiketleri, oklar, alan başlıkları, aktif menü ve uyarı kenarlarında görünür. Yakın yeşilimsi açık yüzeyler (`#eaf0ed`, `#edf2ef`, `#e7eeea`) çok sayıda bileşene dağılmıştır.

**Tasarım sorunu:** Parlak vurgu ana eylem ile dekorasyon arasında paylaşılır; bordo hem kurumsal vurgu hem durum/uyarı tonu gibi çalışır. Açık yüzeylerin benzerliğiyle birleşince renkler anlamı ayırmaktan çok her bölümü boyayan bir sisteme dönüşür. Petrol/lime ikilisi güçlü bir teknoloji çağrışımı üretir; projenin araştırma karakterine ne kadar hizmet ettiği ayrıca değerlendirilmelidir.

**Yön:** Ana zemin, metin, birincil eylem, seçili durum, uyarı ve veri renklerini ayrı rollerle tanımlamak. Bordo ve lime'ın vurgu önceliğini belirlemek; aynı görünümde ikisini de birçok küçük öğeye dağıtmamak. Kurumsal zorunluluklar varsa koruyup kullanım oranlarını değiştirmek. Palet alternatifleri henüz denenmedi veya seçilmedi.

Bu, tüm renklerin kontrastsız olduğu anlamına gelmez: önceki incelemedeki yedi sabit renk çifti ölçümü korunur. Kontrast ile paletin karakteri/rol tutarlılığı farklı değerlendirmelerdir.

## GS-02 — Font seçiminin kimlik açısından değerlendirilmesi

**Gözlem:** Hem tanıtım hem demo `@fontsource-variable/inter` yükler; ana aile Inter Variable'dır. Başlık, menü, gövde, etiket ve kontroller aynı aileyle kurulmuştur.

**Tasarım sorunu:** Inter okunabilir bir arayüz seçeneğidir; mevcut kullanımda araştırma projesine özgü tipografik karakter yeterince oluşmuyor. Özellikle çok kalın, dar aralıklı başlıklar ve küçük, harf aralığı açık üst etiketler birlikte tanıdık bir teknoloji şablonunu hatırlatıyor. Bu, Inter'in yasak veya doğası gereği “AI fontu” olduğu iddiası değildir. Tek aileyle de özgün bir tasarım kurulabilir.

**Yön:** Başlık ailesinin karakterini de seçenek olarak açmak; mevcut aileyi daha ölçülü kullanmakla farklı bir başlık ailesini aynı içerik üzerinde karşılaştırmak. Gövde ve demo kontrollerinde okuma kolaylığını korumak. Seçim Türkçe `İ ı Ş ş Ğ ğ Ç ç Ö ö Ü ü`, İngilizce, uzun başlıklar, teknik değerler ve mobil satır kırılışlarıyla değerlendirilmeli. Henüz bir alternatif font önerilip seçilmiş veya yüklenmiş değildir.

## GS-03 — Yazı ölçeği ve ağırlık dengesi

**Gözlem:** Ana başlık masaüstünde 76px'e kadar, ağırlık 790, harf aralığı `-.06em`, satır yüksekliği 1.03. Ana sayfa bölüm başlıkları 42px'e kadar ve 750 ağırlıkta; mobilde 30px. Mobil gövde örnekleri 13px, üst etiketler ve konu etiketleri 8px'e kadar iner. Kaynaklar: `about.css`, `site.css`, `technical.css`.

**Tasarım sorunu:** Başlıklar sayfanın büyük bölümüne hâkim olurken açıklamalar ve durum bilgileri görsel olarak geri çekiliyor. Çok sıkı harf aralığı ve kalınlık başlıkları ağırlaştırıyor. Hemen her bölüm güçlü başlıkla açıldığı için gerçek önem farkları azalıyor.

**Yön:** Başlık/gövde/yardımcı metin için daha az ve belirgin rol oluşturmak; gövdeyi rahat okunur ölçeğe taşımak; büyük başlıklarda kalınlık ve sıkışıklığı azaltmayı karşılaştırmak. Kesin ölçüler mevcut ekran üzerinde denenmeli; HIG'in bütün web siteleri için tek bir font boyutu veya aile dayattığı söylenmemeli. UX-07 ile birlikte izlenir.

## GS-04 — Bilgi blokları ile tıklanabilir yüzeyler birbirine benziyor

**Gözlem:** Ana sayfanın süreç öğeleri `ol > li` ve tıklanabilir değildir. Buna rağmen açık zemin, ince çerçeve, 6px köşe ve sağ üst ok taşır. Sayfa sonundaki gezinme kartları ise `a` öğeleridir; benzer açık zemin, çerçeve, 6px köşe ve sağ okla gösterilir. Proje ve kurum sayfalarındaki içerikler de yakın kart ailesindedir.

**Tasarım sorunu:** Ok ve kutu dili hem “bu bir süreç adımı” hem “buraya tıklayabilirsin” anlamında kullanılıyor. Masaüstü altı adımlı akış 3×2 dizilirken üçüncü adımın sağ oku satır dışına bakar; sonraki adım alttadır. Süreç ilişkisi mekânsal olarak güçlü kurulmamış. Mobilde her adımı geniş bir karta çevirmek anlatımı uzatıyor.

**Yön:** Süreç için bağlı ve doğru yönde okunabilen şema/kompakt adım listesi; gezinme için açık etkileşim işareti; açıklamalar için gerektiğinde çerçevesiz metin. Karşılaştırılabilir bağımsız birimler kart olarak kalabilir. OZ-01 ve OZ-04'ü görsel/etkileşim açısından somutlaştırır.

## GS-05 — Buton ailesi ve eylem hiyerarşisi

**Gözlem:** “Demoyu aç” üstte koyu, ana girişte lime bağlantı olarak gösterilir. Mobil ilk ekranda aynı eylem ve sentetik veri açıklaması iki kez görünür. Seçili TR kontrolü de koyu dolguludur. Genel butonlar 4px köşeli; durum ve konu etiketleri kapsül biçimli; bazı bekleyen durum etiketleri kesik çizgili küçük butonlara benzer. Buton hover stilleri vardır; bu inceleme bunların yokluğunu iddia etmez.

**Tasarım sorunu:** Aynı eylemin tekrarı, seçili dilin dolgusu ve dekoratif kapsüller görsel önceliği dağıtır. Buton etiketlerinin 11–13px olması, kontrolleri iri başlıkların yanında küçük bırakır. Birincil eylem, ikincil gezinme, seçili durum ve etkileşimsiz durum etiketi daha net ayrılabilir.

**Yön:** Birincil/ikincil/metin bağlantısı rollerini ortaklaştırmak; dolgu ve köşe biçimini bu rollere bağlamak. Ana girişte üst eylem tekrarının gerekli olup olmadığını mobilde değerlendirmek; iç sayfalardaki demo erişimini korumak. Sentetik veri açıklamasını ilgili erişimle birlikte okunabilir tutmak. Hover, basılı, klavye odağı ve varsa devre dışı durumları birlikte gözden geçirmek. UX-08 ile izlenir. Kapsül buton veya 4px köşe tek başına yanlış değildir.

## GS-06 — Boşluk ve sayfa kompozisyonu

**Gözlem:** Ana sayfa bölümlerinde masaüstü 76px, mobil 43px dikey iç boşluk; tekrar eden iki sütunlu başlık/metin düzeni vardır. Bu düzen mobilde aynı sırayla tek sütuna iner. Genel sayfa genişliği 1200px, mobil yan boşluk 20px'tir.

**Tasarım sorunu:** Bölümler farklı bilgi taşısa da benzer yükseklik ve vurgu ritmi oluşuyor. Büyük başlıklar, geniş bölüm aralıkları ve küçük gövde metni aynı anda kullanıldığında sayfa ferah olduğu kadar seyrek ve uzun hissedebiliyor. Mobil düzen masaüstünün alt alta yerleşmiş hâline yaklaşıyor. Önceki 360px ölçümünde ana sayfa 5728px, proje sayfası 9318px; bu ölçüler tek başına kusur değildir.

**Yön:** Boşluğu ilişkili öğeleri birleştirmek ve farklı görevleri ayırmak için kullanmak. Ana sayfada özeti, proje sayfasında ayrıntıyı ağırlıklandırmak; bilgi gizlemek yerine erişimini kolaylaştırmak. Mobilde akış ve gezinme bloklarını kendi görevlerine göre yeniden düzenlemek. OZ-04 ve UX-09 ile birlikte değerlendirilir.

## GS-07 — Köşe, çizgi, rozet ve ikonların ortak dili

**Gözlem:** İçerik kartları 6–8px; genel buton 4px; durum ve konu etiketleri 30px köşe kullanır. Bordür, numara, ok ve üst etiketler birçok bölümde tekrarlanır. Kesik çerçeveler boş bilgi, logo alanı ve hazırlık durumlarında kullanılır.

**Tasarım sorunu:** Tek tek farklardan çok, çok sayıda küçük çerçeve ve işaret sayfanın çevresini dolduruyor. Konu kapsülleri filtre izlenimi verebilir; kesik çerçeveli durumlar kontrol gibi görünebilir. Geçerli bir işlev taşımayan işaretler içerikten dikkat çekiyor.

**Yön:** İçerik yüzeyi, eylem, durum ve etiket için tutarlı biçim kuralları tanımlamak. Okları gerçek yön/gezinme anlamında kullanmak; her bilgiye rozet veya çerçeve eklememek. Bilinmeyen alanları boş tutarak daha sakin sunmak. OZ-07 ile ilişkilidir.

## GS-08 — Ana görsel ve demo görsellerinin kompozisyondaki yeri

**Gözlem:** Masaüstü ilk ekranın sağında genel batarya/döngü SVG'si vardır; mobilde `hero-art` gizlenir. Gerçek demo görselleri ayrı sayfada, kendi büyük çerçeveli yüzeyleri içinde gösterilir; tanıtım ölçeğinde çok sayıda küçük kontrol aynı anda görünür.

**Tasarım sorunu:** İlk ekranın güçlü görsel alanı projenin ayırt edici ilişkisini taşımıyor. Mobilde bu alan tamamen kalktığı için görsel kanıtın yerine metin ve etiketler kalıyor. Tam ekran demo görüntüsü sistemin varlığını gösterse de küçük metinler tek bir teknik fikri hemen anlatmıyor.

**Yön:** Mevcut demodan anlamlı ayrıntı veya batarya kimliği/geçmiş/bakım ilişkisini gösteren özgül bir şema ile karşılaştırmak. Tam ekranı büyütme seçeneğini ve sentetik veri etiketini korumak. Sahte saha fotoğrafı veya sonuç üretmemek. OZ-03 ve OZ-06 ile izlenir.

## Apple kaynaklarıyla ilişki

- [HIG Color](https://developer.apple.com/design/human-interface-guidelines/color): durum ve etkileşim anlamında renklerin tutarlı kullanılması. Buradaki petrol/bordo/lime dağılımı önerisi projeye ilişkin yorumdur.
- [HIG Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons): amaç anlaşılır olmalı; görsel belirginlik tercih edilen eylemi desteklemeli. Platformlara özgü şekil/ölçü kuralları bu web sitesine otomatik olarak aktarılmaz.
- [Communicate your brand identity on iOS — WWDC26](https://developer.apple.com/videos/play/wwdc2026/251/): tipografi, renk, bileşen ve etkileşim birlikte ürün kimliğini oluşturur; font kimliğin bir parçasıdır. Bu, sitede San Francisco veya Apple arayüzünün kopyalanmasını gerektirmez.
- [Meet the expanded San Francisco font family — WWDC22](https://developer.apple.com/videos/play/wwdc2022/110381/): ölçek, ağırlık ve genişlik tipografik hiyerarşi ve karakter oluşturur. Mevcut fontun değerlendirilmesi yalnız aile adını değiştirmekle sınırlı tutulmamalıdır.

## Bir sonraki tasarım çalışmasının sırası

Önce ana sayfanın ilk ekranı ve bir içerik bölümü üzerinden renk rolleri + font karakteri/ölçeği + buton ailesi + blok düzeni birlikte gösterilmelidir. Karşılaştırılabilir örnek için mevcut gerçek metinler kullanılabilir. Ardından seçilen dil diğer sayfalara ve demoya uyarlanır; TR/EN, mobil/masaüstü, kontrast ve önceki UX bulguları tekrar kontrol edilir. Bu sıra bir öneridir; bu inceleme yeniden tasarım uygulaması değildir.
