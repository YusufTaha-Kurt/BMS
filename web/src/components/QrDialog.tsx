import { ExternalLink, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useI18n } from '../lib/i18n.tsx'
import { aboutUrl } from '../site.ts'
import { QrCode } from './QrCode.tsx'

export function QrDialog({ onClose }: { onClose: () => void }) {
  const { l } = useI18n()
  const url = aboutUrl()
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current!
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialog.showModal()
    return () => { dialog.close(); trigger?.focus({ preventScroll: true }) }
  }, [])
  return <dialog ref={ref} aria-labelledby="qr-title" onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target !== event.currentTarget) return; const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose() }} className="m-auto w-[calc(100%_-_32px)] max-w-sm rounded-2xl border border-line bg-panel p-6 text-center text-ink shadow-2xl backdrop:bg-bg/85"><button type="button" onClick={onClose} aria-label={l('Close QR', 'QR’ı kapat')} className="absolute right-3 top-3 rounded-md p-1.5 text-mute hover:text-ink"><X className="size-5" aria-hidden /></button><p className="text-xs font-semibold uppercase tracking-widest text-accent">{l('Project and team', 'Proje ve ekip')}</p><h2 id="qr-title" className="mt-1 text-xl font-bold">{l('Scan to share the project', 'Projeyi paylaşmak için okutun')}</h2><QrCode value={url} size={280} label={l('Project page QR code', 'Proje sayfası QR kodu')} className="mx-auto mt-5 h-auto w-full max-w-[280px] p-2" /><a href={url} className="mt-4 inline-flex max-w-full items-center gap-1.5 break-all text-xs text-mute hover:text-ink">{l('Open project page', 'Proje sayfasını aç')}<ExternalLink className="size-3.5" aria-hidden /></a></dialog>
}
