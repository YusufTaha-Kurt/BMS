import { ArrowUpRight } from 'lucide-react'
import type { SiteLanguage, TeamMember } from '../site.ts'

/** Inline content grows naturally as supplied biographies and links are added. */
export function ProfileDetails({ member, language }: { member: TeamMember; language: SiteLanguage }) {
  const bio = member.bio?.[language] || member.bio?.en
  const role = member.role?.[language] || member.role?.en
  const links = (member.links ?? []).filter((link) => /^(https?:\/\/|mailto:)/i.test(link.url))

  return (
    <div className="profile-details">
      {member.photo && <img className="profile-photo" src={member.photo} alt={member.name} />}
      {role && <p className="profile-role">{role}</p>}
      {bio && <p className="profile-bio">{bio}</p>}
      {!bio && links.length === 0 && <p className="profile-pending">{language === 'en'
        ? 'Biography and links will be shared here soon.'
        : 'Kısa tanıtım ve bağlantılar yakında burada paylaşılacak.'}</p>}
      {links.length > 0 && <div className="profile-links">{links.map((link) => (
        <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a>
      ))}</div>}
    </div>
  )
}
