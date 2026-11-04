import type { LocalizedText } from '../site.ts'

export type OrganizationId = 'foundation' | 'university' | 'binbin' | 'sustainBridge'

export interface OrganizationAsset {
  src?: string
  alt?: LocalizedText
  credit?: LocalizedText
  approved?: boolean
}

/** Add a supplied logo only with its publication approval and source credit. */
export const ORGANIZATION_ASSETS: Record<OrganizationId, OrganizationAsset> = {
  foundation: {}, university: {}, binbin: {}, sustainBridge: {},
}

export interface Manager {
  id: string
  name?: string
  role?: LocalizedText
  institution?: LocalizedText
  officialEmail?: string
  confirmed?: boolean
}

/** Brief p. 5: draft names only. No titles or contact details have been confirmed. */
export const MANAGERS: readonly Manager[] = [
  { id: 'orhan-aydin', name: 'Orhan Aydın' },
  { id: 'murat-yulek', name: 'Murat Yülek' },
  { id: 'hasan-erbay', name: 'Hasan Erbay' },
  { id: 'serdar-muldur', name: 'Serdar Müldür' },
  { id: 'research-projects' },
]

export interface Collaboration {
  id: 'binbin' | 'sustainBridge'
  name: string
  legalName?: string
  status: 'proposed' | 'pending' | 'confirmed'
  proposal?: LocalizedText
  approvedScope?: LocalizedText
  contribution?: LocalizedText
  officialWebsite?: string
}

/** Brief p. 10 and proposal XI. Proposed access is not an existing agreement. */
export const COLLABORATIONS: readonly Collaboration[] = [
  {
    id: 'binbin', name: 'BinBin',
    legalName: 'Bin Ulaşım ve Akıllı Şehir Teknolojileri A.Ş.',
    status: 'proposed',
    proposal: {
      tr: 'BinBin’e sunulan teklif; mevcut Batarya Yönetim Sistemi (BMS), Nesnelerin İnterneti (IoT), bakım ve veri altyapısının incelenmesini, pilot saha çalışmasının planlanmasını ve her aşamanın birlikte değerlendirilmesini önerir.',
      en: 'The proposal submitted to BinBin suggests reviewing its existing Battery Management System (BMS), Internet of Things (IoT), maintenance and data infrastructure, planning a field pilot, and evaluating each stage together.',
    },
  },
  { id: 'sustainBridge', name: 'Sustain Bridge', status: 'pending' },
]
