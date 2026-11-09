import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import {
  currentPage, DEMO_PATH, localizedPath, normalizedPath, pagePath, pathLanguage, SITE_LANGUAGES, SITE_PAGES,
} from '../src/about/routes.ts'
import { demoMetadata, metadataLinks, metadataTags, siteMetadata } from '../src/lib/pageMetadata.ts'
import { SITE_URL } from '../src/siteIdentity.ts'

const paths = SITE_LANGUAGES.flatMap((language) => [
  ...SITE_PAGES.map(({ id }) => pagePath(id, language)),
  localizedPath(DEMO_PATH, language),
])
const legacy = new Map([
  ['/', DEMO_PATH],
  ...SITE_PAGES.map(({ id, legacy }): [string, string] => [
    `/hakkimizda/${legacy ? `${legacy}/` : ''}`, pagePath(id),
  ]),
])

function legacyRedirect(request: IncomingMessage, response: ServerResponse, next: () => void) {
  const url = new URL(request.url ?? '/', 'http://localhost')
  const target = legacy.get(normalizedPath(url.pathname))
  if (target) {
    const language = url.searchParams.get('lang') === 'tr' ? 'tr' : 'en'
    response.writeHead(308, { Location: localizedPath(target, language) + url.search }).end()
    return
  }
  next()
}

const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;')

function renderHead(html: string, path: string) {
  const language = pathLanguage(path)
  const page = currentPage(path)
  const metadata = page ? siteMetadata(page, language) : demoMetadata(language)
  const tags = Object.entries(metadataTags(metadata, language)).map(([name, content]) =>
    `<meta ${name.startsWith('og:') ? 'property' : 'name'}="${name}" content="${escape(content)}" />`,
  )
  const links = metadataLinks(metadata, language).map(({ rel, hreflang, href }) =>
    `<link rel="${rel}"${hreflang ? ` hreflang="${hreflang}"` : ''} href="${escape(href)}" />`,
  )
  return html
    .replace('<html lang="en">', `<html lang="${language}">`)
    .replace('<!-- page-metadata -->', [`<title>${escape(metadata.title)}</title>`, ...tags, ...links].join('\n    '))
}

function sitemap() {
  const urls = SITE_PAGES.flatMap(({ id }) => {
    const en = SITE_URL + pagePath(id, 'en')
    const tr = SITE_URL + pagePath(id, 'tr')
    return [en, tr].map((url) => [
      '  <url>',
      `    <loc>${url}</loc>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${en}" />`,
      `    <xhtml:link rel="alternate" hreflang="tr" href="${tr}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />`,
      '  </url>',
    ].join('\n'))
  })
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

export function sitePages(): Plugin {
  return {
    name: 'sixhandle-site-pages',
    configureServer(server) {
      server.middlewares.use(legacyRedirect)
      server.middlewares.use((request, _response, next) => {
        const url = new URL(request.url ?? '/', 'http://localhost')
        const path = normalizedPath(url.pathname)
        if (paths.includes(path)) request.url = (currentPage(path) ? '/about/index.html' : '/demo/index.html') + url.search
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use(legacyRedirect)
    },
    transformIndexHtml(html, context) {
      if (!context.server) return html
      const path = new URL(context.originalUrl ?? context.path, 'http://localhost').pathname
      return renderHead(html, path)
    },
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        const about = bundle['about/index.html']
        const demo = bundle['demo/index.html']
        if (about?.type !== 'asset' || demo?.type !== 'asset') this.error('Site HTML templates are missing.')
        const aboutTemplate = String(about.source)
        const demoTemplate = String(demo.source)
        if (![aboutTemplate, demoTemplate].every((html) => html.includes('<!-- page-metadata -->'))) {
          this.error('Site HTML templates need a page-metadata marker.')
        }
        for (const path of paths) {
          const fileName = `${path.slice(1)}index.html`
          const source = renderHead(currentPage(path) ? aboutTemplate : demoTemplate, path)
          if (fileName === about.fileName) about.source = source
          else if (fileName === demo.fileName) demo.source = source
          else this.emitFile({ type: 'asset', fileName, source })
        }
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() })
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n` })
      },
    },
  }
}
