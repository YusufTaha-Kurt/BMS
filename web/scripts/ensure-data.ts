// Manifest yoksa veya seed/sürüm uyuşmuyorsa veriyi üretir; dev/build öncesi unutulmayı önler.
import { existsSync, readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { DATA_VERSION, SEED } from '../shared/config.ts'

const manifestPath = fileURLToPath(new URL('../public/data/manifest.json', import.meta.url))

function current(): boolean {
  if (!existsSync(manifestPath)) return false
  try {
    const m = JSON.parse(readFileSync(manifestPath, 'utf8'))
    return m.seed === SEED && m.dataVersion === DATA_VERSION
  } catch {
    return false
  }
}

if (current()) {
  console.log('Veri güncel, üretim atlandı.')
} else {
  const gen = fileURLToPath(new URL('./generate-data.ts', import.meta.url))
  const r = spawnSync(process.execPath, ['--import', 'tsx', gen], { stdio: 'inherit' })
  process.exit(r.status ?? 1)
}
