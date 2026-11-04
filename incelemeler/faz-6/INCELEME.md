# Faz 6 — İletişim formu

4 Kasım 2026. Kullanıcı bütün fazların tamamlanmasını istedi. Form daha önce arkadaşa bırakılmıştı; bu turda brief'in Faz 6 maddelerine göre uygulandı (plan: brief s. 10–11).

## Yapılanlar

- **Form** (`web/src/about/components/ContactForm.tsx`, `/hakkimizda/iletisim/#collaboration-form`): ad soyad, kurum, e-posta, isteğe bağlı telefon, öneri açıklaması (20–2000 karakter, sayaçlı) ve aydınlatma onay kutusu. TR/EN metinler `content/tr.ts` / `en.ts` → `collaborations.form`. Stiller `contact-form.css`.
- **Doğrulama:** Tarayıcı ve sunucu aynı `validateContact` kuralını kullanır (`web/api/contact.ts`). Hatalar gönderimde gösterilir, sonra yazarken güncellenir; odak hata özetine gider, özet bağlantıları alana götürür. `aria-invalid`, `aria-describedby`, `autocomplete` ve doğru klavye türleri vardır.
- **Durumlar:** Gönderiliyor (alanlar kilitli), başarı (başlığa odak, yeni öneri), sunucu alan hataları, yapılandırılmamış/oran sınırı/iletim hatası/bağlantı hatası. Hata durumlarında yazılanlar korunur.
- **Spam koruması:** Görünmez tuzak alanı, en az 3 saniyelik doldurma süresi (bot gönderimleri sessizce başarılı görünür ama iletilmez), başka siteden gelen Origin reddi, 16 KB gövde sınırı, IP başına 10 dakikada 5 gönderim (sunucu örneği içinde). Satır sonu enjeksiyonu konu/yanıt adresinden temizlenir.
- **İletim:** `web/api/contact.ts` Vercel fonksiyonu (`/api/contact`), Resend HTTP API'siyle kurumsal adrese e-posta gönderir. Ek paket yok. Gizli bilgiler ortam değişkenlerinde: `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `RESEND_API_KEY`. Biri eksikse 503 döner ve hiçbir şey gönderilmez. Sunucu kodu istemci paketine girmez (derleme çıktısında doğrulandı).
- **Açılış kilidi:** `web/src/site.ts` → `CONTACT_FORM`. `enabled: false` ve aydınlatma metni adresi boş olduğu için form şu an görünür ama kapalıdır; açıklama gösterilir, veri gönderilemez. Brief'in “alıcı ve onaylı aydınlatma metni olmadan başvuru toplama” kuralı korunur.

## Formu açma adımları

1. E-posta servisinde (Resend) gönderen alan adını doğrulayın; API anahtarı alın.
2. Vercel → proje → Settings → Environment Variables: `CONTACT_TO_EMAIL` (kurumun belirlediği alıcı, virgülle birden çok), `CONTACT_FROM_EMAIL`, `RESEND_API_KEY`. Production için ekleyin.
3. Kurumun onayladığı aydınlatma metnini TR/EN yayımlayın (ör. `web/public/` altında PDF) ve `CONTACT_FORM.privacyNoticeUrl` alanına yazın.
4. `CONTACT_FORM.enabled = true`, ardından yeniden yayın.
5. Canlıda gerçek test gönderimi yapın; e-postanın doğru alıcıya ulaştığını, yanıt adresinin gönderen kişi olduğunu kontrol edin. Bu adım yapılmadan form teslim edilmiş sayılmaz.

## Kontroller

- `npm run test:contact` → 6/6: alan kuralları; yöntem/Origin/gövde; üç bot tuzağının hiç göndermediği; 422 alan hataları; yapılandırma yokken 503; doğru alıcı/gönderen/yanıt adresi ve başlık enjeksiyonu; iletim hatası 502; altıncı gönderimde 429.
- Tarayıcı ([kontrol betiği](kontrol.cjs)): gerçek derlemede form kapalı, gönder düğmesi devre dışı, istek yok. Ayrı bir geçici derlemede (`enabled: true` + örnek aydınlatma adresi, depoya alınmadı) `/api/contact` taklit edilerek: boş gönderimde beş alanlı özet ve odak, istek yok; canlı hata güncellemesi; sunucu alan hatası; dört hata durumu ve metnin korunması; “Gönderiliyor…”; başarı başlığına odak; gönderilen gövde; yeni öneri sıfırlaması. 390 px'te taşma yok; Tab sırası ad → kurum → e-posta → telefon → öneri → onay → aydınlatma bağlantısı → gönder; tuzak alanına sekmeyle ulaşılmıyor. Konsolda error/warn yok.
- Ekranlar: [kapalı](form-kapali-tr.png), [doğrulama](form-hatalar-tr.png), [gönderim hatası](form-gonderim-hatasi-tr.png), [başarı](form-basarili-tr.png), [mobil EN](form-mobil-en.png).

## Açık kalanlar

Alıcı adres, e-posta servisi hesabı/anahtarı, kurum onaylı aydınlatma metni ve canlı test gönderimi. Bunlar gelene kadar başvuru alınmaz. Oran sınırı sunucu örneği başınadır; yoğun kötüye kullanımda Vercel Firewall kuralı eklenebilir.
