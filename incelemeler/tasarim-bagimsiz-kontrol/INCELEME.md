# Tasarım güncellemesinin bağımsız kontrolü ve faz karşılaştırması

4 Kasım 2026. Kullanıcı, başka bir chatte yapılan güncellemelerin kontrolünü ve web sitesi fazlarıyla karşılaştırılmasını istedi. Ürün kaynakları bu incelemede değiştirilmedi; yalnız inceleme kanıtları ve takip kaydı güncellendi. Commit, push veya yayın yapılmadı.

## Sonuç

Güncelleme, önceki önerilerin önemli bölümünü gerçek kod ve ekranlara taşımış. Metin düzenlemesinden ibaret değil: ortak renk/eylem rolleri, fontlar, süreç/listeler, boş alanlar, ana görsel ve demo klavye/odak davranışları değişmiş. Çalışan yerel sürüm ve üretim derlemesi kontrol edildi.

Tam kabul verilmemeli: genel hash işlemesinde açılır alanları istemeden açan bir yan etki var; uzun sayfalardaki okuma yükü sürüyor; gerçek cihaz/ekran okuyucu kontrolleri ve dış içerik/izin teslimleri açık. Faz 1–5 kullanıcının boş alanlı taslak kapsamıyla hazır; Faz 6 bekliyor; Faz 7 kısmen yapılmış, tamamlanmamış.

## Doğrulananlar

- Node 22.23.1 ile `npm run typecheck --prefix web`, `npm run lint --prefix web`, `npm run build --prefix web` geçti.
- `web/` altında `node --import tsx --test scripts/verify-data.test.ts`: 11/11 geçti. Üretim öncesi veri güncel bulundu, yeniden üretim atlandı. İlk build denemesindeki tsx IPC sandbox kısıtı gerekli yerel izinle çalıştırılarak aşıldı.
- [Yerleşim](yerlesim.json): yedi tanıtım sayfası × TR/EN × 320/768/1440 px = 42 durum; demo kökü aynı iki dil/üç genişlikte 6 durum. Yatay taşma yok, bir h1 ve bir main var. Tanıtımda eksik alt özniteliği, bulunan yerel hash hedefi hatası veya dış bağlantıda eksik `_blank` saptanmadı. Bu, bütün dış bağlantıların uzaktaki içeriğine tek tek erişildiği anlamına gelmez; lazy görsellerin tamamının yüklenmesini de tek başına kanıtlamaz.
- [Ek 360px ölçümü](mobil-360.json): yedi TR sayfası, yatay taşma yok. Toplam 55 sayfa/dil/genişlik durumu kontrol edildi.
- [Etkileşim](etkilesim.json): 390×844 mobil ayrıntı açılışı `panel-title` odağı; filoya dönüşte aynı batarya düğmesi ve arama korunur. Sekme sağ oku Telemetri'yi, End Pasaport'u açar. Profil dil geçişi yolu/hash'i ve açık profili korur; Gamze açılınca Gizem kapanır. Menü Escape ile kapanıp tetikleyiciye döner. Rehber açılış odağı kendi bölgesindedir; grafik sağ oku rehberi 2/8'de bırakır; grafikten Escape sonrası rehber kapanır ve odak `guide-trigger` olur.
- Pilot bölümüne doğrudan TR adresi hedefi yaklaşık 48px üst boşlukla açtı. Genel hash yan etkisi aşağıda ayrıca kayıtlıdır.
- [Tarayıcı günlüğü](tarayici-gunlugu.json): bu oturumda yakalanan error/warn yok.

Gerçek cihaz, OS Reduce Motion açık durumu, VoiceOver/NVDA/TalkBack, yüzde 200 büyütme, farklı tarayıcı motorları, gerçek PDF/video dosyaları, form gönderimi ve canlı yayın bu turda doğrulanmadı. Önceki uygulama raporundaki 80/32 durumluk kontroller bu bağımsız incelemenin kendi test sayısına eklenmedi.

## Öncelikli bulgu — UX-06 takip, P2

**Genel hedefe gitmek, hedef içindeki bütün açılır alanları açıyor.**

Kaynak: `web/src/about/components/SiteLayout.tsx:28` içindeki `target.querySelectorAll('details').forEach(...)`. Yeni hash çözümü, doğrudan teknik bölüm bağlantısında yararlı; `#main` veya `#top` gibi genel kapsayıcılarda fazla geniş çalışıyor.

Tekrar üretim:

1. `/hakkimizda/ekip/?lang=tr` açılır; tüm profiller kapalıdır.
2. “İçeriğe geç” bağlantısı klavyeyle etkinleştirilir.
3. Hash `#main`, odak `main` olur; kullanıcı seçmediği hâlde koordinatör profili açılır. Aynı `name` grubundaki profiller sırayla açıldığı için sonuncu açık kalır.
4. `/hakkimizda/proje/?lang=tr` üzerinde aynı işlem, kapalı “Planlanan analiz yöntemleri” ve “Planlanan erişim ayrımı” alanlarını birlikte açar. “Başa dön” hedefi `#top` da aynı geniş kapsama girer.

[DOM sonuçları](etkilesim.json), [istenmeden açılan profil](istenmeden-acilan-profil.png).

**Beklenen:** Genel gezinme bağlantıları açılır alanların durumunu değiştirmemeli. Yalnız doğrudan hedeflenen details, hedefin açılması gereken ataları veya belirli teknik bölümün ilişkili disclosure'ı açılmalı. Pilot/yöntem/profil doğrudan adresleri korunarak `#main`, `#top`, geri/ileri ve dil değişimi tekrar test edilmeli. Düzeltme uygulanmadı; UX-06 tam kapanmış sayılmadı.

## Tasarım değerlendirmesi

| Alan | Değişiklik ve değerlendirme |
| --- | --- |
| Renk | Parlak petrol/lime vitrin yerine kâğıt/mürekkep/bordo; ana eylem daha belirgin. Demo koyu ve okunur kalmış, seçili vurgu pembe. Rollerin ayrılması olumlu. |
| Tipografi | Tanıtımda Georgia başlık + sistem sans, demoda Inter. Kalın/sıkışık başlık sorunu azalmış. Georgia araştırma/yayın karakteri veriyor; bunun projeye en uygun son seçim olduğu kullanıcı tercihi olmadan söylenemez. |
| Bileşenler | Kartların yerine bağlı süreç, sıralı erişim, yöntem karşılaştırması, zaman çizelgesi ve çerçevesiz bilgi alanları gelmiş. Her kartı kaldırmak yerine karşılaştırılabilir bazı bloklar korunmuş. |
| Eylemler | Birincil bordo, ikincil altı çizili metin; dil seçimi alt çizgi. Ana sayfa ve demo tanıtımında üst demo tekrarı kaldırılmış. 390px ilk ekranda ana eylem görünür. |
| Özgün malzeme | Genel batarya çizimi yerine mevcut DEMO-001 ayrıntısı; mobilde de görünür. Sentetik/kaynak açıklamaları korunmuş. Küçük ekranda görüntüdeki kontroller hâlâ yoğun; bu görsel tek bakışta okunacak bir sonuçtan çok demoyu gösteren kanıt gibi çalışıyor. |
| Kompozisyon | Daha sakin ve daha az kutulu. İç sayfalarda uzun metin ve ayırıcı çizgiler hâlâ baskın; görsel ritim/bilgi yoğunluğu son değerlendirmeye açık. |

Bu nedenle OZ/GS maddelerinin **uygulamaya yansıdığı** kabul edilebilir; her birinin estetik bakımdan kesin kapandığı veya “AI hissinin tamamen yok olduğu” söylenemez. Bu bir kullanıcı araştırması değil, ekran/kod incelemesidir.

## UX-09 — erişim iyileşti, okuma maliyeti tamamen çözülmedi

Erken bölüm erişimi ve Başa dön bağlantısı yararlı. Ancak metin büyümesi ve mobil görselin eklenmesiyle sayfaların çoğu daha uzun. 360×900 TR, kapalı başlangıç durumları:

| Sayfa | İlk inceleme | Güncel kontrol |
| --- | ---: | ---: |
| Ana sayfa | 5728px | 6305px |
| Kurumlar | 4023px | 3954px |
| Ekip | 1429px | 1639px |
| Proje | 9318px | 9657px |
| Demo tanıtımı | 5302px | 6142px |
| Karbon | 5582px | 6526px |
| İletişim | 2638px | 3080px |

Uzunluk tek başına hata değildir; daha okunabilir metin kazanımı korunmalı. Ancak brief'in kısa ana sayfa hedefi ve UX-09 açısından işin tamamen bittiği söylenmemeli. Tekrarlar, özet/ayrıntı ayrımı ve bölüm ritmi içerik kaybetmeden yeniden ele alınabilir. UX-09 bu bağımsız değerlendirmede **kısmi** kabul edildi.

## Kodun bakımı

`technical.css`, `organizations.css` ve `showcase.css` içinde eski tanımların altına yeni görünüm kuralları eklenmiş. Örneğin `.tech-card` önce kutu olarak, sonrasında tekrar çerçevesiz tanımlanıyor. Bu çalışan bir CSS düzenidir; derleme hatası değil. Ancak önceki breakpoint kararlarını anlamayı güçleştirir. İleride aynı seçicilere ait kuralları birleştirmek ve yeni rolüyle uyuşmayan `--lime` / `button-lime` adlarını düzenlemek yararlı olur. Bu temizlik bu turda yapılmadı.

## Faz planı ve brief karşılaştırması

Dayanak: `WEB_SITESI_FAZ_PLANI.md` ve özgün `COP31_Web_Sitesi_Brief_BinBin.pdf` s. 2–12 bu turda tekrar okundu. Buradaki fazlar web sitesi Faz 1–7'dir; proje sayfasındaki pilot Faz 0–5 takvimiyle karıştırılmamalıdır.

| Faz | Hazır olan | Eksik / kabul durumu |
| --- | --- | --- |
| 1 — Ortak düzen | Yedi adres, ortak üstbilgi/altbilgi, mobil menü, dil geçişi, ortak tasarım sistemi, QR/demo yolları. | Yerel uygulama hazır. Genel hash yan etkisi düzeltilmeli. Gerçek proje e-postası bekliyor. |
| 2 — Ana sayfa ve ekip | Proje/sorun/çözüm/akış/kurum/COP31 özetleri, yönlendirmeler, beş üye + koordinatör, satır içinde profiller. | Boş alanlı taslak kapsamı hazır. Rol/çalışma paketi/katkı/biyografi ve varsa izinli görseller bekliyor. Ana sayfa hâlâ uzun. |
| 3 — Kurumlar ve iş birlikleri | İki kurum, ilişki/resmî siteler, taslak yönetici kayıtları, BinBin önerilen pilot/Sustain Bridge alanları, iletişim iskeleti. | Boş alanlı taslak kapsamı hazır. Yönetici teyitleri, resmî iletişim, onaylı kapsam/katkılar ve logo izinleri bekliyor. Gerçek başvuru yok. |
| 4 — Proje ve karbon | Sade özet, senaryo, altı adımlı akış, dört erişim önceliği, aday yöntem/koşullar, pasaport ayrımları, pilot takvimi; karbon zorunlu uyarısı, iki gösterge, formül, sınırlar, ikinci yaşam, kaynaklar. | Boş alanlı taslak kapsamı hazır. Dört pilot ve on karbon alanı boş; bu kullanıcı kararıyla uyumlu. Gerçek ölçüm yok. Sonuç/başarım uydurulmamış. |
| 5 — Demo ve sunum | Yeni sekmede demo, beş adımlı anlatım, her dilde üç ekran + ana görsel, sentetik etiketleri, isim/kimlik, mevcut demo akışları. | Arayüz hazır. `DEMO_MEDIA = {}`; sunum PDF'i/video teslim edilmedi, gerçek dosya açılış/indirme/oynatma kabulü yapılamaz. Video hazırlık durumu brief'te izin verilen yaklaşımdır. |
| 6 — Form | Hazırlık bölümü var. | Kullanıcı arkadaşına bıraktı. Alanlar, gönderim, alıcı, kurum onaylı aydınlatma, spam koruması ve gerçek test gönderimi uygulanmamış. Faz tamamlanmadı. |
| 7 — Kontrol ve yayın | Önemli yerel yerleşim/etkileşim testleri, derleme/lint/tip/veri kontrolleri, README ve ayrı TR/EN kaynakları mevcut. | Kısmi. Yeni yan etki, gerçek cihaz/yardımcı teknoloji, tüm dış bağlantılar ve dosyalar, form kabulü, yazılı izin/teyit listesi, doldurulmuş nihai kontrol listesi ve güncel sürümün yayın doğrulaması açık. |

Faz 1–5 kutuları kullanıcının **bilgileri boş bırakarak arayüzü hazırlama** kararıyla anlamlıdır. Bunlardan sitenin gerçek içerikler ve yayın izinleriyle bitmiş olduğu sonucu çıkarılamaz. İzinlerin alınmadığına dair dış dünyaya ilişkin iddia yapılmıyor; bu çalışma alanında tamamlandıklarını doğrulayacak teslim kaydı yok. Güncel sürümün yayına alındığı da bu incelemede saptanmadı.

## Takip

- UX-06: doğrudan hedef sorunu düzeldi, genel hedefteki yeni yan etki açık.
- UX-09: bölüm erişimi iyileşti; okuma yükü ve kısa ana sayfa hedefi kısmi.
- UX-05/10: uygulama mevcut; gerçek OS/yardımcı teknoloji doğrulamaları açık. UX-03 canlı duyuru da gerçek ekran okuyucu kabulüne dâhil edilmeli.
- Diğer sekiz UX maddesinin uygulaması ve kayıtlı testleri bu turdaki kod/örnek akışlarla tutarlı bulundu. Bu, bütün cihazlarda eksiksiz kabul anlamına gelmez.
- 16 OZ/GS önerisinin görünür değişiklikleri var; estetik kabul kullanıcı değerlendirmesine açık.

Ekranlar: [ana sayfa](ana-masaustu.png), [tam proje sayfası](proje-tam.png). Bu incelemede tasarım veya davranış düzeltmesi uygulanmadı.
