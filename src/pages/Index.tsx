import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/84b70900-4a28-4564-af81-e069d7135e03/files/e1996ee1-7c0d-4bf8-922c-9a4ff67aa661.jpg";

const NAV_LINKS = [
  { id: "about", label: "О отряде" },
  { id: "help", label: "Как помочь" },
  { id: "stories", label: "Истории" },
  { id: "volunteers", label: "Волонтёры" },
  { id: "blog", label: "Блог" },
  { id: "contacts", label: "Контакты" },
];

const STATS = [
  { value: "1 200+", label: "людей получили помощь" },
  { value: "5", label: "лет работы" },
  { value: "47", label: "волонтёров" },
  { value: "312", label: "выездов по городу" },
];

const HOW_TO_HELP = [
  {
    icon: "Heart",
    title: "Стать волонтёром",
    desc: "Присоединитесь к нам — заполните анкету и выходите с нами на раздачи еды, тёплой одежды и предметов первой необходимости.",
  },
  {
    icon: "HandCoins",
    title: "Пожертвовать",
    desc: "Даже небольшая сумма позволяет купить горячую еду, термобельё или медикаменты для человека, которому некуда идти.",
  },
  {
    icon: "Shirt",
    title: "Передать вещи",
    desc: "Тёплая одежда, одеяла, обувь, средства гигиены — всё это принимаем в пунктах сбора по всей Кинешме.",
  },
  {
    icon: "Share2",
    title: "Рассказать друзьям",
    desc: "Расскажите о нас — чем больше людей знает об отряде, тем больше помощи мы можем оказать тем, кто в ней нуждается.",
  },
];

const STORIES = [
  {
    name: "Николай, 58 лет",
    place: "г. Кинешма",
    text: "Три зимы провёл на улице. Ребята из «Рук добра» не просто накормили — помогли восстановить документы и найти временное жильё.",
    icon: "🏠",
    color: "bg-orange-50",
  },
  {
    name: "Татьяна, 43 года",
    place: "г. Кинешма",
    text: "Оказалась на улице после пожара. Волонтёры привезли одежду, еду, а потом помогли связаться с социальной службой.",
    icon: "🔥",
    color: "bg-amber-50",
  },
  {
    name: "Александр, 65 лет",
    place: "г. Кинешма",
    text: "Пожилой мужчина без родственников. Каждую неделю ребята привозят ему еду и лекарства — он говорит, что это единственные люди, которые о нём помнят.",
    icon: "💛",
    color: "bg-yellow-50",
  },
];

const VOLUNTEERS_LIST = [
  { name: "Ольга Смирнова", role: "Руководитель отряда", years: "5 лет", icon: "👩‍💼" },
  { name: "Андрей Захаров", role: "Координатор выездов", years: "4 года", icon: "🚗" },
  { name: "Елена Фёдорова", role: "Медицинская помощь", years: "3 года", icon: "👩‍⚕️" },
  { name: "Сергей Платонов", role: "Сбор вещей и продуктов", years: "5 лет", icon: "📦" },
  { name: "Наталья Козлова", role: "Соцсети и реклама", years: "2 года", icon: "📱" },
  { name: "Виктор Морозов", role: "Связь с соцслужбами", years: "4 года", icon: "🤝" },
];

const BLOG_POSTS = [
  {
    date: "1 апреля 2026",
    title: "Весенняя раздача: 200 порций горячего супа за один вечер",
    excerpt: "В начале апреля мы провели большой выезд на набережную. Рассказываем, как это было и чем вы можете помочь.",
    tag: "Репортаж",
  },
  {
    date: "15 марта 2026",
    title: "Как мы собрали 150 пакетов с вещами за неделю",
    excerpt: "После одного поста в соцсетях жители Кинешмы откликнулись так, что не хватило машин для вывоза. Спасибо вам!",
    tag: "Итоги",
  },
  {
    date: "2 марта 2026",
    title: "Зима позади: итоги самого трудного сезона",
    excerpt: "Зима — самое опасное время для людей без крова. Рассказываем, сколько человек мы поддержали этой зимой.",
    tag: "Отчёт",
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", motivation: "",
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
            className="font-display text-xl md:text-2xl font-bold text-terracotta tracking-tight flex items-center gap-2"
          >
            🤲 Руки добра
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
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(70,25,10,0.78) 0%, rgba(15,8,3,0.40) 100%)" }} />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in">
          <div className="inline-block bg-white/15 backdrop-blur-sm text-white text-sm font-body font-medium px-4 py-1.5 rounded-full mb-6 border border-white/25">
            Общественный отряд помощи бездомным · г. Кинешма
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Руки добра —<br />
            <span style={{ color: "hsl(38,90%,72%)" }}>тепло для каждого</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-white/85 mb-10 max-w-xl mx-auto leading-relaxed">
            Мы верим: каждый человек достоин заботы и уважения. Выходим на улицы Кинешмы, чтобы никто не остался один на один с бедой.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("join")}
              className="bg-terracotta text-white font-body font-semibold text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105 warm-shadow"
            >
              Стать волонтёром
            </button>
            <button
              onClick={() => scrollTo("help")}
              className="bg-white/15 backdrop-blur-sm text-white font-body font-semibold text-lg px-8 py-4 rounded-xl border border-white/30 hover:bg-white/25 transition-all"
            >
              Как помочь
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
              <div className="font-display text-3xl md:text-5xl font-bold text-white mb-2">{s.value}</div>
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
                Мы — соседи.<br />Мы — горожане.<br />Мы — рядом.
              </h2>
              <p className="font-body text-foreground/70 text-lg leading-relaxed mb-6">
                «Руки добра» — общественный волонтёрский отряд города Кинешмы Ивановской области. Мы основаны в 2021 году обычными жителями города, которые не могли пройти мимо.
              </p>
              <p className="font-body text-foreground/70 text-lg leading-relaxed mb-8">
                Каждую неделю мы выходим на улицы с горячей едой, тёплой одеждой и простым человеческим участием. Помогаем не только едой — помогаем восстановить документы, связаться с социальными службами, найти ночлег.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Горячее питание", "Одежда и обувь", "Медпомощь", "Документы", "Ночлег", "Психологическая поддержка"].map((tag) => (
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
                  <div className="text-8xl mb-4">🤲</div>
                  <p className="font-display text-2xl font-semibold text-terracotta">Протянуть руку</p>
                  <p className="font-body text-foreground/60 mt-2 text-sm">— это всегда правильно</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gold text-white font-body font-semibold px-6 py-3 rounded-xl warm-shadow text-sm">
                г. Кинешма с 2021 года
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
              Каждый вклад<br />меняет чью-то жизнь
            </h2>
            <p className="font-body text-foreground/60 text-lg mt-4 max-w-xl mx-auto">
              Не нужно быть героем — нужно просто захотеть сделать добро
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
            <div className="text-terracotta font-body text-sm font-semibold uppercase tracking-widest mb-3">Истории</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Настоящие люди.<br />Настоящие перемены.
            </h2>
            <p className="font-body text-foreground/55 text-lg mt-4 max-w-lg mx-auto">
              Имена изменены, но каждая история — правда
            </p>
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
            <div className="text-terracotta font-body text-sm font-semibold uppercase tracking-widest mb-3">Наша команда</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Обычные люди,<br />делающие необычное
            </h2>
            <p className="font-body text-foreground/60 text-lg mt-4">
              Среди нас — врачи, учителя, студенты и пенсионеры
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
            <p className="font-body text-foreground/60 mb-4">И ещё десятки неравнодушных кинешемцев</p>
            <button
              onClick={() => scrollTo("join")}
              className="border-2 border-terracotta text-terracotta font-body font-semibold px-8 py-3 rounded-xl hover:bg-terracotta hover:text-white transition-all"
            >
              Стать частью команды
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
              Новости и репортажи
            </h2>
            <p className="font-body text-foreground/55 mt-4 text-lg">Следите за нашей работой</p>
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
              Заполните анкету — мы напишем вам в ближайшие дни и расскажем, как присоединиться
            </p>
          </div>

          {submitted ? (
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/25">
              <div className="text-7xl mb-6">🤲</div>
              <h3 className="font-display text-3xl font-bold text-white mb-4">Заявка принята!</h3>
              <p className="font-body text-white/80 text-lg">
                Спасибо, {formData.name}! Мы свяжемся с вами по номеру {formData.phone}. Добро пожаловать в «Руки добра»!
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
              <div>
                <label className="font-body text-sm text-white/80 mb-1.5 block">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="ivan@mail.ru"
                  className="w-full bg-white/90 text-foreground font-body rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50 placeholder:text-foreground/40"
                />
              </div>
              <div>
                <label className="font-body text-sm text-white/80 mb-1.5 block">Почему хотите помогать?</label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleFormChange}
                  rows={4}
                  placeholder="Расскажите немного о себе — чем хотите помочь, сколько времени готовы уделять..."
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
            <p className="font-body text-foreground/55 text-lg mt-4">Мы в Кинешме — всегда на связи</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (xxx) xxx-xx-xx", sub: "Ежедневно с 9:00 до 21:00" },
              { icon: "Mail", title: "Email", value: "rukidobra@mail.ru", sub: "Ответим в течение суток" },
              { icon: "MapPin", title: "Город", value: "г. Кинешма", sub: "Ивановская область" },
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

          {/* Extra CTA */}
          <div
            className="mt-12 rounded-2xl p-8 md:p-12 text-center"
            style={{ background: "linear-gradient(135deg, hsl(15,60%,88%) 0%, hsl(38,60%,88%) 100%)" }}
          >
            <div className="text-5xl mb-4">💛</div>
            <h3 className="font-display text-3xl font-bold text-foreground mb-3">
              Есть вещи или продукты для передачи?
            </h3>
            <p className="font-body text-foreground/70 text-lg mb-6 max-w-md mx-auto">
              Напишите нам — мы организуем самовывоз или подскажем ближайший пункт сбора в вашем районе Кинешмы.
            </p>
            <button
              onClick={() => scrollTo("join")}
              className="bg-terracotta text-white font-body font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-all warm-shadow"
            >
              Написать нам
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "hsl(20,20%,18%)" }} className="text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <div className="font-display text-2xl font-bold mb-2">🤲 Руки добра</div>
              <div className="font-body text-white/55 text-sm max-w-xs">
                Общественный отряд помощи бездомным. г. Кинешма, Ивановская область. С 2021 года.
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
            <div className="font-body text-white/40 text-sm">© 2026 Отряд «Руки добра». Все права защищены.</div>
            <div className="font-body text-white/40 text-sm">Некоммерческая общественная организация</div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
