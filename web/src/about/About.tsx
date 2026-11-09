import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useI18n, withLanguage } from '../lib/i18n.tsx'
import { PROJECT_NAME } from '../site.ts'
import { CONTENT } from './content/index.ts'
import { Cop31Mark } from './components/Cop31Mark.tsx'
import { DemoAccess } from './components/DemoAccess.tsx'
import { pagePath } from './routes.ts'
import { DEMO_HERO_SCREENSHOTS, DEMO_SCREENSHOTS } from './demoMedia.ts'
import { PASSPORT_SOURCE } from './sources.ts'

export function About() {
  const { language } = useI18n()
  const { home: t, common, demo } = CONTENT[language]
  const href = (id: Parameters<typeof pagePath>[0]) => withLanguage(pagePath(id), language)

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="page-width hero-grid">
          <div>
            <h1 id="hero-title">{PROJECT_NAME}</h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <DemoAccess />
              <a className="text-link" href={href('project')}>{t.projectLink}<ArrowRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className="hero-figure">
            <a href={DEMO_SCREENSHOTS[language].telemetry} target="_blank" rel="noopener noreferrer" aria-label={`${demo.gallery.enlarge} (${common.newTab})`}>
              <img src={DEMO_HERO_SCREENSHOTS[language]} width="788" height="650" alt={t.heroAlt} />
            </a>
            <figcaption>{t.heroCaption}</figcaption>
          </figure>
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
