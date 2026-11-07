// İş birliği önerisi formu. Vercel bu dosyayı /api/contact fonksiyonu olarak yayımlar.
// Dosya bilerek bağımsızdır (import yok): tarayıcı aynı doğrulama kurallarını buradan alır,
// sunucu tarafı ek paket gerektirmez. Ayarlar ortam değişkenlerindedir:
//   SUPABASE_URL, SUPABASE_KEY   öneriler collaboration_proposals tablosuna yazılır (ana kayıt)
//   CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, RESEND_API_KEY   isteğe bağlı e-posta bildirimi
// Supabase ayarı yoksa fonksiyon başvuruyu kabul etmez ve 503 döner.
// SUPABASE_KEY yayımlanabilir (publishable/anon) anahtardır. Tablo yalnız ekleme izni verir, okuma vermez.

/** Formun onay kayıtlarında saklanan aydınlatma metni sürümü. Metin değişince güncellenir. */
export const PRIVACY_VERSION = '2026-11-04'

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  organization: { min: 2, max: 150 },
  email: { max: 254 },
  phone: { min: 7, max: 20 },
  message: { min: 20, max: 2000 },
  /** Formun açılışından gönderime kadar geçmesi gereken en kısa süre (bot tuzağı). */
  minFillMs: 3000,
} as const

export type ContactField = 'name' | 'organization' | 'email' | 'phone' | 'message' | 'consent' | 'transferConsent'
export type ContactErrorCode = 'required' | 'tooShort' | 'tooLong' | 'invalid'

export interface ContactInput {
  name: string
  organization: string
  email: string
  phone: string
  message: string
  consent: boolean
  /** Yurt dışındaki sunucularda işleme için açık rıza. */
  transferConsent: boolean
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
  if (input.transferConsent !== true) errors.transferConsent = 'required'
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
    transferConsent: b.transferConsent === true,
    language: b.language === 'tr' ? 'tr' : 'en',
    website: str(b.website, 200),
    startedAt: typeof b.startedAt === 'number' ? b.startedAt : 0,
  }
}

const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim()

/** Veri tabanı ayarı var mı. Form bu bilgiyle açılır, ayar yoksa kapalı kalır. */
export function contactConfigured(): boolean {
  const e = env()
  return Boolean(e.SUPABASE_URL?.trim() && e.SUPABASE_KEY?.trim())
}

export async function handleContact(request: Request, now = Date.now()): Promise<Response> {
  if (request.method === 'GET') return Response.json({ configured: contactConfigured() }, { headers: { 'Cache-Control': 'no-store' } })
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
  const supabaseUrl = e.SUPABASE_URL?.trim().replace(/\/$/, '')
  const supabaseKey = e.SUPABASE_KEY?.trim()
  if (!supabaseUrl || !supabaseKey) return json(503, { ok: false, error: 'not_configured' })

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  if (limited(ip, now)) return json(429, { ok: false, error: 'rate_limited' })

  const submittedAt = new Date(now).toISOString()
  const record = {
    name: oneLine(input.name),
    organization: oneLine(input.organization),
    email: oneLine(input.email),
    phone: oneLine(input.phone) || null,
    message: input.message.trim(),
    language: input.language,
    consent_at: submittedAt,
    transfer_consent_at: submittedAt,
    privacy_version: PRIVACY_VERSION,
  }
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/collaboration_proposals`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(record),
    })
    if (!response.ok) {
      // Nedeni Vercel günlüğünde görünsün. Kişisel veri yazılmaz, yalnız Supabase'in hata kodu ve mesajı.
      const detail = await response.json().catch(() => null) as { code?: string; message?: string } | null
      console.error('contact: Supabase kaydı başarısız', response.status, detail?.code ?? '', detail?.message ?? '')
      return json(502, { ok: false, error: 'delivery_failed' })
    }
  } catch (error) {
    console.error('contact: Supabase bağlantısı kurulamadı', error instanceof Error ? error.message : '')
    return json(502, { ok: false, error: 'delivery_failed' })
  }

  // E-posta bildirimi isteğe bağlıdır. Kayıt alındığı için bildirim hatası gönderimi başarısız saymaz.
  const to = e.CONTACT_TO_EMAIL?.trim()
  const from = e.CONTACT_FROM_EMAIL?.trim()
  const key = e.RESEND_API_KEY?.trim()
  if (to && from && key) {
    const text = [
      'İklimTekOst iş birliği önerisi',
      '',
      `Ad soyad ${record.name}`,
      `Kurum ${record.organization}`,
      `E-posta ${record.email}`,
      `Telefon ${record.phone ?? '-'}`,
      `Form dili ${input.language.toUpperCase()}`,
      `Gönderim ${submittedAt}`,
      '',
      record.message,
    ].join('\n')
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: to.split(',').map((address) => address.trim()).filter(Boolean),
          reply_to: record.email,
          subject: `İş birliği önerisi, ${record.organization.slice(0, 80)}`,
          text,
        }),
      })
    } catch { /* Bildirim gönderilemedi, kayıt veri tabanında duruyor. */ }
  }
  return json(200, { ok: true })
}

export default {
  fetch: (request: Request) => handleContact(request),
}
