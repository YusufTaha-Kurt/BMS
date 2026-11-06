// Ekip CV'leri. Kaynak, kişilerin kullanıcı tarafından paylaşılan CV dosyaları (6 Kasım 2026).
// Telefon numarası ve kişisel e-posta bilerek eklenmez. Bağlantılar web/src/site.ts içindedir.
import type { LocalizedText } from '../site.ts'

export type CvSectionId = 'education' | 'experience' | 'projects' | 'certificates' | 'skills' | 'languages' | 'seminars'

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
            title: t('Battery Intelligence, yapay zekâ destekli batarya sağlığı ve yaşam döngüsü yönetimi', 'Battery Intelligence, AI-powered battery health and life cycle management'),
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
