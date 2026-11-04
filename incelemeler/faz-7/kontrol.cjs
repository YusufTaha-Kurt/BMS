const { chromium } = require('playwright')
const B = 'http://localhost:4173'
const pages = ['/', '/hakkimizda/', '/hakkimizda/kurumlar/', '/hakkimizda/ekip/', '/hakkimizda/proje/', '/hakkimizda/demo/', '/hakkimizda/karbon/', '/hakkimizda/iletisim/']
;(async () => {
  const browser = await chromium.launch()
  const rows = [], logs = [], links = new Set(), external = new Set()
  for (const width of [360, 768, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } })
    const page = await ctx.newPage()
    page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`${width} ${page.url()} ${m.text()}`) })
    page.on('pageerror', (e) => logs.push(`${width} ${page.url()} ${e.message}`))
    for (const path of pages) for (const lang of ['en', 'tr']) {
      await page.goto(`${B}${path}?lang=${lang}`, { waitUntil: 'networkidle' })
      if (path === '/') await page.waitForSelector('[data-battery-id]')
      const r = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        h1: document.querySelectorAll('h1').length,
        main: document.querySelectorAll('main').length,
        overflow: document.documentElement.scrollWidth - innerWidth,
        brokenImages: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
        title: document.title,
        hrefs: [...document.querySelectorAll('a[href]')].map((a) => a.href),
      }))
      for (const h of r.hrefs) { const u = new URL(h); if (u.origin === new URL(B).origin) links.add(u.pathname + u.search); else if (u.protocol.startsWith('http')) external.add(u.origin + u.pathname) }
      delete r.hrefs
      rows.push({ width, path, lang, ...r, ok: r.lang === lang && r.h1 === 1 && r.main >= 1 && r.overflow <= 0 && r.brokenImages === 0 })
    }
    await ctx.close()
  }
  // Internal link check (path only, without hash)
  const linkResults = []
  for (const l of links) { const res = await fetch(B + l.split('#')[0]); linkResults.push({ link: l, status: res.status }) }
  const result = { states: rows.length, failed: rows.filter((r) => !r.ok), internalLinks: linkResults.length, brokenLinks: linkResults.filter((l) => l.status !== 200), externalLinks: [...external].sort(), logs }
  require('fs').writeFileSync(__dirname + '/faz7-matris.json', JSON.stringify({ ...result, rows, linkResults }, null, 2))
  console.log(JSON.stringify({ ...result, externalLinks: result.externalLinks.length }, null, 2))
  await browser.close()
})()
