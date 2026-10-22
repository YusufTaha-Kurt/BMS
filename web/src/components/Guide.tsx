import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect } from 'react'
import { EVENT_DAY, FOCUS_DAY, NATURAL_FAULTS, type ScenarioId } from '../../shared/config.ts'
import type { Filter } from './FleetList.tsx'

/** Rehber adımının panelde kuracağı görünüm. */
export interface GuideView {
  scenario: ScenarioId
  day: number
  batteryId: string
  compare: boolean
  filter: Filter
  /** Adım açılınca görünür yapılacak bölüm. */
  focus?: 'top' | 'panel' | 'passport' | 'feedback' | 'history'
}

export interface GuideStep {
  title: string
  say: string
  show: string
  view: GuideView
}

export const GUIDE_STEPS: GuideStep[] = [
  {
    title: 'Filo bakış ekranı',
    say: '500 bataryalık bir filo. Üstteki sayaçlar, bakım ekibinin her sabah göreceği öncelik listesinin özeti. Olay eklenmemiş sıradan bir günde bile 3 batarya teknik inceleme önerisi alıyor.',
    show: 'Üstteki "Teknik inceleme 3" kartı ve öncelik listesinin ilk üç satırı.',
    view: { scenario: 'baseline', day: FOCUS_DAY, batteryId: NATURAL_FAULTS.imbalance, compare: false, filter: 'all', focus: 'top' },
  },
  {
    title: 'Her önerinin gerekçesi var',
    say: 'Sistem kara kutu değil: bu bataryada tepe ΔV 200 mV kritik eşiği aşıyor ve gerekçe açıkça yazıyor. Kararı sistem değil, teknik personel verir; sistem önceliği ve nedenini sunar.',
    show: '"Bakım nedeni" ve "Operasyonel aksiyon planı" kartları, ΔV grafiğindeki eşik çizgisi.',
    view: { scenario: 'baseline', day: FOCUS_DAY, batteryId: NATURAL_FAULTS.imbalance, compare: false, filter: 'all', focus: 'panel' },
  },
  {
    title: 'Erken uyarı: sıcaklık sapması başlıyor',
    say: `Olay ${EVENT_DAY}. gün başlıyor. Batarya henüz kritik değil ama "İzlemeye al" durumuna geçiyor; arıza büyümeden ekip haberdar oluyor. Kesikli çizgi aynı bataryanın olaysız halidir.`,
    show: 'Sıcaklık kartındaki "Olaysız" farkı ve kesikli karşılaştırma çizgileri.',
    view: { scenario: 'temp-drift', day: EVENT_DAY, batteryId: 'DEMO-001', compare: true, filter: 'all', focus: 'panel' },
  },
  {
    title: 'Sapma büyüyünce teknik inceleme',
    say: 'Altı gün sonra tepe sıcaklık 55 °C eşiğini aşıyor ve öncelik yükseliyor. Telemetri grafiği ısınmanın gün içinde sürüş ve şarj anlarında nasıl arttığını gösteriyor.',
    show: 'Günlük sıcaklık geçmişindeki yükseliş ve alttaki telemetri grafiği.',
    view: { scenario: 'temp-drift', day: FOCUS_DAY, batteryId: 'DEMO-001', compare: true, filter: 'all', focus: 'history' },
  },
  {
    title: 'Hücre dengesizliği (ΔV)',
    say: 'Hücreler arası gerilim farkı her gün büyüyor. Teklifteki kullanım senaryosunun birebir karşılığı: benzer bataryalardan sapan ΔV teknik inceleme için öne alınıyor.',
    show: 'ΔV kartı ve ΔV geçmiş grafiği.',
    view: { scenario: 'cell-imbalance', day: FOCUS_DAY, batteryId: 'DEMO-002', compare: true, filter: 'all', focus: 'panel' },
  },
  {
    title: 'Park geriliminde düşüş',
    say: 'Batarya park halindeyken akım çekilmediği halde gerilimi düşüyor. Bu, mikro kısa devre şüphesinin tipik işaretidir; BMS alarmı oluşmadan yakalanabilir.',
    show: '"Park gerilim düşüşü" kartı ve geçmiş grafiği; telemetride öğle saatlerindeki gerilim eğimi.',
    view: { scenario: 'self-discharge', day: FOCUS_DAY, batteryId: 'DEMO-007', compare: true, filter: 'all', focus: 'panel' },
  },
  {
    title: 'İç direnç artışı',
    say: 'Sürüş başlangıcındaki gerilim sıçramasından iç direnç tahmin ediliyor. Direnç arttıkça güç ve şarj kabulü düşer; AB tüzüğünün sağlık parametreleri arasında da yer alır.',
    show: '"Tahmini iç direnç" kartı ve direnç geçmiş grafiği.',
    view: { scenario: 'resistance-rise', day: FOCUS_DAY, batteryId: 'DEMO-008', compare: true, filter: 'all', focus: 'panel' },
  },
  {
    title: 'Veri yoksa sağlıklı sayılmaz',
    say: 'Telemetri kesildiğinde sistem bataryayı "sağlıklı" varsaymıyor; ayrı bir "Veri incelemesi" durumuna alıyor. Eksik ölçümler grafikte boşluk olarak kalıyor.',
    show: '"Veri yeterliliği" kartı ve telemetrideki boşluklar.',
    view: { scenario: 'data-loss', day: FOCUS_DAY, batteryId: 'DEMO-003', compare: true, filter: 'all', focus: 'panel' },
  },
  {
    title: 'Karma filo günü',
    say: 'Beş olay türü 15 bataryada aynı anda yaşanıyor. Liste yalnız teknik inceleme gerektirenlere süzüldü: bakım ekibi sırayla neye bakacağını biliyor.',
    show: 'Üstteki sayaçlar ve "Teknik inceleme" filtresiyle süzülmüş liste.',
    view: { scenario: 'fleet-day', day: FOCUS_DAY, batteryId: 'DEMO-007', compare: false, filter: 'critical', focus: 'top' },
  },
  {
    title: 'Dijital Batarya Pasaportu',
    say: 'Aynı veri, batarya kimliği altında pasaportu besliyor. SOH\'nin kaynağı (model, BMS, referans ölçüm) ayrı tutuluyor; olaylar denetlenebilir kayıt oluyor; şarj kaynaklı karbon ayrı hesaplanıyor.',
    show: 'Pasaport kartındaki dört bölüm ve erişim seviyeleri.',
    view: { scenario: 'fleet-day', day: FOCUS_DAY, batteryId: 'DEMO-007', compare: false, filter: 'critical', focus: 'passport' },
  },
  {
    title: 'Kapalı döngü: saha geri bildirimi',
    say: 'Teknisyen incelemeden sonra bulgunun doğru mu yanlış alarm mı olduğunu işaretliyor. Böylece pilot boyunca sistemin isabeti ölçülüyor. Şimdi bir düğmeye basın: üstteki filo kartında sayı belirir.',
    show: '"Saha geri bildirimi" düğmeleri ve üstteki filo kartı.',
    view: { scenario: 'fleet-day', day: FOCUS_DAY, batteryId: 'DEMO-007', compare: false, filter: 'critical', focus: 'feedback' },
  },
  {
    title: 'Sonraki adım: Faz 0',
    say: 'Bu demo sentetik veriyle çalışıyor ve hiçbir sayı BinBin performansı iddiası değil. Faz 0\'da (ilk 4 hafta) BinBin verisiyle veri boşluk analizi yapılır, hangi modellerin kurulabileceği netleşir; her faz sonunda devam kararı birlikte verilir.',
    show: 'Ekranın altındaki sentetik veri notu.',
    view: { scenario: 'baseline', day: FOCUS_DAY, batteryId: NATURAL_FAULTS.imbalance, compare: false, filter: 'all', focus: 'top' },
  },
]

interface Props {
  step: number
  onStep: (i: number) => void
  onClose: () => void
}

export function Guide({ step, onStep, onClose }: Props) {
  const s = GUIDE_STEPS[step]
  const last = GUIDE_STEPS.length - 1

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA')) return
      if (e.key === 'ArrowRight' && step < last) onStep(step + 1)
      else if (e.key === 'ArrowLeft' && step > 0) onStep(step - 1)
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step, last, onStep, onClose])

  return (
    <aside
      aria-label="Sunum rehberi"
      className="fixed inset-x-2 bottom-2 z-50 rounded-xl border border-accent/60 bg-panel/95 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[400px]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-accent">Sunum rehberi · {step + 1} / {GUIDE_STEPS.length}</p>
          <h2 className="mt-0.5 text-base font-bold">{s.title}</h2>
        </div>
        <button type="button" onClick={onClose} aria-label="Rehberi kapat" className="rounded-md p-1 text-mute hover:text-ink">
          <X aria-hidden className="size-4" />
        </button>
      </div>
      <p className="mt-2 text-sm leading-relaxed">{s.say}</p>
      <p className="mt-2 rounded-md border border-line bg-card px-2.5 py-1.5 text-xs text-mute">
        <span className="font-semibold text-ink">Ekranda göster:</span> {s.show}
      </p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <button type="button" disabled={step === 0} onClick={() => onStep(step - 1)}
          className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-sm font-semibold enabled:hover:border-accent disabled:opacity-40">
          <ChevronLeft aria-hidden className="size-4" /> Geri
        </button>
        <div className="flex gap-1" aria-hidden>
          {GUIDE_STEPS.map((_, i) => (
            <button key={i} type="button" tabIndex={-1} onClick={() => onStep(i)}
              className={`size-2 rounded-full ${i === step ? 'bg-accent' : 'bg-line hover:bg-mute'}`} />
          ))}
        </div>
        {step < last ? (
          <button type="button" onClick={() => onStep(step + 1)}
            className="inline-flex items-center gap-1 rounded-md border border-accent bg-accent/20 px-2.5 py-1.5 text-sm font-semibold hover:bg-accent/30">
            İleri <ChevronRight aria-hidden className="size-4" />
          </button>
        ) : (
          <button type="button" onClick={onClose}
            className="rounded-md border border-accent bg-accent/20 px-2.5 py-1.5 text-sm font-semibold hover:bg-accent/30">
            Bitir
          </button>
        )}
      </div>
      <p className="mt-2 text-[11px] text-mute">Klavye: ← → adım değiştirir, Esc kapatır.</p>
    </aside>
  )
}
