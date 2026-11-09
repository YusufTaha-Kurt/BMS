import { TEAM_NAME } from '../../siteIdentity.ts'
import type { PageId } from '../routes.ts'

export interface SiteCopy {
  homeLink: string
  navigation: string
  language: string
  openMenu: string
  closeMenu: string
  skip: string
  openDemo: string
  newTab: string
  demoNote: string
  universityLogo: string
  cop31Logo: string
  backHome: string
  footer: { team: string; updated: string; backTop: string }
  notFound: { title: string; description: string }
  pages: Record<PageId, { label: string; title: string; description: string }>
}

export const commonEn: SiteCopy = {
  homeLink: `${TEAM_NAME} home`,
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

export const commonTr: SiteCopy = {
  homeLink: `${TEAM_NAME} ana sayfa`,
  navigation: 'Ana gezinme',
  language: 'Dil',
  openMenu: 'Menüyü aç',
  closeMenu: 'Menüyü kapat',
  skip: 'İçeriğe geç',
  openDemo: 'Demoyu aç',
  newTab: 'yeni sekmede açılır',
  demoNote: 'Demo sentetik veriyle çalışır. Gerçek filo verisi ve nihai arayüz değildir.',
  universityLogo: 'OSTİM Teknik Üniversitesi',
  cop31Logo: 'COP31 Türkiye, Antalya',
  backHome: 'Ana sayfaya dön',
  footer: { team: 'OSTİM Teknik Üniversitesi proje ekibi', updated: 'Son güncelleme', backTop: 'Başa dön' },
  notFound: { title: 'Sayfa bulunamadı', description: 'Bu adres sitede yok.' },
  pages: {
    home: {
      label: 'Ana sayfa', title: 'Proje tanıtımı',
      description: 'Paylaşımlı mikromobilite bataryaları için sağlık takibi, bakım önceliği ve Dijital Batarya Pasaportu.',
    },
    institutions: {
      label: 'Kurumlar', title: 'Kurumlar',
      description: 'Proje OSTİM Teknik Üniversitesi bünyesinde yürütülür. Üniversite OSTİM Vakfı tarafından kurulmuştur.',
    },
    team: {
      label: 'Ekip', title: 'Proje ekibi',
      description: 'Bilgisayar ve elektrik-elektronik mühendisliği öğrencileri ile akademik koordinatör.',
    },
    project: {
      label: 'Proje', title: 'Proje',
      description: 'Sistemin çalışma biçimi, kullanılacak veriler ve pilot takvimi.',
    },
    demo: {
      label: 'Demo', title: 'Demo ve sunum',
      description: 'Sentetik veriyle çalışan demo ve kullanım adımları.',
    },
    carbon: {
      label: 'Karbon', title: 'Karbon etkisi',
      description: 'Beklenen etkiler ve hesaplama yöntemi. Ölçülmüş sonuç henüz yoktur.',
    },
    contact: {
      label: 'İş birliği', title: 'İş birliği',
      description: 'Projeyi destekleyen kuruluşlar ve iş birliği öneri formu.',
    },
    privacy: {
      label: 'Aydınlatma metni', title: 'Kişisel verilerin korunması aydınlatma metni',
      description: 'İş birliği önerisi formuyla gönderilen kişisel verilerin nasıl işlendiği.',
    },
  },
}
