// Stant/QR ve tanıtım sayfası ayarları. Projenin ortak e-posta adresi yoktur; iletişim formla yapılır.
import type { SiteLanguage } from '../shared/types.ts'
import barisPhoto from './about/assets/people/baris-taha-uludag.jpg'
import erhanPhoto from './about/assets/people/erhan-bulbul.jpg'
import yusufPhoto from './about/assets/people/yusuf-taha-kurt.jpg'
import ahmedPhoto from './about/assets/people/ahmed-emre-demirel.jpg'
import gizemPhoto from './about/assets/people/gizem-genis.jpg'
import gamzePhoto from './about/assets/people/gamze-genis.jpg'
export type { SiteLanguage } from '../shared/types.ts'

export { PROJECT_NAME, SITE_URL, TEAM_NAME } from './siteIdentity.ts'

/** Actual editorial update, not the visitor's clock or the build date. */
export const SITE_CONTENT_UPDATED = '2026-11-09'

export type LocalizedText = Partial<Record<SiteLanguage, string>>

export interface TeamMember {
  id: string
  name: string
  role?: LocalizedText
  workPackage?: LocalizedText
  contribution?: LocalizedText
  bio?: LocalizedText
  photo?: string
  photoCredit?: LocalizedText
  links?: { label: string | LocalizedText; url: string }[]
}

/** Unknown fields stay empty. Add only supplied EN/TR content; preserve this order. */
export const PROJECT_TEAM: readonly TeamMember[] = [
  {
    id: 'gizem', name: 'Gizem Geniş', photo: gizemPhoto,
    bio: {
      tr: 'Elektrik-Elektronik Mühendisliği okuyor ve Bilgisayar Mühendisliğinde çift ana dal yapıyor. Stajlarında veri etiketleme, veri kalitesi kontrolü ve gömülü sistemler üzerinde çalıştı.',
      en: 'Gizem studies Electrical and Electronics Engineering and is pursuing a double major in Computer Engineering. Her internships included data labelling, data quality checks and embedded systems work.',
    },
  },
  {
    id: 'gamze', name: 'Gamze Geniş', photo: gamzePhoto,
    bio: {
      tr: 'Elektrik-Elektronik Mühendisliği okuyor ve Yapay Zekâ Mühendisliğinde çift ana dal yapıyor. Gömülü sistemler, donanım tasarımı ve makine öğrenmesi üzerine çalışıyor. Stajlarında mikrodenetleyiciyle sensör verisi okuma ve telemetri protokolleri üzerinde çalıştı.',
      en: 'Gamze studies Electrical and Electronics Engineering and is pursuing a double major in Artificial Intelligence Engineering. Her interests include embedded systems, hardware design and machine learning. During her internships, she worked on reading sensor data with microcontrollers and on telemetry protocols.',
    },
    links: [{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/gamze-geni%C5%9F-09b02437b' }],
  },
  { id: 'erhan', name: 'Erhan Bülbül', photo: erhanPhoto },
  {
    id: 'yusuf', name: 'Yusuf Taha Kurt', photo: yusufPhoto,
    bio: {
      tr: 'Bulut teknolojileri ve siber güvenlik alanına odaklanan bir bilgisayar mühendisliği öğrencisi. AWS üzerinde uygulamalı güvenlik eğitimleri, öğrenci topluluğu ve Ar-Ge staj deneyimleriyle proje yönetimi ve ekip çalışması pratiği kazandı. Hedefi yapay zekâ güvenliği alanında uzmanlaşmak.',
      en: 'A computer engineering student focused on cloud technologies and cyber security. Gained project management and teamwork experience through hands-on AWS security training, a student society and R&D internships. Aims to specialise in AI security.',
    },
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/yusuf-taha-kurt-050372327' },
      { label: 'GitHub', url: 'https://github.com/YusufTaha-Kurt' },
    ],
  },
  {
    id: 'ahmed', name: 'Ahmed Emre Demirel', photo: ahmedPhoto,
    bio: {
      tr: 'Büyük dil modeli tabanlı sistemler, RAG mimarileri ve istem mühendisliği üzerine çalışan dördüncü sınıf bilgisayar mühendisliği öğrencisi. Belge analizi araçları geliştirdi ve model çıktılarını etiketli verilerle değerlendirdi.',
      en: 'A fourth-year computer engineering student working on large language models, retrieval-augmented generation and prompt engineering. He has developed document analysis tools and evaluated model outputs against labelled data.',
    },
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ahmededemirel' },
      { label: 'GitHub', url: 'https://github.com/DEMIRELINT' },
    ],
  },
]

export const ACADEMIC_COORDINATOR = 'Barış Taha Uludağ'

export const COORDINATOR_PROFILE: TeamMember = {
  id: 'coordinator',
  name: ACADEMIC_COORDINATOR,
  photo: barisPhoto,
  bio: {
    tr: 'Elektrik-Elektronik Mühendisliği alanında lisans ve yüksek lisans derecelerine sahip. Gazi Üniversitesinde aynı alanda doktora yapıyor. OSTİM Teknik Üniversitesi Bilgisayar Mühendisliği Bölümünde araştırma görevlisi. Çalışmaları yapay zekâ, makine öğrenmesi, enerji sistemleri, batarya yönetimi, akıllı sistemler ve İHA uygulamalarına odaklanıyor. Lisans bitirme projelerine danışmanlık yapıyor ve disiplinler arası Ar-Ge projelerinde görev alıyor.',
    en: 'He holds B.Sc. and M.Sc. degrees in Electrical and Electronics Engineering and is pursuing a PhD in the same field at Gazi University. He is a research assistant in the Department of Computer Engineering at OSTİM Technical University. His work focuses on AI, machine learning, energy systems, battery management, smart systems and UAV applications. He advises undergraduate capstone projects and takes part in interdisciplinary R&D projects.',
  },
  role: { en: 'Academic coordinator', tr: 'Akademik koordinatör' },
  workPackage: {
    en: 'Project coordination',
    tr: 'Proje koordinasyonu',
  },
  contribution: {
    en: 'Coordination of the project and its phase transition decisions.',
    tr: 'Projenin ve faz geçiş kararlarının koordinasyonu.',
  },
}

/**
 * İletişim formu. Gönderimler Supabase'teki collaboration_proposals tablosuna yazılır (bkz. web/api/contact.ts).
 * Form üç koşulda açılır. enabled true, o dil için aydınlatma metni adresi dolu ve sunucuda Supabase ayarı var.
 * Sunucu ayarı GET /api/contact ile okunur. Ayar yoksa alanlar kapalı kalır.
 */
export const CONTACT_FORM: { enabled: boolean; endpoint: string; privacyNoticeUrl: LocalizedText } = {
  enabled: true,
  endpoint: '/api/contact',
  privacyNoticeUrl: { tr: '/tr/privacy/', en: '/privacy/' },
}
