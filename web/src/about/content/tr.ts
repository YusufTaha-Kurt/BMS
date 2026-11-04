import { FOUNDATION_SOURCE, UNIVERSITY_SOURCE } from '../sources.ts'
import type { HomeCopy, OrganizationsCopy, SiteCopy, TeamCopy } from './types.ts'

export const common: SiteCopy = {
  institution: 'OSTİM Teknik Üniversitesi',
  homeLink: 'BinBin Battery Intelligence — ana sayfa',
  navigation: 'Ana gezinme',
  language: 'Dil',
  openMenu: 'Menüyü aç',
  closeMenu: 'Menüyü kapat',
  skip: 'İçeriğe geç',
  openDemo: 'Demoyu aç',
  newTab: 'yeni sekmede açılır',
  demoNote: 'Sentetik veri kullanılır. Bu demo BinBin’in gerçek filo verisini veya nihai arayüzü göstermez.',
  preparing: 'Hazırlanıyor',
  pendingText: 'Bu sayfanın içeriği hazırlanıyor. Bu sırada mevcut proje tanıtımını ve etkileşimli demoyu inceleyebilirsiniz.',
  backHome: 'Proje tanıtımına dön',
  footer: {
    institution: 'Kurum',
    contact: 'Proje e-postası',
    updated: 'Son güncelleme',
    sources: 'Kaynaklar ve telif',
    sourceNote: 'COP31 Web Sitesi Brief’i (Kasım 2026) ve BinBin Proje Teklifi (Ekim 2026). Demo görselleri: proje ekibinin sentetik veriyle çalışan yerel uygulaması.',
    copyright: 'İçerik proje ekibine aittir. Üçüncü taraf materyallerin hakları kendi sahiplerinde kalır.',
    backTop: 'Başa dön',
  },
  notFound: { title: 'Sayfa bulunamadı', description: 'Devam etmek için proje tanıtımına dönebilirsiniz.' },
  pages: {
    home: {
      label: 'Ana sayfa', title: 'Proje tanıtımı',
      description: 'Paylaşımlı mikromobilite için batarya sağlığı ve Dijital Batarya Pasaportu geliştiren OSTİM Teknik Üniversitesi ekibiyle tanışın.',
    },
    institutions: {
      label: 'Kurumlar', title: 'Kurumsal yapı ve yöneticiler',
      description: 'OSTİM Vakfı, OSTİM Teknik Üniversitesi ve projenin arkasındaki kurumsal yapı hakkında bilgiler.',
    },
    team: {
      label: 'Ekip', title: 'Proje ekibi',
      description: 'Proje ekibini ve akademik koordinatörü, rollerini ve projeye katkılarını tanıyın.',
    },
    project: {
      label: 'Proje', title: 'Proje detayları',
      description: 'Batarya sağlığı, bakım karar desteği ve Dijital Batarya Pasaportu için önerilen yaklaşım.',
    },
    demo: {
      label: 'Demo ve sunum', title: 'Demo ve sunum',
      description: 'Sentetik verili konsept demo, beş adımlı kullanım rehberi ve açıklamalı ekran görüntüleri.',
    },
    carbon: {
      label: 'Karbon etkisi', title: 'Karbon etkisi ve döngüsellik',
      description: 'Projenin beklenen katkıları, hesaplama yaklaşımı ve sınırları. Henüz ölçülmüş sonuç bulunmuyor.',
    },
    contact: {
      label: 'İş birliği ve iletişim', title: 'İş birlikleri ve iletişim',
      description: 'Önerilen BinBin pilot iş birliği, Sustain Bridge için bilgi alanları ve proje iletişim seçenekleri.',
    },
  },
}

export const home: HomeCopy = {
  eyebrow: 'OSTİM / BATARYA ARAŞTIRMASI',
  headline: ['BinBin Battery', 'Intelligence'],
  intro: 'Paylaşımlı mikromobilite için batarya sağlığı takibi, bakım karar desteği ve Dijital Batarya Pasaportu.',
  stage: 'Teklif ve pilot planlama aşaması',
  battery: 'Bir batarya. Tek kimlik.',
  tags: ['Batarya sağlığı', 'Dijital Batarya Pasaportu', 'Döngüsel ekonomi'],
  problem: {
    label: 'İHTİYAÇ', title: 'Bataryanın geçmişi onunla birlikte taşınmalı.',
    text: 'Bataryalar araçlar arasında yer değiştiriyor. Bakım ekiplerinin bataryanın durumunu değerlendirebilmesi için sağlık göstergelerinin, onarım ve değişim kayıtlarının tekil batarya kimliğinde bir arada tutulması gerekiyor.',
    passport: 'İzlenebilir kayıtlar, AB’de piyasaya arz edilen veya hizmete alınan hafif ulaşım aracı (LMT) bataryaları için 18 Şubat 2027’de başlayacak Batarya Pasaportu yükümlülüğüne hazırlığı da destekliyor.',
    source: 'Kaynak: Avrupa Komisyonu',
  },
  solution: {
    label: 'YAKLAŞIM', title: 'Batarya verisinden daha bilinçli kararlara.',
    text: 'Mevcut batarya verilerini ve bakım kayıtlarını tek batarya kimliğinde birleştirmeyi, sağlık ve anomali göstergeleri geliştirmeyi ve doğrulanmış yaşam döngüsü kayıtlarını Dijital Batarya Pasaportu’na aktarmayı hedefliyoruz.',
    flowHeading: 'Önerilen sistem akışı',
    steps: [
      { title: 'Batarya', detail: 'Araç değişse de korunan tekil kimlik.' },
      { title: 'BMS / IoT', detail: 'Mevcut Batarya Yönetim Sistemi ve Nesnelerin İnterneti verileri.' },
      { title: 'Veri işleme', detail: 'Kimlik eşleştirme, zaman uyumu ve veri kalite kontrolleri.' },
      { title: 'Sağlık ve anomali analizi', detail: 'Pilot verisiyle doğrulanacak göstergeler ve yöntemler.' },
      { title: 'Bakım karar desteği', detail: 'Teknik inceleme için öncelikler ve gerekçeler.' },
      { title: 'Dijital Batarya Pasaportu', detail: 'Doğrulanmış sağlık ve yaşam döngüsü kayıtları.' },
    ],
    decision: 'Önerilen veri erişimi salt okunurdur. BMS koruma işlevlerine müdahale edilmez; nihai karar yetkin teknik personelde kalır.',
    cta: 'Projeyi tanı',
  },
  team: {
    label: 'EKİP', title: 'Projeyi geliştiren ekip',
    text: 'OSTİM Teknik Üniversitesi bilgisayar ve elektrik-elektronik mühendisliği öğrencilerinden oluşan ekip, akademik koordinatör eşliğinde proje önerisini geliştiriyor.',
    coordinator: 'Akademik koordinatör', cta: 'Ekibi gör',
  },
  institutions: {
    label: 'KURUMLAR', title: 'OSTİM Vakfı ve OSTİM Teknik Üniversitesi',
    items: [
      { id: 'foundation', name: 'OSTİM Vakfı', text: 'OSTİM Vakfı, sanayinin gelişimini desteklemek için eğitim, araştırma, teknoloji ve girişimcilik alanlarını bir araya getirir.', url: FOUNDATION_SOURCE },
      { id: 'university', name: 'OSTİM Teknik Üniversitesi', text: 'OSTİM Vakfı tarafından kurulan OSTİM Teknik Üniversitesi, eğitim ve araştırmayı sanayi ekosistemiyle buluşturur.', url: UNIVERSITY_SOURCE },
    ],
    source: 'Resmî site', cta: 'Kurumları tanı',
  },
  climate: {
    label: 'COP31 BAĞLAMI', title: 'Bataryanın tüm yaşam döngüsüne bakıyoruz.',
    text: 'Önerilen çalışma; batarya ömrünün daha etkin yönetilmesi, yeniden kullanım ve geri dönüşüm kararlarının izlenebilirliği ve operasyonel emisyonların izlenmesi hedefleriyle döngüsellik ve elektrifikasyon odaklı iklim eylemleriyle ilişkilidir.',
    scope: 'Proje doğrudan bir COP31 yükümlülüğü kapsamında geliştirilmemektedir. Beklenen katkıların pilot çalışmayla doğrulanması gerekir.',
    cta: 'Beklenen karbon etkisini incele',
  },
  explore: {
    label: 'KEŞFETMEYE DEVAM EDİN', title: 'Proje dosyası',
    links: [
      { page: 'project', label: 'Projeyi tanı', text: 'Önerilen yaklaşım ve geliştirme aşamaları.' },
      { page: 'team', label: 'Ekibi gör', text: 'Projenin arkasındaki kişiler ve profilleri.' },
      { page: 'demo', label: 'Demo ve sunum', text: 'Sentetik verili çalışan konsept demoya erişim.' },
      { page: 'carbon', label: 'Karbon etkisi', text: 'Beklenen katkılar, yöntemler ve sınırlar.' },
      { page: 'contact', label: 'İş birliği öner', text: 'İş birliği ve iletişim bilgileri.' },
    ],
  },
}

export const team: TeamCopy = {
  members: 'Proje ekibi', coordinator: 'Akademik koordinatör',
  openProfile: 'Profili gör', closeProfile: 'Profili kapat', missing: 'Bilgi henüz paylaşılmadı',
  fields: { role: 'Rol', workPackage: 'Çalışma paketi', contribution: 'Katkı', bio: 'Kısa tanıtım', links: 'Bağlantılar' },
}

export const organizations: OrganizationsCopy = {
  logo: 'Logo', missing: 'Bilgi henüz paylaşılmadı', officialWebsite: 'Resmî site',
  institutions: {
    relationshipTitle: 'Vakıftan üniversiteye uzanan yapı.',
    relationshipText: 'OSTİM Vakfı, eğitim, araştırma, teknoloji ve girişimcilik alanlarındaki çalışmalarını kurumsal bir yapıda geliştirmek amacıyla OSTİM Teknik Üniversitesi’ni kurmuştur. Proje, üniversitenin bilgisayar ve elektrik-elektronik mühendisliği öğrencilerinden oluşan ekip tarafından akademik koordinatör eşliğinde hazırlanmaktadır.',
    source: 'Kurumsal ilişkinin kaynağı: OSTİM Vakfı',
    managersTitle: 'Yönetici bilgileri',
    managersIntro: 'Brief’teki taslak isimler aşağıdadır. Görev, kurum ve resmî iletişim bilgileri kurumdan teyit edildiğinde eklenecektir.',
    researchSlot: 'Ar-Ge / projeler sorumlusu',
    pending: 'Teyit bekleniyor', confirmed: 'Teyit edildi',
    fields: { name: 'Ad soyad', role: 'Görev / unvan', institution: 'Kurum', email: 'Resmî e-posta' },
    collaborationLink: 'İş birlikleri ve iletişim',
  },
  collaborations: {
    heading: 'İş birliği alanları',
    intro: 'BinBin için pilot iş birliği öneriliyor. Onaylı kapsam ve diğer iş birliği bilgileri henüz paylaşılmadı.',
    statuses: { proposed: 'Önerilen pilot iş birliği', pending: 'Kapsam bilgisi bekleniyor', confirmed: 'Onaylanmış iş birliği' },
    fields: { proposal: 'Teklifte önerilen yaklaşım', approvedScope: 'Onaylı iş birliği kapsamı', contribution: 'Projeye katkı', website: 'Resmî bağlantı' },
    contactTitle: 'Proje iletişimi',
    contactText: 'Proje hakkında bilgi almak ve iş birliği önermek için kurumsal iletişim kanalı hazırlanıyor.',
    email: 'Kurumsal proje e-postası',
    formTitle: 'İş birliği önerisi',
    formText: 'Proje ekibine iş birliği önerinizi bu formla iletebilirsiniz. Yanıt, verdiğiniz e-posta adresine gönderilir.',
    form: {
      intro: 'Zorunlu alanlar işaretsizdir; isteğe bağlı alanlar belirtilmiştir.',
      closed: 'Form henüz başvuru almıyor. Kurumun belirlediği alıcı adres ve onaylı aydınlatma metni eklendiğinde açılacak.',
      labels: { name: 'Ad soyad', organization: 'Kurum', email: 'E-posta', phone: 'Telefon', message: 'Öneriniz' },
      optional: 'isteğe bağlı',
      hints: { email: 'Yanıt bu adrese gönderilir.', phone: 'Ülke koduyla yazabilirsiniz, ör. +90 312 000 00 00.', message: 'İş birliği fikrinizi, kurumunuzun olası katkısını ve beklentinizi kısaca anlatın (en az 20 karakter).' },
      consentBefore: '',
      consentLink: 'Aydınlatma metnini',
      consentAfter: ' okudum; bilgilerimin bu öneriyi değerlendirmek ve bana yanıt vermek için işlenmesini kabul ediyorum.',
      consentPending: 'Aydınlatma metni kurum onayından sonra eklenecek.',
      honeypot: 'Bu alanı boş bırakın',
      submit: 'Öneriyi gönder',
      sending: 'Gönderiliyor…',
      counter: '{count}/{max} karakter',
      summaryTitle: 'Gönderilmeden önce şu alanları düzeltin:',
      errors: {
        required: { name: 'Ad soyad yazın.', organization: 'Kurum adını yazın.', email: 'E-posta adresinizi yazın.', message: 'Önerinizi yazın.', consent: 'Göndermek için aydınlatma metnini onaylayın.' },
        tooShort: 'En az {min} karakter yazın.',
        tooLong: 'En fazla {max} karakter yazabilirsiniz.',
        invalidEmail: 'Geçerli bir e-posta adresi yazın, ör. ad@kurum.edu.tr.',
        invalidPhone: 'Telefon numarasında yalnız rakam, boşluk, +, ( ) ve - kullanın.',
      },
      success: { title: 'Öneriniz iletildi', text: 'Teşekkür ederiz. Proje ekibi önerinizi inceleyip verdiğiniz e-posta adresinden size dönecek.', again: 'Yeni öneri gönder' },
      failure: {
        title: 'Öneri gönderilemedi',
        not_configured: 'Form şu anda başvuru alacak şekilde yapılandırılmadı. Lütfen daha sonra tekrar deneyin.',
        rate_limited: 'Kısa sürede çok fazla gönderim yapıldı. Birkaç dakika sonra tekrar deneyin.',
        delivery_failed: 'Öneri iletilirken bir sorun oluştu. Yazdıklarınız korunuyor; tekrar deneyebilirsiniz.',
        network: 'Sunucuya bağlanılamadı. Bağlantınızı kontrol edip tekrar deneyin; yazdıklarınız korunuyor.',
        generic: 'Beklenmeyen bir hata oluştu. Yazdıklarınız korunuyor; tekrar deneyebilirsiniz.',
      },
    },
    institutionsLink: 'Kurumsal yapıyı incele', projectLink: 'Projeyi tanı',
  },
}

export { project, carbon } from './technical.tr.ts'
export { demo } from './demo.tr.ts'
