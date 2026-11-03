import { I18nProvider } from '../lib/i18n.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import './about.css'
import { About } from './About.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider><About /></I18nProvider>
  </StrictMode>,
)
