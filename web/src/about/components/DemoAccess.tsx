import { ArrowUpRight } from 'lucide-react'
import { useId } from 'react'
import { useI18n } from '../../lib/i18n.tsx'
import { CONTENT } from '../content/index.ts'
import { DEMO_PATH, localizedPath } from '../routes.ts'

/** Demo bağlantısı her yerde sentetik veri notunu taşır. Kompakt sürümde not yalnız ekran okuyucuya okunur. */
export function DemoAccess({ compact = false }: { compact?: boolean }) {
  const { language } = useI18n()
  const t = CONTENT[language].common
  const noteId = useId()
  return (
    <div className={compact ? 'demo-access demo-access-compact' : 'demo-access'}>
      <a className="button button-primary" href={localizedPath(DEMO_PATH, language)} target="_blank" rel="noopener noreferrer" aria-describedby={noteId}>
        {t.openDemo}<ArrowUpRight size={18} aria-hidden="true" />
        <span className="sr-only"> ({t.newTab})</span>
      </a>
      <p className={compact ? 'sr-only' : 'demo-access-note'} id={noteId}>{t.demoNote}</p>
    </div>
  )
}
