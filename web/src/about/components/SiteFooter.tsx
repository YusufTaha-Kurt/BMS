import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../../lib/i18n.tsx'
import { SITE_CONTENT_UPDATED, TEAM_EMAIL } from '../../site.ts'
import { CONTENT } from '../content/index.ts'

export function SiteFooter() {
  const { language, f } = useI18n()
  const t = CONTENT[language].common
  const email = TEAM_EMAIL.trim()
  return (
    <footer className="site-footer">
      <div className="page-width">
        <dl className="site-footer-grid">
          <div><dt>{t.footer.institution}</dt><dd>{t.institution}</dd></div>
          <div><dt>{t.footer.contact}</dt><dd>{email ? <a href={`mailto:${email}`}>{email}</a> : t.preparing}</dd></div>
          <div><dt>{t.footer.updated}</dt><dd><time dateTime={SITE_CONTENT_UPDATED}>{f.dateTr(SITE_CONTENT_UPDATED)}</time></dd></div>
          <div className="site-footer-sources"><dt>{t.footer.sources}</dt><dd>{t.footer.sourceNote}</dd></div>
        </dl>
        <div className="site-footer-bottom">
          <p>© {SITE_CONTENT_UPDATED.slice(0, 4)} BinBin Battery Intelligence. {t.footer.copyright}</p>
          <a href="#top">{t.footer.backTop}<ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  )
}
