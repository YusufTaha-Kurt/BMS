import { PROJECT_NAME } from '../../site.ts'
import type { DemoCopy } from './types.ts'

export const demo: DemoCopy = {
  start: {
    title: 'Demo',
    text: 'Bakım öncelikleri, batarya göstergeleri ve örnek pasaport kaydı tek ekranda gösterilir. Demo yeni sekmede açılır.',
  },
  guide: {
    title: 'Kullanım adımları',
    steps: [
      { title: 'Filoyu inceleyiniz', text: 'Bakım öncelik listesinde Teknik inceleme, Veri incelemesi ve İzlemeye al durumları yer alır. Bir batarya seçildiğinde ayrıntısı açılır.' },
      { title: 'Senaryo seçiniz', text: 'Senaryo menüsünden Sıcaklık sapması senaryosunu seçiniz. Demo, ilgili bataryanın 14. güne ait kaydını açar. Önceki kayıtları görmek için gün seçiciyi kullanınız.' },
      { title: 'Gerekçeyi okuyunuz', text: 'Neden ve Öneri alanları kararın dayanağını gösterir. Olaysız durumla karşılaştırma aynı bataryanın olay eklenmemiş hâlini gösterir.' },
      { title: 'Geçmişi ve telemetriyi açınız', text: 'Geçmiş sekmesi günlük değişimi, Telemetri sekmesi seçilen günün ölçümlerini gösterir. Eksik ölçümler grafikte boş kalır.' },
      { title: 'Pasaporta geçiniz', text: 'Pasaport sekmesinde sentetik kimlik, sağlık özeti, olay kaydı ve örnek şarj emisyonu yer alır. Demo rehberi düğmesi sekiz adımlık anlatımı açar.' },
    ],
  },
  gallery: {
    title: 'Ekran görüntüleri',
    note: 'Görüntüler sentetik veriyle çalışan demodan alınmıştır.',
    enlarge: 'Büyüt',
    items: {
      fleet: {
        title: 'Filo ve bakım öncelikleri',
        text: 'Referans filo, 14. gün. Liste batarya kimliğini, sağlık durumunu ve inceleme gerekçesini gösterir.',
        alt: 'Türkçe demo ekranı. Filo sayaçları, bakım öncelik listesi ve seçili BT-10087 bataryasının göstergeleri.',
      },
      telemetry: {
        title: 'Batarya ve telemetri',
        text: 'Sıcaklık sapması, DEMO-001, 14. gün. Senaryo ve olaysız durum aynı grafikte karşılaştırılır.',
        alt: 'Türkçe demo ekranı. DEMO-001 sıcaklık sapması göstergeleri ve olaysız durumla karşılaştırmalı telemetri grafikleri.',
      },
      passport: {
        title: 'Dijital Batarya Pasaportu',
        text: 'Aynı bataryanın kimliği, sağlık özeti ve olay kaydı. Karbon alanı demo varsayımlarıyla hesaplanır.',
        alt: 'Türkçe demo pasaportu. Sentetik kimlik, sağlık, olay kaydı ve örnek operasyonel karbon alanları.',
      },
    },
  },
  materials: {
    title: 'Sunum ve video', presentation: 'Sunum', video: 'Tanıtım videosu',
    view: 'Sunumu aç', download: 'Sunumu indir', videoLabel: `${PROJECT_NAME} tanıtım videosu`,
    captions: 'Türkçe altyazı', videoFallback: 'Videoyu dosya olarak aç',
  },
}
