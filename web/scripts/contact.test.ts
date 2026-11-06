// Faz 6 form kontrolleri: `npm run test:contact`. Gerçek e-posta gönderilmez; fetch taklit edilir.
import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { CONTACT_LIMITS, handleContact, PRIVACY_VERSION, validateContact } from '../api/contact.ts'

const valid = {
  name: 'Ayşe Yılmaz', organization: 'Örnek Kurum', email: 'ayse@example.org', phone: '+90 312 000 00 00',
  message: 'Pilot için veri paylaşımı ve saha desteği önermek istiyoruz.', consent: true, transferConsent: true,
}
const NOW = 1_800_000_000_000
const realFetch = globalThis.fetch
const ENV_KEYS = ['SUPABASE_URL', 'SUPABASE_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL', 'RESEND_API_KEY'] as const
afterEach(() => {
  globalThis.fetch = realFetch
  for (const key of ENV_KEYS) delete process.env[key]
})
const configure = (email = false) => {
  process.env.SUPABASE_URL = 'https://abc.supabase.co/'
  process.env.SUPABASE_KEY = 'sb_publishable_test'
  if (email) {
    process.env.CONTACT_TO_EMAIL = 'proje@example.edu.tr'
    process.env.CONTACT_FROM_EMAIL = 'form@example.edu.tr'
    process.env.RESEND_API_KEY = 'test-key'
  }
}
let ipCounter = 0
const post = (body: unknown, headers: Record<string, string> = {}) => new Request('https://site.example/api/contact', {
  method: 'POST',
  headers: { 'content-type': 'application/json', host: 'site.example', 'x-forwarded-for': `10.0.0.${++ipCounter}`, ...headers },
  body: JSON.stringify(body),
})
const submission = (extra: Record<string, unknown> = {}) => ({ ...valid, language: 'tr', website: '', startedAt: NOW - 10_000, ...extra })
const capture = (status = 200) => {
  const calls: { url: string; body: Record<string, unknown>; headers: Record<string, string> }[] = []
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), body: JSON.parse(String(init?.body)), headers: init?.headers as Record<string, string> })
    return new Response('{}', { status: String(url).includes('supabase') ? status : 200 })
  }) as typeof fetch
  return calls
}

test('validation: required fields, lengths, email/phone format and consent', () => {
  assert.deepEqual(validateContact(valid), {})
  assert.deepEqual(validateContact({ ...valid, phone: '' }), {})
  assert.deepEqual(validateContact({ name: ' ', organization: '', email: '', phone: '', message: '', consent: false, transferConsent: false }), {
    name: 'required', organization: 'required', email: 'required', message: 'required', consent: 'required', transferConsent: 'required',
  })
  assert.equal(validateContact({ ...valid, message: 'x'.repeat(CONTACT_LIMITS.message.min - 1) }).message, 'tooShort')
  assert.equal(validateContact({ ...valid, message: `  ${'x'.repeat(CONTACT_LIMITS.message.min - 1)}  ` }).message, 'tooShort')
  assert.equal(validateContact({ ...valid, message: 'x'.repeat(CONTACT_LIMITS.message.max + 1) }).message, 'tooLong')
  assert.equal(validateContact({ ...valid, name: 'A' }).name, 'tooShort')
  for (const email of ['ayse', 'ayse@', 'ayse@kurum', 'a b@kurum.org', 'a@kurum.o']) assert.equal(validateContact({ ...valid, email }).email, 'invalid', email)
  for (const phone of ['12345', 'telefon', '+90 abc 123']) assert.equal(validateContact({ ...valid, phone }).phone, 'invalid', phone)
})

test('server: method, origin and body checks', async () => {
  assert.equal((await handleContact(new Request('https://site.example/api/contact', { method: 'PUT' }), NOW)).status, 405)
  assert.deepEqual(await (await handleContact(new Request('https://site.example/api/contact'), NOW)).json(), { configured: false })
  configure()
  assert.deepEqual(await (await handleContact(new Request('https://site.example/api/contact'), NOW)).json(), { configured: true })
  for (const key of ENV_KEYS) delete process.env[key]
  assert.equal((await handleContact(post(submission(), { origin: 'https://evil.example' }), NOW)).status, 403)
  assert.equal((await handleContact(post(submission(), { origin: 'https://site.example' }), NOW)).status, 503)
  const notJson = new Request('https://site.example/api/contact', { method: 'POST', headers: { 'content-type': 'text/plain' }, body: 'x' })
  assert.equal((await handleContact(notJson, NOW)).status, 400)
  const broken = new Request('https://site.example/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{' })
  assert.equal((await handleContact(broken, NOW)).status, 400)
})

test('server: bot traps look successful but never send', async () => {
  configure()
  const calls = capture()
  for (const extra of [{ website: 'http://spam.example' }, { startedAt: NOW - 500 }, { startedAt: 0 }]) {
    const response = await handleContact(post(submission(extra)), NOW)
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { ok: true })
  }
  assert.equal(calls.length, 0)
})

test('server: invalid input returns field errors; missing configuration refuses submissions', async () => {
  configure()
  const calls = capture()
  const invalid = await handleContact(post(submission({ email: 'yanlis', consent: false, transferConsent: false })), NOW)
  assert.equal(invalid.status, 422)
  assert.deepEqual(await invalid.json(), { ok: false, error: 'invalid', fields: { email: 'invalid', consent: 'required', transferConsent: 'required' } })
  delete process.env.SUPABASE_KEY
  const closed = await handleContact(post(submission()), NOW)
  assert.equal(closed.status, 503)
  assert.deepEqual(await closed.json(), { ok: false, error: 'not_configured' })
  assert.equal(calls.length, 0)
})

test('server: stores the proposal in Supabase with consent records', async () => {
  configure()
  const calls = capture()
  const response = await handleContact(post(submission({ organization: 'Kurum\r\nBcc: x@evil.example', phone: '' })), NOW)
  assert.equal(response.status, 200)
  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, 'https://abc.supabase.co/rest/v1/collaboration_proposals')
  assert.equal(calls[0].headers.apikey, 'sb_publishable_test')
  assert.equal(calls[0].headers.Prefer, 'return=minimal')
  assert.deepEqual(calls[0].body, {
    name: 'Ayşe Yılmaz', organization: 'Kurum Bcc: x@evil.example', email: 'ayse@example.org', phone: null,
    message: valid.message, language: 'tr', consent_at: new Date(NOW).toISOString(), transfer_consent_at: new Date(NOW).toISOString(),
    privacy_version: PRIVACY_VERSION,
  })
})

test('server: optional email notification goes to the configured recipient', async () => {
  configure(true)
  const calls = capture()
  assert.equal((await handleContact(post(submission()), NOW)).status, 200)
  assert.equal(calls.length, 2)
  assert.equal(calls[1].url, 'https://api.resend.com/emails')
  assert.deepEqual(calls[1].body.to, ['proje@example.edu.tr'])
  assert.equal(calls[1].body.reply_to, 'ayse@example.org')
  assert.ok(!/[\r\n]/.test(String(calls[1].body.subject)))
})

test('server: delivery failure and rate limit are reported', async () => {
  configure()
  capture(500)
  const original = console.error
  console.error = () => {}
  assert.equal((await handleContact(post(submission()), NOW)).status, 502)
  console.error = original
  capture()
  const statuses: number[] = []
  for (let i = 0; i < 6; i++) statuses.push((await handleContact(post(submission(), { 'x-forwarded-for': '203.0.113.9' }), NOW + i)).status)
  assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429])
})
