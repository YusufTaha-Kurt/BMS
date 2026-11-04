import type { CarbonCopy, ProjectCopy } from './types.ts'

export const project: ProjectCopy = {
  navigation: 'Proje sayfası bölümleri',
  summary: {
    title: 'Her bataryanın geçmişini birlikte değerlendirmek.',
    paragraphs: [
      'Paylaşımlı araçlarda bataryalar farklı araçlarda kullanılabilir. Bu proje, her bataryanın kullanım, bakım ve sağlık geçmişini aynı kayıtta bir araya getirmeyi amaçlıyor.',
      'Bakım ekiplerinin hangi bataryayı önce incelemesi gerektiğini görmesine ve kararını bu geçmişe dayanarak vermesine yardımcı olması hedefleniyor. Doğrulanmış kayıtların bataryanın sonraki kullanım ve geri dönüşüm değerlendirmelerine de eşlik etmesi planlanıyor.',
    ],
    stage: 'Teklif ve pilot planlama aşaması. BinBin teknik bilgi formu ve veri paylaşımı, ilk veri incelemesinin ön koşullarıdır. Mevcut demo sentetik verili bir konsept gösterimidir.',
  },
  goals: {
    title: 'Amaç ve hedef kitle',
    items: ['Batarya bazında sağlık ve kullanım geçmişini izlemek.', 'Olağandışı davranış ve arıza göstergelerini değerlendirmek.', 'Bakım ekiplerine açıklanabilir inceleme öncelikleri sunmak.', 'Dijital Batarya Pasaportu için doğrulanabilir kayıt altyapısı hazırlamak.'],
    audienceTitle: 'Kimler için?', audience: 'Öncelikle mikromobilite filo operatörleri ve bakım ekipleri için önerilmektedir. Üretici, servis ve geri dönüşüm aktörleriyle veri paylaşımı, erişim yetkilerine göre ayrıca değerlendirilecektir.',
  },
  scenario: {
    title: 'Örnek saha senaryosu', note: 'Bu senaryo önerilen kullanım biçimini anlatır; gerçekleşmiş bir saha sonucu değildir.',
    steps: [
      { title: 'Olağandışı değişim', text: 'Bir bataryada hücre gerilim farkı, benzer koşullardaki bataryalara göre artış gösterir.' },
      { title: 'Teknik inceleme önceliği', text: 'Sistem, ilgili geçmiş ve göstergelerle birlikte bataryayı bakım ekibinin değerlendirmesine sunabilir.' },
      { title: 'Uzman değerlendirmesi', text: 'Bakım personeli gerilim, sıcaklık, hata ve bakım geçmişini birlikte inceler. Gerekli işlem mevcut iş emri sürecinde kararlaştırılır.' },
    ],
  },
  flow: {
    title: 'Önerilen sistem akışı', safeguardsTitle: 'Temel çalışma ilkeleri',
    safeguards: ['Veriler salt okunur olarak alınacaktır.', 'BMS (Batarya Yönetim Sistemi) koruma işlevlerine müdahale edilmeyecektir.', 'Nihai bakım kararı yetkin teknik personelde kalacaktır.', 'İlk tercih mevcut altyapıdır; ek donanım yalnız doğrulanmış veri açığında değerlendirilecektir.'],
  },
  access: {
    title: 'Veriye erişimde dört öncelik', intro: 'IoT (Nesnelerin İnterneti), BMS ve mevcut bulut altyapısı incelenerek aşağıdaki seçenekler sırayla değerlendirilecektir.',
    options: [
      { title: 'Mevcut bulut kayıtları — ilk tercih', text: 'Telemetri, bakım ve geçmiş kayıtları yeterliyse salt-okunur erişim kullanılır. Analiz ayrıntısı mevcut arşivin kapsamıyla sınırlıdır.' },
      { title: 'IoT üzerinden ek erişim', text: 'Veri cihazda mevcut fakat buluta aktarılmıyorsa ek alanlar veya kayıt sıklığı değerlendirilebilir. Cihaz kapasitesi, yazılım ve iletişim yükü BinBin ile doğrulanır.' },
      { title: 'Salt-okunur ağ geçidi', text: 'Gerekli sinyal haberleşme hattında bulunuyor fakat IoT/bulut katmanına taşınmıyorsa değerlendirilir. Protokol bilgisi ve teknik onay gerekir; aktif sorgu pasif dinlemeden ayrı ele alınır.' },
      { title: 'Ek ölçüm veya sensör — son seçenek', text: 'Gerekli büyüklük mevcut altyapıda hiç ölçülmüyorsa sınırlı pilot kapsamında değerlendirilir. Fiziksel kurulum ve uygunluk koşulları ayrıca incelenir.' },
    ],
  },
  methods: {
    title: 'Planlanan analiz yöntemleri', intro: 'Önce basit ve açıklanabilir karşılaştırma yöntemleri kurulacaktır. Aday modellerin seçimi ve başarımı pilot verisiyle değerlendirilecektir. Mevcut demo sentetik veri ve açıklanabilir kurallarla çalışır; aday modeller henüz saha verisiyle doğrulanmamıştır.',
    items: [
      { title: 'Anomali', candidates: 'İstatistiksel kurallar, Isolation Forest; yeterli veri varsa autoencoder.', condition: 'Servis kayıtları ve uzman incelemesiyle doğrulama gerekir.' },
      { title: 'Erken arıza', candidates: 'Mevcut alarm kurallarıyla karşılaştırmalı lojistik regresyon ve gradient boosting.', condition: 'Olay tanımı, tahmin ufku ve doğrulanmış arıza etiketleri gerekir.' },
      { title: 'SOH — Batarya Sağlık Durumu', candidates: 'Şarj oturumu özniteliklerinden regresyon.', condition: 'Yöntemi bilinen kapasite referansları gerekir; BMS tahmini bağımsız gerçek değer sayılmaz.' },
      { title: 'Bozunma', candidates: 'Sağlık eğimi ve belirlenen zaman aralığında kayıp tahmini.', condition: 'Aynı bataryada tekrarlı ve karşılaştırılabilir ölçümler gerekir.' },
      { title: 'RUL — Kalan Faydalı Ömür', candidates: 'Yeterli uzun dönem takip varsa sağkalım yöntemleri.', condition: 'Doğrulanmış ömür sonu ve takipten çıkma kayıtları gerekir. Veri yetersizse gerekli veri koşulları raporlanır.' },
    ],
  },
  passport: {
    detailsTitle: 'Kimlik, erişim ve yaşam döngüsü ayrıntıları',
    title: 'Dijital Batarya Pasaportu', intro: 'Kayıtlar araç yerine tekil batarya kimliği etrafında ilişkilendirilecektir. Araç–batarya eşleşmeleri zaman bilgisiyle izlenecek; ham telemetri yerine doğrulanmış özetler ve olaylar pasaporta aktarılacaktır.',
    records: [
      { title: 'Model düzeyi', text: 'Üretici, kimya, nominal kapasite ve gerilim gibi ortak teknik bilgiler.' },
      { title: 'Tekil batarya düzeyi', text: 'Seri numarası, kullanım ve bakım geçmişi, sağlık kayıtları ve yaşam döngüsü durumu.' },
    ],
    identity: 'Benzersiz batarya kimliği ve QR erişiminin ISO/IEC 15459 serisi veya eşdeğer gereksinimler dikkate alınarak tasarlanması planlanmaktadır.',
    options: 'JSON-LD ve W3C DID, değerlendirilecek teknik seçeneklerdir; zorunlu mevzuat çözümleri veya mevcut demoda tamamlanmış özellikler olarak sunulmaz.',
    accessTitle: 'Planlanan erişim ayrımı',
    access: [
      { title: 'Kamuya açık bilgiler', text: 'Genel erişime uygun pasaport alanları.' },
      { title: 'Yetkili kurumlar', text: 'Bildirilmiş kuruluşlar, piyasa gözetim otoriteleri ve Komisyon için ayrılan bilgiler.' },
      { title: 'Meşru menfaati olan aktörler', text: 'Uygulanabilir kurallar çerçevesinde erişim sağlanabilecek sınırlı bilgiler.' },
    ],
    accessNote: 'Kesin yetkilendirme ve veri paylaşım kapsamı, güncel mevzuat ve uygulama kurallarıyla birlikte netleştirilecektir.',
    lifecycleTitle: 'Yaşam döngüsü durumları',
    states: [
      { code: 'original', label: 'Orijinal' }, { code: 're-used', label: 'Yeniden kullanılmış' }, { code: 'repurposed', label: 'Farklı kullanım amacıyla değerlendirilmiş' }, { code: 'remanufactured', label: 'Yeniden imal edilmiş' }, { code: 'waste', label: 'Atık' },
    ],
    lifecycleNote: 'Bunlar her bataryanın sırayla geçeceği zorunlu adımlar değildir. Durum değişikliği sağlık, güvenlik, bakım geçmişi ve hedef kullanım koşullarıyla birlikte değerlendirilecektir.',
    healthNote: 'BMS tahmini, model tahmini ve kontrollü kapasite ölçümü ayrı kaynaklar olarak kaydedilecektir. Kaynak, tarih, yöntem/sürüm ve doğrulama bilgileri korunacaktır.',
    guideNote: 'Teklif, 2026 tarihli V2 rehberinde derlenen 71 veri noktasını esas alır; tüm alanlar LMT bataryaları için aynı statüde değildir. Faz 0’da güncel resmî rehberle kapsam ve eksiklik eşleştirmesi yapılacaktır.',
  },
  pilot: {
    title: 'Önerilen pilot takvimi', intro: 'Süreler teklifin göreli planıdır; kesin başlangıç tarihi değildir. Her aşamadan sonraki karar, veri yeterliliği ve ortak değerlendirmeye bağlıdır.', phase: 'Faz',
    stages: [
      { phase: 0, title: 'Veri inceleme', period: 'İlk 1 ay', text: 'Veri envanteri, batarya kimliği eşleşmesi ve kullanılabilir veri kapsamı.' },
      { phase: 1, title: 'İlk pilot', period: '1–3. ay', text: 'Veri akışı, temel sağlık/anomali göstergeleri ve pasaport prototipi.' },
      { phase: 2, title: 'Model ve karbon', period: '3–6. ay', text: 'Veri yeterliyse sağlık ve arıza modelleri, operasyonel emisyon hesabı.' },
      { phase: 3, title: 'Ek veri kararı', period: '6–7. ay', text: 'Gerekirse sınırlı referans ölçümü veya ek veri erişimi değerlendirmesi.' },
      { phase: 4, title: 'Saha doğrulama', period: '7–10. ay', text: 'Bakım karar desteği, QR/pasaport akışları ve bakım ekibi geri bildirimi.' },
      { phase: 5, title: 'Genele yayma', period: '10–12+ ay', text: 'Sonuçlar yeterliyse kademeli filo entegrasyonunun değerlendirilmesi.' },
    ],
    informationTitle: 'Kesinleşecek pilot bilgileri',
    fields: { startDate: 'Pilot başlangıç tarihi', groupSize: 'Pilot grubunun büyüklüğü', dataCoverage: 'Gerçek veri kapsamı', validationResults: 'Pilot doğrulama sonuçları' },
  },
  missing: 'Bilgi henüz netleşmedi', related: { carbon: 'Karbon etkisi ve sınırlar', demo: 'Demo ve sunum' },
  sourcesTitle: 'Kaynaklar', proposalSource: 'BinBin Proje Teklifi: Bölüm I–III, V–IX ve XI. Açıklamalar teklif ve pilot planını aktarır.',
  sourceLabels: { regulation: 'AB Batarya Tüzüğü — 2023/1542', guidance: 'Avrupa Komisyonu — güncel pasaport kaynakları', faq: 'Avrupa Komisyonu — erişim ve uygulama açıklamaları' },
}

export const carbon: CarbonCopy = {
  notice: 'Bu sayfadaki etkiler beklenen etkilerdir ve tahmin niteliğindedir. Ölçülmüş sonuçlar pilot çalışmanın ardından paylaşılacaktır.',
  expected: {
    title: 'Beklenen katkılar', intro: 'Projenin aşağıdaki kararları veriyle desteklemesi hedeflenmektedir. Henüz ölçülmüş tasarruf veya emisyon azaltımı bulunmamaktadır.',
    items: [
      { title: 'Bakım ve kullanım ömrü', text: 'Gereksiz erken değişimleri azaltmaya ve teknik ömrünü tamamlamamış bataryaları kullanımda tutmaya yönelik değerlendirmeleri destekleyebilir.' },
      { title: 'İzlenebilir yaşam döngüsü', text: 'Filo dışına çıkan bataryaların onarım, yeniden kullanım, ikinci yaşam veya geri dönüşüm açısından sistematik incelenmesine veri sağlayabilir.' },
      { title: 'Operasyonel izleme', text: 'Şarj kaynaklı enerji tüketimi ve emisyonların kayıt altına alınmasını destekleyebilir.' },
    ],
  },
  indicators: {
    title: 'İki ayrı karbon göstergesi',
    items: [
      { title: 'Resmî batarya karbon ayak izi', text: 'Regulation (EU) 2023/1542, Article 7 ve Annex II çerçevesindeki Battery Carbon Footprint; hammadde, üretim, dağıtım ve kullanım ömrü sonu aşamalarını ele alır. Model/üretim tesisiyle ilişkili üretici veya tedarikçi belgeleri gerekir. Kullanım fazındaki şarj elektriği genel olarak bu sınırın dışındadır.' },
      { title: 'Şarj kaynaklı operasyonel emisyonlar', text: 'Filo operasyonunda şebekeden çekilen şarj elektriğine ilişkin ayrı göstergedir. Ölçülen enerji ile uygun tüketim noktası emisyon faktörüne dayanır; resmî batarya karbon ayak izinden farklıdır.' },
    ],
    note: 'Bu iki gösterge farklı sistem sınırlarına dayanır. Ortak sınır ve yöntem belirlenmeden tek bir toplam olarak birleştirilmemelidir.',
  },
  method: {
    title: 'Önerilen hesaplama yöntemi', formula: ['Operasyonel emisyon', 'Şebekeden çekilen enerji', 'Elektrik tüketim noktası emisyon faktörü'],
    unitNote: 'Enerji kWh, faktör kg CO₂e/kWh olarak tanımlanırsa sonuç kg CO₂e cinsindendir. Gerçek enerji ölçümleri ve pilot için doğrulanmış faktör henüz paylaşılmadı.',
    factorNote: 'Türkiye için ETKB–EVÇED elektrik tüketim noktası emisyon faktörleri referans alınabilir. Pilot için seçilecek değer, hesaplama yılı, bağlantı tipi, kaynak ve sürüm birlikte kaydedilecektir.',
    factorSource: 'ETKB–EVÇED resmî faktör kaynağı',
  },
  limits: {
    title: 'Varsayımlar ve sınırlar',
    items: ['Enerjinin hangi noktadan ölçüldüğü Faz 0’da belirlenecektir; ölçüm sınırı ve varsa dönüşüm/kayıp varsayımları kayıt altına alınacaktır.', 'Yıllık ulusal faktörler, şarj saatine göre optimizasyonu tek başına göstermez. Bunun için zaman çözünürlüklü ve doğrulanmış ayrı bir faktör veri seti gerekir.', 'Gerçek tüketim, karşılaştırma dönemi ve pilot sonuçları olmadan kesin tasarruf, yüzde veya emisyon azaltımı çıkarılmayacaktır.', 'Demodaki sentetik enerji kayıtları ve örnek faktörler, gerçek BinBin ölçümleri veya resmî batarya ayak izi değildir.'],
  },
  secondLife: { title: 'İkinci yaşam, otomatik bir karar değildir.', text: 'Tek bir SOH (Batarya Sağlık Durumu) eşiği yeterli değildir. Sağlık, kontrollü kapasite ölçümleri, güvenlik bulguları, bakım geçmişi ve hedef kullanım koşulları birlikte incelenmelidir. Bu yaklaşım satış, yeniden kullanım veya ekonomik getiri garantisi oluşturmaz.' },
  information: {
    title: 'Pilot ölçüm ve kaynak bilgileri', intro: 'Aşağıdaki alanlar gerçek ölçümler ve onaylı kaynaklar sağlandığında doldurulacaktır.', missing: 'Ölçüm veya kaynak bilgisi henüz sağlanmadı',
    fields: { measurementPoint: 'Enerji ölçüm noktası', measurementPeriod: 'Ölçüm dönemi', gridEnergy: 'Şebekeden çekilen enerji', factorValue: 'Seçilen emisyon faktörü', factorYear: 'Faktörün hesaplama yılı', connectionType: 'Tüketim noktası bağlantı tipi', factorSource: 'Seçilen faktörün kaynağı / sürümü', operationalEmissions: 'Hesaplanan operasyonel emisyon', measuredReduction: 'Ölçülmüş emisyon azaltımı', supplierDocuments: 'Üretici / tedarikçi ayak izi belgeleri' },
  },
  sourcesTitle: 'Kaynaklar', proposalSource: 'BinBin Proje Teklifi: Bölüm X ve kaynakça [1], [2], [12], [13].',
  sourceLabels: { regulation: 'AB Batarya Tüzüğü — Article 7 ve Annex II', guidance: 'Avrupa Komisyonu — Batarya Pasaportu kaynakları', emissions: 'ETKB–EVÇED — tüketim noktası emisyon faktörleri', cop31: 'UNFCCC — COP31' },
  related: { project: 'Proje detaylarına dön', demo: 'Demo ve sunum' },
}
