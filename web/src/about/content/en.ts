import type { HomeCopy, OrganizationsCopy, SiteCopy, TeamCopy } from './types.ts'

export const common: SiteCopy = {
  homeLink: 'İklimTekOst home',
  navigation: 'Main navigation',
  language: 'Language',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  skip: 'Skip to content',
  openDemo: 'Open the demo',
  newTab: 'opens in a new tab',
  demoNote: 'The demo runs on synthetic data. It is not real fleet data or the final interface.',
  universityLogo: 'OSTİM Technical University',
  cop31Logo: 'COP31 Türkiye, Antalya',
  backHome: 'Back to the home page',
  footer: { team: 'OSTİM Technical University project team', updated: 'Last updated', backTop: 'Back to top' },
  notFound: { title: 'Page not found', description: 'This address does not exist on the site.' },
  pages: {
    home: {
      label: 'Home', title: 'Project introduction',
      description: 'Battery health tracking, maintenance priorities and a Digital Battery Passport for shared micromobility.',
    },
    institutions: {
      label: 'Institutions', title: 'Institutions',
      description: 'The project runs at OSTİM Technical University, which was founded by the OSTİM Foundation.',
    },
    team: {
      label: 'Team', title: 'Project team',
      description: 'Computer and electrical-electronics engineering students and the academic coordinator.',
    },
    project: {
      label: 'Project', title: 'Project',
      description: 'How the system works, which data it uses and the pilot timeline.',
    },
    demo: {
      label: 'Demo', title: 'Demo and presentation',
      description: 'A demo that runs on synthetic data, with steps for using it.',
    },
    carbon: {
      label: 'Carbon', title: 'Carbon impact',
      description: 'Expected effects and the calculation method. There are no measured results yet.',
    },
    contact: {
      label: 'Collaboration', title: 'Collaboration',
      description: 'Organisations supporting the project and the collaboration proposal form.',
    },
    privacy: {
      label: 'Privacy notice', title: 'Personal data privacy notice',
      description: 'How personal data sent through the collaboration proposal form is processed.',
    },
  },
}

export const home: HomeCopy = {
  headline: ['İklim', 'TekOst'],
  intro: 'Battery health tracking, maintenance priorities and a Digital Battery Passport for shared micromobility. The project is at the proposal and pilot planning stage.',
  projectLink: 'About the project',
  heroAlt: 'Synthetic battery DEMO-001. Temperature drift reason, technical review recommendation and indicators compared with the no-event baseline.',
  heroCaption: 'Demo screen, DEMO-001, day 14. The data is synthetic.',
  need: {
    title: 'Why it is needed',
    paragraphs: [
      'In shared fleets, batteries move between vehicles. To make sound decisions, maintenance teams need health, repair and replacement records kept with the battery’s own identity.',
      'In the EU, the Battery Passport requirement for light means of transport batteries starts on 18 February 2027. These records also help prepare for it.',
    ],
    source: 'European Commission announcement',
  },
  flow: {
    title: 'How it works',
    steps: [
      { title: 'Battery', text: 'A unique identity that stays the same when the vehicle changes.' },
      { title: 'BMS and IoT data', text: 'Existing Battery Management System and connected device records.' },
      { title: 'Data processing', text: 'Identity matching, time alignment and quality checks.' },
      { title: 'Health and anomaly analysis', text: 'Indicators to be validated with pilot data.' },
      { title: 'Maintenance priority', text: 'Technical review order and the reason for it.' },
      { title: 'Digital Battery Passport', text: 'Validated health and life cycle records.' },
    ],
    principle: 'Data is read only. BMS protection functions are not changed. Technical staff make the maintenance decision.',
    link: 'Project details',
  },
  people: {
    title: 'Team and institutions',
    text: 'Computer and electrical-electronics engineering students at OSTİM Technical University run the project with academic coordinator Barış Taha Uludağ. The university was founded by the OSTİM Foundation.',
    team: 'Team', institutions: 'Institutions',
  },
  climate: {
    title: 'Link to COP31',
    text: 'Longer battery life, traceable reuse and recycling decisions and measured charging emissions relate to the circularity and electrification themes of COP31. The project is not carried out under a COP31 obligation. Expected contributions will be validated in the pilot.',
    link: 'Carbon impact',
  },
}

export const team: TeamCopy = {
  members: 'Student team', coordinator: 'Academic coordinator',
  fields: { role: 'Role', workPackage: 'Work package', contribution: 'Contribution', bio: 'About', links: 'Links' },
  sections: { education: 'Education', publications: 'Publications', experience: 'Experience', projects: 'Projects', certificates: 'Certificates and training', skills: 'Skills', languages: 'Languages', seminars: 'Events and seminars' },
}

export const organizations: OrganizationsCopy = {
  officialWebsite: 'Official website',
  institutions: {
    items: [
      { id: 'university', name: 'OSTİM Technical University', text: 'Founded by the OSTİM Foundation. It runs education and research together with the industrial ecosystem.' },
      { id: 'foundation', name: 'OSTİM Foundation', text: 'Brings together education, research, technology and entrepreneurship to support industrial development.' },
    ],
    relationshipTitle: 'How the institutions relate',
    relationshipText: 'The OSTİM Foundation established OSTİM Technical University to carry out its education and research work in an institutional structure. The university’s student team prepares the project together with the academic coordinator.',
    relationshipSource: 'About the OSTİM Foundation',
    managersTitle: 'Management',
    managersNote: 'Details for the person whose title could not be found in an official source will be added after confirmation.',
  },
  collaborations: {
    heading: 'Supporters',
    statuses: { proposed: 'Supporting organisation', pending: 'Scope being defined', confirmed: 'Supporting organisation' },
    approvedScope: 'Approved scope',
    contribution: 'Contribution to the project',
    formTitle: 'Collaboration proposal',
    formText: 'Proposals go to the project team. The reply is sent to the email address given in the form.',
    form: {
      intro: 'Optional fields are marked. All other fields are required.',
      closed: 'The form is not accepting submissions at the moment.',
      labels: { name: 'Full name', organization: 'Organisation', email: 'Email', phone: 'Phone', message: 'Proposal' },
      optional: 'optional',
      hints: {
        email: 'The reply is sent to this address.',
        phone: 'Country code can be included, e.g. +90 312 000 00 00',
        message: 'Your collaboration idea, what your organisation could contribute and what you expect. At least 20 characters.',
      },
      consentBefore: 'I have read the ',
      consentLink: 'privacy notice',
      consentAfter: '.',
      consentPending: 'The privacy notice will be added after institutional approval.',
      transferConsent: 'I give explicit consent to my details being processed and stored on the servers abroad listed in the privacy notice.',
      honeypot: 'Leave this field empty',
      submit: 'Send proposal',
      sending: 'Sending',
      counter: '{count} / {max} characters',
      summaryTitle: 'Fields to correct before sending',
      errors: {
        required: {
          name: 'Enter your full name.', organization: 'Enter your organisation.', email: 'Enter an email address.',
          message: 'Enter the proposal text.', consent: 'Confirm that you have read the privacy notice.',
          transferConsent: 'Give explicit consent for processing on servers abroad.',
        },
        tooShort: 'Enter at least {min} characters.',
        tooLong: 'Up to {max} characters are allowed.',
        invalidEmail: 'Enter a valid email address, e.g. name@organisation.org',
        invalidPhone: 'Use only digits, spaces and + ( ) - in the phone number.',
      },
      success: { title: 'Proposal sent', text: 'The project team will review the proposal and reply to the email address you gave.', again: 'Send another proposal' },
      failure: {
        title: 'The proposal could not be sent',
        not_configured: 'The form is not accepting submissions at the moment.',
        rate_limited: 'Too many submissions in a short time. Please try again later.',
        delivery_failed: 'The proposal could not be delivered. Your text is kept, please try again.',
        network: 'Could not reach the server. Check the connection and try again.',
        generic: 'An unexpected error occurred. Please try again.',
      },
    },
  },
}

export { project, carbon } from './technical.en.ts'
export { demo } from './demo.en.ts'
export { privacy } from './privacy.en.ts'
