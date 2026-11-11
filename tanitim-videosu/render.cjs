// video.html dosyasını kare kare kaydedip assets/anlatim.m4a anlatımıyla birlikte MP4 üretir. Kullanım: node render.cjs [çıktı.mp4]
// Yalnız belirli anları görmek için: node render.cjs --stills 3,10,20
const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const path = require('node:path')

const FPS = 30
const DURATION = 60

async function main() {
  const stillsAt = process.argv.indexOf('--stills')
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
  await page.goto('file://' + path.join(__dirname, 'video.html'))
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all([...document.images].map((image) => image.decode().catch(() => {})))
  })
  const seek = (seconds) => page.evaluate((ms) => {
    for (const animation of document.getAnimations()) { animation.pause(); animation.currentTime = ms }
  }, seconds * 1000)

  if (stillsAt > -1) {
    for (const second of process.argv[stillsAt + 1].split(',').map(Number)) {
      await seek(second)
      await page.screenshot({ path: path.join(__dirname, `kare-${String(second).padStart(2, '0')}.jpg`), quality: 80 })
    }
    await browser.close()
    return
  }

  const output = process.argv[2] ?? path.join(__dirname, 'tanitim-videosu.mp4')
  const ffmpeg = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-i', path.join(__dirname, 'assets/anlatim.m4a'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', output],
  { stdio: ['pipe', 'inherit', 'inherit'] })
  for (let frame = 0; frame < FPS * DURATION; frame++) {
    await seek(frame / FPS)
    const image = await page.screenshot({ type: 'jpeg', quality: 96 })
    if (!ffmpeg.stdin.write(image)) await new Promise((resolve) => ffmpeg.stdin.once('drain', resolve))
  }
  ffmpeg.stdin.end()
  await new Promise((resolve) => ffmpeg.on('close', resolve))
  await browser.close()
  console.log(output)
}
main()
