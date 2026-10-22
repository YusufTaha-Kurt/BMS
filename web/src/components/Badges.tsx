import { CircleCheck, FileSearch, OctagonAlert, TriangleAlert, type LucideIcon } from 'lucide-react'
import { PRIORITY_LABEL } from '../../shared/rules.ts'
import type { Priority } from '../../shared/types.ts'
import { LEVEL_LABEL, LEVEL_PRIORITY, PRIORITY_STYLE, type Level } from '../lib/status.ts'

export const PRIORITY_ICON: Record<Priority, LucideIcon> = {
  critical: OctagonAlert,
  data_review: FileSearch,
  attention: TriangleAlert,
  normal: CircleCheck,
}

/** Renk + ikon + metin: durum yalnız renkle anlatılmaz. */
export function PriorityBadge({ priority, size = 'sm' }: { priority: Priority; size?: 'sm' | 'lg' }) {
  const s = PRIORITY_STYLE[priority]
  const Icon = PRIORITY_ICON[priority]
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border font-semibold ${s.bg} ${s.line} ${s.text} ${
        size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs'
      }`}
    >
      <Icon aria-hidden className={size === 'lg' ? 'size-4' : 'size-3.5'} />
      {PRIORITY_LABEL[priority]}
    </span>
  )
}

export function LevelBadge({ level }: { level: Level }) {
  const p = LEVEL_PRIORITY[level]
  const s = PRIORITY_STYLE[p]
  const Icon = PRIORITY_ICON[p]
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${s.text}`}>
      <Icon aria-hidden className="size-3.5" />
      {LEVEL_LABEL[level]}
    </span>
  )
}
