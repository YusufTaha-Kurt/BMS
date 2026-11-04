import { ArrowUpRight } from 'lucide-react'
import type { SiteLanguage, TeamMember } from '../site.ts'
import { CONTENT } from './content/index.ts'

function MissingValue({ label }: { label: string }) {
  return <span className="profile-empty"><span aria-hidden="true">—</span><span className="sr-only">{label}</span></span>
}

/** Inline content grows naturally as supplied biographies and links are added. */
export function ProfileDetails({ member, language }: { member: TeamMember; language: SiteLanguage }) {
  const t = CONTENT[language].team
  const fields = [
    ['role', member.role?.[language]],
    ['workPackage', member.workPackage?.[language]],
    ['contribution', member.contribution?.[language]],
    ['bio', member.bio?.[language]],
  ] as const
  const links = (member.links ?? []).filter((link) => /^(https?:\/\/|mailto:)/i.test(link.url))

  return (
    <div className="profile-details">
      {member.photo && <figure className="profile-figure"><img className="profile-photo" src={member.photo} alt={member.name} />{member.photoCredit?.[language] && <figcaption>{member.photoCredit[language]}</figcaption>}</figure>}
      <dl className="profile-fields">
        {fields.map(([key, value]) => <div key={key}><dt>{t.fields[key]}</dt><dd>{value?.trim() || <MissingValue label={t.missing} />}</dd></div>)}
        <div className="profile-links-field"><dt>{t.fields.links}</dt><dd>{links.length ? <div className="profile-links">{links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{typeof link.label === 'string' ? link.label : link.label[language] || link.url}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> ({CONTENT[language].common.newTab})</span></a>
        ))}</div> : <MissingValue label={t.missing} />}</dd></div>
      </dl>
    </div>
  )
}
