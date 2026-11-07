import { useI18n } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { COLLABORATIONS, ORGANIZATION_ASSETS } from './organizations.ts'
import { ContactForm } from './components/ContactForm.tsx'
import { OrganizationMark } from './components/OrganizationMark.tsx'
import { PageTemplate } from './components/PageTemplate.tsx'

function websiteUrl(value: string | undefined): string | undefined {
  if (!value) return
  try {
    const url = new URL(value)
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href
  } catch { /* Doğrulanmamış adres gösterilmez. */ }
}

export function CollaborationsPage() {
  const { language } = useI18n()
  const { common, organizations: t } = CONTENT[language]
  const page = common.pages.contact
  const copy = t.collaborations
  return (
    <PageTemplate title={page.title} description={page.description}>
      <section className="section" aria-labelledby="collaborations-title">
        <h2 id="collaborations-title">{copy.heading}</h2>
        <ul className="supporters">{COLLABORATIONS.map((collaboration) => {
          const website = websiteUrl(collaboration.officialWebsite)
          const hasLogo = Boolean(ORGANIZATION_ASSETS[collaboration.id].src)
          // Logosu olan kuruluş yalnız logosuyla gösterilir. Logo yoksa adı yazılır.
          const mark = hasLogo
            ? <OrganizationMark id={collaboration.id} name={collaboration.name} className="supporter-logo" />
            : <strong>{collaboration.name}</strong>
          return (
            <li key={collaboration.id} data-collaboration={collaboration.id}>
              {website
                ? <a className="supporter-link" href={website} target="_blank" rel="noopener noreferrer">{mark}<span className="sr-only"> {t.officialWebsite} ({common.newTab})</span></a>
                : mark}
            </li>
          )
        })}</ul>
      </section>
      <ContactForm />
    </PageTemplate>
  )
}
