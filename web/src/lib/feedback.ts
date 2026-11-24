import { useCallback, useEffect, useState } from 'react'

/** Kapalı döngü: teknisyenin inceleme sonucu. Yalnız bu tarayıcıda saklanır (demo). */
export type Verdict = 'confirmed' | 'false_alarm'
export type FeedbackMap = Record<string, Verdict>

const KEY = 'sixthandle-demo-feedback-v1'
const LEGACY_KEY = 'binbin-demo-feedback-v1'

function read(): FeedbackMap {
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY)
    return raw ? (JSON.parse(raw) as FeedbackMap) : {}
  } catch {
    return {}
  }
}

function write(m: FeedbackMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(m))
  } catch {
    // Depolama kapalıysa geri bildirim yalnız bu oturumda kalır.
  }
}

export const feedbackKey = (scenario: string, id: string) => `${scenario}:${id}`

export function useFeedback() {
  const [map, setMap] = useState<FeedbackMap>(read)

  useEffect(() => {
    try {
      const legacy = localStorage.getItem(LEGACY_KEY)
      if (legacy === null) return
      if (localStorage.getItem(KEY) === null) localStorage.setItem(KEY, legacy)
      localStorage.removeItem(LEGACY_KEY)
    } catch {
      // Yeni anahtara yazılamazsa eski kayıt tarayıcıda kalır.
    }
  }, [])

  const set = useCallback((key: string, v: Verdict | null) => {
    setMap((m) => {
      const next = { ...m }
      if (v === null) delete next[key]
      else next[key] = v
      write(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    write({})
    setMap({})
  }, [])

  const values = Object.values(map)
  const tally = {
    confirmed: values.filter((v) => v === 'confirmed').length,
    falseAlarm: values.filter((v) => v === 'false_alarm').length,
  }
  return { map, set, clear, tally }
}
