import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { useEffect } from 'react'
import { COORDINATOR_PROFILE, PROJECT_TEAM, type SiteLanguage, type TeamMember } from '../site.ts'
import { useI18n } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { PageTemplate } from './components/PageTemplate.tsx'
import { TEAM_CV, type MemberCv } from './teamCv.ts'

const FIELDS = ['role', 'workPackage', 'contribution', 'bio'] as const

function details(member: TeamMember, language: SiteLanguage) {
  const fields = FIELDS.map((key) => [key, member[key]?.[language]?.trim()] as const).filter(([, value]) => value)
  const links = (member.links ?? []).filter((link) => /^https?:\/\//i.test(link.url))
  return { fields, links }
}

/** Bilgisi olan kişi kendi satırında açılır. Bilgisi olmayan kişi yalnız adıyla listelenir. */
function Person({ member, language, showRole = true }: { member: TeamMember; language: SiteLanguage; showRole?: boolean }) {
  const { team: t, common } = CONTENT[language]
  const info = details(member, language)
  const cv: MemberCv | undefined = TEAM_CV[member.id]
  const role = showRole ? (member.role?.[language]?.trim() || cv?.headline[language]) : undefined
  const avatar = member.photo
    ? <img className="person-avatar" src={member.photo} alt="" width="56" height="56" loading="lazy" />
    : <span className="person-avatar person-avatar-empty" aria-hidden="true">{member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>
  const fields = info.fields.length > 0 || info.links.length > 0 || Boolean(cv)
  if (!fields) return <div className="person">{avatar}<strong>{member.name}</strong>{role && <span>{role}</span>}</div>
  return (
    <details className="person" name="team-profiles" id={`profile-${member.id}`}>
      <summary>{avatar}<strong>{member.name}</strong>{role && <span>{role}</span>}<ChevronDown size={20} aria-hidden="true" /></summary>
      <div className="person-body">
        <dl>
          {info.fields.map(([key, value]) => <div key={key}><dt>{t.fields[key]}</dt><dd>{value}</dd></div>)}
          {info.links.length > 0 && <div><dt>{t.fields.links}</dt><dd className="person-links">{info.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{typeof link.label === 'string' ? link.label : link.label[language] || link.url}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> ({common.newTab})</span></a>
          ))}</dd></div>}
        </dl>
        {cv && cv.sections.map((section) => (
          <section className="cv-section" key={section.id} aria-label={t.sections[section.id]}>
            <h3>{t.sections[section.id]}</h3>
            <ul>{section.items.map((item, index) => (
              <li key={index}>
                <div className="cv-head">
                  <strong>{item.title[language]}</strong>
                  {item.date?.[language] && <span className="cv-date">{item.date[language]}</span>}
                </div>
                {item.detail?.[language] && <p className="cv-detail">{item.detail[language]}</p>}
                {item.points && <ul className="cv-points">{item.points.map((point, k) => <li key={k}>{point[language]}</li>)}</ul>}
              </li>
            ))}</ul>
          </section>
        ))}
      </div>
    </details>
  )
}

export function TeamPage() {
  const { language } = useI18n()
  const { team: t, common } = CONTENT[language]
  const page = common.pages.team
  useEffect(() => {
    const openLinkedProfile = () => {
      const target = document.getElementById(window.location.hash.slice(1))
      if (target instanceof HTMLDetailsElement) {
        target.open = true
        target.scrollIntoView({ block: 'start' })
      }
    }
    openLinkedProfile()
    window.addEventListener('hashchange', openLinkedProfile)
    return () => window.removeEventListener('hashchange', openLinkedProfile)
  }, [])
  return (
    <PageTemplate title={page.title} description={page.description}>
      <section className="section" aria-labelledby="members-title">
        <h2 id="members-title">{t.members}</h2>
        <ul className="people">{PROJECT_TEAM.map((member) => <li key={member.id}><Person member={member} language={language} /></li>)}</ul>
      </section>
      <section className="section" aria-labelledby="coordinator-title">
        <h2 id="coordinator-title">{t.coordinator}</h2>
        <ul className="people"><li><Person member={COORDINATOR_PROFILE} language={language} showRole={false} /></li></ul>
      </section>
    </PageTemplate>
  )
}
