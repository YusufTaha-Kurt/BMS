import { Activity, ArrowRight, ArrowUpRight, Fingerprint, History } from 'lucide-react'
import type { Priority } from '../../shared/types.ts'
import { PRIORITY_ICON } from '../components/Badges.tsx'
import { useI18n } from '../lib/i18n.tsx'
import { PROJECT_NAME, PROJECT_NAME_TR } from '../siteIdentity.ts'
import { CONTENT } from './content/index.ts'
import { Cop31Mark } from './components/Cop31Mark.tsx'
import { DemoAccess } from './components/DemoAccess.tsx'
import { pagePath } from './routes.ts'
import { PASSPORT_SOURCE } from './sources.ts'

// Sentetik referans filonun 14. gününden alınan sabit önizleme.
const fleetCounts = [
  { priority: 'critical', count: 3 },
  { priority: 'data_review', count: 10 },
  { priority: 'attention', count: 59 },
  { priority: 'normal', count: 428 },
] satisfies { priority: Priority; count: number }[]
const fleetTotal = fleetCounts.reduce((total, { count }) => total + count, 0)
const fleetExamples = [
  { id: 'BT-10087', priority: 'critical', signal: { en: 'Cell imbalance', tr: 'Hücre dengesizliği' } },
  { id: 'BT-10038', priority: 'data_review', signal: { en: 'Low data coverage', tr: 'Düşük veri kapsama oranı' } },
  { id: 'BT-10002', priority: 'attention', signal: { en: 'Near the capacity threshold', tr: 'Kapasite eşiğine yakın' } },
] satisfies { id: string; priority: Priority; signal: Record<'en' | 'tr', string> }[]

export function About() {
  const { language, f, priorityLabel } = useI18n()
  const { home: t, common } = CONTENT[language]
  const href = (id: Parameters<typeof pagePath>[0]) => pagePath(id, language)
  const preview = t.fleetPreview

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="page-width hero-grid">
          <div>
            <h1 id="hero-title">{language === 'tr' ? PROJECT_NAME_TR : PROJECT_NAME}</h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <DemoAccess />
              <a className="text-link" href={href('project')}>{t.projectLink}<ArrowRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <section className="hero-fleet" aria-labelledby="hero-fleet-title">
            <div className="hero-fleet-heading">
              <div>
                <h2 id="hero-fleet-title">{preview.title}</h2>
                <p>{f.num(fleetTotal, 0)} {preview.batteries} · {preview.snapshot}</p>
              </div>
              <span className="hero-fleet-data">{preview.synthetic}</span>
            </div>
            <dl className="hero-fleet-counts">
              {fleetCounts.map(({ priority, count }) => (
                <div key={priority} data-priority={priority}>
                  <dt>{priorityLabel(priority)}</dt>
                  <dd>{f.num(count, 0)}</dd>
                </div>
              ))}
            </dl>
            <h3>{preview.priorities}</h3>
            <ul className="hero-fleet-examples" role="list">
              {fleetExamples.map(({ id, priority, signal }) => {
                const Icon = PRIORITY_ICON[priority]
                return (
                  <li key={id}>
                    <span className="hero-fleet-battery"><strong>{id}</strong><span>{signal[language]}</span></span>
                    <span className="hero-fleet-status" data-priority={priority}>
                      <Icon size={14} aria-hidden="true" />{priorityLabel(priority)}
                    </span>
                  </li>
                )
              })}
            </ul>
            <ul className="hero-fleet-features" role="list" aria-label={preview.batteryDetails}>
              <li><History size={14} aria-hidden="true" />{preview.history}</li>
              <li><Activity size={14} aria-hidden="true" />{preview.telemetry}</li>
              <li><Fingerprint size={14} aria-hidden="true" />{preview.passport}</li>
            </ul>
          </section>
        </div>
      </section>

      <section className="block" aria-labelledby="need-title">
        <div className="page-width split">
          <h2 id="need-title">{t.need.title}</h2>
          <div className="prose">
            {t.need.paragraphs.map((text) => <p key={text}>{text}</p>)}
            <a className="source-link" href={PASSPORT_SOURCE} target="_blank" rel="noopener noreferrer">{t.need.source}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> ({common.newTab})</span></a>
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="flow-title">
        <div className="page-width split">
          <h2 id="flow-title">{t.flow.title}</h2>
          <div>
            <ol className="steps">{t.flow.steps.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.text}</span></li>)}</ol>
            <p className="principle">{t.flow.principle}</p>
            <a className="text-link" href={href('project')}>{t.flow.link}<ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="people-title">
        <div className="page-width split">
          <h2 id="people-title">{t.people.title}</h2>
          <div className="prose">
            <p>{t.people.text}</p>
            <p className="link-row">
              <a className="text-link" href={href('team')}>{t.people.team}<ArrowRight size={16} aria-hidden="true" /></a>
              <a className="text-link" href={href('institutions')}>{t.people.institutions}<ArrowRight size={16} aria-hidden="true" /></a>
            </p>
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="climate-title">
        <div className="page-width split">
          <h2 id="climate-title">{t.climate.title}</h2>
          <div className="prose climate">
            <Cop31Mark alt={common.cop31Logo} className="climate-logo" />
            <div>
              <p>{t.climate.text}</p>
              <a className="text-link" href={href('carbon')}>{t.climate.link}<ArrowRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
