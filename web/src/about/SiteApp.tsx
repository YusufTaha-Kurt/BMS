import { ArrowLeft } from 'lucide-react'
import type { ComponentType } from 'react'
import { useI18n, withLanguage } from '../lib/i18n.tsx'
import { About } from './About.tsx'
import { TeamPage } from './TeamPage.tsx'
import { InstitutionsPage } from './InstitutionsPage.tsx'
import { CollaborationsPage } from './CollaborationsPage.tsx'
import { ProjectPage } from './ProjectPage.tsx'
import { CarbonPage } from './CarbonPage.tsx'
import { DemoPage } from './DemoPage.tsx'
import { PrivacyPage } from './PrivacyPage.tsx'
import { CONTENT } from './content/index.ts'
import { currentPage, pagePath, type PageId } from './routes.ts'
import { PageTemplate } from './components/PageTemplate.tsx'
import { SiteLayout } from './components/SiteLayout.tsx'

const PAGE_COMPONENTS: Record<PageId, ComponentType> = {
  home: About, team: TeamPage, institutions: InstitutionsPage, contact: CollaborationsPage,
  project: ProjectPage, carbon: CarbonPage, demo: DemoPage, privacy: PrivacyPage,
}

export function SiteApp() {
  const { language } = useI18n()
  const t = CONTENT[language].common
  const pageId = currentPage(window.location.pathname)
  const Page = pageId ? PAGE_COMPONENTS[pageId] : undefined
  return (
    <SiteLayout pageId={pageId}>
      {Page ? <Page /> : (
        <PageTemplate title={t.notFound.title} description={t.notFound.description}>
          <a className="text-link" href={withLanguage(pagePath('home'), language)}><ArrowLeft size={16} aria-hidden="true" />{t.backHome}</a>
        </PageTemplate>
      )}
    </SiteLayout>
  )
}
