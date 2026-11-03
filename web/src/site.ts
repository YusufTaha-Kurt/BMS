// Stant/QR ve Hakkımızda sayfası ayarları. İletişim bilgilerini yalnız bu dosyadan değiştirin.

/** Yayındaki adres. Yerel çalıştırmada (localhost) QR yine bu adrese gider. */
export const SITE_URL = 'https://binbin-battery-intelligence.vercel.app'

export const ABOUT_PATH = 'hakkimizda/'

export interface Contact {
  name: string
  role: string
  email: string
}

/** TODO: Ekip üyelerinin ad, rol ve e-posta adreslerini girin. Sıra ekranda aynen korunur. */
export const CONTACTS: Contact[] = [
  { name: 'Ad Soyad', role: 'Yazılım ve veri', email: 'ad.soyad@ornek.com' },
  { name: 'Ad Soyad', role: 'Batarya ve donanım', email: 'ad.soyad2@ornek.com' },
]

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
