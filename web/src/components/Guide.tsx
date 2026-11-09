import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { EVENT_DAY, FOCUS_DAY, NATURAL_FAULTS, type ScenarioId } from '../../shared/config.ts'
import type { SiteLanguage } from '../site.ts'
import { useI18n } from '../lib/i18n.tsx'
import type { Filter } from './FleetList.tsx'

export interface GuideView {
  scenario: ScenarioId; day: number; batteryId: string; compare: boolean; filter: Filter
  focus?: 'top' | 'panel' | 'passport' | 'feedback' | 'history'
  tab?: 'history' | 'telemetry' | 'passport'
}
interface StepText { title: string; body: string; task: string }
interface GuideStep { view: GuideView; text: Record<SiteLanguage, StepText> }
export const GUIDE_STEPS: GuideStep[] = [
  {
    view: { scenario: 'baseline', day: FOCUS_DAY, batteryId: NATURAL_FAULTS.imbalance, compare: false, filter: 'all', focus: 'top' },
    text: {
      en: { title: 'Fleet', body: 'These 500 batteries are synthetic. The counters show how many need technical review, a data check, monitoring or routine observation.', task: 'Select a battery in the list to see the reason behind its priority. Use Next to try a temperature scenario.' },
      tr: { title: 'Filo', body: 'Bu 500 batarya sentetiktir. Sayaçlar teknik inceleme, veri kontrolü, izleme veya rutin takip gereken batarya sayılarını gösterir.', task: 'Önceliğin gerekçesi için listeden bir batarya seçiniz. Sıcaklık senaryosu için İleri düğmesine basınız.' },
    },
  },
  {
    view: { scenario: 'temp-drift', day: EVENT_DAY, batteryId: 'DEMO-001', compare: true, filter: 'all', focus: 'panel' },
    text: {
      en: { title: 'Early warning', body: 'On day 8, DEMO-001 crosses a warning threshold and moves to Monitor. The no-event baseline shows the same battery without the injected event.', task: 'Compare the temperature values and the two lines in History. Dashed lines represent the no-event baseline.' },
      tr: { title: 'Erken uyarı', body: '8. günde DEMO-001 uyarı eşiğini aşar ve İzlemeye al durumuna geçer. Olaysız karşılaştırma aynı bataryayı olay eklenmeden gösterir.', task: 'Sıcaklık değerlerini ve Geçmiş sekmesindeki iki çizgiyi karşılaştırınız. Kesikli çizgi olaysız durumdur.' },
    },
  },
  {
    view: { scenario: 'temp-drift', day: FOCUS_DAY, batteryId: 'DEMO-001', compare: true, filter: 'all', focus: 'panel', tab: 'telemetry' },
    text: {
      en: { title: 'Priority change', body: 'By day 14, the same temperature event exceeds the critical demo threshold. The recommendation changes to Technical review.', task: 'Read Why and Recommendation, then check the temperature trace in Telemetry. The system supports the technician’s decision. It does not control the battery.' },
      tr: { title: 'Öncelik değişimi', body: '14. günde aynı sıcaklık olayı kritik demo eşiğini aşar. Öneri Teknik inceleme olarak değişir.', task: 'Neden ve Öneri alanlarını okuyup Telemetri sekmesindeki sıcaklık eğrisini inceleyiniz. Sistem teknik karara yardımcı olur. Bataryayı kontrol etmez.' },
    },
  },
  {
    view: { scenario: 'data-loss', day: FOCUS_DAY, batteryId: 'DEMO-003', compare: true, filter: 'all', focus: 'panel', tab: 'telemetry' },
    text: {
      en: { title: 'Missing data', body: 'This battery has gaps in its telemetry. It receives a separate Data review status rather than being assumed healthy.', task: 'Check Data coverage and the gaps in the charts. Missing readings are not filled with zero.' },
      tr: { title: 'Eksik veri', body: 'Bu bataryanın telemetrisinde kesintiler var. Demo, eksik ölçümler nedeniyle bataryayı Veri incelemesi durumuna alır.', task: 'Veri kapsama oranını ve grafiklerdeki boşlukları inceleyiniz. Eksik ölçümler sıfırla doldurulmaz.' },
    },
  },
  {
    view: { scenario: 'fleet-day', day: FOCUS_DAY, batteryId: 'DEMO-007', compare: false, filter: 'critical', focus: 'top' },
    text: {
      en: { title: 'Mixed fleet', body: 'Five event types affect 15 batteries at once. The list is filtered to Technical review so you can focus on the highest priority items.', task: 'Try the filters or search for a battery ID. Your search and filters are kept when you return from battery details.' },
      tr: { title: 'Karma filo', body: 'Beş olay türü aynı anda 15 bataryayı etkiler. Liste Teknik inceleme durumuna göre süzülmüştür.', task: 'Filtreleri deneyiniz veya batarya kimliği arayınız. Ayrıntıdan listeye dönüldüğünde arama ve filtreler korunur.' },
    },
  },
  {
    view: { scenario: 'fleet-day', day: FOCUS_DAY, batteryId: 'DEMO-007', compare: false, filter: 'critical', focus: 'passport' },
    text: {
      en: { title: 'Battery record', body: 'The passport brings identity, simulated health, priority changes and operational charging emissions together.', task: 'Inspect the event log and energy total. The carbon factor is a demo assumption, not a verified product carbon footprint.' },
      tr: { title: 'Batarya kaydı', body: 'Pasaport kimliği, simüle sağlığı, öncelik değişimlerini ve şarj kaynaklı operasyonel emisyonları birlikte gösterir.', task: 'Olay kaydını ve enerji toplamını inceleyiniz. Karbon faktörü demo varsayımıdır. Doğrulanmış ürün karbon ayak izi değildir.' },
    },
  },
  {
    view: { scenario: 'fleet-day', day: FOCUS_DAY, batteryId: 'DEMO-007', compare: false, filter: 'critical', focus: 'feedback' },
    text: {
      en: { title: 'Field feedback', body: 'In a real pilot, technical staff record whether an inspection confirmed the finding. The demo simulates this record.', task: 'Try Finding confirmed or False alarm. Feedback stays in this browser only. Reset clears it.' },
      tr: { title: 'Demo geri bildirimi', body: 'Gerçek pilotta teknik ekip incelemenin bulguyu doğrulayıp doğrulamadığını kaydeder. Demoda bu kayıt simüle edilir.', task: 'Bulgu doğrulandı veya Yanlış alarm düğmesini deneyiniz. Kayıt yalnız bu tarayıcıda tutulur. Sıfırla ile temizlenir.' },
    },
  },
  {
    view: { scenario: 'baseline', day: FOCUS_DAY, batteryId: NATURAL_FAULTS.imbalance, compare: false, filter: 'all', focus: 'top' },
    text: {
      en: { title: 'Other scenarios', body: 'You can now try Cell imbalance, Parked voltage drop and Rising internal resistance from the scenario menu. All data and thresholds remain illustrative.', task: 'Close the guide to explore freely. Project & team takes you directly back to the introduction.' },
      tr: { title: 'Diğer senaryolar', body: 'Senaryo menüsünde Hücre dengesizliği, Park gerilim düşüşü ve İç direnç artışı da vardır. Tüm veriler ve eşikler örnektir.', task: 'Serbest kullanım için rehberi kapatınız. Proje ve ekip bağlantısı tanıtım sayfasına döner.' },
    },
  },
]

export function Guide({ step, onStep, onClose }: { step: number; onStep: (i: number) => void; onClose: () => void }) {
  const { language, l } = useI18n()
  const text = GUIDE_STEPS[step].text[language]
  const last = GUIDE_STEPS.length - 1
  const guide = useRef<HTMLElement>(null)
  const [expanded, setExpanded] = useState(true)
  useEffect(() => { guide.current?.focus() }, [])
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])
  const target = GUIDE_STEPS[step].view.focus
  const targetId = target === 'top' ? 'list-title' : target === 'passport' ? 'passport' : target === 'feedback' ? 'feedback' : 'panel-title'
  return (
    <aside id="demo-guide" ref={guide} tabIndex={-1} onKeyDown={(event) => {
      if (event.defaultPrevented) return
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
      if ((event.target as HTMLElement).closest('input, select, textarea, [role="application"], [role="tablist"]')) return
      if (event.key === 'ArrowRight' && step < last) { event.preventDefault(); onStep(step + 1) }
      else if (event.key === 'ArrowLeft' && step > 0) { event.preventDefault(); onStep(step - 1) }
    }} aria-label={l('Guided demo', 'Demo rehberi')} className="demo-guide border border-line bg-panel p-4">
      <div className="top-0 z-10 flex items-start justify-between gap-3 bg-panel"><div><p role="status" aria-live="polite" aria-atomic="true" className="text-xs font-semibold text-accent">{l('Guided demo', 'Demo rehberi')} · {step + 1} / {GUIDE_STEPS.length} · {text.title}</p><h2 className="mt-1 text-base font-bold">{text.title}</h2></div><button type="button" onClick={onClose} aria-label={l('Close guide', 'Rehberi kapat')} className="rounded-md p-1 text-mute hover:text-ink"><X size={20} aria-hidden /></button></div>
      <button type="button" className="guide-toggle text-sm underline" aria-expanded={expanded} aria-controls="guide-explanation" onClick={() => setExpanded(!expanded)}>{expanded ? l('Hide explanation', 'Açıklamayı gizle') : l('Show explanation', 'Açıklamayı göster')}</button>
      <div id="guide-explanation" hidden={!expanded}><p className="mt-3 text-sm leading-relaxed">{text.body}</p>
      <p className="mt-3 rounded-md border border-line bg-card p-2.5 text-xs leading-relaxed text-mute"><strong className="text-ink">{l('Try this.', 'Deneyiniz.')}</strong> {text.task}</p></div>
      <a className="guide-target text-sm underline" href={`#${targetId}`}>{l('Inspect this step in the demo', 'Bu adımı demoda incele')}</a>
      <div className="bottom-0 mt-3 flex items-center justify-between gap-2 border-t border-line bg-panel pt-3"><button type="button" disabled={step === 0} onClick={() => onStep(step - 1)} className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-sm font-semibold disabled:opacity-40"><ArrowLeft size={15} aria-hidden />{l('Back', 'Geri')}</button><span className="text-xs text-mute">{step + 1} / {GUIDE_STEPS.length}</span><button type="button" onClick={() => step < last ? onStep(step + 1) : onClose()} className="inline-flex items-center gap-1 rounded-md border border-accent bg-accent/20 px-2.5 py-1.5 text-sm font-semibold">{step < last ? l('Next', 'İleri') : l('Finish', 'Bitir')}<ArrowRight size={15} aria-hidden /></button></div>
    </aside>
  )
}
