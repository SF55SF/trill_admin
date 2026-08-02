// TRILLIANT_INFRASTRUCTURE_HEADING_V1
// TRILLIANT_HOME_INTRO_V2
export type Lang = "ru" | "uz" | "en";

export const languages: Lang[] = ["ru", "uz", "en"];

export const siteText = {
  ru: {
    nav: [{ label: "О центре", anchor: "about" }, { label: "Офисы", anchor: "offices" }, { label: "Галерея", anchor: "gallery" }, { label: "Инфраструктура", anchor: "infrastructure" }, { label: "Расположение", anchor: "location" }, { label: "Контакты", anchor: "contacts" }],
    home: "На главную страницу", menu: "Меню", openMenu: "Открыть меню", navigation: "Основная навигация", telegram: "Написать в Telegram",
    hero: { eyebrow: "Бизнес центр Trilliant", line1: "Готовые офисы", line2: "с ремонтом в аренду", offices: "Смотреть офисы", contact: "Оставить заявку" },
    stats: { eyebrow: "О бизнес-центре", heading1: "Бизнес-центр Trilliant - офисы класса А", heading2: "в центре Ташкента", paragraphs: ["Бизнес-центр Trilliant Tower 2 предлагает готовые офисы в аренду от собственника в центре Ташкента. Аренда осуществляется без комиссии для арендатора.", "Офисные помещения полностью готовы к въезду: выполнен качественный ремонт, предусмотрены мебель и инфраструктура для комфортной работы команды. Комплекс введён в эксплуатацию, полностью функционирует и соответствует стандартам бизнес-центра класса А.", "В Trilliant доступны офисы различной площади - от готовых помещений для небольших команд до просторных офисных блоков для крупных компаний. Это позволяет подобрать пространство с учётом численности сотрудников, необходимой планировки и требований бизнеса.", "Trilliant подходит компаниям, которым нужен современный офис в аренду в Ташкенте с возможностью быстрого переезда и размещения команды в одном деловом комплексе с качественной инфраструктурой и инженерными системами высокого уровня."], address: "адрес бизнес-центра", buildingClass: "класс здания", areaRange: "диапазон доступной площади для аренды", commissioned: "Введено в эксплуатацию", readiness: "готовность использования" },
    offices: { eyebrow: "Офисы в аренду", heading: "Свободные помещения", table: "Таблица свободных офисов", floor: "Этаж", area: "Площадь", rent: "Ставка аренды", workplaces: "Рабочие места", readiness: "Готовность", perMonth: "м² / мес.", onRequest: "По запросу", excluding: "не включая эксплуатацию и", layout: "Планировка", presentation: "Презентация", details: "Подробнее", office: "Офис Trilliant" },
    gallery: { eyebrow: "Галерея", heading: "Интерьеры и инфраструктура бизнес-центра", description: "Современные офисные пространства, общие зоны и инфраструктура для комфортной работы команды.", open: "Открыть изображение", alts: ["Фасад бизнес-центра Trilliant", "Входная группа бизнес-центра Trilliant", "Офисное пространство в Trilliant", "Переговорная зона в Trilliant", "Общие зоны бизнес-центра Trilliant"] },
    infrastructure: { eyebrow: "Инфраструктура", heading: "Инфраструктура комплекса", description: "В составе комплекса доступны гостиничные, ресторанные и wellness-сервисы." },
    location: { eyebrow: "Расположение", heading: "Бизнес центр Триллиант, улица Шахрисабз, 2", address: "Адрес", addressValue: "улица Шахрисабз, 2", city: "Город", cityValue: "г. Ташкент", route: "Маршрут", routeValue: "Заезд со стороны ул. Шахрисабз", map: "Карта расположения бизнес-центра Trilliant", control: "Управлять картой" },
    contact: { eyebrow: "Контакты", heading: "Получить предложение по офисам", description: "Оставьте свои контакты, и мы свяжемся с вами для подготовки предложения.", name: "Имя", namePlaceholder: "Ваше имя", phone: "Телефон", email: "Email", comment: "Комментарий", commentPlaceholder: "Какая площадь интересует?", privacy: "Согласен на обработку персональных данных", send: "Отправить", subject: "Новая заявка с сайта", sending: "Отправляем заявку...", success: "Спасибо! Заявка отправлена.", error: "Ошибка отправки. Попробуйте ещё раз.", connection: "Ошибка соединения. Попробуйте позже." },
    footer: "Информация не является публичной офертой",
    detail: { office: "Офис", rent: "Ставка аренды", excluding: "не включая эксплуатацию и", layout: "Планировка", offer: "Получить предложение", allOffices: "Все офисы", photo: "Фото офиса", gallery: "Галерея офиса", openPhoto: "Открыть фото офиса", openGalleryPhoto: "Открыть фото", perMonth: "м² / мес.", onRequest: "По запросу" }
  },
  uz: {
    nav: [{ label: "Markaz haqida", anchor: "about" }, { label: "Ofislar", anchor: "offices" }, { label: "Galereya", anchor: "gallery" }, { label: "Infratuzilma", anchor: "infrastructure" }, { label: "Joylashuv", anchor: "location" }, { label: "Aloqa", anchor: "contacts" }],
    home: "Bosh sahifaga", menu: "Menyu", openMenu: "Menyuni ochish", navigation: "Asosiy navigatsiya", telegram: "Telegram orqali yozish",
    hero: { eyebrow: "Trilliant biznes markazi", line1: "Tayyor ofislar", line2: "ta’mir bilan ijaraga", offices: "Ofislarni ko‘rish", contact: "Ariza qoldirish" },
    stats: { eyebrow: "Biznes markaz haqida", heading1: "Trilliant — A toifali ofis binosi", heading2: "Toshkent markazida", paragraphs: ["Trilliant biznes markazi Toshkent markazida mulkdordan ijaraga tayyor ofislarni taklif etadi.", "Ofis ijarasi ijarachi uchun komissiyasiz amalga oshiriladi. Xonalar ko‘chib kirishga to‘liq tayyor: sifatli ta’mir, mebel va jamoaning qulay ishlashi uchun zarur infratuzilma mavjud.", "Majmua foydalanishga topshirilgan, to‘liq faoliyat yuritadi va A toifali biznes markazi darajasiga mos keladi. Trilliant kichik jamoalar uchun tayyor bloklardan tortib, barcha xodimlarni bitta zamonaviy ish maydonida joylashtirish imkonini beruvchi keng ofislargacha turli maydonlarni taklif etadi.", "Trilliant Toshkentda tez ko‘chib kirish imkoniyati bilan ofis izlayotgan kompaniyalar uchun mos keladi."], address: "biznes markaz manzili", buildingClass: "bino toifasi", areaRange: "ijaraga mavjud maydon oralig‘i", commissioned: "Foydalanishga topshirilgan", readiness: "foydalanishga tayyorligi" },
    offices: { eyebrow: "Ijaraga ofislar", heading: "Bo‘sh xonalar", table: "Bo‘sh ofislar jadvali", floor: "Qavat", area: "Maydon", rent: "Ijara stavkasi", workplaces: "Ish o‘rinlari", readiness: "Tayyorlik", perMonth: "m² / oy", onRequest: "So‘rov bo‘yicha", excluding: "ekspluatatsiya xarajatlari va soliqsiz", layout: "Rejalashtirish", presentation: "Taqdimot", details: "Batafsil", office: "Trilliant ofisi" },
    gallery: { eyebrow: "Galereya", heading: "Biznes markaz interyeri va infratuzilmasi", description: "Jamoaning qulay ishlashi uchun zamonaviy ofislar, umumiy hududlar va infratuzilma.", open: "Rasmni ochish", alts: ["Trilliant biznes markazi fasadi", "Trilliant biznes markazi kirish qismi", "Trilliantdagi ofis maydoni", "Trilliantdagi muzokara hududi", "Trilliant biznes markazining umumiy hududlari"] },
    infrastructure: { eyebrow: "Infratuzilma", heading: "Majmua infratuzilmasi", description: "Majmua tarkibida mehmonxona, restoran va wellness xizmatlari mavjud." },
    location: { eyebrow: "Joylashuv", heading: "Trilliant biznes markazi, Shahrisabz ko‘chasi, 2", address: "Manzil", addressValue: "Shahrisabz ko‘chasi, 2", city: "Shahar", cityValue: "Toshkent", route: "Kirish", routeValue: "Shahrisabz ko‘chasi tomondan kirish", map: "Trilliant biznes markazi joylashuv xaritasi", control: "Xaritani boshqarish" },
    contact: { eyebrow: "Aloqa", heading: "Ofislar bo‘yicha taklif olish", description: "Aloqa ma’lumotlaringizni qoldiring, biz taklif tayyorlash uchun siz bilan bog‘lanamiz.", name: "Ism", namePlaceholder: "Ismingiz", phone: "Telefon", email: "Email", comment: "Izoh", commentPlaceholder: "Qaysi maydon sizni qiziqtiradi?", privacy: "Shaxsiy ma’lumotlarni qayta ishlashga roziman", send: "Yuborish", subject: "Saytdan yangi ariza", sending: "Ariza yuborilmoqda...", success: "Rahmat! Ariza yuborildi.", error: "Yuborishda xatolik. Qayta urinib ko‘ring.", connection: "Aloqa xatosi. Keyinroq urinib ko‘ring." },
    footer: "Ma’lumot ommaviy oferta hisoblanmaydi",
    detail: { office: "Ofis", rent: "Ijara stavkasi", excluding: "ekspluatatsiya xarajatlari va soliqsiz", layout: "Rejalashtirish", offer: "Taklif olish", allOffices: "Barcha ofislar", photo: "Ofis fotosi", gallery: "Ofis galereyasi", openPhoto: "Ofis fotosini ochish", openGalleryPhoto: "Fotosuratni ochish", perMonth: "m² / oy", onRequest: "So‘rov bo‘yicha" }
  },
  en: {
    nav: [{ label: "About", anchor: "about" }, { label: "Offices", anchor: "offices" }, { label: "Gallery", anchor: "gallery" }, { label: "Amenities", anchor: "infrastructure" }, { label: "Location", anchor: "location" }, { label: "Contacts", anchor: "contacts" }],
    home: "Go to homepage", menu: "Menu", openMenu: "Open menu", navigation: "Main navigation", telegram: "Message on Telegram",
    hero: { eyebrow: "Trilliant Business Center", line1: "Ready-to-use offices", line2: "for lease with fit-out", offices: "View offices", contact: "Submit an enquiry" },
    stats: { eyebrow: "About the business center", heading1: "Trilliant is a Class A office building", heading2: "in central Tashkent", paragraphs: ["Trilliant Business Center offers ready-to-use offices for lease directly from the owner in central Tashkent.", "Office leasing is commission-free for the tenant. The premises are fully ready for occupancy, with quality fit-out, furniture and infrastructure for comfortable teamwork.", "The complex has been commissioned, is fully operational and meets Class A business center standards. Trilliant offers offices of different sizes, from ready blocks for smaller teams to spacious premises for companies seeking to accommodate employees in one modern business environment.", "Trilliant is suitable for companies looking for an office in Tashkent with the option of moving in quickly."], address: "business center address", buildingClass: "building class", areaRange: "available leasing area range", commissioned: "Commissioned", readiness: "operational readiness" },
    offices: { eyebrow: "Offices for lease", heading: "Available premises", table: "Available office table", floor: "Floor", area: "Area", rent: "Rental rate", workplaces: "Workstations", readiness: "Availability", perMonth: "m² / month", onRequest: "On request", excluding: "excluding operating expenses and", layout: "Layout", presentation: "Presentation", details: "Details", office: "Trilliant office" },
    gallery: { eyebrow: "Gallery", heading: "Business center interiors and amenities", description: "Modern offices, common areas and infrastructure designed for comfortable teamwork.", open: "Open image", alts: ["Trilliant Business Center facade", "Trilliant Business Center entrance", "Office space at Trilliant", "Meeting area at Trilliant", "Trilliant Business Center common areas"] },
    infrastructure: { eyebrow: "Amenities", heading: "On-site amenities", description: "The complex provides hotel, restaurant and wellness services." },
    location: { eyebrow: "Location", heading: "Trilliant Business Center, 2 Shakhrisabz Street", address: "Address", addressValue: "2 Shakhrisabz Street", city: "City", cityValue: "Tashkent", route: "Access", routeValue: "Vehicle access from Shakhrisabz Street", map: "Trilliant Business Center location map", control: "Enable map controls" },
    contact: { eyebrow: "Contacts", heading: "Request an office proposal", description: "Leave your contact details and we will contact you to prepare a proposal.", name: "Name", namePlaceholder: "Your name", phone: "Phone", email: "Email", comment: "Comment", commentPlaceholder: "What area are you interested in?", privacy: "I consent to the processing of personal data", send: "Send", subject: "New website enquiry", sending: "Sending enquiry...", success: "Thank you! Your enquiry has been sent.", error: "Submission error. Please try again.", connection: "Connection error. Please try again later." },
    footer: "The information does not constitute a public offer",
    detail: { office: "Office", rent: "Rental rate", excluding: "excluding operating expenses and", layout: "Layout", offer: "Request a proposal", allOffices: "All offices", photo: "Office photos", gallery: "Office gallery", openPhoto: "Open office photo", openGalleryPhoto: "Open photo", perMonth: "m² / month", onRequest: "On request" }
  }
} as const;

export function getLangFromPath(pathname = "/"): Lang {
  const first = pathname.split("/").filter(Boolean)[0];
  return first === "uz" || first === "en" ? first : "ru";
}

export function localizedHome(lang: Lang, anchor = "") {
  const base = lang === "ru" ? "/" : "/" + lang + "/";
  return anchor ? base + "#" + anchor.replace(/^#/, "") : base;
}

export function localizedOfficePath(slug: string, lang: Lang) {
  return lang === "ru" ? "/" + slug + "/" : "/" + lang + "/" + slug + "/";
}

export function switchLanguagePath(pathname: string, target: Lang) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "uz" || parts[0] === "en") parts.shift();
  const rest = parts.length ? parts.join("/") + "/" : "";
  return target === "ru" ? "/" + rest : "/" + target + "/" + rest;
}

export function localizedOfficeValue(data: any, key: string, lang: Lang) {
  if (lang === "ru") return String(data[key] ?? "");
  const suffix = lang === "uz" ? "Uz" : "En";
  return String(data[key + suffix] || data[key] || "");
}

export function localizedOfficeArray(data: any, key: string, lang: Lang) {
  const suffix = lang === "uz" ? "Uz" : lang === "en" ? "En" : "";
  const localized = suffix ? data[key + suffix] : data[key];
  const fallback = data[key];
  const value = Array.isArray(localized) && localized.length ? localized : fallback;
  return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
}
export function localizedTax(value: string, lang: Lang) {
  if (lang === "uz") return value === "НДФЛ" ? "JShDS" : "QQS";
  if (lang === "en") return value === "НДФЛ" ? "PIT" : "VAT";
  return value;
}

export function languageAlternates(pathname: string) {
  return { ru: "https://www.trilliant.uz" + switchLanguagePath(pathname, "ru"), uz: "https://www.trilliant.uz" + switchLanguagePath(pathname, "uz"), en: "https://www.trilliant.uz" + switchLanguagePath(pathname, "en") };
}
