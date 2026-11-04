import { useI18n } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { PASSPORT_FAQ, PASSPORT_RESOURCES, REGULATION_SOURCE } from './sources.ts'
import { PageTemplate } from './components/PageTemplate.tsx'
import { SourceLinks } from './components/SourceLinks.tsx'

export function ProjectPage() {
  const { language } = useI18n()
  const { common, home, project: t } = CONTENT[language]
  const page = common.pages.project
  return (
    <PageTemplate title={page.title} description={page.description}>
      <div className="prose lead">
        {t.summary.paragraphs.map((text) => <p key={text}>{text}</p>)}
        <p className="note">{t.summary.stage}</p>
      </div>

      <section className="section" id="project-objectives" aria-labelledby="goals-title">
        <h2 id="goals-title">{t.goals.title}</h2>
        <div className="prose">
          <ul className="bullets">{t.goals.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <p>{t.goals.audience}</p>
        </div>
      </section>

      <section className="section" id="project-flow" aria-labelledby="flow-title">
        <h2 id="flow-title">{t.flow.title}</h2>
        <div>
          <ol className="steps">{home.flow.steps.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.text}</span></li>)}</ol>
          <ul className="bullets principles">{t.flow.principles.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="section" id="project-access" aria-labelledby="access-title">
        <h2 id="access-title">{t.access.title}</h2>
        <div>
          <p className="muted">{t.access.intro}</p>
          <dl className="terms numbered">{t.access.options.map((option) => <div key={option.title}><dt>{option.title}</dt><dd>{option.text}</dd></div>)}</dl>
        </div>
      </section>

      <section className="section" id="project-methods" aria-labelledby="methods-title">
        <h2 id="methods-title">{t.methods.title}</h2>
        <div>
          <p className="muted">{t.methods.intro}</p>
          <dl className="terms">{t.methods.items.map((method) => <div key={method.title}><dt>{method.title}</dt><dd>{method.text}</dd></div>)}</dl>
        </div>
      </section>

      <section className="section" id="project-passport" aria-labelledby="passport-title">
        <h2 id="passport-title">{t.passport.title}</h2>
        <div className="prose">
          {t.passport.paragraphs.map((text) => <p key={text}>{text}</p>)}
          <h3>{t.passport.statesTitle}</h3>
          <ul className="tags">{t.passport.states.map((state) => <li key={state.code}>{state.label}</li>)}</ul>
          <p className="muted">{t.passport.statesNote}</p>
        </div>
      </section>

      <section className="section" id="project-pilot" aria-labelledby="pilot-title">
        <h2 id="pilot-title">{t.pilot.title}</h2>
        <div>
          <p className="muted">{t.pilot.intro}</p>
          <ol className="timeline">{t.pilot.stages.map((stage) => (
            <li key={stage.phase}>
              <span className="timeline-when">{t.pilot.phase} {stage.phase}<br />{stage.period}</span>
              <span><strong>{stage.title}</strong>{stage.text}</span>
            </li>
          ))}</ol>
        </div>
      </section>

      <section className="section" aria-labelledby="project-sources-title">
        <h2 id="project-sources-title">{t.sources.title}</h2>
        <div>
          <p className="muted">{t.sources.proposal}</p>
          <SourceLinks links={[{ label: t.sources.regulation, url: REGULATION_SOURCE }, { label: t.sources.guidance, url: PASSPORT_RESOURCES }, { label: t.sources.faq, url: PASSPORT_FAQ }]} />
        </div>
      </section>
    </PageTemplate>
  )
}
