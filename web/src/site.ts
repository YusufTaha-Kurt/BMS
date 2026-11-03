// Stant/QR ve Hakkımızda sayfası ayarları. İletişim bilgilerini yalnız bu dosyadan değiştirin.
import type { SiteLanguage } from '../shared/types.ts'
export type { SiteLanguage } from '../shared/types.ts'

/** Yayındaki adres. Yerel çalıştırmada (localhost) QR yine bu adrese gider. */
export const SITE_URL = 'https://binbin-battery-intelligence.vercel.app'

export const ABOUT_PATH = 'hakkimizda/'

export type LocalizedText = Partial<Record<SiteLanguage, string>>

export interface TeamMember {
  id: string
  name: string
  role?: LocalizedText
  bio?: LocalizedText
  photo?: string
  links?: { label: string; url: string }[]
}

/** Display order is intentional. Add supplied biographies, roles, photos and links here. */
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
}

export interface Contact {
  name: string
  role: string
  email: string
}

/** Add verified public contact addresses here when available. Empty means no email link is shown. */
export const CONTACTS: Contact[] = []

/** Herkese tek seferde yazmak için ortak adres (ör. ekip@...). Boş bırakılırsa tüm adresler kullanılır. */
export const TEAM_EMAIL = ''

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

export function mailtoAll(): string {
  const to = TEAM_EMAIL || CONTACTS.map((c) => c.email).join(',')
  return `mailto:${to}?subject=${encodeURIComponent('Battery Intelligence')}`
}
