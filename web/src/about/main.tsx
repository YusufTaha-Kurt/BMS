import { I18nProvider } from '../lib/i18n.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './about.css'
import './team.css'
import './organizations.css'
import './technical.css'
import './showcase.css'
import './site.css'
import { SiteApp } from './SiteApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider><SiteApp /></I18nProvider>
  </StrictMode>,
)
