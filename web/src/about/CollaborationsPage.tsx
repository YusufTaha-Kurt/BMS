import { useI18n } from '../lib/i18n.tsx'
import { CONTENT } from './content/index.ts'
import { ContactForm } from './components/ContactForm.tsx'
import { PageTemplate } from './components/PageTemplate.tsx'

export function CollaborationsPage() {
  const { language } = useI18n()
  const page = CONTENT[language].common.pages.contact
  return (
    <PageTemplate title={page.title} description={page.description}>
      <ContactForm />
    </PageTemplate>
  )
}
