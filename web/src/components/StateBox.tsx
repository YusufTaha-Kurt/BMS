import { Loader2, RefreshCw, TriangleAlert } from 'lucide-react'
import type { LoadError } from '../lib/loadJson.ts'
import { useI18n } from '../lib/i18n.tsx'

export function Loading({ label, className = '' }: { label?: string; className?: string }) {
  const { l } = useI18n()
  return <div role="status" className={`flex items-center justify-center gap-2 text-sm text-mute ${className}`}><Loader2 aria-hidden className="size-4 animate-spin" />{label ?? l('Loading…', 'Yükleniyor…')}</div>
}
export function ErrorBox({ error, what, onRetry, className = '' }: { error: LoadError; what: string; onRetry?: () => void; className?: string }) {
  const { l } = useI18n()
  const messages = {
    missing: l('The requested demo data is unavailable.', 'İstenen demo verisi bulunamadı.'),
    network: l('Could not connect to the data server. Check your connection and retry.', 'Veri sunucusuna bağlanılamadı. Bağlantıyı kontrol edip yeniden deneyiniz.'),
    http: l(`The server returned ${error.httpStatus}. Please retry.`, `Sunucu ${error.httpStatus} yanıtını verdi. Yeniden deneyin.`),
    json: l('The demo data could not be read. Please retry.', 'Demo verisi okunamadı. Yeniden deneyiniz.'),
    unknown: l('An unexpected loading error occurred. Please retry.', 'Beklenmeyen bir yükleme hatası oluştu. Yeniden deneyiniz.'),
  }
  return <div role="alert" className={`rounded-lg border border-crit-line bg-crit-bg p-4 text-sm ${className}`}><div className="flex items-center gap-2 font-semibold text-crit"><TriangleAlert className="size-4" aria-hidden />{what}: {error.kind === 'missing' ? l('data unavailable', 'veri yok') : l('loading failed', 'yükleme başarısız')}</div><p className="mt-1 text-mute">{messages[error.code]}</p>{onRetry && <button type="button" onClick={onRetry} className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-3 py-1.5 text-xs font-semibold hover:border-accent"><RefreshCw size={14} aria-hidden />{l('Retry', 'Yeniden dene')}</button>}</div>
}
