# Faz 4 — Proje detayları ve karbon

Tarih: 4 Kasım 2026. Kullanıcının uygulama onayıyla, bilinmeyen alanların boş bırakılması kararı korunarak hazırlandı. Yerel üretim önizlemesi: `http://127.0.0.1:4173`. GitHub'a gönderim veya Vercel yayını yapılmadı.

## Kapsam ve kaynaklar

- Web sitesi brief'i: s. 7 ve 9; genel kurallar s. 2–3 ve 11. Teknik içerik: BinBin Proje Teklifi'nin I–III, V–XI bölümleri ve ilgili kaynakçası.
- [AB Batarya Tüzüğü 2023/1542](https://eur-lex.europa.eu/eli/reg/2023/1542/2026-08-13/eng/): pasaport ve karbon kapsamı. EUR-Lex tam sayfa erişimi robot kontrolüne takıldı; teklif ve resmî arama çıktılarıyla sınırlı kontrol yapıldı. Tam metin incelenmiş veya hukuki uygunluk doğrulanmış sayılmadı.
- [Komisyonun güncel pasaport kaynakları](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/batteries_en) ve [uygulama/erişim açıklamaları](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/eu-digital-product-passport-faq-batteries_en): okundu. Güncel kaynak sayfasındaki Ekim 2026 güncellemesi nedeniyle, teklifin V2/71 veri noktası dayanağı tarihsel olarak belirtildi. Pilot Faz 0'da güncel rehber eşleştirmesi yapılacağı açıklandı; 71 noktanın tamamı her LMT bataryasına uygulanıyormuş gibi sunulmadı.
- [ETKB–EVÇED faktör kaynağı](https://duyuru.enerji.gov.tr/evced-cevre-ve-iklim-elektrik-uretim-tuketim-emisyon-faktorleri): okundu. Yıl ve bağlantı tipine göre pilot seçimi gerektiği belirtildi; yayımlanmış bir sayı pilot değeri olarak seçilmedi.
- [UNFCCC COP31](https://unfccc.int/cop31): bağlam için resmî bağlantı.

## Uygulananlar

`/hakkimizda/proje/` için dört cümlelik sade özet, amaç/hedef kitle, varsayımsal üç adımlı bakım senaryosu, ana sayfayla ortak altı adımlı akış ve dört veri erişim önceliği eklendi. Mevcut bulut ilk, ek sensör son seçenektir. Salt okunur erişim, BMS korumalarına müdahale edilmemesi ve nihai kararın teknik personelde kalması belirtilir.

Beş planlanan analiz yöntemi açılır bölümde, gerekli veri ve doğrulama koşullarıyla anlatılır. Mevcut sentetik/kural tabanlı demo, henüz saha verisiyle doğrulanmamış aday modellerden ayrılır. Pasaport anlatımı model/tekil batarya düzeyi, kimlik/QR, teknik seçenekler, üç erişim grubu, beş yaşam döngüsü durumu ve sağlık bilgisinin kaynak ayrımını içerir. Durumlar zorunlu sıralı aşamalar değildir. JSON-LD ve DID mevzuat zorunluluğu sayılmaz.

Pilot takvimi teklifin göreli Faz 0–5 planıdır; kesin tarihler veya web sitesi geliştirme fazları değildir. İlk ay, 1–3, 3–6, 6–7, 7–10 ve 10–12+ ay dönemleri veri yeterliliği/ortak karar koşuluyla gösterilir. Dört kesin pilot bilgisi boş bırakılır.

`/hakkimizda/karbon/` üst içerik uyarısı brief'teki Türkçe metinle aynıdır:

> Bu sayfadaki etkiler beklenen etkilerdir ve tahmin niteliğindedir. Ölçülmüş sonuçlar pilot çalışmanın ardından paylaşılacaktır.

Beklenen katkılar nitel olarak anlatılır. Resmî model/üretim tesisi karbon ayak izi, şarj elektriğine ilişkin operasyonel emisyonlardan ayrılır. Kullanım fazının genel kapsam istisnası ihtiyatlı ifade edilir; farklı sınırlar tek toplam yapılmaz. Sembolik formül enerji × uygun tüketim noktası faktörüdür; tutarlı birimler açıklanır. Gerçek emisyon hesabı, örnek sayılar veya tasarruf/başarım iddiası yoktur. Ölçüm noktası, yıllık faktörlerin zaman bazlı optimizasyon sınırı ve ikinci yaşam değerlendirmesi açıklanır. On gerçek ölçüm/kaynak alanı boş bırakılır.

## Doğrulama

- Node 22.23.1 ile TypeScript, ESLint ve `npm run build` geçti. Vite sekiz HTML girişini (demo + yedi tanıtım sayfası) üretti. Veri hazırlama adımı mevcut sentetik veriyi güncel buldu, yeniden üretmedi.
- `sayfa-matrisi.json`: 360, 768, 1440 px × TR/EN × yedi sayfa = 42 doğrudan açılış. İstenen/gerçek genişlik eşit; yatay taşma yok; tek H1, doğru sayfa dili, yedi menü bağlantısı, aktif bağlantı ve eşleşen açıklama/OG metni mevcut.
- `teknik-sayfalar.json`: yeni iki sayfa × iki dil × üç genişlik = 12 durum. Projede 6 akış, 4 erişim önceliği, 5 yöntem, 5 yaşam döngüsü durumu, 6 pilot aşaması ve 4 boş bilgi alanı; karbonda 2 gösterge ve 10 boş bilgi alanı kontrol edildi. Form/girdi yok. İç bölüm hedefleri mevcut; kaynak bağlantıları yeni sekmede güvenli ilişki nitelikleriyle açılır.
- Yöntemler Enter, pasaport erişimi Space ile açıldı; tüm boyut/dil durumlarında iki bölüm de açıldı. Açık içerikte yatay taşma veya gizli taşmayla kesilme görülmedi.
- `dil-gecisleri.json`: dört EN/TR değişimi aynı sayfayı korudu; iki yenilemede Türkçe seçimi ve URL korundu.
- Mobil görünümde proje/pilot kartları, karbon uyarısı, sembolik formül, bilgi alanları ve kaynaklar görsel olarak incelendi. Proje bölüm bağlantısı pilot takvimine ulaştı.
- `tarayici-gunlugu.json`: yakalanan error/warn kaydı yok. Kaynak incelemesinde yeni sayfalar için demo veri/faktör yüklemesi bulunmadı.

Ekranlar: `proje-masaustu-tr.jpg`, `karbon-masaustu-tr.jpg`, `proje-mobil-en.jpg`, `karbon-mobil-tr.jpg`, `pilot-takvimi-mobil-en.jpg`, `karbon-yontem-mobil-tr.jpg`. Tam sayfa mobil görüntülerinde uzun içerik doğal olarak dikey kayar.

## İçerik bekleyen alanlar

`web/src/about/projectData.ts` içinde pilot başlangıcı, grup büyüklüğü, gerçek veri kapsamı, doğrulama sonuçları; karbon ölçüm noktası/dönemi/enerjisi, seçilen faktör/değer/yıl/bağlantı/kaynak-sürüm, hesaplanan operasyonel emisyon, ölçülmüş azaltım ve üretici/tedarikçi belgeleri boş durumdadır. Görünür değer “—”; erişilebilir açıklama bilginin henüz gelmediğini belirtir. Ekipten geldiğinde TR/EN ayrı doldurulur.

Gerçek veri paylaşımı, pilot uygulaması, model eğitimi, mevzuat uyum denetimi, ölçülmüş karbon hesabı veya yayın bu teslimin sonucu değildir. Faz 5–7 başlatılmadı. Önceki fazlardan beklenen kurum teyitleri, kişi bilgileri, logolar ve iletişim adresi hâlâ bekleniyor.
