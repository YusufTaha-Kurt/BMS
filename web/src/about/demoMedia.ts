import type { SiteLanguage } from '../site.ts'
import fleetEn from './assets/demo/fleet-en.jpg'
import fleetTr from './assets/demo/fleet-tr.jpg'
import telemetryEn from './assets/demo/telemetry-en.jpg'
import telemetryTr from './assets/demo/telemetry-tr.jpg'
import passportEn from './assets/demo/passport-en.jpg'
import passportTr from './assets/demo/passport-tr.jpg'

export type ScreenshotId = 'fleet' | 'telemetry' | 'passport'
export const DEMO_SCREENSHOTS: Record<SiteLanguage, Record<ScreenshotId, string>> = {
  en: { fleet: fleetEn, telemetry: telemetryEn, passport: passportEn },
  tr: { fleet: fleetTr, telemetry: telemetryTr, passport: passportTr },
}

interface DemoMedia {
  presentation?: { url: string; fileName: string }
  video?: { url: string; type: 'video/mp4' | 'video/webm'; captions: string; poster?: string }
}

/** Add supplied, approved files per language. No file means a preparation card, never a dead link. */
export const DEMO_MEDIA: Partial<Record<SiteLanguage, DemoMedia>> = {}
