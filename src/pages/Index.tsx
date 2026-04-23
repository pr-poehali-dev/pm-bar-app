import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/7c5f6c2e-9603-43a8-ae4d-51e06a299ec1.jpg";
const IMG_BEER = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/38044e8e-708c-4975-a687-86a1053cf49f.jpg";
const IMG_FOOD = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/a88dedaf-a079-447e-833f-588479991bb9.jpg";

type Section = "home" | "menu" | "booking" | "profile" | "news" | "contacts";
type MenuTab = "beer" | "food" | "cocktails" | "soft";

const beerMenu = [
  { name: "Пивоман Светлое", style: "Лагер · 4.8% · 0.5л", price: "220 ₽", tag: "Хит", desc: "Мягкое, освежающее. Золотистый цвет, лёгкая хмелевая горчинка", abv: 4.8, ibu: 18 },
  { name: "Пивоман Тёмное", style: "Тёмный лагер · 5.2% · 0.5л", price: "240 ₽", tag: "", desc: "Насыщенный карамельно-солодовый вкус, тёмно-коричневый цвет", abv: 5.2, ibu: 25 },
  { name: "Пивоман Пшеничное", style: "Вайцен · 5.0% · 0.5л", price: "250 ₽", tag: "Новинка", desc: "Мутное пшеничное, нотки банана и гвоздики", abv: 5.0, ibu: 12 },
  { name: "Пивоман IPA", style: "India Pale Ale · 6.5% · 0.5л", price: "280 ₽", tag: "Крафт", desc: "Яркий тропический хоп-аромат, сухое горькое послевкусие", abv: 6.5, ibu: 55 },
  { name: "Пивоман Стаут", style: "Стаут · 5.8% · 0.5л", price: "260 ₽", tag: "", desc: "Кофейные и шоколадные ноты, кремовая пена, бархатная текстура", abv: 5.8, ibu: 35 },
  { name: "Сет «Пивоман»", style: "4 сорта × 0.3л", price: "520 ₽", tag: "Сет", desc: "Светлое + Тёмное + IPA + Пшеничное — попробуй все сорта", abv: 0, ibu: 0 },
];

const foodMenu = [
  { name: "Куриные крылья", desc: "BBQ или остро-медовые, 6 шт", price: "390 ₽", tag: "Хит" },
  { name: "Рыба & Чипсы", desc: "Треска в пивном кляре, картофель фри", price: "480 ₽", tag: "Хит" },
  { name: "Бургер Пивоман", desc: "Двойная котлета, чеддер, бекон, фирменный соус", price: "550 ₽", tag: "" },
  { name: "Колбаски гриль", desc: "Домашние, с горчицей и краутом", price: "420 ₽", tag: "" },
  { name: "Сырные палочки", desc: "Хрустящие, соус ранч, 8 шт", price: "320 ₽", tag: "" },
  { name: "Пивная тарелка", desc: "Крылья + колбаски + кольца + соусы. На компанию", price: "890 ₽", tag: "Для компании" },
];

const cocktailMenu = [
  { name: "Пивной шейк", desc: "Тёмное пиво, виски, мёд, лайм", price: "380 ₽", tag: "Подпись" },
  { name: "Michelada", desc: "Светлое пиво, томатный сок, специи", price: "340 ₽", tag: "" },
  { name: "Boilermaker", desc: "Виски + стакан крафтового IPA", price: "490 ₽", tag: "Классика" },
  { name: "Beer Mojito", desc: "Ром, лайм, мята, сахар, светлое пиво", price: "360 ₽", tag: "" },
  { name: "Whisky Sour", desc: "Бурбон, лимон, мёд, яичный белок", price: "420 ₽", tag: "" },
  { name: "Radler", desc: "Пшеничное пиво, лимонад, мята — лёгкий вариант", price: "290 ₽", tag: "Лёгкий" },
];

const softMenu = [
  { name: "Домашний лимонад", desc: "Клубника, апельсин или огурец-базилик", price: "220 ₽", tag: "Хит" },
  { name: "Имбирный эль", desc: "Свежий имбирь, лимон, мята, содовая", price: "200 ₽", tag: "" },
  { name: "Морс брусничный", desc: "Свежий, без сахара", price: "180 ₽", tag: "" },
  { name: "Кофе / Чай", desc: "Эспрессо, американо, латте / травяной, чёрный", price: "от 150 ₽", tag: "" },
];

const events = [
  { date: "27\nАПР", title: "Пивной квиз", desc: "Командная викторина + 3 сорта пива победителям. Регистрация обязательна.", tag: "Квиз", color: "var(--neon-orange)" },
  { date: "30\nАПР", title: "Живая музыка", desc: "Акустический вечер — кавер-группа «Вибрация». Вход свободный от заказа 500 ₽.", tag: "Музыка", color: "var(--neon-pink)" },
  { date: "9\nМАЙ", title: "Безлимит Пати", desc: "2 часа безлимитного крафта + горячая закуска. Бронь обязательна.", tag: "Вечеринка", color: "var(--neon-cyan)" },
  { date: "17\nМАЙ", title: "Мастер-класс", desc: "Варим крафт вместе с пивоваром — как создаётся наше Пшеничное. 6 мест.", tag: "МК", color: "var(--neon-orange)" },
];

const promos = [
  { title: "Меню-Квиз", desc: "Каждое воскресенье в 18:00. Участие бесплатно — победитель пьёт бесплатно!", icon: "Trophy" },
  { title: "Безлимит Пати", desc: "2 часа крафта без лимита + закуска — 990 ₽ с человека. Группы от 4 чел.", icon: "Beer" },
  { title: "Happy Hour", desc: "Пиво −30% каждый будний день с 16:00 до 19:00. Все сорта на кране.", icon: "Clock" },
  { title: "День рождения", desc: "Именинникам — бесплатная кружка фирменного светлого 0.5л в день рождения!", icon: "Cake" },
  { title: "Пати VIP", desc: "VIP-стол, личный бармен, приоритет — от 4000 ₽. Идеально для компании.", icon: "Star" },
  { title: "Супер Спешл", desc: "Акция каждой пятницы — следи в соцсетях. Всегда разные сюрпризы!", icon: "Zap" },
];

const myOrders = [
  { id: "#4871", date: "19 апр", items: "Светлое ×3, Крылья, Колбаски", total: "1360 ₽", status: "Завершён" },
  { id: "#4832", date: "12 апр", items: "Сет «Пивоман», Рыба & Чипсы", total: "1000 ₽", status: "Завершён" },
];

const myReservations = [
  { id: "#R88", date: "27 апр, 18:00", guests: "6 чел", zone: "Основной зал", status: "Подтверждено" },
];

const TAG_STYLES: Record<string, string> = {
  "Хит": "bg-primary/20 text-primary",
  "Новинка": "bg-green-500/20 text-green-400",
  "Крафт": "bg-cyan-500/20 text-cyan-400",
  "Сет": "bg-purple-500/20 text-purple-400",
  "Подпись": "bg-accent/20 text-accent",
  "Классика": "bg-cyan-500/20 text-cyan-400",
  "Лёгкий": "bg-green-500/20 text-green-400",
  "Для компании": "bg-primary/20 text-primary",
};

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [menuTab, setMenuTab] = useState<MenuTab>("beer");
  const [bDate, setBDate] = useState("");
  const [bTime, setBTime] = useState("");
  const [bGuests, setBGuests] = useState("2");
  const [bName, setBName] = useState("");
  const [bPhone, setBPhone] = useState("");
  const [bZone, setBZone] = useState("Основной зал");
  const [bComment, setBComment] = useState("");
  const [bSuccess, setBSuccess] = useState(false);

  const nav = [
    { id: "home",     label: "Главная",  icon: "Home" },
    { id: "menu",     label: "Меню",     icon: "UtensilsCrossed" },
    { id: "booking",  label: "Бронь",    icon: "CalendarDays" },
    { id: "news",     label: "Новости",  icon: "Newspaper" },
    { id: "contacts", label: "Контакты", icon: "MapPin" },
    { id: "profile",  label: "Кабинет",  icon: "User" },
  ] as const;

  const go = (s: Section) => setSection(s);

  const currentMenu = menuTab === "beer" ? beerMenu
    : menuTab === "food" ? foodMenu
    : menuTab === "cocktails" ? cocktailMenu
    : softMenu;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => go("home")} className="flex items-center gap-2.5">
            <span className="text-2xl">🍺</span>
            <div className="leading-none">
              <div className="font-display font-bold text-xl tracking-widest gradient-text">ПИВОМАН</div>
              <div className="text-[9px] text-muted-foreground tracking-[0.25em] uppercase">крафт-бар · Челябинск</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <button key={item.id} onClick={() => go(item.id as Section)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  section === item.id
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}>
                {item.label}
              </button>
            ))}
          </nav>

          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Bell" size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>
        </div>
      </header>

      <main className="pt-16 pb-24 md:pb-8">

        {/* ── HOME ── */}
        {section === "home" && (
          <div className="animate-fade-in">
            <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG_HERO})` }} />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
                <div className="max-w-xl animate-slide-up">
                  <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-primary mb-6">
                    <span className="w-2 h-2 bg-primary rounded-full pulse-neon" />
                    Открыто сегодня · до 03:00
                  </div>
                  <h1 className="font-display font-bold text-6xl md:text-8xl leading-none tracking-tight mb-4">
                    ПИВО<br />
                    <span className="gradient-text">МАН</span>
                  </h1>
                  <p className="text-lg text-muted-foreground mb-2 leading-relaxed">
                    Крафтовое пиво собственной варки · Закуски из живого огня · Квизы и живая музыка
                  </p>
                  <p className="text-sm text-muted-foreground/70 mb-8">
                    ул. Гагарина, 43, Челябинск · <span className="text-primary">+7 (351) 200-80-00</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => go("booking")}
                      className="px-8 py-3 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-200 neon-glow-orange">
                      Забронировать стол
                    </button>
                    <button onClick={() => go("menu")}
                      className="px-8 py-3 rounded-xl font-semibold glass border border-white/15 hover:border-primary/40 transition-all duration-200">
                      Смотреть меню 🍺
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-y border-white/5 bg-card/50">
              <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { v: "2017", l: "Год основания" },
                  { v: "8+", l: "Сортов крафта" },
                  { v: "4.8★", l: "Оценка гостей" },
                  { v: "03:00", l: "Работаем до" },
                ].map((s) => (
                  <div key={s.v} className="text-center">
                    <div className="font-display font-bold text-3xl text-neon-orange">{s.v}</div>
                    <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 py-16">
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-display font-bold text-4xl">АКЦИИ <span className="text-neon-pink">&</span> ФОРМАТЫ</h2>
                <button onClick={() => go("news")} className="text-sm text-primary hover:text-primary/80 transition-colors">Все акции →</button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {promos.map((p) => (
                  <div key={p.title} className="glass glass-hover rounded-2xl p-6">
                    <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mb-4">
                      <Icon name={p.icon as "Trophy"} size={22} className="text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 pb-16">
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-display font-bold text-4xl">БЛИЖАЙШИЕ <span className="gradient-text">СОБЫТИЯ</span></h2>
                <button onClick={() => go("news")} className="text-sm text-primary hover:text-primary/80 transition-colors">Все события →</button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {events.slice(0, 2).map((e) => (
                  <div key={e.title} onClick={() => go("news")}
                    className="glass glass-hover rounded-2xl p-6 flex gap-5 items-start cursor-pointer">
                    <div className="shrink-0 text-center px-4 py-3 rounded-xl font-display font-bold text-sm leading-tight whitespace-pre-line"
                      style={{ background: `${e.color}20`, color: e.color, border: `1px solid ${e.color}30` }}>
                      {e.date}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-semibold text-lg">{e.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${e.color}20`, color: e.color }}>{e.tag}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 pb-16">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-video">
                  <img src={IMG_BEER} alt="Крафтовое пиво" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-video">
                  <img src={IMG_FOOD} alt="Закуски" className="w-full h-full object-cover" />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ── MENU ── */}
        {section === "menu" && (
          <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">МЕНЮ</h2>
            <p className="text-muted-foreground mb-8">Крафтовое пиво собственной варки · Авторские закуски · Коктейли</p>

            <div className="flex gap-2 mb-8 p-1 glass rounded-xl w-fit flex-wrap">
              {([
                { k: "beer",      l: "🍺 Пиво" },
                { k: "food",      l: "🍖 Кухня" },
                { k: "cocktails", l: "🍹 Коктейли" },
                { k: "soft",      l: "🥤 Безалк" },
              ] as { k: MenuTab; l: string }[]).map(t => (
                <button key={t.k} onClick={() => setMenuTab(t.k)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    menuTab === t.k
                      ? "bg-primary text-primary-foreground neon-glow-orange"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>{t.l}</button>
              ))}
            </div>

            {menuTab === "beer" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {beerMenu.map((item) => (
                  <div key={item.name} className="glass glass-hover rounded-2xl p-5">
                    {item.tag && (
                      <span className={`text-xs px-2 py-0.5 rounded-full mb-3 inline-block font-medium ${TAG_STYLES[item.tag] ?? "bg-primary/20 text-primary"}`}>
                        {item.tag}
                      </span>
                    )}
                    <h3 className="font-display font-semibold text-lg mb-0.5">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{item.style}</p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.desc}</p>
                    {item.abv > 0 && (
                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="w-8">ABV</span>
                          <div className="flex-1 h-1.5 rounded-full bg-secondary">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(item.abv / 8 * 100, 100)}%` }} />
                          </div>
                          <span>{item.abv}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="w-8">IBU</span>
                          <div className="flex-1 h-1.5 rounded-full bg-secondary">
                            <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(item.ibu / 80 * 100, 100)}%` }} />
                          </div>
                          <span>{item.ibu}</span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neon-orange text-lg">{item.price}</span>
                      <button className="w-9 h-9 rounded-lg bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors">
                        <Icon name="Plus" size={16} className="text-primary" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {menuTab !== "beer" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentMenu.map((item) => (
                  <div key={item.name} className="glass glass-hover rounded-2xl p-5">
                    {"tag" in item && item.tag && (
                      <span className={`text-xs px-2 py-0.5 rounded-full mb-3 inline-block font-medium ${TAG_STYLES[item.tag] ?? "bg-primary/20 text-primary"}`}>
                        {item.tag}
                      </span>
                    )}
                    <h3 className="font-display font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neon-orange text-lg">{item.price}</span>
                      <button className="w-9 h-9 rounded-lg bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors">
                        <Icon name="Plus" size={16} className="text-primary" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── BOOKING ── */}
        {section === "booking" && (
          <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">БРОНИРОВАНИЕ</h2>
            <p className="text-muted-foreground mb-8">Выберите дату, время и количество гостей</p>

            {bSuccess ? (
              <div className="glass rounded-2xl p-10 text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 neon-glow-orange">
                  <Icon name="CheckCircle2" size={40} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-3xl mb-3">Бронь отправлена!</h3>
                <p className="text-muted-foreground mb-2">Мы позвоним для подтверждения в течение 15 минут</p>
                <p className="text-sm text-muted-foreground mb-6">Push-уведомление придёт сразу после подтверждения</p>
                <button onClick={() => { setBSuccess(false); setBDate(""); setBTime(""); setBName(""); setBPhone(""); setBComment(""); }}
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
                      {["12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"].map(t => (
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
                          bGuests === n
                            ? "bg-primary text-primary-foreground neon-glow-orange"
                            : "glass border border-white/10 hover:border-primary/30"
                        }`}>{n}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Зона</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Основной зал", "Барная стойка", "VIP-кабинет", "Летняя терраса"].map(z => (
                      <button key={z} onClick={() => setBZone(z)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          bZone === z
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "glass border border-white/8 text-muted-foreground hover:text-foreground"
                        }`}>{z}</button>
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
                    <input type="tel" value={bPhone} onChange={e => setBPhone(e.target.value)} placeholder="+7 (351) ..."
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Комментарий (необязательно)</label>
                  <textarea value={bComment} onChange={e => setBComment(e.target.value)} rows={2}
                    placeholder="День рождения, особые пожелания..."
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors resize-none" />
                </div>

                <div className="glass rounded-xl p-4 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Icon name="Bell" size={18} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">После подтверждения вы получите push-уведомление на телефон</p>
                  </div>
                </div>

                <button onClick={() => { if (bDate && bTime && bName && bPhone) setBSuccess(true); }}
                  disabled={!bDate || !bTime || !bName || !bPhone}
                  className="w-full py-4 rounded-xl font-display font-semibold text-lg tracking-wide text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 neon-glow-orange">
                  ЗАБРОНИРОВАТЬ СТОЛ
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── NEWS ── */}
        {section === "news" && (
          <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">НОВОСТИ <span className="gradient-text">&</span> СОБЫТИЯ</h2>
            <p className="text-muted-foreground mb-8">Мероприятия, акции и специальные предложения</p>

            <h3 className="font-display font-semibold text-2xl mb-4 text-muted-foreground">МЕРОПРИЯТИЯ</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {events.map((e) => (
                <div key={e.title} className="glass glass-hover rounded-2xl p-6 flex gap-5 items-start">
                  <div className="shrink-0 text-center px-4 py-4 rounded-xl font-display font-bold text-sm leading-tight min-w-[64px] whitespace-pre-line"
                    style={{ background: `${e.color}15`, color: e.color, border: `1px solid ${e.color}30` }}>
                    {e.date}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-display font-semibold text-xl">{e.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${e.color}20`, color: e.color }}>{e.tag}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                    <button className="mt-3 text-sm font-medium" style={{ color: e.color }}>Подробнее →</button>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-display font-semibold text-2xl mb-4 text-muted-foreground">АКЦИИ</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {promos.map((p) => (
                <div key={p.title} className="glass glass-hover rounded-2xl p-6">
                  <div className="w-12 h-12 bg-accent/15 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={p.icon as "Trophy"} size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CONTACTS ── */}
        {section === "contacts" && (
          <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">КОНТАКТЫ</h2>
            <p className="text-muted-foreground mb-10">Мы всегда рады видеть вас</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  { icon: "MapPin", l: "Адрес", v: "ул. Гагарина, 43, Челябинск", s: "Центральный район" },
                  { icon: "Phone", l: "Телефон", v: "+7 (351) 200-80-00", s: "Ежедневно 12:00 — 03:00" },
                  { icon: "Phone", l: "Бронирование", v: "+7 (351) 200-80-01", s: "Приоритетная линия" },
                  { icon: "Mail", l: "Email", v: "info@pivomanbar.ru", s: "Ответим в течение часа" },
                  { icon: "Clock", l: "Режим работы", v: "12:00 — 03:00", s: "Без выходных" },
                ].map((c) => (
                  <div key={c.l} className="glass glass-hover rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary/15 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={c.icon as "MapPin"} size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">{c.l}</div>
                      <div className="font-semibold">{c.v}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{c.s}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-xl mb-5">МЫ В СОЦСЕТЯХ</h3>
                  <div className="space-y-3">
                    {[
                      { name: "ВКонтакте", handle: "vk.com/pivomanbar", icon: "Users", color: "var(--neon-cyan)" },
                      { name: "Telegram", handle: "@pivomanbar", icon: "Send", color: "var(--neon-orange)" },
                      { name: "Instagram*", handle: "@pivoman_bar", icon: "Camera", color: "var(--neon-pink)" },
                      { name: "TikTok", handle: "@pivoman.bar", icon: "Music", color: "var(--neon-orange)" },
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
                        <Icon name="ExternalLink" size={14} className="text-muted-foreground ml-auto" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">* — заблокирован в РФ</p>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-xl mb-3">КАК ДОБРАТЬСЯ</h3>
                  <div className="rounded-xl overflow-hidden aspect-video flex items-center justify-center bg-secondary/50">
                    <div className="text-center text-muted-foreground">
                      <Icon name="MapPin" size={32} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm">ул. Гагарина, 43, Челябинск</p>
                      <p className="text-xs mt-1 text-muted-foreground">Центральный район</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PROFILE ── */}
        {section === "profile" && (
          <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-8">ЛИЧНЫЙ КАБИНЕТ</h2>

            <div className="glass rounded-2xl p-6 mb-6 flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-bold text-3xl text-primary-foreground shrink-0"
                style={{ background: "linear-gradient(135deg, #FF8C00, #FF3C7D)" }}>
                ИК
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-2xl">Иван Краснов</h3>
                <p className="text-muted-foreground text-sm">+7 (351) 987-65-43</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary/20 text-primary font-medium">🍺 Пивоман Premium</span>
                  <span className="text-xs text-muted-foreground">с 2022 года</span>
                </div>
              </div>
              <button className="p-2 glass rounded-xl hover:bg-white/10 transition-colors">
                <Icon name="Settings" size={18} className="text-muted-foreground" />
              </button>
            </div>

            <div className="glass rounded-2xl p-5 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Icon name="Bell" size={18} className="text-accent" />
                </div>
                <div>
                  <div className="font-medium text-sm">Push-уведомления</div>
                  <div className="text-xs text-muted-foreground">Брони, готовность блюд, акции</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer pulse-neon">
                <div className="w-5 h-5 bg-background rounded-full absolute top-0.5 right-0.5" />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-display font-semibold text-xl mb-3 text-muted-foreground">БРОНИ</h3>
              <div className="space-y-3">
                {myReservations.map(r => (
                  <div key={r.id} className="glass rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name="CalendarDays" size={18} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{r.date}</div>
                      <div className="text-sm text-muted-foreground">{r.guests} · {r.zone}</div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 font-medium">{r.status}</span>
                  </div>
                ))}
                <button onClick={() => go("booking")}
                  className="w-full py-3 rounded-2xl glass border border-dashed border-white/15 hover:border-primary/40 text-sm text-muted-foreground hover:text-foreground transition-all">
                  + Новая бронь
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-display font-semibold text-xl mb-3 text-muted-foreground">ИСТОРИЯ ЗАКАЗОВ</h3>
              <div className="space-y-3">
                {myOrders.map(o => (
                  <div key={o.id} className="glass rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-semibold">{o.id}</span>
                        <span className="text-xs text-muted-foreground">{o.date}</span>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{o.status}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">{o.items}</div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neon-orange">{o.total}</span>
                      <button className="text-xs text-primary hover:text-primary/80 transition-colors">Повторить заказ</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
              <Icon name={item.icon} size={20} />
              <span className="text-[9px] font-medium leading-none">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
