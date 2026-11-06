import type { PageId } from '../routes.ts'
import type { ScreenshotId } from '../demoMedia.ts'
import type { CvSectionId } from '../teamCv.ts'

export interface TextBlock { title: string; text: string }

export interface SiteCopy {
  homeLink: string
  navigation: string
  language: string
  openMenu: string
  closeMenu: string
  skip: string
  openDemo: string
  newTab: string
  demoNote: string
  universityLogo: string
  cop31Logo: string
  backHome: string
  footer: { team: string; updated: string; backTop: string }
  notFound: { title: string; description: string }
  pages: Record<PageId, { label: string; title: string; description: string }>
}

export interface HomeCopy {
  headline: string[]
  intro: string
  projectLink: string
  heroAlt: string
  heroCaption: string
  need: { title: string; paragraphs: string[]; source: string }
  flow: { title: string; steps: TextBlock[]; principle: string; link: string }
  people: { title: string; text: string; team: string; institutions: string }
  climate: { title: string; text: string; link: string }
}

export interface TeamCopy {
  members: string
  coordinator: string
  fields: { role: string; workPackage: string; contribution: string; bio: string; links: string }
  sections: Record<CvSectionId, string>
}

export interface OrganizationsCopy {
  officialWebsite: string
  institutions: {
    items: { id: 'foundation' | 'university'; name: string; text: string }[]
    relationshipTitle: string
    relationshipText: string
    relationshipSource: string
    managersTitle: string
    managersNote: string
  }
  collaborations: {
    heading: string
    statuses: { proposed: string; pending: string; confirmed: string }
    approvedScope: string
    contribution: string
    formTitle: string
    formText: string
    form: ContactFormCopy
  }
}

export interface ProjectCopy {
  summary: { paragraphs: string[]; stage: string }
  goals: { title: string; items: string[]; audience: string }
  flow: { title: string; principles: string[] }
  access: { title: string; intro: string; options: TextBlock[] }
  methods: { title: string; intro: string; items: TextBlock[] }
  passport: { title: string; paragraphs: string[]; statesTitle: string; states: { code: string; label: string }[]; statesNote: string }
  pilot: { title: string; intro: string; phase: string; stages: { phase: number; title: string; period: string; text: string }[] }
  sources: { title: string; proposal: string; regulation: string; guidance: string; faq: string }
}

export interface CarbonCopy {
  notice: string
  expected: { title: string; items: TextBlock[] }
  indicators: { title: string; items: TextBlock[]; note: string }
  method: { title: string; formula: string[]; paragraphs: string[]; factorSource: string }
  limits: { title: string; items: string[] }
  secondLife: TextBlock
  sources: { title: string; proposal: string; regulation: string; guidance: string; emissions: string; cop31: string }
}

export interface DemoCopy {
  start: { title: string; text: string }
  guide: { title: string; steps: TextBlock[] }
  gallery: {
    title: string; note: string; enlarge: string
    items: Record<ScreenshotId, { title: string; text: string; alt: string }>
  }
  materials: {
    title: string; presentation: string; video: string; view: string; download: string
    videoLabel: string; captions: string; videoFallback: string
  }
}

export interface PrivacyCopy {
  version: string
  intro: string
  sections: { title: string; lead?: string; items?: string[]; paragraphs?: string[] }[]
  universitySite: string
}

export interface ContactFormCopy {
  intro: string
  closed: string
  labels: { name: string; organization: string; email: string; phone: string; message: string }
  optional: string
  hints: { email: string; phone: string; message: string }
  consentBefore: string
  consentLink: string
  consentAfter: string
  consentPending: string
  transferConsent: string
  honeypot: string
  submit: string
  sending: string
  counter: string
  summaryTitle: string
  errors: {
    required: Record<'name' | 'organization' | 'email' | 'message' | 'consent' | 'transferConsent', string>
    tooShort: string
    tooLong: string
    invalidEmail: string
    invalidPhone: string
  }
  success: { title: string; text: string; again: string }
  failure: { title: string; not_configured: string; rate_limited: string; delivery_failed: string; network: string; generic: string }
}
