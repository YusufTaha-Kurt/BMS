import { ArrowLeft, Clock3 } from 'lucide-react'
import type { ComponentType } from 'react'
import { useI18n, withLanguage } from '../lib/i18n.tsx'
import { About } from './About.tsx'
import { TeamPage } from './TeamPage.tsx'
import { InstitutionsPage } from './InstitutionsPage.tsx'
import { CollaborationsPage } from './CollaborationsPage.tsx'
import { ProjectPage } from './ProjectPage.tsx'
import { CarbonPage } from './CarbonPage.tsx'
import { DemoPage } from './DemoPage.tsx'
import { CONTENT } from './content/index.ts'
import { currentPage, pagePath, type PageId } from './routes.ts'
import { DemoAccess } from './components/DemoAccess.tsx'
import { PageTemplate } from './components/PageTemplate.tsx'
import { SiteLayout } from './components/SiteLayout.tsx'

const PAGE_COMPONENTS: Partial<Record<PageId, ComponentType>> = {
  home: About, team: TeamPage, institutions: InstitutionsPage, contact: CollaborationsPage,
  project: ProjectPage, carbon: CarbonPage, demo: DemoPage,
}

export function SiteApp() {
  const { language } = useI18n()
  const t = CONTENT[language].common
  const pageId = currentPage(window.location.pathname)
  const Page = pageId ? PAGE_COMPONENTS[pageId] : undefined
  const page = pageId ? t.pages[pageId] : t.notFound
  return (
    <SiteLayout pageId={pageId}>
      {Page ? <Page /> : (
        <PageTemplate title={page.title} description={page.description}>
          {pageId && (
            <section className="site-pending" aria-labelledby="pending-title">
              <div className="site-pending-heading"><Clock3 size={22} aria-hidden="true" /><h2 id="pending-title">{t.preparing}</h2></div>
              <p>{t.pendingText}</p>
              {pageId === 'demo' && <DemoAccess />}
            </section>
          )}
          <a className="site-back-link" href={withLanguage(pagePath('home'), language)}><ArrowLeft size={17} aria-hidden="true" />{t.backHome}</a>
        </PageTemplate>
      )}
    </SiteLayout>
  )
}
