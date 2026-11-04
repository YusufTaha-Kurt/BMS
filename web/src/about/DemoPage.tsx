import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { DEMO_MEDIA, DEMO_SCREENSHOTS, type ScreenshotId } from './demoMedia.ts'
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
      <section className="demo-start" aria-labelledby="demo-start-title">
        <div><h2 id="demo-start-title">{t.start.title}</h2><p>{t.start.text}</p></div>
        <DemoAccess />
      </section>

      <section className="section" aria-labelledby="demo-guide-title">
        <h2 id="demo-guide-title">{t.guide.title}</h2>
        <ol className="steps numbered-steps">{t.guide.steps.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.text}</span></li>)}</ol>
      </section>

      <section className="section stacked" aria-labelledby="demo-gallery-title">
        <h2 id="demo-gallery-title">{t.gallery.title}</h2>
        <p className="muted">{t.gallery.note}</p>
        <div className="gallery">{(Object.keys(t.gallery.items) as ScreenshotId[]).map((id) => {
          const item = t.gallery.items[id]
          const src = DEMO_SCREENSHOTS[language][id]
          return (
            <figure key={id} data-screenshot={id}>
              <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`${t.gallery.enlarge}, ${item.title} (${common.newTab})`}>
                <img src={src} width="1425" height="980" loading="lazy" decoding="async" alt={item.alt} />
              </a>
              <figcaption><strong>{item.title}</strong>{item.text}</figcaption>
            </figure>
          )
        })}</div>
      </section>

      {(presentation || video) && (
        <section className="section" aria-labelledby="demo-materials-title">
          <h2 id="demo-materials-title">{t.materials.title}</h2>
          <div className="prose">
            {presentation && <p className="link-row">
              <a className="text-link" href={presentation.url} target="_blank" rel="noopener noreferrer">{t.materials.view}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> ({common.newTab})</span></a>
              <a className="text-link" href={presentation.url} download={presentation.fileName}>{t.materials.download}</a>
            </p>}
            {video && <>
              <video key={video.url} controls preload="none" poster={video.poster} aria-label={t.materials.videoLabel}><source src={video.url} type={video.type} /><track kind="captions" src={video.captions} srcLang={language} label={t.materials.captions} default /></video>
              <a className="text-link" href={video.url} target="_blank" rel="noopener noreferrer">{t.materials.videoFallback}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> ({common.newTab})</span></a>
            </>}
          </div>
        </section>
      )}
    </PageTemplate>
  )
}
