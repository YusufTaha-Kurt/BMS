import { ORGANIZATION_ASSETS, type OrganizationId } from '../organizations.ts'

/** Logo dosyası yoksa hiçbir şey çizilmez. */
export function OrganizationMark({ id, name, className = 'org-logo' }: { id: OrganizationId; name: string; className?: string }) {
  const asset = ORGANIZATION_ASSETS[id]
  if (!asset.approved || !asset.src) return null
  return <img className={className} src={asset.src} alt={name} />
}
