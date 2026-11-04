const { chromium } = require('playwright')
const out = __dirname
;(async () => {
  const browser = await chromium.launch()
  const logs = []
  const res = {}
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, permissions: ['clipboard-read', 'clipboard-write'] })
  const page = await ctx.newPage()
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(m.type() + ': ' + m.text()) })
  page.on('pageerror', (e) => logs.push('pageerror: ' + e.message))
  const B = 'http://localhost:4173'

  // 1. Default root: URL stays clean
  await page.goto(B + '/?lang=tr')
  await page.waitForSelector('#panel-title')
  res.defaultUrl = page.url()

  // 2. Deep link to passport
  await page.goto(B + '/?lang=tr&battery=dem0-001'.replace('dem0', 'demo') + '&scenario=temp-drift&day=20&tab=passport')
  await page.waitForSelector('#passport-title')
  res.deepTitle = await page.title()
  res.deepSelectedTab = await page.getAttribute('[role=tab][aria-selected=true]', 'id')
  res.deepUrl = page.url()
  res.passportLink = await page.locator('#passport a[href*="battery="]').getAttribute('href')
  res.compareOn = await page.locator('text=Olaysız').count()
  await page.locator('#passport').screenshot({ path: out + '/pasaport-baglanti-tr.png' })
  await page.click('text=Bağlantıyı kopyala')
  await page.waitForSelector('text=Kopyalandı')
  res.clipboard = await page.evaluate(() => navigator.clipboard.readText())

  // 3. State changes write URL; switching tab
  await page.click('#tab-history')
  await page.waitForTimeout(200)
  res.afterTabUrl = page.url()

  // 4. Unknown battery
  await page.goto(B + '/?lang=en&battery=BT-99999')
  await page.waitForSelector('#panel-title')
  res.unknownNotice = await page.locator('[role=status]:has-text("BT-99999")').innerText()
  res.unknownUrl = page.url()
  await page.screenshot({ path: out + '/bilinmeyen-kimlik-en.png' })
  await page.click('[aria-label="Dismiss notice"]')
  res.noticeAfterDismiss = await page.locator('text=is not part of this synthetic').count()

  // 5. Reset clears URL
  await page.goto(B + '/?lang=en&battery=BT-10200&tab=passport')
  await page.waitForSelector('#passport-title')
  await page.getByRole('button', { name: /reset/i }).first().click()
  await page.waitForTimeout(300)
  res.afterResetUrl = page.url()

  // 6. Mobile deep link opens detail directly
  const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
  const mp = await m.newPage()
  mp.on('pageerror', (e) => logs.push('m pageerror: ' + e.message))
  await mp.goto(B + '/?lang=tr&battery=BT-10087&tab=passport')
  await mp.waitForSelector('#passport-title')
  res.mobileDetailVisible = await mp.locator('#detail-view').isVisible()
  res.mobileFleetHidden = !(await mp.locator('#fleet-view').isVisible())
  res.mobileOverflow = await mp.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  await mp.locator('#passport').screenshot({ path: out + '/pasaport-mobil-tr.png' })

  // 7. Guide still works and updates URL
  await page.goto(B + '/?lang=en')
  await page.waitForSelector('#panel-title')
  await page.click('#guide-trigger')
  for (let i = 0; i < 7; i++) { await page.keyboard.press('ArrowRight').catch(() => {}); }
  res.guideUrl = page.url()

  // 8. 404 page
  await page.goto(B + '/404.html?lang=tr')
  res.notFoundTitle = await page.title()
  res.notFoundLinks = await page.$$eval('nav a', (as) => as.map((a) => a.getAttribute('href')))
  await mp.goto(B + '/404.html')
  res.notFoundMobileOverflow = await mp.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  await mp.screenshot({ path: out + '/404-mobil-en.png' })

  // 9. About pages still OK
  for (const p of ['/hakkimizda/', '/hakkimizda/demo/', '/hakkimizda/iletisim/']) {
    await page.goto(B + p + '?lang=tr'); await page.waitForSelector('h1')
  }
  res.logs = logs
  console.log(JSON.stringify(res, null, 2))
  await browser.close()
})()
