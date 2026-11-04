import { FOUNDATION_SOURCE, UNIVERSITY_SOURCE } from '../sources.ts'
import type { HomeCopy, OrganizationsCopy, SiteCopy, TeamCopy } from './types.ts'

export const common: SiteCopy = {
  institution: 'OSTİM Technical University',
  homeLink: 'BinBin Battery Intelligence — home',
  navigation: 'Main navigation',
  language: 'Language',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  skip: 'Skip to content',
  openDemo: 'Open demo',
  newTab: 'opens in a new tab',
  demoNote: 'Synthetic data. This demo does not show BinBin’s real fleet data or the final interface.',
  preparing: 'In preparation',
  pendingText: 'This page is being prepared. You can explore the existing project introduction and interactive demo in the meantime.',
  backHome: 'Back to the project introduction',
  footer: {
    institution: 'Institution',
    contact: 'Project email',
    updated: 'Last updated',
    sources: 'Sources & credits',
    sourceNote: 'COP31 Website Brief (November 2026) and BinBin Project Proposal (October 2026). Demo images: the project team’s local application using synthetic data.',
    copyright: 'Project team content. Third-party materials retain their respective rights.',
    backTop: 'Back to top',
  },
  notFound: { title: 'Page not found', description: 'Return to the project introduction to continue exploring.' },
  pages: {
    home: {
      label: 'Home', title: 'Project introduction',
      description: 'Meet the OSTİM Technical University team developing battery health intelligence and a Digital Battery Passport for shared micromobility.',
    },
    institutions: {
      label: 'Institutions', title: 'Institutional structure & leadership',
      description: 'Information about OSTİM Foundation, OSTİM Technical University and the institutional structure behind the project.',
    },
    team: {
      label: 'Team', title: 'Project team',
      description: 'Meet the project team and academic coordinator, and learn about their roles and contributions.',
    },
    project: {
      label: 'Project', title: 'Project details',
      description: 'The proposed approach to battery health, maintenance decision support and the Digital Battery Passport.',
    },
    demo: {
      label: 'Demo & presentation', title: 'Demo & presentation',
      description: 'A synthetic-data concept demo, a five-step guide and annotated screenshots.',
    },
    carbon: {
      label: 'Carbon impact', title: 'Carbon impact & circularity',
      description: 'The project’s expected contributions, calculation approach and limitations. Measured results are not yet available.',
    },
    contact: {
      label: 'Collaboration & contact', title: 'Collaboration & contact',
      description: 'The proposed BinBin pilot collaboration, Sustain Bridge information and project contact options.',
    },
  },
}

export const home: HomeCopy = {
  eyebrow: 'OSTİM / BATTERY RESEARCH',
  headline: ['BinBin Battery', 'Intelligence'],
  intro: 'Battery health tracking, maintenance decision support and a Digital Battery Passport for shared micromobility.',
  stage: 'Proposal and pilot planning stage',
  battery: 'One battery. One identity.',
  tags: ['Battery health', 'Digital Battery Passport', 'Circular economy'],
  problem: {
    label: 'THE NEED', title: 'A battery’s history should travel with it.',
    text: 'Batteries move between vehicles. Health indicators, repairs and replacement records need to remain connected to the individual battery so maintenance teams can assess its condition.',
    passport: 'Traceable records also support preparation for the EU Battery Passport requirement, which covers LMT (light means of transport) batteries newly placed on the EU market or put into service from 18 February 2027.',
    source: 'Source: European Commission',
  },
  solution: {
    label: 'THE APPROACH', title: 'From battery data to better decisions.',
    text: 'We aim to connect existing battery data and maintenance records under one battery identity, develop health and anomaly indicators, and feed verified lifecycle records into a Digital Battery Passport.',
    flowHeading: 'Proposed system flow',
    steps: [
      { title: 'Battery', detail: 'An individual identity across vehicle changes.' },
      { title: 'BMS / IoT', detail: 'Existing Battery Management System and Internet of Things data.' },
      { title: 'Data processing', detail: 'Identity matching, time alignment and data quality checks.' },
      { title: 'Health & anomaly analysis', detail: 'Indicators and methods to be validated with pilot data.' },
      { title: 'Maintenance decision support', detail: 'Priorities and explanations for technical review.' },
      { title: 'Digital Battery Passport', detail: 'Verified health and lifecycle records.' },
    ],
    decision: 'The proposed access is read-only. BMS protection functions remain unchanged, and trained technical staff make the final decisions.',
    cta: 'Explore the project',
  },
  team: {
    label: 'THE PEOPLE', title: 'The team developing the project',
    text: 'Computer and electrical-electronics engineering students at OSTİM Technical University are developing the proposal with an academic coordinator.',
    coordinator: 'Academic coordinator', cta: 'Meet the team',
  },
  institutions: {
    label: 'INSTITUTIONS', title: 'OSTİM Foundation and OSTİM Technical University',
    items: [
      { id: 'foundation', name: 'OSTİM Foundation', text: 'OSTİM Foundation brings education, research, technology and entrepreneurship together to support industrial development.', url: FOUNDATION_SOURCE },
      { id: 'university', name: 'OSTİM Technical University', text: 'Established by OSTİM Foundation, OSTİM Technical University connects education and research with the industrial ecosystem.', url: UNIVERSITY_SOURCE },
    ],
    source: 'Official website', cta: 'Explore the institutions',
  },
  climate: {
    label: 'COP31 CONTEXT', title: 'Keeping the full battery lifecycle in view.',
    text: 'The proposed work relates to circularity and electrification through better battery life management, traceable reuse and recycling decisions, and the planned monitoring of operational emissions.',
    scope: 'The project is not being developed to fulfil a direct COP31 obligation. Its expected contributions will need pilot validation.',
    cta: 'Explore the expected carbon impact',
  },
  explore: {
    label: 'KEEP EXPLORING', title: 'Explore the project',
    links: [
      { page: 'project', label: 'Explore the project', text: 'The proposed approach and development stages.' },
      { page: 'team', label: 'Meet the team', text: 'The people behind the project and their profiles.' },
      { page: 'demo', label: 'Demo & presentation', text: 'Access the working synthetic-data concept demo.' },
      { page: 'carbon', label: 'Carbon impact', text: 'Expected contributions, methods and limitations.' },
      { page: 'contact', label: 'Propose a collaboration', text: 'Collaboration and contact information.' },
    ],
  },
}

export const team: TeamCopy = {
  members: 'Project team', coordinator: 'Academic coordinator',
  openProfile: 'View profile', closeProfile: 'Close profile', missing: 'Information not yet provided',
  fields: { role: 'Role', workPackage: 'Work package', contribution: 'Contribution', bio: 'Short biography', links: 'Links' },
}

export const organizations: OrganizationsCopy = {
  logo: 'Logo', missing: 'Information not yet provided', officialWebsite: 'Official website',
  institutions: {
    relationshipTitle: 'From foundation to university.',
    relationshipText: 'OSTİM Foundation established OSTİM Technical University to develop its education, research, technology and entrepreneurship activities within an academic institution. Computer and electrical-electronics engineering students at the university are preparing the project with an academic coordinator.',
    source: 'Institutional relationship source: OSTİM Foundation',
    managersTitle: 'Leadership information',
    managersIntro: 'The draft names from the brief are listed below. Roles, institutions and official contact details will be added after institutional confirmation.',
    researchSlot: 'Research & projects representative',
    pending: 'Awaiting confirmation', confirmed: 'Confirmed',
    fields: { name: 'Full name', role: 'Role / title', institution: 'Institution', email: 'Official email' },
    collaborationLink: 'Collaboration & contact',
  },
  collaborations: {
    heading: 'Areas of collaboration',
    intro: 'A pilot collaboration with BinBin is proposed. Approved scopes and further collaboration details are awaiting confirmation.',
    statuses: { proposed: 'Proposed pilot collaboration', pending: 'Scope information pending', confirmed: 'Confirmed collaboration' },
    fields: { proposal: 'Approach in the proposal', approvedScope: 'Approved collaboration scope', contribution: 'Project contribution', website: 'Official link' },
    contactTitle: 'Project contact',
    contactText: 'An institutional contact channel is being prepared for project enquiries and collaboration proposals.',
    email: 'Institutional project email',
    formTitle: 'Collaboration proposal',
    formText: 'Use this form to send a collaboration proposal to the project team. We will reply to the email address you provide.',
    form: {
      intro: 'All fields are required unless marked optional.',
      closed: 'This form is not accepting submissions yet. It will open once the institution’s recipient address and approved privacy notice are added.',
      labels: { name: 'Full name', organization: 'Organisation', email: 'Email', phone: 'Phone', message: 'Your proposal' },
      optional: 'optional',
      hints: { email: 'We will reply to this address.', phone: 'You can include the country code, e.g. +90 312 000 00 00.', message: 'Briefly describe your collaboration idea, what your organisation could contribute and what you expect (at least 20 characters).' },
      consentBefore: 'I have read the ',
      consentLink: 'privacy notice',
      consentAfter: ' and agree that my details are processed to assess this proposal and reply to me.',
      consentPending: 'The privacy notice will be added after institutional approval.',
      honeypot: 'Leave this field empty',
      submit: 'Send proposal',
      sending: 'Sending…',
      counter: '{count}/{max} characters',
      summaryTitle: 'Please correct the following before sending:',
      errors: {
        required: { name: 'Enter your full name.', organization: 'Enter your organisation.', email: 'Enter your email address.', message: 'Enter your proposal.', consent: 'Accept the privacy notice to send the form.' },
        tooShort: 'Enter at least {min} characters.',
        tooLong: 'Enter no more than {max} characters.',
        invalidEmail: 'Enter a valid email address, e.g. name@organisation.org.',
        invalidPhone: 'Use only digits, spaces, +, ( ) and - in the phone number.',
      },
      success: { title: 'Your proposal has been sent', text: 'Thank you. The project team will review your proposal and reply to the email address you provided.', again: 'Send another proposal' },
      failure: {
        title: 'Your proposal could not be sent',
        not_configured: 'The form is not configured to accept submissions at the moment. Please try again later.',
        rate_limited: 'Too many submissions in a short time. Please try again in a few minutes.',
        delivery_failed: 'Something went wrong while delivering your proposal. Your text is kept; you can try again.',
        network: 'Could not reach the server. Check your connection and try again; your text is kept.',
        generic: 'An unexpected error occurred. Your text is kept; you can try again.',
      },
    },
    institutionsLink: 'Explore the institutional structure', projectLink: 'Explore the project',
  },
}

export { project, carbon } from './technical.en.ts'
export { demo } from './demo.en.ts'
