// Tarayıcıya bağlı paylaşım adresi; görünümün adres kuralları shared/view.ts içindedir.
import { writeView, type DemoView } from '../../shared/view.ts'
import { SITE_URL, type SiteLanguage } from '../site.ts'
import { DEMO_PATH, localizedPath } from '../about/routes.ts'

export { DEFAULT_DEMO_VIEW, readView, writeView, type DemoView } from '../../shared/view.ts'

/** Paylaşılabilir pasaport adresi. Yerel kopyada da yayındaki adrese gider (QR telefonda açılabilsin). */
export function passportUrl(view: Omit<DemoView, 'tab'>, language: SiteLanguage): string {
  const { protocol, hostname, origin } = window.location
  const local = protocol === 'file:' || hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')
  const base = local ? SITE_URL : origin
  const params = writeView(new URLSearchParams(), { ...view, tab: 'passport' })
  // Pasaport bağlantısı her zaman kimliği taşır; varsayılan batarya da açıkça yazılır.
  if (!params.has('battery')) params.set('battery', view.batteryId)
  return `${base}${localizedPath(DEMO_PATH, language)}?${params.toString()}`
}
