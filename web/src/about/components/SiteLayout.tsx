import { useEffect, type ReactNode } from 'react'
import { useI18n } from '../../lib/i18n.tsx'
import { CONTENT } from '../content/index.ts'
import type { PageId } from '../routes.ts'
import { SiteFooter } from './SiteFooter.tsx'
import { SiteHeader } from './SiteHeader.tsx'
import { PROJECT_NAME } from '../../site.ts'

export function SiteLayout({ pageId, children }: { pageId: PageId | undefined; children: ReactNode }) {
  const { language } = useI18n()
  const t = CONTENT[language].common
  const page = pageId ? t.pages[pageId] : t.notFound

  useEffect(() => {
    document.title = `${page.title} · ${PROJECT_NAME}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', page.description)
  }, [page])

  useEffect(() => {
    const revealHash = () => {
      let hash: string
      try { hash = decodeURIComponent(window.location.hash.slice(1)) } catch { return }
      const target = document.getElementById(hash)
      if (!target) return
      if (target instanceof HTMLDetailsElement) target.open = true
      // Only a section explicitly tied to a disclosure may reveal its child.
      // General destinations such as #main and #top preserve the user's choices.
      if (target.hasAttribute('data-hash-disclosure')) {
        const disclosure = target.querySelector(':scope > details')
        if (disclosure instanceof HTMLDetailsElement) disclosure.open = true
      }
      let parent = target.parentElement
      while (parent) { if (parent instanceof HTMLDetailsElement) parent.open = true; parent = parent.parentElement }
      target.scrollIntoView({ block: 'start', behavior: 'instant' })
    }
    const frame = requestAnimationFrame(revealHash)
    window.addEventListener('hashchange', revealHash)
    window.addEventListener('popstate', revealHash)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', revealHash); window.removeEventListener('popstate', revealHash) }
  }, [pageId, language])


  return (
    <div className="about-page" id="top">
      <a className="skip-link" href="#main">{t.skip}</a>
      <SiteHeader pageId={pageId} />
      <main id="main" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </div>
  )
}
