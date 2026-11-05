import type { LocalizedText } from '../site.ts'
import universityLogo from './assets/logo-ostim-teknik.png'
import foundationLogo from './assets/logo-ostim-vakfi.png'
import foundationLogoDark from './assets/logo-ostim-vakfi-koyu.png'
import binbinLogo from './assets/logo-binbin.svg'
import binbinLogoDark from './assets/logo-binbin-koyu.svg'
import orhanAydinPhoto from './assets/people/orhan-aydin.jpg'
import muratYulekPhoto from './assets/people/murat-yulek.jpg'
import hasanErbayPhoto from './assets/people/hasan-erbay.jpg'
import serdarMuldurPhoto from './assets/people/serdar-muldur.jpg'

export type OrganizationId = 'foundation' | 'university' | 'binbin' | 'sustainBridge'

export interface OrganizationAsset {
  src?: string
  /** Koyu tema için ayrı logo. Yoksa açık logo açık bir zemin üzerinde gösterilir. */
  srcDark?: string
  alt?: LocalizedText
  credit?: LocalizedText
  approved?: boolean
}

/**
 * Logolar yalnız src doluysa gösterilir; boş kayıt için yer tutucu çizilmez.
 * Kaynaklar (5 Kasım 2026). Üniversite logosu COP31 broşür görselinden kırpıldı.
 * OSTİM Vakfı logoları ostimvakfi.com sitesinin kendi açık ve koyu logolarıdır.
 * BinBin logoları binbin.tech sitesinin kendi SVG dosyalarıdır. Sustain Bridge için resmî site bulunamadı.
 */
export const ORGANIZATION_ASSETS: Record<OrganizationId, OrganizationAsset> = {
  foundation: { src: foundationLogo, srcDark: foundationLogoDark, approved: true },
  university: { src: universityLogo, approved: true },
  binbin: { src: binbinLogo, srcDark: binbinLogoDark, approved: true },
  sustainBridge: {},
}

export interface Manager {
  id: string
  name?: string
  role?: LocalizedText
  institution?: LocalizedText
  officialEmail?: string
  confirmed?: boolean
  photo?: string
}

/**
 * Brief s. 5'teki isimler. Unvanlar kurumların kendi sayfalarından alındı (5 Kasım 2026).
 * Orhan Aydın, unvan ve fotoğraf ostimvakfi.com Başkandan Mesaj sayfası.
 * Murat Yülek ostimteknik.edu.tr/rektorluk, Hasan Erbay ostimteknik.edu.tr/rektor-yardmclar,
 * Serdar Müldür mf.ostimteknik.edu.tr/dekanin-mesaji sayfası (kullanıcının bildirdiği resmî adresler).
 * Murat Yülek, Hasan Erbay ve Serdar Müldür'ün fotoğrafları kullanıcı tarafından eşleştirilerek verildi.
 * Fotoğraflar yalnız kimliği doğrulanmış kaynaktan eklenir.
 */
export const MANAGERS: readonly Manager[] = [
  {
    id: 'orhan-aydin', name: 'Orhan Aydın', confirmed: true, photo: orhanAydinPhoto,
    role: { tr: 'Mütevelli Heyeti Başkanı', en: 'Chairman of the Board of Trustees' },
    institution: { tr: 'OSTİM Vakfı', en: 'OSTİM Foundation' },
  },
  {
    id: 'murat-yulek', name: 'Prof. Dr. Murat Yülek', confirmed: true, photo: muratYulekPhoto,
    role: { tr: 'Rektör', en: 'Rector' },
    institution: { tr: 'OSTİM Teknik Üniversitesi', en: 'OSTİM Technical University' },
  },
  {
    id: 'hasan-erbay', name: 'Prof. Dr. Hasan Erbay', confirmed: true, photo: hasanErbayPhoto,
    role: { tr: 'Rektör Yardımcısı', en: 'Vice Rector' },
    institution: { tr: 'OSTİM Teknik Üniversitesi', en: 'OSTİM Technical University' },
  },
  {
    id: 'serdar-muldur', name: 'Prof. Dr. Serdar Müldür', confirmed: true, photo: serdarMuldurPhoto,
    role: { tr: 'Mühendislik Fakültesi Dekanı', en: 'Dean of the Faculty of Engineering' },
    institution: { tr: 'OSTİM Teknik Üniversitesi', en: 'OSTİM Technical University' },
  },
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
