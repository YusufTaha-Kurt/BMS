import { ArrowUp } from 'lucide-react'
import { useI18n } from '../../lib/i18n.tsx'
import { TEAM_NAME, SITE_CONTENT_UPDATED } from '../../site.ts'
import { CONTENT } from '../content/index.ts'
import { Cop31Mark } from './Cop31Mark.tsx'

export function SiteFooter() {
  const { language, f } = useI18n()
  const t = CONTENT[language].common
  return (
    <footer className="site-footer">
      <div className="page-width site-footer-inner">
        <Cop31Mark className="site-footer-logo" alt={t.cop31Logo} />
        <p>
          © {SITE_CONTENT_UPDATED.slice(0, 4)} {TEAM_NAME}. {t.footer.team}.<br />
          {t.footer.updated} <time dateTime={SITE_CONTENT_UPDATED}>{f.dateTr(SITE_CONTENT_UPDATED)}</time>
        </p>
        <a href="#top">{t.footer.backTop}<ArrowUp size={15} aria-hidden="true" /></a>
      </div>
    </footer>
  )
}
