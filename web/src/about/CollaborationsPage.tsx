import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useI18n, withLanguage } from '../lib/i18n.tsx'
import { TEAM_EMAIL } from '../site.ts'
import { CONTENT } from './content/index.ts'
import { COLLABORATIONS } from './organizations.ts'
import { pagePath } from './routes.ts'
import { PageTemplate } from './components/PageTemplate.tsx'
import { EmptyValue } from './components/EmptyValue.tsx'
import { OrganizationMark } from './components/OrganizationMark.tsx'
import { ContactForm } from './components/ContactForm.tsx'

function websiteUrl(value: string | undefined): string | undefined {
  if (!value) return
  try {
    const url = new URL(value)
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href
  } catch { /* An unverified or incomplete URL remains an empty field. */ }
}

export function CollaborationsPage() {
  const { language } = useI18n()
  const { common, organizations: t } = CONTENT[language]
  const page = common.pages.contact
  const copy = t.collaborations
  const email = TEAM_EMAIL.trim()
  const empty = () => <EmptyValue label={t.missing} />
  return (
    <PageTemplate title={page.title} description={page.description}>
      <section className="org-collaborations" aria-labelledby="collaborations-title">
        <h2 className="org-section-title" id="collaborations-title">{copy.heading}</h2>
        <p className="org-section-intro">{copy.intro}</p>
        <div className="org-grid collaboration-grid">{COLLABORATIONS.map((collaboration) => {
          const website = websiteUrl(collaboration.officialWebsite)
          return (
            <article className="org-card collaboration-card" key={collaboration.id} data-collaboration={collaboration.id}>
              <div className="org-card-heading"><OrganizationMark id={collaboration.id} name={collaboration.name} /><div><h3>{collaboration.name}</h3>{collaboration.legalName && <p className="org-legal-name">{collaboration.legalName}</p>}</div></div>
              <p className={`org-status${collaboration.status === 'confirmed' ? ' is-confirmed' : ''}`}>{copy.statuses[collaboration.status]}</p>
              <dl className="org-fields collaboration-fields">
                <div><dt>{copy.fields.proposal}</dt><dd>{collaboration.proposal?.[language]?.trim() || empty()}</dd></div>
                <div><dt>{copy.fields.approvedScope}</dt><dd>{collaboration.status === 'confirmed' && collaboration.approvedScope?.[language]?.trim() || empty()}</dd></div>
                <div><dt>{copy.fields.contribution}</dt><dd>{collaboration.status === 'confirmed' && collaboration.contribution?.[language]?.trim() || empty()}</dd></div>
                <div><dt>{copy.fields.website}</dt><dd>{website ? <a className="org-link" href={website} target="_blank" rel="noopener noreferrer" aria-label={`${collaboration.name} — ${t.officialWebsite} (${common.newTab})`}>{t.officialWebsite}<ArrowUpRight size={16} aria-hidden="true" /></a> : empty()}</dd></div>
              </dl>
            </article>
          )
        })}</div>
      </section>

      <section className="org-contact" aria-labelledby="contact-title">
        <div><h2 className="org-section-title" id="contact-title">{copy.contactTitle}</h2><p className="org-section-intro">{copy.contactText}</p></div>
        <dl className="org-fields"><div><dt>{copy.email}</dt><dd>{email ? <a className="org-email" href={`mailto:${email}`}>{email}</a> : empty()}</dd></div></dl>
      </section>

      <ContactForm />
      <div className="org-related">
        <a className="home-link" href={withLanguage(pagePath('institutions'), language)}>{copy.institutionsLink}<ArrowRight size={17} aria-hidden="true" /></a>
        <a className="home-link" href={withLanguage(pagePath('project'), language)}>{copy.projectLink}<ArrowRight size={17} aria-hidden="true" /></a>
      </div>
    </PageTemplate>
  )
}
