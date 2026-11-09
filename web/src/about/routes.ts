import type { SiteLanguage } from '../../shared/types.ts'

export const SITE_PAGES = [
  { id: 'home', slug: 'about', legacy: '' },
  { id: 'institutions', slug: 'institutions', legacy: 'kurumlar' },
  { id: 'team', slug: 'team', legacy: 'ekip' },
  { id: 'project', slug: 'project', legacy: 'proje' },
  { id: 'demo', slug: 'demo-guide', legacy: 'demo' },
  { id: 'carbon', slug: 'carbon-impact', legacy: 'karbon' },
  { id: 'contact', slug: 'collaboration', legacy: 'iletisim' },
  { id: 'privacy', slug: 'privacy', legacy: 'aydinlatma', hidden: true },
] as const

export type PageId = typeof SITE_PAGES[number]['id']
export const DEMO_PATH = '/demo/'
export const SITE_LANGUAGES = ['en', 'tr'] as const

export function normalizedPath(pathname: string): string {
  return pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/')
}

export function pathLanguage(pathname: string): SiteLanguage {
  return normalizedPath(pathname).startsWith('/tr/') ? 'tr' : 'en'
}

export function localizedPath(pathname: string, language: SiteLanguage): string {
  const path = normalizedPath(pathname).replace(/^\/tr\//, '/')
  return language === 'tr' ? `/tr${path}` : path
}

export function pagePath(id: PageId, language: SiteLanguage = 'en'): string {
  const { slug } = SITE_PAGES.find((page) => page.id === id)!
  return localizedPath(`/${slug}/`, language)
}

export function currentPage(pathname: string): PageId | undefined {
  const path = localizedPath(pathname, 'en')
  return SITE_PAGES.find((page) => `/${page.slug}/` === path)?.id
}
