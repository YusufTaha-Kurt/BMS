# İlk Demo — Kod ve Yerel Tarayıcı İncelemesi

Tarih: 22 Ekim 2026. İncelenen uygulama: `yazılım/web/`. Yerel üretim önizlemesi: http://localhost:4173/.

## Sonuç

Ana gösterim akışı çalışıyor. Veri gerçekten sentetik telemetriden üretiliyor; panel sonuçları kurallarla hesaplanıyor. Normal kullanımda gösterimi durduran bir hata gözlenmedi. Sunum öncesinde iki sınırlı düzeltme öneriliyor: dar ekranda operasyon panelinin görünürlüğü ve JSON veri sözleşmesinin çalışma anında doğrulanması.

Uygulama kaynak kodu değiştirilmedi. İnceleme sırasında testler/derleme çalıştırıldı; aşağıdaki rapor, ekran görüntüleri ve sonraki düzeltme görevi kaydedildi.

## Bulgular

### P2 — Dar ekranda senaryo sonucu ilk görünümde kayboluyor

Konum: `web/src/App.tsx:59–69` ve `web/src/App.tsx:106`.

İki sütun yalnız `xl` genişliğinde açılıyor. 1100×900 testinde senaryo seçildiğinde detay paneli ekranın yaklaşık 1378. pikselinde başlıyor; ilk görünümde yalnız liste var. 390×844 testinde başlangıç panel başlığı yaklaşık 2355. pikseldeydi. Liste satırına tıklamak paneli kaydırıyor fakat senaryo seçimi aynı görünürlüğü sağlamıyor.

Sonuç: Sunum sırasında “Sıcaklık sapması” seçildiğinde değişen batarya/uyarı/aksiyon görünür olmuyor; panelin çalıştığını göstermek için uzun kaydırma gerekiyor. 1440×900 düzeninde iki panel birlikte görünür ve kullanılabilir.

Beklenti: Tablet/küçük laptopta liste ve sonucu birlikte kullanılabilir tutmak; tek sütunda senaryo hedefini ve sonucunu görünür yapmak. Liste yüksekliği/ayrıntı sırası veya senaryo sonrası yönlendirme sade biçimde düzenlenebilir. Bütün bataryalara erişim ve üst kontrollere dönüş korunmalı.

Kanıt: [1100 piksel testi](dar-ekran.png), [1440 piksel testi](masaustu-sicaklik.png).

### P2 — Geçerli JSON içindeki yanlış şema yakalanmıyor

Konum: `web/src/lib/loadJson.ts:29–30`; doğrudan etkisi `web/src/App.tsx:23–24`.

Yükleyici JSON’un sözdizimini kontrol ediyor, fakat `as T` dönüşümü gerçek alan doğrulaması yapmıyor. İzole testte manifest cevabı `{}` olduğunda yükleyici bunu başarılı kabul etti. App’in `showcaseIds.includes` erişimi `Cannot read properties of undefined (reading 'includes')` hatası üretiyor. Bu durumda amaçlanan veri hatası ekranı yerine render hatası oluşabilir.

Ayrıca senaryo/gün/kimlik uyuşmazlığı başarılı dosyayı sürekli `loading` durumuna çeviriyor; istek bitmiş olsa da açıklayıcı hata/retry görünmüyor. Manifest/paket seed ve sürümleri okuyucuda karşılaştırılmadığından farklı paketlerin karışması da engellenmiyor.

Beklenti: Manifest, filo, geçmiş ve detay için gerekli alanların/tiplerin ve beklenen kimlik/senaryo/gün/seed/sürümün hafif çalışma anı doğrulaması. Yanlış paket anlaşılır, yeniden denemeye izin veren hata üretmeli. Başka bir paketin değerleriyle mevcut ekran birleştirilmemeli.

Not: Mevcut üretilmiş dosyalarda bu bozukluk bulunmadı. Bu bulgu hata kurtarma davranışına ilişkindir; normal senaryo testinde çökme gözlenmedi. Yanlış şema örneği yükleyiciye verilen izole yanıtla doğrulandı; ana sunucudaki dosyalar değiştirilmedi.

## Yapılan kontroller

| Kontrol | Sonuç |
|---|---|
| Dokuz veri testi | 9/9 geçti |
| Lint | Geçti |
| TypeScript kontrolü | Geçti |
| Üretim derlemesi | Geçti; yaklaşık 612 kB JS / 183 kB gzip |
| Bağımsız sayısal kontrol | 720 detay dosyasında sıcaklık/ΔV tepe ve ortalamaları, SOC ortalaması özetlerle eşleşti; en büyük yuvarlama farkı 0,0528 |
| Isınma senaryosu | 8. gün DEMO-001: 48,3 °C / Dikkat; 14. gün: 65,8 °C / Kritik |
| Olay öncesi | Isınma senaryosu 7. gün: normal durum |
| Dengesizlik | DEMO-002 seçildi; 8. gün uyarı, 14. gün kritik |
| Veri kaybı | DEMO-003, 8. gün: %66 kapsam; veri incelemesi ve bağlantı inceleme aksiyonu |
| Baseline karşılaştırması | Aynı gün/batarya; sıcaklık örneğinde 48,3 / 32,2 °C ve +16,1 °C fark |
| Arama ve vitrin dışı kayıt | BT-10050 bulundu, doğru panel açıldı; ayrıntının yayımlanmadığı açıklandı |
| Boş sonuç ve filtreler | Açıklayıcı sonuç yok durumu, filtre temizleme ve sıfırlama çalıştı |
| Hızlı senaryo değişimi | Son seçimle eşleşen batarya/gün/değerler görüldü |
| Son gün sınırı | 30. günde sonraki gün kapalı |
| 390 piksel dar ekran | Yatay sayfa taşması yok; panel görünürlüğü yukarıdaki bulgu |
| Tarayıcı günlükleri | İncelenen oturumda error/warn kaydı yok |

Derleme notu: `npm run build` ilk denemede inceleme ortamının tsx CLI yerel IPC açma kısıtı nedeniyle durdu. Aynı adımlar IPC gerektirmeyen girişle yürütüldü: `node --import tsx scripts/ensure-data.ts`, `node node_modules/typescript/bin/tsc -b`, `node node_modules/vite/bin/vite.js build`; hepsi geçti. Bu ortam engeli uygulama derleme hatası olarak değerlendirilmedi.

## Bu incelemenin sınırları

- Temiz makinede `npm ci` kurulumu yapılmadı.
- İnternet fiziksel olarak kapatılıp önbellek boş soğuk başlangıç testi yapılmadı. Yerel üretim önizlemesi ziyaret edildi.
- Eksik dosya/ağ kesintisi için tarayıcıda yeni hata enjeksiyonu yapılmadı; önceki uygulayıcı raporu bu incelemenin kanıtı sayılmadı.
- Tam erişilebilirlik denetimi, gerçek cihaz/tablet donanımı ve çevrimiçi yayın testi yapılmadı.
- ML, gerçek BinBin verisi, QR ve pasaport bu ilk demonun kapsamı dışında.

Sonraki iş: Yeni özellik eklemeden bu iki bulguyu düzeltip aynı akışı yeniden kontrol etmek. Mevcut veri üretimi ve ana ekran tasarımı korunabilir.
