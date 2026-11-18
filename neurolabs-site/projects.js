/* ============================================================
   ВАШИ ПРОЕКТЫ
   ------------------------------------------------------------
   Чтобы добавить проект: скопируйте любой блок { ... } целиком,
   вставьте его в список и поменяйте поля. Порядок в списке =
   порядок на сайте. Сохраните файл — `npm run dev` обновит
   страницу сам.

   Поля:
     id           — короткое имя латиницей, без пробелов (для ссылки
                    neurolabs.uz/#project/<id>)
     title        — название проекта
     category     — подпись над названием
     short        — 1–2 предложения для панели на главной
     description  — подробное описание (для окна «Подробнее»)
     features     — список возможностей
     tags         — технологии (короткие слова)
     year         — год (необязательно)
     platforms    — платформы, например 'Android · iOS' (необязательно)
     links        — ссылки; пустые/удалённые ссылки просто не показываются:
                      googlePlay, appStore, website, telegram
     screenshots  — скриншоты приложения. Положите картинки в папку
                    public/projects/<id>/ и укажите пути, например:
                    ['/projects/gilos/1.png', '/projects/gilos/2.png']
                    Лучше вертикальные, примерно 1080×2340.
     mock         — если скриншотов пока нет, покажется встроенный
                    экран: 'delivery' | 'community' | 'ai'

   Тексты можно писать сразу на трёх языках:
       short: { en: '...', ru: '...', uz: '...' }
   или одной строкой — тогда она будет на всех языках:
       short: 'Текст'
   ============================================================ */

export const PROJECTS = [
  {
    id: 'gilos',
    title: 'Gilos',
    category: { en: 'Food delivery · Mobile', ru: 'Доставка еды · Mobile', uz: 'Ovqat yetkazish · Mobile' },
    short: {
      en: 'A fast food & grocery delivery app: restaurants, live order tracking and payments in a few taps.',
      ru: 'Быстрая доставка еды и продуктов: рестораны, отслеживание заказа и оплата в пару касаний.',
      uz: "Tezkor ovqat va mahsulot yetkazish: restoranlar, buyurtmani kuzatish va bir necha bosishda to'lov.",
    },
    description: {
      en: 'Gilos connects customers with restaurants and stores across the city. Users browse menus, order in seconds, pay online and follow the courier on the map in real time. Restaurants get their own dashboard to manage menus and incoming orders.',
      ru: 'Gilos связывает клиентов с ресторанами и магазинами города. Пользователь выбирает блюда, оформляет заказ за секунды, оплачивает онлайн и следит за курьером на карте в реальном времени. У ресторанов — своя панель для управления меню и заказами.',
      uz: "Gilos mijozlarni shahar restoranlari va do'konlari bilan bog'laydi. Foydalanuvchi taom tanlaydi, bir necha soniyada buyurtma beradi, onlayn to'laydi va kuryerni xaritada real vaqtda kuzatadi. Restoranlar uchun menyu va buyurtmalarni boshqarish paneli mavjud.",
    },
    features: {
      en: ['Restaurant & store catalog with search', 'Live courier tracking on the map', 'Online payments', 'Push notifications about order status', 'Restaurant dashboard'],
      ru: ['Каталог ресторанов и магазинов с поиском', 'Отслеживание курьера на карте', 'Онлайн-оплата', 'Push-уведомления о статусе заказа', 'Панель для ресторанов'],
      uz: ["Qidiruvli restoran va do'konlar katalogi", 'Kuryerni xaritada kuzatish', "Onlayn to'lov", 'Buyurtma holati haqida push-xabarlar', 'Restoranlar uchun panel'],
    },
    tags: ['Flutter', 'Maps', 'Payments', 'Firebase'],
    year: '2025',
    platforms: 'Android · iOS',
    links: {
      googlePlay: '',   // ← вставьте ссылку, например https://play.google.com/store/apps/details?id=uz.gilos.app
      appStore: '',
      website: '',
    },
    screenshots: [],
    mock: 'delivery',
  },

  {
    id: 'ilmfun',
    title: 'IlmFun',
    category: { en: 'Education · Community', ru: 'Образование · Сообщество', uz: "Ta'lim · Hamjamiyat" },
    short: {
      en: 'A learning community with channels, voice rooms, video calls and file sharing — built for students.',
      ru: 'Учебное сообщество с каналами, голосовыми комнатами, видеозвонками и обменом файлами.',
      uz: "Kanallar, ovozli xonalar, video qo'ng'iroqlar va fayl almashish bilan o'quv hamjamiyati.",
    },
    description: {
      en: 'IlmFun brings students and teachers together in one place. Communities have text channels, voice rooms and video calls, so classes, homework help and study groups happen right inside the app — with files, reactions and roles.',
      ru: 'IlmFun объединяет учеников и преподавателей в одном месте. В сообществах есть текстовые каналы, голосовые комнаты и видеозвонки — занятия, помощь с домашкой и учебные группы проходят прямо в приложении, с файлами, реакциями и ролями.',
      uz: "IlmFun o'quvchi va o'qituvchilarni bir joyda birlashtiradi. Hamjamiyatlarda matnli kanallar, ovozli xonalar va video qo'ng'iroqlar bor — darslar, uy vazifasiga yordam va o'quv guruhlari ilovaning ichida o'tadi.",
    },
    features: {
      en: ['Communities with channels and roles', 'Voice rooms and video calls', 'File sharing (PDF, docs, media)', 'Reactions, mentions, verified accounts', 'Dark theme'],
      ru: ['Сообщества с каналами и ролями', 'Голосовые комнаты и видеозвонки', 'Обмен файлами (PDF, документы, медиа)', 'Реакции, упоминания, верифицированные аккаунты', 'Тёмная тема'],
      uz: ['Kanallar va rollar bilan hamjamiyatlar', "Ovozli xonalar va video qo'ng'iroqlar", 'Fayl almashish (PDF, hujjatlar, media)', 'Reaksiyalar, belgilar, tasdiqlangan akkauntlar', 'Tungi rejim'],
    },
    tags: ['Realtime', 'WebRTC', 'Voice', 'Video'],
    year: '2025',
    platforms: 'Android',
    links: {
      googlePlay: '',   // ← ссылка на IlmFun в Google Play
      appStore: '',
      website: '',
    },
    screenshots: [],
    mock: 'community',
  },

  {
    id: 'neuro-ai',
    title: 'Neuro AI',
    category: { en: 'Artificial Intelligence', ru: 'Искусственный интеллект', uz: "Sun'iy intellekt" },
    short: {
      en: 'An AI assistant that understands speech, answers in Uzbek, Russian and English, and plugs into any business.',
      ru: 'AI-ассистент, который понимает речь, отвечает на узбекском, русском и английском и встраивается в любой бизнес.',
      uz: "Nutqni tushunadigan, o'zbek, rus va ingliz tillarida javob beradigan AI assistent.",
    },
    description: {
      en: 'Neuro AI is a smart assistant for businesses: it answers customers 24/7, understands voice messages, and connects to Telegram, websites and CRMs. It speaks Uzbek, Russian and English.',
      ru: 'Neuro AI — умный ассистент для бизнеса: отвечает клиентам 24/7, понимает голосовые сообщения и подключается к Telegram, сайту и CRM. Говорит на узбекском, русском и английском.',
      uz: "Neuro AI — biznes uchun aqlli assistent: mijozlarga 24/7 javob beradi, ovozli xabarlarni tushunadi va Telegram, sayt va CRM bilan ulanadi. O'zbek, rus va ingliz tillarida gaplashadi.",
    },
    features: {
      en: ['Speech recognition (voice messages)', 'Answers in 3 languages', 'Telegram, website and CRM integration', 'Trained on your company data'],
      ru: ['Распознавание речи (голосовые)', 'Ответы на 3 языках', 'Интеграция с Telegram, сайтом и CRM', 'Обучение на данных вашей компании'],
      uz: ['Nutqni tanish (ovozli xabarlar)', '3 tilda javob', 'Telegram, sayt va CRM bilan integratsiya', "Kompaniyangiz ma'lumotlarida o'qitish"],
    },
    tags: ['LLM', 'Whisper', 'Speech', 'API'],
    year: '2026',
    platforms: 'Web · Telegram · API',
    links: {
      website: '',
      telegram: '',
    },
    screenshots: [],
    mock: 'ai',
  },
];
