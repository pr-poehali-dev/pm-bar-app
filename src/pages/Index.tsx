import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO    = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/476ebb68-793f-401c-8b35-f1ed2326f280.jpg";
const IMG_QUIZ    = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/c6a3eeae-2dd5-45d7-a59d-03b3f738e51b.jpg";
const IMG_LUNCH   = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/bca8d078-bb24-4564-8504-af8729a79dde.jpg";
const IMG_BARTEN  = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/5887ff69-8ac1-4993-9d52-eda1194c678a.jpg";
const IMG_BEER    = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/38044e8e-708c-4975-a687-86a1053cf49f.jpg";
const IMG_FOOD    = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/a88dedaf-a079-447e-833f-588479991bb9.jpg";

type Section = "home" | "menu" | "booking" | "about" | "news" | "contacts" | "lunch";

// ─── МЕНЮ-ФОРМАТЫ (реальные с сайта) ───────────────────────────────────────
const menuFormats = [
  {
    id: "quiz",
    title: "МЕНЮ-КВИЗ",
    subtitle: "Каждое воскресенье · 18:00",
    img: IMG_QUIZ,
    color: "var(--neon-orange)",
    desc: "Командная викторина за столом с едой и напитками. Побеждает самая эрудированная компания — победители получают призы от бара!",
    includes: [
      "Участие в викторине — бесплатно",
      "Меню из закусок и основных блюд",
      "Напитки по меню бара",
      "Призы для победителей",
    ],
    note: "Регистрация команды обязательна. Звоните: +7 (960) 179-09-89",
  },
  {
    id: "pati",
    title: "МЕНЮ-ПАТИ",
    subtitle: "Пятница и суббота · от 21:00",
    img: IMG_BARTEN,
    color: "var(--neon-pink)",
    desc: "Вечеринка с бармен-шоу, танцами и авторской кухней. Профессиональные бармены устроят для вас незабываемое шоу прямо за стойкой.",
    includes: [
      "Бармен-шоу каждые выходные",
      "Авторские коктейли от команды барменов",
      "Яркое меню вечерних блюд",
      "Танцпол и живая атмосфера",
    ],
    note: "Вход свободный при наличии брони столика",
  },
  {
    id: "bezlimit",
    title: "БЕЗЛИМИТ ПАТИ",
    subtitle: "По предварительной брони",
    img: IMG_BEER,
    color: "var(--neon-cyan)",
    desc: "Безлимитное угощение на фиксированное время — бери столько, сколько душе угодно. Идеально для корпоративов и дней рождения.",
    includes: [
      "Безлимитные напитки — 2 часа",
      "Горячие закуски в комплекте",
      "Персональный официант",
      "Зарезервированная зона для компании",
    ],
    note: "Только по предварительному бронированию. Группы от 4 человек",
  },
  {
    id: "speshl",
    title: "СУПЕР СПЕШЛ",
    subtitle: "Специальное предложение недели",
    img: IMG_FOOD,
    color: "var(--neon-orange)",
    desc: "Еженедельное специальное предложение — уникальные блюда, авторские коктейли и особые условия только на этой неделе. Следи за обновлениями!",
    includes: [
      "Уникальное блюдо недели от шефа",
      "Авторский коктейль в подарок",
      "Специальная цена только эту неделю",
      "Анонс каждую пятницу в соцсетях",
    ],
    note: "Акция действует ограниченное время. Уточняйте у персонала",
  },
];

// ─── БИЗНЕС-ЛАНЧ ────────────────────────────────────────────────────────────
const lunchMenu = [
  { course: "Суп", items: ["Борщ со сметаной", "Куриный крем-суп", "Солянка мясная", "Уха из судака"] },
  { course: "Горячее", items: ["Котлета по-киевски с пюре", "Паста карбонара", "Куриная грудка-гриль с овощами", "Свинина в соусе BBQ"] },
  { course: "Салат", items: ["Цезарь с курицей", "Греческий", "Витаминный из свежих овощей", "Оливье"] },
  { course: "Напиток", items: ["Чай / кофе / сок / морс"] },
];

// ─── НОВОСТИ ─────────────────────────────────────────────────────────────────
const news = [
  { date: "27\nАПР", title: "Бизнес-ланч открыт!", desc: "В нашем ПМ|БАР появился вкусный бизнес-ланч. Комплексный обед по приятным ценам каждый день.", tag: "Новость", color: "var(--neon-orange)", img: IMG_LUNCH },
  { date: "30\nАПР", title: "Бармен-шоу · выходные", desc: "Каждые выходные для вас работает команда профессиональных барменов. Незабываемое шоу прямо у стойки!", tag: "Событие", color: "var(--neon-pink)", img: IMG_BARTEN },
  { date: "Еженед.", title: "Меню-Квиз", desc: "Командная викторина каждое воскресенье. Собирай команду и приходи побеждать!", tag: "Квиз", color: "var(--neon-cyan)", img: IMG_QUIZ },
];

const reviews = [
  { author: "Анна К.", text: "Меня удивила вежливость персонала, кухня и интерьер — всё на уровне! Персонал очень вежлив и деликатен.", stars: 5 },
  { author: "Дмитрий Л.", text: "Наконец-то открылось крутое место в Нижнем! Теперь это моё любимое заведение! Руководству — респект!", stars: 5 },
  { author: "Светлана М.", text: "Очень вкусная свежая еда по приемлемым ценам, хорошее обслуживание со стороны официантов. Спасибо вам большое.", stars: 5 },
  { author: "Компания друзей", text: "Атмосферное место, приятная музыка, в помещении чисто, учтивый персонал, но главное — вкусная еда и доступные цены!", stars: 5 },
];

const gallery = [IMG_HERO, IMG_QUIZ, IMG_LUNCH, IMG_BARTEN, IMG_BEER, IMG_FOOD];

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [activeFormat, setActiveFormat] = useState<string | null>(null);
  const [bDate, setBDate] = useState("");
  const [bTime, setBTime] = useState("");
  const [bGuests, setBGuests] = useState("2");
  const [bName, setBName] = useState("");
  const [bPhone, setBPhone] = useState("");
  const [bSuccess, setBSuccess] = useState(false);

  const nav = [
    { id: "home",     label: "Главная",       icon: "Home" },
    { id: "about",    label: "О нас",         icon: "Info" },
    { id: "menu",     label: "Меню",          icon: "UtensilsCrossed" },
    { id: "lunch",    label: "Бизнес-ланч",   icon: "Coffee" },
    { id: "news",     label: "Новости",       icon: "Newspaper" },
    { id: "contacts", label: "Контакты",      icon: "MapPin" },
  ] as const;

  const go = (s: Section) => { setSection(s); setActiveFormat(null); };

  const selectedFormat = menuFormats.find(f => f.id === activeFormat);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => go("home")} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-sm text-primary-foreground"
              style={{ background: "linear-gradient(135deg, #FF8C00, #FF3C7D)" }}>
              ПМ
            </div>
            <div className="leading-none">
              <div className="font-display font-bold text-lg tracking-widest gradient-text">ПМ|БАР</div>
              <div className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase">Нижний Новгород</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-0.5">
            {nav.map((item) => (
              <button key={item.id} onClick={() => go(item.id as Section)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  section === item.id
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}>
                {item.label}
              </button>
            ))}
          </nav>

          <button onClick={() => go("booking" as Section)}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all neon-glow-orange">
            <Icon name="CalendarDays" size={16} />
            Забронировать
          </button>

          <button className="md:hidden relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Bell" size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>
        </div>
      </header>

      <main className="pt-16 pb-24 md:pb-8">

        {/* ── HOME ── */}
        {section === "home" && (
          <div className="animate-fade-in">

            {/* Hero */}
            <section className="relative min-h-[92vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG_HERO})` }} />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

              <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
                <div className="max-w-xl animate-slide-up">
                  <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-primary mb-6">
                    <span className="w-2 h-2 bg-primary rounded-full pulse-neon" />
                    Открыто · Пн-Чт до 03:00 · Пт-Сб до 05:00
                  </div>

                  <h1 className="font-display font-bold text-5xl md:text-7xl leading-none tracking-tight mb-5">
                    БАР С ПОНЯТНОЙ<br />
                    <span className="gradient-text">ЕДОЙ, ТАНЦАМИ</span><br />
                    И ОСОБОЙ КУЛЬТУРОЙ
                  </h1>

                  <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-md">
                    Место, где днём можно поработать, съесть комплексный обед, а вечером получить удовольствие от ярких блюд или потанцевать
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => go("booking" as Section)}
                      className="px-8 py-3.5 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-200 neon-glow-orange font-display tracking-wide">
                      Забронировать столик
                    </button>
                    <button onClick={() => go("menu")}
                      className="px-8 py-3.5 rounded-xl font-semibold glass border border-white/15 hover:border-primary/40 transition-all duration-200">
                      Смотреть меню
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="border-y border-white/5 bg-card/50">
              <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { v: "285", l: "Магазинов ПивоМан" },
                  { v: "50+", l: "Сортов пива" },
                  { v: "4.9★", l: "Оценка гостей" },
                  { v: "05:00", l: "Работаем до (Пт-Сб)" },
                ].map((s) => (
                  <div key={s.v} className="text-center">
                    <div className="font-display font-bold text-3xl text-neon-orange">{s.v}</div>
                    <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* News strip */}
            <section className="max-w-6xl mx-auto px-4 py-14">
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-display font-bold text-4xl">НОВОСТИ <span className="text-neon-pink">&</span> АКЦИИ</h2>
                <button onClick={() => go("news")} className="text-sm text-primary hover:text-primary/80 transition-colors">Смотреть все →</button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {news.map((n) => (
                  <div key={n.title} onClick={() => go("news")}
                    className="glass glass-hover rounded-2xl overflow-hidden cursor-pointer">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={n.img} alt={n.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: `${n.color}25`, color: n.color, border: `1px solid ${n.color}35` }}>
                          {n.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 font-display font-bold text-sm whitespace-pre-line leading-tight"
                        style={{ color: n.color }}>{n.date}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-lg mb-1">{n.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Бизнес-ланч promo */}
            <section className="max-w-6xl mx-auto px-4 pb-14">
              <div className="glass glass-hover rounded-2xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-primary mb-5 w-fit">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Каждый день с 12:00 до 16:00
                    </div>
                    <h2 className="font-display font-bold text-4xl mb-4">
                      БИЗНЕС-<span className="gradient-text">ЛАНЧ</span>
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Комплексный обед: суп + горячее + салат + напиток. Вкусно, быстро и по приятным ценам — идеально для рабочего перерыва.
                    </p>
                    <button onClick={() => go("lunch")}
                      className="px-6 py-3 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all neon-glow-orange w-fit font-display">
                      Смотреть меню ланча
                    </button>
                  </div>
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img src={IMG_LUNCH} alt="Бизнес-ланч" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section className="max-w-6xl mx-auto px-4 pb-14">
              <div className="flex items-end justify-between mb-6">
                <h2 className="font-display font-bold text-4xl">ГАЛЕРЕЯ</h2>
                <span className="text-sm text-muted-foreground">Атмосфера ПМ|БАР</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {gallery.map((img, i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden ${i === 0 ? "col-span-2 row-span-1" : ""}`}>
                    <div className={`${i === 0 ? "aspect-[16/7]" : "aspect-square"} overflow-hidden`}>
                      <img src={img} alt={`Галерея ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Booking CTA */}
            <section className="max-w-6xl mx-auto px-4 pb-14">
              <div className="glass rounded-2xl p-8 md:p-12 text-center border border-primary/15"
                style={{ background: "linear-gradient(135deg, rgba(255,140,0,0.06), rgba(255,60,125,0.04))" }}>
                <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">ЗАБРОНИРОВАТЬ СТОЛИК</h2>
                <p className="text-muted-foreground mb-2">Хотите забронировать столик? Оставьте свои контакты и мы с вами свяжемся.</p>
                <p className="text-primary text-sm mb-8 font-medium">Информация по телефону: +7 (960) 179-09-89</p>
                <button onClick={() => go("booking" as Section)}
                  className="px-10 py-4 rounded-xl font-display font-semibold text-xl text-primary-foreground bg-primary hover:bg-primary/90 transition-all neon-glow-orange">
                  ЗАБРОНИРОВАТЬ
                </button>
              </div>
            </section>

            {/* Reviews */}
            <section className="max-w-6xl mx-auto px-4 pb-14">
              <h2 className="font-display font-bold text-4xl mb-8">ОТЗЫВЫ <span className="gradient-text">ГОСТЕЙ</span></h2>
              <div className="grid md:grid-cols-2 gap-4">
                {reviews.map((r) => (
                  <div key={r.author} className="glass glass-hover rounded-2xl p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {Array(r.stars).fill(0).map((_, i) => (
                        <Icon key={i} name="Star" size={14} className="text-primary fill-primary" style={{ fill: "var(--neon-orange)" }} />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">«{r.text}»</p>
                    <div className="font-semibold text-sm">{r.author}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ── О НАС ── */}
        {section === "about" && (
          <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">О НАС</h2>
            <p className="text-muted-foreground mb-10">ПМ|БАР — место с душой в самом центре Нижнего Новгорода</p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="font-display font-semibold text-2xl mb-4">БАР С ПОНЯТНОЙ ЕДОЙ</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Место, где днём можно поработать, съесть комплексный обед, а вечером получить удовольствие от ярких и интересных блюд или потанцевать.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мы создали пространство, где каждый найдёт что-то своё — будь то тихий обед в будни или зажигательная вечеринка с бармен-шоу в выходные.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Особая культура питания — это про нас. Вкусная свежая еда, приемлемые цены и атмосфера, в которую хочется возвращаться снова.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img src={IMG_HERO} alt="Интерьер ПМ|БАР" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="divider-orange mb-10" style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,140,0,0.4), transparent)" }} />

            <h3 className="font-display font-bold text-3xl mb-6">НАШ ПАРТНЁР — <span className="gradient-text">ПИВОМАН</span></h3>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="glass glass-hover rounded-2xl p-6">
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Trophy" size={22} className="text-primary" />
                </div>
                <h4 className="font-display font-semibold text-xl mb-2">Компания лидеров</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Компания успешных, позитивных и целеустремлённых людей. ПивоМан всегда добивается поставленных целей в работе и жизни. Стремимся к совершенству.
                </p>
              </div>
              <div className="glass glass-hover rounded-2xl p-6">
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Beer" size={22} className="text-primary" />
                </div>
                <h4 className="font-display font-semibold text-xl mb-2">285 магазинов</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Сеть фирменных магазинов ПивоМан — в нашем городе и области уже открыто 285 магазинов. Продаётся более 50 сортов пива, квас, лимонад и сидр различных вкусов.
                </p>
              </div>
              <div className="glass glass-hover rounded-2xl p-6">
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Star" size={22} className="text-primary" />
                </div>
                <h4 className="font-display font-semibold text-xl mb-2">Лучший выбор</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Сеть фирменных магазинов ПивоМан поможет вам сделать правильный выбор и купить подходящий вашему вкусу алкогольный напиток.
                </p>
              </div>
              <div className="glass glass-hover rounded-2xl p-6">
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Users" size={22} className="text-primary" />
                </div>
                <h4 className="font-display font-semibold text-xl mb-2">Надёжный гид</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Мы поможем вам стать надёжным гидом в удивительном мире высококачественных сортов пива. Выбирайте лучшее вместе с нами.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden grid grid-cols-3 gap-3">
              {[IMG_BARTEN, IMG_QUIZ, IMG_LUNCH].map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl">
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── МЕНЮ ── */}
        {section === "menu" && !selectedFormat && (
          <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">МЕНЮ</h2>
            <p className="text-muted-foreground mb-10">Выбери формат вечера — мы подстроимся под тебя</p>

            <div className="grid md:grid-cols-2 gap-5">
              {menuFormats.map((f) => (
                <div key={f.id} onClick={() => setActiveFormat(f.id)}
                  className="glass glass-hover rounded-2xl overflow-hidden cursor-pointer group">
                  <div className="aspect-video overflow-hidden relative">
                    <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <div className="text-xs font-medium mb-1 opacity-80" style={{ color: f.color }}>{f.subtitle}</div>
                      <h3 className="font-display font-bold text-2xl" style={{ color: "#fff", textShadow: `0 0 20px ${f.color}50` }}>
                        {f.title}
                      </h3>
                    </div>
                    <div className="absolute top-3 right-3 w-9 h-9 glass rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="ArrowRight" size={16} className="text-foreground" />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    <button className="mt-4 text-sm font-semibold transition-colors" style={{ color: f.color }}>
                      Подробнее →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 glass rounded-2xl p-6 border border-primary/15 text-center">
              <p className="text-muted-foreground mb-2">Хотите отдельное меню или особый формат?</p>
              <p className="text-sm text-primary font-medium mb-4">Звоните: +7 (960) 179-09-89</p>
              <button onClick={() => go("lunch")}
                className="px-6 py-2.5 rounded-xl bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-all text-sm font-semibold">
                Также смотрите: Бизнес-ланч →
              </button>
            </div>
          </div>
        )}

        {/* ── ДЕТАЛЬНАЯ СТРАНИЦА ФОРМАТА ── */}
        {section === "menu" && selectedFormat && (
          <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
            <button onClick={() => setActiveFormat(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
              <Icon name="ArrowLeft" size={16} />
              Все форматы меню
            </button>

            <div className="rounded-2xl overflow-hidden aspect-video mb-8">
              <img src={selectedFormat.img} alt={selectedFormat.title} className="w-full h-full object-cover" />
            </div>

            <div className="mb-3">
              <span className="text-xs font-medium" style={{ color: selectedFormat.color }}>{selectedFormat.subtitle}</span>
            </div>
            <h2 className="font-display font-bold text-5xl mb-4">{selectedFormat.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{selectedFormat.desc}</p>

            <div className="glass rounded-2xl p-6 mb-6">
              <h3 className="font-display font-semibold text-xl mb-4">ЧТО ВКЛЮЧЕНО</h3>
              <div className="space-y-3">
                {selectedFormat.includes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${selectedFormat.color}20`, border: `1px solid ${selectedFormat.color}35` }}>
                      <Icon name="Check" size={11} style={{ color: selectedFormat.color }} />
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-4 border border-primary/20 mb-8">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">{selectedFormat.note}</p>
              </div>
            </div>

            <button onClick={() => go("booking" as Section)}
              className="w-full py-4 rounded-xl font-display font-semibold text-xl text-primary-foreground bg-primary hover:bg-primary/90 transition-all neon-glow-orange">
              ЗАБРОНИРОВАТЬ СТОЛИК
            </button>
          </div>
        )}

        {/* ── БИЗНЕС-ЛАНЧ ── */}
        {section === "lunch" && (
          <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-display font-bold text-5xl">БИЗНЕС-ЛАНЧ</h2>
            </div>
            <p className="text-muted-foreground mb-2">Каждый день с 12:00 до 16:00</p>
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-primary mb-8">
              <span className="w-2 h-2 bg-primary rounded-full pulse-neon" />
              Комплексный обед: суп + горячее + салат + напиток
            </div>

            <div className="rounded-2xl overflow-hidden aspect-video mb-8">
              <img src={IMG_LUNCH} alt="Бизнес-ланч" className="w-full h-full object-cover" />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {lunchMenu.map((cat) => (
                <div key={cat.course} className="glass glass-hover rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-xl mb-4 text-primary">{cat.course}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-6 border border-primary/15 text-center">
              <p className="font-display font-bold text-2xl mb-2">ВКУСНО · БЫСТРО · ПО ПРИЯТНЫМ ЦЕНАМ</p>
              <p className="text-muted-foreground text-sm mb-4">Уточняйте состав дня и цены у персонала или по телефону</p>
              <a href="tel:+79601790989" className="text-xl font-display font-semibold text-primary hover:text-primary/80 transition-colors">
                +7 (960) 179-09-89
              </a>
            </div>
          </div>
        )}

        {/* ── НОВОСТИ ── */}
        {section === "news" && (
          <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">НОВОСТИ <span className="gradient-text">&</span> СОБЫТИЯ</h2>
            <p className="text-muted-foreground mb-10">Актуальные события, акции и мероприятия</p>

            <div className="grid md:grid-cols-3 gap-5 mb-12">
              {news.map((n) => (
                <div key={n.title} className="glass glass-hover rounded-2xl overflow-hidden">
                  <div className="aspect-video overflow-hidden relative">
                    <img src={n.img} alt={n.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: `${n.color}22`, color: n.color, border: `1px solid ${n.color}33` }}>
                        {n.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-muted-foreground mb-2 font-medium" style={{ color: n.color }}>{n.date.replace("\n", " ")}</div>
                    <h3 className="font-display font-semibold text-xl mb-2">{n.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{n.desc}</p>
                    <button className="mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors">Подробнее →</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Бармен-шоу highlight */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="aspect-video md:aspect-auto overflow-hidden">
                  <img src={IMG_BARTEN} alt="Бармен-шоу" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-primary mb-5 w-fit">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Каждые выходные
                  </div>
                  <h3 className="font-display font-bold text-3xl mb-4">БАРМЕН-ШОУ<br /><span className="gradient-text">ПМ|БАР</span></h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Каждые выходные для вас работает команда профессиональных барменов. Жонглирование, огненное шоу и авторские коктейли прямо у вас на глазах!
                  </p>
                  <button onClick={() => go("booking" as Section)}
                    className="px-6 py-3 rounded-xl font-display font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all neon-glow-orange w-fit">
                    Забронировать столик
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── КОНТАКТЫ ── */}
        {section === "contacts" && (
          <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">КОНТАКТЫ</h2>
            <p className="text-muted-foreground mb-10">Ждём вас в ПМ|БАР</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  { icon: "MapPin",  l: "Адрес",          v: "ул. Белинского, 61/1",     s: "Нижний Новгород" },
                  { icon: "Phone",   l: "Телефон / Бронь", v: "+7 (960) 179-09-89",       s: "Позвоните нам" },
                  { icon: "Clock",   l: "Пн — Четверг",    v: "12:00 — 03:00",            s: "" },
                  { icon: "Clock",   l: "Пятница, Суббота",v: "12:00 — 05:00",            s: "Работаем позже!" },
                  { icon: "Clock",   l: "Воскресенье",     v: "12:00 — 03:00",            s: "" },
                ].map((c, i) => (
                  <div key={i} className="glass glass-hover rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary/15 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={c.icon as "MapPin"} size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">{c.l}</div>
                      <div className="font-semibold">{c.v}</div>
                      {c.s && <div className="text-xs text-muted-foreground mt-0.5">{c.s}</div>}
                    </div>
                  </div>
                ))}

                <a href="tel:+79601790989"
                  className="flex items-center justify-center gap-3 py-4 rounded-2xl font-display font-semibold text-lg text-primary-foreground bg-primary hover:bg-primary/90 transition-all neon-glow-orange">
                  <Icon name="Phone" size={20} />
                  +7 (960) 179-09-89
                </a>
              </div>

              <div className="space-y-4">
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-xl mb-5">МЫ В СОЦСЕТЯХ</h3>
                  <div className="space-y-3">
                    {[
                      { name: "ВКонтакте",  handle: "vk.com/pivomanbar",    icon: "Users",  color: "var(--neon-cyan)" },
                      { name: "Telegram",   handle: "@pivomanbar",           icon: "Send",   color: "var(--neon-orange)" },
                      { name: "Instagram*", handle: "@pivoman_bar",          icon: "Camera", color: "var(--neon-pink)" },
                    ].map(s => (
                      <div key={s.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${s.color}20` }}>
                          <Icon name={s.icon as "Users"} size={18} style={{ color: s.color }} />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{s.name}</div>
                          <div className="text-xs text-muted-foreground">{s.handle}</div>
                        </div>
                        <Icon name="ExternalLink" size={13} className="text-muted-foreground ml-auto" />
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground mt-2">* — заблокирован в РФ</p>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-xl mb-3">КАК ДОБРАТЬСЯ</h3>
                  <div className="rounded-xl overflow-hidden aspect-video flex items-center justify-center bg-secondary/50">
                    <div className="text-center">
                      <Icon name="MapPin" size={36} className="mx-auto mb-2 text-primary" />
                      <p className="font-semibold">ул. Белинского, 61/1</p>
                      <p className="text-sm text-muted-foreground mt-1">Нижний Новгород</p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-5 border border-primary/15">
                  <div className="flex items-start gap-3">
                    <Icon name="MessageCircle" size={18} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-sm mb-1">Бронирование столика</div>
                      <p className="text-xs text-muted-foreground">Оставьте свои контакты — мы свяжемся с вами и подтвердим бронь</p>
                      <button onClick={() => go("booking" as Section)}
                        className="mt-3 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                        Форма бронирования →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── БРОНИРОВАНИЕ ── */}
        {section === ("booking" as Section) && (
          <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">БРОНИРОВАНИЕ</h2>
            <p className="text-muted-foreground mb-8">Оставьте контакты — мы свяжемся с вами</p>

            {bSuccess ? (
              <div className="glass rounded-2xl p-10 text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 neon-glow-orange">
                  <Icon name="CheckCircle2" size={40} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-3xl mb-3">Заявка принята!</h3>
                <p className="text-muted-foreground mb-2">Мы свяжемся с вами в течение 15 минут</p>
                <p className="text-sm text-muted-foreground mb-6">Или позвоните нам: <a href="tel:+79601790989" className="text-primary">+7 (960) 179-09-89</a></p>
                <button onClick={() => { setBSuccess(false); setBDate(""); setBTime(""); setBName(""); setBPhone(""); }}
                  className="px-6 py-2.5 rounded-xl glass border border-white/15 hover:border-primary/40 transition-all text-sm font-medium">
                  Новая бронь
                </button>
              </div>
            ) : (
              <div className="glass rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Дата</label>
                    <input type="date" value={bDate} min={new Date().toISOString().split("T")[0]}
                      onChange={e => setBDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Время</label>
                    <select value={bTime} onChange={e => setBTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground transition-colors">
                      <option value="">Выберите</option>
                      {["12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00","01:00","02:00"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Количество гостей</label>
                  <div className="flex gap-2 flex-wrap">
                    {["1","2","3","4","5","6","7","8+"].map(n => (
                      <button key={n} onClick={() => setBGuests(n)}
                        className={`w-12 h-12 rounded-xl font-semibold text-sm transition-all duration-200 ${
                          bGuests === n ? "bg-primary text-primary-foreground neon-glow-orange" : "glass border border-white/10 hover:border-primary/30"
                        }`}>{n}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Ваше имя</label>
                    <input type="text" value={bName} onChange={e => setBName(e.target.value)} placeholder="Иван"
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Телефон</label>
                    <input type="tel" value={bPhone} onChange={e => setBPhone(e.target.value)} placeholder="+7 (960) ..."
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors" />
                  </div>
                </div>

                <div className="glass rounded-xl p-4 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={16} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Или звоните напрямую: <a href="tel:+79601790989" className="text-primary font-medium">+7 (960) 179-09-89</a>
                    </p>
                  </div>
                </div>

                <button onClick={() => { if (bDate && bName && bPhone) setBSuccess(true); }}
                  disabled={!bDate || !bName || !bPhone}
                  className="w-full py-4 rounded-xl font-display font-semibold text-xl tracking-wide text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 neon-glow-orange">
                  ЗАБРОНИРОВАТЬ СТОЛИК
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* BOTTOM NAV mobile */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 glass border-t border-white/5 z-50">
        <div className="grid grid-cols-6 h-16">
          {nav.map(item => (
            <button key={item.id} onClick={() => go(item.id as Section)}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                section === item.id ? "text-primary" : "text-muted-foreground"
              }`}>
              <Icon name={item.icon} size={19} />
              <span className="text-[8px] font-medium leading-none">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
