import qrcode from 'qrcode-generator'
import { useMemo } from 'react'

/**
 * Bağımlılığı küçük, tarayıcıda üretilen QR. Okunabilirlik için koyu tema içinde de
 * beyaz zemin + 4 modül sessiz alan kullanılır.
 */
export function QrCode({ value, size = 160, className = '', label }: { value: string; size?: number; className?: string; label?: string }) {
  const { path, n } = useMemo(() => {
    const qr = qrcode(0, 'M')
    qr.addData(value)
    qr.make()
    const count = qr.getModuleCount()
    let d = ''
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) d += `M${c + 4} ${r + 4}h1v1h-1z`
      }
    }
    return { path: d, n: count + 8 }
  }, [value])

  return (
    <svg
      role="img"
      aria-label={label ?? `QR kod: ${value}`}
      viewBox={`0 0 ${n} ${n}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={`rounded-lg bg-white ${className}`}
    >
      <path d={path} fill="#0a1224" />
    </svg>
  )
}
