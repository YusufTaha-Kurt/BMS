# Kod İnceleme ve Geliştirme Düzeni

## Roller

**Kullanıcı:** Hedefleri ve gösterim önceliklerini belirler; Claude Code ile geliştirmeyi yürütür ve görsel sonucu değerlendirir.

**Claude Code:** O tur için belirlenen işi uygular, ilgili kontrolleri çalıştırır ve değişikliklerin sonucunu raporlar.

**ChatGPT:** Mevcut kodu, değişiklikleri ve mümkünse çalışan arayüzü inceler. Mimari/veri hatalarını ve eksikleri belirler; sıradaki işi seçer. Kullanıcı ayrıca istemedikçe uygulama kodu yazmaz/değiştirmez.

## Bir geliştirme turu

1. **Mevcut durumu gör:** İlgili kod, son değişiklikler, çalıştırma/derleme sonucu ve varsa ekran incelenir. İlk turda uygulama yoksa bu açıkça başlangıç durumu kabul edilir.
2. **Bir sonraki işi seç:** Aktif aşamanın en önemli eksikliği ve kalan süre dikkate alınır. İş; somut, sınırlı ve sonucu kontrol edilebilir olmalıdır.
3. **Promptu o anda hazırla:** Claude Code’a gönderilecek mesaj, görülen kod ve seçilen işe göre yazılır. Kullanıcı bunu Claude Code’a iletir.
4. **Uygulamayı kontrol et:** Claude Code’un özeti ile gerçek değişiklikler karşılaştırılır; ilgili kod, kontroller ve görsel sonuç incelenir.
5. **Sonraki kararı ver:** Hata varsa düzeltme işi, yeterliyse sıradaki geliştirme işi belirlenir. Büyük kapsam veya mimari değişiklik varsa gerekçesi kaydedilir.

Önceden hazırlanmış aşama promptları veya her aşamayı tek seferde yaptıran bir prompt zinciri kullanılmaz. Aşama planı, eldeki koddan bağımsız bir uygulama emri değildir.

## İnceleme için kullanılacak kanıtlar

Kod aynı çalışma alanındaysa ChatGPT doğrudan dosyalardan inceleme yapar. Her dosyanın sohbete kopyalanması gerekmez. Farklı çalışma alanı kullanılıyorsa yalnız ilgili değişikliklerin ve çalıştırma çıktılarının erişilebilir olması gerekir.

Bir tur değerlendirilirken mümkün olduğunca şunlar bulunur:

- Değişen dosyalar ve değişiklik farkı; varsa commit bilgisi.
- Claude Code’un uyguladığı iş ve belirttiği eksikler.
- Gerçekte çalıştırılan derleme, tip veya ilgili test kontrolünün sonucu.
- Arayüz işi için çalışan ekran; ilgili etkileşim ve hata durumları.

İlgisiz önceki çalışmaları geri alma veya bütün projeyi baştan kurma varsayılan çözüm değildir. Yapılmamış bir kontrol “geçti” olarak kaydedilmez.

## İncelemenin odağı

- **Davranış:** İstenen kullanıcı akışı çalışıyor mu?
- **Veri anlamı:** Kimlik/senaryo/gün eşleşmesi, birimler, null ve model durumları doğru mu?
- **Yapı:** Örnek veriden üretilmiş veriye geçiş ve sonraki işi yapmak makul mü?
- **Görsel sonuç:** Bilgi sırası, okunabilirlik, yerleşim, dar ekran ve temel erişilebilirlik yeterli mi?
- **Gösterim:** Temiz başlangıç, üretim çıktısı ve yerel kullanım çalışıyor mu?

Her küçük değişiklik için bütün kontrol paketi tekrarlanmaz. Kritik hesaplama veya davranış için anlamlı test; ekran düzeni için görsel kontrol ve gerekli derleme kullanılır. Kapsamlı uçtan uca kabul Aşama 7’de yapılır; entegrasyon ve yerel çalışma riskleri daha erken kontrol edilir.

## Hatalar ve ilerleme

Gösterimi durduran veya yanlış veri/sonuç sunan sorunlar önce çözülür. Küçük görsel iyileştirmeler aynı turda birleştirilebilir veya kayıt altına alınarak ertelenebilir. Her kontrol noktası yeniden kullanıcı izni beklenen bir durak anlamına gelmez.

Bir aşamanın tamamlanması Claude Code’un “bitti” demesine değil, plandaki ölçütün karşılanmasına bağlıdır. Ana hedef tam pipeline’dır. 23 Ekim görüşmesi için sentetik veri ve açıklanabilir kurallarla çalışan prototip hedeflenir; ML ve QR gerekli değildir. Kısmi gösterim tam MVP kabulünün veya saha ML doğrulamasının yerine geçmez. Diğer ekranların sunulabilirliği kod ve kalan süreyle değerlendirilir.

## Karar ve durum kaydı

Aktif aşama, son incelenen kod/sürüm, doğrulanan sonuç, eksikler ve açık kararlar `DURUM.md` içinde kısa tutulur. Sonraki prompt bu kaydın ve güncel kodun birlikte incelenmesiyle hazırlanır.

Mimari değişiklikte sorun, değerlendirilen seçenek, seçilen yaklaşım ve etkilediği alanlar kaydedilir. Eski diyagramdaki teknoloji veya kişi dağılımı, kanıta dayalı değişikliğin önünde engel değildir.
