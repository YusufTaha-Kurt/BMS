import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { MANAGERS } from './organizations.ts'
import { FOUNDATION_SOURCE, UNIVERSITY_SOURCE } from './sources.ts'
import { PageTemplate } from './components/PageTemplate.tsx'
import { OrganizationMark } from './components/OrganizationMark.tsx'

const SITES = { university: UNIVERSITY_SOURCE, foundation: FOUNDATION_SOURCE } as const

export function InstitutionsPage() {
  const { language } = useI18n()
  const { common, organizations: t } = CONTENT[language]
  const page = common.pages.institutions
  const copy = t.institutions
  const managers = MANAGERS.filter((manager) => manager.name)
  return (
    <PageTemplate title={page.title} description={page.description}>
      <div className="cards two">
        {copy.items.map((institution) => (
          <article className="card" key={institution.id}>
            <OrganizationMark id={institution.id} name={institution.name} />
            <h2>{institution.name}</h2>
            <p>{institution.text}</p>
            <a className="source-link" href={SITES[institution.id]} target="_blank" rel="noopener noreferrer">{t.officialWebsite}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> {institution.name} ({common.newTab})</span></a>
          </article>
        ))}
      </div>

      <section className="section" aria-labelledby="relationship-title">
        <h2 id="relationship-title">{copy.relationshipTitle}</h2>
        <div className="prose">
          <p>{copy.relationshipText}</p>
          <a className="source-link" href={FOUNDATION_SOURCE} target="_blank" rel="noopener noreferrer">{copy.relationshipSource}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> ({common.newTab})</span></a>
        </div>
      </section>

      {managers.length > 0 && (
        <section className="section" aria-labelledby="managers-title">
          <h2 id="managers-title">{copy.managersTitle}</h2>
          <div className="prose">
            <ul className="name-list">{managers.map((manager) => (
              <li key={manager.id}>
                <strong>{manager.name}</strong>
                {manager.confirmed && manager.role?.[language] && <span>{manager.role[language]}</span>}
                {manager.confirmed && manager.institution?.[language] && <span>{manager.institution[language]}</span>}
              </li>
            ))}</ul>
            {managers.some((manager) => !manager.confirmed) && <p className="muted">{copy.managersNote}</p>}
          </div>
        </section>
      )}
    </PageTemplate>
  )
}
