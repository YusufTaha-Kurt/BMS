// Kural tabanlı bakım değerlendirmesi. ML/model skoru yoktur; yalnız demo eşikleri uygulanır.
// Durum adları teklifin Bölüm VII tablosunu izler; nihai karar teknik personeldedir, sistem öneri sunar.
import { DEMO_RULES } from './config.ts'
import type { Evaluation, FleetRow, Priority, PriorityCounts } from './types.ts'

export const PRIORITY_RANK: Record<Priority, number> = {
  critical: 0,
  data_review: 1,
  attention: 2,
  normal: 3,
}

export const PRIORITY_LABEL: Record<Priority, string> = {
  critical: 'Teknik inceleme',
  data_review: 'Veri incelemesi',
  attention: 'İzlemeye al',
  normal: 'Normal',
}

/** Teklifteki örnek paneldeki HIGH/MEDIUM/LOW karşılığı. */
export const PRIORITY_LEVEL: Record<Priority, string> = {
  critical: 'Yüksek öncelik',
  data_review: 'Orta öncelik',
  attention: 'Orta öncelik',
  normal: 'Düşük öncelik',
}

export interface RuleInput {
  soh: number
  tempMax: number | null
  dvMax: number | null
  parkDropMvH: number | null
  rMohm: number | null
  coverage: number
}

const tr = (n: number, d = 1) => n.toFixed(d).replace('.', ',')

interface Finding {
  priority: Priority
  signal: string
  action: string
  reason: string
}

export function evaluate(m: RuleInput, r = DEMO_RULES): Evaluation {
  const findings: Finding[] = []

  // Bilinen eşik ihlalleri eksik veri nedeniyle gizlenmez; önce onlar eklenir.
  if (m.tempMax !== null && m.tempMax >= r.tempCritC) {
    findings.push({
      priority: 'critical',
      signal: 'Sıcaklık sapması',
      action: 'Teknik inceleme önerilir: soğutma ve bağlantılar',
      reason: `Tepe sıcaklık ${tr(m.tempMax)} °C ≥ ${r.tempCritC} °C kritik eşik`,
    })
  }
  if (m.dvMax !== null && m.dvMax >= r.dvCritMv) {
    findings.push({
      priority: 'critical',
      signal: 'Hücre dengesizliği (ΔV)',
      action: 'Teknik inceleme önerilir: hücre/grup dengesi',
      reason: `Tepe ΔV ${tr(m.dvMax, 0)} mV ≥ ${r.dvCritMv} mV kritik eşik`,
    })
  }
  if (m.parkDropMvH !== null && m.parkDropMvH >= r.parkCritMvH) {
    findings.push({
      priority: 'critical',
      signal: 'Park geriliminde düşüş',
      action: 'Teknik inceleme önerilir: mikro kısa devre şüphesi',
      reason: `Park gerilim düşüşü ${tr(m.parkDropMvH)} mV/sa ≥ ${r.parkCritMvH} mV/sa kritik eşik`,
    })
  }
  if (m.rMohm !== null && m.rMohm >= r.rCritMohm) {
    findings.push({
      priority: 'critical',
      signal: 'İç direnç artışı',
      action: 'Teknik inceleme önerilir: bağlantı ve hücre direnci',
      reason: `Tahmini iç direnç ${tr(m.rMohm, 0)} mΩ ≥ ${r.rCritMohm} mΩ kritik eşik`,
    })
  }
  if (m.coverage < r.coverageMinPct) {
    findings.push({
      priority: 'data_review',
      signal: 'Veri yeterliliği düşük',
      action: 'Veri hattı ve cihaz bağlantısı kontrol edilmeli; eksik veri sağlıklı sayılmaz',
      reason: `Veri yeterliliği %${tr(m.coverage)} < %${r.coverageMinPct} alt sınır`,
    })
  }
  if (m.tempMax !== null && m.tempMax >= r.tempWarnC && m.tempMax < r.tempCritC) {
    findings.push({
      priority: 'attention',
      signal: 'Sıcaklık yükseliyor',
      action: 'İzlemeye al: kullanım ve soğutma gözden geçirilsin',
      reason: `Tepe sıcaklık ${tr(m.tempMax)} °C ≥ ${r.tempWarnC} °C uyarı eşiği`,
    })
  }
  if (m.dvMax !== null && m.dvMax >= r.dvWarnMv && m.dvMax < r.dvCritMv) {
    findings.push({
      priority: 'attention',
      signal: 'ΔV artıyor',
      action: 'İzlemeye al: dengeleme şarjı planlanabilir',
      reason: `Tepe ΔV ${tr(m.dvMax, 0)} mV ≥ ${r.dvWarnMv} mV uyarı eşiği`,
    })
  }
  if (m.parkDropMvH !== null && m.parkDropMvH >= r.parkWarnMvH && m.parkDropMvH < r.parkCritMvH) {
    findings.push({
      priority: 'attention',
      signal: 'Park gerilimi düşüyor',
      action: 'İzlemeye al: park gerilimi takip edilsin',
      reason: `Park gerilim düşüşü ${tr(m.parkDropMvH)} mV/sa ≥ ${r.parkWarnMvH} mV/sa uyarı eşiği`,
    })
  }
  if (m.rMohm !== null && m.rMohm >= r.rWarnMohm && m.rMohm < r.rCritMohm) {
    findings.push({
      priority: 'attention',
      signal: 'İç direnç yükseliyor',
      action: 'İzlemeye al: güç ve şarj kabulü takip edilsin',
      reason: `Tahmini iç direnç ${tr(m.rMohm, 0)} mΩ ≥ ${r.rWarnMohm} mΩ uyarı eşiği`,
    })
  }
  if (m.soh < r.sohAttentionPct) {
    findings.push({
      priority: 'attention',
      signal: 'Kapasite eşiğine yakın',
      action: 'Yaşam döngüsü değerlendirmesine aday (değişim / ikinci yaşam)',
      reason: `Simüle SOH %${tr(m.soh)} < %${r.sohAttentionPct}`,
    })
  }

  if (findings.length === 0) {
    return {
      priority: 'normal',
      signal: 'Sapma yok',
      action: 'Rutin izleme',
      reasons: ['Ölçümler demo eşiklerinin içinde'],
    }
  }

  // En yüksek öncelikli bulgu baskın sinyal olur; eşitlikte yukarıdaki sıra korunur.
  const lead = findings.reduce((a, b) =>
    PRIORITY_RANK[b.priority] < PRIORITY_RANK[a.priority] ? b : a,
  )
  return {
    priority: lead.priority,
    signal: lead.signal,
    action: lead.action,
    reasons: findings.map((f) => f.reason),
  }
}

/** Öncelik rütbesi, sonra kimlik; eşitlikte kararlı sıra. */
export function compareRows(a: Pick<FleetRow, 'id' | 'priority'>, b: Pick<FleetRow, 'id' | 'priority'>) {
  const d = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
  if (d !== 0) return d
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
}

export function countPriorities(rows: { priority: Priority }[]): PriorityCounts {
  const c: PriorityCounts = { total: rows.length, critical: 0, data_review: 0, attention: 0, normal: 0 }
  for (const r of rows) c[r.priority]++
  return c
}
