import { ChevronDown } from 'lucide-react'
import { useEffect } from 'react'
import { COORDINATOR_PROFILE, PROJECT_TEAM } from '../site.ts'
import { useI18n } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { PageTemplate } from './components/PageTemplate.tsx'
import { ProfileDetails } from './ProfileDetails.tsx'

export function TeamPage() {
  const { language } = useI18n()
  const { team: t, common } = CONTENT[language]
  const page = common.pages.team
  useEffect(() => {
    const openLinkedProfile = () => {
      const target = document.getElementById(window.location.hash.slice(1))
      if (target instanceof HTMLDetailsElement && target.name === 'team-profiles') {
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
      <div className="team-roster">
        <h2 className="eyebrow section-label">{t.members}</h2>
        <ul>{PROJECT_TEAM.map((member, i) => (
          <li key={member.id}>
            <details className="member-profile" name="team-profiles" id={`profile-${member.id}`}>
              <summary className="profile-row">
                <span className="member-index" aria-hidden="true">0{i + 1}</span>
                <span className="member-copy"><strong>{member.name}</strong><span><span className="when-closed">{t.openProfile}</span><span className="when-open">{t.closeProfile}</span></span></span>
                <ChevronDown size={21} aria-hidden="true" />
              </summary>
              <ProfileDetails member={member} language={language} />
            </details>
          </li>
        ))}</ul>
        <section className="coordinator" aria-labelledby="coordinator-title">
          <h2 className="eyebrow section-label" id="coordinator-title">{t.coordinator}</h2>
          <details className="member-profile" name="team-profiles" id="profile-coordinator">
            <summary className="profile-row coordinator-profile">
              <span className="member-copy"><strong>{COORDINATOR_PROFILE.name}</strong><span><span className="when-closed">{t.openProfile}</span><span className="when-open">{t.closeProfile}</span></span></span>
              <ChevronDown size={21} aria-hidden="true" />
            </summary>
            <ProfileDetails member={COORDINATOR_PROFILE} language={language} />
          </details>
        </section>
      </div>
    </PageTemplate>
  )
}
