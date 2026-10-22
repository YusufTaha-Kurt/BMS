# İlk Çalışan Demo — Teknik Kararlar

Tarih: 22 Ekim 2026. Amaç: 23 Ekim BinBin görüşmesinde ürün fikrini çalışan bir panelle göstermek.

Bu kayıt ilk demonun uygulama kapsamıdır. Tam pipeline planı uzun vadeli hedef olarak korunur. Klasör incelendiğinde uygulama kodu bulunmadı; ilk geliştirme görevi bu başlangıç durumuna göre hazırlanmıştır. Sonraki görevler ancak çıkan kod incelendikten sonra belirlenecek.

## Teknoloji seçimi

| Alan | Seçim | Gerekçe |
|---|---|---|
| Arayüz | React + TypeScript + Vite | Etkileşimli tek sayfalı panel ve statik çıktı |
| Tasarım | Tailwind CSS | Ortak renk/boşluk düzeni ve farklı ekran boyutları |
| Grafik | Recharts | React içinde zaman serileri |
| İkon | Lucide React | Paketle birlikte gelen tutarlı ikonlar |
| Veri hazırlığı | Node üzerinde TypeScript betiği; gerekirse tsx | Aynı dil/ortam ve ortak veri tipleri |
| Veri dağıtımı | Yerel, önceden üretilmiş JSON | Tekrar üretilebilir gösterim; uygulama sunucusu gerektirmeyen veri okuma |
| Durum | React state | Bu ölçekte ek durum yönetimi altyapısına gerek yok |
| Paket yönetimi | npm ve lock dosyası | Çalıştırılabilir ortam ve bağımlılıkların sabitlenmesi |

22 Ekim’de Node v22.23.1 ve npm 10.9.8 görüldü. Resmî Vite belgesindeki Node alt sınırı bu ortamda karşılanıyor. Uyumlu kütüphane sürümleri kurulumda doğrulanıp lock dosyasına kaydedilecek.

Önceki Next.js/Python önerisinden bu ilk demo için ayrılıyoruz. Tek sayfalı, ML’siz ve yazma işlemi olmayan gösterim için Vite/Node yeterli. Sonraki Python veya gerçek veri hattı JSON sözleşmesini üreterek bağlanabilir; bu sözleşmenin korunması uyarlama işini azaltır, sıfır değişiklik garantisi değildir.

## İlk demonun işlevleri

- Referanstaki koyu renkli bakım öncelik listesi ve tek batarya operasyon paneli.
- 500 sanal batarya, 30 gün; normal/sıcaklık/dengesizlik/veri kaybı senaryoları.
- Kimlik arama, durum filtresi, bakım önceliğine göre sıralama ve sayfalama.
- Seçilen bataryanın kimliği, simüle SOH, SOC, sıcaklık, ΔV, veri kapsamı, neden ve aksiyonu.
- Gün/senaryo seçimi, aynı günün normal durumuyla karşılaştırma ve sıfırlama.
- Tüm bataryalarda günlük sağlık geçmişi; 6 vitrin bataryasında ayrıntılı telemetri grafikleri.
- Temiz başlangıç ve üretim derlemesinden yerel sunum.

Ana kullanıcı akışı: **Filoyu gör → sıcaklık/dengesizlik/veri kaybı seç → ilgili bataryayı incele → değişimin nedenini grafikte gör → temel durumla karşılaştır → sıfırla.**

Bu ilk görev ML, veritabanı, backend/API, giriş/rol, QR, ayrı pasaport veya karbon ekranı içermez. Uzun vadeli planın pasaport/karbon/yayın hedefleri bu kararla silinmez; ilk uygulama görevinin sınırı belirlenir.

## Veri ve hesaplama yaklaşımı

Bu demo **tamamen sentetik** veriye dayanır. Panasonic veya BinBin verisi kullanıldığı söylenmez. Kaynak deney profili entegrasyonu tam planda ayrıca korunur; ilk demoyu bekletmez.

Sabit seed ve sabit simülasyon başlangıcıyla telemetri üretilir. Günlük tepe/ortalama/veri kapsamı gibi özetler bu telemetriden hesaplanır. Sanal kapasiteden SOH, demo eşiklerinden bakım önceliği, neden ve önerilen aksiyon çıkarılır. Skor/aksiyonlar yalnız batarya kimliğine ya da senaryo adına bakılarak elle atanmaz.

Veri üretimi tarayıcıda her render sırasında yapılmaz. Bir betik JSON paketlerini önceden üretir; arayüz hazır dosyaları okur. Bütün ham filo telemetrisi tarayıcıya gönderilmez; günlük paketler ve yalnız vitrin ayrıntıları dağıtılır.

Görünen ibareler: **“Sentetik demo”**, **“Simüle SOH”**, **“Kural tabanlı değerlendirme”**. Model/arıza olasılığı veya RUL sonucu uydurulmaz. Veri kaybı ayrı inceleme durumu olur; null değer sıfır/sağlıklı diye gösterilmez.

## Çalışma alanı

Mevcut planlama dosyaları `yazılım/` içinde korunur. Uygulama `yazılım/web/` altında oluşturulur. Kalıcı görsel referans `referanslar/binbin-panel-referansi.png` dosyasındadır.

İlk uygulama promptu `ILK_GELISTIRME_PROMPTU.md` içindedir. Bu, şu an gözlenen boş uygulama durumuna ait tek görevdir; sonraki promptlar hazırlanmış değildir.

## Teknik dayanaklar

- [Vite başlangıç ve React/TypeScript desteği](https://vite.dev/guide/)
- [Vite statik çıktı ve yerel önizleme](https://vite.dev/guide/static-deploy.html)
- [Tailwind Vite kurulumu](https://tailwindcss.com/docs/installation/using-vite)
- [Recharts resmî deposu](https://github.com/recharts/recharts)

Vite’ın yerel preview sunucusu görüşmede derlemeyi kontrol etmek içindir; kalıcı çevrimiçi barındırma servisi değildir. Yayın gerekirse statik çıktı ayrıca barındırılır.
