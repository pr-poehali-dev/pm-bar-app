import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/7c5f6c2e-9603-43a8-ae4d-51e06a299ec1.jpg";
const IMG_BEER = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/38044e8e-708c-4975-a687-86a1053cf49f.jpg";
const IMG_FOOD = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/a88dedaf-a079-447e-833f-588479991bb9.jpg";

type Section = "home" | "menu" | "booking" | "profile" | "news" | "contacts";
type MenuTab = "beer" | "food" | "cocktails" | "soft";

const beerMenu = [
  { name: "Пивоман Светлое", style: "Лагер", abv: "4.8%", ibu: 18, price: "220 ₽", vol: "0.5л", tag: "Хит", desc: "Мягкое, освежающее. Золотистый цвет, лёгкая хмелевая горчинка" },
  { name: "Пивоман Тёмное", style: "Тёмный лагер", abv: "5.2%", ibu: 25, price: "240 ₽", vol: "0.5л", tag: "", desc: "Насыщенный карамельно-солодовый вкус, тёмно-коричневый цвет" },
  { name: "Пивоман Пшеничное", style: "Вайцен", abv: "5.0%", ibu: 12, price: "250 ₽", vol: "0.5л", tag: "Новинка", desc: "Мутное пшеничное, нотки банана и гвоздики" },
  { name: "Пивоман IPA", style: "India Pale Ale", abv: "6.5%", ibu: 55, price: "280 ₽", vol: "0.5л", tag: "Крафт", desc: "Яркий тропический хоп-аромат, сухое горькое послевкусие" },
  { name: "Пивоман Стаут", style: "Стаут", abv: "5.8%", ibu: 35, price: "260 ₽", vol: "0.5л", tag: "", desc: "Кофейные и шоколадные ноты, кремовая пена, бархатная текстура" },
  { name: "Пивоман Янтарное", style: "Янтарный эль", abv: "5.4%", ibu: 30, price: "250 ₽", vol: "0.5л", tag: "", desc: "Карамельная солодовость в балансе с горечью, медово-янтарный цвет" },
  { name: "Сет «Пивоман»", style: "4 сорта по 0.3л", abv: "—", ibu: 0, price: "520 ₽", vol: "1.2л", tag: "Сет", desc: "Светлое + Тёмное + IPA + Пшеничное — попробуй всё!" },
  { name: "Пиво дня", style: "Меняется ежедневно", abv: "?%", ibu: 0, price: "от 190 ₽", vol: "0.5л", tag: "Выбор дня", desc: "Спроси у бармена — каждый день новый гость из кег" },
];

const foodMenu = [
  { name: "Куриные крылья", desc: "BBQ или остро-медовые, 6 шт", price: "390 ₽", tag: "Хит" },
  { name: "Сырные палочки", desc: "Хрустящие, соус ранч, 8 шт", price: "320 ₽", tag: "" },
  { name: "Нячос с гуаком", desc: "Тортилья, авокадо, сальса, сметана", price: "350 ₽", tag: "" },
  { name: "Колбаски гриль", desc: "Домашние, с горчицей и краутом", price: "420 ₽", tag: "Хит" },
  { name: "Рыба & Чипсы", desc: "Треска в пивном кляре, картофель фри", price: "480 ₽", tag: "Хит" },
  { name: "Луковые кольца", desc: "Хрустящие, соус барбекю", price: "280 ₽", tag: "" },
  { name: "Бургер Пивоман", desc: "Двойная котлета, чеддер, бекон, соус", price: "550 ₽", tag: "Сытный" },
  { name: "Пивная тарелка", desc: "Крылья + колбаски + кольца + соусы", price: "890 ₽", tag: "Для компании" },
];

const cocktailMenu = [
  { name: "Пивной шейк", desc: "Тёмное пиво, виски, мёд, лайм", price: "380 ₽", tag: "Подпись" },
  { name: "Michelada", desc: "Светлое пиво, томатный сок, специи", price: "340 ₽", tag: "" },
  { name: "Radler", desc: "Пшеничное пиво, лимонад, мята", price: "290 ₽", tag: "Лёгкий" },
  { name: "Boilermaker", desc: "Виски + стакан крафтового IPA", price: "490 ₽", tag: "Классика" },
  { name: "Beer Mojito", desc: "Ром, лайм, мята, сахар, светлое пиво", price: "360 ₽", tag: "" },
  { name: "Whisky Sour", desc: "Бурбон, лимон, мёд, яичный белок", price: "420 ₽", tag: "" },
];

const softMenu = [
  { name: "Домашний лимонад", desc: "Клубника, апельсин или огурец-базилик", price: "220 ₽", tag: "Хит" },
  { name: "Имбирный эль", desc: "Свежий имбирь, лимон, мята, содовая", price: "200 ₽", tag: "" },
  { name: "Морс брусничный", desc: "Свежий, без сахара", price: "180 ₽", tag: "" },
  { name: "Кофе / чай", desc: "Эспрессо, американо, латте / травяной, чёрный", price: "от 150 ₽", tag: "" },
];

const events = [
  { date: "27\nАПР", title: "Пивной квиз", desc: "Командная викторина + 3 сорта пива за столиком в подарок победителям. Регистрация обязательна.", tag: "Квиз", color: "#F59E0B" },
  { date: "30\nАПР", title: "Живая музыка", desc: "Акустический вечер — кавер-группа «Вибрация». Вход свободный от заказа от 500 ₽.", tag: "Музыка", color: "#84CC16" },
  { date: "9\nМАЙ", title: "Пати-формат", desc: "Безлимитное пиво на 2 часа + горячая закуска. Бронь стола обязательна.", tag: "Вечеринка", color: "#F87171" },
  { date: "17\nМАЙ", title: "Мастер-класс", desc: "Варим крафт вместе с пивоваром — как создаётся наше Пшеничное. 6 мест.", tag: "МК", color: "#93C5FD" },
];

const promos = [
  { title: "Меню-Квиз", desc: "Каждое воскресенье 18:00. Участие бесплатно — побеждает лучший знаток пива!", icon: "Trophy", color: "#F59E0B" },
  { title: "Безлимит Пати", desc: "2 часа безлимитного крафта + закуска — 990 ₽ с человека. Группы от 4 чел.", icon: "Beer", color: "#84CC16" },
  { title: "Пати Безлимит", desc: "VIP-стол, приоритетное обслуживание, личный бармен — от 4000 ₽", icon: "Star", color: "#93C5FD" },
  { title: "Супер Спешл", desc: "Акция недели — уточняй у бармена или в соцсетях. Каждую пятницу!", icon: "Zap", color: "#F87171" },
  { title: "Happy Hour", desc: "Пиво −30% каждый будний день 16:00–19:00. Все сорта на кране.", icon: "Clock", color: "#F59E0B" },
  { title: "День рождения", desc: "Именинникам — бесплатная кружка фирменного светлого 0.5л в день рождения!", icon: "Cake", color: "#F87171" },
];

const myOrders = [
  { id: "#4871", date: "19 апр", items: "Светлое ×3, Крылья, Колбаски", total: "1360 ₽", status: "Завершён" },
  { id: "#4832", date: "12 апр", items: "Сет «Пивоман», Рыба & Чипсы", total: "1000 ₽", status: "Завершён" },
];

const myReservations = [
  { id: "#R88", date: "27 апр, 18:00", guests: "6 чел", zone: "Основной зал", status: "Подтверждено" },
];

const tagClass: Record<string, string> = {
  "Хит": "tag-amber",
  "Новинка": "tag-green",
  "Крафт": "tag-blue",
  "Сет": "tag-blue",
  "Выбор дня": "tag-red",
  "Подпись": "tag-amber",
  "Лёгкий": "tag-green",
  "Классика": "tag-blue",
  "Сытный": "tag-red",
  "Для компании": "tag-amber",
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
  const [bSuccess, setBSuccess] = useState(false);
  const [bComment, setBComment] = useState("");

  const nav = [
    { id: "home",     label: "Главная",  icon: "Home" },
    { id: "menu",     label: "Меню",     icon: "UtensilsCrossed" },
    { id: "booking",  label: "Бронь",    icon: "CalendarDays" },
    { id: "news",     label: "Новости",  icon: "Newspaper" },
    { id: "contacts", label: "Контакты", icon: "MapPin" },
    { id: "profile",  label: "Кабинет",  icon: "User" },
  ] as const;

  const go = (s: Section) => setSection(s);

  const handleBook = () => {
    if (bDate && bTime && bName && bPhone) setBSuccess(true);
  };

  const menuItems = menuTab === "beer" ? beerMenu : menuTab === "food" ? foodMenu : menuTab === "cocktails" ? cocktailMenu : softMenu;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => go("home")} className="flex items-center gap-2.5">
            <span className="text-3xl">🍺</span>
            <div className="leading-none">
              <div className="font-display font-bold text-xl tracking-widest gradient-text">ПИВОМАН</div>
              <div className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">крафт-бар</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id as Section)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  section === item.id
                    ? "bg-primary/15 text-primary border border-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
            <Icon name="Bell" size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full pulse-amber" />
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="pt-16 pb-24 md:pb-0">

        {/* ── HOME ── */}
        {section === "home" && (
          <div className="animate-fade-in">

            {/* Hero */}
            <section className="relative min-h-[92vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG_HERO})` }} />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

              <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
                <div className="max-w-lg animate-slide-up">
                  <div className="inline-flex items-center gap-2 glass-amber px-3.5 py-1.5 rounded-full text-xs font-medium text-primary mb-6"
                    style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                    <span className="w-2 h-2 bg-primary rounded-full pulse-amber" />
                    Открыто сегодня · до 03:00
                  </div>

                  <h1 className="font-display font-bold text-7xl md:text-9xl leading-[0.9] tracking-tight mb-6">
                    <span className="gradient-text-light block" style={{
                      background: "linear-gradient(135deg, #FEF3C7, #F59E0B)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>ПИВО</span>
                    <span className="text-foreground/90">МАН</span>
                  </h1>

                  <p className="text-base text-muted-foreground mb-3 leading-relaxed">
                    Крафтовые сорта собственной варки · Закуски из живого огня · Квизы и живая музыка
                  </p>
                  <p className="text-sm text-muted-foreground/70 mb-8">
                    ул. Гагарина, 43 · Челябинск · <span className="text-primary">+7 (351) 200-80-00</span>
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => go("booking")}
                      className="px-7 py-3.5 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all amber-glow font-display tracking-wide"
                    >
                      Забронировать стол
                    </button>
                    <button
                      onClick={() => go("menu")}
                      className="px-7 py-3.5 rounded-xl font-semibold glass border border-white/12 hover:border-primary/30 transition-all"
                    >
                      Смотреть меню 🍺
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute right-8 bottom-12 hidden lg:block glass rounded-2xl p-5 text-center"
                style={{ border: "1px solid rgba(245,158,11,0.2)", background: "rgba(245,158,11,0.06)" }}>
                <div className="font-display font-bold text-4xl gradient-text">8+</div>
                <div className="text-xs text-muted-foreground mt-1">сортов пива<br/>на кране</div>
              </div>
            </section>

            {/* Stats */}
            <div className="divider-amber opacity-40" />
            <section className="bg-card/40">
              <div className="max-w-6xl mx-auto px-4 py-7 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { v: "2017", l: "Год основания" },
                  { v: "8+", l: "Сортов крафта" },
                  { v: "4.8★", l: "Оценка гостей" },
                  { v: "03:00", l: "Работаем до" },
                ].map((s) => (
                  <div key={s.v} className="text-center">
                    <div className="font-display font-bold text-3xl text-amber">{s.v}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </section>
            <div className="divider-amber opacity-40" />

            {/* Beer showcase */}
            <section className="max-w-6xl mx-auto px-4 py-14">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="text-xs tracking-[0.2em] text-primary uppercase mb-3 font-medium">Наша гордость</div>
                  <h2 className="font-display font-bold text-5xl mb-4">КРАФТ<br /><span className="gradient-text">СОБСТВЕННОЙ</span><br />ВАРКИ</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Мы варим пиво сами — с 2017 года. Светлое, тёмное, пшеничное, IPA и стаут. 
                    Всё свежее, без консервантов. Меняем сезонные сорта каждые 2–3 месяца.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Светлое 4.8%", "Тёмное 5.2%", "IPA 6.5%", "Пшеничное 5.0%", "Стаут 5.8%"].map(b => (
                      <span key={b} className="text-xs px-3 py-1.5 rounded-full tag-amber">{b}</span>
                    ))}
                  </div>
                  <button onClick={() => go("menu")} className="px-6 py-2.5 rounded-xl bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25 transition-all text-sm font-semibold">
                    Всё меню пива →
                  </button>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                  <img src={IMG_BEER} alt="Крафтовое пиво" className="w-full h-full object-cover" />
                </div>
              </div>
            </section>

            {/* Promos strip */}
            <section className="max-w-6xl mx-auto px-4 pb-14">
              <div className="flex items-end justify-between mb-6">
                <h2 className="font-display font-bold text-4xl">АКЦИИ <span className="gradient-text">&</span> ФОРМАТЫ</h2>
                <button onClick={() => go("news")} className="text-sm text-primary hover:text-primary/80 transition-colors">Все →</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {promos.slice(0, 6).map((p) => (
                  <div key={p.title} className="glass card-hover rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${p.color}18`, border: `1px solid ${p.color}30` }}>
                      <Icon name={p.icon as "Trophy"} size={18} style={{ color: p.color }} />
                    </div>
                    <div className="font-display font-semibold text-base mb-1">{p.title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Events preview */}
            <section className="max-w-6xl mx-auto px-4 pb-14">
              <div className="flex items-end justify-between mb-6">
                <h2 className="font-display font-bold text-4xl">СОБЫТИЯ</h2>
                <button onClick={() => go("news")} className="text-sm text-primary hover:text-primary/80 transition-colors">Все →</button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {events.slice(0, 2).map((e) => (
                  <div key={e.title} onClick={() => go("news")}
                    className="glass card-hover rounded-2xl p-5 flex gap-4 cursor-pointer">
                    <div className="shrink-0 w-14 text-center py-3 rounded-xl font-display font-bold text-sm whitespace-pre-line leading-tight"
                      style={{ background: `${e.color}15`, color: e.color, border: `1px solid ${e.color}30` }}>
                      {e.date}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-semibold text-lg">{e.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${e.color}18`, color: e.color }}>{e.tag}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Food photo */}
            <section className="max-w-6xl mx-auto px-4 pb-14">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                  <img src={IMG_FOOD} alt="Закуски" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs tracking-[0.2em] text-primary uppercase mb-3 font-medium">Кухня бара</div>
                  <h2 className="font-display font-bold text-4xl mb-4">ЕДА ДЛЯ<br /><span className="gradient-text">НАСТОЯЩЕГО</span><br />ВЕЧЕРА</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    Крылья, колбаски с гриля, рыба в пивном кляре, бургеры — всё, что нужно под хорошее пиво.
                    Пивная тарелка на компанию — наша визитная карточка.
                  </p>
                  <button onClick={() => go("menu")} className="px-6 py-2.5 rounded-xl bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25 transition-all text-sm font-semibold">
                    Меню кухни →
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ── MENU ── */}
        {section === "menu" && (
          <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
            <div className="mb-8">
              <h2 className="font-display font-bold text-5xl mb-2">МЕНЮ</h2>
              <p className="text-muted-foreground">Крафтовое пиво собственной варки · Авторские закуски · Коктейли</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1.5 mb-8 p-1 glass rounded-xl w-fit flex-wrap">
              {([
                { k: "beer", l: "🍺 Пиво" },
                { k: "food", l: "🍖 Кухня" },
                { k: "cocktails", l: "🍹 Коктейли" },
                { k: "soft", l: "🥤 Безалк" },
              ] as { k: MenuTab; l: string }[]).map(t => (
                <button key={t.k} onClick={() => setMenuTab(t.k)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    menuTab === t.k ? "bg-primary text-primary-foreground amber-glow" : "text-muted-foreground hover:text-foreground"
                  }`}>
                  {t.l}
                </button>
              ))}
            </div>

            {/* Beer tab — special layout with ABV/IBU */}
            {menuTab === "beer" && (
              <div className="grid md:grid-cols-2 gap-4">
                {beerMenu.map((item) => (
                  <div key={item.name} className="glass card-hover rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        {item.tag && (
                          <span className={`text-xs px-2 py-0.5 rounded-full mr-2 inline-block font-medium ${tagClass[item.tag] ?? "tag-amber"}`}>{item.tag}</span>
                        )}
                      </div>
                      <span className="font-bold text-amber text-lg shrink-0">{item.price}</span>
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-0.5">{item.name}</h3>
                    <div className="text-xs text-muted-foreground mb-2">{item.style} · {item.vol}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                    {item.ibu > 0 && (
                      <div className="flex gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1.5 rounded-full bg-secondary">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(parseFloat(item.abv) / 8 * 100, 100)}%` }} />
                          </div>
                          <span className="text-muted-foreground">ABV {item.abv}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1.5 rounded-full bg-secondary">
                            <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(item.ibu / 80 * 100, 100)}%` }} />
                          </div>
                          <span className="text-muted-foreground">IBU {item.ibu}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Other tabs */}
            {menuTab !== "beer" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                  <div key={item.name} className="glass card-hover rounded-2xl p-5">
                    {"tag" in item && item.tag && (
                      <span className={`text-xs px-2 py-0.5 rounded-full mb-3 inline-block font-medium ${tagClass[item.tag] ?? "tag-amber"}`}>{item.tag}</span>
                    )}
                    <h3 className="font-display font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber text-lg">{item.price}</span>
                      <button className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                        style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.25)" }}>
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
            <p className="text-muted-foreground mb-8">Забронируйте стол — мы будем ждать</p>

            {bSuccess ? (
              <div className="glass rounded-2xl p-10 text-center" style={{ border: "1px solid rgba(245,158,11,0.2)" }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 pulse-amber"
                  style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}>
                  <Icon name="CheckCircle2" size={38} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-3xl mb-3">Заявка принята!</h3>
                <p className="text-muted-foreground mb-1">Подтвердим бронь звонком в течение 15 минут</p>
                <p className="text-sm text-muted-foreground mb-6">Push-уведомление придёт сразу после подтверждения</p>
                <button onClick={() => { setBSuccess(false); setBDate(""); setBTime(""); setBName(""); setBPhone(""); setBComment(""); }}
                  className="px-6 py-2.5 rounded-xl glass border border-white/12 hover:border-primary/30 transition-all text-sm font-medium">
                  Новая бронь
                </button>
              </div>
            ) : (
              <div className="glass rounded-2xl p-7 space-y-5" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-2 uppercase tracking-wide">Дата</label>
                    <input type="date" value={bDate} min={new Date().toISOString().split("T")[0]}
                      onChange={e => setBDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-2 uppercase tracking-wide">Время</label>
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
                  <label className="text-xs text-muted-foreground block mb-2 uppercase tracking-wide">Гостей</label>
                  <div className="flex gap-2 flex-wrap">
                    {["1","2","3","4","5","6","7","8+"].map(n => (
                      <button key={n} onClick={() => setBGuests(n)}
                        className={`w-11 h-11 rounded-xl font-semibold text-sm transition-all ${
                          bGuests === n ? "bg-primary text-primary-foreground amber-glow" : "glass border border-white/10 hover:border-primary/25"
                        }`}>{n}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground block mb-2 uppercase tracking-wide">Зона</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Основной зал", "Барная стойка", "VIP-кабинет", "Летняя терраса"].map(z => (
                      <button key={z} onClick={() => setBZone(z)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          bZone === z ? "bg-primary/20 text-primary border border-primary/30" : "glass border border-white/8 text-muted-foreground hover:text-foreground"
                        }`}>{z}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-2 uppercase tracking-wide">Имя</label>
                    <input type="text" value={bName} onChange={e => setBName(e.target.value)} placeholder="Иван"
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-2 uppercase tracking-wide">Телефон</label>
                    <input type="tel" value={bPhone} onChange={e => setBPhone(e.target.value)} placeholder="+7 (351) ..."
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground block mb-2 uppercase tracking-wide">Комментарий (необязательно)</label>
                  <textarea value={bComment} onChange={e => setBComment(e.target.value)} rows={2}
                    placeholder="День рождения, особые пожелания..."
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors resize-none" />
                </div>

                <div className="rounded-xl p-4 flex items-start gap-3"
                  style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.18)" }}>
                  <Icon name="Bell" size={16} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    После подтверждения брони вы получите push-уведомление на телефон
                  </p>
                </div>

                <button onClick={handleBook}
                  disabled={!bDate || !bTime || !bName || !bPhone}
                  className="w-full py-4 rounded-xl font-display font-semibold text-lg tracking-wide text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-35 disabled:cursor-not-allowed transition-all amber-glow">
                  ЗАБРОНИРОВАТЬ
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── NEWS ── */}
        {section === "news" && (
          <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">НОВОСТИ</h2>
            <p className="text-muted-foreground mb-10">Мероприятия, акции и специальные форматы</p>

            <h3 className="font-display text-xl text-muted-foreground mb-4 tracking-widest">СОБЫТИЯ</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {events.map((e) => (
                <div key={e.title} className="glass card-hover rounded-2xl p-6 flex gap-4">
                  <div className="shrink-0 w-16 text-center py-3 rounded-xl font-display font-bold text-sm whitespace-pre-line leading-tight"
                    style={{ background: `${e.color}12`, color: e.color, border: `1px solid ${e.color}28` }}>
                    {e.date}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-display font-semibold text-xl">{e.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${e.color}18`, color: e.color }}>{e.tag}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                    <button className="mt-3 text-xs font-semibold" style={{ color: e.color }}>Подробнее →</button>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-display text-xl text-muted-foreground mb-4 tracking-widest">АКЦИИ</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {promos.map((p) => (
                <div key={p.title} className="glass card-hover rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${p.color}15`, border: `1px solid ${p.color}28` }}>
                    <Icon name={p.icon as "Trophy"} size={20} style={{ color: p.color }} />
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
          <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">КОНТАКТЫ</h2>
            <p className="text-muted-foreground mb-10">Найдите нас — мы рядом</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {[
                  { icon: "MapPin", l: "Адрес", v: "ул. Гагарина, 43, Челябинск", s: "Рядом с ост. Гагарина" },
                  { icon: "Phone", l: "Телефон", v: "+7 (351) 200-80-00", s: "Ежедневно 12:00–03:00" },
                  { icon: "Phone", l: "Бронирование", v: "+7 (351) 200-80-01", s: "Приоритетная линия" },
                  { icon: "Mail", l: "Email", v: "info@pivomanbar.ru", s: "Ответим в течение часа" },
                  { icon: "Clock", l: "Режим работы", v: "12:00 — 03:00", s: "Без выходных" },
                ].map((c) => (
                  <div key={c.l} className="glass card-hover rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}>
                      <Icon name={c.icon as "MapPin"} size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wide">{c.l}</div>
                      <div className="font-semibold">{c.v}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{c.s}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="glass rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h3 className="font-display font-semibold text-xl mb-5 tracking-wide">МЫ В СОЦСЕТЯХ</h3>
                  <div className="space-y-2">
                    {[
                      { name: "ВКонтакте", handle: "vk.com/pivomanbar", icon: "Users", color: "#4680C2" },
                      { name: "Telegram", handle: "@pivomanbar", icon: "Send", color: "#F59E0B" },
                      { name: "Instagram*", handle: "@pivoman_bar", icon: "Camera", color: "#E1306C" },
                      { name: "TikTok", handle: "@pivoman.bar", icon: "Music", color: "#84CC16" },
                    ].map(s => (
                      <div key={s.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/4 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${s.color}18` }}>
                          <Icon name={s.icon as "Users"} size={17} style={{ color: s.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{s.name}</div>
                          <div className="text-xs text-muted-foreground">{s.handle}</div>
                        </div>
                        <Icon name="ExternalLink" size={13} className="text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">* — заблокирован в РФ</p>
                </div>

                <div className="glass rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h3 className="font-display font-semibold text-xl mb-3 tracking-wide">КАК ДОБРАТЬСЯ</h3>
                  <div className="rounded-xl overflow-hidden aspect-video flex items-center justify-center"
                    style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)" }}>
                    <div className="text-center">
                      <Icon name="MapPin" size={32} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">ул. Гагарина, 43, Челябинск</p>
                      <p className="text-xs text-muted-foreground mt-1">Центральный район</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PROFILE ── */}
        {section === "profile" && (
          <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-8">КАБИНЕТ</h2>

            {/* Profile */}
            <div className="glass rounded-2xl p-6 mb-5 flex items-center gap-5"
              style={{ border: "1px solid rgba(245,158,11,0.15)" }}>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-bold text-3xl text-primary-foreground shrink-0"
                style={{ background: "linear-gradient(135deg, #F59E0B, #B45309)" }}>
                ИК
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-2xl">Иван Краснов</h3>
                <p className="text-muted-foreground text-sm">+7 (351) 987-65-43</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs px-2.5 py-1 rounded-full tag-amber font-medium">🍺 Пивоман Premium</span>
                  <span className="text-xs text-muted-foreground">с 2022 года</span>
                </div>
              </div>
              <button className="p-2 glass rounded-xl hover:bg-white/8 transition-colors">
                <Icon name="Settings" size={17} className="text-muted-foreground" />
              </button>
            </div>

            {/* Notifications */}
            <div className="glass rounded-2xl p-5 mb-5 flex items-center justify-between"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <Icon name="Bell" size={17} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Push-уведомления</div>
                  <div className="text-xs text-muted-foreground">Брони, готовность, акции и квизы</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer pulse-amber shrink-0">
                <div className="w-5 h-5 bg-background rounded-full absolute top-0.5 right-0.5" />
              </div>
            </div>

            {/* Reservations */}
            <h3 className="font-display text-lg text-muted-foreground mb-3 tracking-widest">БРОНИ</h3>
            <div className="space-y-3 mb-6">
              {myReservations.map(r => (
                <div key={r.id} className="glass rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(245,158,11,0.12)" }}>
                    <Icon name="CalendarDays" size={17} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{r.date}</div>
                    <div className="text-xs text-muted-foreground">{r.guests} · {r.zone}</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full tag-green font-medium">{r.status}</span>
                </div>
              ))}
              <button onClick={() => go("booking")}
                className="w-full py-3 rounded-2xl glass border border-dashed border-white/12 hover:border-primary/30 text-sm text-muted-foreground hover:text-foreground transition-all">
                + Новая бронь
              </button>
            </div>

            {/* Orders */}
            <h3 className="font-display text-lg text-muted-foreground mb-3 tracking-widest">ИСТОРИЯ ЗАКАЗОВ</h3>
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
                    <span className="font-bold text-amber">{o.total}</span>
                    <button className="text-xs text-primary hover:text-primary/80 transition-colors">Повторить →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* BOTTOM NAV mobile */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 glass border-t border-white/5 z-50">
        <div className="grid grid-cols-6 h-16">
          {nav.map(item => (
            <button key={item.id} onClick={() => go(item.id as Section)}
              className={`flex flex-col items-center justify-center gap-1 transition-all ${
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
