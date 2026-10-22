// Basit sentetik batarya telemetri modeli (13S Li-ion paket, 5 dk adım).
// Fiziksel olarak doğrulanmış bir simülatör değildir; demo verisi üretmek içindir.
import { DAYS, EVENT_DAY, SIM_START, STEP_MINUTES, STEPS_PER_DAY, type EventKind } from '../shared/config.ts'
import type { DaySummary } from '../shared/types.ts'

export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function hashStr(s: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

export interface BatteryParams {
  id: string
  capNomAh: number
  soh0: number // başlangıç simüle SOH, %
  ageRate: number // %/gün (temel yaşlanma)
  rOhm: number
  ambBase: number // °C
  hA: number // W/K ısı atımı
  dvBase: number // mV
  dropStart: number // adım başına veri kesintisi başlama olasılığı
  leakA: number // iç kaçak akımı (akım sensörü görmez), A
  ride1: number // saat
  ride2: number
  rideDur: number // saat
  rideCur: number // A
  chargeStart: number // saat
  chargeCur: number // A
  soc0: number
}

export function makeParams(id: string, index: number, seed: number): BatteryParams {
  const r = mulberry32((seed ^ hashStr(id)) >>> 0)
  const u = (a: number, b: number) => a + (b - a) * r()
  const hot = r() < 0.08
  const flaky = r() < 0.03
  const lowSoh = r() < 0.07
  const wobbly = r() < 0.06
  const leaky = r() < 0.04
  const stiff = r() < 0.04
  const p: BatteryParams = {
    id,
    capNomAh: u(22, 30),
    soh0: lowSoh ? u(78.4, 81.5) : u(84, 99),
    ageRate: u(0.025, 0.06),
    rOhm: stiff ? u(0.13, 0.15) : u(0.07, 0.1),
    ambBase: u(19, 25) + (hot ? u(7, 10) : 0),
    hA: u(0.9, 1.1),
    dvBase: wobbly ? u(70, 95) : u(25, 60),
    dropStart: flaky ? u(0.009, 0.013) : 0.0008,
    leakA: leaky ? u(0.02, 0.05) : 0,
    ride1: u(7, 9),
    ride2: u(16, 18),
    rideDur: u(0.6, 0.95),
    rideCur: u(5.5, 8.5),
    chargeStart: u(21, 23.5),
    chargeCur: u(5, 7),
    soc0: u(0.8, 0.95),
  }
  void index
  return p
}

function cellOcv(soc: number) {
  const pts: [number, number][] = [
    [0, 3.0], [0.1, 3.45], [0.3, 3.62], [0.5, 3.73], [0.7, 3.88], [0.9, 4.05], [1, 4.2],
  ]
  for (let i = 1; i < pts.length; i++) {
    if (soc <= pts[i][0]) {
      const [x0, y0] = pts[i - 1]
      const [x1, y1] = pts[i]
      return y0 + ((y1 - y0) * (soc - x0)) / (x1 - x0)
    }
  }
  return 4.2
}

export interface RawDay {
  t: number[]
  v: (number | null)[]
  i: (number | null)[]
  temp: (number | null)[]
  soc: (number | null)[]
  dv: (number | null)[]
}

export interface SimResult {
  days: DaySummary[]
  raw?: RawDay[]
}

const SOC_FLOOR = 0.1
const CELLS = 13
const CTH = 1500 // J/K
const DT = STEP_MINUTES * 60

const r1 = (n: number) => Math.round(n * 10) / 10
const r2 = (n: number) => Math.round(n * 100) / 100

function dateOf(day: number) {
  const d = new Date(`${SIM_START}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + day - 1)
  return d.toISOString().slice(0, 10)
}

export function simulate(
  p: BatteryParams,
  seed: number,
  event: EventKind | null,
  keepRaw: boolean,
): SimResult {
  const base = (seed ^ hashStr(p.id)) >>> 0
  // Rastgele akışlar olaydan bağımsız ve koşulsuz tüketilir; olay yalnız deterministik parametreleri değiştirir.
  const rn = mulberry32((base ^ 0x9e3779b9) >>> 0)
  const rd = mulberry32((base ^ 0x85ebca6b) >>> 0)
  const gauss = () => {
    const a = Math.max(rn(), 1e-12)
    const b = rn()
    return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b)
  }

  let soh = p.soh0
  let soc = p.soc0
  let ambDrift = 0
  let burst = 0
  let temp = p.ambBase + 2
  const days: DaySummary[] = []
  const raw: RawDay[] = []

  for (let d = 1; d <= DAYS; d++) {
    const jit1 = rn()
    const jit2 = rn()
    ambDrift = 0.8 * ambDrift + 0.6 * gauss()
    const ambDay = p.ambBase + 1.3 * ambDrift
    const capAh = (p.capNomAh * soh) / 100
    const f = d >= EVENT_DAY ? d - EVENT_DAY + 1 : 0

    // Olay etkileri (yalnız hedef batarya, EVENT_DAY ve sonrası)
    const tempEvt = event === 'temp-drift' && f > 0
    const extraHeatW = tempEvt ? Math.min(20, 12 + 2.5 * (f - 1)) : 0
    const hAeff = p.hA * (tempEvt ? Math.max(0.65, 0.85 - 0.03 * (f - 1)) : 1)
    const dvExtra = event === 'cell-imbalance' && f > 0 ? 60 + 18 * (f - 1) : 0
    const pStart = event === 'data-loss' && f > 0 ? 0.04 : p.dropStart
    const leakA = p.leakA + (event === 'self-discharge' && f > 0 ? Math.min(0.25, 0.04 + 0.009 * (f - 1)) : 0)
    const rMul = event === 'resistance-rise' && f > 0 ? Math.min(3, 1.75 + 0.15 * (f - 1)) : 1

    const rideDur = p.rideDur * (0.85 + 0.3 * jit1)
    const ride1 = p.ride1 + (jit2 - 0.5) * 0.5
    const ride2 = p.ride2 + (jit1 - 0.5) * 0.5
    // Öğle park penceresi: ilk sürüşten 30 dk sonra başlar, ikinci sürüşe kadar sürer.
    const parkFrom = ride1 + rideDur + 0.5

    const day = keepRaw
      ? { t: [] as number[], v: [] as (number | null)[], i: [] as (number | null)[], temp: [] as (number | null)[], soc: [] as (number | null)[], dv: [] as (number | null)[] }
      : null
    let n = 0, sS = 0, sT = 0, sD = 0
    let socMin = Infinity, socMax = -Infinity, tMax = -Infinity, dMax = -Infinity
    let tTrueSum = 0, cycleAh = 0, chargeWh = 0
    const park: [number, number][] = []
    const rEst: number[] = []
    let prev: { ride: boolean; v: number; i: number; soc: number } | null = null

    for (let s = 0; s < STEPS_PER_DAY; s++) {
      const tod = (s * STEP_MINUTES) / 60
      const nI = gauss(), nV = gauss(), nT = gauss(), nD = gauss()
      const u1 = rd(), u2 = rd()

      // Akım: deşarj pozitif. SOC sınırlarında mod uyarlanır.
      const inRide = (st: number) => tod >= st && tod < st + rideDur
      const chargeWin = (tod - p.chargeStart + 24) % 24 < 7
      const riding = inRide(ride1) || inRide(ride2)
      let I: number
      if (riding) {
        const st = inRide(ride1) ? ride1 : ride2
        const ph = (tod - st) / rideDur
        I = p.rideCur * (0.8 + 0.4 * Math.sin(Math.PI * ph)) + 0.8 * nI
        // Alt SOC sınırında sürüş yükü kesilir; adım içinde sınırın altına inilmez.
        const iMax = ((soc - SOC_FLOOR) * capAh * 3600) / DT
        I = Math.min(I, Math.max(iMax, 0.05))
      } else if (chargeWin && soc < 0.999) {
        const taper = soc < 0.8 ? 1 : Math.max(0.08, (1 - soc) / 0.2)
        I = -p.chargeCur * taper
      } else {
        I = 0.02 + 0.01 * nI
      }
      // Kapasite sınırı: bu adımda SOC [0,1] dışına çıkmasın
      const dSoc = (-I * DT) / 3600 / capAh
      if (soc + dSoc > 1) I = (-(1 - soc) * capAh * 3600) / DT
      else if (soc + dSoc < 0) I = (soc * capAh * 3600) / DT
      // İç kaçak akım SOC'yi düşürür ama akım sensöründe görünmez.
      soc = Math.min(1, Math.max(0, soc + (-(I + leakA) * DT) / 3600 / capAh))
      cycleAh += Math.abs(I) * DT / 3600

      const rEff = p.rOhm * rMul * (1 + 0.5 * (1 - soh / 100))
      const tAmb = ambDay + 4 * Math.sin((2 * Math.PI * (tod - 9)) / 24)
      const power = I * I * rEff + 0.5 + extraHeatW
      temp += (DT * (power - hAeff * (temp - tAmb))) / CTH
      tTrueSum += temp

      const loadF = 0.8 + 0.4 * Math.min(1, Math.abs(I) / 10)
      const dvTrue = Math.max(5, p.dvBase + 0.6 * Math.abs(I) + dvExtra * loadF + 3 * nD)
      const vTrue = CELLS * cellOcv(soc) - I * rEff + 0.03 * nV
      const tTrue = temp + 0.2 * nT
      // Şarj cihazı sayacı telemetriden bağımsızdır; kesinti enerjiyi etkilemez.
      if (I < 0) chargeWh += (-I * vTrue * DT) / 3600

      // Veri kaybı: aynı sayıda çekim, kesinti yalnız eşiği değiştirir.
      let lost = false
      if (burst > 0) {
        burst--
        lost = true
      } else if (u1 < pStart) {
        burst = Math.floor(u2 * 12)
        lost = true
      }

      if (day) {
        day.t.push(s * STEP_MINUTES)
        day.v.push(lost ? null : r2(vTrue))
        day.i.push(lost ? null : r2(I))
        day.temp.push(lost ? null : r1(tTrue))
        day.soc.push(lost ? null : r1(soc * 100))
        day.dv.push(lost ? null : r1(dvTrue))
      }
      if (!lost) {
        n++
        const sp = soc * 100
        sS += sp; sT += tTrue; sD += dvTrue
        socMin = Math.min(socMin, sp); socMax = Math.max(socMax, sp)
        tMax = Math.max(tMax, tTrue); dMax = Math.max(dMax, dvTrue)

        // Ölçülen (yuvarlanmış) değerlerden türetilen göstergeler.
        const mV = r2(vTrue), mI = r2(I), mSoc = r1(sp) / 100
        if (!riding && I >= 0 && tod >= parkFrom && tod < ride2) park.push([tod, mV])
        // Sürüş başlangıcı: SOC değişiminin OCV etkisi çıkarılarak ΔV/ΔI.
        if (riding && prev && !prev.ride && mI - prev.i > 2) {
          const dOcv = CELLS * (cellOcv(prev.soc) - cellOcv(mSoc))
          rEst.push(((prev.v - mV - dOcv) / (mI - prev.i)) * 1000)
        }
        prev = { ride: riding, v: mV, i: mI, soc: mSoc }
      } else {
        prev = null
      }
    }

    // Park penceresinde gerilimin doğrusal eğimi (en az 2 saatlik geçerli kayıt).
    let parkDropMvH: number | null = null
    if (park.length >= 24) {
      const mx = park.reduce((a, [x]) => a + x, 0) / park.length
      const my = park.reduce((a, [, y]) => a + y, 0) / park.length
      let sxy = 0, sxx = 0
      for (const [x, y] of park) { sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2 }
      parkDropMvH = r1(Math.max(0, (-sxy / sxx) * 1000))
    }
    const rMohm = rEst.length ? Math.round(rEst.reduce((a, b) => a + b, 0) / rEst.length) : null

    // Günlük yaşlanma: günlük ortalama sıcaklık ve çevrim yüküne bağlı, sınırlı; tepe değerlere değil.
    const tMeanTrue = tTrueSum / STEPS_PER_DAY
    const stress = Math.min(1.5, Math.max(0, (tMeanTrue - 25) / 20))
    const cycles = cycleAh / (2 * p.capNomAh)
    soh -= Math.min(0.15, p.ageRate * (1 + 1.5 * stress + 0.3 * cycles))

    days.push({
      day: d,
      date: dateOf(d),
      soh: r2(soh),
      socMin: n ? r1(socMin) : null,
      socMean: n ? r1(sS / n) : null,
      socMax: n ? r1(socMax) : null,
      tempMean: n ? r1(sT / n) : null,
      tempMax: n ? r1(tMax) : null,
      dvMean: n ? r1(sD / n) : null,
      dvMax: n ? r1(dMax) : null,
      parkDropMvH,
      rMohm,
      chargeWh: Math.round(chargeWh),
      coverage: r1((n / STEPS_PER_DAY) * 100),
    })
    if (day) raw.push(day)
  }
  return keepRaw ? { days, raw } : { days }
}
