import { Loader2, RefreshCw, TriangleAlert } from 'lucide-react'
import type { LoadError } from '../lib/loadJson.ts'

export function Loading({ label = 'Yükleniyor…', className = '' }: { label?: string; className?: string }) {
  return (
    <div role="status" className={`flex items-center justify-center gap-2 text-sm text-mute ${className}`}>
      <Loader2 aria-hidden className="size-4 animate-spin" />
      {label}
    </div>
  )
}

export function ErrorBox({
  error,
  what,
  onRetry,
  className = '',
}: {
  error: LoadError
  what: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div role="alert" className={`rounded-lg border border-crit-line bg-crit-bg p-4 text-sm ${className}`}>
      <div className="flex items-center gap-2 font-semibold text-crit">
        <TriangleAlert aria-hidden className="size-4" />
        {what}: {error.kind === 'missing' ? 'dosya eksik' : 'okuma başarısız'}
      </div>
      <p className="mt-1 text-mute">
        {error.message}
        {error.kind === 'missing' && (
          <>
            {' '}
            Veriyi <code className="rounded bg-bg px-1">npm run data</code> ile üretin.
          </>
        )}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-3 py-1.5 text-xs font-semibold hover:border-accent"
        >
          <RefreshCw aria-hidden className="size-3.5" /> Yeniden dene
        </button>
      )}
    </div>
  )
}
