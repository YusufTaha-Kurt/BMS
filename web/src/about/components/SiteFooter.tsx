import { ArrowUp } from 'lucide-react'
import { useI18n } from '../../lib/i18n.tsx'
import { SITE_CONTENT_UPDATED } from '../../site.ts'
import { CONTENT } from '../content/index.ts'
import cop31Logo from '../assets/logo-cop31.png'

export function SiteFooter() {
  const { language, f } = useI18n()
  const t = CONTENT[language].common
  return (
    <footer className="site-footer">
      <div className="page-width site-footer-inner">
        <img className="site-footer-logo" src={cop31Logo} alt={t.cop31Logo} width="56" height="77" />
        <p>
          © {SITE_CONTENT_UPDATED.slice(0, 4)} BinBin Battery Intelligence. {t.footer.team}.<br />
          {t.footer.updated} <time dateTime={SITE_CONTENT_UPDATED}>{f.dateTr(SITE_CONTENT_UPDATED)}</time>
        </p>
        <a href="#top">{t.footer.backTop}<ArrowUp size={15} aria-hidden="true" /></a>
      </div>
    </footer>
  )
}
