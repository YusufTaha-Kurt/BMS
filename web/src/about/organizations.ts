import type { LocalizedText } from '../site.ts'
import universityLogo from './assets/logo-ostim-teknik.png'

export type OrganizationId = 'foundation' | 'university' | 'binbin' | 'sustainBridge'

export interface OrganizationAsset {
  src?: string
  alt?: LocalizedText
  credit?: LocalizedText
  approved?: boolean
}

/**
 * Logolar yalnız src doluysa gösterilir; boş kayıt için yer tutucu çizilmez.
 * Üniversite logosu COP31 broşüründeki OSTİM Teknik Üniversitesi ve COP31 görselinden kırpıldı.
 * Diğer kurumların logo dosyası henüz yok.
 */
export const ORGANIZATION_ASSETS: Record<OrganizationId, OrganizationAsset> = {
  foundation: {},
  university: { src: universityLogo, approved: true },
  binbin: {},
  sustainBridge: {},
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
      tr: 'Teklif, BinBin’in mevcut BMS, IoT, bakım ve veri altyapısının incelenmesini ve bir saha pilotunun birlikte planlanmasını önerir. Her aşamanın sonucu iki taraf birlikte değerlendirir.',
      en: 'The proposal suggests reviewing BinBin’s existing BMS, IoT, maintenance and data infrastructure and planning a field pilot together. Both sides review the outcome of each stage.',
    },
  },
  { id: 'sustainBridge', name: 'Sustain Bridge', status: 'pending' },
]
