import type { PrivacyCopy } from './types.ts'

export const privacy: PrivacyCopy = {
  version: 'Sürüm 1, 4 Kasım 2026',
  intro: 'Bu metin, İklimTekOst web sitesindeki iş birliği önerisi formuyla toplanan kişisel verilerin işlenmesi hakkındadır. 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 10. maddesi ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ kapsamında hazırlanmıştır.',
  sections: [
    {
      title: 'Veri sorumlusu',
      paragraphs: [
        'Veri sorumlusu OSTİM Teknik Üniversitesi’dir. Veriler, üniversite bünyesinde yürütülen İklimTekOst projesinin ekibi tarafından işlenir. Üniversitenin adres ve iletişim bilgileri resmî internet sitesinde yer alır.',
      ],
    },
    {
      title: 'İşlenen kişisel veriler',
      items: [
        'Ad ve soyad',
        'Kurum adı',
        'E-posta adresi',
        'Telefon numarası, yazılırsa',
        'Öneri metni ve metinde paylaşılan bilgiler',
        'Formun dili, gönderim zamanı ve onay kayıtları',
      ],
      paragraphs: ['IP adresi, kötüye kullanımı önlemek için gönderim sırasında geçici olarak kullanılır ve kaydedilmez.'],
    },
    {
      title: 'İşleme amaçları',
      items: [
        'İş birliği önerisini değerlendirmek',
        'Öneri sahibine yanıt vermek ve görüşmeyi sürdürmek',
        'Formun kötüye kullanımını ve istenmeyen gönderimleri önlemek',
        'Mevzuattan doğan yükümlülükleri yerine getirmek',
      ],
    },
    {
      title: 'Toplama yöntemi ve hukuki sebep',
      paragraphs: [
        'Veriler web sitesindeki form aracılığıyla elektronik ortamda ve otomatik yollarla toplanır.',
        'Önerinin değerlendirilmesi ve öneri sahibiyle iletişim, Kanun’un 5. maddesinin 2. fıkrasının (c) bendindeki bir sözleşmenin kurulmasıyla doğrudan ilgili olma ve (f) bendindeki veri sorumlusunun meşru menfaati hukuki sebeplerine dayanır. Yasal yükümlülükler için aynı fıkranın (ç) bendi uygulanır.',
      ],
    },
    {
      title: 'Aktarım',
      paragraphs: [
        'Kişisel veriler satılmaz ve pazarlama amacıyla paylaşılmaz.',
        'Form gönderimi, sitenin barındırma hizmetini veren Vercel Inc. altyapısında Amerika Birleşik Devletleri’ndeki sunucularda işlenir. Gönderilen bilgiler, veri tabanı hizmetini veren Supabase Inc. altyapısında Almanya’nın Frankfurt bölgesindeki sunucularda saklanır. Bu nedenle veriler yurt dışına aktarılır. Aktarım, Kanun’un 9. maddesi kapsamında formdaki açık rıza onayınıza dayanır.',
        'Kanunen yetkili kamu kurum ve kuruluşlarına yalnız yasal zorunluluk hâlinde aktarım yapılır.',
      ],
    },
    {
      title: 'Saklama süresi',
      paragraphs: [
        'Veriler proje süresince ve en fazla iki yıl saklanır. Süre sonunda silinir veya anonim hâle getirilir. Başvurunuz üzerine daha önce de silinir.',
      ],
    },
    {
      title: 'Haklarınız',
      lead: 'Kanun’un 11. maddesi kapsamında veri sorumlusuna başvurarak aşağıdaki haklarınızı kullanabilirsiniz.',
      items: [
        'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
        'İşlenmişse buna ilişkin bilgi talep etme',
        'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
        'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme',
        'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
        'Kanun’un 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme',
        'Düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme',
        'Yalnız otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme',
        'Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme',
      ],
    },
    {
      title: 'Başvuru',
      paragraphs: [
        'Başvurular, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ’e uygun olarak yazılı şekilde OSTİM Teknik Üniversitesi’ne iletilir. Başvuruda ad soyad, imza, T.C. kimlik numarası, yabancılar için uyruk ve kimlik numarası, tebligata esas adres, varsa e-posta ve telefon ile talep konusu yer alır.',
        'Başvurular en geç otuz gün içinde ücretsiz olarak sonuçlandırılır. İşlem ayrıca bir maliyet gerektirirse Kurul’un belirlediği tarifedeki ücret alınabilir.',
      ],
    },
  ],
  universitySite: 'OSTİM Teknik Üniversitesi resmî sitesi',
}
