import type { CarbonCopy, ProjectCopy } from './types.ts'

export const project: ProjectCopy = {
  summary: {
    paragraphs: [
      'Paylaşımlı araçlarda bir batarya farklı araçlarda kullanılabilir. Proje, her bataryanın kullanım, bakım ve sağlık geçmişini tek kayıtta toplar.',
      'Bakım ekibi hangi bataryanın önce incelenmesi gerektiğini bu geçmişe göre görür. Doğrulanmış kayıtlar ikinci kullanım ve geri dönüşüm değerlendirmesinde de kullanılır.',
    ],
    stage: 'Proje teklif aşamasında. Pilot çalışma planlanıyor. İlk inceleme, filo operatörü teknik bilgi formunu doldurup verileri paylaştığında başlar. Demo sentetik veriyle çalışır.',
  },
  goals: {
    title: 'Amaç',
    items: [
      'Batarya bazında sağlık ve kullanım geçmişini izlemek',
      'Olağandışı davranış ve arıza göstergelerini değerlendirmek',
      'Bakım ekibine gerekçeli inceleme önceliği sunmak',
      'Dijital Batarya Pasaportu için doğrulanabilir kayıt altyapısı hazırlamak',
    ],
    audience: 'Öncelikli kullanıcılar mikromobilite filo operatörleri ve bakım ekipleridir. Üretici, servis ve geri dönüşüm firmalarıyla veri paylaşımı erişim yetkilerine göre ayrıca belirlenir.',
  },
  flow: {
    title: 'Sistem akışı',
    principles: [
      'Sistemin batarya verilerine yalnızca okuma erişimi vardır.',
      'BMS koruma işlevlerine müdahale edilmez.',
      'Bakım kararını yetkili teknik personel verir.',
      'Önce mevcut altyapı kullanılır. Ek donanım yalnız doğrulanmış bir veri eksikliğinde değerlendirilir.',
    ],
  },
  access: {
    title: 'Veri erişim seçenekleri',
    intro: 'Seçenekler aşağıdaki sırayla değerlendirilir.',
    options: [
      { title: 'Mevcut bulut kayıtları', text: 'Telemetri, bakım ve geçmiş kayıtları yeterliyse bu kayıtlar yalnız okunur erişimle kullanılır.' },
      { title: 'IoT üzerinden ek veri', text: 'Cihazda olup buluta aktarılmayan alanlar veya daha sık kayıt değerlendirilir. Cihaz kapasitesi ve iletişim yükü operatörle birlikte kontrol edilir.' },
      { title: 'Yalnız okunur ağ geçidi', text: 'Gereken sinyal araç içi haberleşme hattında varsa ve buluta taşınmıyorsa değerlendirilir. Protokol bilgisi ve teknik onay gerekir.' },
      { title: 'Ek ölçüm', text: 'Gereken büyüklük hiç ölçülmüyorsa sınırlı bir pilot grubunda ek sensör değerlendirilir.' },
    ],
  },
  methods: {
    title: 'Planlanan analiz yöntemleri',
    intro: 'Önce basit ve açıklanabilir karşılaştırmalar kurulur. Model seçimi pilot verisiyle yapılır. Demo yalnız kural tabanlı uyarılar kullanır.',
    items: [
      { title: 'Anomali tespiti', text: 'İstatistiksel kurallar ve Isolation Forest. Servis kayıtları ve uzman incelemesiyle doğrulanır.' },
      { title: 'Erken arıza tahmini', text: 'Lojistik regresyon ve gradient boosting, mevcut alarm kurallarıyla karşılaştırılır. Doğrulanmış arıza kayıtları gerekir.' },
      { title: 'SOH tahmini', text: 'Şarj oturumu özelliklerinden regresyon. Ölçüm yöntemi bilinen kapasite referansları gerekir.' },
      { title: 'Bozunma', text: 'Aynı bataryada tekrarlanan ölçümlerle sağlık göstergesinin zaman içindeki değişim hızı ve kayıp tahmin edilir.' },
      { title: 'Kalan faydalı ömür', text: 'Yeterli uzun dönem takip varsa sağkalım yöntemleri. Veri yetersizse gereken veri koşulları raporlanır.' },
    ],
  },
  passport: {
    title: 'Dijital Batarya Pasaportu',
    paragraphs: [
      'Kayıtlar araç yerine bataryanın tekil kimliğine bağlanır. Araç ve batarya eşleşmeleri zamanıyla birlikte tutulur. Pasaporta ham telemetri yerine doğrulanmış özetler ve olaylar aktarılır.',
      'Model düzeyinde üretici, kimya, nominal kapasite ve gerilim bilgileri yer alır. Batarya düzeyinde seri numarası, kullanım ve bakım geçmişi, sağlık kayıtları ve yaşam döngüsü durumu tutulur.',
      'Erişim üç düzeyde planlanır. Bazı alanlar herkese açıktır. Bazı bilgiler yalnız yetkili kurumlara, bazıları meşru menfaati olan taraflara açılır. Kesin kapsam güncel mevzuata göre belirlenir.',
    ],
    statesTitle: 'Yaşam döngüsü durumları',
    states: [
      { code: 'original', label: 'Orijinal' },
      { code: 're-used', label: 'Yeniden kullanılmış' },
      { code: 'repurposed', label: 'Farklı amaçla kullanılmış' },
      { code: 'remanufactured', label: 'Yeniden imal edilmiş' },
      { code: 'waste', label: 'Atık' },
    ],
    statesNote: 'Bataryalar bu durumlardan sırayla geçmek zorunda değildir.',
  },
  pilot: {
    title: 'Pilot takvimi',
    intro: 'Takvim, her aşama için öngörülen süreyi gösterir. Her aşamanın sonunda proje ekibi ve filo operatörü, mevcut verilere göre bir sonraki adıma karar verir.',
    phase: 'Faz',
    stages: [
      { phase: 0, title: 'Veri inceleme', period: '1. ay', text: 'Veri envanteri, batarya kimliği eşleşmesi ve kullanılabilir veri kapsamı.' },
      { phase: 1, title: 'İlk pilot', period: '1. ile 3. ay arası', text: 'Veri akışı, temel sağlık ve anomali göstergeleri, pasaport prototipi.' },
      { phase: 2, title: 'Model ve karbon', period: '3. ile 6. ay arası', text: 'Veri yeterliyse sağlık ve arıza modelleri, operasyonel emisyon hesabı.' },
      { phase: 3, title: 'Ek veri kararı', period: '6. ile 7. ay arası', text: 'Gerekirse sınırlı referans ölçümü veya ek veri erişimi.' },
      { phase: 4, title: 'Saha doğrulama', period: '7. ile 10. ay arası', text: 'Bakım önceliği, QR ve pasaport akışları, bakım ekibinin geri bildirimi.' },
      { phase: 5, title: 'Yaygınlaştırma', period: '10. aydan sonra', text: 'Sonuçlar yeterliyse filoya kademeli geçiş.' },
    ],
  },
  sources: {
    title: 'Kaynaklar',
    proposal: 'Proje teklifi, Ekim 2026',
    regulation: 'AB Batarya Tüzüğü 2023/1542',
    guidance: 'Avrupa Komisyonu pasaport kaynakları',
    faq: 'Avrupa Komisyonu sık sorulan sorular',
  },
}

export const carbon: CarbonCopy = {
  notice: 'Beklenen etkiler pilot çalışmada değerlendirilecektir. Ölçüm sonuçları pilot çalışmadan sonra yayımlanacaktır.',
  expected: {
    title: 'Beklenen katkılar',
    items: [
      { title: 'Bakım ve kullanım ömrü', text: 'Erken değişimlerin azaltılmasına ve ömrünü tamamlamamış bataryaların kullanımda kalmasına veri sağlar.' },
      { title: 'İzlenebilir yaşam döngüsü', text: 'Filodan çıkarılan bataryaların onarım, yeniden kullanım, ikinci kullanım veya geri dönüşüm seçeneklerini değerlendirmek için kayıt sunar.' },
      { title: 'Operasyonel izleme', text: 'Şarj kaynaklı enerji tüketiminin ve emisyonların kayıt altına alınmasını sağlar.' },
    ],
  },
  indicators: {
    title: 'İki ayrı gösterge',
    items: [
      { title: 'Batarya karbon ayak izi', text: 'AB 2023/1542 sayılı tüzüğün 7. maddesi ve II. ekinde tanımlanır. Hammadde, üretim, dağıtım ve ömür sonu aşamalarını kapsar. Üretici veya tedarikçi belgeleri gerekir. Kullanım sırasındaki şarj elektriği bu kapsamın dışındadır.' },
      { title: 'Şarj kaynaklı emisyonlar', text: 'Filo işletmesinde şebekeden çekilen şarj elektriğine dayanır. Ölçülen enerji ve tüketim noktası emisyon faktörüyle hesaplanır.' },
    ],
    note: 'Bu iki gösterge farklı sınırlara dayandığı için toplanmaz.',
  },
  method: {
    title: 'Hesaplama yöntemi',
    formula: ['Operasyonel emisyon', 'Şebekeden çekilen enerji', 'Emisyon faktörü'],
    paragraphs: [
      'Enerji kWh, faktör kg CO₂e/kWh olduğunda sonuç kg CO₂e olur.',
      'Türkiye için ETKB EVÇED tüketim noktası emisyon faktörleri kullanılır. Seçilen değer, yılı, bağlantı tipi ve kaynağı birlikte kaydedilir.',
    ],
    factorSource: 'ETKB EVÇED emisyon faktörleri',
  },
  limits: {
    title: 'Sınırlar',
    items: [
      'Enerjinin ölçüldüğü nokta pilotun ilk fazında belirlenir.',
      'Yıllık ulusal faktör şarj saatine göre iyileştirmeyi göstermez. Bunun için saatlik ve doğrulanmış ayrı bir veri seti gerekir.',
      'Gerçek tüketim ve pilot sonuçları olmadan tasarruf oranı veya emisyon azaltımı yazılmaz.',
      'Demodaki enerji kayıtları ve faktör örnektir. Gerçek filo ölçümü değildir.',
    ],
  },
  secondLife: {
    title: 'İkinci kullanım kararı',
    text: 'Tek bir SOH eşiği yeterli değildir. Sağlık, kontrollü kapasite ölçümü, güvenlik bulguları, bakım geçmişi ve hedef kullanım birlikte incelenir.',
  },
  sources: {
    title: 'Kaynaklar',
    proposal: 'Proje teklifi, Bölüm X, Döngüsellik, Karbon ve COP31 Bağlamı',
    regulation: 'AB Batarya Tüzüğü, 7. madde ve II. ek',
    guidance: 'Avrupa Komisyonu pasaport kaynakları',
    emissions: 'ETKB EVÇED emisyon faktörleri',
    cop31: 'UNFCCC COP31',
  },
}
