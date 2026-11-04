import { ArrowRight, ChevronDown, Info } from 'lucide-react'
import { useI18n, withLanguage } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { CARBON_INFORMATION, type CarbonFieldId } from './projectData.ts'
import { pagePath } from './routes.ts'
import { COP31_SOURCE, EMISSIONS_SOURCE, PASSPORT_RESOURCES, REGULATION_SOURCE } from './sources.ts'
import { InformationFields } from './components/InformationFields.tsx'
import { PageTemplate } from './components/PageTemplate.tsx'
import { SourceLinks } from './components/SourceLinks.tsx'

export function CarbonPage() {
  const { language } = useI18n()
  const { common, carbon: t } = CONTENT[language]
  const page = common.pages.carbon
  return (
    <PageTemplate title={page.title} description={page.description}>
      <div className="tech-notice" role="note"><Info size={24} aria-hidden="true" /><p>{t.notice}</p></div>

      <nav className="tech-navigation" aria-label={language === 'tr' ? 'Bu sayfada' : 'On this page'}>{[
        ['expected-title', t.expected.title], ['indicators-title', t.indicators.title], ['method-title', t.method.title], ['limits-title', t.limits.title], ['carbon-information-title', t.information.title],
      ].map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <section className="tech-section" aria-labelledby="expected-title"><h2 id="expected-title">{t.expected.title}</h2><p className="tech-intro">{t.expected.intro}</p><div className="tech-three-grid">{t.expected.items.map((item) => <article className="tech-card" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

      <section className="tech-section" aria-labelledby="indicators-title"><h2 id="indicators-title">{t.indicators.title}</h2><div className="tech-grid carbon-indicators">{t.indicators.items.map((item, i) => <article className="tech-card" key={item.title}><span className="tech-index" aria-hidden="true">0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><p className="tech-note">{t.indicators.note}</p></section>

      <section className="tech-section" aria-labelledby="method-title"><h2 id="method-title">{t.method.title}</h2><p className="tech-formula"><strong>{t.method.formula[0]}</strong><span>=</span><strong>{t.method.formula[1]}</strong><span>×</span><strong>{t.method.formula[2]}</strong></p><p className="tech-note">{t.method.unitNote}</p><p className="tech-paragraph">{t.method.factorNote}</p><SourceLinks links={[{ label: t.method.factorSource, url: EMISSIONS_SOURCE }]} /></section>

      <section className="tech-section" aria-labelledby="limits-title"><h2 id="limits-title">{t.limits.title}</h2><ul className="tech-list tech-limits">{t.limits.items.map((item) => <li key={item}>{item}</li>)}</ul></section>

      <section className="tech-section tech-second-life" aria-labelledby="second-life-title"><h2 id="second-life-title">{t.secondLife.title}</h2><p>{t.secondLife.text}</p></section>

      <section className="tech-section" aria-label={t.information.title}>
        <details className="tech-disclosure" id="carbon-information-title">
          <summary><div><h2>{t.information.title}</h2><p className="tech-note">{t.information.intro}</p></div><ChevronDown size={23} aria-hidden="true" /></summary>
          <div className="tech-disclosure-body"><InformationFields missing={t.information.missing} fields={(Object.keys(CARBON_INFORMATION) as CarbonFieldId[]).map((id) => ({ id, label: t.information.fields[id], value: CARBON_INFORMATION[id][language] }))} /></div>
        </details>
      </section>

      <section className="tech-section tech-sources" aria-labelledby="carbon-sources-title"><h2 id="carbon-sources-title">{t.sourcesTitle}</h2><p>{t.proposalSource}</p><SourceLinks links={[{ label: t.sourceLabels.regulation, url: REGULATION_SOURCE }, { label: t.sourceLabels.guidance, url: PASSPORT_RESOURCES }, { label: t.sourceLabels.emissions, url: EMISSIONS_SOURCE }, { label: t.sourceLabels.cop31, url: COP31_SOURCE }]} /></section>
      <div className="org-related"><a className="home-link" href={withLanguage(pagePath('project'), language)}>{t.related.project}<ArrowRight size={17} aria-hidden="true" /></a><a className="home-link" href={withLanguage(pagePath('demo'), language)}>{t.related.demo}<ArrowRight size={17} aria-hidden="true" /></a></div>
    </PageTemplate>
  )
}
