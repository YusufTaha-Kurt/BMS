import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { UNIVERSITY_SOURCE } from './sources.ts'
import { PageTemplate } from './components/PageTemplate.tsx'

export function PrivacyPage() {
  const { language } = useI18n()
  const { common, privacy: t } = CONTENT[language]
  const page = common.pages.privacy
  return (
    <PageTemplate title={page.title} description={page.description}>
      <div className="prose lead">
        <p>{t.intro}</p>
        <p className="note">{t.version}</p>
      </div>
      {t.sections.map((section, i) => (
        <section className="section" key={section.title} aria-labelledby={`privacy-${i}`}>
          <h2 id={`privacy-${i}`}>{section.title}</h2>
          <div className="prose">
            {section.lead && <p>{section.lead}</p>}
            {section.items && <ul className="bullets">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            {section.paragraphs?.map((text) => <p key={text}>{text}</p>)}
            {i === 0 && <a className="source-link" href={UNIVERSITY_SOURCE} target="_blank" rel="noopener noreferrer">{t.universitySite}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> ({common.newTab})</span></a>}
          </div>
        </section>
      ))}
    </PageTemplate>
  )
}
