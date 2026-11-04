# COP31 — Yazılım Çalışma Alanı

Başlangıç: 22 Ekim 2026. Durum: ilk çalışan sentetik demo `web/` altında kodlandı (bkz. `DURUM.md`); tam pipeline planı sürüyor.

**Yayın ve faz durumu — 4 Kasım 2026:** Güncel tanıtım [Vercel'de yayında](https://binbin-battery-intelligence.vercel.app/hakkimizda/); [mavi temalı demo](https://binbin-battery-intelligence.vercel.app/) aynı alan adının kökündedir. Kaynaklar GitHub `main` dalındadır. [Faz dosyası](WEB_SITESI_FAZ_PLANI.md), yedi fazın kod/arayüz kapsamında tamamlandığını açıklar; Faz 6 formu alıcı adres ve onaylı aydınlatma metni gelene kadar kapalıdır. Açık dış teslimler ve kabul işleri [yayın kontrol listesindedir](YAYIN_KONTROL_LISTESI.md). Son form ve kontrol değişiklikleri `claude/laughing-hawking-xsk5nj` dalındadır; `main`'e birleştirilince Vercel'de yayımlanır. [Yayın doğrulaması](incelemeler/yayin/INCELEME.md).

**Tasarım incelemeleri:** [Sabit inceleme kaydı](TASARIM_INCELEME_KAYDI.md), [HIG/apple-design ilk raporu](incelemeler/hig-apple-design/INCELEME.md), [özgünlük raporu](incelemeler/hig-apple-design/OZGUNLUK_INCELEMESI.md) ve [görsel sistem raporu](incelemeler/hig-apple-design/GORSEL_SISTEM_INCELEMESI.md). [Bağımsız kontroldeki](incelemeler/tasarim-bagimsiz-kontrol/INCELEME.md) hash yan etkisi giderildi; özet/ayrıntı ve stil düzenlemeleri [son kontrol kaydında](incelemeler/son-duzeltmeler/INCELEME.md). Gerçek cihaz/ekran okuyucu kabulü ve dış teslimler açık.

Hedef, Excalidraw pipeline’ının tamamını, teklif dosyasındaki bakım öncelik listesi ve batarya operasyon panelini referans alan çalışan yazılıma dönüştürmektir. Panel verisi sentetik üretim ve hesaplama hattından gelir.

**Tam pipeline hedefi korunur.** 23 Ekim BinBin görüşmesinde sentetik veri ve açıklanabilir kurallarla çalışan ürün prototipi hedeflenir; ML eğitimi ve QR gerekli değildir. Gerçek saha ML çalışması, BinBin verisi ve doğrulamasıyla sonraki adımdır. Diğer ekranların sunulabilirliği mevcut kod ve süre üzerinden değerlendirilir. Eski takvim, kişi eşleşmeleri ve teknoloji seçimleri bağlayıcı değildir.

## İlk demoyu çalıştırma (`web/`)

Arkadaşına kaynak kodu göndermek ve sıfırdan kurmak için adım adım yönerge: [KURULUM.txt](KURULUM.txt).

Paylaşım için seçilen ortam: **Node 22.23.1 + npm 10.9.8**. Node sürümü `web/.nvmrc` ve `web/.node-version` içinde kayıtlıdır. Bağımlılıklar `package-lock.json` ve `npm ci` ile kurulur. Uygulama daha geniş Node aralığını desteklese de aynı ortamla kurulum için bu sürüm kullanılır.

```bash
cd web
npm ci                # bağımlılıklar (package-lock.json)
npm run data          # 500 batarya × 30 gün × 7 senaryo JSON verisini public/data içine üretir
npm run dev           # geliştirme sunucusu (başlamadan önce veri yoksa otomatik üretilir)
npm run build         # tip kontrolü + üretim derlemesi (veri yoksa otomatik üretilir) → dist/
npm run preview       # dist/ çıktısını http://localhost:4173 adresinde sunar
npm run verify:data   # veri kontrolleri (önce npm run data)
npm run test:contact  # iletişim formu doğrulama ve sunucu fonksiyonu testleri
npm test              # tüm testler
npm run typecheck     # tsc -b
npm run lint          # eslint
```

**Paylaşılabilir görünüm ve pasaport bağlantısı:** Demo seçili görünümü adrese yazar: `?battery=BT-10087&scenario=temp-drift&day=20&tab=passport` (varsayılan değerler yazılmaz, `lang` korunur). Pasaport sekmesinin altında bu görünümü açan adres, QR ve kopyala düğmesi vardır; yerel kopyada da yayındaki adresi üretir. Filoda olmayan kimlik açıklayıcı bildirimle varsayılan bataryaya döner. Kurallar `web/shared/view.ts`, kimlik listesi `web/shared/config.ts` → `batteryIds()` içindedir. Bilinmeyen adresler için iki dilli `web/public/404.html` kullanılır. İçerik/izin/teslim durumu: [YAYIN_KONTROL_LISTESI.md](YAYIN_KONTROL_LISTESI.md).

Üst çubuktaki **Guided demo / Demo rehberi** düğmesi ziyaretçiye yönelik 8 adımlık deneyimi açar. Her adım ilgili senaryo, gün ve bataryayı kurar; neye bakılacağını ve neyin denenebileceğini açıklar (← → ile ilerler, Esc kapatır). SOH, SOC ve ΔV gibi kavramlar ayrıca açılır gösterge rehberinde açıklanır.

**Stant / QR:** Üst çubuktaki **Project & team / Proje ve ekip** bağlantısı doğrudan tanıtım sayfasını açar. Büyük QR, alt kısımdaki ayrı **Share project QR / Proje QR’ını paylaş** düğmesindedir; küçük QR da sayfanın altında durur. QR, ayrı derlenen `/hakkimizda/` tanıtım sayfasını açar. Broşürle aynı petrol yeşili/bordo/lime kimliğini kullanan sayfa İngilizce açılır; üstteki EN/TR seçimiyle Türkçeye geçilir. Akış: broşür/poster → QR → proje ve ekip tanıtımı → demo. Adres korunduğu için basılı QR değişmez. Uygulama localhost'tan açılsa bile QR yayındaki adrese gider.

Ekip isimleri (`PROJECT_TEAM`), akademik koordinatör (`ACADEMIC_COORDINATOR`), form ayarı (`CONTACT_FORM`) ve yayın adresi (`SITE_URL`) **`web/src/site.ts`** içindedir. Projenin ortak e-posta adresi yoktur. Tanıtımın metinleri `web/src/about/content/` altındadır. Tanıtım stilleri `web/src/about/site.css` ve `contact-form.css` dosyalarındadır. Demo panelinin teması ayrı tutulur.

Ana sayfada kısa ekip özeti bulunur; tam profiller `/hakkimizda/ekip/` sayfasındadır. Sıra Gizem, Gamze, Erhan, Yusuf, Ahmed ve ardından akademik koordinatördür. Her isim kendi satırında genişleyen bir profil açar; pencere veya yeni sayfa açılmaz. `PROJECT_TEAM` ve `COORDINATOR_PROFILE` kayıtlarındaki `role`, `workPackage`, `contribution` ve `bio` alanları `en` / `tr` olarak doldurulabilir; `photo`, `photoCredit` ve `links` isteğe bağlıdır. Boş alanlar gösterilmez. Bilgisi olmayan kişi yalnız adıyla listelenir. Demo bağlantısı ilk ekrandadır; altı adımlı önerilen sistem akışı ana sayfada görünürdür.

Veri tamamen sentetiktir (sabit seed `20261023`); aynı seed aynı içeriği üretir (`manifest.json` içindeki `contentHash`). Eşikler `web/shared/config.ts` içinde tek yerde durur ve üretici sınırı değildir. Üretilen `web/public/data/` git'e alınmaz.

## Sade tasarım ve metin kuralları (4 Kasım 2026)

Bu bölüm güncel düzenleme noktalarıdır. Aşağıdaki faz bölümleri geliştirme geçmişidir. Orada adı geçen `about.css`, `technical.css`, `projectData.ts`, `EmptyValue`, `TEAM_EMAIL` gibi dosya ve alanlar artık yoktur.

- **Görünüm:** Tek stil dosyası `web/src/about/site.css`. Bütün iç sayfalar başlık, açıklama ve iki sütunlu bölümlerden oluşur. Boş alan, “—”, “Hazırlanıyor” kartı ve tekrar eden sentetik veri notu kaldırıldı. Sentetik veri notu yalnız demo düğmesinin yanında durur.
- **Logolar:** `web/src/about/assets/logo-ostim-teknik.png` ve `logo-cop31.png`, COP31 broşür görselinden kırpıldı. Üniversite logosu üst bilgide ve Kurumlar sayfasında, COP31 logosu ana sayfada ve alt bilgide. Diğer kurum logoları `web/src/about/organizations.ts` → `ORGANIZATION_ASSETS` içine eklenir. Logo dosyası yoksa yer tutucu çizilmez.
- **İletişim:** Proje e-postası olmayacak. İletişim `/hakkimizda/iletisim/` formuyla yapılır.
- **Metinler:** Kullanıcıya görünen metinler kullanıcının üslup kılavuzuna göre yazıldı. Noktalı virgül ve iki nokta kullanılmaz. Cümleler tire ile bağlanmaz. Açıklama parantez içine sıkıştırılmaz. Türkçe yönergelerde “-iniz” emir kipi kullanılır. Kısa ve teknik yazılır. Aynı kurallar demo içindeki rehber, uyarı ve bakım önerisi metinlerine de uygulandı.
- **Metin dosyaları:** `content/tr.ts` ve `en.ts` (ortak, ana sayfa, ekip, kurumlar, iş birliği, form), `content/technical.tr.ts` ve `technical.en.ts` (proje, karbon), `content/demo.tr.ts` ve `demo.en.ts`.
- **Bakım önerileri:** Demo içindeki öneri cümleleri `web/shared/rules.ts` içindedir ve veri dosyalarına yazılır. Bu metinler değişince `DATA_VERSION` artırılır ve `npm run data` çalıştırılır. Şu anki sürüm 2.1.0.
- **Ekran görüntüleri:** `web/src/about/assets/demo/` altındaki sekiz görüntü kayıt betiğiyle demodan yeniden çekildi ([kayıt](incelemeler/sade-tasarim/INCELEME.md)).

## Web sitesi — Faz 1 (4 Kasım 2026)

Tanıtım sitesi yedi doğrudan açılabilir HTML adresine sahiptir. Çalışan demo `/` adresindedir; basılı QR hedefi `/hakkimizda/` olarak kalır.

| Sayfa | Adres |
|---|---|
| Tanıtım ana sayfası | `/hakkimizda/` |
| Kurumsal yapı ve yöneticiler | `/hakkimizda/kurumlar/` |
| Proje ekibi | `/hakkimizda/ekip/` |
| Proje detayları | `/hakkimizda/proje/` |
| Demo ve sunum | `/hakkimizda/demo/` |
| Karbon etkisi | `/hakkimizda/karbon/` |
| İş birlikleri ve iletişim | `/hakkimizda/iletisim/` |

Faz 1 sonunda altı yeni sayfa iki dilli **Hazırlanıyor / In preparation** içeriği taşıyordu. Faz 2 ile ana sayfa ve ekip, Faz 3 ile kurumlar ve iş birlikleri/iletişim, Faz 4 ile proje ve karbon, Faz 5 ile demo/sunum taslakları hazırlandı. Sunum ve video dosyaları beklenir; gerçek form Faz 6 kapsamındadır. Tüm demo açılışları yeni sekmede, seçilen dille ve sentetik veri açıklamasıyla sunulur.

### Düzenleme noktaları

- `web/src/about/routes.ts`: sayfa kimliği ve adresleri; Vite aynı listeyi HTML girişleri için kullanır. Yeni adres eklenirse `web/hakkimizda/<adres>/index.html` dosyası da eklenmelidir.
- `web/src/about/content/en.ts` ve `tr.ts`: `common` ortak menü, sayfa başlık/açıklamaları, altbilgi ve durum metinleri; `home` mevcut ana sayfa metinleri. Ortak metinler `SiteCopy` tipiyle iki dilde denetlenir. HTML dosyalarındaki İngilizce başlangıç metaverileri de içerikle uyumlu tutulmalıdır.
- `web/src/about/components/SiteLayout.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`: ortak üstbilgi, menü, dil seçimi, metaveriler, içeriğe atlama ve altbilgi.
- `web/src/about/components/PageTemplate.tsx`: sonraki fazların başlık, açıklama ve içerik bölümleri için ortak şablonu. `SiteApp.tsx` içindeki ilgili sayfanın hazırlık alanı, gerçek sayfa bileşeniyle değiştirilir; mevcut dil altyapısı ve şablon korunur.
- `web/src/about/components/DemoAccess.tsx`: yeni sekmede demo bağlantısı, dil aktarımı ve bağlantıyla ilişkili sentetik veri açıklaması.
- `web/src/about/site.css`: ortak görsel kimlik, butonlar, menü, şablon ve altbilgi; `about.css` mevcut ana sayfa bölümleri.
- `web/src/site.ts`: altbilgide yalnız kurumsal proje adresi için `TEAM_EMAIL`; gerçek içerik düzenlendiğinde güncellenecek `SITE_CONTENT_UPDATED` (`YYYY-MM-DD`). Tarih ziyaretçinin saatinden üretilmez.

Proje e-postası henüz verilmedi: altbilgide Hazırlanıyor gösterilir ve boş e-posta bağlantısı oluşturulmaz. Yeni tanıtım üstbilgisinde kurum adı metin olarak kullanılır; logo izinlerinin durumu henüz belgelenmemiştir. Faz 1'in yerel olarak tamamlanması yayın izinlerinin veya diğer fazların tamamlandığı anlamına gelmez. Bu çalışma GitHub'a gönderilmedi ve Vercel'e yayımlanmadı.

Kontrol kaydı ve ekran görüntüleri: [Faz 1 incelemesi](incelemeler/faz-1/INCELEME.md).

## Web sitesi — Faz 2: ana sayfa ve ekip taslağı

Kullanıcının kararıyla bilinmeyen bilgiler sayfanın hazırlanmasını bekletmez. Eksik bilgiler etiketli boş alanlar olarak kalır; ekipten geldiğinde mevcut kayıtlara eklenir. Bu kural sonraki fazlarda da uygulanır. Tamamlanmış arayüz, gerçek içerik ve yayın izinlerinin tamamlandığı anlamına gelmez.

- Ana sayfa: proje adı, kısa tanıtım, mevcut aşama, sorun özeti, görünür altı adımlı önerilen sistem akışı, kısa ekip özeti, kurumlar, COP31 bağlamı ve beş sayfaya yönlendirme.
- Ekip: `web/src/about/TeamPage.tsx`; kişi/koordinatör profilleri satır içinde açılır. Her profilde rol, çalışma paketi, katkı, kısa tanıtım ve bağlantı alanları vardır. Ana sayfadaki kişi bağlantısı ekip sayfasında ilgili profili açar.
- İçerik: `web/src/about/content/en.ts` / `tr.ts` içindeki `home` ve `team`; biçim sözleşmeleri `content/types.ts` içinde. Kurum ve mevzuat kaynakları `web/src/about/sources.ts` içindedir.
- Kişiler: `web/src/site.ts`. Beş üyenin görev/katkı alanları bilinmediğinden boş bırakılmıştır. Koordinatörün brief'teki rolü ve sorumlulukları girilmiştir. Fotoğraf veya sosyal bağlantı uydurulmamıştır.
- Stiller: `about.css` ana sayfa, `team.css` ekip/profil, `site.css` ortak şablon.

Sonradan bilgi ekleme örneği (tırnakların içi kullanıcıdan gelen içerikle doldurulur):

```ts
{
  id: 'gizem',
  name: 'Gizem Geniş',
  role: { tr: '', en: '' },
  workPackage: { tr: '', en: '' },
  contribution: { tr: '', en: '' },
  bio: { tr: '', en: '' },
  links: [],
}
```

Bir dilde içerik eksikse o dilde boş alan gösterilir; diğer dilin metni otomatik olarak kopyalanmaz. Uzun açıklamalar satıra yayılır, sabit içerik yüksekliği yoktur. `links` etiketleri düz metin veya `{ tr, en }` olabilir; boş bağlantı gösterilmez. Kullanılacak fotoğrafın kaynak notu `photoCredit` içindedir.

Kontrol kaydı: [Faz 2 incelemesi](incelemeler/faz-2/INCELEME.md). GitHub'a gönderim ve Vercel yayını yapılmadı.

## Web sitesi — Faz 3: kurumlar ve iş birlikleri taslağı

`/hakkimizda/kurumlar/` ve `/hakkimizda/iletisim/` artık hazırlık kartları yerine iki dilli taslak sayfalardır. Bilinen brief bilgileri kullanılır; teyit bekleyen alanlar “—” olarak kalır.

- `web/src/about/InstitutionsPage.tsx`: kurum tanıtımları, kurumsal ilişki ve yönetici kartları. Tanıtım metinleri ana sayfayla aynı içerik kaydından alınır; farklı sayfalarda çelişen özetler tutulmaz.
- `web/src/about/CollaborationsPage.tsx`: BinBin ve Sustain Bridge bölümleri, kurumsal proje e-postası, `#collaboration-form` bölümü. Form hazır değildir; bu fazda herhangi bir başvuru veya veri toplanmaz.
- `web/src/about/organizations.ts` → `MANAGERS`: brief'teki dört taslak isim ve Ar-Ge/projeler sorumlusu kaydı. `role`, `institution`, `officialEmail` alanları ancak kurumdan doğrulandıktan sonra `confirmed: true` ile gösterilir. Bilinmeyen ad boş bırakılabilir. Kişisel telefon/e-posta eklenmez.
- Aynı dosyadaki `COLLABORATIONS`: BinBin `proposed`, Sustain Bridge `pending` durumundadır. `proposal` teklifin önerdiği yaklaşımı taşır. `approvedScope` ve `contribution`, gerçek onay alındığında `status: 'confirmed'` ile gösterilir. `officialWebsite` yalnız doğrulanmış resmî adresle doldurulur; sahte/boş bağlantı oluşturulmaz.
- `ORGANIZATION_ASSETS`: `foundation`, `university`, `binbin`, `sustainBridge` için logo kayıtları. `src`, iki dilli `alt`, `credit` ve yayın izni sonrasında `approved: true` girilir. İzin yokken görsel gösterilmez; logo alanı boş kalır.
- İletişim e-postası mevcut `web/src/site.ts` → `TEAM_EMAIL` alanından alınır; boşken e-posta bağlantısı yoktur.
- Metinler `content/en.ts` / `tr.ts` içindeki `organizations`; biçim sözleşmesi `content/types.ts`; sayfa stilleri `organizations.css` içindedir.

`status: 'confirmed'` veya `confirmed: true`, taslağı doldurmak için kullanılacak geçici değerler değildir; gerçek kurum/iş birliği teyidini temsil eder. Yayın onayları Faz 7'de ayrıca kaydedilecek. Kullanıcı gerçek bilgileri ilettiğinde bu kayıtlar güncellenecek.

Kontrol kaydı: [Faz 3 incelemesi](incelemeler/faz-3/INCELEME.md). GitHub'a gönderim veya canlı yayın yapılmadı.

## Web sitesi — Faz 4: proje detayları ve karbon taslağı

- `web/src/about/ProjectPage.tsx`: özet, amaç, örnek senaryo, mevcut ana sayfayla ortak altı adımlı akış, dört veri erişim önceliği, açılır planlanan yöntemler/pasaport erişimi ve göreli pilot takvimi.
- `web/src/about/CarbonPage.tsx`: beklenen etki uyarısı, resmî batarya ayak izi ile operasyonel şarj emisyonlarının ayrımı, sembolik formül, sınırlar, ikinci yaşam ve gerçek ölçüm alanları. Hesaplayıcı veya sayısal pilot sonucu yoktur.
- `web/src/about/content/technical.tr.ts` / `technical.en.ts`: iki dilde `project` ve `carbon` metinleri; biçim sözleşmeleri `content/types.ts`. Metinler ana dil dosyalarından yeniden dışa aktarılır.
- `web/src/about/projectData.ts`: `PILOT_INFORMATION` içindeki dört ve `CARBON_INFORMATION` içindeki on alan. Yalnız kullanıcıdan gelen gerçek bilgileri `{ tr: '...', en: '...' }` biçiminde ekleyin. Bir dilin değeri yoksa o dilde alan boş kalır. Boş alanların görünür değeri “—”, ekran okuyucu açıklaması bilgi durumudur. Demo faktörleri ve sentetik ölçümleri buraya kopyalamayın; sıfır değeriyle yer tutmayın.
- `web/src/about/components/InformationFields.tsx`: ortak bilgi alanları; `SourceLinks.tsx`: yeni sekmede açılan kaynak bağlantıları. Stiller `technical.css`, resmî URL'ler `sources.ts` içindedir.

Pilot takvimi teklifin göreli Faz 0–5 planıdır; web sitesi geliştirme fazlarından ayrıdır. Gerçek başlangıç, grup büyüklüğü, veri kapsamı, doğrulama sonuçları ve karbon ölçüm/faktör kayıtları henüz gelmedi. Güncel pasaport rehberiyle alan eşleştirmesi pilot Faz 0 işidir.

Kontrol kaydı: [Faz 4 incelemesi](incelemeler/faz-4/INCELEME.md). GitHub'a gönderim veya canlı yayın yapılmadı.

## Web sitesi — Faz 5: demo ve sunum taslağı

- `web/src/about/DemoPage.tsx`: ilk bölümde demo erişimi, beş adımlı kısa kullanım rehberi, üç ekran görüntüsü ve sunum/video alanları. Mevcut uygulama içi sekiz adımlı rehber ayrı kalır.
- `web/src/about/content/demo.tr.ts` / `demo.en.ts`: rehber, açıklama, alt metin, kaynak ve durum metinleri. `showcase.css` sayfa düzenidir.
- `web/src/about/assets/demo/`: iki dil × filo/telemetri/pasaport olmak üzere altı sıkıştırılmış gerçek demo ekranı (1425×990 JPEG). Demo arayüzü değişirse karşılık gelen iki dilin görselleri yeniden kaydedilir. `demoMedia.ts` içindeki `DEMO_SCREENSHOTS` bunları eşler; bileşendeki genişlik/yükseklik de yeni dosyaya uymalıdır.
- `web/src/about/demoMedia.ts` → `DEMO_MEDIA`: henüz boş. Sunum PDF'i ve video kullanıcıdan geldiğinde dil bazında eklenir. Bir dilin dosyası eksikse o dilde hazırlık kartı kalır. Başka araştırma/sunum dosyaları otomatik olarak bu teslim yerine kullanılmaz.

Yerel dosyaları `web/public/media/` içine ekleyip dil bazında aşağıdaki biçimde tanımlayın. Örnekteki yollar yalnız yapı örneğidir; mevcut dosyalar değildir:

```ts
tr: {
  presentation: { url: '/media/sunum-tr.pdf', fileName: 'BinBin-Sunum-TR.pdf' },
  video: { url: '/media/tanitim-tr.mp4', type: 'video/mp4', captions: '/media/tanitim-tr.vtt' },
},
```

Video alanı için aynı dilde WebVTT altyazı gerekir; `poster` isteğe bağlıdır. Boş URL veya eksik video/altyazı varsa hazırlık kartı kalır. PDF bağlantıları görüntüleme ve aynı kaynaktan indirme içindir; video kullanıcı kontrolüyle oynar ve sayfa açılırken indirilmez. Dosyalar eklendikten sonra telefon/tablet/masaüstünde gerçek görüntüleme, indirme, altyazı ve oynatma ayrıca doğrulanmalıdır.

Demo adı `site.ts` içindeki `PROJECT_NAME` ile başlıkta ve sekme adında kullanılır. `TopBar.tsx` kurumun metin kimliğini ve açık sentetik veri notunu gösterir; `index.css`, kullanıcının tercihiyle önceki lacivert/mavi temayı tanımlar. Tanıtımdaki demo ekranları da bu sürümden yenilendi; [tema kontrolü](incelemeler/mavi-demo/INCELEME.md). Hesaplama kuralları, veri seti, EN/TR, mobil Filo/Ayrıntı ve sekiz adımlı rehber korunur. Demo kökündeki `noindex` devam eder.

Kontrol kaydı: [Faz 5 incelemesi](incelemeler/faz-5/INCELEME.md). GitHub'a gönderim veya canlı yayın yapılmadı.

## Web sitesi — Faz 6: iletişim formu

- `web/src/about/components/ContactForm.tsx`: `/hakkimizda/iletisim/#collaboration-form` formu; metinler `content/tr.ts` / `en.ts` → `collaborations.form`, stiller `contact-form.css`.
- `web/api/contact.ts`: Vercel fonksiyonu (`/api/contact`) ve tarayıcıyla ortak `validateContact` kuralları. Resend HTTP API'siyle e-posta gönderir; ek paket yoktur.
- Ortam değişkenleri (Vercel → Settings → Environment Variables): `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `RESEND_API_KEY`. Eksikse fonksiyon 503 döner.
- `web/src/site.ts` → `CONTACT_FORM`: `enabled` ve dil bazında `privacyNoticeUrl`. İkisi de hazır olmadan form görünür ama kapalıdır. Açma adımları ve test gönderimi: [Faz 6 kaydı](incelemeler/faz-6/INCELEME.md).
- Yerel `npm run dev`/`preview` `/api` fonksiyonunu çalıştırmaz; fonksiyon testleri `npm run test:contact` ile, gerçek gönderim Vercel'de yapılır.

## Dosyalar

- [İlk demo için teknoloji ve kapsam kararları](DEMO_KARARLARI.md)
- [Mevcut başlangıç durumuna göre hazırlanmış ilk Claude Code görevi](ILK_GELISTIRME_PROMPTU.md)
- [Sekiz aşamalı tam pipeline planı ve kabul ölçütleri](MVP_PLANI.md)
- [Kod inceleme ve Claude Code ile çalışma düzeni](CALISMA_DUZENI.md)
- [Mevcut durum ve açık kararlar](DURUM.md)
- [Yayın kontrol listesi: içerik, izin ve teslim durumu](YAYIN_KONTROL_LISTESI.md)

## Çalışma ilkesi

Kullanıcı geliştirmeyi Claude Code ile yürütür. ChatGPT kodu/çalışan sonucu inceler, sonraki işi belirler ve o duruma göre Claude Code promptunu hazırlar. Önceden hazırlanmış prompt dizisi yoktur. Kullanıcı ayrıca istemedikçe ChatGPT uygulama kodu yazmaz/değiştirmez.

Aşamalar hedef ve kontrol noktalarıdır. Dosya yapısı, bileşen listesi ve uygulama görevleri mevcut kod incelendikten sonra belirlenir.

İlk demo kararı: `web/` altında React/TypeScript/Vite, Tailwind, Recharts ve Node üzerinde TypeScript veri üretimi. Veri tamamen sentetik olacak; açık deney verisi entegrasyonu iddiası taşımayacak. Klasörde uygulama bulunmadığı kontrol edilerek yalnız ilk görev hazırlandı. Sonraki görevler önceden yazılmadı.

## Kaynaklar

- [Excalidraw pipeline](https://excalidraw.com/#room=3c0185e193c2d35e7bc6,TXfL4zOBQqwim3RwzyoqVw)
- [BinBin teklifi — arayüz referansı 10. sayfa](../BinBin_Proje_Teklifi.pdf)
- [Önceki mimari](../docs/cop31-demo-plan/architecture.md)
- [Önceki veri sözlüğü](../docs/cop31-demo-plan/data-dictionary.md)

Kaynak dosyalar değiştirilmemiştir. Yeni çalışma için kapsam ve aşamalar bu klasörde izlenir.

## Demo dili ve mobil kullanım

Demo ve tanıtım sayfası EN/TR dil seçimini paylaşır. İlk ziyaret varsayılanı İngilizcedir; `?lang=en` / `?lang=tr` açık seçimi önceliklidir, son seçim mümkünse tarayıcıda saklanır. İki sayfanın geçiş bağlantıları seçilen dili taşır. Tarihler, sayılar, yüzdeler, senaryolar, durumlar, bakım gerekçeleri, grafikler, pasaport, rehber ve hata durumları yerelleştirilmiştir. Veri setinin hesapları ve seed/sürümü değişmemiştir; İngilizce açıklamalar aynı kural değerlendirmesinden üretilir.

1280 px altında Filo ve Batarya ayrıntısı görünümleri ayrı gösterilir. Başlangıç Filo’dur; batarya veya senaryo seçimi Ayrıntı’ya geçirir. Filoya dönüş arama, filtre ve sayfayı korur. Masaüstünde iki sütun birlikte görünür.
