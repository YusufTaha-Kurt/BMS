import { BadgeCheck, FileClock, Fingerprint, Leaf } from 'lucide-react'
import type { ReactNode } from 'react'
import { CARBON, DEMO_RULES as R } from '../../shared/config.ts'
import type { DayRecord, HistoryFile } from '../../shared/types.ts'
import { useI18n } from '../lib/i18n.tsx'
import { explain } from '../lib/explain.ts'
import { PRIORITY_STYLE } from '../lib/status.ts'

interface Props {
  history: HistoryFile
  day: number
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

export function Passport({ history, day }: Props) {
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
            <Row k={l('SOH (model, simulated)', 'SOH (model, simüle)')} v={pct(cur.soh)} />
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

        <Box icon={<Leaf aria-hidden className="size-3.5 text-ok" />} title={l('Operational carbon', 'Operasyonel karbon')}>
          <dl>
            <Row k={l(`Energy (days 1–${day})`, `Enerji (1–${day}. gün)`)} v={`${num(kwh, 1)} kWh`} />
            <Row k={l('Emissions', 'Emisyon')} v={`${num(co2, 1)} kg CO₂e`} />
          </dl>
          <p className="mt-1.5 text-mute">{l('Demo factor', 'Demo faktörü')} {num(CARBON.gridFactorKgPerKwh, 2)} kg/kWh.</p>
        </Box>
      </div>
    </section>
  )
}
