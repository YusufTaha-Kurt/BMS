# Claude Code — İlk İnceleme Sonrası Düzeltme

Bu görev, mevcut kod ve localhost:4173 sayfası incelendikten sonra hazırlanmıştır. Önceden planlanmış bir prompt zincirinin parçası değildir.

---

`/Users/demirel/Desktop/Ders/COP31/yazılım` içindeki mevcut demoda iki sınırlı düzeltme yap. Önce `incelemeler/ilk-demo/INCELEME.md` raporunu, iki ekran görüntüsünü ve ilgili kaynak dosyaları incele. Uygulamayı yeniden kurma veya ana tasarımı baştan yazma.

1. **Dar ekranlarda senaryo sonucunu görünür kıl.** `web/src/App.tsx` içindeki ana düzen yalnız xl genişlikte iki sütun oluyor. 1100×900 ekranda senaryo hedefinin operasyon paneli yaklaşık 1378 px aşağıda; 390×844 ekranda panel başlangıcı yaklaşık 2355 px aşağıda. Senaryo seçimi doğru hedef/günü açıyor ama sonucu görünür yapmıyor. Tablet/küçük laptopta liste–detay ilişkisini kullanılabilir hale getir. Tek sütunda senaryo değişiminden sonra hedefin kartları/nedeni/aksiyonu kolayca görünür olsun; üst kontrollere/listeye dönüş de anlaşılır olsun. Listeyi sınırlı yükseklikte kaydırma, yerleşim veya seçili detaya yönlendirme seçeneklerinden sade olanı seç. Bütün kayıtlara ve sayfalamaya erişimi koru; mobilde yatay sayfa taşması oluşturma. 1440 px görünümünü bozma.

2. **JSON şema ve paket kimliği doğrulaması ekle.** `web/src/lib/loadJson.ts` şu an yalnız parse edip `as T` dönüyor. `{}` biçimindeki manifest başarılı sayılıyor, App `showcaseIds.includes` erişiminde hata veriyor. Ayrıca tamamlanmış ama yanlış kimlik/senaryo/gün taşıyan yanıtlar hata yerine sonsuz yükleme durumu oluyor; seed/veri sürümü eşleşmesi denetlenmiyor. Manifest, filo, geçmiş ve ayrıntı dosyalarını kullanmadan önce gerekli alanları/tipleri, geçerli/null sayıları, dizileri ve istenen metadata eşleşmesini doğrula. Veri dosyalarının seed/sürümünü manifest ile, manifest sürümünü okuyucunun desteklediği sürümle tutarlı kontrol et. Yanlış/uyumsuz paket anlaşılır hata ve yeniden deneme durumuna gitsin; render çökmesi, sonsuz yükleme veya karışık paket gösterimi olmasın. Basit tip koruyucular veya küçük bir doğrulama yaklaşımı kullan; gereksiz altyapı kurma. Mevcut AbortController/URL ile eski yanıt korumasını muhafaza et.

Bu görevde ML, backend, yeni sayfa, QR, pasaport veya karbon ekleme. Üretim modelini/eşikleri/değerleri sırf ekranı değiştirmek için oynama. Mevcut 500/30/dört senaryo kapsamını koru.

Dokuz veri testini, lint, TypeScript ve üretim derlemesini çalıştır. Yeni hata davranışı için `{}` manifest, eksik gerekli alan, yanlış veri sürümü/seed ve yanlış kimlik/gün/senaryo örneklerinin anlaşılır hataya gittiğini anlamlı kontrollerle göster. Tarayıcı erişimin varsa 1440×900, 1100×900 ve 390×844 boyutlarında senaryo seç → detay → aynı gün baseline karşılaştır → sıfırla akışını kontrol et. Tarayıcı erişimin yoksa bunu açıkça belirt; yapılmamış kontrolü geçmiş sayma.

Sonunda değişiklikleri, kontrol sonuçlarını ve kalan eksikleri raporla; güncel durumu `DURUM.md` içinde kaydet. Tam pipeline veya saha ürünü tamamlandı diye işaretleme. Bu iki düzeltme sınırında dur.
