import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../lib/i18n.tsx'
import { CONTENT } from '../content/index.ts'
import { pagePath, SITE_PAGES, type PageId } from '../routes.ts'
import { DemoAccess } from './DemoAccess.tsx'
import universityLogo from '../assets/logo-ostim-teknik.png'
import { ThemeToggle } from '../../components/ThemeToggle.tsx'

export function SiteHeader({ pageId }: { pageId: PageId | undefined }) {
  const { l, language, setLanguage } = useI18n()
  const t = CONTENT[language].common
  const [menuOpen, setMenuOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        trigger.current?.focus()
      }
    }
    // A non-modal disclosure: links follow the trigger in the keyboard order.
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setMenuOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 1100px)')
    const closeAtDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)
    desktop.addEventListener('change', closeAtDesktop)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutside)
      desktop.removeEventListener('change', closeAtDesktop)
    }
  }, [menuOpen])

  const languageControl = (
    <div className="site-language" role="group" aria-label={t.language}>
      {(['en', 'tr'] as const).map((lang) => {
        const name = lang === 'en' ? 'English' : 'Türkçe'
        return (
          <button key={lang} type="button" lang={lang} aria-label={name} aria-pressed={language === lang} onClick={() => setLanguage(lang)}>
            <span className="site-language-code">{lang.toUpperCase()}</span>
            <span className="site-language-name">{name}</span>
          </button>
        )
      })}
    </div>
  )

  return (
    <header className="site-header" ref={header} onBlur={(event) => {
      if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false)
    }}>
      <div className="page-width site-header-inner">
        <div className="site-header-top">
          <a className="site-identity" href={pagePath('home', language)} aria-label={t.homeLink}>
            <img src={universityLogo} alt="" width="500" height="174" />
            <span className="site-brand" aria-hidden="true"><span className="site-brand-wordmark" /></span>
          </a>
          <div className="site-header-controls">
            {languageControl}
            <ThemeToggle className="theme-toggle" />
          </div>
          <button className="site-menu-toggle" type="button" ref={trigger} aria-label={menuOpen ? t.closeMenu : t.openMenu} aria-expanded={menuOpen} aria-controls="site-menu-panel" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
          <div id="site-menu-panel" className={`site-menu-panel${menuOpen ? ' is-open' : ''}`}>
            <nav id="site-navigation" className="site-navigation" aria-label={t.navigation}>
              {SITE_PAGES.filter((page) => !('hidden' in page)).map(({ id }) => (
                <a key={id} href={pagePath(id, language)} aria-current={pageId === id ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{t.pages[id].label}</a>
              ))}
            </nav>
            <div className="site-menu-preferences" role="group" aria-labelledby="site-preferences-label">
              <p id="site-preferences-label">{l('Preferences', 'Tercihler')}</p>
              <div className="site-menu-preference-controls">
                {languageControl}
                <ThemeToggle className="theme-toggle" showLabel />
              </div>
            </div>
          </div>
        </div>
        {pageId !== 'home' && pageId !== 'demo' && <div className="site-header-demo"><DemoAccess compact /></div>}
      </div>
    </header>
  )
}
