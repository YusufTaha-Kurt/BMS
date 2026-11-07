// Ekip CV'leri. Kaynak, kişilerin kullanıcı tarafından paylaşılan CV dosyaları (6 Kasım 2026).
// Telefon numarası ve kişisel e-posta bilerek eklenmez. Bağlantılar web/src/site.ts içindedir.
import type { LocalizedText } from '../site.ts'

export type CvSectionId = 'education' | 'publications' | 'experience' | 'projects' | 'certificates' | 'skills' | 'languages' | 'seminars'

export interface CvItem {
  title: LocalizedText
  detail?: LocalizedText
  date?: LocalizedText
  points?: LocalizedText[]
}

export interface MemberCv {
  headline: LocalizedText
  sections: { id: CvSectionId; items: CvItem[] }[]
}

const t = (tr: string, en: string): LocalizedText => ({ tr, en })

const COMPUTER_ENGINEERING = t('Bilgisayar Mühendisliği öğrencisi', 'Computer Engineering student')

export const TEAM_CV: Record<string, MemberCv> = {
  coordinator: {
    headline: t('Araştırma Görevlisi, OSTİM Teknik Üniversitesi', 'Research Assistant, OSTİM Technical University'),
    sections: [
      {
        id: 'education',
        items: [
          { title: t('Gazi Üniversitesi', 'Gazi University'), detail: t('Elektrik-Elektronik Mühendisliği doktora programı', 'PhD in Electrical-Electronics Engineering'), date: t('2026’dan bu yana', 'Since 2026') },
          { title: t('Ankara Yıldırım Beyazıt Üniversitesi', 'Ankara Yıldırım Beyazıt University'), detail: t('Elektrik-Elektronik Mühendisliği yüksek lisans', 'M.Sc. in Electrical-Electronics Engineering'), date: t('2023 ile 2026', '2023 to 2026') },
          { title: t('TED Üniversitesi', 'TED University'), detail: t('Elektrik-Elektronik Mühendisliği lisans', 'B.Sc. in Electrical-Electronics Engineering'), date: t('2017 ile 2022', '2017 to 2022') },
          { title: t('TED Üniversitesi', 'TED University'), detail: t('İşletme ek anadal', 'Minor in Business Administration'), date: t('2018 ile 2021', '2018 to 2021') },
        ],
      },
      {
        id: 'publications',
        items: [
          {
            title: t('A Multi-Stage Pipeline Combining Latent Representations and Distance-Based Scores for IUI Treatment', 'A Multi-Stage Pipeline Combining Latent Representations and Distance-Based Scores for IUI Treatment'),
            detail: t('Uludağ, B. T., Karal, Ö., Değirmenci, A., Karaer, A. ve Tuncay, G. Journal of Big Data, Springer Nature. Editör değerlendirmesinde. Sorumlu yazar.', 'Uludağ, B. T., Karal, Ö., Değirmenci, A., Karaer, A. and Tuncay, G. Journal of Big Data, Springer Nature. Under editorial evaluation. Corresponding author.'),
            date: t('2026', '2026'),
          },
          {
            title: t('Machine Learning-Based Prediction of Clinical Pregnancy Outcomes in Intrauterine Insemination Using Data from Turkey', 'Machine Learning-Based Prediction of Clinical Pregnancy Outcomes in Intrauterine Insemination Using Data from Turkey'),
            detail: t('Konferans bildirisi. 3rd International Europe Scientific Research and Innovation Congress, cilt 1, sayı 1, sayfa 67 ile 75.', 'Conference paper. 3rd International Europe Scientific Research and Innovation Congress, vol. 1, no. 1, pp. 67 to 75.'),
            date: t('30 Kasım 2025', '30 November 2025'),
          },
        ],
      },
      {
        id: 'experience',
        items: [
          {
            title: t('OSTİM Teknik Üniversitesi, Bilgisayar Mühendisliği Bölümü', 'OSTİM Technical University, Department of Computer Engineering'),
            detail: t('Araştırma görevlisi, tam zamanlı', 'Research assistant, full time'), date: t('Kasım 2023’ten bu yana', 'Since November 2023'),
            points: [
              t('Bilgisayar, Elektrik-Elektronik ve Yazılım Mühendisliği öğrencilerine C, C++ ve C# programlama derslerini teorik ve laboratuvar olarak veriyor.', 'Teaches C, C++ and C# programming, both lectures and labs, to computer, electrical-electronics and software engineering students.'),
              t('Mühendislik öğrencilerinin mekanik ve elektrik ağırlıklı fizik laboratuvarlarını yürütüyor.', 'Runs mechanics and electricity physics labs for engineering students.'),
              t('Bölümün müfredat tasarımı ve akreditasyon süreçlerini planlıyor ve yürütüyor.', 'Plans and runs curriculum design and accreditation for the department.'),
              t('Yan dal, çift anadal, yatay ve dikey geçiş başvurularını ve Erasmus ders eşleştirme ile muafiyet işlemlerini yürütüyor.', 'Handles minor, double major and transfer applications and Erasmus course matching and exemptions.'),
              t('Öğrenci stajlarında firma eşleştirme, süreç takibi, değerlendirme ve geri bildirimi yönetiyor.', 'Manages company matching, follow-up, assessment and feedback for student internships.'),
              t('Yapay zekâ, derin öğrenme, biyomedikal sinyal işleme, mobil uygulamalar ve web sistemleri alanlarında 10 lisans bitirme projesine danışmanlık yapıyor.', 'Advises 10 undergraduate capstone projects in AI, deep learning, biomedical signal processing, mobile apps and web systems.'),
              t('Danışmanlığını yürüttüğü iki TÜBİTAK 2209-A projesi desteklenmeye uygun görüldü.', 'Two TÜBİTAK 2209-A projects he advises were approved for funding.'),
            ],
          },
          {
            title: t('Europower Enerji', 'Europower Enerji'), detail: t('Elektrik tasarım mühendisi, tam zamanlı', 'Electrical design engineer, full time'), date: t('Haziran ile Eylül 2023', 'June to September 2023'),
            points: [
              t('Güç ve dağıtım trafolarının elektriksel tasarımını yaptı, Nanocad ile mekanik çizimlerini hazırlayıp imalatı takip etti.', 'Designed power and distribution transformers, prepared their mechanical drawings in Nanocad and followed manufacturing.'),
              t('Düşük frekanslı elektromanyetik makineleri sonlu elemanlar yöntemiyle analiz ederek tasarımı geliştirdi ve imalata aktardı.', 'Improved low-frequency electromagnetic machine designs using finite element analysis and passed them to manufacturing.'),
            ],
          },
          {
            title: t('Astor Enerji', 'Astor Enerji'), detail: t('Elektrik tasarım mühendisi, tam zamanlı', 'Electrical design engineer, full time'), date: t('Haziran ile Eylül 2022', 'June to September 2022'),
            points: [
              t('Güç trafolarının elektriksel tasarımını yaptı, mekanik çizimleri Nanocad ile hazırlayıp maliyet analiziyle birlikte ilgili birime aktardı.', 'Designed power transformers and passed Nanocad mechanical drawings with cost analysis to the relevant unit.'),
              t('Elektromanyetik ve devre teorisi uygulamaları, sonlu elemanlar analizi, proje ve teklif yönetimi konularında deneyim kazandı.', 'Gained experience in electromagnetics and circuit theory, finite element analysis and project and bid management.'),
            ],
          },
          {
            title: t('Kolin İnşaat, SU Bilgi Teknolojileri', 'Kolin İnşaat, SU Bilgi Teknolojileri'), detail: t('Stajyer', 'Intern'), date: t('Haziran ile Ağustos 2020', 'June to August 2020'),
            points: [t('Doğalgaz istasyonlarının otomasyon yazılımlarının incelenmesi ve geliştirilmesinde ekibe destek verdi.', 'Supported the team in reviewing and developing automation software for natural gas stations.')],
          },
          {
            title: t('ATEL', 'ATEL'), detail: t('Stajyer', 'Intern'), date: t('Haziran ile Ağustos 2019', 'June to August 2019'),
            points: [t('Gömülü sistem yazılımı ve kart tasarımı süreçlerinde tespit edilen hataların ilgili birimlere iletilmesinde ekibe destek verdi.', 'Supported the team in reporting defects found in embedded software and board design to the relevant units.')],
          },
        ],
      },
      {
        id: 'projects',
        items: [
          {
            title: t('COP31 Türkiye üniversite proje bildirimi, AI-Driven Circular Battery Management System for Sustainable Electric Micromobility', 'COP31 Türkiye university project, AI-Driven Circular Battery Management System for Sustainable Electric Micromobility'),
            detail: t('Proje sorumlusu. OSTİM Teknik Üniversitesi tarafından YÖK’e bildirilen araştırma, teknoloji geliştirme ve girişimcilik projesi.', 'Project lead. A research, technology development and entrepreneurship project reported to the Council of Higher Education by OSTİM Technical University.'),
            date: t('2026', '2026'),
            points: [
              t('Yapay zekâ tabanlı SOH, kalan ömür, batarya bozunması ve arıza tahmini yaklaşımları üzerinde çalışıyor.', 'Works on AI-based SOH, remaining useful life, degradation and fault prediction approaches.'),
              t('Dijital Batarya Pasaportu ve karbon pasaportu altyapısına katkı veriyor.', 'Contributes to the Digital Battery Passport and carbon passport infrastructure.'),
              t('Batarya ömrünü uzatmak ve ikinci kullanım enerji depolama uygulamaları için şarj, bakım ve filo yönetimi stratejileri planlıyor.', 'Plans charging, maintenance and fleet strategies to extend battery life and support second-life energy storage.'),
            ],
          },
          {
            title: t('5G ve Yapay Zekâ ile Akıllı Yol Güvenliği, TEGİP destekli Ar-Ge projesi', 'Smart Road Safety with 5G and AI, TEGİP-funded R&D project'),
            detail: t('Proje koordinasyonu. 5G haberleşme ve yapay zekâ ile gerçek zamanlı akıllı yol güvenliği sistemi.', 'Project coordination. A real-time smart road safety system using 5G communication and AI.'),
            date: t('Eylül 2026’dan bu yana', 'Since September 2026'),
            points: [
              t('Çok disiplinli ekibin görev dağılımını, geliştirme takvimini ve entegrasyon süreçlerini koordine ediyor.', 'Coordinates task allocation, schedule and integration for a multidisciplinary team.'),
              t('Yapay zekâ, optimizasyon, backend ve frontend bileşenlerinin ortak mimaride birleşmesini yönetiyor.', 'Manages the integration of AI, optimisation, backend and frontend components in a shared architecture.'),
              t('Gerçek zamanlı veri işleme ve karar destek prototiplerini takip ediyor, projenin endüstriye ve teknoloji yarışmalarına taşınmasını planlıyor.', 'Follows real-time data processing and decision support prototypes and plans taking the project to industry and technology competitions.'),
            ],
          },
          {
            title: t('TÜBİTAK 2209-A Üniversite Öğrencileri Araştırma Projeleri', 'TÜBİTAK 2209-A Undergraduate Research Projects'),
            detail: t('Akademik danışman. Danışmanlığını yaptığı iki proje desteklenmeye uygun görüldü.', 'Academic advisor. Two projects he advised were approved for funding.'),
            date: t('2025', '2025'),
            points: [
              t('Bulut tabanlı ortak medya paylaşım platformu ve mobil uygulama entegrasyonu. React Native, .NET Core Web API, Supabase ve S3 mimarisine danışmanlık verdi.', 'Cloud-based shared media platform with mobile integration. Advised on a React Native, .NET Core Web API, Supabase and S3 architecture.'),
              t('Çok kipli EKG, EEG ve EMG biyosinyallerinin makine öğrenmesiyle analizi. Ön işleme, özellik çıkarımı ve Random Forest, SVM ve MLP karşılaştırmasına yönelik yöntemi geliştirdi.', 'Machine learning analysis of multimodal ECG, EEG and EMG biosignals. Shaped the method for preprocessing, feature extraction and comparing Random Forest, SVM and MLP.'),
            ],
          },
          {
            title: t('Sosyal medyadaki fikir dinamiğinin diferansiyel oyun olarak modellenmesi ve trollerin otomatik tespiti', 'Modelling opinion dynamics on social media as a differential game and detecting trolls automatically'),
            detail: t('TED Üniversitesi, gönüllü araştırmacı', 'TED University, volunteer researcher'), date: t('Temmuz 2021 ile Şubat 2022', 'July 2021 to February 2022'),
            points: [t('Fikir dinamiği ve sosyal ağ analizi literatürünü taradı, diferansiyel oyun modellerini inceleyip bulguları raporladı.', 'Reviewed literature on opinion dynamics and social network analysis, studied differential game models and reported the findings.')],
          },
        ],
      },
      {
        id: 'seminars',
        items: [
          {
            title: t('Türkiye Yüzyılı İHA Festivali ve Millî Teknoloji ve Havacılık Eğitim Programı, Beypazarı', 'Türkiye Century UAV Festival and National Technology and Aviation Training Programme, Beypazarı'),
            detail: t('Düzenleyici ve eğitici. OSTİM Teknik Üniversitesi öğrencilerinin İHA ve model uçak tasarımı, üretimi ve uçuşu üzerine uygulamalı eğitimi.', 'Organiser and trainer. Hands-on training for OSTİM Technical University students in UAV and model aircraft design, production and flight.'),
            date: t('15 ile 18 Haziran 2026', '15 to 18 June 2026'),
          },
        ],
      },
      {
        id: 'skills',
        items: [
          { title: t('Programlama dilleri', 'Programming languages'), detail: t('Java, Python, C, C++, C#', 'Java, Python, C, C++, C#') },
          { title: t('Ofis yazılımları', 'Office software'), detail: t('Word, Excel, PowerPoint', 'Word, Excel, PowerPoint') },
        ],
      },
      {
        id: 'languages',
        items: [
          { title: t('İngilizce', 'English'), detail: t('İleri düzey', 'Advanced') },
          { title: t('Almanca', 'German'), detail: t('Orta düzey', 'Intermediate') },
        ],
      },
    ],
  },

  gizem: {
    headline: t('Elektrik-Elektronik ve Bilgisayar Mühendisliği öğrencisi', 'Electrical-Electronics and Computer Engineering student'),
    sections: [
      {
        id: 'education',
        items: [
          {
            title: t('OSTİM Teknik Üniversitesi', 'OSTİM Technical University'),
            detail: t('Elektrik-Elektronik Mühendisliği, 3. sınıf, ve Bilgisayar Mühendisliği çift anadal', 'Electrical-Electronics Engineering, third year, with a double major in Computer Engineering'),
            date: t('2024 ile 2028', '2024 to 2028'),
            points: [
              t('Elektrik-Elektronik Mühendisliği not ortalaması 3,83 / 4,00', 'Electrical-Electronics Engineering GPA 3.83 / 4.00'),
              t('Bilgisayar Mühendisliği not ortalaması 3,57 / 4,00', 'Computer Engineering GPA 3.57 / 4.00'),
            ],
          },
          { title: t('Tekirdağ Anadolu Lisesi', 'Tekirdağ Anatolian High School'), date: t('2019 ile 2022', '2019 to 2022') },
        ],
      },
      {
        id: 'projects',
        items: [
          {
            title: t('COP31 projesi, AI-Driven Circular Battery Management System for Sustainable Electric Micromobility', 'COP31 project, AI-Driven Circular Battery Management System for Sustainable Electric Micromobility'),
            points: [t('Araştırma, raporlama, makine öğrenmesi ve batarya zekâsı alanlarında görev aldı. Proje YÖK tarafından kabul edildi.', 'Worked on research, reporting, machine learning and battery intelligence. The project was accepted by the Council of Higher Education (YÖK).')],
          },
        ],
      },
      {
        id: 'experience',
        items: [
          {
            title: t('Mavinci', 'Mavinci'), detail: t('Stajyer', 'Intern'), date: t('Ağustos ile Eylül 2026', 'August to September 2026'),
            points: [
              t('Makine öğrenmesi ve veri odaklı projeler için veri etiketleme ve düzenleme çalışmaları yaptı.', 'Labelled and organised data for machine learning and data-driven projects.'),
              t('Veri setlerinin doğruluğunu ve tutarlılığını kontrol ederek veri kalitesi süreçlerine katkı verdi.', 'Contributed to data quality by checking the accuracy and consistency of datasets.'),
            ],
          },
          {
            title: t('Linkas Teknoloji', 'Linkas Teknoloji'), detail: t('Stajyer', 'Intern'), date: t('Haziran ile Temmuz 2026', 'June to July 2026'),
            points: [
              t('Gömülü sistemler ve elektronik kontrol sistemleri geliştirme süreçlerinde gözlem ve analiz çalışmaları yaptı, yazılım geliştirme ve Ar-Ge çalışmalarına destek verdi.', 'Observed and analysed embedded and electronic control system development and supported software development and R&D.'),
              t('Ekip içinde teknik görevler üstlenerek problem çözme, sistem analizi ve proje yönetimi deneyimi kazandı.', 'Took on technical tasks in the team and gained problem solving, systems analysis and project management experience.'),
            ],
          },
          {
            title: t('Gayda Enerji', 'Gayda Enerji'), detail: t('Stajyer', 'Intern'), date: t('Haziran ile Temmuz 2026', 'June to July 2026'),
            points: [t('Elektrik ekipmanlarının çalışma prensiplerini gözlemleyerek uygulamalı saha ve teknik deneyim kazandı.', 'Gained hands-on field and technical experience by observing how electrical equipment works.')],
          },
          {
            title: t('Bozankaya', 'Bozankaya'), detail: t('Stajyer', 'Intern'), date: t('Haziran 2026', 'June 2026'),
            points: [
              t('Raylı sistem ve elektrikli araç projelerinde yüksek ve alçak gerilim sistemlerinin üretim ve test aşamalarını yerinde gözlemledi.', 'Observed the production and testing of high and low voltage systems in rail and electric vehicle projects on site.'),
              t('Elektrik-elektronik bileşenlerin montajında ve temel testlerde teknik ekibe destek verdi, teknik şemaları ve devre mimarilerini inceledi.', 'Supported the technical team in assembling and testing electrical-electronic components and studied technical drawings and circuit architectures.'),
            ],
          },
          {
            title: t('Cisco Networking Academy', 'Cisco Networking Academy'), detail: t('Stajyer', 'Intern'), date: t('Ocak 2026', 'January 2026'),
            points: [
              t('C ile temel algoritmalar ve veri yapıları üzerinde uygulamalı çalıştı.', 'Worked hands-on with basic algorithms and data structures in C.'),
              t('Hata ayıklama ve performans iyileştirme süreçlerinde yer aldı.', 'Took part in debugging and performance improvement.'),
            ],
          },
        ],
      },
      {
        id: 'skills',
        items: [
          { title: t('Yazılım dilleri', 'Programming languages'), detail: t('C, C#, SQL', 'C, C#, SQL') },
          { title: t('Tasarım araçları', 'Design tools'), detail: t('AutoCAD, Proteus, KiCad, CircuitJS', 'AutoCAD, Proteus, KiCad, CircuitJS') },
          { title: t('Yetkinlikler', 'Competencies'), detail: t('Analitik düşünme, disiplinli ve planlı çalışma, takım çalışması, problem çözme', 'Analytical thinking, disciplined and planned work, teamwork, problem solving') },
        ],
      },
      {
        id: 'languages',
        items: [
          { title: t('Türkçe', 'Turkish'), detail: t('Ana dil', 'Native') },
          { title: t('İngilizce', 'English'), detail: t('Orta seviye', 'Intermediate') },
        ],
      },
      {
        id: 'certificates',
        items: [
          { title: t('Savunma Sanayiinde Proje Yönetimi', 'Project Management in the Defence Industry'), detail: t('BTK Akademi', 'BTK Academy') },
          { title: t('Savunma Sanayii Başkanlığı ve Türk Savunma Sanayii Ekosistemi', 'Presidency of Defence Industries and the Turkish Defence Ecosystem'), detail: t('BTK Akademi', 'BTK Academy') },
          { title: t('İletişim ve Network Yönetimi', 'Communication and Network Management'), detail: t('BTK Akademi', 'BTK Academy') },
          { title: t('C# Object Oriented Programming for Beginners in C# and .NET', 'C# Object Oriented Programming for Beginners in C# and .NET'), detail: t('Coursera', 'Coursera') },
          { title: t('AutoCAD Sertifikası, 716 dakika', 'AutoCAD Certificate, 716 minutes'), detail: t('İstanbul Üniversitesi', 'Istanbul University') },
        ],
      },
      {
        id: 'seminars',
        items: [
          { title: t('Millî Yetkinlik Hamlesi Kapsül Programı', 'National Competency Initiative Capsule Programme') },
          { title: t('Genç Beyinler Yeni Fikirler 2025 Sergisi', 'Young Minds New Ideas 2025 Exhibition'), detail: t('Başkent Üniversitesi', 'Başkent University') },
          { title: t('5G ile Endüstrinin Dönüşümü, Yeni Nesil Bağlantı Altyapıları ve Akıllı Fabrikalar', 'Transforming Industry with 5G, Next-Generation Connectivity and Smart Factories'), detail: t('ELES EXPO', 'ELES EXPO') },
          { title: t('Dijital Çağın İnşasında Veri Merkezi Ekosistemi', 'The Data Centre Ecosystem in Building the Digital Age'), detail: t('ELES EXPO', 'ELES EXPO') },
        ],
      },
    ],
  },

  gamze: {
    headline: t('Elektrik-Elektronik ve Yapay Zekâ Mühendisliği öğrencisi', 'Electrical-Electronics and AI Engineering student'),
    sections: [
      {
        id: 'education',
        items: [
          { title: t('OSTİM Teknik Üniversitesi', 'OSTİM Technical University'), detail: t('Elektrik-Elektronik Mühendisliği lisans, 3. sınıf, not ortalaması 3,83 / 4,00', 'B.Sc. in Electrical-Electronics Engineering, third year, GPA 3.83 / 4.00'), date: t('2024 ile 2028', '2024 to 2028') },
          { title: t('OSTİM Teknik Üniversitesi', 'OSTİM Technical University'), detail: t('Yapay Zekâ Mühendisliği çift anadal, not ortalaması 3,61 / 4,00', 'Double major in Artificial Intelligence Engineering, GPA 3.61 / 4.00'), date: t('2024 ile 2028', '2024 to 2028') },
          { title: t('Tekirdağ Anadolu Lisesi', 'Tekirdağ Anatolian High School'), date: t('2019 ile 2022', '2019 to 2022') },
        ],
      },
      {
        id: 'experience',
        items: [
          { title: t('Linkas Teknoloji', 'Linkas Teknoloji'), date: t('Haziran ile Temmuz 2026', 'June to July 2026'), points: [t('Gömülü sistem mimarileri, mikrodenetleyici tabanlı sensör okuma ve telemetri protokolleri üzerinde çalışarak donanım ile yazılım arasındaki veri akışını iyileştirdi.', 'Worked on embedded system architectures, microcontroller sensor reading and telemetry protocols, improving the data flow between hardware and software.')] },
          { title: t('Bozankaya Raylı Sistemler', 'Bozankaya Rail Systems'), date: t('Haziran 2026', 'June 2026'), points: [t('Elektrikli toplu taşıma araçlarında enerji depolama sistemleri, yüksek güç elektroniği ve batarya yönetim mekanizmalarının güvenlik ve koruma analizlerini yürüttü.', 'Carried out safety and protection analyses of energy storage systems, high-power electronics and battery management mechanisms in electric public transport vehicles.')] },
          { title: t('Cisco Networking Academy', 'Cisco Networking Academy'), date: t('Ocak 2026', 'January 2026'), points: [t('C ile sistem seviyesinde yazılım geliştirme, bellek optimizasyonu ve veri yapıları üzerinde çalıştı.', 'Worked on system-level software development, memory optimisation and data structures in C.')] },
          { title: t('Mavinci, Ankara', 'Mavinci, Ankara'), points: [t('Yapay zekâ modelleri, veri ön işleme hatları ve yazılım algoritmalarının geliştirilmesi, testi ve iyileştirilmesinde görev aldı.', 'Worked on developing, testing and optimising AI models, data preprocessing pipelines and software algorithms.')] },
          { title: t('Gayda Enerji, Ankara', 'Gayda Enerji, Ankara'), points: [t('Elektronik donanım ve kontrol sistemlerinde devre tasarımı, sinyal ölçüm doğrulamaları ve test süreçlerine katkı verdi.', 'Contributed to circuit design, signal measurement verification and testing in electronic hardware and control systems.')] },
        ],
      },
      {
        id: 'skills',
        items: [
          { title: t('Programlama dilleri', 'Programming languages'), detail: t('C, C#, Python, SQL', 'C, C#, Python, SQL') },
          { title: t('Gömülü sistemler ve EDA', 'Embedded systems and EDA'), detail: t('STM32, mikrodenetleyiciler, Proteus, CircuitJS, devre tasarımı', 'STM32, microcontrollers, Proteus, CircuitJS, circuit design') },
          { title: t('Mühendislik ve CAD', 'Engineering and CAD'), detail: t('AutoCAD, sistem modelleme, donanım ve yazılım arayüzleri', 'AutoCAD, system modelling, hardware and software interfaces') },
          { title: t('Yazılım ve çerçeveler', 'Software and frameworks'), detail: t('Yapay zekâ ve makine öğrenmesi algoritmaları, .NET, nesne yönelimli programlama', 'AI and machine learning algorithms, .NET, object-oriented programming') },
        ],
      },
      {
        id: 'certificates',
        items: [
          { title: t('Savunma Sanayiinde Proje Yönetimi', 'Project Management in the Defence Industry'), detail: t('BTK Akademi', 'BTK Academy') },
          { title: t('Savunma Sanayii Başkanlığı ve Türk Savunma Sanayii Ekosistemi', 'Presidency of Defence Industries and the Turkish Defence Ecosystem'), detail: t('BTK Akademi', 'BTK Academy') },
          { title: t('İletişim ve Network Yönetimi', 'Communication and Network Management'), detail: t('BTK Akademi', 'BTK Academy') },
          { title: t('STM32 ile Gömülü Yazılım Geliştirme', 'Embedded Software Development with STM32'), detail: t('BTK Akademi', 'BTK Academy') },
          { title: t('C# Object Oriented Programming, .NET', 'C# Object Oriented Programming, .NET'), detail: t('Coursera', 'Coursera') },
          { title: t('AutoCAD Uzmanlık Sertifikası, 716 dakika', 'AutoCAD Expert Certificate, 716 minutes'), detail: t('İstanbul Üniversitesi', 'Istanbul University') },
        ],
      },
      {
        id: 'seminars',
        items: [
          { title: t('Kapsül Programı', 'Capsule Programme'), detail: t('Millî Yetkinlik Hamlesi', 'National Competency Initiative') },
          { title: t('Genç Beyinler Yeni Fikirler 2025', 'Young Minds New Ideas 2025'), detail: t('Başkent Üniversitesi', 'Başkent University') },
          { title: t('Dijital Çağın İnşasında Veri Merkezi Ekosistemi', 'The Data Centre Ecosystem in Building the Digital Age'), detail: t('ELES EXPO', 'ELES EXPO') },
          { title: t('5G ile Endüstrinin Dönüşümü ve Akıllı Fabrikalar', 'Transforming Industry with 5G and Smart Factories'), detail: t('ELES EXPO', 'ELES EXPO') },
        ],
      },
    ],
  },

  erhan: {
    headline: COMPUTER_ENGINEERING,
    sections: [
      {
        id: 'education',
        items: [
          { title: t('OSTİM Teknik Üniversitesi', 'OSTİM Technical University'), detail: t('Bilgisayar Mühendisliği, not ortalaması 3,32 / 4,00', 'Computer Engineering, GPA 3.32 / 4.00'), date: t('2023’ten bu yana', 'Since 2023') },
        ],
      },
      {
        id: 'experience',
        items: [
          {
            title: t('ROKETSAN, Bilkent Cyberpark Yazılım Tasarım Müdürlüğü', 'ROKETSAN, Bilkent Cyberpark Software Design Directorate'),
            detail: t('Yapay zekâ stajyeri', 'Artificial intelligence intern'), date: t('Ağustos ile Eylül 2026', 'August to September 2026'),
            points: [
              t('Bilgisayarlı görü model eğitimleri için farklı senaryolardaki veri setlerinde nesne tespiti etiketlemesi yaptı.', 'Labelled objects in datasets with different scenarios for computer vision model training.'),
              t('U-Net tabanlı görüntü segmentasyonu ve sentetik veri üretimi modellerinin geliştirilmesinde çalıştı.', 'Worked on developing and improving U-Net image segmentation and synthetic data generation models.'),
              t('OpenCV ile video karelerinde Canny kenar tespiti, morfolojik işlemler ve maskeleme kullanarak görüntü onarma algoritmaları geliştirdi.', 'Developed inpainting algorithms for video frames with OpenCV using Canny edge detection, morphological operations and masking.'),
            ],
          },
          {
            title: t('ASELSAN, Gölbaşı Yerleşkesi Savunma Sistem Teknolojileri Başkanlığı', 'ASELSAN, Gölbaşı Campus Defence System Technologies Division'),
            detail: t('Gömülü yazılım mühendisliği stajyeri', 'Embedded software engineering intern'), date: t('Haziran ile Temmuz 2026', 'June to July 2026'),
            points: [
              t('Havacılık ve aviyonik veri haberleşme standartlarına uygun olarak JSON, XML ve özel ikili biçimler arasında dönüşüm yapan bir yazılım mimarisi geliştirdi.', 'Developed a converter architecture between JSON, XML and custom binary formats following aviation and avionics data communication standards.'),
              t('Gömülü yazılım test süreçlerini otomatikleştirmek için ICD ve mesaj ayrıştırma, veri doğrulama ve telemetri analiz modüllerini nesne yönelimli olarak entegre etti.', 'Integrated object-oriented ICD and message parsing, data validation and telemetry analysis modules to automate embedded software testing.'),
            ],
          },
          {
            title: t('ProgenX Academy, ODTÜ Teknokent', 'ProgenX Academy, METU Technopolis'),
            detail: t('Mobil uygulama geliştirme stajyeri', 'Mobile application developer intern'), date: t('Ocak ile Şubat 2026', 'January to February 2026'),
            points: [
              t('Millî Eğitim Bakanlığı ile yürütülen eğitim projesinde Figma tasarımlarını React Native’e aktardı ve Expo EAS Build ile mağaza dağıtımlarını yönetti.', 'In an education project run with the Ministry of National Education, implemented Figma designs in React Native and managed store releases with Expo EAS Build.'),
              t('Python, React.js ve React Native ile kullanıcı deneyimi odaklı arayüz geliştirme ve sorun giderme işlerinde çalıştı.', 'Worked on user experience focused interface development and troubleshooting with Python, React.js and React Native.'),
            ],
          },
          {
            title: t('Jotform, Hacettepe Teknokent', 'Jotform, Hacettepe Technopolis'),
            detail: t('Backend PHP geliştirici stajyeri', 'Backend PHP developer intern'), date: t('Ağustos ile Eylül 2025', 'August to September 2025'),
            points: [
              t('PHP ve büyük dil modeli tabanlı AI Thread Analyzer projesinin backend mimarisini tasarlayıp geliştirdi.', 'Designed and built the backend of the AI Thread Analyzer project based on PHP and large language models.'),
              t('İstem mühendisliğiyle analiz kalitesini artırdı ve projeyi Support Tools ekibi adına şirket geneline sundu.', 'Improved analysis quality with prompt engineering and presented the project company-wide for the Support Tools team.'),
            ],
          },
          {
            title: t('OSTİM Teknik Üniversitesi Bilgi İşlem Daire Başkanlığı', 'OSTİM Technical University IT Department'),
            detail: t('ERP web geliştirici stajyeri', 'ERP web developer intern'), date: t('Ocak ile Şubat 2025', 'January to February 2025'),
            points: [t('Python ve Odoo ile ERP modülleri ve e-ticaret web mimarisi üzerinde çalıştı.', 'Worked on ERP modules and an e-commerce web architecture with Python and Odoo.')],
          },
          {
            title: t('Gamegine Games, ODTÜ Teknokent', 'Gamegine Games, METU Technopolis'),
            detail: t('Oyun programlama stajyeri', 'Game programming intern'), date: t('Haziran ile Ekim 2024', 'June to October 2024'),
            points: [t('Unity ve Unreal Engine ile 2D ve 3D oyunlarda simülasyon sistemleri geliştirdi ve performans iyileştirmesi yaptı.', 'Developed simulation systems and optimised performance in 2D and 3D games with Unity and Unreal Engine.')],
          },
        ],
      },
      {
        id: 'skills',
        items: [
          { title: t('Yazılım dilleri', 'Programming languages'), detail: t('C, C++, C#, Python, PHP, Assembly, SQL', 'C, C++, C#, Python, PHP, Assembly, SQL') },
          { title: t('Yapay zekâ ve görü', 'AI and vision'), detail: t('OpenCV, PyTorch, TensorFlow, U-Net, nesne tespiti, sentetik veri', 'OpenCV, PyTorch, TensorFlow, U-Net, object detection, synthetic data') },
          { title: t('Gömülü sistemler', 'Embedded systems'), detail: t('RTOS, Linux, UART ve SPI haberleşmesi, ICD ayrıştırma', 'RTOS, Linux, UART and SPI communication, ICD parsing') },
          { title: t('Araçlar', 'Tools'), detail: t('STM32, Jetson, Intel MAX 10 FPGA, LLM, Unity, Docker, React', 'STM32, Jetson, Intel MAX 10 FPGA, LLM, Unity, Docker, React') },
        ],
      },
      {
        id: 'languages',
        items: [
          { title: t('İngilizce', 'English'), detail: t('B2', 'B2') },
          { title: t('İtalyanca', 'Italian'), detail: t('A2', 'A2') },
        ],
      },
      {
        id: 'seminars',
        items: [
          { title: t('T.C. Cumhurbaşkanlığı Millî Yetkinlik Hamlesi', 'Presidency of Türkiye National Competency Initiative'), date: t('2026', '2026') },
          { title: t('Savunma Sanayii Kariyer ve Yetkinlik Buluşmaları', 'Defence Industry Career and Competency Meetings'), date: t('2025', '2025') },
          { title: t('Savunma Teknolojileri Söyleşileri', 'Defence Technologies Talks'), date: t('2025', '2025') },
          { title: t('Hibrit ve Elektrikli Taşıtlar Zirvesi', 'Hybrid and Electric Vehicles Summit'), date: t('2024', '2024') },
        ],
      },
    ],
  },

  yusuf: {
    headline: COMPUTER_ENGINEERING,
    sections: [
      {
        id: 'education',
        items: [
          { title: t('OSTİM Teknik Üniversitesi', 'OSTİM Technical University'), detail: t('Bilgisayar Mühendisliği lisans programı', 'B.Sc. in Computer Engineering'), date: t('2024 ile 2028', '2024 to 2028') },
          { title: t('Anadolu Lisesi, Ankara', 'Anatolian High School, Ankara'), date: t('2020 ile 2024', '2020 to 2024') },
        ],
      },
      {
        id: 'experience',
        items: [
          {
            title: t('OSTİMTECH Yapay Zekâ Öğrenci Topluluğu', 'OSTİMTECH Artificial Intelligence Student Society'), detail: t('Başkan', 'President'), date: t('2025 ile 2026', '2025 to 2026'),
            points: [t('İHA, elektrikli araçlar ve yapay zekâ topluluklarını tek çatı altında koordine ederek etkinlik ve proje süreçlerini yönetiyor.', 'Coordinates the UAV, electric vehicles and AI societies under one roof and manages their events and projects.')],
          },
          {
            title: t('Devr-i Robotik', 'Devr-i Robotik'), detail: t('Yazılım geliştirici, gönüllü ve zorunlu staj', 'Software developer, volunteer and compulsory internship'), date: t('2024 ile 2026', '2024 to 2026'),
            points: [
              t('Web tabanlı sistemlerin geliştirilmesi ve güvenliğinde görev aldı.', 'Worked on developing and securing web-based systems.'),
              t('Gömülü sistem yazılımı geliştirme ve güvenlik testlerinde yer aldı.', 'Took part in embedded software development and security testing.'),
              t('Proje yönetimi süreçlerine destek verdi.', 'Supported project management processes.'),
            ],
          },
          {
            title: t('Siber Havadis', 'Siber Havadis'), detail: t('Teknoloji haber yazarı, gönüllü', 'Technology news writer, volunteer'), date: t('2025’ten bu yana', 'Since 2025'),
            points: [t('Türkiye ve dünya teknoloji gündemini izleyerek teknik ve güncel içerikler yazıyor.', 'Writes technical and current articles following technology news in Türkiye and worldwide.')],
          },
          {
            title: t('Airaks Teknoloji A.Ş.', 'Airaks Teknoloji A.Ş.'), detail: t('Yazılım geliştirici, zorunlu staj', 'Software developer, compulsory internship'), date: t('Temmuz 2026', 'July 2026'),
            points: [
              t('Drone Ar-Ge projelerinde sistem ve uçuş testlerine katıldı.', 'Took part in system and flight tests in drone R&D projects.'),
              t('Saha testlerinin yanında ofis içi yazılım geliştirme görevleri üstlendi.', 'Carried out in-house software development alongside field tests.'),
            ],
          },
        ],
      },
      {
        id: 'projects',
        items: [
          { title: t('Hava Savunma Sistemleri Yarışması, Teknofest', 'Air Defence Systems Competition, Teknofest'), date: t('2024 ile 2025', '2024 to 2025'), points: [t('8 kişilik ekipte proje yöneticisi ve yazılım geliştirici. Gömülü sistemler, görüntü işleme ve elektronik atış sistemleri üzerinde çalıştı.', 'Project manager and software developer in a team of 8, working on embedded systems, image processing and electronic firing systems.')] },
          { title: t('Su Altı Roket Yarışması, Teknofest', 'Underwater Rocket Competition, Teknofest'), date: t('2025’ten bu yana', 'Since 2025'), points: [t('15 kişilik ekipte proje yöneticisi ve yazılım geliştirici. Arduino tabanlı sensör okuma, roket ateşleme ve su altı hareket mekanizmalarında görev aldı.', 'Project manager and software developer in a team of 15, working on Arduino sensor reading, rocket ignition and underwater motion mechanisms.')] },
          { title: t('Getraci, Devr-i Robotik', 'Getraci, Devr-i Robotik'), date: t('2025 ile 2026', '2025 to 2026'), points: [t('RACI yöntemine dayanan proje yönetim sisteminde proje yöneticisi, full stack geliştirici ve siber güvenlik sorumlusu.', 'Project manager, full stack developer and cyber security lead for a project management system based on the RACI method.')] },
          { title: t('C-Auth, Devr-i Robotik', 'C-Auth, Devr-i Robotik'), date: t('2025 ile 2026', '2025 to 2026'), points: [t('Özgün şifreleme algoritmaları kullanan lisanslama dongle sisteminde test uzmanı ve yazılım geliştirici.', 'Test engineer and software developer for a licensing dongle system using original encryption algorithms.')] },
          { title: t('E-Scooter, Devr-i Robotik', 'E-Scooter, Devr-i Robotik'), date: t('2024 ile 2026', '2024 to 2026'), points: [t('Yerli ve özgün IoT bileşenleriyle geliştirilen scooter paylaşım sisteminde sistem analisti.', 'Systems analyst for a scooter sharing system built with domestic, original IoT components.')] },
          { title: t('Asistika, Devr-i Robotik', 'Asistika, Devr-i Robotik'), date: t('2025 ile 2026', '2025 to 2026'), points: [t('Bulut tabanlı insan kaynakları sisteminde test uzmanı.', 'Test engineer for a cloud-based human resources system.')] },
        ],
      },
      {
        id: 'certificates',
        items: [
          { title: t('Microsoft Cybersecurity Analyst Professional Certificate, Coursera', 'Microsoft Cybersecurity Analyst Professional Certificate, Coursera'), date: t('2026', '2026'), points: [t('Ağ güvenliği, Azure AD ile kimlik yönetimi, Microsoft Defender, SIEM, olay müdahalesi ve SC-900 hazırlığı.', 'Network security, identity management with Azure AD, Microsoft Defender, SIEM, incident response and SC-900 preparation.')] },
          { title: t('Bulut Bilişim Güvenliği, Türkiye Siber Güvenlik Kümelenmesi', 'Cloud Computing Security, Türkiye Cyber Security Cluster'), date: t('2025', '2025'), points: [t('AWS ile bulut bilişimin temelleri, CloudGoat üzerinde uygulamalı AWS CTF çalışmaları, Kubernetes ve Terraform.', 'Cloud computing basics with AWS, hands-on AWS CTF exercises on CloudGoat, Kubernetes and Terraform.')] },
        ],
      },
      {
        id: 'skills',
        items: [
          { title: t('Bulut ve DevOps', 'Cloud and DevOps'), detail: t('AWS EC2, S3 ve IAM, Docker, Kubernetes, Terraform', 'AWS EC2, S3 and IAM, Docker, Kubernetes, Terraform') },
          { title: t('Veritabanı sistemleri', 'Database systems'), detail: t('SQLite, Supabase, Firebase', 'SQLite, Supabase, Firebase') },
          { title: t('Siber güvenlik', 'Cyber security'), detail: t('Zero Trust mimarisi, CTF çözümleri, şifreleme algoritmaları', 'Zero Trust architecture, CTF solving, encryption algorithms') },
        ],
      },
      {
        id: 'languages',
        items: [
          { title: t('Türkçe', 'Turkish'), detail: t('Ana dil', 'Native') },
          { title: t('İngilizce', 'English'), detail: t('B1', 'B1') },
        ],
      },
    ],
  },

  ahmed: {
    headline: COMPUTER_ENGINEERING,
    sections: [
      {
        id: 'education',
        items: [
          { title: t('OSTİM Teknik Üniversitesi', 'OSTİM Technical University'), detail: t('Bilgisayar Mühendisliği lisans programı', 'B.Sc. in Computer Engineering'), date: t('2023’ten bu yana', 'Since 2023') },
        ],
      },
      {
        id: 'experience',
        items: [
          {
            title: t('ROKETSAN', 'ROKETSAN'), detail: t('Stajyer', 'Intern'), date: t('Ağustos ile Eylül 2026', 'August to September 2026'),
            points: [
              t('Gerçek zamanlı ve dağıtık haberleşme için DDS tabanlı çalışan bir prototip geliştirdi. Sistem entegrasyonu, QoS yapılandırması ve haberleşme başarımı değerlendirmesi üzerinde çalıştı.', 'Developed a working DDS-based prototype for real-time distributed communication, covering system integration, QoS configuration and communication performance evaluation.'),
              t('Word belgelerinden belirli başlık, komut ve veri alanlarını ayrıştırıp yapılandırılmış XML çıktısına dönüştüren yapay zekâ destekli bir sistem geliştirdi.', 'Developed an AI-assisted system that parses specified headings, commands and data fields from Word documents and converts them into structured XML.'),
            ],
          },
          {
            title: t('ASELSAN', 'ASELSAN'), detail: t('Yapay zekâ stajyeri', 'Artificial intelligence intern'), date: t('Haziran ile Temmuz 2026', 'June to July 2026'),
            points: [
              t('Kurumsal belge analizi için daha önce elle yapılan bir iş akışını uçtan uca otomatikleştiren büyük dil modeli tabanlı bir araç geliştirdi.', 'Developed an LLM-based tool for enterprise document analysis that automated an end-to-end workflow previously done by hand.'),
              t('Model çıktılarını etiketli bir veri setine karşı sayısal ölçütlerle değerlendirdi ve sonuçlara göre doğruluğu adım adım artırdı.', 'Evaluated model outputs against a labelled dataset with quantitative metrics and improved accuracy step by step.'),
              t('Çıktı tutarlılığını artırmak ve uydurma yanıtları azaltmak için istem yapıları ve model parametreleriyle sistematik denemeler yaptı.', 'Experimented systematically with prompt structures and model parameters to improve consistency and reduce hallucinations.'),
            ],
          },
        ],
      },
      {
        id: 'projects',
        items: [
          {
            title: t('İklimTekOst, yapay zekâ destekli batarya sağlığı ve yaşam döngüsü yönetimi', 'İklimTekOst, AI-powered battery health and life cycle management'),
            points: [
              t('Elektrikli araç bataryaları için sağlık tahmini, anomali tespiti, erken arıza tahmini ve kalan ömür analizine odaklanan bir makine öğrenmesi çerçevesi üzerinde çalışıyor.', 'Working on a machine learning framework for electric vehicle batteries focused on health estimation, anomaly detection, early fault prediction and remaining useful life analysis.'),
              t('Batarya telemetri gereksinimlerini, veri toplama yöntemlerini ve Dijital Batarya Pasaportu entegrasyonunu inceliyor.', 'Investigating battery telemetry requirements, data collection methods and Digital Battery Passport integration.'),
              t('Çalışma, batarya ömrünü uzatmak, batarya atığını azaltmak ve sürdürülebilir ulaşımı desteklemek amacıyla COP31’e hazırlık kapsamında sürüyor.', 'The work continues in preparation for COP31, aiming to extend battery life, reduce battery waste and support sustainable mobility.'),
            ],
          },
          {
            title: t('Derin öğrenme tabanlı tarım zararlısı ve hasar tespiti', 'Deep learning-based agricultural pest and damage detection'),
            points: [
              t('Nesne konumları ve tür etiketleri içeren bir görüntü veri seti hazırlıyor ve YOLO tabanlı modellerle zararlı ve bitki hasarı tespiti üzerinde çalışıyor.', 'Preparing an annotated image dataset with object locations and species labels and working on YOLO-based models to detect pests and plant damage.'),
              t('Doğruluk, işlem hızı ve cihaz kaynak kullanımı arasında denge için model boyutu ve görüntü çözünürlüğünü değerlendiriyor.', 'Evaluating model size and image resolution to balance accuracy, processing speed and device resource use.'),
              t('Tespit edilen nesneleri sınırlayıcı kutularla gösteren, tür ve sayı bilgisi veren bir görüntü analiz sistemi geliştiriyor.', 'Developing an image analysis system that shows detected objects with bounding boxes and gives species and counts.'),
            ],
          },
        ],
      },
      {
        id: 'skills',
        items: [
          { title: t('Programlama dilleri', 'Programming languages'), detail: t('Python, TypeScript, JavaScript, SQL', 'Python, TypeScript, JavaScript, SQL') },
          { title: t('Yapay zekâ', 'Artificial intelligence'), detail: t('LLM entegrasyonu, RAG, vektör veritabanları, istem mühendisliği, çok kipli modeller', 'LLM integration, RAG, vector databases, prompt engineering, multimodal models') },
          { title: t('Geliştirme', 'Development'), detail: t('Next.js, React, Node.js, PostgreSQL, REST API, Git', 'Next.js, React, Node.js, PostgreSQL, REST API, Git') },
        ],
      },
    ],
  },
}
