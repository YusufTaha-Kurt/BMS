# Güncel Durum

Son güncelleme: 4 Kasım 2026 (durum analizi; pasaport bağlantısı, 404 ve yayın kontrol listesi eklendi — yayın bekliyor)

## GitHub ve Vercel yayını

- Kullanıcının açık onayıyla Faz 1–5 sayfaları, kullanılabilirlik/tasarım düzeltmeleri, mavi demo ve inceleme kayıtları `main` dalına gönderildi: arayüz commit'i `a31d0a5`.
- Vercel dağıtımı başarıyla tamamlandı. [Tanıtım](https://binbin-battery-intelligence.vercel.app/hakkimizda/) ve [demo](https://binbin-battery-intelligence.vercel.app/) üretim alan adında çalışıyor.
- Canlıda 390/1440px × TR/EN × sekiz adres olmak üzere 32 yerleşim; sentetik veri yükleme, sıcaklık senaryosu/telemetri, profil durumunun korunması ve EN yeni sekme demo açılışı doğrulandı. Yakalanan error/warn yok. [Kanıt](incelemeler/yayin/INCELEME.md).
- [Faz dosyası](WEB_SITESI_FAZ_PLANI.md) yayın ve açık işleri açıklayan güncel metni içerir. Faz 6 bekliyor. Faz 7'nin yayın kısmı yapıldı; gerçek cihaz/ekran okuyucu, içerik/izin ve dosya/form kabul işleri hâlâ açık.

## Durum analizi ve teknik eksiklerin tamamlanması (4 Kasım 2026)

- Temiz kurulumda build/TypeScript/lint ve veri testleri geçti. Kalan işler dış teslimlere (içerik, izin, PDF/video, pilot/karbon ölçümleri), Faz 6 formuna (arkadaşına bırakıldı) ve gerçek cihaz/ekran okuyucu kabulüne bağlı.
- Kodla kapatılabilen eksikler tamamlandı: demoda paylaşılabilir görünüm adresi (`?battery=…&scenario=…&day=…&tab=…`), 500 kimlik için pasaport bağlantısı + QR + kopyalama, bilinmeyen kimlikte açıklayıcı bildirim, iki dilli 404 sayfası. Varsayılan görünüm adrese yazılmaz; demo kökü ve basılı QR değişmedi. Veri içeriği/`contentHash` aynı.
- 12/12 veri testi (yeni pasaport/adres testi dâhil), build ve lint geçti; yerel üretim önizlemesinde masaüstü/mobil akışlar ve konsol kontrol edildi. [Kayıt ve ekranlar](incelemeler/eksik-tamamlama/INCELEME.md).
- İçerik/izin/teslim durumu ve nihai kontrol listesi: [YAYIN_KONTROL_LISTESI.md](YAYIN_KONTROL_LISTESI.md).
- Değişiklikler `claude/laughing-hawking-xsk5nj` dalında; `main`'e birleştirme ve Vercel yayını kullanıcı onayı bekliyor.

Aşağıdaki bölümler yayından önceki uygulama ve inceleme turlarının tarihsel kayıtlarıdır; güncel yayın durumu yukarıdadır.

## Demo için mavi tema tercihi

Kullanıcı yeşil demo zeminini beğenmediğini, önceki mavi görünümü tercih ettiğini belirtti. Önceki lacivert/mavi zemin, panel, kart, metin ve vurgu paleti geri getirildi; grafik çizgileri ve tanıtımda kullanılan sekiz demo görseli güncellendi. Üretim derlemesi ve iki dilde mobil/masaüstü 12 görünüm kontrolü geçti. Dört metin/zemin çiftinde kontrast en az 6,91:1. [Kayıt ve güncel ekran](incelemeler/mavi-demo/INCELEME.md). Yerel sürüm; commit/push/yayın yok.

## Son düzeltmeler ve kullanıcı incelemesi

- Genel `#main`/`#top` bağlantıları artık açılır alanları istemeden açmaz. Doğrudan teknik bölüm ve iç içe pasaport adresleri çalışır; kullanıcı seçimleri korunur.
- Ana sayfa tekrarları azaltıldı; pasaport ayrıntıları ve bekleyen karbon alanları disclosure içinde toplandı. 360px TR başlangıç yüksekliği ana sayfada 6305→5489px, projede 9657→8703px, karbonda 6526→5970px. Yazılar küçültülmedi, teknik içerik ve boş alanlar korundu.
- Üç stil dosyasında tekrarlar birleştirildi; eski lime/dark adları sadeleştirildi. Kurumlar/demo sayfalarının altı hesaplanan stil durumunda fark yok.
- Son üretim derlemesi (TypeScript dâhil), lint ve 11 veri testi geçti. 80 yerleşim ve 32 rehber adımı, hash/dil/geçmiş, mobil odak, galeri açılışı ve konsol kontrol edildi. [Son rapor ve ekranlar](incelemeler/son-duzeltmeler/INCELEME.md).
- UX-06 giderildi, UX-09 iyileştirmesi kullanıcı incelemesinde; UX-05/10 gerçek OS/ekran okuyucu kabulü açık. Faz 6 başlamadı. Gerçek içerik/izin/PDF/video/e-posta teslimleri ve Faz 7 yayın kabulü bekliyor. Commit/push/yayın yok.

Aşağıdaki bölümler önceki uygulama ve inceleme turlarının kayıtlarıdır; güncel durum yukarıdadır.

## Tasarım ve kullanılabilirlik uygulaması (4 Kasım 2026)

- Kullanıcının doğrudan uygulama isteğiyle ortak görsel sistem, ana sayfa kompozisyonu ve içerik türlerine uygun düzenler yenilendi: açık kâğıt zemin, bordo ana eylem, sistem sans/Georgia başlıklar; süreç, karşılaştırma, takvim, kişiler ve boş alanlar ayrı yapılarla sunuluyor. Gerçek sentetik demo ayrıntısı ana görsel oldu; altı demo ekranı güncellendi.
- Mobil odak/dönüş, rehber kısayol kapsamı ve odağı, sekme klavye modeli, bölüm hash'leri, skip link, hedef boyutları ve rehberin kısa ekran yerleşimi için düzenlemeler yapıldı. Son bağımsız kontrolde sekiz UX maddesinin çözümü desteklendi; UX-05/10 cihaz/ekran okuyucu kabulü, UX-06 genel hash yan etkisi ve UX-09 okuma yükü nedeniyle kısmi. OZ-01–08 ve GS-01–08 uygulamaya yansıdı; estetik son kabul açık.
- Node 22 üretim derlemesi, typecheck, lint, 11/11 veri/yerelleştirme testi ve diff kontrolü geçti. 80 yerleşim, derlenmiş sürümde 32 ek yerleşim, 32 rehber adımı, yedi senaryonun üç sekmesi, TR/EN odak/arama/filtre/menü/QR ve bölüm adresleri kontrol edildi. Seçilmiş 10 renk çiftinde kontrast en az 4,55:1. Bu sonuç tam WCAG/cihaz sertifikası değildir.
- İlk inceleme raporları değişmedi. Veri/hesaplama kaynakları, adresler ve basılı QR hedefi korundu. Önceki yerel faz çalışmaları geri alınmadı. Bilinmeyen bilgiler boş; Faz 6 formu başlamadı. GitHub gönderimi, commit ve yayın yapılmadı.
- [Güncel sabit kayıt](TASARIM_INCELEME_KAYDI.md) · [Uygulama, testler ve güncel ekranlar](incelemeler/tasarim-uygulama/UYGULAMA_DOGRULAMA.md).
- [Son bağımsız kontrol ve faz karşılaştırması](incelemeler/tasarim-bagimsiz-kontrol/INCELEME.md): build/typecheck/lint ve 11 veri testi tekrar geçti; 55 yerleşim durumu kontrol edildi. `#main`/`#top` hedeflerinin açılır alanları istemeden açması tekrar üretildi. Bu incelemede ürün kodu değiştirilmedi. Faz 1–5 boş alanlı taslak kapsamında hazır; Faz 6 bekliyor, Faz 7 kısmi.

Aşağıdaki inceleme ve faz kayıtları önceki turların tarihsel durumunu anlatır; güncel durum üstteki uygulama kaydıdır.

## Sabit tasarım incelemeleri (4 Kasım 2026)

- Kullanıcı, HIG/apple-design incelemesindeki bulguların korunmasını istedi. Ortak referans: [Tasarım inceleme kaydı](TASARIM_INCELEME_KAYDI.md). Önceki 12 bulgu UX-01–12 olarak açık durumdadır; ilk rapor ve kanıtları korunur.
- Sitenin “AI üretimi gibi görünmesi” ayrıca; tekrarlayan kartlar, genel sloganlar, görsel ritim, okuyucuya seslenme ve projeye özgü malzeme açısından değerlendirildi. [Özgünlük incelemesi](incelemeler/hig-apple-design/OZGUNLUK_INCELEMESI.md) tasarım yorumlarını HIG'in doğrudan kurallarından ayırır. OZ-01–08 öneridir; uygulama yapılmadı.
- Kullanıcı görsel tasarımın da değerlendirilmesini özellikle istedi. [Görsel sistem incelemesi](incelemeler/hig-apple-design/GORSEL_SISTEM_INCELEMESI.md), renk rolleri/kombinasyonu, font seçimi/ölçeği, bloklar, butonlar, boşluklar ve görsel kompozisyon için GS-01–08 önerilerini ekler. Renk/font tercihleri değerlendirmeye açıktır; ürün tasarımı değiştirilmedi.
- Kullanıcı Faz 6 iletişim formunu arkadaşına bıraktı; form bekleyen iştir. Faz 7 ve yayın yapılmadı. Bilinmeyen bilgilerin boş kalması kararı sürer.
- Bu turda ürün kodu, görünür site metinleri veya sayfa tasarımı değiştirilmedi. GitHub'a gönderim veya yayın yoktur.

## Web sitesi Faz 5 — Demo ve sunum (4 Kasım 2026)

- Kullanıcının plan onayıyla brief s. 8 ve ortak kurallar uygulandı. `/hakkimizda/demo/` artık genel hazırlık kartı yerine demo erişimi, beş adımlı kısa rehber, üç açıklamalı ekran ve sunum materyallerini içerir.
- Ekranlar yenilenen yerel demodan TR/EN ayrı kaydedildi: normal filo/14. gün; DEMO-001 sıcaklık sapması/14. gün telemetri; aynı bataryanın pasaportu. Kaynak, alt metin, sentetik/nihai arayüz değil açıklaması vardır. JPEG dosyaları yaklaşık 115–132 KiB; yeni sekmede büyütülür.
- Demoda proje adı `BinBin Battery Intelligence` oldu. Başlık ve favicon yenilendi; petrol/lime kimliği tanıtımla uyumlandı. Kurum adı metin olarak gösterilir. Üstte gerçek filo verisi ve nihai arayüz olmadığı açıkça belirtilir. Veri üretimi, eşikler ve karar kuralları değiştirilmedi.
- Sunum PDF'i ve video henüz sağlanmadı. `demoMedia.ts` içinde dil bazında dosya bilgisi eklendiğinde PDF görüntüleme/indirme veya altyazılı video alanı açılır; mevcut hâlde hazırlık kartları vardır. Gerçek dosya erişimi/oynatma kontrolleri dosyalar geldikten sonra yapılacaktır.
- Node 22 derleme, TypeScript ve lint; 48 sayfa/boyut/dil durumu, altı yeni sayfa kontrolü, 32 etkileşimli rehber adımı, mobil arama/filtre korunması, yeni sekmede demo açılışı ve tanıtıma dönüş doğrulandı. Ayrıntılar: [Faz 5 incelemesi](incelemeler/faz-5/INCELEME.md).
- Yerel taslak hazır. Sunum/video dosyaları ile önceki içerik/izin teslimleri bekleniyor. GitHub'a gönderim veya Vercel yayını yapılmadı. Faz 6–7 uygulanmadı.

## Web sitesi Faz 4 — Proje detayları ve karbon (4 Kasım 2026)

- Kullanıcının onayıyla brief s. 7 ve 9, genel kurallar ve proje teklifinin ilgili bölümleri uygulandı. Bilinmeyen bilgilerin boş kalması kararı korundu.
- `/hakkimizda/proje/`: sade özet, amaç/hedef kitle, varsayımsal bakım senaryosu, altı adımlı akış, dört veri erişim önceliği, açılır planlanan yöntemler ve pasaport erişimi, yaşam döngüsü durumları ve teklifin göreli pilot Faz 0–5 takvimi hazırdır. Salt okunur erişim, BMS korumaları ve teknik personelin son kararı açıklandı.
- `/hakkimizda/karbon/`: beklenen etki uyarısı, iki ayrı karbon göstergesi, sayısal değer içermeyen emisyon formülü, varsayımlar, ikinci yaşam değerlendirme sınırları ve resmî kaynaklar eklendi. Ölçülmüş tasarruf/azaltım veya model doğruluğu iddiası yoktur.
- Dört pilot ve on gerçek karbon bilgi alanı `web/src/about/projectData.ts` içinde boş; metinler `content/technical.tr.ts` / `technical.en.ts` içinde yönetilir. Demo verisi veya demo faktörü bu alanlara bağlanmaz.
- Teklifin V2/71 veri noktası dayanağı tarihsel olarak belirtilir; güncel Komisyon kaynaklarına bağlantı ve Faz 0 eşleştirmesi vardır. Bu sayfalar tamamlanmış mevzuat uyumu veya gerçek pasaport hizmeti iddiası değildir.
- Node 22 üretim derlemesi, TypeScript ve lint geçti. İki dil × üç ekran boyutu × yedi sayfa; yeni sayfalarda 12 içerik/etkileşim durumu, dört dil değişimi ve iki yenileme doğrulandı. Kanıtlar: [Faz 4 incelemesi](incelemeler/faz-4/INCELEME.md).
- Yerel taslak hazır. Gerçek pilot bilgileri, ölçümler ve kaynaklar bekleniyor. GitHub'a gönderim veya Vercel yayını yapılmadı. Faz 5–7 uygulanmadı.

## Web sitesi Faz 3 — Kurumlar ve iş birlikleri (4 Kasım 2026)

- Kullanıcı, netleşmemiş bilgiler dışında brief içeriğinin kullanılmasını ve aynı boş alan yaklaşımıyla ilerlenmesini istedi.
- `/hakkimizda/kurumlar/`: iki kurumun kısa tanıtımı, aralarındaki ilişki, resmî bağlantılar, brief'teki dört taslak yönetici adı ve Ar-Ge/projeler sorumlusu için boş kayıt hazırlandı. Kurumdan teyit edilmemiş unvan, kurum ve e-posta alanları boş kalır.
- `/hakkimizda/iletisim/`: BinBin'in tam şirket adı, “önerilen pilot iş birliği” durumu ve teklifin önerdiği yaklaşım; Sustain Bridge için başlık ve boş alanlar; proje iletişimi ve Faz 6 form bölümü eklendi. Kesinleşmiş ortaklık veya imzalı anlaşma iddiası eklenmedi.
- Kişi/kurum bilgileri `web/src/about/organizations.ts` içinde; metinler ayrı EN/TR dosyalarında yönetilir. Logolar onaylı görsel ve kaynakları sağlanana kadar boş alanlardır. Gerçek form/gönderim/veri toplama yoktur.
- Node 22 derleme, TypeScript, lint; iki dil × üç ekran boyutu × yedi sayfa kontrolü geçti. Ayrıntılar ve ekranlar: [Faz 3 incelemesi](incelemeler/faz-3/INCELEME.md).
- Arayüz yerelde hazır; kurum teyitleri, iş birliği onayları ve e-posta bilgileri bekleniyor. GitHub'a gönderim veya Vercel yayını yapılmadı. Faz 4–7 uygulanmadı.

## Web sitesi Faz 2 — Ana sayfa ve ekip taslağı (4 Kasım 2026)

- Kullanıcı, henüz bilinmeyen bilgilerin boş alanlarla bırakılarak sayfaların hazırlanmasını istedi; gerçek içerikleri ekipten aldıktan sonra sağlayacak. Bu karar sonraki fazlar için de geçerlidir.
- Ana sayfaya proje adı, teklif/pilot planlama aşaması, sorun/çözüm özeti, görünür altı adımlı akış, kısa ekip özeti, kurumların kısa tanıtımı, COP31 bağlamı ve ilgili sayfalara yönlendirmeler eklendi. Mevzuat ve kurum özetleri resmî kaynaklarla desteklendi.
- `/hakkimizda/ekip/` artık hazırlık kartı yerine beş üye ve akademik koordinatörün satır içinde açılan profillerini gösterir. Rol, çalışma paketi, katkı, kısa tanıtım ve bağlantı alanları hazırdır. Üye bilgileri “—” olarak kalır; koordinatörün kaynakta bulunan bilgileri eklenmiştir.
- Kullanıcı gerçek içerikleri verdiğinde `web/src/site.ts` kayıtları güncellenecek. Bilinmeyen görev, biyografi, fotoğraf veya bağlantı üretilmedi.
- Kontroller ve ekranlar: [Faz 2 incelemesi](incelemeler/faz-2/INCELEME.md). GitHub'a gönderim veya canlı yayın yapılmadı. Faz 3–7 uygulanmadı.

## Web sitesi Faz 1 — Ortak düzen (4 Kasım 2026)

- Kullanıcının uygulama planı onayıyla ortak site yapısı kodlandı. Kaynak sürüm `02ea760`; güncel kaynak brief’in s. 2–3 ve 11’i, teklifin kapak/özet bölümleri esas alındı.
- `/hakkimizda/` altında kurumlar, ekip, proje, demo, karbon ve iletişim adresleri eklendi. Yedi sayfa Vite tarafından ayrı HTML olarak derlenir; aynı React girişini ve ortak şablonu kullanır. Ana sayfanın mevcut içerikleri/profilleri korunur. Yeni içerikler iki dilli hazırlık alanlarıdır.
- Ortak üstbilgi, aktif menü, mobil açılır menü (Escape/odak dönüşü), EN/TR, sayfa metaverileri, içeriğe atlama ve altbilgi oluşturuldu. Ortak dil metinleri `en.ts` / `tr.ts` içinde; proje e-postası ve gerçek güncelleme tarihi `site.ts` içinde yönetilir.
- Basılı QR hedefi `/hakkimizda/`, demo girişi `/` olarak kaldı. Demo bağlantıları yeni sekmede doğru dille açılır ve yanlarında gerçek filo/nihai arayüz olmadığını belirten sentetik veri açıklaması bulunur.
- Derleme, TypeScript, lint ve 360/768/1440 px × EN/TR × 7 sayfa kontrolleri geçti. Aynı sayfada dil değiştirme, doğrudan açılış/yenileme, mobil menü ve demo rehberi/dönüş akışı doğrulandı. Kanıtlar [Faz 1 incelemesinde](incelemeler/faz-1/INCELEME.md).
- Gerçek kurumsal proje e-postası ve yayın izinleri bekleniyor. Yeni üstbilgi metin tabanlıdır. Canlı siteye yayın veya GitHub'a gönderim yapılmadı. Faz 2–7 uygulanmadı.

Aşağıdaki bölümler önceki geliştirme turlarının tarihsel kayıtlarıdır.

## Çift dilli demo ve mobil görünüm geçişi (3 Kasım 2026)

- Demo başlığı, alt açıklama ve rehberdeki şirket adı kaldırıldı; OSTİM–COP31 birleşik logosu ve nötr Battery Intelligence adı kullanılıyor. Tanıtıma dönüş doğrudan bağlantı; QR paylaşımı ayrı işlem. Alan adı ve basılı QR hedefi aynı.
- Tanıtım ve demo EN/TR tercihini paylaşır; URL’de açık dil seçimi ve mümkünse tarayıcı tercihi korunur. Ekran metinleri, kural gerekçeleri/önerileri, senaryolar, tarihler/sayılar, grafikler, pasaport ve hata durumları iki dilde. Hesaplama koşulları/eşikleri ve veri seti aynı; varsayılan Türkçe veri çıktısı değişmedi.
- Kullanıcı onayıyla 1280 px altında Filo / Batarya ayrıntısı geçişi eklendi. Batarya ve senaryo seçilince ayrıntı açılır; geri dönüş arama, filtre ve sayfayı korur. Gizli ayrıntı grafikleri oluşturulmaz. Masaüstünde iki sütun korunur.
- Sunum metni yerine 8 adımlık ziyaretçi rehberi; SOH/SOC/ΔV/veri yeterliliği açıklamaları; geri bildirimin yalnız bu tarayıcıdaki demo olduğu bilgisi eklendi.
- 11/11 veri/yerelleştirme testi geçti: tüm senaryo/gün kayıtlarında İngilizce öncelikler aynı, Türkçe metinler mevcut veriyle birebir; EN/TR sayı, tarih, yüzde ve null gösterimleri doğrulandı. TypeScript, build ve lint kontrolleri tamamlandı; tarayıcıda yedi senaryonun üç sekmesi, rehberin iki dilde sekiz adımı, mobil durum korunması ve iki sayfa arasında dil geçişi doğrulandı. 320/390/768/1440 px kontrollerinde taşma, hata veya uyarı yok.

## Kısa tanıtım ve satır içinde ekip profilleri (3 Kasım 2026)

- Açılış kısaltıldı; demo düğmesi ve ekip bağlantısı ilk ekranda. Ekip doğrudan açılışın altında; sıralama Gizem, Gamze, Erhan, Yusuf, Ahmed ve akademik koordinatör Barış Taha Uludağ.
- İsim satırları görünür “View profile / Profili gör” etiketi ve aşağı okla, kendi yerinde genişler. İçerik kadar uzayan yerel `details/summary` yapısı kullanılır. Kişi bilgileri henüz verilmediğinden görev/biyografi/link uydurulmadı; koordinatörün broşürdeki görevi korunur. İki dilli içerik ve bağlantılar `web/src/site.ts` içinden eklenebilir.
- Proje anlatımı üç kısa başlığa indirildi; ayrıntılı akış kapalı başlayan “How it works / Nasıl çalışır?” bölümünde. Tanıtım sayfasının metin, başlık ve paylaşım metaverilerinden önceki şirket adı kaldırıldı; alan adı ve demo paneli korunuyor.
- Kontroller: altı profilin kendi yerinde büyümesi, bir seferde tek açık profil, klavyeyle açma/kapatma, iki dilde 320/390/768/1440 px taşma ve ilk ekranda demo görünürlüğü; TypeScript/üretim derlemesi ve lint. Kişisel içerikler hazır olduğunda aynı kayıtlar üzerinden eklenecek.

## Broşürden tanıtım sayfasına (3 Kasım 2026)

- `/hakkimizda/` sayfası COP31 broşürünün petrol yeşili, bordo, lime ve kırık beyaz kimliğine uyarlandı. PDF özgün font bilgisini korumadığı için mevcut Inter kullanıldı; başlık ağırlıkları ve boşluklar referansa göre düzenlendi. Kurum logoları sağlanan broşürden alındı, batarya/döngü görseli SVG olarak çizildi.
- İlk açılış İngilizce; üstte EN/TR seçimi var. Proje, çözüm, veri akışı, döngüsel kullanım, ekip ve demo bölümleri iki dilde mevcut. Ekip ve koordinatör isimleri broşürden aktarıldı. Örnek e-posta adresleri kaldırıldı; gerçek iletişim adresi eklenene kadar e-posta bağlantısı gösterilmiyor.
- Basılı QR'ın hedefi ve demo giriş adresi korundu. Tanıtım sayfasının CSS'i ayrı giriş noktasından yüklenir; demo veri hattı ve hesapları değiştirilmedi.
- Doğrulama: Node 22.23.1 ile `npm run build` (TypeScript dahil), `npm run lint`, `git diff --check`; üretim önizlemesinde EN/TR seçimi, İngilizce başlangıç, görsel yüklemesi, demoya geçiş ve iki dilde 320/390/768/1440 px yatay taşma kontrolü. Tarayıcıda error/warn kaydı yok. Veri hesapları değişmediğinden bu tasarım turunda veri testleri yeniden çalıştırılmadı.

## Kullanıcının belirlediği çerçeve

- Hedef: Excalidraw pipeline’ının tamamını gerçekleştiren COP31 demosu.
- Arayüz referansı: `BinBin_Proje_Teklifi.pdf`, sayfa 10 ve paylaşılan panel görseli.
- Panel verisi sentetik üretim hattından gelecek; sayısal sonuçlar elle yazılmış ekran verisi olmayacak.
- Tam pipeline planı korunacak. 23 Ekim BinBin görüşmesinde amaç, destekleri/verileriyle geliştirmek istediğimiz sistemi çalışan prototiple göstermek.
- Bu aşamada ML eğitimi yapılmayacak; sentetik veriden gerçek hesaplar ve açıklanabilir bakım kuralları kullanılacak. Model sonucu iddiası olmayacak.
- 23 Ekim sunumunda QR gerekli değil. Uzun vadeli pasaport/QR hedefi korunuyor.
- Geliştirme Claude Code ile kullanıcı tarafından yürütülecek.
- ChatGPT kod analizi, sonraki adım ve güncel duruma göre prompt hazırlamayı üstlenecek.
- Gelecek aşamaların promptları önceden hazırlanmayacak; ChatGPT uygulama kodu yazmayacak. Mevcut kod durumu görüldükten sonra yalnız sıradaki görev hazırlanacak.
- Eski takvim, kişi dağılımı ve mimari seçimler değiştirilebilir.

## İlk demo uygulaması (22 Ekim 2026, Claude Code)

`web/` altında React + TypeScript + Vite, Tailwind, Recharts, Lucide; veri Node/tsx betiğiyle üretilir. Sürümler `web/package-lock.json` içinde (vite 8.3, react 19.3, typescript 5.9, tailwind 4.3, recharts 3.10).

- **Veri hattı:** `web/scripts/sim.ts` (basit sentetik model, fiziksel doğrulama iddiası yok), `dataset.ts`, `generate-data.ts`. 500 kimlik (DEMO-001…006 + BT-10001…), 30 gün, 5 dk. Ham telemetri yalnız DEMO-001…006 için gün bazlı dosyalara yazılır; tüm bataryalar için günlük geçmiş ve filo-gün özetleri vardır. 2840 JSON dosyası. `predev`/`prebuild` veri yoksa veya seed/sürüm uyuşmuyorsa üretir.
- **Senaryolar:** baseline; 8. günden itibaren DEMO-001 ısınma, DEMO-002 ΔV artışı, DEMO-003 veri kaybı. Olay yalnız hedef telemetriyi değiştirir; sonuçlar `web/shared/rules.ts` kurallarından gelir.
- **Arayüz:** filo sayıları, senaryo/gün kontrolü, baseline karşılaştırma, sıfırla; arama/filtre/sayfalama listesi; operasyon paneli (kartlar, neden, aksiyon, günlük geçmiş, vitrin telemetri grafikleri); yükleme/boş/eksik dosya/bozuk dosya durumları.
- **Çalıştırılan kontroller:** `npm run verify:data` (9 test geçti), `npm run typecheck`, `npm run lint`, `npm run build` (temiz `public/data` ve `dist` ile, veri otomatik üretildi). Başsız Chrome + DevTools protokolüyle etkileşim kontrolü (senaryo→8. gün, karşılaştırma, hızlı gün değişimi, arama/boş sonuç, eksik/bozuk dosya, sıfırla, 390 px'te yatay taşma yok, konsol hatası yok) ve masaüstü/tablet/mobil ekran görüntüleri.
- **Yapılmayanlar / eksikler:** Claude in Chrome eklentisi bağlı değildi; el ile tarayıcı gezintisi yapılmadı. `npm ci` temiz makinede ayrıca denenmedi. JS paketi ~610 kB (Vite uyarısı; bölünmedi). Kritik ihlalin veri tamamen yokken (kapsam %0) önceki günden taşınması yok. Erişilebilirlik yalnız temel düzeyde (etiketler, odak, renk+ikon+metin) kontrol edildi. Gerçek BinBin verisi, ML, QR, pasaport/karbon, hesap/iş emri yok. Uzun vadeli plan tamamlandı sayılmaz.

## Yatırımcı sunumu güncellemesi (22 Ekim 2026, Claude Code, veri sürümü 2.0.0)

Teklif PDF'iyle karşılaştırma sonrası yapılanlar:

- **Kritik görünürlüğü:** Olaysız filoda da teknik inceleme gerektiren 3 batarya var (BT-10087 ΔV, BT-10213 park gerilimi, BT-10379 iç direnç; parametre düzeyinde ayarlı, sonuç kurallardan). Açılış 14. gün ve BT-10087. Senaryo seçilince 8. gün yerine 14. güne atlanır; hedef batarya bu günde teknik incelemededir (testle doğrulanır).
- **Durum adları teklifin Bölüm VII diline uyarlandı:** Kritik → Teknik inceleme (yüksek öncelik), Dikkat → İzlemeye al, Veri kapsamı → Veri yeterliliği. Aksiyonlar öneri kipinde; "nihai karar teknik personelde" notu eklendi.
- **Karşılaştırma:** "Baseline ile karşılaştır" → "Olaysız durumla karşılaştır"; normal filoda gizli, senaryo seçilince otomatik açık. "Baseline" senaryosu arayüzde "Normal filo".
- **Yeni senaryolar:** Park gerilim düşüşü (DEMO-007, iç kaçak akım; öğle park penceresinde gerilim eğimi mV/sa), İç direnç artışı (DEMO-008; sürüş başlangıcında ΔV/ΔI, SOC'nin OCV etkisi çıkarılarak mΩ) ve 15 bataryada beş olay türünün aynı anda yaşandığı Karma filo günü. Toplam 7 senaryo, 5390 dosya.
- **Pasaport ve karbon:** Seçili batarya için salt-okunur Dijital Batarya Pasaportu kartı (sentetik kimlik/model, kaynağı ayrılmış sağlık kayıtları, öncelik değişimlerinden olay kaydı, erişim seviyeleri) ve operasyonel karbon (şarj enerjisi / %90 verim × 0,45 kg/kWh demo faktörü; resmî ETKB-EVÇED değeri pilotta).
- **Kapalı döngü:** Teknik inceleme önerisi alan bataryada "Bulgu doğrulandı / Yanlış alarm" düğmeleri; sayaç üst çubukta. Yalnız tarayıcıda saklanır, Sıfırla temizler.
- **Sunum rehberi:** 12 adımlık yerleşik yönlendirme kartı (söylenecek cümle + ekranda gösterilecek yer; adım paneli kendisi kurar).
- **Canlı yayın:** https://binbin-battery-intelligence.vercel.app (Vercel projesi `binbin-battery-intelligence`, kaynak dosyalardan derlenir: `npm run data && vite build`). İlk yayın Git bağlantısı olmadan yapıldı; GitHub deposu açılınca projeye bağlanacak.
- **Kontroller:** 9/9 veri testi (yeni senaryo, açılış günü ve doğal arıza beklentileriyle genişletildi), typecheck, lint, build. Başsız Chrome ile 12 rehber adımı, senaryo seçimi, geri bildirim, sıfırlama ve 390 px görünümü tıklatıldı; konsol hatası yok, yatay taşma yok.

## Sadeleştirme ve stant QR'ı (3 Kasım 2026, Claude Code)

- **Daha az yazı:** Üst çubukta alt açıklamalar, senaryo açıklama satırı ve öncelik seviyesi alt yazıları kaldırıldı; kontroller tek satırda. Listede aksiyon alt satırı kaldırıldı (aksiyon detay panelinde). Metrik kartlarında eşik metinleri kaldırıldı (eşikler grafik çizgilerinde); "Normal" rozeti yalnız sapma varken gösterilir. Neden + Öneri + saha geri bildirimi tek kutuda.
- **Sekmeler:** Detay panelinde Geçmiş / Telemetri / Pasaport sekmeleri; sunum rehberi ilgili sekmeyi kendisi açar (veri kaybı → Telemetri, pasaport → Pasaport). Pasaport açıklama paragrafları kısaltıldı.
- **QR + Hakkımızda:** `qrcode-generator` (bağımlılıksız, MIT) ile tarayıcıda QR. Üst çubukta "Hakkımızda" tam ekran QR, sayfa altında küçük QR kartı. QR `/hakkimizda/` sayfasını açar (Vite çoklu sayfa; veri/grafik yüklemez). İletişim bilgileri `web/src/site.ts` içinde, **yer tutucu e-postalar gerçek adreslerle değiştirilmeli**.
- **Kontroller:** typecheck, lint, build, 9/9 veri testi. Başsız Chromium ile 1440/390 px ekran görüntüleri, QR'ın `https://binbin-battery-intelligence.vercel.app/hakkimizda/` olarak çözüldüğü (jsQR), 12 rehber adımı ve sekme geçişleri, Hakkımızda → demo bağlantısı; konsol hatası ve yatay taşma yok. Vercel'e yeniden yayın yapılmadı.
- **Vercel düzeltmesi ve yayın:** Proje GitHub'a bağlandıktan sonra Git tetikli derlemeler `package.json` kökte olmadığı için (`npm install` ENOENT) hata veriyordu. Proje ayarları: kök dizin `web`, Node 22.x, kurulum `npm ci`, derleme `npm run build` (veri `prebuild` ile üretilir), çıktı `dist`. `claude/brave-goodall-jnyyzk` dalının `cc1c26f` commit'i production'a alındı ve https://binbin-battery-intelligence.vercel.app adresine bağlandı (READY).

## Doğrulananlar

- Excalidraw ve yerel mimari/veri sözlüğü incelendi.
- Teklifin ilgili arayüz/veri/model/karar destek bölümleri ve 10. sayfasının görseli incelendi.
- Sekiz aşamalı tam pipeline planı v0.3 hazır. BinBin görüşmesinin ürün prototipi amacı ve ML/QR ayrımı ayrıca kaydedildi.
- Uygulama kodu oluşturulmadı. Klasörde mevcut uygulama bulunmadığı tekrar kontrol edilerek yalnız ilk çalışan demo görevi `ILK_GELISTIRME_PROMPTU.md` içinde hazırlandı. Sonraki promptlar yok.
- İlk demo için React/TypeScript/Vite, Tailwind, Recharts ve Node/TypeScript üretici seçildi; ayrıntılar `DEMO_KARARLARI.md` içinde.
- İlk demo tamamen sentetik olacak; kaynak deney verisi entegrasyonu sonraki iş. Mevcut tam pipeline’ın bu hedefi korunuyor.
- Referans görsel `referanslar/binbin-panel-referansi.png` içine kopyalandı. Node v22.23.1 / npm 10.9.8 görüldü.
- COP31 içindeki geçici/çıktı klasörleri dışındaki manifest taramasında mevcut web/Python uygulama projesi bulunmadı. Başka konumdaki kod henüz incelenmedi.

## Henüz yapılmayanlar

Kaynak arşivini okuma ve gerçek veriyle sözleşme doğrulaması, ML, QR/pasaport/karbon ekranları, yayın/dağıtım yapılmadı. İlk demo yalnız sentetik veri ve kurallarla çalışır.

Aktif iş: **İlk demo incelendi; iki sınırlı düzeltme bekliyor.** Ana akış yerel üretim önizlemesinde çalıştı. Dar ekranda detay görünürlüğü ve çalışma anında JSON şema/paket doğrulaması için `DUZELTME_PROMPTU_01.md` hazırlandı. İnceleme ve kanıtlar `incelemeler/ilk-demo/INCELEME.md` içinde. Uygulama kaynak kodu ChatGPT tarafından değiştirilmedi. Tam planın aşamaları tamamlandı sayılmıyor.

## ChatGPT bağımsız incelemesi

- `http://localhost:4173` ziyaret edildi; dört senaryo, olay öncesi/sonrası, karşılaştırma, arama, filtre temizleme, vitrin dışı batarya, sıfırlama, son gün ve hızlı geçişler denendi.
- 9/9 veri testi, lint, TypeScript ve üretim derlemesi geçti. Build için inceleme ortamının tsx IPC kısıtı nedeniyle eşdeğer CLI adımları kullanıldı; ayrıntı raporda.
- 720 ayrıntı dosyasında tepe/ortalama değerler bağımsız yeniden hesaplanıp günlük özetlerle karşılaştırıldı; yuvarlama sınırında eşleşti.
- 1440/1100/390 px düzenleri kontrol edildi. Dar ekranda detay uzun listenin altında kalıyor. Yanlış şemalı JSON yükleyicide başarılı kabul ediliyor; manifestte render hatasına yol açabiliyor. Mevcut normal dosyalarda çökme görülmedi.
- Tarayıcı oturumunda error/warn günlüğü yok. Gerçek internet kapalı soğuk başlangıç ve temiz makine kurulumu henüz doğrulanmadı.

## Açık kararlar

| Konu | Durum / karar zamanı |
|---|---|
| Mevcut uygulama kodu | `web/` (ilk demo); kod incelemesi bekliyor |
| Teknoloji/dosya düzeni | İlk demo: Vite/React/TypeScript ve Node üretici; uygulama `web/` altında |
| Ekran alanlarının hesaplara eşlemesi | Aşama 1 |
| Kaynak alanları/birimleri | Ham arşiv okunmadı; ilk demo tamamen sentetik. Tam pipeline Aşama 2 hedefi sonraki iş |
| Senaryo/eşik/model ayarları | Önceki taslak referans; sözleşme/veriyle netleşecek |
| Ekran yerleşimi | İki referans panel ve koyu tasarım yönü esas; görsel incelemeyle netleşecek |
| 23 Ekim sunum kapsamı | Çalışan sentetik veri + kurallı panel; ML/QR yok. Diğer ekranların sunulabilirliği kod/süreyle değerlendirilecek |
| Tam MVP tarihi/çalışma kapasitesi | Belirlenmedi |
| Barındırma/sabit QR adresi | Yayın entegrasyonundan önce seçilecek |

## Sonraki değerlendirme

Claude Code ilk demo görevini uyguladıktan sonra gerçek dosyalar, üretim çıktısı, kontroller ve çalışan ekran incelenecek. Ancak bundan sonra düzeltme veya sonraki geliştirme promptu hazırlanacak.

## Karar geçmişi

| Tarih | Karar | Gerekçe |
|---|---|---|
| 22 Ekim 2026 | Gün/kişi yerine aşama ve kabul ölçütleri | Eski takvim bağlayıcı değil |
| 22 Ekim 2026 | Promptları önceden hazırlamama | Gerçek kod/sonuç üzerinden sonraki iş seçilecek |
| 22 Ekim 2026 | Teklifteki iki paneli referans kabul etme | Kullanıcı istediği arayüzü gösterdi |
| 22 Ekim 2026 | Tam pipeline planı; yarın analizini sonraya bırakma | Kullanıcının son yönlendirmesi |
| 22 Ekim 2026 | BinBin görüşmesinde ML ve QR yerine çalışan ürün prototipi | Amaç, BinBin verisi/desteğiyle geliştirmek istenen sistemi göstermek |
| 22 Ekim 2026 | Tek çalışma ortamıyla basit demo: Vite/React ve Node üretici | Kullanıcı Claude Code ile ilk çalışan demoya başlamak istedi; uygulama kodu henüz yok |

## Kaynak kodu paylaşımı ve temiz kurulum

Kullanıcı kurulum yapmadan açılan bir sürüm istemedi; kaynak klasörünü arkadaşına gönderip onun da bağımlılıkları kurarak çalıştırmasını istedi. Buna göre `KURULUM.txt`, `KURULUM_TESTI.txt`, `web/.nvmrc` ve `web/.node-version` eklendi. Paylaşım ortamı Node 22.23.1 / npm 10.9.8 olarak belirlendi; `package-lock.json` ve `npm ci` kullanılıyor. Uygulama kaynakları ve paket sürümleri değiştirilmedi.

Kaynak ZIP; node_modules, dist ve üretilebilir public/data dosyaları olmadan hazırlanıyor. ZIP temiz bir macOS klasörüne açıldı; Node 22.23.1/npm 10.9.8 ile 216 bağımlılık paketi kuruldu, veri üretildi, 9/9 test, lint ve gerçek npm build komutu geçti. Temiz kopyanın üretim önizlemesi ayrı yerel portta tarayıcıdan açıldı; ilk ekran ve hata günlüğü kontrol edildi. Bağımlılık kurulumu mevcut npm önbelleğinden yapıldı; Windows/Linux veya boş önbellekle internetten indirme denenmedi. Ayrıntı `KURULUM_TESTI.txt` içinde.
