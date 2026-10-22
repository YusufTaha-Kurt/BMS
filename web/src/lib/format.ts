export const num = (n: number | null | undefined, d = 1) =>
  n === null || n === undefined
    ? '—'
    : n.toLocaleString('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d })

export const withUnit = (n: number | null | undefined, unit: string, d = 1) =>
  n === null || n === undefined ? 'Ölçüm yok' : `${num(n, d)} ${unit}`

export const pct = (n: number | null | undefined, d = 1) =>
  n === null || n === undefined ? 'Ölçüm yok' : `%${num(n, d)}`

export const signed = (n: number, d = 1) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${num(Math.abs(n), d)}`

export const dateShort = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', timeZone: 'UTC' })

export const dateTr = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
