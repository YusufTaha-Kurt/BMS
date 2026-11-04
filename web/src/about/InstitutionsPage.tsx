import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useI18n, withLanguage } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { MANAGERS } from './organizations.ts'
import { FOUNDATION_SOURCE } from './sources.ts'
import { pagePath } from './routes.ts'
import { PageTemplate } from './components/PageTemplate.tsx'
import { EmptyValue } from './components/EmptyValue.tsx'
import { OrganizationMark } from './components/OrganizationMark.tsx'

export function InstitutionsPage() {
  const { language } = useI18n()
  const { common, home, organizations: t } = CONTENT[language]
  const page = common.pages.institutions
  const copy = t.institutions
  const empty = () => <EmptyValue label={t.missing} />
  return (
    <PageTemplate title={page.title} description={page.description}>
      <div className="org-institutions org-grid">
        {home.institutions.items.map((institution) => (
          <article className="org-card" key={institution.id}>
            <div className="org-card-heading"><OrganizationMark id={institution.id} name={institution.name} /><h2>{institution.name}</h2></div>
            <p className="org-description">{institution.text}</p>
            <a className="org-link" href={institution.url} target="_blank" rel="noopener noreferrer" aria-label={`${institution.name} — ${t.officialWebsite} (${common.newTab})`}>{t.officialWebsite}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </article>
        ))}
      </div>

      <section className="org-relationship" aria-labelledby="relationship-title">
        <h2 id="relationship-title">{copy.relationshipTitle}</h2>
        <p>{copy.relationshipText}</p>
        <a className="org-link" href={FOUNDATION_SOURCE} target="_blank" rel="noopener noreferrer">{copy.source}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> ({common.newTab})</span></a>
      </section>

      <section className="org-leadership" aria-labelledby="leadership-title">
        <h2 className="org-section-title" id="leadership-title">{copy.managersTitle}</h2>
        <p className="org-section-intro">{copy.managersIntro}</p>
        <div className="org-grid manager-grid">{MANAGERS.map((manager) => (
          <article className="org-card manager-card" key={manager.id} data-manager={manager.id}>
            <div className="manager-heading"><h3>{manager.name || copy.researchSlot}</h3><span className={`org-status${manager.confirmed ? ' is-confirmed' : ''}`}>{manager.confirmed ? copy.confirmed : copy.pending}</span></div>
            <dl className="org-fields">
              {!manager.name && <div><dt>{copy.fields.name}</dt><dd>{empty()}</dd></div>}
              <div><dt>{copy.fields.role}</dt><dd>{manager.confirmed && manager.role?.[language]?.trim() || empty()}</dd></div>
              <div><dt>{copy.fields.institution}</dt><dd>{manager.confirmed && manager.institution?.[language]?.trim() || empty()}</dd></div>
              <div className="org-field-wide"><dt>{copy.fields.email}</dt><dd>{manager.confirmed && manager.officialEmail?.trim() ? <a className="org-email" href={`mailto:${manager.officialEmail.trim()}`}>{manager.officialEmail.trim()}</a> : empty()}</dd></div>
            </dl>
          </article>
        ))}</div>
      </section>
      <div className="org-related"><a className="home-link" href={withLanguage(pagePath('contact'), language)}>{copy.collaborationLink}<ArrowRight size={17} aria-hidden="true" /></a></div>
    </PageTemplate>
  )
}
