// Stant/QR ve tanıtım sayfası ayarları. Projenin ortak e-posta adresi yoktur; iletişim formla yapılır.
import type { SiteLanguage } from '../shared/types.ts'
import barisPhoto from './about/assets/people/baris-taha-uludag.jpg'
import erhanPhoto from './about/assets/people/erhan-bulbul.jpg'
import yusufPhoto from './about/assets/people/yusuf-taha-kurt.jpg'
import ahmedPhoto from './about/assets/people/ahmed-emre-demirel.jpg'
export type { SiteLanguage } from '../shared/types.ts'

/** Yayındaki adres. Yerel çalıştırmada (localhost) QR yine bu adrese gider. */
export const SITE_URL = 'https://binbin-battery-intelligence.vercel.app'

export const ABOUT_PATH = 'hakkimizda/'
export const PROJECT_NAME = 'BinBin Battery Intelligence'

/** Actual editorial update, not the visitor's clock or the build date. */
export const SITE_CONTENT_UPDATED = '2026-11-04'

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
  { id: 'gizem', name: 'Gizem Geniş' },
  { id: 'gamze', name: 'Gamze Geniş' },
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
      tr: 'Büyük dil modeli tabanlı sistemler, RAG mimarileri ve istem mühendisliği üzerine çalışan dördüncü sınıf bilgisayar mühendisliği öğrencisi. Fikirleri uçtan uca çalışan ürünlere dönüştürmeye ve model çıktılarını sistematik değerlendirmeyle iyileştirmeye odaklanır.',
      en: 'A fourth-year computer engineering student working on LLM-based systems, RAG architectures and prompt engineering. Focused on turning ideas into working end-to-end products and improving model outputs through systematic evaluation.',
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
  privacyNoticeUrl: { tr: '/hakkimizda/aydinlatma/?lang=tr', en: '/hakkimizda/aydinlatma/?lang=en' },
}

/**
 * QR'ın göstereceği Hakkımızda adresi. Uygulama yayındaki bir alan adında açıldıysa o adres,
 * localhost / dosya üzerinden açıldıysa SITE_URL kullanılır; böylece stanttaki yerel kopya da doğru adresi verir.
 */
export function aboutUrl(): string {
  const { protocol, hostname, origin } = window.location
  const local = protocol === 'file:' || hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')
  const base = local ? SITE_URL : origin
  return `${base.replace(/\/$/, '')}/${ABOUT_PATH}`
}
