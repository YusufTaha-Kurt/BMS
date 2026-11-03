# COP31 — Yazılım Çalışma Alanı

Başlangıç: 22 Ekim 2026. Durum: ilk çalışan sentetik demo `web/` altında kodlandı (bkz. `DURUM.md`); tam pipeline planı sürüyor.

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
npm run typecheck     # tsc -b
npm run lint          # eslint
```

Sunum sırasında üst çubuktaki **Sunum rehberi** düğmesi 12 adımlık yönlendirmeyi açar; her adım paneli ilgili senaryo/gün/bataryaya kendisi getirir ve sunucuya söylenecek cümleyi gösterir (← → ile ilerler, Esc kapatır).

**Stant / QR:** Üst çubuktaki **Hakkımızda** düğmesi büyük bir QR açar; aynı QR sayfanın en altında da durur. QR, ayrı derlenen `/hakkimizda/` tanıtım sayfasını açar. Broşürle aynı petrol yeşili/bordo/lime kimliğini kullanan sayfa İngilizce açılır; üstteki EN/TR seçimiyle Türkçeye geçilir. Akış: broşür/poster → QR → proje ve ekip tanıtımı → demo. Adres korunduğu için basılı QR değişmez. Uygulama localhost'tan açılsa bile QR yayındaki adrese gider.

Ekip isimleri (`PROJECT_TEAM`), akademik koordinatör (`ACADEMIC_COORDINATOR`), iletişim adresleri (`CONTACTS`, isteğe bağlı ortak `TEAM_EMAIL`) ve yayın adresi (`SITE_URL`) **`web/src/site.ts`** içindedir. Gerçek e-posta verilene kadar iletişim bağlantısı gösterilmez. Tanıtım metinleri `web/src/about/About.tsx`, bağımsız stilleri `web/src/about/about.css` içindedir; demo panelinin teması ayrı tutulur.

Ekip açılışın hemen altındadır; sıra Gizem, Gamze, Erhan, Yusuf, Ahmed ve ardından akademik koordinatördür. Her isim kendi satırında genişleyen bir profil açar; pencere veya yeni sayfa açılmaz. `PROJECT_TEAM` ve `COORDINATOR_PROFILE` kayıtlarına isteğe bağlı `role` / `bio` (`en` ve `tr`), `photo` ve `links` (`label`, `url`) eklenebilir. Bilgi verilmemiş profillerde yalnız yakında paylaşılacağı belirtilir. Demo bağlantısı ilk ekrandadır; ayrıntılı proje akışı kapalı başlayan “How it works” bölümündedir.

Veri tamamen sentetiktir (sabit seed `20261023`); aynı seed aynı içeriği üretir (`manifest.json` içindeki `contentHash`). Eşikler `web/shared/config.ts` içinde tek yerde durur ve üretici sınırı değildir. Üretilen `web/public/data/` git'e alınmaz.

## Dosyalar

- [İlk demo için teknoloji ve kapsam kararları](DEMO_KARARLARI.md)
- [Mevcut başlangıç durumuna göre hazırlanmış ilk Claude Code görevi](ILK_GELISTIRME_PROMPTU.md)
- [Sekiz aşamalı tam pipeline planı ve kabul ölçütleri](MVP_PLANI.md)
- [Kod inceleme ve Claude Code ile çalışma düzeni](CALISMA_DUZENI.md)
- [Mevcut durum ve açık kararlar](DURUM.md)

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
