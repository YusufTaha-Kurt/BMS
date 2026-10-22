import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildDataset } from './dataset.ts'

const out = fileURLToPath(new URL('../public/data/', import.meta.url))

const t0 = Date.now()
const { files, manifest } = buildDataset()
rmSync(out, { recursive: true, force: true })
for (const [path, content] of files) {
  const full = join(out, path)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, content)
}
writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest))
console.log(
  `Veri üretildi: ${files.size} dosya, seed ${manifest.seed}, sürüm ${manifest.dataVersion}, ` +
    `özet ${manifest.contentHash.slice(0, 12)} (${((Date.now() - t0) / 1000).toFixed(1)} sn)`,
)
