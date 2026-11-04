# Özgünlük, editoryal ses ve şablon hissi

4 Kasım 2026. Kullanıcının “site biraz AI duruyor” değerlendirmesi üzerine ek inceleme. Dayanak: mevcut Faz 1–5 kaynak kodu, TR/EN metinler ve aynı sürümün önceki incelemede kaydedilmiş gerçek ekranları. Yeni bir arayüz uygulanmadı. [Sabit inceleme kaydı](../../TASARIM_INCELEME_KAYDI.md).

## HIG bu konuya ne söylüyor?

İncelenen Apple kaynaklarında doğrudan “AI üretimi gibi görünmeyin” adında bir tasarım standardı bulunmadı. Bu ifade burada **tasarımın fazla genel, kalıp veya içerikten bağımsız görünmesi** anlamında kullanılır. Bir üretim yöntemi tespiti veya kullanıcı araştırması sonucu değildir.

Apple'ın ilgili ilkeleri şunlar:

- Purpose: ürünü ayırt eden şeyi bulmak ve tasarım kararlarını ona bağlamak.
- Simplicity: her öğenin bir iş yapması, sözü gerektiği kadar kullanmak ve hiyerarşi kurmak.
- Craft: görsel, metin ve davranış ayrıntılarında bilinçli seçim ve yineleme.
- Delight: ürünün oluşturması gereken duyguyu belirlemek; bunu bütün deneyime yaymak.

Kaynak: [HIG Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles/). Bu ilkeler belirli bir kart biçimini, simetriyi veya yazı tipini yasaklamaz. Aşağıdaki düzen önerileri bu projeye ilişkin tasarım yorumudur.

Apple ayrıca ürünün yazı dilini amaç ve hedef kitle üzerinden tanımlamayı ele alır: [HIG Writing](https://developer.apple.com/design/human-interface-guidelines/writing/) ve [Add personality to your app through UX writing — WWDC24](https://developer.apple.com/videos/play/wwdc2024/10140/). Kişilik, gereksiz espriler eklemekle sınırlı değildir; aynı ürünün neyi nasıl söylediğiyle oluşur.

[HIG Generative AI](https://developer.apple.com/design/human-interface-guidelines/generative-ai) ise üretken AI özellikleri, beklentiler ve kullanıcı kontrolü üzerinedir. Burada ele alınan şablon estetiği değerlendirmesiyle aynı konu değildir.

Konuyu daha doğrudan adlandıran bir kaynak da bulundu: [Anthropic'in frontend-design rehberi](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md). Bu Apple belgesi değildir. Brief'e özgü bir görsel yön seçilmesini; numaralandırmanın gerçek bir sıra ifade etmesini; aynı yuvarlatılmış kart kalıbının ve genel giriş animasyonlarının tekrarından kaçınılmasını açıkça ele alır. Mevcut sitenin OZ-01, OZ-03 ve OZ-04 gözlemleriyle doğrudan ilişkilidir. Rehber kaynak olarak okundu; skill kurulmadı ve içerdiği çalışma talimatları yeni bir uygulama yetkisi olarak alınmadı.

## Genel değerlendirme

Mevcut site, içerikleri güvenli ve tutarlı bir çerçeveye yerleştiriyor. Ancak özellikle proje sayfasında sunum kalıbı içerik türünden daha baskın hâle geliyor. Kart, küçük üst etiket, büyük başlık, kısa paragraf ve ok tekrarları; bir araştırma projesinin özgül kararlarını anlatan sayfayı genel bir teknoloji ürünü tanıtımına yaklaştırıyor.

Tutarlılığı sağlamak için kullanılan bileşenler fazla aynılaşmış. Buna karşılık gerçek demo, bataryanın araçlar arasında değişmesi sorunu, kaynakların ayrılması ve bakım kararının teknik personelde kalması projeye özgü güçlü malzemeler. Görsel/editoryal vurgu bu malzemeye daha fazla dayanabilir.

## OZ-01 — Farklı içerikler aynı kutu ailesiyle sunuluyor

Proje sayfasında saha senaryosu, sistem akışı, veri erişim öncelikleri, yöntemler, pasaport düzeyleri ve takvim birbirine yakın açık zeminli, bordürlü, yuvarlatılmış bloklara dönüşüyor. Teknik yöntemin koşulu ile süreç adımı aynı görsel ağırlığa yaklaşıyor. Eşitlik karşılaştırmayı kolaylaştırdığı yerlerde yararlıdır; bütün anlatımda kullanıldığında vurgu azalıyor.

**Öneri:** Sunumu bilgi türüne göre seçmek. Sistem için bağlantılı akış; erişim seçenekleri için öncelikli liste; yöntem/ön koşul için kompakt karşılaştırma; pilot için zaman çizelgesi; anlatı için düz metin. Bağımsız veya gerçekten karşılaştırılabilir birimler kart olarak kalabilir. Amaç sadece kart sayısını azaltmak değil, anlamın biçimi belirlemesidir.

Kaynak dosyalar: `ProjectPage.tsx`, `technical.css`; mevcut görsel: `proje-masaustu-acik.jpg`.

## OZ-02 — Bazı başlıklar projeye özgü bilgi taşımıyor

“Mühendislik, araştırma ve ortak bir amaç.”, “Eğitim, araştırma ve sanayi.”, “Bir sonraki adımı seçin.” gibi başlıklar çok sayıda kurumsal/teknoloji sitesinde kullanılabilecek kadar geneldir. Tek başlarına yanlış değiller; bir arada ve büyük boyutta kullanıldıklarında gerçek proje bilgisine ayrılan vurguyu azaltıyorlar.

Daha doğrudan alternatifler, yalnız inceleme örneği olarak:

| Mevcut | Daha belirli ifade örneği |
| --- | --- |
| Mühendislik, araştırma ve ortak bir amaç. | Projeyi geliştiren ekip |
| Eğitim, araştırma ve sanayi. | OSTİM Vakfı ve OSTİM Teknik Üniversitesi |
| Bir bataryanın izini sürün. | Demoda bakım önceliklerini inceleyin |

Her başlık düzleştirilmemeli. “Bataryanın geçmişi onunla birlikte taşınmalı” ve “Bir batarya. Tek kimlik.” bataryanın araçtan bağımsız izlenmesini anlatıyor; bu nedenle projeyle gerçek ilişkileri var. Bu tür bir ana fikir korunabilir.

Kaynak: `content/tr.ts`, `content/demo.tr.ts`; İngilizce karşılıklar aynı amaçla ayrıca ele alınmalı.

## OZ-03 — Ana görsel, çözümün ayırt edici yönünü anlatmıyor

Dairesel oklarla çevrili batarya çizimi enerji/döngüsellik bağlamını veriyor. Ancak birçok batarya veya sürdürülebilirlik projesine de uyabilir. Batarya geçmişinin araç değişse de korunması, bakım önceliği ve pasaport kaydı gibi bu projenin ana ilişkilerini göstermiyor.

**Öneri:** Ana görsel alanını mevcut gerçek demodan seçilmiş bir ayrıntıya veya teklifin tekil batarya/veri/bakım ilişkisini gösteren projeye özgü bir şemaya ayırmayı denemek. Demo görüntüsü yine açıkça sentetik diye etiketlenmeli. Bu bir görsel üretim veya uygulama talimatı değildir; karşılaştırılacak tasarım yönüdür.

Kaynak: `About.tsx` içindeki `CircularBattery` ve `hero-art`.

## OZ-04 — Bölümlerin ritmi fazla aynı

Ana sayfada küçük numaralı üst etiket → büyük başlık → karşı sütunda paragraf → ok bağlantısı düzeni tekrarlanıyor. İç sayfalarda aynı kurum/COP31 üst satırı, büyük başlık, giriş ve kart dizileri sık görülüyor. Ortak gezinme ve başlık sistemi yararlı; anlatımın tamamının aynı ritimde olması, içerikler arasındaki önem farkını azaltıyor.

**Öneri:** Ortak hizalama ve tipografiyi koruyarak her bölümün görevini belirlemek. Ana fikir kısa bir anlatı, kanıt bir demo detayı, süreç bir şema, insanlar ise doğal bir liste olabilir. Boşlukların ve başlık büyüklüğünün önemle birlikte değişmesi gerekir. Rastgele asimetri veya dekorasyon eklemek amaç değildir.

## OZ-05 — Bazı metinler okuyucunun sorusundan uzaklaşıyor

“Proje teklifinde önerilen yaklaşım ile onaylanmış iş birliği kapsamı ayrı gösterilir.” gibi cümleler, ziyaretçiye ilişkinin durumunu anlatmak yerine sayfanın nasıl düzenlendiğini anlatıyor. Teknik sayfalarda “sunulmaz”, “burada sayısal bir hesap ... gösterilmemektedir” türü tekrarlar da içerik yazım talimatlarının izini taşıyor.

**Öneri:** Doğru sınırlamaları koruyarak ziyaretçinin sorusuna doğrudan cevap vermek. Örneğin “Önerilen pilot iş birliği” durumunu ilgili kurumun yanında açıkça belirtmek; bunun nasıl ayrı gösterildiğini ayrıca anlatmamak. Karbon sayfasındaki brief zorunluluğu olan üst uyarı aynen kalmalı. Gereksiz tekrarlar bu uyarının etrafında azaltılabilir.

Bu inceleme, plan dilini veya belirsizlik açıklamalarını kaldırmayı önermez. Gerçek ölçüm yoksa bu bilgi görünür kalır.

## OZ-06 — Mevcut özgün malzeme daha görünür olabilir

Çalışan gerçek demo ekranları, batarya kimlikleriyle gösterilen sentetik senaryolar ve bakım gerekçeleri; genel sürdürülebilirlik sözlerinden daha somut malzemedir. Şu anda bu malzeme ayrı demo sayfasında ve sayfanın aşağısında yer alıyor. Ana sayfanın ilk ekranında daha genel bir çizim var.

**Öneri:** Mevcut ve doğrulanabilir proje malzemesini erken sunmak. İzinli ekip/çalışma fotoğrafları ileride geldiğinde kullanılabilir; bugün bu eksikliği kapatmak için sahte laboratuvar, kişi, ortaklık veya sonuç üretmek gerekmez. Temsili ve sentetik malzeme doğru etiketlenmeli.

## OZ-07 — Boş alanların sunumu taslak hissini artırıyor

Kurum, iş birliği ve pilot bilgileri için tekrarlayan kesik çizgili geniş kutular, ziyaretçiye veri giriş formu veya doldurulmamış yönetim paneli çağrışımı yapabilir. Alanların boş olması kullanıcı kararıdır ve bu incelemede içerik kusuru sayılmaz.

**Öneri:** Bilgileri boş tutarak eksik durumunu daha toplu bir bölümde veya daha sakin bir tanım listesinde sunmayı değerlendirmek. Gerçek içerik geldiğinde dolacak kayıt yapısı korunabilir. Her alanın görünür kalması gerekiyorsa çerçeve ve boşluk ağırlığı azaltılabilir.

## OZ-08 — Bir editoryal ses seçilmeli

Bu proje için önerilen ses: **açık, ölçülü, teknik olarak somut ve araştırma odaklı**. Tasarımın oluşturması hedeflenen duygu: projenin mevcut durumunu, önerisini ve inceleyebileceğim kanıtını anladım.

Bunun karşılığı:

- Genel iddialar yerine belirli problem, yaklaşım ve mevcut durum.
- Gerektiği yerde güçlü bir ana fikir; geri kalan başlıklarda içerikle doğrudan bağ.
- Vurguyu küçük yazı ve çok sayıda kutuya dağıtmak yerine birkaç açık karar.
- Kaynak/koşul/uyarıların okunabilir ve ilgili yerde olması.
- İnsanların ve ekibin gerçek katkılarının, sağlandığında doğal biçimde sunulması.

Bu ses ve örnekler henüz kullanıcı tarafından seçilmiş nihai metinler değildir. Metinler değiştirilmedi.

## Sayfa bazında yön

| Sayfa | Şablon hissini azaltabilecek yaklaşım |
| --- | --- |
| Ana sayfa | Projenin belirli problemi ve mevcut demo malzemesini öne almak; genel slogan ve dekoratif etiketleri azaltmak |
| Kurumlar | Kurum adları ve ilişkiyi doğrudan anlatmak; boş yönetici alanlarını daha sakin sunmak |
| Ekip | Mevcut açılır listeyi korumak; gerçek rol/katkı metinleri geldikçe kişileri kendi işleriyle tanıtmak |
| Proje | Bilgi türüne göre akış/liste/tablo/takvim kullanmak; eşit kart ağırlığını kırmak |
| Demo tanıtımı | Görev odaklı giriş, daha belirli ekran ayrıntıları ve kısa açıklamalar |
| Karbon | Zorunlu uyarı + iki ayrı gösterge + yöntem/sınırlar şeklinde açık hiyerarşi; tekrarlayan üst açıklamaları azaltmak |
| İletişim | İlişki durumunu sade anlatmak; belirsizliği koruyan toplu durum sunumu |
| Demo | İşlevsel arayüz karakterini korumak; önce önceki rapordaki odak, tuş ve kontrol boyutu sorunlarını gidermek |

## Sınırlar ve sonraki değerlendirme ölçütleri

Bu görüşler mevcut kaynak ve ekranlara dayanan tasarım değerlendirmesidir; gerçek ziyaretçilerle yapılmış bir “AI hissi” araştırması değildir. Bir tasarımın AI tarafından üretildiğini biçiminden kesin çıkaramayız. HIG de burada önerilen tablo, şema veya başlık örneklerini özel olarak emretmez.

Bir sonraki tasarım çalışması için somut sorular:

1. İlk ekranda hangi proje problemi ve mevcut durum anlaşılıyor?
2. Büyük bir başlık kaldırıldığında bilgi kayboluyor mu, yalnız süs mü azalıyor?
3. Kart kullanımı gerçekten gruplama/karşılaştırma sağlıyor mu?
4. Kullanılan görsel başka bir enerji projesine aynı şekilde uyabilir mi; bize özgü hangi ilişkiyi gösteriyor?
5. Ziyaretçi neyin öneri, neyin çalışan demo, neyin beklenen içerik olduğunu ayırt edebiliyor mu?
6. Bilgileri uydurmadan, mevcut malzemeyle daha belirli bir anlatım kurulmuş mu?
7. Önceki UX-01–12 maddeleri ve TR/EN/mobil davranışlar korunmuş veya iyileştirilmiş mi?

Ürün kodu ve mevcut içerikler değiştirilmedi. Bu rapor kullanılabilirlik incelemesinin yerine geçmez; onun yanına eklenen ikinci değerlendirme eksenidir.
