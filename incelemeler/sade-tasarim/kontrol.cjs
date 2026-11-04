const { chromium } = require('playwright')
const out = process.argv[2]
;(async () => {
  const b = await chromium.launch()
  const d = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage()
  const m = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage()
  const heights = {}
  for (const [n, path] of [['ana-sayfa', ''], ['kurumlar', 'kurumlar/'], ['ekip', 'ekip/'], ['proje', 'proje/'], ['demo', 'demo/'], ['karbon', 'karbon/'], ['is-birligi', 'iletisim/']]) {
    for (const lang of ['tr', 'en']) {
      await d.goto(`http://localhost:4173/hakkimizda/${path}?lang=${lang}`, { waitUntil: 'networkidle' })
      await m.goto(`http://localhost:4173/hakkimizda/${path}?lang=${lang}`, { waitUntil: 'networkidle' })
      heights[`${n}-${lang}`] = { desktop1280: await d.evaluate(() => document.documentElement.scrollHeight), mobile390: await m.evaluate(() => document.documentElement.scrollHeight) }
    }
  }
  await d.goto('http://localhost:4173/hakkimizda/?lang=tr', { waitUntil: 'networkidle' }); await d.screenshot({ path: out + '/ana-sayfa-tr.png', fullPage: true })
  await d.goto('http://localhost:4173/hakkimizda/kurumlar/?lang=tr', { waitUntil: 'networkidle' }); await d.screenshot({ path: out + '/kurumlar-tr.png', fullPage: true })
  await m.goto('http://localhost:4173/hakkimizda/?lang=en', { waitUntil: 'networkidle' }); await m.screenshot({ path: out + '/ana-sayfa-mobil-en.png', fullPage: true })
  console.log(JSON.stringify(heights))
  await b.close()
})()
