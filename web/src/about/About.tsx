import { Activity, ArrowDown, ArrowRight, ArrowUpRight, Fingerprint, ListChecks, Mail, ScanLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ACADEMIC_COORDINATOR, CONTACTS, PROJECT_TEAM, TEAM_EMAIL } from '../site.ts'
import institutionLockup from './assets/ostim-cop31.png'

type Language = 'en' | 'tr'

const COPY = {
  en: {
    title: 'The project · BinBin Battery Intelligence',
    description: 'Battery health, maintenance intelligence and a Digital Battery Passport for shared micromobility. Meet the OSTİM Technical University project team and explore the demo.',
    skip: 'Skip to content', nav: 'Main navigation', language: 'Language',
    project: 'The project', team: 'Our team', demo: 'Explore the demo',
    eyebrow: 'CIRCULAR THINKING. BATTERY INTELLIGENCE.',
    headline: ['Batteries with', 'more than', 'one life.'],
    intro: 'Battery health, early-warning analytics and a Digital Battery Passport for shared micromobility.',
    introDetail: 'Turning existing fleet data into clearer maintenance decisions and longer battery lives.',
    discover: 'Discover the project', battery: 'One battery. One identity.',
    tags: ['Battery Intelligence', 'Digital Battery Passport', 'Circular economy'],
    projectLabel: '01 / THE PROJECT',
    projectHeading: ['The world is electrifying.', 'Batteries need a memory.'],
    projectText: 'Shared e-scooters and e-bikes run on batteries that move between vehicles. Their health, repairs and history have to travel with them.',
    projectDetail: 'We are developing a system that brings these records together under one battery ID, helping technical teams decide what to inspect, repair and keep in use.',
    solutionLabel: 'WHAT WE ARE BUILDING',
    features: [
      { title: 'Battery health profiles', text: 'A view of battery health and degradation trends, built from telemetry and service records.' },
      { title: 'Early-warning analytics', text: 'Indicators that bring unusual temperature, cell imbalance and resistance trends into view.' },
      { title: 'Daily maintenance priorities', text: 'An explainable inspection order, with the signal and reasoning behind each recommendation.' },
      { title: 'Digital Battery Passport', text: 'An identity that connects health, maintenance and lifecycle records, with clear data sources.' },
    ],
    flowLabel: '02 / HOW IT WORKS', flowHeading: ['From fleet data', 'to informed decisions.'],
    flowSteps: ['Battery, BMS and IoT data', 'Matching and data quality checks', 'Health and anomaly analysis', 'Maintenance decision support', 'Digital Battery Passport'],
    readOnly: 'READ-ONLY INPUT',
    decisionTitle: 'Decision support, not autopilot.',
    decisionText: 'The system presents indicators and priorities. Trained technical staff make the final call. BMS safety functions are never touched.',
    circularLabel: 'DESIGNED FOR A LONGER LIFE',
    circularHeading: ['Keep batteries in use.', 'Keep their story intact.'],
    circularText: 'Health and repair history can support better end-of-use decisions, from repair and reuse to a second application and recycling.',
    lifecycle: ['Repair', 'Reuse', 'Repurpose', 'Recycle'],
    teamLabel: '03 / THE PEOPLE', teamHeading: ['Engineering a', 'circular future.'],
    teamText: 'An OSTİM Technical University project team bringing together research, data analytics, AI and embedded systems. Ankara, Türkiye.',
    teamNote: 'Developed as a project concept for shared micromobility, with pilot validation as the next step.',
    membersLabel: 'PROJECT TEAM', coordinator: 'ACADEMIC COORDINATOR', university: 'OSTİM Technical University',
    collaboration: 'MICROMOBILITY CONTEXT',
    closingLabel: 'SEE THE IDEA IN ACTION', closingHeading: ['Meet the project.', 'Try the experience.'],
    closingText: 'Explore battery scenarios, maintenance priorities and the passport view in our interactive prototype.',
    demoNote: 'The demo uses synthetic data and illustrative thresholds. It does not report live fleet performance.',
    contact: 'Email the team', footer: 'An OSTİM Technical University project', back: 'Back to top',
  },
  tr: {
    title: 'Proje hakkında · BinBin Battery Intelligence',
    description: 'Paylaşımlı mikromobilite için batarya sağlığı, bakım önceliklendirme ve Dijital Batarya Pasaportu. OSTİM Teknik Üniversitesi proje ekibiyle tanışın, demoyu inceleyin.',
    skip: 'İçeriğe geç', nav: 'Ana gezinme', language: 'Dil',
    project: 'Proje', team: 'Ekibimiz', demo: 'Demoyu incele',
    eyebrow: 'DÖNGÜSEL DÜŞÜNCE. BATARYA ZEKÂSI.',
    headline: ['Birden fazla', 'ömrü olan', 'bataryalar.'],
    intro: 'Paylaşımlı mikromobilite için batarya sağlığı, erken uyarı analitiği ve Dijital Batarya Pasaportu.',
    introDetail: 'Mevcut filo verisinden daha anlaşılır bakım kararlarına, daha uzun batarya ömrüne.',
    discover: 'Projeyi keşfet', battery: 'Bir batarya. Tek kimlik.',
    tags: ['Batarya zekâsı', 'Dijital Batarya Pasaportu', 'Döngüsel ekonomi'],
    projectLabel: '01 / PROJE',
    projectHeading: ['Dünya elektrikleniyor.', 'Bataryaların hafızası olmalı.'],
    projectText: 'Paylaşımlı e-scooter ve e-bisikletlerde bataryalar araçlar arasında yer değiştiriyor. Sağlık, onarım ve kullanım geçmişlerinin de onlarla birlikte taşınması gerekiyor.',
    projectDetail: 'Bu kayıtları tek batarya kimliğinde birleştiren; teknik ekiplerin inceleme, onarım ve kullanım kararlarına yardımcı olan bir sistem geliştiriyoruz.',
    solutionLabel: 'NE GELİŞTİRİYORUZ?',
    features: [
      { title: 'Batarya sağlık profili', text: 'Telemetri ve servis kayıtlarından batarya sağlığına ve yıpranma eğilimlerine ortak bir bakış.' },
      { title: 'Erken uyarı analitiği', text: 'Sıcaklık, hücre dengesizliği ve iç dirençteki olağandışı değişimleri görünür kılan göstergeler.' },
      { title: 'Günlük bakım öncelikleri', text: 'Her önerinin arkasındaki sinyal ve gerekçeyle açıklanabilir bir teknik inceleme sırası.' },
      { title: 'Dijital Batarya Pasaportu', text: 'Sağlık, bakım ve yaşam döngüsü kayıtlarını, veri kaynakları açıkça belirtilerek birleştiren kimlik.' },
    ],
    flowLabel: '02 / NASIL ÇALIŞIR?', flowHeading: ['Filo verisinden', 'bilinçli kararlara.'],
    flowSteps: ['Batarya, BMS ve IoT verisi', 'Kimlik eşleştirme ve veri kalite kontrolü', 'Sağlık ve anomali analizi', 'Bakım karar desteği', 'Dijital Batarya Pasaportu'],
    readOnly: 'SALT OKUNUR GİRDİ',
    decisionTitle: 'Karar desteği. Son söz teknik ekipte.',
    decisionText: 'Sistem göstergeler ve öncelikler sunar; nihai kararı yetkin teknik personel verir. BMS güvenlik işlevlerine müdahale edilmez.',
    circularLabel: 'DAHA UZUN BİR ÖMÜR İÇİN',
    circularHeading: ['Bataryalar kullanımda kalsın.', 'Geçmişleri kaybolmasın.'],
    circularText: 'Sağlık ve onarım geçmişi; onarım, yeniden kullanım, farklı bir uygulamada ikinci ömür ve geri dönüşüm kararlarına yardımcı olabilir.',
    lifecycle: ['Onarım', 'Yeniden kullanım', 'İkinci ömür', 'Geri dönüşüm'],
    teamLabel: '03 / EKİBİMİZ', teamHeading: ['Döngüsel bir gelecek', 'için mühendislik.'],
    teamText: 'Araştırma, veri analitiği, yapay zekâ ve gömülü sistemleri bir araya getiren OSTİM Teknik Üniversitesi proje ekibi. Ankara, Türkiye.',
    teamNote: 'Paylaşımlı mikromobilite için geliştirilen proje konseptinde bir sonraki adım pilot doğrulama.',
    membersLabel: 'PROJE EKİBİ', coordinator: 'AKADEMİK KOORDİNATÖR', university: 'OSTİM Teknik Üniversitesi',
    collaboration: 'MİKROMOBİLİTE ODAĞI',
    closingLabel: 'FİKRİ ÇALIŞIRKEN GÖRÜN', closingHeading: ['Projeyle tanışın.', 'Deneyimi keşfedin.'],
    closingText: 'Etkileşimli prototipte batarya senaryolarını, bakım önceliklerini ve pasaport görünümünü inceleyin.',
    demoNote: 'Demo, sentetik veri ve örnek eşikler kullanır. Gerçek filo performansını göstermez.',
    contact: 'Ekibe e-posta gönder', footer: 'Bir OSTİM Teknik Üniversitesi projesi', back: 'Başa dön',
  },
}

const FEATURE_ICONS = [Activity, ScanLine, ListChecks, Fingerprint]

/** Vector artwork follows the battery/circular-life motif of the printed brochure. */
function CircularBattery() {
  return (
    <svg className="circular-battery" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <circle cx="200" cy="200" r="183" fill="none" stroke="#245055" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="139" fill="#14393f" />
      <path d="M47 149A162 162 0 0 1 353 149" fill="none" stroke="#d6f451" strokeWidth="9" strokeLinecap="round" />
      <path d="m342 147 17 11 5-23" fill="#d6f451" />
      <path d="M353 251A162 162 0 0 1 47 251" fill="none" stroke="#2cb687" strokeWidth="9" strokeLinecap="round" />
      <path d="m58 253-17-11-5 23" fill="#2cb687" />
      <rect x="125" y="157" width="142" height="86" rx="15" fill="none" stroke="#f4f6f5" strokeWidth="6" />
      <rect x="270" y="183" width="11" height="34" rx="3" fill="#f4f6f5" />
      <rect x="139" y="170" width="24" height="60" rx="5" fill="#d6f451" />
      <rect x="170" y="170" width="24" height="60" rx="5" fill="#d6f451" />
      <rect x="201" y="170" width="24" height="60" rx="5" fill="#2cb687" />
      <rect x="232" y="170" width="21" height="60" rx="5" fill="#256e60" />
    </svg>
  )
}

export function About() {
  const [language, setLanguage] = useState<Language>('en')
  const t = COPY[language]
  const publicEmails = CONTACTS.map((c) => c.email.trim()).filter(Boolean)
  const teamEmail = TEAM_EMAIL || publicEmails.join(',')

  useEffect(() => {
    document.documentElement.lang = language
    document.title = t.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.description)
  }, [language, t])

  return (
    <div className="about-page" id="top">
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header">
        <div className="page-width header-inner">
          <a className="header-identity" href="#top">
            <img className="header-identity-logo" src={institutionLockup} width="915" height="343" alt={`${t.university} · COP31 Türkiye, Antalya`} />
          </a>
          <nav className="header-nav" aria-label={t.nav}>
            <a href="#project">{t.project}</a>
            <a href="#team">{t.team}</a>
            <a href="../" className="header-demo">{t.demo}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </nav>
          <div className="language-switch" role="group" aria-label={t.language}>
            {(['en', 'tr'] as const).map((lang) => (
              <button key={lang} type="button" lang={lang} aria-label={lang === 'en' ? 'English' : 'Türkçe'} aria-pressed={language === lang} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="page-width">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="eyebrow">{t.eyebrow}</p>
                <h1 id="hero-title">{t.headline.map((line, i) => <span key={line} className={i === 2 ? 'lime-text' : undefined}>{line}</span>)}</h1>
                <p className="hero-intro">{t.intro}</p><p className="hero-detail">{t.introDetail}</p>
                <div className="hero-actions">
                  <a className="button button-lime" href="../">{t.demo}<ArrowUpRight size={20} aria-hidden="true" /></a>
                  <a className="text-link" href="#project">{t.discover}<ArrowDown size={16} aria-hidden="true" /></a>
                </div>
              </div>
              <div className="hero-art">
                <div className="edition-label"><span>COP31</span><span>ANTALYA, TÜRKİYE</span></div>
                <CircularBattery /><p className="battery-caption">{t.battery}</p>
              </div>
            </div>
            <div className="hero-bottom">
              <div className="topic-tags">{t.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <span className="hero-credit">OSTİM TECHNICAL UNIVERSITY</span>
            </div>
          </div>
        </section>

        <section className="project-section section-space" id="project" aria-labelledby="project-title">
          <div className="page-width">
            <p className="eyebrow section-label">{t.projectLabel}</p>
            <div className="project-intro">
              <h2 id="project-title">{t.projectHeading.map((line) => <span key={line}>{line}</span>)}</h2>
              <div className="project-description"><p>{t.projectText}</p><p>{t.projectDetail}</p></div>
            </div>
            <div className="solution-block">
              <p className="eyebrow section-label">{t.solutionLabel}</p>
              <div className="feature-list">
                {t.features.map((feature, i) => {
                  const Icon = FEATURE_ICONS[i]
                  return <article className="feature" key={feature.title}><span className="feature-icon"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span><div><h3>{feature.title}</h3><p>{feature.text}</p></div></article>
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="process-section" aria-labelledby="process-title">
          <div className="page-width process-grid">
            <div className="process-copy">
              <p className="eyebrow">{t.flowLabel}</p>
              <h2 id="process-title">{t.flowHeading.map((line) => <span key={line}>{line}</span>)}</h2>
              <div className="decision-note"><h3>{t.decisionTitle}</h3><p>{t.decisionText}</p></div>
            </div>
            <ol className="process-steps">
              {t.flowSteps.map((step, i) => <li key={step}><span className="step-number">0{i + 1}</span><span>{step}{i === 0 && <small>{t.readOnly}</small>}</span>{i === 4 && <ArrowUpRight size={22} aria-hidden="true" />}</li>)}
            </ol>
          </div>
        </section>

        <section className="circular-section" aria-labelledby="circular-title">
          <div className="page-width circular-grid">
            <div><p className="eyebrow">{t.circularLabel}</p><h2 id="circular-title">{t.circularHeading.map((line) => <span key={line}>{line}</span>)}</h2></div>
            <div><p className="circular-description">{t.circularText}</p><ol className="lifecycle">{t.lifecycle.map((step, i) => <li key={step}><span>{step}</span>{i < 3 && <ArrowRight size={17} aria-hidden="true" />}</li>)}</ol></div>
          </div>
        </section>

        <section className="team-section section-space" id="team" aria-labelledby="team-title">
          <div className="page-width team-grid">
            <div className="team-intro">
              <p className="eyebrow section-label">{t.teamLabel}</p><h2 id="team-title">{t.teamHeading.map((line) => <span key={line}>{line}</span>)}</h2>
              <p>{t.teamText}</p><p className="team-note">{t.teamNote}</p>
              <img className="institution-lockup" src={institutionLockup} width="915" height="343" alt="OSTİM Teknik Üniversitesi · COP31 Türkiye, Antalya" />
            </div>
            <div className="team-roster">
              <h3 className="eyebrow section-label">{t.membersLabel}</h3>
              <ul>{PROJECT_TEAM.map((name, i) => <li key={name}><span className="member-index" aria-hidden="true">0{i + 1}</span><span>{name}</span></li>)}</ul>
              <div className="coordinator"><h3 className="eyebrow section-label">{t.coordinator}</h3><p>{ACADEMIC_COORDINATOR}</p><span>{t.university}</span></div>
              <div className="partner-line"><span>{t.collaboration}</span><strong>BİNBİN</strong></div>
            </div>
          </div>
        </section>

        <section className="demo-section" aria-labelledby="demo-title">
          <div className="page-width demo-grid">
            <div><p className="eyebrow">{t.closingLabel}</p><h2 id="demo-title">{t.closingHeading.map((line) => <span key={line}>{line}</span>)}</h2></div>
            <div className="demo-content">
              <p>{t.closingText}</p><a className="button button-dark" href="../">{t.demo}<ArrowUpRight size={21} aria-hidden="true" /></a><p className="demo-disclosure">{t.demoNote}</p>
              {teamEmail && <a className="contact-link" href={`mailto:${teamEmail}?subject=${encodeURIComponent('BinBin Battery Intelligence')}`}><Mail size={16} aria-hidden="true" />{t.contact}</a>}
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer"><div className="page-width footer-inner"><p>© {new Date().getFullYear()} BİNBİN Battery Intelligence<span>{t.footer}</span></p><a href="#top">{t.back}<ArrowUpRight size={15} aria-hidden="true" /></a></div></footer>
    </div>
  )
}
