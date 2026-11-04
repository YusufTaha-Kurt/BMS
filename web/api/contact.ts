// Faz 6 — iş birliği önerisi formu. Vercel bu dosyayı /api/contact fonksiyonu olarak yayımlar.
// Dosya bilerek bağımsızdır (import yok): tarayıcı aynı doğrulama kurallarını buradan alır,
// sunucu tarafı ek paket gerektirmez. Gizli bilgiler yalnız ortam değişkenlerindedir:
//   CONTACT_TO_EMAIL   kurumun belirlediği alıcı adres (zorunlu)
//   CONTACT_FROM_EMAIL e-posta servisinde doğrulanmış gönderen adres (zorunlu)
//   RESEND_API_KEY     Resend API anahtarı (zorunlu)
// Değişkenlerden biri eksikse fonksiyon başvuruyu kabul etmez ve 503 döner.

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  organization: { min: 2, max: 150 },
  email: { max: 254 },
  phone: { min: 7, max: 20 },
  message: { min: 20, max: 2000 },
  /** Formun açılışından gönderime kadar geçmesi gereken en kısa süre (bot tuzağı). */
  minFillMs: 3000,
} as const

export type ContactField = 'name' | 'organization' | 'email' | 'phone' | 'message' | 'consent'
export type ContactErrorCode = 'required' | 'tooShort' | 'tooLong' | 'invalid'

export interface ContactInput {
  name: string
  organization: string
  email: string
  phone: string
  message: string
  consent: boolean
  language: 'en' | 'tr'
  /** Görünmez tuzak alanı; insanlar boş bırakır. */
  website: string
  /** Formun açıldığı an (ms). */
  startedAt: number
}

export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/
const PHONE = /^\+?[0-9 ()-]+$/

function length(value: string, field: ContactField, min: number, max: number, errors: ContactErrors) {
  const text = value.trim()
  if (!text) errors[field] = 'required'
  else if (text.length < min) errors[field] = 'tooShort'
  else if (text.length > max) errors[field] = 'tooLong'
}

/** Tarayıcı ve sunucu aynı kuralları kullanır; dönen nesne boşsa form geçerlidir. */
export function validateContact(input: Pick<ContactInput, ContactField>): ContactErrors {
  const errors: ContactErrors = {}
  length(input.name, 'name', CONTACT_LIMITS.name.min, CONTACT_LIMITS.name.max, errors)
  length(input.organization, 'organization', CONTACT_LIMITS.organization.min, CONTACT_LIMITS.organization.max, errors)
  const email = input.email.trim()
  if (!email) errors.email = 'required'
  else if (email.length > CONTACT_LIMITS.email.max) errors.email = 'tooLong'
  else if (!EMAIL.test(email)) errors.email = 'invalid'
  const phone = input.phone.trim()
  if (phone) {
    const digits = phone.replace(/\D/g, '').length
    if (!PHONE.test(phone) || digits < CONTACT_LIMITS.phone.min) errors.phone = 'invalid'
    else if (phone.length > CONTACT_LIMITS.phone.max) errors.phone = 'tooLong'
  }
  length(input.message, 'message', CONTACT_LIMITS.message.min, CONTACT_LIMITS.message.max, errors)
  if (input.consent !== true) errors.consent = 'required'
  return errors
}

export type ContactResult =
  | { ok: true }
  | { ok: false; error: 'invalid'; fields: ContactErrors }
  | { ok: false; error: 'not_configured' | 'rate_limited' | 'delivery_failed' | 'bad_request' | 'forbidden' | 'method_not_allowed' }

type Env = Record<string, string | undefined>
const env = (): Env => (globalThis as { process?: { env: Env } }).process?.env ?? {}

const json = (status: number, body: ContactResult) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

/** Aynı sunucu örneği içinde IP başına basit sınır. Kalıcı koruma için Vercel Firewall kuralı eklenebilir. */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const recent = new Map<string, number[]>()
function limited(ip: string, now: number): boolean {
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  hits.push(now)
  recent.set(ip, hits)
  if (recent.size > 5000) recent.clear()
  return hits.length > MAX_PER_WINDOW
}

const str = (value: unknown, max: number) => (typeof value === 'string' ? value.slice(0, max + 1) : '')

function parse(body: unknown): ContactInput | null {
  if (!body || typeof body !== 'object') return null
  const b = body as Record<string, unknown>
  return {
    name: str(b.name, CONTACT_LIMITS.name.max),
    organization: str(b.organization, CONTACT_LIMITS.organization.max),
    email: str(b.email, CONTACT_LIMITS.email.max),
    phone: str(b.phone, CONTACT_LIMITS.phone.max),
    message: str(b.message, CONTACT_LIMITS.message.max),
    consent: b.consent === true,
    language: b.language === 'tr' ? 'tr' : 'en',
    website: str(b.website, 200),
    startedAt: typeof b.startedAt === 'number' ? b.startedAt : 0,
  }
}

const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim()

export async function handleContact(request: Request, now = Date.now()): Promise<Response> {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'method_not_allowed' })

  // Başka sitelerden gönderilen formları reddet (Origin varsa aynı ana bilgisayar olmalı).
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (origin && host) {
    try { if (new URL(origin).host !== host) return json(403, { ok: false, error: 'forbidden' }) } catch { return json(403, { ok: false, error: 'forbidden' }) }
  }

  if (!(request.headers.get('content-type') ?? '').includes('application/json')) return json(400, { ok: false, error: 'bad_request' })
  const raw = await request.text()
  if (raw.length > 16_000) return json(400, { ok: false, error: 'bad_request' })
  let input: ContactInput | null
  try { input = parse(JSON.parse(raw)) } catch { input = null }
  if (!input) return json(400, { ok: false, error: 'bad_request' })

  // Bot tuzakları: başarılı görünür ama gönderilmez; bota ipucu verilmez.
  if (input.website.trim() || !input.startedAt || now - input.startedAt < CONTACT_LIMITS.minFillMs) return json(200, { ok: true })

  const fields = validateContact(input)
  if (Object.keys(fields).length) return json(422, { ok: false, error: 'invalid', fields })

  const e = env()
  const to = e.CONTACT_TO_EMAIL?.trim()
  const from = e.CONTACT_FROM_EMAIL?.trim()
  const key = e.RESEND_API_KEY?.trim()
  if (!to || !from || !key) return json(503, { ok: false, error: 'not_configured' })

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  if (limited(ip, now)) return json(429, { ok: false, error: 'rate_limited' })

  const text = [
    'BinBin Battery Intelligence — iş birliği önerisi / collaboration proposal',
    '',
    `Ad soyad / Name: ${oneLine(input.name)}`,
    `Kurum / Organization: ${oneLine(input.organization)}`,
    `E-posta / Email: ${oneLine(input.email)}`,
    `Telefon / Phone: ${oneLine(input.phone) || '—'}`,
    `Form dili / Form language: ${input.language.toUpperCase()}`,
    `Aydınlatma metni onayı / Privacy notice accepted: ${new Date(now).toISOString()}`,
    '',
    input.message.trim(),
  ].join('\n')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((address) => address.trim()).filter(Boolean),
        reply_to: oneLine(input.email),
        subject: `İş birliği önerisi: ${oneLine(input.organization).slice(0, 80)}`,
        text,
      }),
    })
    if (!response.ok) return json(502, { ok: false, error: 'delivery_failed' })
  } catch {
    return json(502, { ok: false, error: 'delivery_failed' })
  }
  return json(200, { ok: true })
}

export default {
  fetch: (request: Request) => handleContact(request),
}
