import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../../lib/i18n.tsx'
import { CONTENT } from '../content/index.ts'

export function SourceLinks({ links }: { links: { label: string; url: string }[] }) {
  const { language } = useI18n()
  return <ul className="source-list">{links.map(({ label, url }) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> ({CONTENT[language].common.newTab})</span></a></li>)}</ul>
}
