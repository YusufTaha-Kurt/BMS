import { ArrowRight, ArrowUpRight, FileText, Play } from 'lucide-react'
import { useI18n, withLanguage } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { DEMO_MEDIA, DEMO_SCREENSHOTS, type ScreenshotId } from './demoMedia.ts'
import { pagePath } from './routes.ts'
import { DemoAccess } from './components/DemoAccess.tsx'
import { PageTemplate } from './components/PageTemplate.tsx'

export function DemoPage() {
  const { language } = useI18n()
  const { common, demo: t } = CONTENT[language]
  const media = DEMO_MEDIA[language]
  const presentation = media?.presentation?.url.trim() ? media.presentation : undefined
  const video = media?.video?.url.trim() && media.video.captions.trim() ? media.video : undefined
  return (
    <PageTemplate title={common.pages.demo.title} description={common.pages.demo.description}>
      <section className="showcase-start" aria-labelledby="demo-start-title">
        <div><h2 id="demo-start-title">{t.start.title}</h2><p>{t.start.text}</p></div>
        <DemoAccess />
      </section>

      <nav className="tech-navigation" aria-label={language === 'tr' ? 'Bu sayfada' : 'On this page'}>{[
        ['demo-guide-title', t.guide.title], ['demo-gallery-title', t.gallery.title], ['demo-materials-title', t.materials.title],
      ].map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <section className="tech-section" aria-labelledby="demo-guide-title">
        <h2 id="demo-guide-title">{t.guide.title}</h2><p className="tech-intro">{t.guide.intro}</p>
        <ol className="showcase-guide">{t.guide.steps.map((step, i) => <li key={step.title}><span className="showcase-number" aria-hidden="true">0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
        <p className="tech-note">{t.guide.note}</p>
      </section>

      <section className="tech-section" aria-labelledby="demo-gallery-title">
        <h2 id="demo-gallery-title">{t.gallery.title}</h2><p className="tech-intro">{t.gallery.intro}</p>
        <div className="showcase-gallery">{(Object.keys(t.gallery.items) as ScreenshotId[]).map((id) => {
          const item = t.gallery.items[id]
          const src = DEMO_SCREENSHOTS[language][id]
          return <figure key={id} data-screenshot={id}>
            <a className="showcase-image" href={src} target="_blank" rel="noopener noreferrer" aria-label={`${t.gallery.enlarge} — ${item.title} (${common.newTab})`}><img src={src} width="1425" height="990" loading="lazy" decoding="async" alt={item.alt} /><span>{t.gallery.enlarge}<ArrowUpRight size={16} aria-hidden="true" /></span></a>
            <figcaption><h3>{item.title}</h3><p>{item.text}</p><p className="showcase-label">{t.gallery.synthetic}</p><p className="showcase-credit">{t.gallery.source}</p></figcaption>
          </figure>
        })}</div>
      </section>

      <section className="tech-section" aria-labelledby="demo-materials-title">
        <h2 id="demo-materials-title">{t.materials.title}</h2>
        <div className="showcase-materials">
          <article className="showcase-material" aria-labelledby="presentation-title"><FileText size={25} aria-hidden="true" /><h3 id="presentation-title">{t.materials.presentation}</h3>
            {presentation ? <div className="showcase-file-links"><a className="home-link" href={presentation.url} target="_blank" rel="noopener noreferrer">{t.materials.view}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> ({common.newTab})</span></a><a className="home-link" href={presentation.url} download={presentation.fileName}>{t.materials.download}</a></div> : <><p className="showcase-pending">{t.materials.pending}</p><p>{t.materials.presentationNote}</p></>}
          </article>
          <article className="showcase-material" aria-labelledby="video-title"><Play size={25} aria-hidden="true" /><h3 id="video-title">{t.materials.video}</h3>
            {video ? <><video key={video.url} controls preload="none" poster={video.poster} aria-label={t.materials.videoLabel}><source src={video.url} type={video.type} /><track kind="captions" src={video.captions} srcLang={language} label={t.materials.captions} default /></video><a className="home-link" href={video.url} target="_blank" rel="noopener noreferrer">{t.materials.videoFallback}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> ({common.newTab})</span></a></> : <><p className="showcase-pending">{t.materials.pending}</p><p>{t.materials.videoNote}</p></>}
          </article>
        </div>
      </section>
      <div className="org-related"><a className="home-link" href={withLanguage(pagePath('project'), language)}>{t.related.project}<ArrowRight size={17} aria-hidden="true" /></a><a className="home-link" href={withLanguage(pagePath('carbon'), language)}>{t.related.carbon}<ArrowRight size={17} aria-hidden="true" /></a></div>
    </PageTemplate>
  )
}
