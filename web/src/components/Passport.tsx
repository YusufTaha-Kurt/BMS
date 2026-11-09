import { BadgeCheck, Check, Copy, FileClock, Fingerprint, Leaf, Link2 } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { CARBON, DEMO_RULES as R, type ScenarioId } from '../../shared/config.ts'
import type { DayRecord, HistoryFile } from '../../shared/types.ts'
import { useI18n } from '../lib/i18n.tsx'
import { explain } from '../lib/explain.ts'
import { PRIORITY_STYLE } from '../lib/status.ts'
import { passportUrl } from '../lib/viewUrl.ts'
import { QrCode } from './QrCode.tsx'

interface Props {
  history: HistoryFile
  day: number
  scenario: ScenarioId
}

/** Seçilen güne kadar öncelik değişimlerini denetlenebilir olay kaydına çevirir. */
function eventsOf(days: DayRecord[], upTo: number, label: (priority: DayRecord['priority']) => string) {
  const out: { date: string; label: string; signal: string; priority: DayRecord['priority'] }[] = []
  let prev: DayRecord['priority'] | null = null
  for (const d of days.slice(0, upTo)) {
    if (d.priority !== prev) {
      out.push({ date: d.date, label: label(d.priority), signal: d.signal, priority: d.priority })
      prev = d.priority
    }
  }
  return out.reverse()
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-line/60 py-1 last:border-0">
      <dt className="text-mute">{k}</dt>
      <dd className="text-right font-medium tabular">{v}</dd>
    </div>
  )
}

function Box({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-card p-3">
      <h4 className="mb-1.5 flex items-center gap-1.5 font-semibold">{icon}{title}</h4>
      {children}
    </div>
  )
}

export function Passport({ history, day, scenario }: Props) {
  const { language, l, f: { dateShort, dateTr, num, pct }, priorityLabel } = useI18n()
  const { profile, batteryId } = history
  const days = history.days.map((d) => explain(d, language))
  const cur = days[day - 1]
  const events = eventsOf(days, day, priorityLabel)
  const kwh = days.slice(0, day).reduce((a, d) => a + d.chargeWh, 0) / 1000 / CARBON.chargerEfficiency
  const co2 = kwh * CARBON.gridFactorKgPerKwh
  const lifecycle =
    cur.priority === 'critical' ? l('Technical review recommended', 'Teknik inceleme önerildi') : cur.soh < R.sohAttentionPct ? l('Assessment candidate', 'Değerlendirme adayı') : l('In active use', 'Aktif kullanım')

  return (
    <section id="passport" tabIndex={-1} aria-labelledby="passport-title">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
        <h3 id="passport-title" className="flex items-center gap-1.5 text-sm font-bold">
          <Fingerprint aria-hidden className="size-4 text-accent" /> {l('Digital Battery Passport', 'Dijital Batarya Pasaportu')}
        </h3>
        <span className="rounded border border-line px-1.5 py-0.5 text-[11px] text-mute" title={l('EU 2023/1542 preparation view · synthetic record', 'AB 2023/1542 hazırlık görünümü · sentetik kayıt')}>
          {l('EU 2023/1542 · synthetic', 'AB 2023/1542 · sentetik')}
        </span>
      </div>

      <div className="grid gap-2.5 text-xs md:grid-cols-2">
        <Box icon={<Fingerprint aria-hidden className="size-3.5" />} title={l('Identity', 'Kimlik')}>
          <dl>
            <Row k={l('Serial no.', 'Seri no')} v={profile.serial} />
            <Row k={l('Model', 'Model')} v={`${profile.model} · ${profile.chemistry.replace('(sentetik)', l('(synthetic)', '(sentetik)'))}`} />
            <Row k={l('Rated', 'Nominal')} v={`${num(profile.nominalV)} V · ${profile.nominalAh} Ah`} />
            <Row k={l('Commissioned', 'Hizmete giriş')} v={dateTr(profile.commissioned)} />
          </dl>
        </Box>

        <Box icon={<BadgeCheck aria-hidden className="size-3.5" />} title={l('Health', 'Sağlık')}>
          <dl>
            <Row k={l('SOH (model, simulated)', 'Simüle edilen batarya sağlığı (SOH)')} v={pct(cur.soh)} />
            <Row k={l('Internal resistance', 'İç direnç')} v={cur.rMohm === null ? l('No measurement', 'Ölçüm yok') : `${num(cur.rMohm, 0)} mΩ`} />
            <Row k="BMS SOH" v={l('Pilot stage', 'Pilotta')} />
            <Row k={l('Status', 'Durum')} v={lifecycle} />
          </dl>
        </Box>

        <Box icon={<FileClock aria-hidden className="size-3.5" />} title={`${l('Event log', 'Olay kaydı')} · ${batteryId}`}>
          <ol className="space-y-1">
            {events.slice(0, 4).map((e) => (
              <li key={e.date} className="flex items-start gap-2">
                <span className="w-12 shrink-0 tabular text-mute">{dateShort(e.date)}</span>
                <span>
                  <span className={`font-semibold ${PRIORITY_STYLE[e.priority].text}`}>{e.label}</span>
                  {e.priority !== 'normal' && <span className="text-mute"> · {e.signal}</span>}
                </span>
              </li>
            ))}
          </ol>
        </Box>

        <Box icon={<Leaf aria-hidden className="size-3.5 text-ok" />} title={l('Charging energy and emissions', 'Şarj enerjisi ve emisyonları')}>
          <dl>
            <Row k={l(`Energy (days 1–${day})`, `Enerji (1–${day}. gün)`)} v={`${num(kwh, 1)} kWh`} />
            <Row k={l('Emissions', 'Emisyon')} v={`${num(co2, 1)} kg CO₂e`} />
          </dl>
          <p className="mt-1.5 text-mute">{l('Demo emission factor', 'Demo emisyon faktörü')} {num(CARBON.gridFactorKgPerKwh, 2)} kg CO₂e/kWh.</p>
        </Box>
      </div>
      <PassportLink url={passportUrl({ scenario, day, batteryId }, language)} batteryId={batteryId} />
    </section>
  )
}

/** Her kimliğin sabit adresi ve QR'ı; aynı senaryo/gün ile açılır. Sentetik kayıt olduğu ayrıca belirtilir. */
function PassportLink({ url, batteryId }: { url: string; batteryId: string }) {
  const { l } = useI18n()
  // Kopyalanan adres saklanır; görünüm değişince onay kendiliğinden kalkar.
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const copied = copiedUrl === url
  useEffect(() => {
    if (copiedUrl === null) return
    const timer = window.setTimeout(() => setCopiedUrl(null), 2500)
    return () => window.clearTimeout(timer)
  }, [copiedUrl])
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopiedUrl(url) } catch { /* Bağlantı metni yine seçilebilir. */ }
  }
  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-3 rounded-lg border border-line bg-card p-3 text-xs">
      <QrCode value={url} size={104} label={l(`QR code for the ${batteryId} passport view`, `${batteryId} pasaport görünümü QR kodu`)} className="shrink-0 p-1" />
      <div className="min-w-0 flex-1 basis-56">
        <h4 className="mb-1 flex items-center gap-1.5 font-semibold"><Link2 aria-hidden className="size-3.5" />{l('Open this battery’s passport', 'Bu bataryanın pasaportunu açın')}</h4>
        <p className="text-mute">{l(
          'Scan the QR code to open this synthetic record with the same scenario and day. It is not a registered EU battery passport.',
          'Bu sentetik kaydı aynı senaryo ve günle açmak için QR kodunu okutunuz. Kayıtlı bir AB batarya pasaportu değildir.',
        )}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <a href={url} className="min-w-0 break-all font-medium text-accent underline-offset-2 hover:underline">{url.replace(/^https?:\/\//, '')}</a>
          <button type="button" onClick={copy} className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-line px-3 font-semibold hover:border-accent">
            {copied ? <Check aria-hidden className="size-3.5 text-ok" /> : <Copy aria-hidden className="size-3.5" />}
            {copied ? l('Copied', 'Kopyalandı') : l('Copy link', 'Bağlantıyı kopyala')}
          </button>
          <span className="sr-only" role="status">{copied ? l('Link copied', 'Bağlantı kopyalandı') : ''}</span>
        </div>
      </div>
    </div>
  )
}
