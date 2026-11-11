import qrcode from '../web/node_modules/qrcode-generator/dist/qrcode.mjs'
import { writeFileSync } from 'node:fs'
const q = qrcode(0, 'M'); q.addData('https://sixthandle.com'); q.make()
const n = q.getModuleCount(); let d = ''
for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`
writeFileSync('assets/qr-site.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 ${n + 4} ${n + 4}"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#fff"/><path fill="#032a52" d="${d}"/></svg>`)
