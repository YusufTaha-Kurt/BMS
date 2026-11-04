const { chromium } = require('playwright')
const out = __dirname
;(async () => {
  const browser = await chromium.launch()
  const logs = [], res = {}
  const watch = (p) => { p.on('console', (m) => { if (['error', 'warning'].includes(m.type()) && !/Failed to load resource/.test(m.text())) logs.push(m.text()) }); p.on('pageerror', (e) => logs.push(e.message)) }
  const desk = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  const page = await desk.newPage(); watch(page)

  // A. Closed state on the real build: no request possible
  let posted = 0
  await page.route('**/api/contact', (r) => { posted++; r.fulfill({ status: 200, body: '{"ok":true}', contentType: 'application/json' }) })
  await page.goto('http://localhost:4173/hakkimizda/iletisim/?lang=tr#collaboration-form')
  await page.waitForSelector('.contact-form')
  res.closedNotice = await page.locator('.contact-closed').innerText()
  res.closedFieldsetDisabled = await page.locator('.contact-form fieldset').isDisabled()
  res.closedSubmitDisabled = await page.locator('.contact-submit').isDisabled()
  await page.locator('#collaboration-form').screenshot({ path: out + '/form-kapali-tr.png' })

  // B. Open build: validation, success, server field errors, failure states
  const open = 'http://localhost:4174/hakkimizda/iletisim/'
  let mode = 'ok', lastBody = null
  await page.unroute('**/api/contact')
  await page.route('**/api/contact', async (r) => {
    posted++; lastBody = JSON.parse(r.request().postData())
    const map = { ok: [200, { ok: true }], invalid: [422, { ok: false, error: 'invalid', fields: { email: 'invalid' } }], closed: [503, { ok: false, error: 'not_configured' }], fail: [502, { ok: false, error: 'delivery_failed' }], limit: [429, { ok: false, error: 'rate_limited' }] }
    if (mode === 'network') return r.abort()
    const [status, body] = map[mode]
    await new Promise((x) => setTimeout(x, 300))
    r.fulfill({ status, body: JSON.stringify(body), contentType: 'application/json' })
  })
  posted = 0
  await page.goto(open + '?lang=tr')
  await page.waitForSelector('.contact-form')
  res.openClosedNotice = await page.locator('.contact-closed').count()
  res.privacyLink = await page.locator('.contact-consent a').getAttribute('href')
  await page.click('.contact-submit')
  await page.waitForSelector('.contact-summary')
  res.summaryFocused = await page.evaluate(() => document.activeElement?.classList.contains('contact-summary'))
  res.summaryItems = await page.locator('.contact-summary li').allInnerTexts()
  res.postedAfterEmptySubmit = posted
  await page.locator('#collaboration-form').screenshot({ path: out + '/form-hatalar-tr.png' })

  const f = (name) => page.locator(`.contact-form [name=${name}]`)
  await f('name').fill('Ayşe Yılmaz')
  await f('organization').fill('Örnek Kurum')
  await f('email').fill('ayse@kurum')
  await f('phone').fill('+90 312 000 00 00')
  await f('message').fill('Kısa')
  res.liveErrors = await page.locator('.contact-error').allInnerTexts()
  await f('email').fill('ayse@example.org')
  await f('message').fill('Pilot için saha verisi paylaşımı ve test desteği öneriyoruz.')
  await page.check('.contact-form [name=consent]')
  res.errorsAfterFix = await page.locator('.contact-error').count()
  res.ariaInvalidMessage = await f('message').getAttribute('aria-invalid')

  await page.waitForTimeout(3100)
  mode = 'invalid'
  await page.click('.contact-submit')
  await page.waitForSelector('.contact-summary')
  res.serverFieldError = await page.locator('.contact-summary li').allInnerTexts()
  await f('email').fill('ayse@example.org')

  for (const m of ['closed', 'fail', 'limit', 'network']) {
    mode = m
    await page.click('.contact-submit')
    await page.waitForSelector('.contact-failure')
    res['failure_' + m] = await page.locator('.contact-failure').innerText()
    res['kept_' + m] = await f('message').inputValue() !== ''
  }
  await page.locator('#collaboration-form').screenshot({ path: out + '/form-gonderim-hatasi-tr.png' })

  mode = 'ok'
  await page.click('.contact-submit')
  res.sendingLabel = await page.locator('.contact-submit').innerText()
  await page.waitForSelector('.contact-success')
  res.successFocused = await page.evaluate(() => document.activeElement?.tagName)
  res.lastBody = lastBody
  await page.locator('#collaboration-form').screenshot({ path: out + '/form-basarili-tr.png' })
  await page.click('text=Yeni öneri gönder')
  res.resetEmpty = await f('name').inputValue() === ''

  // C. Honeypot is not reachable by keyboard and hidden
  res.trapVisible = await f('website').isVisible().catch(() => false)

  // D. Mobile EN open + keyboard tab order + overflow
  const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
  const mp = await mob.newPage(); watch(mp)
  await mp.goto(open + '?lang=en#collaboration-form')
  await mp.waitForSelector('.contact-form')
  res.mobileOverflow = await mp.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  await mp.focus('.contact-form [name=name]')
  const order = []
  for (let i = 0; i < 7; i++) { order.push(await mp.evaluate(() => document.activeElement?.getAttribute('name') || document.activeElement?.className)); await mp.keyboard.press('Tab') }
  res.tabOrder = order
  await mp.locator('#collaboration-form').screenshot({ path: out + '/form-mobil-en.png' })
  await mp.goto('http://localhost:4173/hakkimizda/iletisim/?lang=en')
  res.mobileClosedOverflow = await mp.evaluate(() => document.documentElement.scrollWidth - innerWidth)

  res.logs = logs
  console.log(JSON.stringify(res, null, 2))
  await browser.close()
})()
