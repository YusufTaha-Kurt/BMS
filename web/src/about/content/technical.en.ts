import type { CarbonCopy, ProjectCopy } from './types.ts'

export const project: ProjectCopy = {
  navigation: 'Project page sections',
  summary: {
    title: 'Understanding each battery through its history.',
    paragraphs: [
      'Shared vehicles can use different batteries over time. This project aims to bring each battery’s use, maintenance and health history into one record.',
      'The goal is to help maintenance teams see which battery to inspect first and use its history to make an informed decision. Verified records would also support assessment for future use and recycling.',
    ],
    stage: 'Proposal and pilot planning stage. The BinBin technical information form and data sharing are prerequisites for the initial data review. The existing demo is a synthetic-data concept demonstration.',
  },
  goals: {
    title: 'Objectives & audience',
    items: ['Track health and use history for each battery.', 'Assess unusual behaviour and fault indicators.', 'Provide explainable inspection priorities for maintenance teams.', 'Prepare a verified record infrastructure for a Digital Battery Passport.'],
    audienceTitle: 'Who is it for?', audience: 'The proposal primarily serves micromobility fleet operators and maintenance teams. Data sharing with manufacturers, service providers and recyclers would be assessed according to access rights.',
  },
  scenario: {
    title: 'An illustrative field scenario', note: 'This scenario describes the proposed use; it is not an observed field result.',
    steps: [
      { title: 'An unusual change', text: 'A battery shows a growing difference in cell voltages compared with batteries operating under similar conditions.' },
      { title: 'A priority for inspection', text: 'The system could flag the battery for technical review alongside its history and relevant indicators.' },
      { title: 'Expert assessment', text: 'Maintenance staff review voltage, temperature, fault and service history together. Any action is decided through the existing work order process.' },
    ],
  },
  flow: {
    title: 'Proposed system flow', safeguardsTitle: 'Operating principles',
    safeguards: ['Data access would be read-only.', 'Battery Management System (BMS) protection functions would remain unchanged.', 'Qualified technical staff would make the final maintenance decision.', 'Existing infrastructure comes first; additional hardware would be considered only for a verified data gap.'],
  },
  access: {
    title: 'Four priorities for data access', intro: 'The existing Internet of Things (IoT), BMS and cloud infrastructure would be reviewed before considering the following options in order.',
    options: [
      { title: 'Existing cloud records — first choice', text: 'Use read-only access when stored telemetry, maintenance and historical records are sufficient. Analysis is limited by the available archive.' },
      { title: 'Additional access through IoT', text: 'Consider extra fields or recording frequency when data exists on the device but is not sent to the cloud. Device capacity, software and communication load must be checked with BinBin.' },
      { title: 'A read-only gateway', text: 'Consider signals present on the communication bus but missing from IoT/cloud records. Protocol information and technical approval are needed; active queries are assessed separately from passive listening.' },
      { title: 'Extra measurement or sensors — last option', text: 'Consider a limited pilot when the required physical quantity is not measured by existing infrastructure. Installation and conformity conditions need separate assessment.' },
    ],
  },
  methods: {
    title: 'Planned analysis methods', intro: 'Simple, explainable baselines would be established first. Candidate models would be selected and assessed with pilot data. The current demo uses synthetic data and explainable rules; candidate models have not yet been validated with field data.',
    items: [
      { title: 'Anomaly detection', candidates: 'Statistical rules, Isolation Forest and, with sufficient data, autoencoders.', condition: 'Validation requires service records and expert review.' },
      { title: 'Early fault analysis', candidates: 'Logistic regression and gradient boosting compared with existing alarm rules.', condition: 'Event definitions, a prediction horizon and verified fault labels are required.' },
      { title: 'SOH — State of Health', candidates: 'Regression using charging-session features.', condition: 'Capacity references with a known measurement method are needed; BMS estimates are not independent ground truth.' },
      { title: 'Degradation', candidates: 'Health trends and estimated loss over a defined horizon.', condition: 'Repeated, comparable measurements of the same battery are needed.' },
      { title: 'RUL — Remaining Useful Life', candidates: 'Survival methods when sufficient long-term follow-up is available.', condition: 'Verified end-of-life and follow-up exit records are required. Data requirements would be reported when evidence is insufficient.' },
    ],
  },
  passport: {
    detailsTitle: 'Identity, access and lifecycle details',
    title: 'Digital Battery Passport', intro: 'Records would follow the individual battery identity, rather than the vehicle. Vehicle–battery matches would include timestamps; verified summaries and events would feed the passport instead of raw telemetry.',
    records: [
      { title: 'Battery model', text: 'Shared technical information such as manufacturer, chemistry, nominal capacity and voltage.' },
      { title: 'Individual battery', text: 'Serial number, use and maintenance history, health records and lifecycle status.' },
    ],
    identity: 'A unique battery identity and QR access are planned with the ISO/IEC 15459 series or equivalent requirements in view.',
    options: 'JSON-LD and W3C DID are technical options to assess, rather than mandatory regulatory solutions or features already completed in the demo.',
    accessTitle: 'Planned access groups',
    access: [
      { title: 'Public information', text: 'Passport fields suitable for general access.' },
      { title: 'Authorised bodies', text: 'Information for notified bodies, market surveillance authorities and the Commission.' },
      { title: 'Actors with a legitimate interest', text: 'Restricted information that may be shared under the applicable access rules.' },
    ],
    accessNote: 'The precise authorisation and data sharing scope would be established alongside current legislation and implementation rules.',
    lifecycleTitle: 'Lifecycle statuses',
    states: [
      { code: 'original', label: 'Original' }, { code: 're-used', label: 'Re-used' }, { code: 'repurposed', label: 'Repurposed' }, { code: 'remanufactured', label: 'Remanufactured' }, { code: 'waste', label: 'Waste' },
    ],
    lifecycleNote: 'These are not mandatory sequential steps for every battery. A change of status would be assessed using health, safety, maintenance history and the intended use.',
    healthNote: 'BMS estimates, model estimates and controlled capacity measurements would be recorded as separate sources, retaining dates, methods/versions and validation information.',
    guideNote: 'The proposal draws on the 71 data points brought together in the 2026 V2 guidance; not all fields have the same applicability to LMT batteries. Phase 0 would map available data and gaps against the current official guidance.',
  },
  pilot: {
    title: 'Proposed pilot timeline', intro: 'The periods are relative planning estimates from the proposal, not confirmed calendar dates. Progression depends on data sufficiency and joint assessment at each stage.', phase: 'Phase',
    stages: [
      { phase: 0, title: 'Data review', period: 'First month', text: 'Data inventory, battery identity matching and available data coverage.' },
      { phase: 1, title: 'Initial pilot', period: 'Months 1–3', text: 'Data flow, basic health/anomaly indicators and a passport prototype.' },
      { phase: 2, title: 'Models & carbon', period: 'Months 3–6', text: 'Health and fault models where data is sufficient, and operational emissions accounting.' },
      { phase: 3, title: 'Additional data decision', period: 'Months 6–7', text: 'Assess limited reference measurements or extra access if needed.' },
      { phase: 4, title: 'Field validation', period: 'Months 7–10', text: 'Maintenance decision support, QR/passport workflows and maintenance team feedback.' },
      { phase: 5, title: 'Scaling assessment', period: 'Months 10–12+', text: 'Consider gradual fleet integration if results are sufficient.' },
    ],
    informationTitle: 'Pilot information to be confirmed',
    fields: { startDate: 'Pilot start date', groupSize: 'Pilot group size', dataCoverage: 'Actual data coverage', validationResults: 'Pilot validation results' },
  },
  missing: 'Information not yet confirmed', related: { carbon: 'Carbon impact & limitations', demo: 'Demo & presentation' },
  sourcesTitle: 'Sources', proposalSource: 'BinBin Project Proposal: sections I–III, V–IX and XI. The descriptions present the proposal and pilot plan.',
  sourceLabels: { regulation: 'EU Batteries Regulation — 2023/1542', guidance: 'European Commission — current passport resources', faq: 'European Commission — access and implementation guidance' },
}

export const carbon: CarbonCopy = {
  notice: 'The effects described on this page are expected effects and estimates. Measured results will be shared after the pilot study.',
  expected: {
    title: 'Expected contributions', intro: 'The project aims to support the following decisions with data. No measured savings or emissions reductions are available yet.',
    items: [
      { title: 'Maintenance & service life', text: 'It could support assessments aimed at avoiding unnecessary early replacements and retaining batteries that have not reached the end of their technical life.' },
      { title: 'A traceable lifecycle', text: 'It could provide evidence for systematically reviewing retired fleet batteries for repair, reuse, a second application or recycling.' },
      { title: 'Operational monitoring', text: 'It could support records of charging-related energy consumption and emissions.' },
    ],
  },
  indicators: {
    title: 'Two separate carbon indicators',
    items: [
      { title: 'Official Battery Carbon Footprint', text: 'Battery Carbon Footprint under Regulation (EU) 2023/1542, Article 7 and Annex II covers raw materials, manufacturing, distribution and end-of-life stages. It requires manufacturer or supplier documentation tied to the model/manufacturing plant. Charging electricity during use is generally outside this boundary.' },
      { title: 'Charging-related operational emissions', text: 'A separate indicator for electricity drawn from the grid during fleet charging. It depends on measured energy and a suitable consumption-point emissions factor; it is not the official battery footprint.' },
    ],
    note: 'These indicators use different system boundaries. They should not be merged into a single total without a common boundary and method.',
  },
  method: {
    title: 'Proposed calculation method', formula: ['Operational emissions', 'Energy drawn from the grid', 'Electricity consumption-point emissions factor'],
    unitNote: 'With energy in kWh and a factor in kg CO₂e/kWh, the result is expressed in kg CO₂e. Actual energy measurements and a verified pilot factor have not yet been supplied.',
    factorNote: 'ETKB–EVÇED electricity consumption-point factors may be used as a reference for Türkiye. The selected pilot value, accounting year, connection type, source and version would be recorded together.',
    factorSource: 'Official ETKB–EVÇED factor reference',
  },
  limits: {
    title: 'Assumptions & limitations',
    items: ['The energy measurement point would be established in Phase 0; the boundary and any conversion/loss assumptions would be documented.', 'Annual national factors alone do not show the benefit of changing the time of charging. That requires a separate, verified dataset with time-resolved emissions factors.', 'Actual consumption, a comparison period and pilot results are needed before claiming specific savings, percentages or emissions reductions.', 'Synthetic energy records and illustrative factors in the demo are not actual BinBin measurements or an official battery footprint.'],
  },
  secondLife: { title: 'A second life is not an automatic decision.', text: 'A single SOH (State of Health) threshold is insufficient. Health, controlled capacity measurements, safety findings, maintenance history and the intended application must be considered together. This approach does not guarantee a sale, reuse or financial return.' },
  information: {
    title: 'Pilot measurements & source records', intro: 'These fields will be completed when actual measurements and approved sources are available.', missing: 'Measurement or source information not yet supplied',
    fields: { measurementPoint: 'Energy measurement point', measurementPeriod: 'Measurement period', gridEnergy: 'Energy drawn from the grid', factorValue: 'Selected emissions factor', factorYear: 'Factor accounting year', connectionType: 'Consumption-point connection type', factorSource: 'Selected factor source / version', operationalEmissions: 'Calculated operational emissions', measuredReduction: 'Measured emissions reduction', supplierDocuments: 'Manufacturer / supplier footprint documents' },
  },
  sourcesTitle: 'Sources', proposalSource: 'BinBin Project Proposal: section X and references [1], [2], [12], [13].',
  sourceLabels: { regulation: 'EU Batteries Regulation — Article 7 & Annex II', guidance: 'European Commission — Battery Passport resources', emissions: 'ETKB–EVÇED — consumption-point emissions factors', cop31: 'UNFCCC — COP31' },
  related: { project: 'Back to project details', demo: 'Demo & presentation' },
}
