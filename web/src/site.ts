// Stant/QR ve tanıtım sayfası ayarları. Projenin ortak e-posta adresi yoktur; iletişim formla yapılır.
import type { SiteLanguage } from '../shared/types.ts'
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
  { id: 'erhan', name: 'Erhan Bülbül' },
  { id: 'yusuf', name: 'Yusuf Taha Kurt' },
  { id: 'ahmed', name: 'Ahmed Emre Demirel' },
]

export const ACADEMIC_COORDINATOR = 'Barış Taha Uludağ'

export const COORDINATOR_PROFILE: TeamMember = {
  id: 'coordinator',
  name: ACADEMIC_COORDINATOR,
  role: { en: 'Academic coordinator', tr: 'Akademik koordinatör' },
  workPackage: {
    en: 'Project coordination and BinBin communication',
    tr: 'Proje koordinasyonu ve BinBin iletişimi',
  },
  contribution: {
    en: 'Coordination of the project, communication with BinBin and phase transition decisions.',
    tr: 'Proje koordinasyonu, BinBin ile iletişim ve faz geçiş kararlarının koordinasyonu.',
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
