import { ArrowRight, ChevronDown } from 'lucide-react'
import { useI18n, withLanguage } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { PILOT_INFORMATION, type PilotFieldId } from './projectData.ts'
import { pagePath } from './routes.ts'
import { PASSPORT_FAQ, PASSPORT_RESOURCES, REGULATION_SOURCE } from './sources.ts'
import { InformationFields } from './components/InformationFields.tsx'
import { PageTemplate } from './components/PageTemplate.tsx'
import { SourceLinks } from './components/SourceLinks.tsx'

export function ProjectPage() {
  const { language } = useI18n()
  const { common, home, project: t } = CONTENT[language]
  const page = common.pages.project
  const sections = [
    { id: 'project-objectives', label: t.goals.title },
    { id: 'project-flow', label: t.flow.title },
    { id: 'project-access', label: t.access.title },
    { id: 'project-methods', label: t.methods.title },
    { id: 'project-passport', label: t.passport.title },
    { id: 'project-pilot', label: t.pilot.title },
  ]
  return (
    <PageTemplate title={page.title} description={page.description}>
      <nav className="tech-navigation" aria-label={t.navigation}>{sections.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <section className="tech-summary" aria-labelledby="project-summary-title">
        <h2 id="project-summary-title">{t.summary.title}</h2>
        {t.summary.paragraphs.map((text) => <p key={text}>{text}</p>)}
        <p className="tech-stage">{t.summary.stage}</p>
      </section>


      <section className="tech-section" id="project-objectives" aria-labelledby="objectives-title">
        <h2 id="objectives-title">{t.goals.title}</h2>
        <div className="tech-grid tech-goals"><ul className="tech-list">{t.goals.items.map((item) => <li key={item}>{item}</li>)}</ul><article className="tech-card"><h3>{t.goals.audienceTitle}</h3><p>{t.goals.audience}</p></article></div>
      </section>

      <section className="tech-section" aria-labelledby="scenario-title">
        <h2 id="scenario-title">{t.scenario.title}</h2><p className="tech-note">{t.scenario.note}</p>
        <ol className="tech-scenario">{t.scenario.steps.map((step, i) => <li className="tech-card" key={step.title}><span className="tech-index" aria-hidden="true">0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      </section>

      <section className="tech-section" id="project-flow" aria-labelledby="project-flow-title">
        <h2 id="project-flow-title">{t.flow.title}</h2>
        <ol className="home-flow tech-flow">{home.solution.steps.map((step, i) => <li key={step.title}><span className="flow-number" aria-hidden="true">0{i + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol>
        <div className="tech-principles"><h3>{t.flow.safeguardsTitle}</h3><ul className="tech-list">{t.flow.safeguards.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className="tech-section" id="project-access" aria-labelledby="access-title">
        <h2 id="access-title">{t.access.title}</h2><p className="tech-intro">{t.access.intro}</p>
        <ol className="tech-grid tech-access">{t.access.options.map((option, i) => <li className="tech-card" key={option.title}><span className="tech-index" aria-hidden="true">0{i + 1}</span><h3>{option.title}</h3><p>{option.text}</p></li>)}</ol>
      </section>

      <section className="tech-section" id="project-methods" data-hash-disclosure>
        <details className="tech-disclosure">
          <summary><h2>{t.methods.title}</h2><ChevronDown size={23} aria-hidden="true" /></summary>
          <div className="tech-disclosure-body"><p className="tech-intro">{t.methods.intro}</p><ul className="tech-methods">{t.methods.items.map((method) => <li className="tech-card" key={method.title}><h3>{method.title}</h3><p>{method.candidates}</p><p className="tech-condition">{method.condition}</p></li>)}</ul></div>
        </details>
      </section>

      <section className="tech-section" id="project-passport" aria-labelledby="project-passport-title">
        <h2 id="project-passport-title">{t.passport.title}</h2><p className="tech-intro">{t.passport.intro}</p>
        <div className="tech-grid">{t.passport.records.map((record) => <article className="tech-card" key={record.title}><h3>{record.title}</h3><p>{record.text}</p></article>)}</div>
        <details className="tech-disclosure tech-passport-details" id="project-passport-details">
          <summary><h3>{t.passport.detailsTitle}</h3><ChevronDown size={23} aria-hidden="true" /></summary>
          <div className="tech-disclosure-body">
        <p className="tech-paragraph">{t.passport.identity}</p><p className="tech-note">{t.passport.options}</p>
        <details className="tech-disclosure tech-passport-access" id="project-passport-access">
          <summary><h3>{t.passport.accessTitle}</h3><ChevronDown size={21} aria-hidden="true" /></summary>
          <div className="tech-disclosure-body"><div className="tech-three-grid">{t.passport.access.map((level) => <article className="tech-card" key={level.title}><h4>{level.title}</h4><p>{level.text}</p></article>)}</div><p className="tech-note">{t.passport.accessNote}</p></div>
        </details>
        <h3 className="tech-subtitle">{t.passport.lifecycleTitle}</h3><ul className="tech-lifecycle">{t.passport.states.map((state) => <li key={state.code}><code>{state.code}</code><span>{state.label}</span></li>)}</ul>
        <p className="tech-note">{t.passport.lifecycleNote}</p><p className="tech-paragraph">{t.passport.healthNote}</p><p className="tech-note">{t.passport.guideNote}</p>
          </div>
        </details>
      </section>

      <section className="tech-section" id="project-pilot" aria-labelledby="pilot-title">
        <h2 id="pilot-title">{t.pilot.title}</h2><p className="tech-intro">{t.pilot.intro}</p>
        <ol className="tech-timeline">{t.pilot.stages.map((stage) => <li key={stage.phase}><div className="tech-timeline-label"><strong>{t.pilot.phase} {stage.phase}</strong><span>{stage.period}</span></div><h3>{stage.title}</h3><p>{stage.text}</p></li>)}</ol>
        <h3 className="tech-subtitle">{t.pilot.informationTitle}</h3>
        <InformationFields missing={t.missing} fields={(Object.keys(PILOT_INFORMATION) as PilotFieldId[]).map((id) => ({ id, label: t.pilot.fields[id], value: PILOT_INFORMATION[id][language] }))} />
      </section>

      <section className="tech-section tech-sources" aria-labelledby="project-sources-title"><h2 id="project-sources-title">{t.sourcesTitle}</h2><p>{t.proposalSource}</p><SourceLinks links={[{ label: t.sourceLabels.regulation, url: REGULATION_SOURCE }, { label: t.sourceLabels.guidance, url: PASSPORT_RESOURCES }, { label: t.sourceLabels.faq, url: PASSPORT_FAQ }]} /></section>
      <div className="org-related"><a className="home-link" href={withLanguage(pagePath('carbon'), language)}>{t.related.carbon}<ArrowRight size={17} aria-hidden="true" /></a><a className="home-link" href={withLanguage(pagePath('demo'), language)}>{t.related.demo}<ArrowRight size={17} aria-hidden="true" /></a></div>
    </PageTemplate>
  )
}
