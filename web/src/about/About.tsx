import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ACADEMIC_COORDINATOR } from '../site.ts'
import { useI18n, withLanguage } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
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
        <div className="page-width">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{t.eyebrow}</p>
              <h1 id="hero-title">{t.headline.map((line) => <span key={line}>{line}</span>)}</h1>
              <p className="hero-intro">{t.intro}</p>
              <p className="hero-stage">{t.stage}</p>
              <div className="hero-actions">
                <DemoAccess />
                <a className="text-link" href={href('team')}>{t.team.cta}<ArrowRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <figure className="hero-art">
              <div className="edition-label"><span>{language === 'tr' ? 'BAKIM KARARI / DEMO' : 'MAINTENANCE / DEMO'}</span><span>DEMO-001 · {language === 'tr' ? '14. gün' : 'Day 14'}</span></div>
              <a className="hero-evidence" href={DEMO_SCREENSHOTS[language].telemetry} target="_blank" rel="noopener noreferrer" aria-label={`${demo.gallery.enlarge} (${common.newTab})`}><img src={DEMO_HERO_SCREENSHOTS[language]} width="788" height="650" alt={language === 'tr' ? 'Sentetik DEMO-001 bataryası: sıcaklık sapması gerekçesi, teknik inceleme önerisi ve olaysız durumla karşılaştırılan göstergeler.' : 'Synthetic battery DEMO-001: temperature drift reason, technical review recommendation and indicators compared with the no-event baseline.'} /><span>{demo.gallery.enlarge}<ArrowUpRight size={16} aria-hidden="true" /></span></a>
              <figcaption><strong>{language === 'tr' ? 'Ölçüm → gerekçe → teknik inceleme' : 'Measurement → reason → technical review'}</strong><p>{demo.gallery.synthetic}</p><p>{demo.gallery.source}</p></figcaption>
            </figure>
          </div>
          <div className="hero-bottom"><div className="topic-tags">{t.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="hero-credit">{common.institution}</span></div>
        </div>
      </section>

      <section className="home-problem section-space" aria-labelledby="problem-title">
        <div className="page-width home-split">
          <div><p className="eyebrow section-label">{t.problem.label}</p><h2 id="problem-title">{t.problem.title}</h2></div>
          <div className="home-prose"><p>{t.problem.text}</p><p>{t.problem.passport}</p><a className="home-source" href={PASSPORT_SOURCE} target="_blank" rel="noopener noreferrer">{t.problem.source}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> ({common.newTab})</span></a></div>
        </div>
      </section>

      <section className="home-solution section-space" id="project" aria-labelledby="solution-title">
        <div className="page-width">
          <div className="home-split">
            <div><p className="eyebrow section-label">{t.solution.label}</p><h2 id="solution-title">{t.solution.title}</h2></div>
            <div className="home-prose"><p>{t.solution.text}</p><a className="home-link" href={href('project')}>{t.solution.cta}<ArrowRight size={17} aria-hidden="true" /></a></div>
          </div>
          <h3 className="home-flow-title">{t.solution.flowHeading}</h3>
          <ol className="home-flow home-flow-overview">{t.solution.steps.map((step, i) => <li key={step.title}><span className="flow-number" aria-hidden="true">0{i + 1}</span><h4>{step.title}</h4>{i === 1 && <p>{step.detail}</p>}</li>)}</ol>
          <p className="home-decision">{t.solution.decision}</p>
        </div>
      </section>

      <section className="home-team section-space" id="team" aria-labelledby="team-title">
        <div className="page-width home-split">
          <div><p className="eyebrow section-label">{t.team.label}</p><h2 id="team-title">{t.team.title}</h2><a className="home-link" href={href('team')}>{t.team.cta}<ArrowRight size={17} aria-hidden="true" /></a></div>
          <div className="home-prose"><p>{t.team.text}</p><p className="home-coordinator">{t.team.coordinator}<a href={`${href('team')}#profile-coordinator`}>{ACADEMIC_COORDINATOR}<ArrowRight size={15} aria-hidden="true" /></a></p></div>
        </div>
      </section>

      <section className="home-institutions section-space" aria-labelledby="institutions-title">
        <div className="page-width">
          <p className="eyebrow section-label">{t.institutions.label}</p><h2 id="institutions-title">{t.institutions.title}</h2>
          <div className="home-institution-grid">{t.institutions.items.map((institution) => <article key={institution.name}><h3>{institution.name}</h3><p>{institution.text}</p><a className="home-source" href={institution.url} target="_blank" rel="noopener noreferrer" aria-label={`${institution.name} — ${t.institutions.source} (${common.newTab})`}>{t.institutions.source}<ArrowUpRight size={14} aria-hidden="true" /></a></article>)}</div>
          <a className="home-link" href={href('institutions')}>{t.institutions.cta}<ArrowRight size={17} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="home-climate section-space" aria-labelledby="climate-title">
        <div className="page-width home-split">
          <div><p className="eyebrow">{t.climate.label}</p><h2 id="climate-title">{t.climate.title}</h2></div>
          <div className="home-prose"><p>{t.climate.text}</p><p className="home-scope">{t.climate.scope}</p><a className="home-link" href={href('carbon')}>{t.climate.cta}<ArrowRight size={17} aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="home-explore section-space" aria-labelledby="explore-title">
        <div className="page-width">
          <p className="eyebrow section-label">{t.explore.label}</p><h2 id="explore-title">{t.explore.title}</h2>
          <ul className="home-destinations">{t.explore.links.map((link) => <li key={link.page}><a href={href(link.page)}><strong>{link.label}</strong><ArrowRight size={19} aria-hidden="true" /></a></li>)}</ul>
        </div>
      </section>
    </>
  )
}
