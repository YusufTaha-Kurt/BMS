import { ORGANIZATION_ASSETS, type OrganizationId } from '../organizations.ts'

/** Logo dosyası yoksa hiçbir şey çizilmez. Koyu logo varsa tema değişince o gösterilir. */
export function OrganizationMark({ id, name, className = 'org-logo' }: { id: OrganizationId; name: string; className?: string }) {
  const asset = ORGANIZATION_ASSETS[id]
  if (!asset.approved || !asset.src) return null
  if (!asset.srcDark) {
    return <img className={id === 'university' ? `${className} university-logo` : className} src={asset.src} alt={name} />
  }
  return (
    <>
      <img className={`${className} logo-for-light`} src={asset.src} alt={name} />
      <img className={`${className} logo-for-dark`} src={asset.srcDark} alt={name} />
    </>
  )
}
