import { ExternalLink, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { aboutUrl } from '../site.ts'
import { QrCode } from './QrCode.tsx'

/** Stantta ekrana büyük QR getirmek için tam ekran katman. */
export function QrDialog({ onClose }: { onClose: () => void }) {
  const url = aboutUrl()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-title"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/85 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border border-line bg-panel p-6 text-center shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-3 top-3 rounded-md p-1.5 text-mute hover:text-ink"
        >
          <X aria-hidden className="size-5" />
        </button>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Bizi tanıyın</p>
        <h2 id="qr-title" className="mt-1 text-xl font-bold">Telefonunuzla okutun</h2>
        <QrCode value={url} size={280} className="mx-auto mt-5 w-full max-w-[280px] h-auto p-2" />
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-mute hover:text-ink"
        >
          {url.replace(/^https?:\/\//, '')} <ExternalLink aria-hidden className="size-3.5" />
        </a>
      </div>
    </div>
  )
}
