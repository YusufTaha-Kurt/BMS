import { Activity, ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Fingerprint, ListChecks, Mail } from 'lucide-react'
import { useEffect } from 'react'
import { CONTACTS, COORDINATOR_PROFILE, PROJECT_TEAM, TEAM_EMAIL } from '../site.ts'
import institutionLockup from './assets/ostim-cop31.png'
import { ProfileDetails } from './ProfileDetails.tsx'
import { useI18n, withLanguage } from '../lib/i18n.tsx'

const COPY = {
  en: {
    title: 'Battery Intelligence · OSTİM Technical University',
    description: 'Meet the OSTİM Technical University team developing battery health intelligence and a Digital Battery Passport for shared micromobility. Explore the interactive demo.',
    skip: 'Skip to content', nav: 'Main navigation', language: 'Language',
    project: 'The project', team: 'Meet the team', demo: 'Explore the demo',
    eyebrow: 'CIRCULAR THINKING. BATTERY INTELLIGENCE.',
    headline: ['Batteries with', 'more than', 'one life.'],
    intro: 'Battery health, maintenance intelligence and a Digital Battery Passport for shared micromobility.',
    battery: 'One battery. One identity.',
    tags: ['Battery Intelligence', 'Digital Battery Passport', 'Circular economy'],
    teamLabel: '01 / THE PEOPLE', teamHeading: ['Meet the people', 'behind the project.'],
    teamText: 'An OSTİM Technical University team bringing research, data analytics, AI and embedded systems together.',
    teamHint: 'Select a name to learn more.', viewProfile: 'View profile', hideProfile: 'Close profile',
    membersLabel: 'PROJECT TEAM', coordinator: 'ACADEMIC COORDINATOR', university: 'OSTİM Technical University',
    projectLabel: '02 / THE PROJECT', projectHeading: ['One identity.', 'Better decisions.'],
    projectText: 'Batteries move between vehicles. Their health, repairs and history should travel with them. We are developing a system that connects these records under one battery ID.',
    features: [
      { title: 'Health & early warning', text: 'Make unusual battery behaviour visible through health indicators and degradation trends.' },
      { title: 'Maintenance priorities', text: 'Help technical teams decide what to inspect first, with the reasoning behind each recommendation.' },
      { title: 'Digital Battery Passport', text: 'Connect health, maintenance and lifecycle records with clear data sources.' },
    ],
    flowHeading: 'How it works',
    flowSteps: ['Battery, BMS and IoT data', 'Matching and data quality checks', 'Health and anomaly analysis', 'Maintenance decision support', 'Digital Battery Passport'],
    decisionTitle: 'Decision support, not autopilot.',
    decisionText: 'The system presents indicators and priorities. Trained technical staff make the final call. Data is read-only; BMS safety functions are never touched.',
    circularText: 'Health and repair history can support better end-of-use decisions, from repair and reuse to a second application and recycling.',
    lifecycle: ['Repair', 'Reuse', 'Repurpose', 'Recycle'],
    closingLabel: 'SEE THE IDEA IN ACTION', closingHeading: ['Explore the', 'working prototype.'],
    closingText: 'Try battery scenarios, maintenance priorities and the passport view in our interactive prototype.',
    demoNote: 'Synthetic data. Illustrative thresholds. No live fleet performance claims.',
    contact: 'Email the team', footer: 'An OSTİM Technical University project', back: 'Back to top',
  },
  tr: {
    title: 'Batarya Zekâsı · OSTİM Teknik Üniversitesi',
    description: 'Paylaşımlı mikromobilite için batarya sağlığı ve Dijital Batarya Pasaportu geliştiren OSTİM Teknik Üniversitesi ekibiyle tanışın. Etkileşimli demoyu inceleyin.',
    skip: 'İçeriğe geç', nav: 'Ana gezinme', language: 'Dil',
    project: 'Proje', team: 'Ekiple tanışın', demo: 'Demoyu incele',
    eyebrow: 'DÖNGÜSEL DÜŞÜNCE. BATARYA ZEKÂSI.',
    headline: ['Birden fazla', 'ömrü olan', 'bataryalar.'],
    intro: 'Paylaşımlı mikromobilite için batarya sağlığı, bakım karar desteği ve Dijital Batarya Pasaportu.',
    battery: 'Bir batarya. Tek kimlik.',
    tags: ['Batarya zekâsı', 'Dijital Batarya Pasaportu', 'Döngüsel ekonomi'],
    teamLabel: '01 / EKİBİMİZ', teamHeading: ['Projenin', 'arkasındaki ekip.'],
    teamText: 'Araştırma, veri analitiği, yapay zekâ ve gömülü sistemleri bir araya getiren OSTİM Teknik Üniversitesi ekibi.',
    teamHint: 'Daha fazla bilgi için bir isme dokunun.', viewProfile: 'Profili gör', hideProfile: 'Profili kapat',
    membersLabel: 'PROJE EKİBİ', coordinator: 'AKADEMİK KOORDİNATÖR', university: 'OSTİM Teknik Üniversitesi',
    projectLabel: '02 / PROJE', projectHeading: ['Tek kimlik.', 'Daha bilinçli kararlar.'],
    projectText: 'Bataryalar araçlar arasında yer değiştiriyor. Sağlık, onarım ve kullanım geçmişlerinin de onlarla taşınması gerekiyor. Bu kayıtları tek batarya kimliğinde birleştiren bir sistem geliştiriyoruz.',
    features: [
      { title: 'Sağlık ve erken uyarı', text: 'Sağlık göstergeleri ve yıpranma eğilimleriyle olağandışı batarya davranışlarını görünür kılmak.' },
      { title: 'Bakım öncelikleri', text: 'Her önerinin gerekçesiyle, teknik ekiplerin hangi bataryayı önce inceleyeceğine yardımcı olmak.' },
      { title: 'Dijital Batarya Pasaportu', text: 'Sağlık, bakım ve yaşam döngüsü kayıtlarını açık veri kaynaklarıyla birleştirmek.' },
    ],
    flowHeading: 'Nasıl çalışır?',
    flowSteps: ['Batarya, BMS ve IoT verisi', 'Kimlik eşleştirme ve veri kalite kontrolü', 'Sağlık ve anomali analizi', 'Bakım karar desteği', 'Dijital Batarya Pasaportu'],
    decisionTitle: 'Karar desteği. Son söz teknik ekipte.',
    decisionText: 'Sistem göstergeler ve öncelikler sunar; nihai kararı yetkin teknik personel verir. Veriler salt okunurdur; BMS güvenlik işlevlerine müdahale edilmez.',
    circularText: 'Sağlık ve onarım geçmişi; onarım, yeniden kullanım, farklı bir uygulamada ikinci ömür ve geri dönüşüm kararlarına yardımcı olabilir.',
    lifecycle: ['Onarım', 'Yeniden kullanım', 'İkinci ömür', 'Geri dönüşüm'],
    closingLabel: 'FİKRİ ÇALIŞIRKEN GÖRÜN', closingHeading: ['Projeyi tanıdınız.', 'Şimdi deneyimleyin.'],
    closingText: 'Etkileşimli prototipte batarya senaryolarını, bakım önceliklerini ve pasaport görünümünü keşfedin.',
    demoNote: 'Sentetik veri ve örnek eşikler kullanılır. Gerçek filo performansı gösterilmez.',
    contact: 'Ekibe e-posta gönder', footer: 'Bir OSTİM Teknik Üniversitesi projesi', back: 'Başa dön',
  },
}

const FEATURE_ICONS = [Activity, ListChecks, Fingerprint]

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
  const { language, setLanguage } = useI18n()
  const t = COPY[language]
  const publicEmails = CONTACTS.map((contact) => contact.email.trim()).filter(Boolean)
  const teamEmail = TEAM_EMAIL || publicEmails.join(',')

  useEffect(() => {
    document.documentElement.lang = language
    document.title = t.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.description)
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
            <a href="#team">{t.team}</a>
            <a href="#project">{t.project}</a>
            <a href={withLanguage('../', language)} className="header-demo">{t.demo}<ArrowUpRight size={16} aria-hidden="true" /></a>
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
                <p className="hero-intro">{t.intro}</p>
                <div className="hero-actions">
                  <a className="button button-lime" href={withLanguage('../', language)}>{t.demo}<ArrowUpRight size={20} aria-hidden="true" /></a>
                  <a className="text-link" href="#team">{t.team}<ArrowDown size={16} aria-hidden="true" /></a>
                </div>
              </div>
              <div className="hero-art">
                <div className="edition-label"><span>COP31</span><span>ANTALYA, TÜRKİYE</span></div>
                <CircularBattery /><p className="battery-caption">{t.battery}</p>
              </div>
            </div>
            <div className="hero-bottom"><div className="topic-tags">{t.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="hero-credit">OSTİM TECHNICAL UNIVERSITY</span></div>
          </div>
        </section>

        <section className="team-section section-space" id="team" aria-labelledby="team-title">
          <div className="page-width team-grid">
            <div className="team-intro">
              <p className="eyebrow section-label">{t.teamLabel}</p>
              <h2 id="team-title">{t.teamHeading.map((line) => <span key={line}>{line}</span>)}</h2>
              <p>{t.teamText}</p>
              <p className="team-hint"><ChevronDown size={16} aria-hidden="true" />{t.teamHint}</p>
            </div>
            <div className="team-roster">
              <h3 className="eyebrow section-label">{t.membersLabel}</h3>
              <ul>{PROJECT_TEAM.map((member, i) => (
                <li key={member.id}>
                  <details className="member-profile" name="team-profiles" id={`profile-${member.id}`}>
                    <summary className="profile-row">
                      <span className="member-index" aria-hidden="true">0{i + 1}</span>
                      <span className="member-copy"><strong>{member.name}</strong><span><span className="when-closed">{t.viewProfile}</span><span className="when-open">{t.hideProfile}</span></span></span>
                      <ChevronDown size={21} aria-hidden="true" />
                    </summary>
                    <ProfileDetails member={member} language={language} />
                  </details>
                </li>
              ))}</ul>
              <div className="coordinator">
                <h3 className="eyebrow section-label">{t.coordinator}</h3>
                <details className="member-profile" name="team-profiles" id="profile-coordinator">
                  <summary className="profile-row coordinator-profile">
                    <span className="member-copy"><strong>{COORDINATOR_PROFILE.name}</strong><span><span className="when-closed">{t.viewProfile}</span><span className="when-open">{t.hideProfile}</span></span></span>
                    <ChevronDown size={21} aria-hidden="true" />
                  </summary>
                  <ProfileDetails member={COORDINATOR_PROFILE} language={language} />
                </details>
              </div>
            </div>
          </div>
        </section>

        <section className="project-section section-space" id="project" aria-labelledby="project-title">
          <div className="page-width">
            <p className="eyebrow section-label">{t.projectLabel}</p>
            <div className="project-intro"><h2 id="project-title">{t.projectHeading.map((line) => <span key={line}>{line}</span>)}</h2><p>{t.projectText}</p></div>
            <div className="feature-list">{t.features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i]
              return <article className="feature" key={feature.title}><span className="feature-icon"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span><h3>{feature.title}</h3><p>{feature.text}</p></article>
            })}</div>
            <details className="how-it-works">
              <summary>{t.flowHeading}<ChevronDown size={20} aria-hidden="true" /></summary>
              <div className="process-grid">
                <ol className="process-steps">{t.flowSteps.map((step, i) => <li key={step}><span className="step-number">0{i + 1}</span><span>{step}</span></li>)}</ol>
                <div className="decision-note"><h3>{t.decisionTitle}</h3><p>{t.decisionText}</p><p>{t.circularText}</p><ol className="lifecycle">{t.lifecycle.map((step, i) => <li key={step}><span>{step}</span>{i < 3 && <ArrowRight size={14} aria-hidden="true" />}</li>)}</ol></div>
              </div>
            </details>
          </div>
        </section>

        <section className="demo-section" aria-labelledby="demo-title">
          <div className="page-width demo-grid">
            <div><p className="eyebrow">{t.closingLabel}</p><h2 id="demo-title">{t.closingHeading.map((line) => <span key={line}>{line}</span>)}</h2></div>
            <div className="demo-content"><p>{t.closingText}</p><a className="button button-dark" href={withLanguage('../', language)}>{t.demo}<ArrowUpRight size={21} aria-hidden="true" /></a><p className="demo-disclosure">{t.demoNote}</p>{teamEmail && <a className="contact-link" href={`mailto:${teamEmail}?subject=${encodeURIComponent('Battery Intelligence')}`}><Mail size={16} aria-hidden="true" />{t.contact}</a>}</div>
          </div>
        </section>
      </main>
      <footer className="site-footer"><div className="page-width footer-inner"><p>© {new Date().getFullYear()} Battery Intelligence<span>{t.footer}</span></p><a href="#top">{t.back}<ArrowUpRight size={15} aria-hidden="true" /></a></div></footer>
    </div>
  )
}
