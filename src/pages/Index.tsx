import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/92b71967-bc06-4657-b6e1-751f81336393.jpg";
const COCKTAILS_IMG = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/155a7c52-7292-4587-9810-1755c59bdcdd.jpg";
const FOOD_IMG = "https://cdn.poehali.dev/projects/090c5b8b-a1a3-4a28-9422-79e03db7a553/files/be43a8fb-c577-4f2e-b247-6d6a009abdd1.jpg";

type Section = "home" | "menu" | "booking" | "profile" | "news" | "contacts";

const menuFood = [
  { name: "Бургер ПМ", desc: "Говядина, соус барбекю, маринованный огурец", price: "690 ₽", tag: "Хит" },
  { name: "Том Ям", desc: "Классический тайский суп с морепродуктами", price: "590 ₽", tag: "" },
  { name: "Карпаччо из лосося", desc: "С каперсами, лимоном и зеленью", price: "750 ₽", tag: "Новинка" },
  { name: "Тар-тар из говядины", desc: "С трюфельным маслом и перепелиным яйцом", price: "890 ₽", tag: "" },
  { name: "Куриные крылышки", desc: "Острый маринад, соус Блю-чиз", price: "490 ₽", tag: "Хит" },
  { name: "Тирамису", desc: "Классический итальянский десерт", price: "390 ₽", tag: "" },
];

const menuAlcohol = [
  { name: "PM Sour", desc: "Виски, лимонный сок, яичный белок, биттер", price: "590 ₽", tag: "Подпись" },
  { name: "Neon Spritz", desc: "Апероль, просекко, апельсин", price: "490 ₽", tag: "" },
  { name: "Dark Mule", desc: "Тёмный ром, имбирное пиво, лайм", price: "520 ₽", tag: "Хит" },
  { name: "Smoke & Mirror", desc: "Мескаль, мёд, лайм, копчёная паприка", price: "650 ₽", tag: "Новинка" },
  { name: "Craft IPA", desc: "Местная пивоварня, 0.5л", price: "350 ₽", tag: "" },
  { name: "Вино дня", desc: "Красное/белое, сомелье рекомендует", price: "420 ₽", tag: "" },
];

const menuSoft = [
  { name: "Berry Smash", desc: "Свежие ягоды, лимон, мята, содовая", price: "320 ₽", tag: "Хит" },
  { name: "Matcha Latte", desc: "Японский матча, кокосовое молоко", price: "380 ₽", tag: "" },
  { name: "Mango Lassi", desc: "Манго, йогурт, кардамон, лёд", price: "340 ₽", tag: "Новинка" },
  { name: "Цитрусовый детокс", desc: "Апельсин, грейпфрут, имбирь", price: "290 ₽", tag: "" },
];

const events = [
  { date: "27 АПР", title: "Jazz Night", desc: "Живая джазовая музыка от квартета Алексея Петрова", tag: "Музыка", color: "var(--neon-orange)" },
  { date: "3 МАЙ", title: "Вечер виски", desc: "Дегустация 12 сортов односолодового виски с экспертом", tag: "Дегустация", color: "var(--neon-pink)" },
  { date: "10 МАЙ", title: "Stand-up", desc: "Открытый микрофон: молодые комики города", tag: "Комедия", color: "var(--neon-cyan)" },
  { date: "17 МАЙ", title: "DJ Sigma", desc: "Техно и дип-хаус сет от резидента клуба", tag: "Музыка", color: "var(--neon-orange)" },
];

const discounts = [
  { title: "Happy Hour", desc: "Коктейли −30% каждый будний день с 17:00 до 20:00", icon: "Clock" },
  { title: "День рождения", desc: "Именинникам торт и шампанское в подарок", icon: "Cake" },
  { title: "Бизнес-ланч", desc: "Суп + горячее + напиток всего за 490 ₽", icon: "Utensils" },
];

const orders = [
  { id: "#1042", date: "18 апр", items: "PM Sour × 2, Бургер ПМ", total: "1870 ₽", status: "Завершён" },
  { id: "#1038", date: "12 апр", items: "Крылышки, Tom Yam, Berry Smash", total: "1400 ₽", status: "Завершён" },
];

const reservations = [
  { id: "#B21", date: "24 апр, 20:00", guests: "4 чел", table: "Стол №7", status: "Подтверждено" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [menuTab, setMenuTab] = useState<"food" | "alcohol" | "soft">("food");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingGuests, setBookingGuests] = useState("2");
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const nav = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "menu", label: "Меню", icon: "UtensilsCrossed" },
    { id: "booking", label: "Бронь", icon: "CalendarDays" },
    { id: "news", label: "Новости", icon: "Newspaper" },
    { id: "contacts", label: "Контакты", icon: "MapPin" },
    { id: "profile", label: "Кабинет", icon: "User" },
  ] as const;

  const handleBooking = () => {
    if (bookingDate && bookingTime && bookingName && bookingPhone) {
      setBookingSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      {/* TOP NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setActiveSection("home")}
            className="font-display font-bold text-2xl tracking-widest gradient-text"
          >
            ПМ БАР
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Bell" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-16 pb-24 md:pb-8">

        {/* HOME */}
        {activeSection === "home" && (
          <div className="animate-fade-in">
            {/* Hero */}
            <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${HERO_IMG})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
                <div className="max-w-xl animate-slide-up">
                  <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-primary mb-6">
                    <span className="w-2 h-2 bg-primary rounded-full pulse-neon"></span>
                    Открыто до 03:00
                  </div>
                  <h1 className="font-display font-bold text-6xl md:text-8xl leading-none tracking-tight mb-4">
                    ТВОЁ<br />
                    <span className="gradient-text">МЕСТО</span>
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Авторская кухня, крафтовые коктейли<br />и атмосфера, которую хочется повторить
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveSection("booking")}
                      className="px-8 py-3 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-200 neon-glow-orange"
                    >
                      Забронировать стол
                    </button>
                    <button
                      onClick={() => setActiveSection("menu")}
                      className="px-8 py-3 rounded-xl font-semibold glass border border-white/15 hover:border-primary/40 transition-all duration-200"
                    >
                      Смотреть меню
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats bar */}
            <section className="border-y border-white/5 bg-card/50">
              <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { val: "2018", label: "Год открытия" },
                  { val: "120+", label: "Позиций в меню" },
                  { val: "4.9★", label: "Рейтинг гостей" },
                  { val: "03:00", label: "Работаем до" },
                ].map((s) => (
                  <div key={s.val} className="text-center">
                    <div className="font-display font-bold text-3xl text-neon-orange">{s.val}</div>
                    <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Discounts */}
            <section className="max-w-6xl mx-auto px-4 py-16">
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-display font-bold text-4xl">АКЦИИ <span className="text-neon-pink">&</span> СКИДКИ</h2>
                <button
                  onClick={() => setActiveSection("news")}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Все акции →
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {discounts.map((d) => (
                  <div key={d.title} className="glass glass-hover rounded-2xl p-6">
                    <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mb-4">
                      <Icon name={d.icon} size={22} className="text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-2">{d.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Events preview */}
            <section className="max-w-6xl mx-auto px-4 pb-16">
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-display font-bold text-4xl">БЛИЖАЙШИЕ <span className="gradient-text">СОБЫТИЯ</span></h2>
                <button
                  onClick={() => setActiveSection("news")}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Все события →
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {events.slice(0, 2).map((e) => (
                  <div
                    key={e.title}
                    className="glass glass-hover rounded-2xl p-6 flex gap-5 items-start cursor-pointer"
                    onClick={() => setActiveSection("news")}
                  >
                    <div
                      className="shrink-0 text-center px-4 py-3 rounded-xl font-display font-bold text-sm leading-tight"
                      style={{ background: `${e.color}20`, color: e.color, border: `1px solid ${e.color}30` }}
                    >
                      {e.date}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-semibold text-lg">{e.title}</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${e.color}20`, color: e.color }}
                        >
                          {e.tag}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Image gallery strip */}
            <section className="max-w-6xl mx-auto px-4 pb-16">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-video">
                  <img src={COCKTAILS_IMG} alt="Коктейли" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-video">
                  <img src={FOOD_IMG} alt="Кухня" className="w-full h-full object-cover" />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* MENU */}
        {activeSection === "menu" && (
          <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">МЕНЮ</h2>
            <p className="text-muted-foreground mb-8">Авторская кухня и коктейли от шеф-повара и бар-менеджера</p>

            <div className="flex gap-2 mb-8 p-1 glass rounded-xl w-fit">
              {[
                { key: "food", label: "🍽 Кухня" },
                { key: "alcohol", label: "🍹 Алкоголь" },
                { key: "soft", label: "🥤 Безалкогольные" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setMenuTab(t.key as "food" | "alcohol" | "soft")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    menuTab === t.key
                      ? "bg-primary text-primary-foreground neon-glow-orange"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(menuTab === "food" ? menuFood : menuTab === "alcohol" ? menuAlcohol : menuSoft).map((item) => (
                <div key={item.name} className="glass glass-hover rounded-2xl p-5">
                  {item.tag && (
                    <span className={`text-xs px-2 py-0.5 rounded-full mb-3 inline-block font-medium ${
                      item.tag === "Хит" ? "bg-primary/20 text-primary" :
                      item.tag === "Подпись" ? "bg-accent/20 text-accent" :
                      "bg-cyan-500/20 text-cyan-400"
                    }`}>
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
          </div>
        )}

        {/* BOOKING */}
        {activeSection === "booking" && (
          <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">БРОНИРОВАНИЕ</h2>
            <p className="text-muted-foreground mb-8">Выберите дату, время и количество гостей</p>

            {bookingSuccess ? (
              <div className="glass rounded-2xl p-10 text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 neon-glow-orange">
                  <Icon name="CheckCircle2" size={40} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-3xl mb-3">Бронь отправлена!</h3>
                <p className="text-muted-foreground mb-2">Мы позвоним вам для подтверждения в течение 15 минут</p>
                <p className="text-sm text-muted-foreground mb-6">Push-уведомление придёт сразу после подтверждения</p>
                <button
                  onClick={() => { setBookingSuccess(false); setBookingDate(""); setBookingTime(""); setBookingName(""); setBookingPhone(""); }}
                  className="px-6 py-2.5 rounded-xl glass border border-white/15 hover:border-primary/40 transition-all text-sm font-medium"
                >
                  Новая бронь
                </button>
              </div>
            ) : (
              <div className="glass rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Дата</label>
                    <input
                      type="date"
                      value={bookingDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Время</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground transition-colors"
                    >
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
                    {["1","2","3","4","5","6","7","8+"].map((n) => (
                      <button
                        key={n}
                        onClick={() => setBookingGuests(n)}
                        className={`w-12 h-12 rounded-xl font-semibold text-sm transition-all duration-200 ${
                          bookingGuests === n
                            ? "bg-primary text-primary-foreground neon-glow-orange"
                            : "glass border border-white/10 hover:border-primary/30"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Ваше имя</label>
                  <input
                    type="text"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="Алексей"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Телефон</label>
                  <input
                    type="tel"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors"
                  />
                </div>

                <div className="glass rounded-xl p-4 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Icon name="Bell" size={18} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      После подтверждения вы получите push-уведомление на телефон
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!bookingDate || !bookingTime || !bookingName || !bookingPhone}
                  className="w-full py-4 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 neon-glow-orange font-display text-lg tracking-wide"
                >
                  ЗАБРОНИРОВАТЬ СТОЛ
                </button>
              </div>
            )}
          </div>
        )}

        {/* NEWS */}
        {activeSection === "news" && (
          <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">НОВОСТИ <span className="gradient-text">&</span> СОБЫТИЯ</h2>
            <p className="text-muted-foreground mb-8">Мероприятия, акции и специальные предложения</p>

            <h3 className="font-display font-semibold text-2xl mb-4 text-muted-foreground">МЕРОПРИЯТИЯ</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {events.map((e) => (
                <div key={e.title} className="glass glass-hover rounded-2xl p-6 flex gap-5 items-start">
                  <div
                    className="shrink-0 text-center px-4 py-4 rounded-xl font-display font-bold text-sm leading-tight min-w-[64px]"
                    style={{ background: `${e.color}15`, color: e.color, border: `1px solid ${e.color}30` }}
                  >
                    {e.date}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-display font-semibold text-xl">{e.title}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${e.color}20`, color: e.color }}
                      >
                        {e.tag}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                    <button className="mt-3 text-sm font-medium" style={{ color: e.color }}>
                      Подробнее →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-display font-semibold text-2xl mb-4 text-muted-foreground">АКЦИИ</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {discounts.map((d) => (
                <div key={d.title} className="glass glass-hover rounded-2xl p-6">
                  <div className="w-12 h-12 bg-accent/15 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={d.icon} size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACTS */}
        {activeSection === "contacts" && (
          <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-2">КОНТАКТЫ</h2>
            <p className="text-muted-foreground mb-10">Мы всегда рады видеть вас</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  { icon: "MapPin", label: "Адрес", value: "ул. Большая Садовая, 12, Москва", sub: "м. Маяковская, 5 мин пешком" },
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67", sub: "Ежедневно 12:00 — 03:00" },
                  { icon: "Phone", label: "Бронирование", value: "+7 (495) 765-43-21", sub: "Приоритетная линия" },
                  { icon: "Mail", label: "Email", value: "hello@pm-bar.ru", sub: "Ответим в течение часа" },
                  { icon: "Clock", label: "Режим работы", value: "12:00 — 03:00", sub: "Без выходных" },
                ].map((c) => (
                  <div key={c.label} className="glass glass-hover rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary/15 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={c.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">{c.label}</div>
                      <div className="font-semibold">{c.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-xl mb-5">МЫ В СОЦСЕТЯХ</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Telegram", handle: "@pm_bar_msk", icon: "Send", color: "var(--neon-cyan)" },
                      { name: "ВКонтакте", handle: "vk.com/pm_bar", icon: "Users", color: "#4680C2" },
                      { name: "Instagram*", handle: "@pm_bar_moscow", icon: "Camera", color: "var(--neon-pink)" },
                      { name: "TikTok", handle: "@pm_bar", icon: "Music", color: "var(--neon-orange)" },
                    ].map((s) => (
                      <div
                        key={s.name}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: `${s.color}20` }}
                        >
                          <Icon name={s.icon} size={18} style={{ color: s.color }} />
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
                  <div className="rounded-xl overflow-hidden bg-secondary/50 aspect-video flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Icon name="MapPin" size={32} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm">ул. Большая Садовая, 12</p>
                      <p className="text-xs mt-1 text-muted-foreground">м. Маяковская, 5 мин</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeSection === "profile" && (
          <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
            <h2 className="font-display font-bold text-5xl mb-8">ЛИЧНЫЙ КАБИНЕТ</h2>

            <div className="glass rounded-2xl p-6 mb-6 flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-display font-bold text-3xl text-background shrink-0">
                АП
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-2xl">Алексей Петров</h3>
                <p className="text-muted-foreground text-sm">+7 (999) 123-45-67</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary/20 text-primary font-medium">
                    Гость Бара ★
                  </span>
                  <span className="text-xs text-muted-foreground">с апреля 2023</span>
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
                {reservations.map((r) => (
                  <div key={r.id} className="glass rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name="CalendarDays" size={18} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{r.date}</div>
                      <div className="text-sm text-muted-foreground">{r.guests} · {r.table}</div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 font-medium">
                      {r.status}
                    </span>
                  </div>
                ))}
                <button
                  onClick={() => setActiveSection("booking")}
                  className="w-full py-3 rounded-2xl glass border border-dashed border-white/15 hover:border-primary/40 text-sm text-muted-foreground hover:text-foreground transition-all"
                >
                  + Новая бронь
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-display font-semibold text-xl mb-3 text-muted-foreground">ИСТОРИЯ ЗАКАЗОВ</h3>
              <div className="space-y-3">
                {orders.map((o) => (
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

      {/* BOTTOM NAV (mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/5 z-50">
        <div className="grid grid-cols-6 h-16">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                activeSection === item.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-[9px] font-medium leading-none">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}