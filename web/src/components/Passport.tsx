import { BadgeCheck, FileClock, Fingerprint, Leaf, QrCode, ShieldCheck } from 'lucide-react'
import { CARBON, DEMO_RULES as R } from '../../shared/config.ts'
import { PRIORITY_LABEL } from '../../shared/rules.ts'
import type { DayRecord, HistoryFile } from '../../shared/types.ts'
import { dateShort, dateTr, num, pct } from '../lib/format.ts'
import { PRIORITY_STYLE } from '../lib/status.ts'

interface Props {
  history: HistoryFile
  day: number
}

/** Seçilen güne kadar öncelik değişimlerini denetlenebilir olay kaydına çevirir. */
function eventsOf(days: DayRecord[], upTo: number) {
  const out: { date: string; label: string; signal: string; priority: DayRecord['priority'] }[] = []
  let prev: DayRecord['priority'] | null = null
  for (const d of days.slice(0, upTo)) {
    if (d.priority !== prev) {
      out.push({ date: d.date, label: PRIORITY_LABEL[d.priority], signal: d.signal, priority: d.priority })
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

export function Passport({ history, day }: Props) {
  const { profile, days, batteryId } = history
  const cur = days[day - 1]
  const events = eventsOf(days, day)
  const kwh = days.slice(0, day).reduce((a, d) => a + d.chargeWh, 0) / 1000 / CARBON.chargerEfficiency
  const co2 = kwh * CARBON.gridFactorKgPerKwh
  const lifecycle =
    cur.priority === 'critical'
      ? 'Aktif · teknik inceleme önerildi'
      : cur.soh < R.sohAttentionPct
        ? 'Aktif · yaşam döngüsü değerlendirmesi adayı'
        : 'Aktif kullanım'

  return (
    <section id="passport" aria-labelledby="passport-title" className="rounded-xl border border-accent/40 bg-card/60 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 id="passport-title" className="flex items-center gap-1.5 text-sm font-bold">
          <Fingerprint aria-hidden className="size-4 text-accent" /> Dijital Batarya Pasaportu
          <span className="font-normal text-mute">· {batteryId}</span>
        </h3>
        <span className="rounded-md border border-line px-2 py-0.5 text-xs text-mute">
          Regulation (EU) 2023/1542 hazırlık görünümü · sentetik kayıt
        </span>
      </div>

      <div className="mt-2.5 grid gap-2.5 text-xs md:grid-cols-2 2xl:grid-cols-4">
        <div className="rounded-lg border border-line bg-panel p-2.5">
          <h4 className="mb-1 flex items-center gap-1.5 font-semibold"><QrCode aria-hidden className="size-3.5" /> Kimlik (model / tekil)</h4>
          <dl>
            <Row k="Seri no" v={profile.serial} />
            <Row k="Model" v={profile.model} />
            <Row k="Kimya" v={profile.chemistry} />
            <Row k="Nominal" v={`${num(profile.nominalV)} V · ${profile.nominalAh} Ah`} />
            <Row k="Üretim" v={dateTr(profile.manufactured)} />
            <Row k="Hizmete giriş" v={dateTr(profile.commissioned)} />
            <Row k="Pasaport statüsü" v="original" />
          </dl>
        </div>

        <div className="rounded-lg border border-line bg-panel p-2.5">
          <h4 className="mb-1 flex items-center gap-1.5 font-semibold"><BadgeCheck aria-hidden className="size-3.5" /> Sağlık kayıtları (kaynak ayrı)</h4>
          <dl>
            <Row k="Model tahmini SOH" v={`${pct(cur.soh)} · simüle`} />
            <Row k="BMS SOH" v="Pilotta BMS'ten okunur" />
            <Row k="Referans ölçüm" v="Yok · kontrollü test bekleniyor" />
            <Row k="Tahmini iç direnç" v={cur.rMohm === null ? 'Ölçüm yok' : `${cur.rMohm} mΩ`} />
            <Row k="Yaşam döngüsü" v={lifecycle} />
          </dl>
          <p className="mt-1.5 text-mute">Değerler birbirinin yerine kullanılmaz; her kayıt kaynak, tarih ve yöntemiyle saklanır.</p>
        </div>

        <div className="rounded-lg border border-line bg-panel p-2.5">
          <h4 className="mb-1 flex items-center gap-1.5 font-semibold"><FileClock aria-hidden className="size-3.5" /> Olay kayıtları (denetlenebilir)</h4>
          <ol className="space-y-1">
            {events.slice(0, 5).map((e) => (
              <li key={e.date} className="flex items-start gap-2">
                <span className="w-12 shrink-0 tabular text-mute">{dateShort(e.date)}</span>
                <span>
                  <span className={`font-semibold ${PRIORITY_STYLE[e.priority].text}`}>{e.label}</span>
                  {e.priority !== 'normal' && <span className="text-mute"> · {e.signal}</span>}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-1.5 text-mute">Önceki kayıtlar silinmez; yalnız doğrulanmış özetler pasaporta yazılır, ham telemetri yazılmaz.</p>
        </div>

        <div className="rounded-lg border border-line bg-panel p-2.5">
          <h4 className="mb-1 flex items-center gap-1.5 font-semibold"><Leaf aria-hidden className="size-3.5 text-ok" /> Operasyonel karbon (Scope 2)</h4>
          <dl>
            <Row k={`Şebeke enerjisi (1–${day}. gün)`} v={`${num(kwh, 1)} kWh`} />
            <Row k="Emisyon" v={`${num(co2, 1)} kg CO₂e`} />
            <Row k="Resmî karbon ayak izi" v="Üretici beyanı (Annex II)" />
          </dl>
          <p className="mt-1.5 text-mute">
            Varsayım: şarj verimi %{Math.round(CARBON.chargerEfficiency * 100)}, faktör {num(CARBON.gridFactorKgPerKwh, 2)} kg/kWh (demo).
            Pilotta ETKB-EVÇED tüketim noktası faktörü kullanılır.
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs">
        <ShieldCheck aria-hidden className="size-3.5 text-mute" />
        <span className="text-mute">Erişim seviyeleri:</span>
        <span className="rounded border border-line px-1.5 py-0.5">Kamuya açık</span>
        <span className="rounded border border-line px-1.5 py-0.5">Meşru menfaat sahipleri</span>
        <span className="rounded border border-line px-1.5 py-0.5">Piyasa gözetimi / Komisyon</span>
      </div>
    </section>
  )
}
