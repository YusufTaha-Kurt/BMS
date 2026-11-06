import type { CarbonCopy, ProjectCopy } from './types.ts'

export const project: ProjectCopy = {
  summary: {
    paragraphs: [
      'In shared fleets, one battery can be used in several vehicles. The project keeps the usage, maintenance and health history of each battery in a single record.',
      'Based on this history, the maintenance team sees which battery to inspect first. Validated records are also used to assess second use and recycling.',
    ],
    stage: 'The project is at the proposal and pilot planning stage. The first data review starts with the fleet operator’s technical information form and data sharing. The current demo runs on synthetic data.',
  },
  goals: {
    title: 'Goals',
    items: [
      'Track health and usage history for each battery',
      'Assess unusual behaviour and fault indicators',
      'Give the maintenance team review priorities with reasons',
      'Prepare a verifiable record base for the Digital Battery Passport',
    ],
    audience: 'The main users are micromobility fleet operators and maintenance teams. Data sharing with manufacturers, service partners and recyclers is defined separately according to access rights.',
  },
  flow: {
    title: 'System flow',
    principles: [
      'Data is read only.',
      'BMS protection functions are not changed.',
      'Authorised technical staff make the maintenance decision.',
      'Existing infrastructure is used first. Extra hardware is considered only for a confirmed data gap.',
    ],
  },
  access: {
    title: 'Data access options',
    intro: 'The options are assessed in the order below.',
    options: [
      { title: 'Existing cloud records', text: 'If telemetry, maintenance and history records are sufficient, they are used with read-only access.' },
      { title: 'Extra data through IoT', text: 'Fields that exist on the device but are not sent to the cloud, or a higher recording rate, are assessed. Device capacity and communication load are checked with the operator.' },
      { title: 'Read-only gateway', text: 'Considered if a required signal exists on the vehicle bus but does not reach the cloud. Protocol details and technical approval are needed.' },
      { title: 'Additional measurement', text: 'If a required quantity is not measured at all, an extra sensor is assessed in a small pilot group.' },
    ],
  },
  methods: {
    title: 'Planned analysis methods',
    intro: 'Simple, explainable comparisons come first. Models are chosen with pilot data. The demo uses rule-based alerts only.',
    items: [
      { title: 'Anomaly', text: 'Statistical rules and Isolation Forest. Validated with service records and expert review.' },
      { title: 'Early fault', text: 'Logistic regression and gradient boosting, compared with the existing alarm rules. Requires validated fault records.' },
      { title: 'SOH estimation', text: 'Regression on charging session features. Requires capacity references with a known measurement method.' },
      { title: 'Degradation', text: 'Health trend and loss estimate from repeated measurements of the same battery.' },
      { title: 'Remaining useful life', text: 'Survival methods if long-term tracking is sufficient. If data is insufficient, the required data conditions are reported.' },
    ],
  },
  passport: {
    title: 'Digital Battery Passport',
    paragraphs: [
      'Records are linked to the battery’s unique identity rather than to a vehicle. Vehicle and battery pairings are kept with their dates. Validated summaries and events go into the passport instead of raw telemetry.',
      'At model level, the passport holds manufacturer, chemistry, nominal capacity and voltage. At battery level, it holds the serial number, usage and maintenance history, health records and life cycle status.',
      'Access is planned at three levels. Some fields are public. Some information is open only to authorities and some to parties with a legitimate interest. The exact scope follows current regulation.',
    ],
    statesTitle: 'Life cycle states',
    states: [
      { code: 'original', label: 'Original' },
      { code: 're-used', label: 'Re-used' },
      { code: 'repurposed', label: 'Repurposed' },
      { code: 'remanufactured', label: 'Remanufactured' },
      { code: 'waste', label: 'Waste' },
    ],
    statesNote: 'Batteries do not have to pass through these states in order.',
  },
  pilot: {
    title: 'Pilot timeline',
    intro: 'Durations are the relative plan from the proposal. At the end of each stage, the next step is decided together based on data sufficiency.',
    phase: 'Phase',
    stages: [
      { phase: 0, title: 'Data review', period: 'Month 1', text: 'Data inventory, battery identity matching and usable data coverage.' },
      { phase: 1, title: 'First pilot', period: 'Months 1 to 3', text: 'Data flow, basic health and anomaly indicators, passport prototype.' },
      { phase: 2, title: 'Models and carbon', period: 'Months 3 to 6', text: 'Health and fault models if data allows, operational emissions calculation.' },
      { phase: 3, title: 'Extra data decision', period: 'Months 6 to 7', text: 'Limited reference measurements or extra data access if needed.' },
      { phase: 4, title: 'Field validation', period: 'Months 7 to 10', text: 'Maintenance priority, QR and passport flows, feedback from the maintenance team.' },
      { phase: 5, title: 'Roll-out', period: 'After month 10', text: 'Gradual fleet roll-out if the results are sufficient.' },
    ],
  },
  sources: {
    title: 'Sources',
    proposal: 'Project proposal, October 2026',
    regulation: 'EU Battery Regulation 2023/1542',
    guidance: 'European Commission passport resources',
    faq: 'European Commission FAQ',
  },
}

export const carbon: CarbonCopy = {
  notice: 'The effects on this page are expected effects. Measured results will be added after the pilot.',
  expected: {
    title: 'Expected contributions',
    items: [
      { title: 'Maintenance and service life', text: 'Provides data for fewer early replacements and for keeping batteries in use until the end of their useful life.' },
      { title: 'Traceable life cycle', text: 'Provides records for assessing batteries that leave the fleet for repair, reuse, second use or recycling.' },
      { title: 'Operational monitoring', text: 'Records energy use and emissions from charging.' },
    ],
  },
  indicators: {
    title: 'Two separate indicators',
    items: [
      { title: 'Battery carbon footprint', text: 'Defined in Article 7 and Annex II of EU Regulation 2023/1542. Covers raw materials, production, distribution and end of life. Requires manufacturer or supplier documents. Charging electricity during use is outside this scope.' },
      { title: 'Charging emissions', text: 'Based on the grid electricity used to charge the fleet. Calculated from measured energy and a consumption-point emission factor.' },
    ],
    note: 'The two indicators use different boundaries and are not added together.',
  },
  method: {
    title: 'Calculation method',
    formula: ['Operational emissions', 'Grid energy used', 'Emission factor'],
    paragraphs: [
      'With energy in kWh and the factor in kg CO₂e/kWh, the result is in kg CO₂e.',
      'For Türkiye, the ETKB EVÇED consumption-point emission factors are used. The selected value, its year, connection type and source are recorded together.',
    ],
    factorSource: 'ETKB EVÇED emission factors',
  },
  limits: {
    title: 'Limits',
    items: [
      'The point where energy is measured is set in the first pilot phase.',
      'An annual national factor does not show gains from charging at different hours. That needs a separate, validated hourly data set.',
      'No savings rate or emission reduction is stated without real consumption and pilot results.',
      'Energy records and the factor in the demo are examples. They are not real fleet measurements.',
    ],
  },
  secondLife: {
    title: 'Second use decisions',
    text: 'A single SOH threshold is not enough. Health, controlled capacity tests, safety findings, maintenance history and the target use are reviewed together.',
  },
  sources: {
    title: 'Sources',
    proposal: 'Project proposal, Section X',
    regulation: 'EU Battery Regulation, Article 7 and Annex II',
    guidance: 'European Commission passport resources',
    emissions: 'ETKB EVÇED emission factors',
    cop31: 'UNFCCC COP31',
  },
}
