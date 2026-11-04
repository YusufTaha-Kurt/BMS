import type { DemoCopy } from './types.ts'

export const demo: DemoCopy = {
  start: { title: 'Demoda bakım önceliklerini inceleyin', text: 'Filo önceliklerini, batarya göstergelerini ve örnek pasaport kaydını etkileşimli demoda inceleyin. Demo, önerilen yaklaşımı anlatan bir konsept gösterimidir.' },
  guide: {
    title: 'Beş adımda demoyu keşfedin', intro: 'Demoyu yeni sekmede açtıktan sonra aşağıdaki akışı izleyebilirsiniz.',
    steps: [
      { title: 'Filoyu ve öncelikleri inceleyin', text: 'Bakım öncelik listesinde Teknik inceleme, Veri incelemesi ve İzlemeye al durumlarını görün. Bir bataryayı seçin; telefonda Batarya ayrıntısı görünümü açılır.' },
      { title: 'Bir senaryo seçin', text: 'Senaryo menüsünden Sıcaklık sapması gibi bir örneği seçin. Demo ilgili bataryayı 14. günde açar; gün kontrolüyle önceki günleri de inceleyebilirsiniz.' },
      { title: 'Gerekçeyi ve karşılaştırmayı okuyun', text: 'Neden ve Öneri alanlarını inceleyin. Olaysız durumla karşılaştır seçeneği, aynı bataryanın olay eklenmemiş hâlini gösterir. Nihai bakım kararı teknik personeldedir.' },
      { title: 'Geçmiş ve telemetriyi açın', text: 'Geçmiş, günler içindeki değişimi; Telemetri, örnek günün ölçümlerini gösterir. Veri kaybı senaryosunda eksik ölçümler grafiklerde boş kalır; sağlıklı değer veya sıfır sayılmaz.' },
      { title: 'Pasaporta ve rehbere geçin', text: 'Pasaport sekmesinde sentetik kimlik, simüle sağlık, olay kaydı ve örnek şarj emisyonlarını inceleyin. Demo rehberi düğmesi, uygulama içindeki sekiz adımlı etkileşimli anlatımı açar.' },
    ],
    note: 'Telefonda Filoya dön düğmesi arama ve filtrelerinizi korur. Sıfırla, görünümü başlangıca döndürür ve yalnız bu tarayıcıdaki demo geri bildirimini temizler.',
  },
  gallery: {
    title: 'Demodan üç görünüm', intro: 'Ekran görüntülerini yeni sekmede açarak büyütebilirsiniz. Görseller bu sayfadaki dille eşleşir.',
    enlarge: 'Ekran görüntüsünü büyüt', synthetic: 'Sentetik demo görüntüsü — gerçek filo verisini veya nihai arayüzü göstermez.', source: 'Kaynak: proje ekibinin yerel çalışan demosu · 4 Kasım 2026.',
    items: {
      fleet: { title: '01 / Filo ve bakım öncelikleri', text: 'Normal filo senaryosu, 14. gün. Liste; batarya kimliğini, simüle sağlık durumunu ve inceleme gerekçesini birlikte gösterir. Ekrandaki sayılar yalnız sentetik veri setine aittir.', alt: 'Türkçe demo: filo sayaçları, bakım öncelik listesi ve seçili BT-10087 bataryasının göstergeleri.' },
      telemetry: { title: '02 / Tekil batarya ve telemetri', text: 'Sıcaklık sapması senaryosu, DEMO-001, 14. gün. Telemetri sekmesinde senaryo ve olaysız durum karşılaştırılır. Eşikler örnektir; saha doğrulaması değildir.', alt: 'Türkçe demo: DEMO-001 sıcaklık sapması için göstergeler ve olaysız durumla karşılaştırmalı telemetri grafikleri.' },
      passport: { title: '03 / Dijital Batarya Pasaportu', text: 'Aynı sentetik bataryanın kimliği, sağlık özeti ve olay kaydı. Operasyonel karbon alanı demo varsayımlarıyla hesaplanır; resmî batarya karbon ayak izi değildir.', alt: 'Türkçe demo pasaportu: sentetik kimlik, sağlık, DEMO-001 olay kaydı ve örnek operasyonel karbon alanları.' },
    },
  },
  materials: {
    title: 'Sunum materyalleri', presentation: 'Sunum PDF’i', video: 'Tanıtım videosu', pending: 'Hazırlanıyor',
    presentationNote: 'Sunum dosyası sağlandığında burada görüntüleme ve indirme bağlantıları yer alacak.', videoNote: 'Video hazır olduğunda bu alandan izlenebilecek.',
    view: 'PDF’i görüntüle', download: 'PDF’i indir', videoLabel: 'BinBin Battery Intelligence tanıtım videosu', captions: 'Türkçe altyazı', videoFallback: 'Videoyu dosya olarak aç',
  },
  related: { project: 'Proje detaylarını incele', carbon: 'Karbon yaklaşımı ve sınırlar' },
}
