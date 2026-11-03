import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useEffect } from 'react'
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
      en: { title: 'Start with the fleet', body: 'These 500 batteries are synthetic. The counters show how many need technical review, a data check, monitoring or routine observation.', task: 'Select a battery in the list to see the reason behind its priority. Use Next to try a temperature scenario.' },
      tr: { title: 'Filoyu keşfedin', body: 'Bu 500 batarya sentetiktir. Sayaçlar teknik inceleme, veri kontrolü, izleme veya rutin takip gereken batarya sayılarını gösterir.', task: 'Önceliğin gerekçesini görmek için listeden bir batarya seçin. Sıcaklık senaryosunu denemek için İleri düğmesine basın.' },
    },
  },
  {
    view: { scenario: 'temp-drift', day: EVENT_DAY, batteryId: 'DEMO-001', compare: true, filter: 'all', focus: 'panel' },
    text: {
      en: { title: 'Spot an early warning', body: 'On day 8, DEMO-001 crosses a warning threshold and moves to Monitor. The no-event baseline shows the same battery without the injected event.', task: 'Compare the temperature values and the two lines in History. Dashed lines represent the no-event baseline.' },
      tr: { title: 'Erken uyarıyı görün', body: '8. günde DEMO-001 uyarı eşiğini aşarak İzlemeye al durumuna geçer. Olaysız karşılaştırma, aynı bataryayı olay eklenmeden gösterir.', task: 'Sıcaklık değerlerini ve Geçmiş sekmesindeki iki çizgiyi karşılaştırın. Kesikli çizgi olaysız durumu gösterir.' },
    },
  },
  {
    view: { scenario: 'temp-drift', day: FOCUS_DAY, batteryId: 'DEMO-001', compare: true, filter: 'all', focus: 'panel', tab: 'telemetry' },
    text: {
      en: { title: 'See why the priority changes', body: 'By day 14, the same temperature event exceeds the critical demo threshold. The recommendation changes to Technical review.', task: 'Read Why and Recommendation, then inspect the temperature trace in Telemetry. The system supports a technician’s decision; it does not control the battery.' },
      tr: { title: 'Önceliğin neden değiştiğini inceleyin', body: '14. günde aynı sıcaklık olayı kritik demo eşiğini aşar. Öneri Teknik inceleme olarak değişir.', task: 'Neden ve Öneri alanlarını okuyup Telemetri sekmesindeki sıcaklık eğrisini inceleyin. Sistem teknik karara yardımcı olur; bataryayı kontrol etmez.' },
    },
  },
  {
    view: { scenario: 'data-loss', day: FOCUS_DAY, batteryId: 'DEMO-003', compare: true, filter: 'all', focus: 'panel', tab: 'telemetry' },
    text: {
      en: { title: 'Missing data is not good health', body: 'This battery has gaps in its telemetry. It receives a separate Data review status rather than being assumed healthy.', task: 'Check Data coverage and the gaps in the charts. Missing readings are not filled with zero.' },
      tr: { title: 'Eksik veri sağlıklı demek değildir', body: 'Bu bataryanın telemetrisinde kesintiler var. Sağlıklı varsayılmak yerine ayrı bir Veri incelemesi durumuna alınır.', task: 'Veri yeterliliğini ve grafiklerdeki boşlukları inceleyin. Eksik ölçümler sıfırla doldurulmaz.' },
    },
  },
  {
    view: { scenario: 'fleet-day', day: FOCUS_DAY, batteryId: 'DEMO-007', compare: false, filter: 'critical', focus: 'top' },
    text: {
      en: { title: 'Prioritise a mixed fleet', body: 'Five event types affect 15 batteries at once. The list is filtered to Technical review so you can focus on the highest priority items.', task: 'Try the filters or search for a battery ID. Your search and filters are kept when you return from battery details.' },
      tr: { title: 'Karma filoda öncelik belirleyin', body: 'Beş olay türü aynı anda 15 bataryayı etkiler. En yüksek önceliğe odaklanabilmeniz için liste Teknik inceleme durumuna süzülmüştür.', task: 'Filtreleri deneyin veya batarya kimliği arayın. Ayrıntıdan listeye döndüğünüzde arama ve filtreleriniz korunur.' },
    },
  },
  {
    view: { scenario: 'fleet-day', day: FOCUS_DAY, batteryId: 'DEMO-007', compare: false, filter: 'critical', focus: 'passport' },
    text: {
      en: { title: 'Follow one battery’s record', body: 'The passport brings identity, simulated health, priority changes and operational charging emissions together.', task: 'Inspect the event log and energy total. The carbon factor is a demo assumption, not a verified product carbon footprint.' },
      tr: { title: 'Bir bataryanın kaydını takip edin', body: 'Pasaport; kimliği, simüle sağlığı, öncelik değişimlerini ve şarj kaynaklı operasyonel emisyonları birleştirir.', task: 'Olay kaydını ve enerji toplamını inceleyin. Karbon faktörü bir demo varsayımıdır; doğrulanmış ürün karbon ayak izi değildir.' },
    },
  },
  {
    view: { scenario: 'fleet-day', day: FOCUS_DAY, batteryId: 'DEMO-007', compare: false, filter: 'critical', focus: 'feedback' },
    text: {
      en: { title: 'Try the feedback controls', body: 'In a real pilot, technical staff would record whether an inspection confirmed the finding. Here you can simulate that feedback.', task: 'Try Finding confirmed or False alarm. Feedback stays in this browser only; Reset clears it.' },
      tr: { title: 'Geri bildirim düğmelerini deneyin', body: 'Gerçek bir pilotta teknik ekip, incelemenin bulguyu doğrulayıp doğrulamadığını kaydeder. Burada bu geri bildirimi simüle edebilirsiniz.', task: 'Bulgu doğrulandı veya Yanlış alarm düğmesini deneyin. Kayıt yalnız bu tarayıcıda tutulur; Sıfırla ile temizlenir.' },
    },
  },
  {
    view: { scenario: 'baseline', day: FOCUS_DAY, batteryId: NATURAL_FAULTS.imbalance, compare: false, filter: 'all', focus: 'top' },
    text: {
      en: { title: 'Explore on your own', body: 'You can now try Cell imbalance, Parked voltage drop and Rising internal resistance from the scenario menu. All data and thresholds remain illustrative.', task: 'Close the guide to explore freely. Project & team takes you directly back to the introduction.' },
      tr: { title: 'Keşfetmeye devam edin', body: 'Senaryo menüsünden Hücre dengesizliği, Park gerilim düşüşü ve İç direnç artışını da deneyebilirsiniz. Tüm veriler ve eşikler örnektir.', task: 'Serbestçe denemek için rehberi kapatın. Proje ve ekip bağlantısı doğrudan tanıtım sayfasına döner.' },
    },
  },
]

export function Guide({ step, onStep, onClose }: { step: number; onStep: (i: number) => void; onClose: () => void }) {
  const { language, l } = useI18n()
  const text = GUIDE_STEPS[step].text[language]
  const last = GUIDE_STEPS.length - 1
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return
      if (event.key === 'ArrowRight' && step < last) { event.preventDefault(); onStep(step + 1) }
      else if (event.key === 'ArrowLeft' && step > 0) { event.preventDefault(); onStep(step - 1) }
      else if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step, last, onStep, onClose])
  return (
    <aside aria-label={l('Guided demo', 'Demo rehberi')} className="demo-guide fixed inset-x-2 bottom-2 z-50 rounded-xl border border-accent/60 bg-panel p-4 shadow-2xl sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[400px]">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-3 bg-panel"><div><p className="text-xs font-semibold text-accent">{l('Guided demo', 'Demo rehberi')} · {step + 1} / {GUIDE_STEPS.length}</p><h2 className="mt-1 text-base font-bold">{text.title}</h2></div><button type="button" onClick={onClose} aria-label={l('Close guide', 'Rehberi kapat')} className="rounded-md p-1 text-mute hover:text-ink"><X size={20} aria-hidden /></button></div>
      <p className="mt-3 text-sm leading-relaxed">{text.body}</p>
      <p className="mt-3 rounded-md border border-line bg-card p-2.5 text-xs leading-relaxed text-mute"><strong className="text-ink">{l('Try this: ', 'Deneyin: ')}</strong>{text.task}</p>
      <div className="sticky bottom-0 mt-3 flex items-center justify-between gap-2 border-t border-line bg-panel pt-3"><button type="button" disabled={step === 0} onClick={() => onStep(step - 1)} className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-sm font-semibold disabled:opacity-40"><ArrowLeft size={15} aria-hidden />{l('Back', 'Geri')}</button><span className="text-xs text-mute">{step + 1} / {GUIDE_STEPS.length}</span><button type="button" onClick={() => step < last ? onStep(step + 1) : onClose()} className="inline-flex items-center gap-1 rounded-md border border-accent bg-accent/20 px-2.5 py-1.5 text-sm font-semibold">{step < last ? l('Next', 'İleri') : l('Finish', 'Bitir')}<ArrowRight size={15} aria-hidden /></button></div>
    </aside>
  )
}
