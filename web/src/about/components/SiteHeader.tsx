import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useI18n, withLanguage } from '../../lib/i18n.tsx'
import { CONTENT } from '../content/index.ts'
import { pagePath, SITE_PAGES, type PageId } from '../routes.ts'
import { DemoAccess } from './DemoAccess.tsx'
import { TEAM_NAME } from '../../site.ts'
import universityLogo from '../assets/logo-ostim-teknik.png'
import { ThemeToggle } from '../../components/ThemeToggle.tsx'

export function SiteHeader({ pageId }: { pageId: PageId | undefined }) {
  const { language, setLanguage } = useI18n()
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

  return (
    <header className="site-header" ref={header}>
      <div className="page-width site-header-inner">
        <div className="site-header-top">
          <a className="site-identity" href={withLanguage(pagePath('home'), language)} aria-label={t.homeLink}>
            <img src={universityLogo} alt="" width="500" height="174" />
            <strong>{TEAM_NAME}</strong>
          </a>
          <div className="site-header-controls">
            <div className="site-language" role="group" aria-label={t.language}>
              {(['en', 'tr'] as const).map((lang) => (
                <button key={lang} type="button" lang={lang} aria-label={lang === 'en' ? 'English' : 'Türkçe'} aria-pressed={language === lang} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>
              ))}
            </div>
            <ThemeToggle className="theme-toggle" />
            <button className="site-menu-toggle" type="button" ref={trigger} aria-label={menuOpen ? t.closeMenu : t.openMenu} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <nav id="site-navigation" className={`site-navigation${menuOpen ? ' is-open' : ''}`} aria-label={t.navigation}>
          {SITE_PAGES.filter((page) => !('hidden' in page)).map(({ id }) => (
            <a key={id} href={withLanguage(pagePath(id), language)} aria-current={pageId === id ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{t.pages[id].label}</a>
          ))}
        </nav>
        {pageId !== 'home' && pageId !== 'demo' && <div className="site-header-demo"><DemoAccess compact /></div>}
      </div>
    </header>
  )
}
