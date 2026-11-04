# Faz 5 — Demo ve sunum

4 Kasım 2026. Kullanıcının plan onayıyla uygulandı. Kaynak: COP31 Web Sitesi Brief'i s. 8; genel içerik ve site kuralları s. 2–3 ve 11. Bilinmeyen bilgilerin boş/hazırlanıyor kalması kararı korundu.

Yerel önizleme: `http://127.0.0.1:4173/hakkimizda/demo/?lang=tr`. GitHub'a gönderim veya Vercel yayını yapılmadı. Önceki dört fazın değişiklikleri korundu.

## Yapılanlar

- Demo ve sunum sayfasının genel hazırlık alanı yerine belirgin demo erişimi, beş adımlı kısa kullanım rehberi, üç açıklamalı ekran görüntüsü ve iki sunum materyali kartı eklendi. Mevcut uygulama içi sekiz adımlı rehber korunur.
- Kısa rehber çalışan uygulamaya dayanır: filo/öncelik listesi, senaryo seçimi, neden/öneri ve olaysız karşılaştırma, geçmiş/telemetri, pasaport ve etkileşimli rehber. Mobilde listeye dönüşün arama/filtreyi koruduğu, sıfırlamanın yerel demo geri bildirimini temizlediği belirtilir.
- Yerel demodan iki dilde üçer JPEG kaydedildi. Filo: normal filo, 14. gün, BT-10087. Telemetri: sıcaklık sapması, DEMO-001, 14. gün, olaysız durum karşılaştırması. Pasaport: aynı sentetik batarya ve senaryo. Görsellerdeki sayılar yalnız mevcut sentetik veri setidir; gerçek sonuç olarak metne taşınmadı.
- Altı ekran 1425×990 boyutunda, dosya başına yaklaşık 115–132 KiB'dir. Seçilen dilde üç dosya gösterilir; aşağıdaki görseller ihtiyaç oldukça yüklenir. Alt metin, açıklama, sentetik/nihai arayüz değil etiketi ve kaynak/tarih her görsel için vardır. Tam boyut bağlantısı yeni sekmede açılır.
- Sunum PDF'i ve video sağlanmadı; iki dilde hazırlık kartları gösterilir. Boş veya sahte indirme/oynatma bağlantısı yoktur. Dil bazlı `DEMO_MEDIA` kaydı, dosyalar geldiğinde PDF görüntüleme/indirme veya yerel altyazılı video kontrollerini açacak şekilde hazırlanmıştır. Boş URL veya eksik video altyazısı hazırlık durumunda kalır.
- Demo adı ve sekme başlığı `BinBin Battery Intelligence` oldu. Favicon ve petrol/lime tema tanıtımla uyumlandı. Kurum adı metin olarak gösterilir; yeni logo/izin varsayılmadı. Demoda açıkça sentetik veri kullanıldığı, gerçek BinBin filosu ve nihai arayüz olmadığı yazılır. `noindex`, veri seti, eşikler, hesaplama/karar kuralları ve rehber adımları değişmedi.

## Kontroller

- Node 22.23.1 ile ESLint, TypeScript ve üretim derlemesi geçti. Vite demo + yedi tanıtım HTML girişini üretti; mevcut veri güncel bulundu ve yeniden üretilmedi. Son boş URL korumasından sonra derleme tekrarlandı.
- `sayfa-matrisi.json`: 360, 768, 1440 px × TR/EN × sekiz adres = 48 durum. Gerçek genişlik doğru; yatay taşma yok; tek H1 ve doğru dil var. Tanıtım sayfalarında yedi menü bağlantısı, doğru aktif bağlantı ve eşleşen açıklama/OG metni; demo kökünde `noindex` doğrulandı.
- `demo-sayfasi.json`: yeni sayfa × iki dil × üç genişlik = altı durum. Beş rehber adımı, üç doğru dilde yüklenen görsel, üç açıklama/etiket/kaynak ve iki hazırlık kartı doğrulandı. Dosyalar yokken video/iframe/indirme bağlantısı oluşturulmuyor. Görseller aşağıda olduğundan, yükleme kontrolü sayfada gerçekten kaydırıldıktan sonra yapıldı.
- `etkilesimli-rehber.json`: 360 ve 1440 px × iki dil × sekiz adım = 32 durum; dört tamamlama. Adım sayacı, senaryo, gün, ilgili sekme, rehberin ekrana sığması ve yatay taşma kontrol edildi. Rehber dört akışta da kapandı. Sonuçlar bilinen adım tanımlarıyla karşılaştırıldı.
- `mobil-akis.json`: TR/EN arama + Teknik inceleme filtresi → BT-10087 ayrıntısı → Filoya dön. Ayrıntı açıldı; arama ve filtre korunarak filo geri geldi. Filtre yalnız filo bölümü içinde okunarak dil düğmeleriyle karıştırılmadı.
- `demo-acilis-donus.json`: iki dilde ana demo düğmesine tıklandı, ayrı sekmede `/` açıldı. Doğru dil, tam proje adı ve `noindex`; Proje ve ekip bağlantısıyla `/hakkimizda/` adresine doğru dilde dönüş doğrulandı. Test için açılan sekmeler kapatıldı.
- `dil-gecisleri.json`: iki dil değişiminde aynı demo tanıtım adresi ve doğru dilde görseller; her iki dilde yenileme sonrası dil/URL korunması doğrulandı.
- Görsel büyütme bağlantısına tıklandı: ayrı sekmede JPEG açıldı, doğal boyutu 1425×990 ve yüklenmiş olduğu doğrulandı. Test sekmesi kapatıldı.
- Mobil/masaüstü başlangıç, rehber, galeri, materyal kartları ve yeni demo kimliği görsel olarak incelendi. `tarayici-gunlugu.json` içinde yakalanan warn/error yoktur. Erişilebilirlik kontrolleri başlıklar, alt metinler, klavye odağı ve etiketlerle sınırlıdır; tam erişilebilirlik denetimi yapılmış sayılmaz.

## Bekleyen teslimler

Sunumun yayımlanacak PDF'i, video ve ilgili dilde altyazıları kullanıcıdan bekleniyor. Gerçek PDF görüntüleme/indirme ve video oynatma/altyazı davranışı, bu dosyalar gelmeden doğrulanmış değildir. README'de dosya ekleme yeri ve biçimi açıklanır. Mevcut klasörlerdeki başka araştırma sunumları demo sunumu olarak seçilmedi.

Önceki fazlardan kalan gerçek kişi/kurum/iletişim bilgileri, logo ve yayın izinleri beklenmeye devam ediyor. Bu fazın arayüzü hazırdır; tüm içeriklerin veya yayın hazırlığının tamamlandığı anlamına gelmez. Faz 6–7 başlatılmadı.
