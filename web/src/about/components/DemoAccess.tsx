import { ArrowUpRight } from 'lucide-react'
import { useId } from 'react'
import { useI18n, withLanguage } from '../../lib/i18n.tsx'
import { CONTENT } from '../content/index.ts'

/** The disclosure travels with every launch link, including the shared header. */
export function DemoAccess({ compact = false }: { compact?: boolean }) {
  const { language } = useI18n()
  const t = CONTENT[language].common
  const noteId = useId()
  return (
    <div className={`demo-access${compact ? ' demo-access-compact' : ''}`}>
      <a className="button button-primary" href={withLanguage('/', language)} target="_blank" rel="noopener noreferrer" aria-describedby={noteId}>
        {t.openDemo}<ArrowUpRight size={18} aria-hidden="true" />
        <span className="sr-only"> ({t.newTab})</span>
      </a>
      <p className="demo-access-note" id={noteId}>{t.demoNote}</p>
    </div>
  )
}
