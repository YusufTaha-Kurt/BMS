import { useI18n } from '../../lib/i18n.tsx'
import { CONTENT } from '../content/index.ts'
import { ORGANIZATION_ASSETS, type OrganizationId } from '../organizations.ts'
import { EmptyValue } from './EmptyValue.tsx'

export function OrganizationMark({ id, name }: { id: OrganizationId; name: string }) {
  const { language } = useI18n()
  const t = CONTENT[language].organizations
  const asset = ORGANIZATION_ASSETS[id]
  if (asset.approved && asset.src) {
    return <figure className="org-logo"><img src={asset.src} alt={asset.alt?.[language] || name} />{asset.credit?.[language] && <figcaption>{asset.credit[language]}</figcaption>}</figure>
  }
  return <div className="org-logo-slot"><span>{t.logo}</span><EmptyValue label={t.missing} /></div>
}
