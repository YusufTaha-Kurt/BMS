/** Paths also supply Vite's HTML entries. Keep the printed QR and demo root stable. */
export const SITE_PAGES = [
  { id: 'home', slug: '' },
  { id: 'institutions', slug: 'kurumlar' },
  { id: 'team', slug: 'ekip' },
  { id: 'project', slug: 'proje' },
  { id: 'demo', slug: 'demo' },
  { id: 'carbon', slug: 'karbon' },
  { id: 'contact', slug: 'iletisim' },
  { id: 'privacy', slug: 'aydinlatma', hidden: true },
] as const

export type PageId = typeof SITE_PAGES[number]['id']

export function pagePath(id: PageId): string {
  const { slug } = SITE_PAGES.find((page) => page.id === id)!
  return `/hakkimizda/${slug ? `${slug}/` : ''}`
}

export function currentPage(pathname: string): PageId | undefined {
  const normalized = pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/')
  return SITE_PAGES.find((page) => pagePath(page.id) === normalized)?.id
}
