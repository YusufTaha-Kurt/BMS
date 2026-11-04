# GitHub gönderimi ve Vercel üretim yayını

4 Kasım 2026. Kullanıcı güncel sitenin GitHub'a gönderilmesini, Vercel'de çalışmasını ve faz dosyasının mevcut durumu açıklayarak GitHub'da güncel tutulmasını istedi.

## Kaynak ve yayın

- Depo/dal: [YusufTaha-Kurt/BMS — main](https://github.com/YusufTaha-Kurt/BMS/tree/main).
- Arayüz sürümü: [a31d0a5](https://github.com/YusufTaha-Kurt/BMS/commit/a31d0a589244e39b27e2b4107f505066f821b3b8). Faz 1–5, yeni tanıtım sayfaları, etkileşim düzeltmeleri, mavi demo ve inceleme kayıtları gönderildi. Sonraki belge commit'i yayın sonucunu ve bu kanıtları kaydeder; arayüzü değiştirmez.
- [Vercel dağıtımı](https://vercel.com/ytkurt06-3576s-projects/binbin-battery-intelligence/8ETxtiz4Azof5UiXnSo6iK8HtkUQ): GitHub `Vercel` durum denetimi **success**. Ardından ana üretim alan adında yeni arayüz ve varlıklar doğrudan doğrulandı.
- Tanıtım: [https://binbin-battery-intelligence.vercel.app/hakkimizda/](https://binbin-battery-intelligence.vercel.app/hakkimizda/).
- Demo: [https://binbin-battery-intelligence.vercel.app/](https://binbin-battery-intelligence.vercel.app/).
- Basılı QR hedefi ve mevcut adresler korundu. Veri dosyaları Vercel build sırasında üretildi; `node_modules`, `dist` ve üretilmiş `public/data` Git'e eklenmedi.

## Kontroller

- Gönderim öncesi son üretim derlemesi (TypeScript dâhil) geçmişti; lint ve 11 veri testi bu gönderim turunda tekrar geçti. Staged diff kontrolü temiz.
- [Canlı 32 yerleşim](canli-kontroller.json): sekiz adres × TR/EN × 390/1440px. Her durumda bir h1/main, doğru dil, yatay taşma yok; yüklenmiş görsellerde bozuk dosya saptanmadı.
- Matris veri yüklenmesini bekleyen bir test değildir: bazı ilk demo gözlemlerinde satırlar henüz yükleniyordu. [Ayrı canlı veri/etkileşim kontrolü](canli-akislar.json), ilk batarya düğmesi görünene kadar beklenerek yapıldı. Normal filoda 15 satır, seçili `BT-10087`; ardından `temp-drift` / `DEMO-001` / Telemetri ve beş grafik doğrulandı. Mavi zemin `rgb(10, 18, 36)`.
- Ekipte Gizem profili açıkken İçeriğe geç başka profil açmadı; odak main'e taşındı. Dil EN'e geçince demo bağlantısı yeni sekmede `?lang=en` ile açıldı ve veriler yüklendi.
- [Canlı konsol](tarayici-gunlugu.json): yakalanan error/warn yok.
- Ekranlar: [canlı ana sayfa](canli-ana-sayfa.png), [canlı mavi demo](canli-demo.png).

## Faz dosyasında korunan açık işler

Faz 1–5, bilinmeyen içerikleri boş bırakma kararıyla arayüz kapsamında hazır. Gerçek ekip/kurum/pilot/karbon içerikleri, e-posta, izin/teyitler ve PDF/video teslimleri bekler. Faz 6 formu arkadaşına bırakılmıştır; başvuru alınmaz. Faz 7'nin üretim yayını ve temel canlı kontrolleri yapıldı; gerçek cihaz/OS Reduce Motion/ekran okuyucu ve kalan dosya/form/içerik kabulü tamamlanmadığından kutusu açık tutuldu. Yayın, bu eksiklerin tamamlandığına dair kabul değildir.
