import type { HomeCopy, OrganizationsCopy, TeamCopy } from './types.ts'
export { commonTr as common } from './common.ts'

export const home: HomeCopy = {
  intro: 'Proje, paylaşımlı mikromobilite filolarında batarya sağlığını izlemeyi, bakım önceliği belirlemeyi ve Dijital Batarya Pasaportu için kayıt oluşturmayı amaçlıyor. Proje teklif aşamasında. Pilot çalışma planlanıyor.',
  projectLink: 'Projeyi incele',
  fleetPreview: {
    title: 'Filo görünümü',
    batteries: 'batarya',
    snapshot: '14. gün',
    synthetic: 'Sentetik veri',
    priorities: 'Bakım öncelikleri',
    batteryDetails: 'Demodaki batarya ayrıntıları',
    history: 'Geçmiş',
    telemetry: 'Telemetri',
    passport: 'Batarya Pasaportu',
  },
  need: {
    title: 'Neden gerekli',
    paragraphs: [
      'Paylaşımlı filolarda bataryalar farklı araçlarda kullanılabilir. Bakım ekibinin doğru karar verebilmesi için sağlık, onarım ve değişim kayıtlarının batarya kimliğiyle ilişkilendirilmesi gerekir.',
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
    principle: 'Sistemin batarya verilerine yalnızca okuma erişimi vardır. BMS koruma işlevlerine müdahale edilmez. Bakım kararını teknik personel verir.',
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
  members: 'Öğrenci ekibi', coordinator: 'Akademik koordinatör',
  fields: { role: 'Rol', workPackage: 'Çalışma paketi', contribution: 'Katkı', bio: 'Hakkında', links: 'Bağlantılar' },
  sections: { education: 'Eğitim', publications: 'Yayınlar', experience: 'Deneyim', projects: 'Projeler', certificates: 'Sertifikalar ve eğitimler', skills: 'Yetenekler', languages: 'Diller', seminars: 'Etkinlikler ve seminerler' },
}

export const organizations: OrganizationsCopy = {
  officialWebsite: 'Resmî site',
  institutions: {
    items: [
      { id: 'university', name: 'OSTİM Teknik Üniversitesi', text: 'OSTİM Vakfı tarafından kurulan üniversite, eğitim ve araştırma çalışmalarını sanayi kuruluşlarıyla iş birliği içinde yürütür.' },
      { id: 'foundation', name: 'OSTİM Vakfı', text: 'Sanayinin gelişimi için eğitim, araştırma, teknoloji ve girişimcilik çalışmalarını bir araya getirir.' },
    ],
    relationshipTitle: 'Vakıf ve üniversite',
    relationshipText: 'OSTİM Vakfı, eğitim ve araştırmayı desteklemek için OSTİM Teknik Üniversitesini kurmuştur. Üniversitenin öğrenci ekibi projeyi akademik koordinatörle birlikte geliştirir.',
    relationshipSource: 'OSTİM Vakfı hakkında',
    managersTitle: 'Yöneticiler',
    managersNote: 'Unvanı resmî kaynakta bulunamayan kişinin bilgisi kurum teyidinden sonra eklenecektir.',
  },
  collaborations: {
    heading: 'Destekleyenler',
    statuses: { proposed: 'Destekleyen kuruluş', pending: 'Kapsam belirleniyor', confirmed: 'Destekleyen kuruluş' },
    approvedScope: 'Onaylı kapsam',
    contribution: 'Projeye katkı',
    formTitle: 'İş birliği önerisi',
    formText: 'Proje ekibi önerileri inceler ve belirttiğiniz e-posta adresine yanıt verir.',
    form: {
      intro: 'İsteğe bağlı alanlar belirtilmiştir. Diğer alanlar zorunludur.',
      closed: 'Form şu anda başvuru almıyor.',
      labels: { name: 'Ad soyad', organization: 'Kurum', email: 'E-posta', phone: 'Telefon', message: 'Öneri' },
      optional: 'isteğe bağlı',
      hints: {
        email: 'Yanıt bu adrese gönderilir.',
        phone: 'Ülke koduyla yazılabilir, ör. +90 312 000 00 00',
        message: 'İş birliği fikrinizi, kurumunuzun nasıl katkı sağlayabileceğini ve beklentinizi yazınız. En az 20 karakter yazınız.',
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
        delivery_failed: 'Öneri metniniz formda duruyor. Yeniden deneyiniz.',
        network: 'Sunucuya bağlanılamadı. Bağlantıyı kontrol edip tekrar deneyiniz.',
        generic: 'Beklenmeyen bir hata oluştu. Tekrar deneyiniz.',
      },
    },
  },
}

export { project, carbon } from './technical.tr.ts'
export { demo } from './demo.tr.ts'
export { privacy } from './privacy.tr.ts'
