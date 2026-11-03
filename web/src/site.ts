// Stant/QR ve Hakkımızda sayfası ayarları. İletişim bilgilerini yalnız bu dosyadan değiştirin.

/** Yayındaki adres. Yerel çalıştırmada (localhost) QR yine bu adrese gider. */
export const SITE_URL = 'https://binbin-battery-intelligence.vercel.app'

export const ABOUT_PATH = 'hakkimizda/'

/** Project credits from the team's COP31 brochure. Individual roles are not specified. */
export const PROJECT_TEAM = [
  'Erhan Bülbül',
  'Gamze Geniş',
  'Gizem Geniş',
  'Ahmed Emre Demirel',
  'Yusuf Taha Kurt',
] as const

export const ACADEMIC_COORDINATOR = 'Barış Taha Uludağ'

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
  return `mailto:${to}?subject=${encodeURIComponent('BinBin Battery Intelligence')}`
}
