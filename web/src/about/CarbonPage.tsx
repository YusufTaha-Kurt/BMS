import { useI18n } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { COP31_SOURCE, EMISSIONS_SOURCE, PASSPORT_RESOURCES, REGULATION_SOURCE } from './sources.ts'
import { PageTemplate } from './components/PageTemplate.tsx'
import { SourceLinks } from './components/SourceLinks.tsx'

export function CarbonPage() {
  const { language } = useI18n()
  const { common, carbon: t } = CONTENT[language]
  const page = common.pages.carbon
  return (
    <PageTemplate title={page.title} description={page.description}>
      <p className="notice">{t.notice}</p>

      <section className="section" aria-labelledby="expected-title">
        <h2 id="expected-title">{t.expected.title}</h2>
        <dl className="terms">{t.expected.items.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.text}</dd></div>)}</dl>
      </section>

      <section className="section" aria-labelledby="indicators-title">
        <h2 id="indicators-title">{t.indicators.title}</h2>
        <div>
          <dl className="terms">{t.indicators.items.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.text}</dd></div>)}</dl>
          <p className="muted">{t.indicators.note}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="method-title">
        <h2 id="method-title">{t.method.title}</h2>
        <div className="prose">
          <p className="formula"><strong>{t.method.formula[0]}</strong> = <strong>{t.method.formula[1]}</strong> × <strong>{t.method.formula[2]}</strong></p>
          {t.method.paragraphs.map((text) => <p key={text}>{text}</p>)}
        </div>
      </section>

      <section className="section" aria-labelledby="limits-title">
        <h2 id="limits-title">{t.limits.title}</h2>
        <ul className="bullets">{t.limits.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="section" aria-labelledby="second-life-title">
        <h2 id="second-life-title">{t.secondLife.title}</h2>
        <div className="prose"><p>{t.secondLife.text}</p></div>
      </section>

      <section className="section" aria-labelledby="carbon-sources-title">
        <h2 id="carbon-sources-title">{t.sources.title}</h2>
        <div>
          <p className="muted">{t.sources.proposal}</p>
          <SourceLinks links={[{ label: t.sources.regulation, url: REGULATION_SOURCE }, { label: t.sources.guidance, url: PASSPORT_RESOURCES }, { label: t.sources.emissions, url: EMISSIONS_SOURCE }, { label: t.sources.cop31, url: COP31_SOURCE }]} />
        </div>
      </section>
    </PageTemplate>
  )
}
