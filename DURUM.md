# Güncel Durum

Son güncelleme: 3 Kasım 2026 (broşürle uyumlu EN/TR tanıtım sayfası)

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
