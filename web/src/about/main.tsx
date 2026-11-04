import { I18nProvider } from '../lib/i18n.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './site.css'
import './contact-form.css'
import { SiteApp } from './SiteApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider><SiteApp /></I18nProvider>
  </StrictMode>,
)
