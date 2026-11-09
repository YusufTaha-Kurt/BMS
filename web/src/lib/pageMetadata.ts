import { commonEn, commonTr } from '../about/content/common.ts'
import { DEMO_PATH, localizedPath, pagePath, type PageId } from '../about/routes.ts'
import { PROJECT_NAME, PROJECT_NAME_TR, SITE_URL, TEAM_NAME } from '../siteIdentity.ts'
import type { SiteLanguage } from '../../shared/types.ts'

export function siteMetadata(page: PageId | undefined, language: SiteLanguage) {
  const copy = language === 'tr' ? commonTr : commonEn
  const info = page ? copy.pages[page] : copy.notFound
  const shortTitle = page && page !== 'home' ? copy.pages[page].label : info.title
  const title = page === 'demo' ? (language === 'tr' ? 'Demo rehberi' : 'Demo guide') : shortTitle
  return {
    title: `${title} · ${TEAM_NAME}`,
    shareTitle: `${page === 'home' ? (language === 'tr' ? PROJECT_NAME_TR : PROJECT_NAME) : info.title} · ${TEAM_NAME}`,
    description: info.description,
    image: `/social/project-${language}.jpg?v=2`,
    imageAlt: language === 'tr' ? `${TEAM_NAME} batarya yönetimi projesi` : `${TEAM_NAME} battery management project`,
    canonical: page ? SITE_URL + pagePath(page, language) : undefined,
    alternate: page ? SITE_URL + pagePath(page, language === 'tr' ? 'en' : 'tr') : undefined,
    noindex: !page,
  }
}

export function demoMetadata(language: SiteLanguage) {
  const title = language === 'tr' ? 'Batarya yönetimi demosu' : 'Battery Management Demo'
  return {
    title: `${title} · ${TEAM_NAME}`,
    shareTitle: `${title} · ${TEAM_NAME}`,
    description: language === 'tr'
      ? 'Batarya sağlığını, bakım önceliğini ve Dijital Batarya Pasaportunu sentetik filo verileriyle inceleyin.'
      : 'Explore battery health, maintenance priorities and the Digital Battery Passport with synthetic fleet data.',
    image: `/social/demo-${language}.jpg?v=2`,
    imageAlt: language === 'tr' ? `${TEAM_NAME} sentetik batarya verileri demo ekranı` : `${TEAM_NAME} demo screen with synthetic battery data`,
    canonical: SITE_URL + localizedPath(DEMO_PATH, language),
    alternate: SITE_URL + localizedPath(DEMO_PATH, language === 'tr' ? 'en' : 'tr'),
    noindex: true,
  }
}

export function metadataTags(metadata: ReturnType<typeof siteMetadata>, language: SiteLanguage): Record<string, string> {
  return {
    description: metadata.description,
    'og:title': metadata.shareTitle,
    'og:description': metadata.description,
    'og:site_name': TEAM_NAME,
    'og:type': 'website',
    'og:locale': language === 'tr' ? 'tr_TR' : 'en_US',
    'og:locale:alternate': language === 'tr' ? 'en_US' : 'tr_TR',
    ...(metadata.canonical && { 'og:url': metadata.canonical }),
    'og:image': SITE_URL + metadata.image,
    'og:image:type': 'image/jpeg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': metadata.imageAlt,
    'twitter:card': 'summary_large_image',
    ...(metadata.noindex && { robots: 'noindex' }),
  }
}

export function metadataLinks(metadata: ReturnType<typeof siteMetadata>, language: SiteLanguage) {
  const { canonical, alternate } = metadata
  if (!canonical || !alternate) return []
  const englishUrl = language === 'en' ? canonical : alternate
  const turkishUrl = language === 'tr' ? canonical : alternate
  return [
    { rel: 'canonical', href: canonical },
    { rel: 'alternate', hreflang: 'en', href: englishUrl },
    { rel: 'alternate', hreflang: 'tr', href: turkishUrl },
    { rel: 'alternate', hreflang: 'x-default', href: englishUrl },
  ]
}
