import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/84b70900-4a28-4564-af81-e069d7135e03/files/a0b7a494-9aa2-4fab-abf4-07d13271bbae.jpg";

const NAV_LINKS = [
  { id: "about", label: "О отряде" },
  { id: "help", label: "Как помочь" },
  { id: "stories", label: "Истории" },
  { id: "volunteers", label: "Волонтёры" },
  { id: "blog", label: "Блог" },
  { id: "contacts", label: "Контакты" },
];

const STATS = [
  { value: "847", label: "спасённых жизней" },
  { value: "12", label: "лет работы" },
  { value: "320+", label: "волонтёров" },
  { value: "2400", label: "выездов" },
];

const HOW_TO_HELP = [
  {
    icon: "Heart",
    title: "Стать волонтёром",
    desc: "Присоединитесь к нашей команде — заполните анкету, пройдите обучение и выезжайте на поиски вместе с нами.",
  },
  {
    icon: "DollarSign",
    title: "Поддержать финансово",
    desc: "Ваше пожертвование помогает закупать оборудование, оплачивать топливо и обучение новых участников.",
  },
  {
    icon: "Share2",
    title: "Рассказать друзьям",
    desc: "Поделитесь нашими объявлениями о поиске — иногда одна репост меняет исход всей операции.",
  },
  {
    icon: "Package",
    title: "Передать снаряжение",
    desc: "Фонарики, термосы, рации, аптечки — любое снаряжение для поисков будет кстати.",
  },
];

const STORIES = [
  {
    name: "Дедушка Василий, 78 лет",
    place: "Смоленская область",
    text: "Вышел за грибами и потерялся в лесу. Наш отряд нашёл его через 14 часов — живым и здоровым. Семья плакала от радости.",
    icon: "🌲",
    color: "bg-green-50",
  },
  {
    name: "Маленькая Аня, 4 года",
    place: "г. Калуга",
    text: "Девочка ушла с детской площадки незамеченной. Благодаря быстрой реакции и слаженной работе 40 волонтёров нашли её за 3 часа.",
    icon: "🌟",
    color: "bg-amber-50",
  },
  {
    name: "Михаил, турист",
    place: "Карелия",
    text: "Сломал ногу на маршруте. Поисковый отряд добрался до него через горную реку и организовал эвакуацию вертолётом.",
    icon: "⛰️",
    color: "bg-blue-50",
  },
];

const VOLUNTEERS_LIST = [
  { name: "Анна Соколова", role: "Командир отряда", years: "8 лет", icon: "👩‍💼" },
  { name: "Дмитрий Орлов", role: "Кинолог", years: "5 лет", icon: "🐕" },
  { name: "Мария Белова", role: "Медик отряда", years: "6 лет", icon: "👩‍⚕️" },
  { name: "Алексей Крылов", role: "Картограф", years: "3 года", icon: "🗺️" },
  { name: "Светлана Новак", role: "PR и коммуникации", years: "4 года", icon: "📢" },
  { name: "Игорь Лесной", role: "Технический эксперт", years: "7 лет", icon: "🔧" },
];

const BLOG_POSTS = [
  {
    date: "28 марта 2026",
    title: "Как правильно вести себя в лесу: памятка для родителей",
    excerpt: "Каждое лето мы выезжаем на десятки поисков. Рассказываем, что нужно знать, чтобы не потеряться.",
    tag: "Советы",
  },
  {
    date: "14 марта 2026",
    title: "Отчёт о зимнем сезоне: 23 успешных поиска",
    excerpt: "Подводим итоги зимы — сложнейшего периода для поисковых операций. Все найдены живыми.",
    tag: "Отчёт",
  },
  {
    date: "2 февраля 2026",
    title: "Новое оборудование — дроны с тепловизором",
    excerpt: "Благодаря вашим пожертвованиям мы приобрели два профессиональных дрона для ночных поисков.",
    tag: "Новости",
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", city: "", motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(36,33%,97%)" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border warm-shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-display text-2xl font-bold text-terracotta tracking-tight"
          >
            ❤️ Отряд
          </button>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="font-body text-sm font-medium text-foreground/70 hover:text-terracotta transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("join")}
              className="bg-terracotta text-white font-body text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Вступить
            </button>
          </div>

          <button
            className="md:hidden p-2 text-terracotta"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => { scrollTo(l.id); setMenuOpen(false); }}
                className="font-body text-left text-sm font-medium text-foreground/70 hover:text-terracotta transition-colors py-1"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => { scrollTo("join"); setMenuOpen(false); }}
              className="bg-terracotta text-white font-body text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-center mt-2"
            >
              Вступить в отряд
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(80,30,15,0.72) 0%, rgba(20,10,5,0.45) 100%)" }} />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in">
          <div className="inline-block bg-white/15 backdrop-blur-sm text-white text-sm font-body font-medium px-4 py-1.5 rounded-full mb-6 border border-white/25">
            Поисково-спасательный добровольческий отряд
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Вместе мы<br />
            <span style={{ color: "hsl(38,90%,72%)" }}>находим путь домой</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-white/85 mb-10 max-w-xl mx-auto leading-relaxed">
            Когда кто-то теряется — мы идём искать. Каждый день. В любую погоду. Потому что каждый человек важен.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("join")}
              className="bg-terracotta text-white font-body font-semibold text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105 warm-shadow"
            >
              Стать волонтёром
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="bg-white/15 backdrop-blur-sm text-white font-body font-semibold text-lg px-8 py-4 rounded-xl border border-white/30 hover:bg-white/25 transition-all"
            >
              Узнать о нас
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2">
          <span className="font-body text-xs">листайте вниз</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-terracotta">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2">{s.value}</div>
              <div className="font-body text-sm text-white/75">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-terracotta font-body text-sm font-semibold uppercase tracking-widest mb-3">О нас</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Мы — сердце<br />добровольческого<br />движения
              </h2>
              <p className="font-body text-foreground/70 text-lg leading-relaxed mb-6">
                Наш отряд основан в 2014 году. За это время мы провели тысячи поисковых операций и вернули сотни людей домой. Мы работаем бесплатно — только из любви к людям.
              </p>
              <p className="font-body text-foreground/70 text-lg leading-relaxed mb-8">
                В нашей команде — кинологи, медики, картографы, IT-специалисты и просто неравнодушные люди. Нас объединяет одно: вера в то, что каждая жизнь бесценна.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Поиск людей", "Горный спасотряд", "Кинологи", "Ночные операции", "Дроны"].map((tag) => (
                  <span key={tag} className="bg-terracotta-light text-terracotta font-body text-sm px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden warm-shadow aspect-square flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(15,60%,88%) 0%, hsl(38,60%,88%) 100%)" }}
              >
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🤝</div>
                  <p className="font-display text-2xl font-semibold text-terracotta">Вместе сильнее</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gold text-white font-body font-semibold px-6 py-3 rounded-xl warm-shadow">
                С 2014 года
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider mx-8" />

      {/* HOW TO HELP */}
      <section id="help" className="py-24 px-4 bg-warm-sand">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-terracotta font-body text-sm font-semibold uppercase tracking-widest mb-3">Как помочь</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Каждый вклад важен
            </h2>
            <p className="font-body text-foreground/60 text-lg mt-4 max-w-xl mx-auto">
              Не нужно быть профессионалом — нужно просто хотеть помочь
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {HOW_TO_HELP.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 card-hover warm-shadow">
                <div className="w-14 h-14 bg-terracotta-light rounded-xl flex items-center justify-center mb-6">
                  <Icon name={item.icon} size={28} className="text-terracotta" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="font-body text-foreground/65 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => scrollTo("join")}
              className="bg-terracotta text-white font-body font-semibold text-lg px-10 py-4 rounded-xl hover:opacity-90 transition-all warm-shadow"
            >
              Присоединиться к отряду →
            </button>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section id="stories" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-terracotta font-body text-sm font-semibold uppercase tracking-widest mb-3">Истории успеха</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Эти истории<br />изменили жизни
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STORIES.map((s) => (
              <div key={s.name} className={`${s.color} rounded-2xl p-8 card-hover border border-border`}>
                <div className="text-5xl mb-5">{s.icon}</div>
                <p className="font-body text-foreground/75 leading-relaxed mb-6 italic">"{s.text}"</p>
                <div className="border-t border-border/50 pt-4">
                  <div className="font-body font-semibold text-foreground">{s.name}</div>
                  <div className="font-body text-sm text-foreground/50 flex items-center gap-1 mt-1">
                    <Icon name="MapPin" size={13} />
                    {s.place}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider mx-8" />

      {/* VOLUNTEERS */}
      <section id="volunteers" className="py-24 px-4 bg-warm-sand">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-terracotta font-body text-sm font-semibold uppercase tracking-widest mb-3">Команда</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Люди, которые спасают
            </h2>
            <p className="font-body text-foreground/60 text-lg mt-4">
              Знакомьтесь с костяком нашего отряда
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {VOLUNTEERS_LIST.map((v) => (
              <div key={v.name} className="bg-white rounded-2xl p-6 text-center card-hover warm-shadow">
                <div className="text-5xl mb-4">{v.icon}</div>
                <div className="font-display text-xl font-bold text-foreground mb-1">{v.name}</div>
                <div className="font-body text-sm text-terracotta font-medium mb-2">{v.role}</div>
                <div className="font-body text-xs text-foreground/45 flex items-center justify-center gap-1">
                  <Icon name="Clock" size={12} />
                  В отряде {v.years}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="font-body text-foreground/60 mb-4">И ещё 310+ замечательных людей</p>
            <button
              onClick={() => scrollTo("join")}
              className="border-2 border-terracotta text-terracotta font-body font-semibold px-8 py-3 rounded-xl hover:bg-terracotta hover:text-white transition-all"
            >
              Стать одним из них
            </button>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-terracotta font-body text-sm font-semibold uppercase tracking-widest mb-3">Блог</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Новости и советы
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <div key={post.title} className="bg-white rounded-2xl overflow-hidden card-hover warm-shadow border border-border">
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, hsl(15,60%,88%) 0%, hsl(38,60%,88%) 100%)" }}
                >
                  <Icon name="BookOpen" size={48} className="text-terracotta opacity-50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-terracotta-light text-terracotta font-body text-xs px-2.5 py-1 rounded-full font-medium">{post.tag}</span>
                    <span className="font-body text-xs text-foreground/40">{post.date}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 leading-snug">{post.title}</h3>
                  <p className="font-body text-sm text-foreground/60 leading-relaxed">{post.excerpt}</p>
                  <button className="mt-4 font-body text-sm text-terracotta font-semibold hover:underline flex items-center gap-1">
                    Читать далее <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN FORM */}
      <section id="join" className="py-24 px-4 bg-terracotta">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Вступить в отряд
            </h2>
            <p className="font-body text-white/80 text-lg">
              Заполните анкету — мы свяжемся с вами в течение 2 рабочих дней
            </p>
          </div>

          {submitted ? (
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/25">
              <div className="text-7xl mb-6">🎉</div>
              <h3 className="font-display text-3xl font-bold text-white mb-4">Заявка принята!</h3>
              <p className="font-body text-white/80 text-lg">
                Спасибо, {formData.name}! Мы свяжемся с вами по номеру {formData.phone} в ближайшие дни.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 flex flex-col gap-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-body text-sm text-white/80 mb-1.5 block">Имя и фамилия *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Иван Иванов"
                    className="w-full bg-white/90 text-foreground font-body rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50 placeholder:text-foreground/40"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-white/80 mb-1.5 block">Телефон *</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    placeholder="+7 (999) 000-00-00"
                    className="w-full bg-white/90 text-foreground font-body rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50 placeholder:text-foreground/40"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-body text-sm text-white/80 mb-1.5 block">Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    placeholder="ivan@mail.ru"
                    className="w-full bg-white/90 text-foreground font-body rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50 placeholder:text-foreground/40"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-white/80 mb-1.5 block">Город</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    placeholder="Москва"
                    className="w-full bg-white/90 text-foreground font-body rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50 placeholder:text-foreground/40"
                  />
                </div>
              </div>
              <div>
                <label className="font-body text-sm text-white/80 mb-1.5 block">Почему хотите вступить?</label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleFormChange}
                  rows={4}
                  placeholder="Расскажите немного о себе и своей мотивации..."
                  className="w-full bg-white/90 text-foreground font-body rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50 placeholder:text-foreground/40 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-terracotta font-body font-bold text-lg py-4 rounded-xl hover:bg-white/90 transition-all warm-shadow"
              >
                Отправить заявку
              </button>
              <p className="font-body text-xs text-white/50 text-center">
                Отправляя форму, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-terracotta font-body text-sm font-semibold uppercase tracking-widest mb-3">Контакты</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Свяжитесь с нами
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (800) 123-45-67", sub: "Круглосуточно" },
              { icon: "Mail", title: "Email", value: "help@otryad.ru", sub: "Ответим за 24 часа" },
              { icon: "MapPin", title: "Адрес", value: "ул. Добровольческая, 12", sub: "г. Москва" },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 text-center card-hover warm-shadow border border-border">
                <div className="w-14 h-14 bg-terracotta-light rounded-xl flex items-center justify-center mx-auto mb-5">
                  <Icon name={c.icon} size={26} className="text-terracotta" />
                </div>
                <div className="font-display text-xl font-bold text-foreground mb-2">{c.title}</div>
                <div className="font-body text-foreground/80 font-medium">{c.value}</div>
                <div className="font-body text-sm text-foreground/45 mt-1">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "hsl(20,20%,18%)" }} className="text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <div className="font-display text-2xl font-bold mb-2">❤️ Отряд</div>
              <div className="font-body text-white/55 text-sm max-w-xs">
                Поисково-спасательный добровольческий отряд. Работаем с 2014 года.
              </div>
            </div>
            <div className="flex flex-wrap gap-5 justify-center">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="font-body text-sm text-white/55 hover:text-white transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="font-body text-white/40 text-sm">© 2026 Волонтёрский отряд. Все права защищены.</div>
            <div className="font-body text-white/40 text-sm">Некоммерческая организация</div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;