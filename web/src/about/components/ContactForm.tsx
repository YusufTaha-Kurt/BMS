import { CircleAlert, CircleCheck, Send } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { CONTACT_LIMITS, validateContact, type ContactErrors, type ContactField, type ContactResult } from '../../../api/contact.ts'
import { useI18n } from '../../lib/i18n.tsx'
import { CONTACT_FORM } from '../../site.ts'
import { CONTENT } from '../content/index.ts'

type Values = { name: string; organization: string; email: string; phone: string; message: string; consent: boolean; website: string }
type Failure = 'not_configured' | 'rate_limited' | 'delivery_failed' | 'network' | 'generic'
const EMPTY: Values = { name: '', organization: '', email: '', phone: '', message: '', consent: false, website: '' }
const ORDER: ContactField[] = ['name', 'organization', 'email', 'phone', 'message', 'consent']

function httpsUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return
  try {
    const url = new URL(value, window.location.origin)
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href
  } catch { /* Geçersiz adres onaylı metin sayılmaz. */ }
}

export function ContactForm() {
  const { language } = useI18n()
  const copy = CONTENT[language].organizations.collaborations
  const t = copy.form
  const privacyUrl = httpsUrl(CONTACT_FORM.privacyNoticeUrl[language])
  const open = CONTACT_FORM.enabled && Boolean(privacyUrl)
  const id = useId()
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [failure, setFailure] = useState<Failure>('generic')
  const startedAt = useRef(0)
  const summaryRef = useRef<HTMLDivElement>(null)
  const failureRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => { startedAt.current = Date.now() }, [])
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
    if (status === 'error') failureRef.current?.focus()
  }, [status])

  const fieldId = (field: string) => `${id}-${field}`
  const message = (field: ContactField): string | undefined => {
    const code = errors[field]
    if (!code) return
    const limits = CONTACT_LIMITS[field as keyof typeof CONTACT_LIMITS] as { min?: number; max?: number } | undefined
    const fill = (text: string) => text.replace('{min}', String(limits?.min ?? '')).replace('{max}', String(limits?.max ?? ''))
    if (code === 'required') return field === 'phone' ? undefined : t.errors.required[field]
    if (code === 'tooShort') return fill(t.errors.tooShort)
    if (code === 'tooLong') return fill(t.errors.tooLong)
    return field === 'email' ? t.errors.invalidEmail : t.errors.invalidPhone
  }

  const update = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (attempted) setErrors(validateContact(next))
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!open || status === 'sending') return
    const found = validateContact(values)
    setAttempted(true)
    setErrors(found)
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setStatus('sending')
    try {
      const response = await fetch(CONTACT_FORM.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, language, startedAt: startedAt.current }),
      })
      const result = await response.json().catch(() => null) as ContactResult | null
      if (response.ok && result?.ok) {
        setStatus('success')
        return
      }
      if (result && !result.ok && result.error === 'invalid') {
        setErrors(result.fields)
        setStatus('idle')
        requestAnimationFrame(() => summaryRef.current?.focus())
        return
      }
      const code = result && !result.ok ? result.error : null
      setFailure(code === 'not_configured' || code === 'rate_limited' || code === 'delivery_failed' ? code : 'generic')
      setStatus('error')
    } catch {
      setFailure('network')
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setAttempted(false)
    setStatus('idle')
    startedAt.current = Date.now()
  }

  const listed = ORDER.filter((field) => message(field))
  const describedBy = (field: ContactField, hint?: boolean) =>
    [hint ? fieldId(`${field}-hint`) : '', message(field) ? fieldId(`${field}-error`) : ''].filter(Boolean).join(' ') || undefined
  const error = (field: ContactField) => message(field) && (
    <p className="contact-error" id={fieldId(`${field}-error`)}><CircleAlert size={16} aria-hidden="true" />{message(field)}</p>
  )
  const label = (field: keyof typeof t.labels, optional = false): ReactNode => (
    <label htmlFor={fieldId(field)}>{t.labels[field]}{optional && <span className="contact-optional"> ({t.optional})</span>}</label>
  )

  return (
    <section className="contact-form-section" id="collaboration-form" aria-labelledby="collaboration-form-title">
      <div className="contact-form-intro">
        <h2 className="org-section-title" id="collaboration-form-title">{copy.formTitle}</h2>
        <p className="org-section-intro">{copy.formText}</p>
        {!open && <p className="contact-closed" id={fieldId('closed')}>{t.closed}</p>}
      </div>

      {status === 'success' ? (
        <div className="contact-success" role="status">
          <CircleCheck size={28} aria-hidden="true" />
          <div>
            <h3 tabIndex={-1} ref={successRef}>{t.success.title}</h3>
            <p>{t.success.text}</p>
            <button type="button" className="button contact-secondary" onClick={reset}>{t.success.again}</button>
          </div>
        </div>
      ) : (
        <form className="contact-form" noValidate onSubmit={submit} aria-describedby={open ? undefined : fieldId('closed')}>
          {listed.length > 0 && (
            <div className="contact-summary" role="alert" tabIndex={-1} ref={summaryRef}>
              <p>{t.summaryTitle}</p>
              <ul>{listed.map((field) => <li key={field}><a href={`#${fieldId(field)}`}>{field === 'consent' ? t.errors.required.consent : `${t.labels[field as keyof typeof t.labels]}: ${message(field)}`}</a></li>)}</ul>
            </div>
          )}
          {status === 'error' && (
            <div className="contact-failure" role="alert" tabIndex={-1} ref={failureRef}>
              <p><strong>{t.failure.title}</strong></p>
              <p>{t.failure[failure]}</p>
            </div>
          )}
          <fieldset disabled={!open || status === 'sending'}>
            <legend className="sr-only">{copy.formTitle}</legend>
            <p className="contact-required-note">{t.intro}</p>
            <div className="contact-grid">
              <div className="contact-field">
                {label('name')}
                <input id={fieldId('name')} name="name" autoComplete="name" value={values.name} maxLength={CONTACT_LIMITS.name.max}
                  aria-invalid={Boolean(message('name'))} aria-describedby={describedBy('name')} onChange={(e) => update('name', e.target.value)} />
                {error('name')}
              </div>
              <div className="contact-field">
                {label('organization')}
                <input id={fieldId('organization')} name="organization" autoComplete="organization" value={values.organization} maxLength={CONTACT_LIMITS.organization.max}
                  aria-invalid={Boolean(message('organization'))} aria-describedby={describedBy('organization')} onChange={(e) => update('organization', e.target.value)} />
                {error('organization')}
              </div>
              <div className="contact-field">
                {label('email')}
                <p className="contact-hint" id={fieldId('email-hint')}>{t.hints.email}</p>
                <input id={fieldId('email')} name="email" type="email" autoComplete="email" inputMode="email" value={values.email} maxLength={CONTACT_LIMITS.email.max}
                  aria-invalid={Boolean(message('email'))} aria-describedby={describedBy('email', true)} onChange={(e) => update('email', e.target.value)} />
                {error('email')}
              </div>
              <div className="contact-field">
                {label('phone', true)}
                <p className="contact-hint" id={fieldId('phone-hint')}>{t.hints.phone}</p>
                <input id={fieldId('phone')} name="phone" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} maxLength={CONTACT_LIMITS.phone.max}
                  aria-invalid={Boolean(message('phone'))} aria-describedby={describedBy('phone', true)} onChange={(e) => update('phone', e.target.value)} />
                {error('phone')}
              </div>
              <div className="contact-field contact-field-wide">
                {label('message')}
                <p className="contact-hint" id={fieldId('message-hint')}>{t.hints.message}</p>
                <textarea id={fieldId('message')} name="message" rows={6} value={values.message} maxLength={CONTACT_LIMITS.message.max}
                  aria-invalid={Boolean(message('message'))} aria-describedby={describedBy('message', true)} onChange={(e) => update('message', e.target.value)} />
                <p className="contact-counter" aria-live="polite">{t.counter.replace('{count}', String(values.message.trim().length)).replace('{max}', String(CONTACT_LIMITS.message.max))}</p>
                {error('message')}
              </div>
            </div>
            {/* Bot tuzağı: ekranda ve yardımcı teknolojide gizli; insanlar doldurmaz. */}
            <div className="contact-trap" aria-hidden="true">
              <label htmlFor={fieldId('website')}>{t.honeypot}</label>
              <input id={fieldId('website')} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => update('website', e.target.value)} />
            </div>
            <div className="contact-consent">
              <input id={fieldId('consent')} name="consent" type="checkbox" checked={values.consent}
                aria-invalid={Boolean(message('consent'))} aria-describedby={describedBy('consent')} onChange={(e) => update('consent', e.target.checked)} />
              <label htmlFor={fieldId('consent')}>
                {t.consentBefore}
                {privacyUrl
                  ? <a href={privacyUrl} target="_blank" rel="noopener noreferrer">{t.consentLink}</a>
                  : <span>{t.consentLink}</span>}
                {t.consentAfter}
                {!privacyUrl && <span className="contact-hint contact-consent-pending">{t.consentPending}</span>}
              </label>
            </div>
            {error('consent')}
            <button type="submit" className="button button-primary contact-submit">
              {status === 'sending' ? t.sending : t.submit}<Send size={17} aria-hidden="true" />
            </button>
          </fieldset>
        </form>
      )}
    </section>
  )
}
