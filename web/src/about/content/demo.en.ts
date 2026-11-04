import type { DemoCopy } from './types.ts'

export const demo: DemoCopy = {
  start: { title: 'Explore maintenance priorities in the demo', text: 'Explore fleet priorities, battery indicators and an illustrative passport record in the interactive demo. It is a concept demonstration of the proposed approach.' },
  guide: {
    title: 'Explore the demo in five steps', intro: 'Open the demo in a new tab, then follow this path.',
    steps: [
      { title: 'Review the fleet and its priorities', text: 'Look for Technical review, Data review and Monitor in the maintenance priority list. Select a battery; on a phone, its Battery details view opens.' },
      { title: 'Choose a scenario', text: 'Select an example such as Temperature drift from the scenario menu. The demo opens the relevant battery on day 14; use the day control to explore earlier days.' },
      { title: 'Read the reason and comparison', text: 'Review Why and Recommendation. Compare with no-event baseline shows the same battery without the injected event. Qualified technical staff make the final maintenance decision.' },
      { title: 'Open History and Telemetry', text: 'History shows changes over days; Telemetry shows readings for an example day. In the data-loss scenario, missing readings remain gaps in the charts, rather than healthy values or zeros.' },
      { title: 'Explore the passport and guided demo', text: 'Open Passport for synthetic identity, simulated health, an event log and illustrative charging emissions. Guided demo starts the existing eight-step interactive walkthrough.' },
    ],
    note: 'On a phone, Back to fleet preserves your search and filters. Reset restores the initial view and clears demo feedback stored only in this browser.',
  },
  gallery: {
    title: 'Three views from the demo', intro: 'Open an image in a new tab to see it at full size. Screenshots match the language of this page.',
    enlarge: 'Enlarge screenshot', synthetic: 'Synthetic demo screenshot — not actual fleet data or the final interface.', source: 'Source: the project team’s locally running demo · 4 November 2026.',
    items: {
      fleet: { title: '01 / Fleet and maintenance priorities', text: 'Normal fleet scenario, day 14. The list brings battery identity, simulated health and the reason for review together. All figures belong to the synthetic dataset.', alt: 'English demo: fleet counters, maintenance priority list and indicators for selected battery BT-10087.' },
      telemetry: { title: '02 / One battery and its telemetry', text: 'Temperature drift scenario, DEMO-001, day 14. Telemetry compares the scenario with its no-event baseline. Thresholds are illustrative, not field validation.', alt: 'English demo: DEMO-001 temperature drift indicators and telemetry charts compared with a no-event baseline.' },
      passport: { title: '03 / Digital Battery Passport', text: 'Identity, a health summary and the event log for the same synthetic battery. Operational carbon uses demo assumptions; it is not the official battery carbon footprint.', alt: 'English demo passport: synthetic identity, health, DEMO-001 event log and illustrative operational carbon fields.' },
    },
  },
  materials: {
    title: 'Presentation materials', presentation: 'Presentation PDF', video: 'Introduction video', pending: 'In preparation',
    presentationNote: 'View and download links will appear here when the presentation file is supplied.', videoNote: 'The video will be available to watch here when it is ready.',
    view: 'View PDF', download: 'Download PDF', videoLabel: 'BinBin Battery Intelligence introduction video', captions: 'English captions', videoFallback: 'Open the video file',
  },
  related: { project: 'Explore the project details', carbon: 'Carbon approach & limitations' },
}
