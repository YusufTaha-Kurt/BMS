import type { HomeCopy, OrganizationsCopy, SiteCopy, TeamCopy } from './types.ts'

export const common: SiteCopy = {
  homeLink: 'BinBin Battery Intelligence ana sayfa',
  navigation: 'Ana gezinme',
  language: 'Dil',
  openMenu: 'Menüyü aç',
  closeMenu: 'Menüyü kapat',
  skip: 'İçeriğe geç',
  openDemo: 'Demoyu aç',
  newTab: 'yeni sekmede açılır',
  demoNote: 'Demo sentetik veriyle çalışır. BinBin filosunun gerçek verisi ve nihai arayüz değildir.',
  universityLogo: 'OSTİM Teknik Üniversitesi',
  cop31Logo: 'COP31 Türkiye, Antalya',
  backHome: 'Ana sayfaya dön',
  footer: { team: 'OSTİM Teknik Üniversitesi proje ekibi', updated: 'Son güncelleme', backTop: 'Başa dön' },
  notFound: { title: 'Sayfa bulunamadı', description: 'Bu adres sitede yok.' },
  pages: {
    home: {
      label: 'Ana sayfa', title: 'Proje tanıtımı',
      description: 'Paylaşımlı mikromobilite bataryaları için sağlık takibi, bakım önceliği ve Dijital Batarya Pasaportu.',
    },
    institutions: {
      label: 'Kurumlar', title: 'Kurumlar',
      description: 'Proje OSTİM Teknik Üniversitesi bünyesinde yürütülür. Üniversite OSTİM Vakfı tarafından kurulmuştur.',
    },
    team: {
      label: 'Ekip', title: 'Proje ekibi',
      description: 'Bilgisayar ve elektrik-elektronik mühendisliği öğrencileri ile akademik koordinatör.',
    },
    project: {
      label: 'Proje', title: 'Proje',
      description: 'Sistemin çalışma biçimi, kullanılacak veriler ve pilot takvimi.',
    },
    demo: {
      label: 'Demo', title: 'Demo ve sunum',
      description: 'Sentetik veriyle çalışan demo ve kullanım adımları.',
    },
    carbon: {
      label: 'Karbon', title: 'Karbon etkisi',
      description: 'Beklenen etkiler ve hesaplama yöntemi. Ölçülmüş sonuç henüz yoktur.',
    },
    contact: {
      label: 'İş birliği', title: 'İş birliği',
      description: 'Önerilen pilot iş birliği ve öneri formu.',
    },
    privacy: {
      label: 'Aydınlatma metni', title: 'Kişisel verilerin korunması aydınlatma metni',
      description: 'İş birliği önerisi formuyla gönderilen kişisel verilerin nasıl işlendiği.',
    },
  },
}

export const home: HomeCopy = {
  headline: ['BinBin Battery', 'Intelligence'],
  intro: 'Paylaşımlı mikromobilite bataryaları için sağlık takibi, bakım önceliği ve Dijital Batarya Pasaportu. Proje teklif ve pilot planlama aşamasındadır.',
  projectLink: 'Projeyi incele',
  heroAlt: 'Sentetik DEMO-001 bataryası. Sıcaklık sapması gerekçesi, teknik inceleme önerisi ve olaysız durumla karşılaştırılan göstergeler.',
  heroCaption: 'Demo ekranı, DEMO-001, 14. gün. Veriler sentetiktir.',
  need: {
    title: 'Neden gerekli',
    paragraphs: [
      'Paylaşımlı araçlarda bataryalar araçlar arasında yer değiştirir. Bakım ekibinin doğru karar verebilmesi için sağlık, onarım ve değişim kayıtlarının bataryanın kendi kimliğinde tutulması gerekir.',
      'AB’de hafif ulaşım aracı bataryaları için Batarya Pasaportu yükümlülüğü 18 Şubat 2027’de başlar. Bu kayıtlar söz konusu yükümlülüğe hazırlığı da destekler.',
    ],
    source: 'Avrupa Komisyonu duyurusu',
  },
  flow: {
    title: 'Nasıl çalışır',
    steps: [
      { title: 'Batarya', text: 'Araç değişse de aynı kalan tekil kimlik.' },
      { title: 'BMS ve IoT verisi', text: 'Mevcut Batarya Yönetim Sistemi ve bağlı cihaz kayıtları.' },
      { title: 'Veri işleme', text: 'Kimlik eşleştirme, zaman uyumu ve kalite kontrolü.' },
      { title: 'Sağlık ve anomali analizi', text: 'Pilot verisiyle doğrulanacak göstergeler.' },
      { title: 'Bakım önceliği', text: 'Teknik inceleme sırası ve gerekçesi.' },
      { title: 'Dijital Batarya Pasaportu', text: 'Doğrulanmış sağlık ve yaşam döngüsü kayıtları.' },
    ],
    principle: 'Veriler yalnız okunur. BMS koruma işlevlerine müdahale edilmez. Bakım kararını teknik personel verir.',
    link: 'Proje ayrıntıları',
  },
  people: {
    title: 'Ekip ve kurumlar',
    text: 'Proje, OSTİM Teknik Üniversitesi bilgisayar ve elektrik-elektronik mühendisliği öğrencileri tarafından akademik koordinatör Barış Taha Uludağ ile yürütülür. Üniversite OSTİM Vakfı tarafından kurulmuştur.',
    team: 'Ekip', institutions: 'Kurumlar',
  },
  climate: {
    title: 'COP31 ile ilişkisi',
    text: 'Batarya ömrünün uzatılması, yeniden kullanım ve geri dönüşüm kararlarının izlenmesi ve şarj kaynaklı emisyonların ölçülmesi COP31’in döngüsellik ve elektrifikasyon başlıklarıyla ilişkilidir. Proje bir COP31 yükümlülüğü kapsamında yürütülmez. Beklenen katkılar pilot çalışmayla doğrulanacaktır.',
    link: 'Karbon etkisi',
  },
}

export const team: TeamCopy = {
  members: 'Öğrenci ekip', coordinator: 'Akademik koordinatör',
  fields: { role: 'Rol', workPackage: 'Çalışma paketi', contribution: 'Katkı', bio: 'Tanıtım', links: 'Bağlantılar' },
}

export const organizations: OrganizationsCopy = {
  officialWebsite: 'Resmî site',
  institutions: {
    items: [
      { id: 'university', name: 'OSTİM Teknik Üniversitesi', text: 'OSTİM Vakfı tarafından kurulmuştur. Eğitim ve araştırmayı sanayi ekosistemiyle birlikte yürütür.' },
      { id: 'foundation', name: 'OSTİM Vakfı', text: 'Sanayinin gelişimi için eğitim, araştırma, teknoloji ve girişimcilik çalışmalarını bir araya getirir.' },
    ],
    relationshipTitle: 'Kurumların ilişkisi',
    relationshipText: 'OSTİM Vakfı, eğitim ve araştırma çalışmalarını kurumsal bir yapıda sürdürmek için OSTİM Teknik Üniversitesi’ni kurmuştur. Proje, üniversitenin öğrenci ekibi tarafından akademik koordinatörle birlikte hazırlanır.',
    relationshipSource: 'OSTİM Vakfı hakkında',
    managersTitle: 'Yöneticiler',
    managersNote: 'Unvanı resmî kaynakta bulunamayan kişinin bilgisi kurum teyidinden sonra eklenecektir.',
  },
  collaborations: {
    heading: 'İş birlikleri',
    statuses: { proposed: 'Önerilen pilot iş birliği', pending: 'Kapsam belirleniyor', confirmed: 'Onaylanmış iş birliği' },
    approvedScope: 'Onaylı kapsam',
    contribution: 'Projeye katkı',
    formTitle: 'İş birliği önerisi',
    formText: 'Öneriler proje ekibine iletilir. Yanıt formda yazılan e-posta adresine gönderilir.',
    form: {
      intro: 'İsteğe bağlı alanlar belirtilmiştir. Diğer alanlar zorunludur.',
      closed: 'Form şu anda başvuru almıyor.',
      labels: { name: 'Ad soyad', organization: 'Kurum', email: 'E-posta', phone: 'Telefon', message: 'Öneri' },
      optional: 'isteğe bağlı',
      hints: {
        email: 'Yanıt bu adrese gönderilir.',
        phone: 'Ülke koduyla yazılabilir, ör. +90 312 000 00 00',
        message: 'İş birliği fikri, kurumunuzun olası katkısı ve beklentiniz. En az 20 karakter.',
      },
      consentBefore: '',
      consentLink: 'Aydınlatma metnini',
      consentAfter: ' okudum.',
      consentPending: 'Aydınlatma metni kurum onayından sonra eklenecektir.',
      transferConsent: 'Bilgilerimin aydınlatma metninde belirtilen yurt dışındaki sunucularda işlenmesine ve saklanmasına açık rıza veriyorum.',
      honeypot: 'Bu alanı boş bırakınız',
      submit: 'Öneriyi gönder',
      sending: 'Gönderiliyor',
      counter: '{count} / {max} karakter',
      summaryTitle: 'Gönderimden önce düzeltilecek alanlar',
      errors: {
        required: {
          name: 'Ad soyad yazınız.', organization: 'Kurum adını yazınız.', email: 'E-posta adresi yazınız.',
          message: 'Öneri metnini yazınız.', consent: 'Aydınlatma metnini okuduğunuzu onaylayınız.',
          transferConsent: 'Yurt dışındaki sunucularda işleme için açık rıza veriniz.',
        },
        tooShort: 'En az {min} karakter yazınız.',
        tooLong: 'En fazla {max} karakter yazılabilir.',
        invalidEmail: 'Geçerli bir e-posta adresi yazınız, ör. ad@kurum.edu.tr',
        invalidPhone: 'Telefon numarasında yalnız rakam, boşluk ve + ( ) - işaretleri kullanılabilir.',
      },
      success: { title: 'Öneri iletildi', text: 'Proje ekibi öneriyi inceleyip yazdığınız e-posta adresine yanıt verecektir.', again: 'Yeni öneri gönder' },
      failure: {
        title: 'Öneri gönderilemedi',
        not_configured: 'Form şu anda başvuru almıyor.',
        rate_limited: 'Kısa sürede çok fazla gönderim yapıldı. Bir süre sonra tekrar deneyiniz.',
        delivery_failed: 'Öneri iletilemedi. Yazılanlar korunur, tekrar deneyiniz.',
        network: 'Sunucuya bağlanılamadı. Bağlantıyı kontrol edip tekrar deneyiniz.',
        generic: 'Beklenmeyen bir hata oluştu. Tekrar deneyiniz.',
      },
    },
  },
}

export { project, carbon } from './technical.tr.ts'
export { demo } from './demo.tr.ts'
export { privacy } from './privacy.tr.ts'
