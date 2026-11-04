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

export function evaluate(m: RuleInput, r = DEMO_RULES, language: 'tr' | 'en' = 'tr'): Evaluation {
  const findings: Finding[] = []

  // Bilinen eşik ihlalleri eksik veri nedeniyle gizlenmez; önce onlar eklenir.
  if (m.tempMax !== null && m.tempMax >= r.tempCritC) {
    findings.push({
      priority: 'critical',
      signal: 'Sıcaklık sapması',
      action: 'Soğutma ve bağlantılar için teknik inceleme önerilir',
      reason: `Tepe sıcaklık ${tr(m.tempMax)} °C ≥ ${r.tempCritC} °C kritik eşik`,
    })
  }
  if (m.dvMax !== null && m.dvMax >= r.dvCritMv) {
    findings.push({
      priority: 'critical',
      signal: 'Hücre dengesizliği (ΔV)',
      action: 'Hücre ve grup dengesi için teknik inceleme önerilir',
      reason: `Tepe ΔV ${tr(m.dvMax, 0)} mV ≥ ${r.dvCritMv} mV kritik eşik`,
    })
  }
  if (m.parkDropMvH !== null && m.parkDropMvH >= r.parkCritMvH) {
    findings.push({
      priority: 'critical',
      signal: 'Park geriliminde düşüş',
      action: 'Mikro kısa devre şüphesiyle teknik inceleme önerilir',
      reason: `Park gerilim düşüşü ${tr(m.parkDropMvH)} mV/sa ≥ ${r.parkCritMvH} mV/sa kritik eşik`,
    })
  }
  if (m.rMohm !== null && m.rMohm >= r.rCritMohm) {
    findings.push({
      priority: 'critical',
      signal: 'İç direnç artışı',
      action: 'Bağlantı ve hücre direnci için teknik inceleme önerilir',
      reason: `Tahmini iç direnç ${tr(m.rMohm, 0)} mΩ ≥ ${r.rCritMohm} mΩ kritik eşik`,
    })
  }
  if (m.coverage < r.coverageMinPct) {
    findings.push({
      priority: 'data_review',
      signal: 'Veri yeterliliği düşük',
      action: 'Veri hattı ve cihaz bağlantısı kontrol edilmeli. Eksik veri sağlıklı sayılmaz',
      reason: `Veri yeterliliği %${tr(m.coverage)} < %${r.coverageMinPct} alt sınır`,
    })
  }
  if (m.tempMax !== null && m.tempMax >= r.tempWarnC && m.tempMax < r.tempCritC) {
    findings.push({
      priority: 'attention',
      signal: 'Sıcaklık yükseliyor',
      action: 'İzlemeye alınmalı, kullanım ve soğutma gözden geçirilmeli',
      reason: `Tepe sıcaklık ${tr(m.tempMax)} °C ≥ ${r.tempWarnC} °C uyarı eşiği`,
    })
  }
  if (m.dvMax !== null && m.dvMax >= r.dvWarnMv && m.dvMax < r.dvCritMv) {
    findings.push({
      priority: 'attention',
      signal: 'ΔV artıyor',
      action: 'İzlemeye alınmalı, dengeleme şarjı planlanabilir',
      reason: `Tepe ΔV ${tr(m.dvMax, 0)} mV ≥ ${r.dvWarnMv} mV uyarı eşiği`,
    })
  }
  if (m.parkDropMvH !== null && m.parkDropMvH >= r.parkWarnMvH && m.parkDropMvH < r.parkCritMvH) {
    findings.push({
      priority: 'attention',
      signal: 'Park gerilimi düşüyor',
      action: 'İzlemeye alınmalı, park gerilimi takip edilmeli',
      reason: `Park gerilim düşüşü ${tr(m.parkDropMvH)} mV/sa ≥ ${r.parkWarnMvH} mV/sa uyarı eşiği`,
    })
  }
  if (m.rMohm !== null && m.rMohm >= r.rWarnMohm && m.rMohm < r.rCritMohm) {
    findings.push({
      priority: 'attention',
      signal: 'İç direnç yükseliyor',
      action: 'İzlemeye alınmalı, güç ve şarj kabulü takip edilmeli',
      reason: `Tahmini iç direnç ${tr(m.rMohm, 0)} mΩ ≥ ${r.rWarnMohm} mΩ uyarı eşiği`,
    })
  }
  if (m.soh < r.sohAttentionPct) {
    findings.push({
      priority: 'attention',
      signal: 'Kapasite eşiğine yakın',
      action: 'Değişim veya ikinci kullanım değerlendirmesine aday',
      reason: `Simüle SOH %${tr(m.soh)} < %${r.sohAttentionPct}`,
    })
  }

  if (findings.length === 0) {
    return {
      priority: 'normal',
      signal: language === 'en' ? 'No deviation' : 'Sapma yok',
      action: language === 'en' ? 'Routine monitoring' : 'Rutin izleme',
      reasons: [language === 'en' ? 'Measurements are within the demo thresholds' : 'Ölçümler demo eşiklerinin içinde'],
    }
  }

  // En yüksek öncelikli bulgu baskın sinyal olur; eşitlikte yukarıdaki sıra korunur.
  const lead = findings.reduce((a, b) =>
    PRIORITY_RANK[b.priority] < PRIORITY_RANK[a.priority] ? b : a,
  )
  if (language === 'en') {
    const n = (value: number | null, digits = 1) => value === null ? '—' : value.toFixed(digits)
    // Presentation only: the findings and their priority are calculated above, once.
    const english: Record<string, { signal: string; action: string; reason: string }> = {
      'Sıcaklık sapması': { signal: 'Temperature drift', action: 'Technical review recommended for cooling and connections', reason: `Peak temperature ${n(m.tempMax)} °C ≥ ${r.tempCritC} °C critical threshold` },
      'Hücre dengesizliği (ΔV)': { signal: 'Cell imbalance (ΔV)', action: 'Technical review recommended for cell and group balance', reason: `Peak ΔV ${n(m.dvMax, 0)} mV ≥ ${r.dvCritMv} mV critical threshold` },
      'Park geriliminde düşüş': { signal: 'Parked voltage drop', action: 'Technical review recommended for suspected internal leakage', reason: `Parked voltage drop ${n(m.parkDropMvH)} mV/h ≥ ${r.parkCritMvH} mV/h critical threshold` },
      'İç direnç artışı': { signal: 'Rising internal resistance', action: 'Technical review recommended for connections and cell resistance', reason: `Estimated internal resistance ${n(m.rMohm, 0)} mΩ ≥ ${r.rCritMohm} mΩ critical threshold` },
      'Veri yeterliliği düşük': { signal: 'Low data coverage', action: 'Check the data pipeline and device connection. Missing data does not mean a healthy battery', reason: `Data coverage ${n(m.coverage)}% < ${r.coverageMinPct}% minimum` },
      'Sıcaklık yükseliyor': { signal: 'Temperature increasing', action: 'Monitor and review usage and cooling', reason: `Peak temperature ${n(m.tempMax)} °C ≥ ${r.tempWarnC} °C warning threshold` },
      'ΔV artıyor': { signal: 'Increasing ΔV', action: 'Monitor and consider a balancing charge', reason: `Peak ΔV ${n(m.dvMax, 0)} mV ≥ ${r.dvWarnMv} mV warning threshold` },
      'Park gerilimi düşüyor': { signal: 'Parked voltage decreasing', action: 'Monitor the parked voltage trend', reason: `Parked voltage drop ${n(m.parkDropMvH)} mV/h ≥ ${r.parkWarnMvH} mV/h warning threshold` },
      'İç direnç yükseliyor': { signal: 'Internal resistance increasing', action: 'Monitor power delivery and charge acceptance', reason: `Estimated internal resistance ${n(m.rMohm, 0)} mΩ ≥ ${r.rWarnMohm} mΩ warning threshold` },
      'Kapasite eşiğine yakın': { signal: 'Near the capacity threshold', action: 'Candidate for replacement or second use assessment', reason: `Simulated SOH ${n(m.soh)}% < ${r.sohAttentionPct}%` },
    }
    const translate = (finding: Finding) => {
      const text = english[finding.signal]
      if (!text) throw new Error(`Missing English rule text: ${finding.signal}`)
      return text
    }
    return { priority: lead.priority, signal: translate(lead).signal, action: translate(lead).action, reasons: findings.map((f) => translate(f).reason) }
  }
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
