import { PROJECT_NAME } from '../../site.ts'
import type { DemoCopy } from './types.ts'

export const demo: DemoCopy = {
  start: {
    title: 'Demo',
    text: 'Maintenance priorities, battery indicators and a sample passport record on one screen. The demo opens in a new tab.',
  },
  guide: {
    title: 'How to use it',
    steps: [
      { title: 'Review the fleet', text: 'The maintenance priority list shows the Technical review, Data review and Monitor states. Selecting a battery opens its details.' },
      { title: 'Choose a scenario', text: 'Select Temperature drift from the scenario menu. The demo opens the affected battery’s record for day 14. Use the day selector to view earlier records.' },
      { title: 'Read the reason', text: 'The Why and Recommendation fields explain why the battery was flagged and what to check. The comparison shows the same battery without the simulated event.' },
      { title: 'Open history and telemetry', text: 'The History tab shows daily change and the Telemetry tab shows the measurements for the selected day. Missing readings stay as gaps in the chart.' },
      { title: 'Go to the passport', text: 'The Passport tab shows a sample battery identity, health summary, event log and charging emissions. Select Guided demo for an eight-step walkthrough.' },
    ],
  },
  gallery: {
    title: 'Screenshots',
    note: 'The screenshots are taken from the demo running on synthetic data.',
    enlarge: 'Enlarge',
    items: {
      fleet: {
        title: 'Fleet and maintenance priorities',
        text: 'Baseline fleet on day 14. The list shows the battery ID, health status and reason for review.',
        alt: 'English demo screen. Fleet counters, maintenance priority list and indicators for the selected battery BT-10087.',
      },
      telemetry: {
        title: 'Battery and telemetry',
        text: 'Temperature drift, DEMO-001, day 14. The scenario and the no-event baseline are compared in the same chart.',
        alt: 'English demo screen. DEMO-001 temperature drift indicators and telemetry charts compared with the no-event baseline.',
      },
      passport: {
        title: 'Digital Battery Passport',
        text: 'The same battery’s identity, health summary and event log. The carbon field uses demo assumptions.',
        alt: 'English demo passport. Synthetic identity, health, event log and sample operational carbon fields.',
      },
    },
  },
  materials: {
    title: 'Presentation and video', presentation: 'Presentation', video: 'Introduction video',
    view: 'Open the presentation', download: 'Download the presentation', videoLabel: `${PROJECT_NAME} introduction video`,
    captions: 'English captions', videoFallback: 'Open the video file',
  },
}
