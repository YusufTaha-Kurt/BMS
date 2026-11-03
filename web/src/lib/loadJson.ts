import { useCallback, useEffect, useState } from 'react'

export type LoadErrorKind = 'missing' | 'failed'
export type LoadErrorCode = 'missing' | 'network' | 'http' | 'json' | 'unknown'
export class LoadError extends Error {
  kind: LoadErrorKind
  code: LoadErrorCode
  httpStatus?: number
  constructor(kind: LoadErrorKind, code: LoadErrorCode, httpStatus?: number) {
    super(code)
    this.kind = kind
    this.code = code
    this.httpStatus = httpStatus
  }
}

export const dataUrl = (path: string) => `${import.meta.env.BASE_URL}data/${path}`
export const pad2 = (n: number) => String(n).padStart(2, '0')

export async function loadJson<T>(url: string, signal: AbortSignal): Promise<T> {
  let res: Response
  try {
    res = await fetch(url, { signal })
  } catch (e) {
    if (signal.aborted) throw e
    throw new LoadError('failed', 'network')
  }
  if (res.status === 404) throw new LoadError('missing', 'missing')
  if (!res.ok) throw new LoadError('failed', 'http', res.status)
  // Geliştirme sunucusu eksik dosya için index.html döndürebilir.
  if ((res.headers.get('content-type') ?? '').includes('text/html')) {
    throw new LoadError('missing', 'missing')
  }
  try {
    return (await res.json()) as T
  } catch (e) {
    if (signal.aborted) throw e
    throw new LoadError('failed', 'json')
  }
}

export type JsonState<T> =
  | { status: 'idle' | 'loading' }
  | { status: 'ok'; data: T }
  | { status: 'error'; error: LoadError }

type Result<T> =
  | { url: string; token: number; ok: true; data: T }
  | { url: string; token: number; ok: false; error: LoadError }

/**
 * Yalnız güncel URL'nin cevabını döndürür; hızlı değişimde eski cevap yeni isteğin yerine geçmez.
 */
export function useJson<T>(url: string | null): JsonState<T> & { reload: () => void } {
  const [token, setToken] = useState(0)
  const [res, setRes] = useState<Result<T> | null>(null)

  useEffect(() => {
    if (!url) return
    const ac = new AbortController()
    loadJson<T>(url, ac.signal).then(
      (data) => {
        if (!ac.signal.aborted) setRes({ url, token, ok: true, data })
      },
      (error) => {
        if (ac.signal.aborted) return
        setRes({
          url,
          token,
          ok: false,
          error: error instanceof LoadError ? error : new LoadError('failed', 'unknown'),
        })
      },
    )
    return () => ac.abort()
  }, [url, token])

  const reload = useCallback(() => setToken((t) => t + 1), [])
  if (!url) return { status: 'idle', reload }
  if (!res || res.url !== url || res.token !== token) return { status: 'loading', reload }
  return res.ok ? { status: 'ok', data: res.data, reload } : { status: 'error', error: res.error, reload }
}
