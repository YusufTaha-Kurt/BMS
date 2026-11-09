import type { SiteLanguage } from '../../shared/types.ts'
import { metadataLinks, metadataTags, type siteMetadata } from './pageMetadata.ts'

export function applyPageMetadata(metadata: ReturnType<typeof siteMetadata>, language: SiteLanguage) {
  document.title = metadata.title
  for (const [key, content] of Object.entries(metadataTags(metadata, language))) {
    const attribute = key.startsWith('og:') ? 'property' : 'name'
    document.querySelector(`meta[${attribute}="${key}"]`)?.setAttribute('content', content)
  }
  const links = metadataLinks(metadata, language)
  for (const { rel, hreflang, href } of links) {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
    document.querySelector(selector)?.setAttribute('href', href)
  }
}
