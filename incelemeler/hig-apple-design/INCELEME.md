# HIG / apple-design — Site incelemesi

Tarih: 4 Kasım 2026. İncelenen sürüm: yerel üretim önizlemesindeki Faz 1–5 taslağı, `http://127.0.0.1:4173`. Yedi tanıtım sayfası ve demo incelendi. Ürün kaynak kodu değiştirilmedi; bu klasöre ölçüm ve inceleme kanıtları eklendi. GitHub'a gönderim veya yayın yapılmadı.

## Dayanak ve yöntem

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/), [yerleşim](https://developer.apple.com/design/human-interface-guidelines/layout), [arayüz tasarım önerileri](https://developer.apple.com/design/tips/): hiyerarşi, okunabilirlik, uyarlanabilirlik ve dokunma rahatlığı.
- [Designing Fluid Interfaces — Apple WWDC18](https://developer.apple.com/videos/play/wwdc2018/803/) ve [Emil Kowalski apple-design](https://github.com/emilkowalski/skills/blob/main/skills/apple-design/SKILL.md): anında tepki, kullanıcı kontrolü, kesilebilir davranış ve hareket tercihleri. Skill kurulmadı; kaynak ilkeleri inceleme çerçevesi olarak kullanıldı.
- [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): web sekmelerinin beklenen klavye davranışı. [WCAG hedef boyutu açıklaması](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): web minimumları ile ergonomi hedefini ayırmak için.

320, 360, 768, 1024 ve 1440 CSS px genişliklerde, TR/EN ve sekiz adres: **80 yerleşim durumu**. Ek olarak 844×390 yatay ekranda rehber; mobil ayrıntı geçişi, klavye sekmeleri, rehber/grafik kısayolları, menü, QR penceresi, doğrudan bölüm adresi ve açılmış ekip profili incelendi. Kaynak kodu ve görünür arayüz birlikte değerlendirildi.

Apple'ın native platform ölçülerini web için zorunlu uyum sınırı saymadım. Özellikle Apple'ın 44 pt dokunma önerisi ile WCAG 2.2 AA'nın 24 CSS px hedef ölçütü farklıdır; istisnaları ve aralık koşulları da vardır. Aşağıdaki 44 CSS px karşılaştırmaları, bu web sitesi için **ergonomi önerisidir**; otomatik WCAG başarısızlığı değildir.

## Önce ele alınacak etkileşim bulguları

### 1. Mobil ayrıntı geçişinde klavye odağı kayboluyor

**Gözlem:** 360 px/TR demoda BT-10087 düğmesine Enter ile basıldığında ayrıntı açılıyor, fakat odak `BODY` oluyor. Ardından Tab'a basınca batarya ayrıntısına devam etmek yerine üstteki kurum/proje bağlantısına dönülüyor. Filoya dön düğmesiyle dönüşte de odak `BODY` oluyor.

**Etkisi:** Klavye kullanan kişi her geçişte gezinmeye üstten başlıyor. Görsel kaydırma ile klavye konumu birbirinden ayrılıyor.

**Öneri:** Ayrıntı açıldığında ayrıntı başlığına veya ilgili kontrolüne programatik odak; dönüşte seçilen batarya düğmesine geri odak. Liste araması, filtre ve sayfa korunmalı. Kaynak: `web/src/App.tsx`, `showMobileView` ve `onSelect` (satır 82–100).

**Kabul kontrolü:** Enter → ayrıntı başlığı; Tab → ayrıntı içindeki ilk işlem; Filoya dön → aynı batarya düğmesi. TR/EN ve mobilde denenmeli.

### 2. Rehberin ok tuşları grafik tuşlarıyla çakışıyor

**Gözlem:** Rehberin ikinci adımında, bir grafik `role="application"` üzerinde sağ oka basınca rehber üçüncü adıma geçiyor. Kaynakta oklar `window` üzerinden dinleniyor; yalnız input/select/textarea hariç tutuluyor.

**Etkisi:** Kullanıcı grafikte ilerlemek isterken senaryo/gün/sekme de değişebiliyor. İşlemin etkisi, odaklanılan öğeden kopuyor.

**Öneri:** Rehber kısayollarını rehber bağlamıyla sınırlamak; grafik, sekme ve diğer bileşik kontrol tuşlarını korumak. `event.defaultPrevented` ve hedef kontrolün bağlamı da dikkate alınmalı. Kaynak: `web/src/components/Guide.tsx:78–87`.

**Kabul kontrolü:** Grafikte sağ/sol ok grafik incelemesini sürdürmeli; rehberdeki ilgili kontrol veya kısayol rehber adımını değiştirmeli.

### 3. Rehberin açılış/kapanış odağı ve adım bildirimi eksik

**Gözlem:** Rehber açılınca odak üstteki Demo rehberi düğmesinde kalıyor; yeni adım için özel bir canlı bildirim yok. Rehberi kapat düğmesine basınca odak `BODY` oluyor. Buna karşılık QR penceresi açılırken içine odak alıyor ve kapanınca tetikleyicisine dönüyor.

**Etkisi:** Açılan anlatımın nerede olduğu ve kapanınca nereden devam edileceği klavye/yardımcı teknoloji kullanıcısı için belirsizleşiyor.

**Öneri:** Rehberin non-modal yapısını koruyarak başlangıç odağı veya doğrudan rehbere geçiş sağlamak, adım başlığı/sayısını uygun biçimde bildirmek ve kapanışta tetikleyiciye dönmek. Gereksiz odak tuzağı kurulmamalı. Kaynak: `Guide.tsx`, `App.tsx` rehber aç/kapat akışı.

### 4. Demo sekmeleri beklenen ok tuşu modelini uygulamıyor

**Gözlem:** Geçmiş sekmesindeyken sağ ok hiçbir sekmeye odak taşımıyor; seçili sekme Geçmiş kalıyor. Üç sekmenin de `tabIndex` değeri 0. Rol olarak tab/tablist/tabpanel kullanılmış.

**Etkisi:** Ekran okuyucunun duyurduğu sekme yapısı ile klavye davranışı uyuşmuyor. Tab ile tek tek ulaşmak mümkün olsa da bileşik kontrolün beklenen kullanımı eksik.

**Öneri:** Etkin sekmeyi Tab sırasına almak, diğerlerini oklarla erişilir kılmak; sağ/sol ve isteğe bağlı Home/End desteği eklemek. Otomatik veya Enter/Space ile etkinleştirme modeli tutarlı seçilmeli. Kaynak: `web/src/components/DetailPanel.tsx:194–212`.

### 5. Hareketi azaltma desteği kaydırmaları kapsamıyor

**Kaynakla doğrulanan gözlem:** Tanıtımda `html { scroll-behavior: smooth }` var. Reduced-motion kuralları bazı renk/geçiş efektlerini kapatıyor, bu kaydırmayı kapatmıyor. Demo `scrollIntoView` / `scrollTo` çağrılarında açıkça smooth kullanıyor. Rehberin 350 ms bekleyen kaydırmaları iptal edilecek şekilde tutulmuyor.

**Etkisi:** Hareketi azaltma isteyen kişi yine uzun otomatik kaydırmalar görebilir. Hızlı adım değiştirme/kapatmada önceki kaydırma isteği sonradan çalışabilir.

**Öneri:** CSS ve JS için ortak hareket tercihi; azaltılmış harekette anlık kaydırma. Bekleyen rehber kaydırmalarını yeni adımda, kapatmada ve kaldırılmada iptal etmek; mümkünse çizim/hazır olma durumuna bağlamak. Kaynak: `site.css:18`, `site.css:137`, `App.tsx:85`, `App.tsx:129–134`.

**Sınır:** Bu bulgu kaynak analiziyle doğrulandı; işletim sisteminin Reduce Motion ayarı değiştirilerek ayrıca denenmedi.

### 6. Proje sayfasının doğrudan bölüm adresi hedefe inmiyor

**Gözlem:** Başka sayfadan `/hakkimizda/proje/?lang=tr#project-pilot` açıldığında hash doğru, fakat `scrollY=0`; hedef yaklaşık 6733 px aşağıda kalıyor. Sayfa içindeki bölüm bağlantıları tıklandığında kaydırma çalışıyor. Ekip profilleri için ayrıca hash işleme mevcut.

**Etkisi:** Paylaşılan veya yenilenen bir bölüm bağlantısı kullanıcının beklediği yere götürmüyor.

**Öneri:** Ortak tanıtım şablonunda içerik oluştuktan sonra başlangıç hash'ini işlemek; yeniden yükleme ve ileri/geri davranışını kontrol etmek. Bölüm kapalı bir ayrıntının içindeyse açılış politikası da tanımlanmalı. Kaynak: `ProjectPage.tsx` bölüm bağlantıları, `SiteLayout.tsx`; karşılaştırma: `TeamPage.tsx` hash etkisi.

## Okuma ve dokunma rahatlığı

### 7. Birincil olmayan metinler gereğinden küçük

**Ölçüm:** Mobil ana sayfa etiketlerinde 8 px; aşama notunda 9 px; üstbilgi sentetik veri notunda 10 px; çeşitli alan/kaynak açıklamalarında 10–11 px. Uzun gövde metinleri pek çok mobil bölümde 13 px.

**Etkisi:** Başlıklar güçlü görünürken, gerçek/sentetik veri ayrımı gibi anlamlı açıklamalar görsel olarak zayıflıyor. Uzun okumada büyütme ihtiyacı artabilir.

**Öneri:** Metin önemine göre daha az basamaklı bir ölçek. Ana gövdede 15–16 px, yardımcı açıklamalarda 12–13 px başlangıç hedefleri gerçek cihazda denenebilir. Bunlar proje için tasarım önerisidir; Apple veya WCAG'ın evrensel zorunlu web font ölçüsü değildir. Uzun sayfa düzeniyle birlikte ele alınmalı. Mevcut font ailesinin değiştirilmesi şart değil.

### 8. Bazı dokunma hedefleri sıkışık

**Ölçüm:** Tanıtım mobil dil düğmeleri 34×44 px, menü 40×44 px. Demo dil düğmeleri 32×32 px; gün okları 34×34 px; üstteki rehber ve dönüş kontrolleri yaklaşık 37–38×33–34 px. Ana sayfa kişi bağlantıları 33 px yüksekliğinde. Slaydırın ölçülen dış yüksekliği 16 px; tarayıcının gerçek dokunma alanı ayrıca cihaz üzerinde değerlendirilmeli.

**Öneri:** Özellikle demo üst kontrollerinde ve birbirine yakın dil düğmelerinde daha geniş tıklama/dokunma alanı. Görsel ikon küçük kalabilir; etkin alan büyütülebilir. Sıradan satır içi bağlantılarla birincil kontrol hedefleri ayrı ele alınmalı.

### 9. Uzun sayfalarda bilgiye ulaşma maliyeti yüksek

**Ölçüm:** 360×900/TR'de, kapalı teknik ayrıntılarla proje sayfası yaklaşık 9318 px; karbon 5582 px; demo tanıtımı 5302 px; ana sayfa 5728 px. Uzunluk tek başına kusur değildir; burada küçük metin ve benzer ağırlıktaki çok sayıda kartla birleşiyor.

**Öneri:** İlk bölümde kısa özet ve erken bölüm erişimi; hedef kitleye göre teknik ayrıntıları kademeli açmak; uzun sayfalarda az yer kaplayan bölüm/yukarı erişimi. Brief'teki kapsam ve zorunlu uyarılar korunmalı. Metin büyütülürken tekrarlayan açıklamalar da gözden geçirilmeli.

### 10. Grafik erişimi için başlık ve özet katmanı geliştirilmeli

**Gözlem:** Recharts grafiklerinde klavyeyle odaklanılabilen application ve status yapıları var. Altı grafik application öğesinin açık erişilebilir adı yok; figcaption başlıkları SVG'lere açıkça bağlanmamış. Bu nedenle grafiklerin tamamen klavyeye kapalı olduğu iddia edilmiyor.

**Öneri:** Her grafiği görünür başlığıyla ilişkilendirmek; önemli eğilim, eşik ve veri boşluğu için kısa metinsel özet sağlamak. Gerekiyorsa ölçümlere tablo yolu eklemek. Gerçek ekran okuyucu testiyle adlandırma ve okuma sırası doğrulanmalı. Kaynak: `web/src/components/MiniChart.tsx`.

### 11. Demoda içeriğe geçiş kısayolu eksik

**Gözlem:** Yedi tanıtım sayfasında skip link var, demo kökünde yok. Demo klavye sırası üst kontroller ve liste düğmeleri nedeniyle daha uzun.

**Öneri:** Demoda ana içeriğe ve gerekirse batarya ayrıntısına erişen görünür odaklı atlama bağlantıları. Kaynak: `App.tsx:157` sonrası düzen. Bu, mevcut klavye akışına eklenecek küçük ama işlevsel bir iyileştirmedir.

### 12. Yatay ekranda rehber incelenen alanı belirgin biçimde örtüyor

**Gözlem:** 844×390'da ilk rehber kartı yaklaşık 310 px yüksekliğinde ve sağda 400 px genişliğinde. Sayaçlar ve bazı kontroller kartın arkasında kalıyor. Kart ekrana sığıyor ve kendi iç kaydırması var; taşma/çökme bulgusu değildir.

**Öneri:** Kısa ekranlarda hedef alanı açıkta bırakan yerleşim, küçültülebilir anlatım veya adım/hedefe göre konumlandırma. Rehberin anlattığı veriyle rekabeti azaltılmalı. Kanıt: `demo-yatay-rehber.jpg`.

## Sayfa bazında görsel değerlendirme

| Alan | Korunacaklar | İyileştirme odağı |
| --- | --- | --- |
| Ortak üstbilgi/altbilgi | Aktif sayfa, sabit etiketler, anlaşılır dil seçimi, görünür demo erişimi | Küçük yardımcı metinler ve dokunma alanları; uzun sayfalarda gezinmeye yeniden erişim |
| Ana sayfa | Belirgin proje adı ve demo işlemi, tutarlı petrol/lime/bordo, metin-görsel dengesi | Mobil 8–10 px etiketler; ekip bağlantılarının alanı; tekrar eden alt açıklamaların hiyerarşisi |
| Kurumlar | İki kurumun dengeli sunumu, resmî bağlantı ve ilişki açıklaması | Eksik yönetici/logo alanlarının çok sayıda veri giriş kutusu gibi görünmesi. Bilgiler boş kalırken durum sunumu daha toplu yapılabilir |
| Ekip | Yerinde açılan profiller, aynı anda tek profil, isim sırası, büyük summary alanı | Profili gör/kapat ve alan etiketlerinin boyutu; gerçek içerik geldiğinde uzun biyografi ve bağlantılarla ek kontrol |
| Proje | Varsayımsal senaryo, açıklanmış koşullar, teknik yöntemlerin açılır olması, pilot takvimi ayrımı | Bölüm adresi hatası, uzun mobil okuma, bölüm erişimi ve küçük koşul metinleri |
| Demo tanıtımı | İlk bölümde erişim, kısa rehber, gerçek ve dil eşleşen görseller, doğru kaynaklar | Görsellerin içindeki küçük arayüz metinleri önizlemede okunamıyor; daha odaklı ayrıntı görselleri düşünülebilir. Yeni sekmeden dönme yükünü azaltan erişilebilir büyütme seçeneği de bir tasarım alternatifi |
| Karbon | Görünür zorunlu uyarı, iki göstergenin ayrımı, sembolik formül, uydurulmamış değerler | Zorunlu uyarıyı koruyarak tekrarları sadeleştirmek; ölçüm/kaynak alanlarının daha kompakt sunumu |
| İletişim | Önerilen ortaklık durumunun açık olması, gerçek gönderim yapılmadığı bilgisi | Form ve gerçek iletişim adresi bilinçli bekleyen teslimlerdir; hata olarak sayılmadı. Arkadaşın formu tamamladıktan sonra arayüzle bütünleşmesi kontrol edilmeli |
| Demo uygulaması | Açıklamalı öncelikler, ikon+metin durumları, kesikli olaysız çizgiler, sentetik açıklaması, mobil liste durumunun korunması | Klavye odağı, kısayol çakışması, sekmeler, kontrol hedefleri, grafik adları ve rehber yerleşimi |

## Daha düşük öncelikli ayrıntılar

- Bağlantı ve düğmelerde hover/focus belirgin; basılı durum için tutarlı, anlık geri bildirim henüz ayrı bir sistem olarak tanımlanmamış. Web platformunun tıklama/iptal davranışını koruyan ölçülü active stili yeterli olabilir.
- Grafik eksenleri, ızgara ve tooltip renkleri eski sabit lacivert değerleri içeriyor. Yeni petrol temasıyla ortak tokenlar, sonraki düzenlemelerde görsel tutarlılığı korur. Grafik serisinin mavi olması tek başına hata değildir.
- Sayfalara yalnız süs amacıyla animasyon eklemek gerekmiyor. Bu incelemedeki başlıca kazanımlar yeni animasyon kütüphanesi gerektirmeyen davranış, metin ve yerleşim düzeltmeleridir.
- Boş alanlar kullanıcı kararıdır. İçerik uydurmak, onaysız logo eklemek veya hazırlık kartını gerçek hizmet gibi göstermek önerilmez. Yayın öncesi sunum biçimleri ayrıca seçilebilir.

## Doğrulanan güçlü taraflar

- 80 durumda yatay taşma yok; her sayfada tek H1 ve tek main var. Taranan img öğelerinde alt niteliği eksik değil.
- Menü Escape ile kapanıp odağı düğmesine döndürüyor. QR penceresi içine odak alıyor; Escape sonrası tetikleyiciye dönüyor.
- Ekip doğrudan profil adresiyle açılıyor; dil değişince açık profil korunuyor. Açılmış profil mobilde taşmıyor.
- Seçilmiş düz renk çiftlerinde gövde metni/açık zemin 5.98:1, gövde/kart 5.74:1, bordo/açık zemin 8.55:1; demo ikincil metin/panel 8.07:1. Ana grafik çizgisi/kart 4.47:1, lime/petrol 12.18:1. Grafik çizgisi için metin eşiğiyle aynı değerlendirme yapılmadı. Bunlar tüm durumları kapsayan kontrast sertifikası değildir.
- Yakalanan tarayıcı error/warn kaydı yok. Teknik ifadeler plan/sentetik durumunu koruyor. Renkle birlikte ikon ve metin kullanılması, yalnız renge bağlı anlam yükünü azaltıyor.

## Kanıtlar ve sınırlar

- `sayfa-olcumleri.json`: 80 yerleşim durumu, görünür metin örnekleri ve küçük hedefler. Kapalı details içerikleri sayımdan çıkarıldı. 12 px altı metin sayıları, içerik öğesi sayımıdır; tek başına okunabilirlik puanı değildir.
- `etkilesim-kontrolleri.json`: odak, sekmeler, rehber/grafik çakışması, bölüm adresi, menü/QR ve yatay ekran gözlemleri.
- `kontrast-ornekleri.json`: kaynak renklerinden hesaplanan seçilmiş çiftler.
- Ekran görüntüleri bu klasörde; `tarayici-gunlugu.json` yakalanan error/warn kayıtlarını içerir.

Gerçek iPhone/iPad dokunma testi, VoiceOver/TalkBack ile tam okuma akışı, gerçek yüzde 200 metin büyütme/zoom ve işletim sistemi hareket/kontrast tercihleri ayrıca denenmedi. Sayfa açılışları yerel ortamdır; canlı ağ performansı veya yayındaki sürüm için sonuç çıkarılmaz. Eksik PDF/video dosyaları ve arkadaşın yapacağı form test edilemez durumda olduğundan kapsam dışı bırakıldı.

Önerilen sıra: odak/kısayol/sekme ve bölüm adresleri → hareket tercihleri → mobil hedefler ve tipografi → uzun sayfa/rehber yerleşimi → görsel ayrıntılar. Ürün kodunda düzeltme yapılmadı.
