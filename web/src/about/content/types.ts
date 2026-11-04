import type { PageId } from '../routes.ts'
import type { CarbonFieldId, PilotFieldId } from '../projectData.ts'
import type { ScreenshotId } from '../demoMedia.ts'

export interface SiteCopy {
  institution: string
  homeLink: string
  navigation: string
  language: string
  openMenu: string
  closeMenu: string
  skip: string
  openDemo: string
  newTab: string
  demoNote: string
  preparing: string
  pendingText: string
  backHome: string
  footer: {
    institution: string
    contact: string
    updated: string
    sources: string
    sourceNote: string
    copyright: string
    backTop: string
  }
  notFound: { title: string; description: string }
  pages: Record<PageId, { label: string; title: string; description: string }>
}

export interface HomeCopy {
  eyebrow: string
  headline: string[]
  intro: string
  stage: string
  battery: string
  tags: string[]
  problem: { label: string; title: string; text: string; passport: string; source: string }
  solution: { label: string; title: string; text: string; flowHeading: string; steps: { title: string; detail: string }[]; decision: string; cta: string }
  team: { label: string; title: string; text: string; coordinator: string; cta: string }
  institutions: { label: string; title: string; items: { id: 'foundation' | 'university'; name: string; text: string; url: string }[]; source: string; cta: string }
  climate: { label: string; title: string; text: string; scope: string; cta: string }
  explore: { label: string; title: string; links: { page: PageId; label: string; text: string }[] }
}

export interface TeamCopy {
  members: string
  coordinator: string
  openProfile: string
  closeProfile: string
  missing: string
  fields: { role: string; workPackage: string; contribution: string; bio: string; links: string }
}

export interface OrganizationsCopy {
  logo: string
  missing: string
  officialWebsite: string
  institutions: {
    relationshipTitle: string
    relationshipText: string
    source: string
    managersTitle: string
    managersIntro: string
    researchSlot: string
    pending: string
    confirmed: string
    fields: { name: string; role: string; institution: string; email: string }
    collaborationLink: string
  }
  collaborations: {
    heading: string
    intro: string
    statuses: { proposed: string; pending: string; confirmed: string }
    fields: { proposal: string; approvedScope: string; contribution: string; website: string }
    contactTitle: string
    contactText: string
    email: string
    formTitle: string
    formText: string
    form: ContactFormCopy
    institutionsLink: string
    projectLink: string
  }
}

export interface TextBlock { title: string; text: string }

export interface ProjectCopy {
  navigation: string
  summary: { title: string; paragraphs: string[]; stage: string }
  goals: { title: string; items: string[]; audienceTitle: string; audience: string }
  scenario: { title: string; note: string; steps: TextBlock[] }
  flow: { title: string; safeguardsTitle: string; safeguards: string[] }
  access: { title: string; intro: string; options: TextBlock[] }
  methods: { title: string; intro: string; items: { title: string; candidates: string; condition: string }[] }
  passport: {
    title: string; intro: string; records: TextBlock[]; identity: string; options: string; detailsTitle: string
    accessTitle: string; access: TextBlock[]; accessNote: string
    lifecycleTitle: string; states: { code: string; label: string }[]; lifecycleNote: string
    healthNote: string; guideNote: string
  }
  pilot: {
    title: string; intro: string; phase: string
    stages: { phase: number; title: string; period: string; text: string }[]
    informationTitle: string; fields: Record<PilotFieldId, string>
  }
  missing: string
  related: { carbon: string; demo: string }
  sourcesTitle: string
  proposalSource: string
  sourceLabels: { regulation: string; guidance: string; faq: string }
}

export interface CarbonCopy {
  notice: string
  expected: { title: string; intro: string; items: TextBlock[] }
  indicators: { title: string; items: TextBlock[]; note: string }
  method: { title: string; formula: string[]; unitNote: string; factorNote: string; factorSource: string }
  limits: { title: string; items: string[] }
  secondLife: { title: string; text: string }
  information: { title: string; intro: string; missing: string; fields: Record<CarbonFieldId, string> }
  sourcesTitle: string
  proposalSource: string
  sourceLabels: { regulation: string; guidance: string; emissions: string; cop31: string }
  related: { project: string; demo: string }
}

export interface DemoCopy {
  start: { title: string; text: string }
  guide: { title: string; intro: string; steps: TextBlock[]; note: string }
  gallery: {
    title: string; intro: string; enlarge: string; synthetic: string; source: string
    items: Record<ScreenshotId, { title: string; text: string; alt: string }>
  }
  materials: {
    title: string; presentation: string; video: string; pending: string
    presentationNote: string; videoNote: string; view: string; download: string
    videoLabel: string; captions: string; videoFallback: string
  }
  related: { project: string; carbon: string }
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
  honeypot: string
  submit: string
  sending: string
  counter: string
  summaryTitle: string
  errors: {
    required: Record<'name' | 'organization' | 'email' | 'message' | 'consent', string>
    tooShort: string
    tooLong: string
    invalidEmail: string
    invalidPhone: string
  }
  success: { title: string; text: string; again: string }
  failure: { title: string; not_configured: string; rate_limited: string; delivery_failed: string; network: string; generic: string }
}
