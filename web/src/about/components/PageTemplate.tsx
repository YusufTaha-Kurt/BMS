import type { ReactNode } from 'react'
import { useI18n } from '../../lib/i18n.tsx'
import { CONTENT } from '../content/index.ts'

/** Content phases can supply their own sections inside the same page structure. */
export function PageTemplate({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  const { language } = useI18n()
  return (
    <div className="page-width site-content-page">
      <div className="site-page-heading">
        <p className="eyebrow section-label">{CONTENT[language].common.institution} · COP31</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  )
}
