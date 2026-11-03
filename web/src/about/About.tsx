import { ArrowUpRight, Check, Copy, Fingerprint, ListOrdered, Mail, Radar } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { CONTACTS, mailtoAll } from '../site.ts'

const FEATURES: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: <Radar aria-hidden className="size-5" />,
    title: 'Erken uyarı',
    text: 'Isınma, hücre dengesizliği, park gerilim düşüşü ve iç direnç artışını BMS alarmından önce yakalar.',
  },
  {
    icon: <ListOrdered aria-hidden className="size-5" />,
    title: 'Gerekçeli bakım sırası',
    text: 'Yüzlerce bataryadan hangisine önce bakılacağını nedeniyle söyler. Karar teknik ekipte kalır.',
  },
  {
    icon: <Fingerprint aria-hidden className="size-5" />,
    title: 'Dijital pasaport',
    text: 'Her bataryanın sağlık, olay ve karbon kaydı. AB Batarya Tüzüğü (2023/1542) için hazır.',
  },
]

function Logo() {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className="size-9">
      <rect width="32" height="32" rx="8" fill="#16243f" />
      <rect x="7" y="10" width="16" height="12" rx="2" fill="none" stroke="#5aa9ff" strokeWidth="2.5" />
      <rect x="23" y="14" width="3" height="4" rx="1" fill="#5aa9ff" />
      <rect x="10" y="13" width="6" height="6" fill="#6ee7a0" />
    </svg>
  )
}

function ContactCard({ name, role, email }: { name: string; role: string; email: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* Pano izni yoksa sessizce geç; e-posta bağlantısı yine çalışır. */
    }
  }
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-line bg-panel/80 p-3">
      <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">
        {name.split(' ').map((w) => w[0]).slice(0, 2).join('').toLocaleUpperCase('tr-TR')}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{name}</p>
        <p className="truncate text-xs text-mute">{role}</p>
        <a href={`mailto:${email}`} className="block truncate text-sm text-accent hover:underline">{email}</a>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`${email} adresini kopyala`}
        className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-mute hover:border-accent hover:text-ink"
      >
        {copied ? <Check aria-hidden className="size-4 text-ok" /> : <Copy aria-hidden className="size-4" />}
      </button>
    </li>
  )
}

export function About() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arka plan: üstte yumuşak ışık + ince ızgara */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(90,169,255,0.28),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#a3b3cf_1px,transparent_1px),linear-gradient(90deg,#a3b3cf_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]"
      />

      <main className="relative mx-auto flex max-w-xl flex-col gap-10 px-5 pb-12 pt-8 sm:pt-14">
        <header className="flex items-center gap-2.5">
          <Logo />
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-wide">BINBIN</p>
            <p className="text-xs text-mute">Battery Intelligence</p>
          </div>
        </header>

        <section>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-3 py-1 text-xs font-semibold text-mute">
            <span className="size-1.5 rounded-full bg-ok" /> OSTİM Teknik Üniversitesi proje ekibi
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            Arızayı, arıza olmadan{' '}
            <span className="bg-gradient-to-r from-accent to-ok bg-clip-text text-transparent">önce görün.</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-mute">
            Elektrikli mikromobilite filoları için batarya sağlığı izleme, bakım önceliklendirme ve Dijital Batarya
            Pasaportu geliştiriyoruz.
          </p>
        </section>

        <section aria-label="Ne yapıyoruz" className="grid gap-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-3.5 rounded-2xl border border-line bg-panel/80 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">{f.icon}</span>
              <div>
                <h2 className="font-bold">{f.title}</h2>
                <p className="mt-0.5 text-sm leading-relaxed text-mute">{f.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section aria-labelledby="who" className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-5">
          <h2 id="who" className="text-lg font-bold">Biz kimiz?</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-mute">
            Batarya verisini bakım ekibinin anlayacağı kararlara çeviren bir mühendislik ekibiyiz.
            Gerçek filo verisiyle pilot çalışma ve iş birliği için görüşmeye açığız.
          </p>
        </section>

        <section aria-labelledby="contact">
          <h2 id="contact" className="text-lg font-bold">İletişim</h2>
          <ul className="mt-3 grid gap-2.5">
            {CONTACTS.map((c) => <ContactCard key={c.email} {...c} />)}
          </ul>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            <a
              href={mailtoAll()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-semibold text-bg hover:bg-accent/90"
            >
              <Mail aria-hidden className="size-4" /> Bize yazın
            </a>
            <a
              href="../"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-panel px-4 py-3 font-semibold hover:border-accent"
            >
              Canlı demoyu incele <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </div>
        </section>

        <footer className="border-t border-line pt-5 text-xs text-mute">
          © {new Date().getFullYear()} BinBin Battery Intelligence · Demo sentetik veri kullanır.
        </footer>
      </main>
    </div>
  )
}
