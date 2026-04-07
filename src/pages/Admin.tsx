import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const API = "https://functions.poehali.dev/9854621a-b99f-401b-9a90-435de6504277";

const TAGS = ["Репортаж", "Итоги", "Отчёт", "Новости", "Советы"];
const ICONS = ["🐕", "🐱", "🐈", "🦮", "🐶", "🐾", "🐇", "🦜"];
const COLORS = [
  { label: "Оранжевый", value: "bg-orange-50" },
  { label: "Янтарный", value: "bg-amber-50" },
  { label: "Жёлтый", value: "bg-yellow-50" },
  { label: "Зелёный", value: "bg-green-50" },
  { label: "Синий", value: "bg-blue-50" },
];
const STATUS_LABELS: Record<string, string> = {
  new: "Новая",
  contacted: "Связались",
  joined: "Вступил",
  declined: "Отказал",
};
const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  joined: "bg-green-100 text-green-700",
  declined: "bg-gray-100 text-gray-500",
};

type Tab = "blog" | "stories" | "applications";

interface BlogPost { id: number; title: string; excerpt: string; content: string; tag: string; published_at: string; }
interface Story { id: number; name: string; place: string; story: string; icon: string; color: string; }
interface Application { id: number; name: string; phone: string; email: string; motivation: string; status: string; created_at: string; }

async function apiFetch(resource: string, options?: RequestInit) {
  const sep = options?.method === 'GET' || !options?.method ? '?' : '?';
  const url = `${API}?resource=${resource}`;
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
  return res.json();
}

export default function Admin() {
  const [tab, setTab] = useState<Tab>("blog");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  const [blogForm, setBlogForm] = useState({ id: 0, title: "", excerpt: "", content: "", tag: "Новости", published_at: new Date().toISOString().slice(0, 10) });
  const [storyForm, setStoryForm] = useState({ id: 0, name: "", place: "г. Кинешма", story: "", icon: "🐾", color: "bg-orange-50" });
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showStoryForm, setShowStoryForm] = useState(false);

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    setLoading(true);
    const [b, s, a] = await Promise.all([
      apiFetch("blog"),
      apiFetch("stories"),
      apiFetch("applications"),
    ]);
    setPosts(b); setStories(s); setApps(a);
    setLoading(false);
  }

  async function saveBlog() {
    if (blogForm.id) {
      await apiFetch("blog", { method: "PUT", body: JSON.stringify(blogForm) });
    } else {
      await apiFetch("blog", { method: "POST", body: JSON.stringify(blogForm) });
    }
    setShowBlogForm(false);
    setBlogForm({ id: 0, title: "", excerpt: "", content: "", tag: "Новости", published_at: new Date().toISOString().slice(0, 10) });
    const b = await apiFetch("blog");
    setPosts(b);
  }

  async function deleteBlog(id: number) {
    if (!confirm("Удалить запись?")) return;
    await apiFetch(`blog&id=${id}`, { method: "DELETE" });
    const b = await apiFetch("blog");
    setPosts(b);
  }

  async function saveStory() {
    if (storyForm.id) {
      await apiFetch("stories", { method: "PUT", body: JSON.stringify(storyForm) });
    } else {
      await apiFetch("stories", { method: "POST", body: JSON.stringify(storyForm) });
    }
    setShowStoryForm(false);
    setStoryForm({ id: 0, name: "", place: "г. Кинешма", story: "", icon: "🐾", color: "bg-orange-50" });
    const s = await apiFetch("stories");
    setStories(s);
  }

  async function deleteStory(id: number) {
    if (!confirm("Удалить историю?")) return;
    await apiFetch(`stories&id=${id}`, { method: "DELETE" });
    const s = await apiFetch("stories");
    setStories(s);
  }

  async function updateAppStatus(id: number, status: string) {
    await apiFetch("applications", { method: "PUT", body: JSON.stringify({ id, status }) });
    const a = await apiFetch("applications");
    setApps(a);
  }

  async function deleteApp(id: number) {
    if (!confirm("Удалить заявку?")) return;
    await apiFetch(`applications&id=${id}`, { method: "DELETE" });
    const a = await apiFetch("applications");
    setApps(a);
  }

  const newCount = apps.filter(a => a.status === "new").length;

  return (
    <div className="min-h-screen bg-muted font-body">
      {/* Header */}
      <header className="bg-white border-b border-border warm-shadow sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-foreground/40 hover:text-terracotta transition-colors">
              <Icon name="ArrowLeft" size={20} />
            </a>
            <span className="font-display text-xl font-bold text-terracotta">🐾 Панель управления</span>
          </div>
          <button onClick={loadAll} className="text-foreground/40 hover:text-terracotta transition-colors p-2">
            <Icon name="RefreshCw" size={18} />
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-1.5 warm-shadow w-fit">
          {([
            { id: "blog", label: "Блог", icon: "BookOpen", count: posts.length },
            { id: "stories", label: "Истории", icon: "Star", count: stories.length },
            { id: "applications", label: "Заявки", icon: "Users", count: newCount, badge: newCount > 0 },
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? "bg-terracotta text-white warm-shadow" : "text-foreground/60 hover:text-foreground"}`}
            >
              <Icon name={t.icon} size={16} />
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${tab === t.id ? "bg-white/20 text-white" : t.badge ? "bg-terracotta text-white" : "bg-muted text-foreground/50"}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20 text-foreground/40">
            <Icon name="Loader2" size={32} className="animate-spin" />
          </div>
        )}

        {/* ── BLOG TAB ── */}
        {!loading && tab === "blog" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground">Записи блога</h2>
              <button
                onClick={() => { setBlogForm({ id: 0, title: "", excerpt: "", content: "", tag: "Новости", published_at: new Date().toISOString().slice(0, 10) }); setShowBlogForm(true); }}
                className="bg-terracotta text-white font-medium px-4 py-2 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity warm-shadow"
              >
                <Icon name="Plus" size={18} /> Новая запись
              </button>
            </div>

            {showBlogForm && (
              <div className="bg-white rounded-2xl p-6 mb-6 warm-shadow border border-border">
                <h3 className="font-display text-xl font-bold mb-5">{blogForm.id ? "Редактировать запись" : "Новая запись"}</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm text-foreground/60 mb-1 block">Заголовок *</label>
                    <input value={blogForm.title} onChange={e => setBlogForm(p => ({ ...p, title: e.target.value }))}
                      className="w-full border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-terracotta/30 text-sm" placeholder="Заголовок поста" />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/60 mb-1 block">Краткое описание *</label>
                    <textarea value={blogForm.excerpt} onChange={e => setBlogForm(p => ({ ...p, excerpt: e.target.value }))} rows={2}
                      className="w-full border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-terracotta/30 text-sm resize-none" placeholder="Пару предложений о посте" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-foreground/60 mb-1 block">Тег</label>
                      <select value={blogForm.tag} onChange={e => setBlogForm(p => ({ ...p, tag: e.target.value }))}
                        className="w-full border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-terracotta/30 text-sm bg-white">
                        {TAGS.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-foreground/60 mb-1 block">Дата публикации</label>
                      <input type="date" value={blogForm.published_at} onChange={e => setBlogForm(p => ({ ...p, published_at: e.target.value }))}
                        className="w-full border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-terracotta/30 text-sm" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={saveBlog} className="bg-terracotta text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity">
                      {blogForm.id ? "Сохранить" : "Опубликовать"}
                    </button>
                    <button onClick={() => setShowBlogForm(false)} className="border border-border px-6 py-2.5 rounded-xl text-foreground/60 hover:text-foreground transition-colors">
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white rounded-2xl p-6 warm-shadow border border-border flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-terracotta-light text-terracotta text-xs px-2.5 py-1 rounded-full font-medium">{post.tag}</span>
                      <span className="text-xs text-foreground/40">{new Date(post.published_at).toLocaleDateString("ru-RU")}</span>
                    </div>
                    <div className="font-display text-lg font-bold text-foreground leading-snug">{post.title}</div>
                    <p className="text-sm text-foreground/55 mt-1 line-clamp-2">{post.excerpt}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => { setBlogForm({ ...post, published_at: post.published_at?.slice(0, 10) }); setShowBlogForm(true); }}
                      className="p-2 text-foreground/40 hover:text-terracotta transition-colors rounded-lg hover:bg-terracotta-light">
                      <Icon name="Pencil" size={16} />
                    </button>
                    <button onClick={() => deleteBlog(post.id)}
                      className="p-2 text-foreground/40 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && <div className="text-center py-16 text-foreground/40">Записей пока нет</div>}
            </div>
          </div>
        )}

        {/* ── STORIES TAB ── */}
        {!loading && tab === "stories" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground">Истории животных</h2>
              <button
                onClick={() => { setStoryForm({ id: 0, name: "", place: "г. Кинешма", story: "", icon: "🐾", color: "bg-orange-50" }); setShowStoryForm(true); }}
                className="bg-terracotta text-white font-medium px-4 py-2 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity warm-shadow"
              >
                <Icon name="Plus" size={18} /> Новая история
              </button>
            </div>

            {showStoryForm && (
              <div className="bg-white rounded-2xl p-6 mb-6 warm-shadow border border-border">
                <h3 className="font-display text-xl font-bold mb-5">{storyForm.id ? "Редактировать историю" : "Новая история"}</h3>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-foreground/60 mb-1 block">Кличка / имя *</label>
                      <input value={storyForm.name} onChange={e => setStoryForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-terracotta/30 text-sm" placeholder="Шарик" />
                    </div>
                    <div>
                      <label className="text-sm text-foreground/60 mb-1 block">Место</label>
                      <input value={storyForm.place} onChange={e => setStoryForm(p => ({ ...p, place: e.target.value }))}
                        className="w-full border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-terracotta/30 text-sm" placeholder="г. Кинешма" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-foreground/60 mb-1 block">История *</label>
                    <textarea value={storyForm.story} onChange={e => setStoryForm(p => ({ ...p, story: e.target.value }))} rows={3}
                      className="w-full border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-terracotta/30 text-sm resize-none" placeholder="Расскажите историю животного..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-foreground/60 mb-1 block">Иконка</label>
                      <div className="flex gap-2 flex-wrap">
                        {ICONS.map(ic => (
                          <button key={ic} onClick={() => setStoryForm(p => ({ ...p, icon: ic }))}
                            className={`text-2xl p-2 rounded-lg transition-all ${storyForm.icon === ic ? "bg-terracotta-light ring-2 ring-terracotta" : "hover:bg-muted"}`}>
                            {ic}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-foreground/60 mb-1 block">Цвет карточки</label>
                      <div className="flex gap-2 flex-wrap">
                        {COLORS.map(c => (
                          <button key={c.value} onClick={() => setStoryForm(p => ({ ...p, color: c.value }))}
                            className={`w-8 h-8 rounded-lg ${c.value} border-2 transition-all ${storyForm.color === c.value ? "border-terracotta scale-110" : "border-border"}`} title={c.label} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={saveStory} className="bg-terracotta text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity">
                      {storyForm.id ? "Сохранить" : "Добавить"}
                    </button>
                    <button onClick={() => setShowStoryForm(false)} className="border border-border px-6 py-2.5 rounded-xl text-foreground/60 hover:text-foreground transition-colors">
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {stories.map(s => (
                <div key={s.id} className={`${s.color} rounded-2xl p-6 border border-border relative`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{s.icon}</span>
                      <div>
                        <div className="font-display text-lg font-bold text-foreground">{s.name}</div>
                        <div className="text-xs text-foreground/50 flex items-center gap-1">
                          <Icon name="MapPin" size={11} />{s.place}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => { setStoryForm({ ...s }); setShowStoryForm(true); }}
                        className="p-1.5 text-foreground/40 hover:text-terracotta rounded-lg hover:bg-white/50 transition-colors">
                        <Icon name="Pencil" size={15} />
                      </button>
                      <button onClick={() => deleteStory(s.id)}
                        className="p-1.5 text-foreground/40 hover:text-red-500 rounded-lg hover:bg-white/50 transition-colors">
                        <Icon name="Trash2" size={15} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/65 line-clamp-3 italic">"{s.story}"</p>
                </div>
              ))}
              {stories.length === 0 && <div className="col-span-2 text-center py-16 text-foreground/40">Историй пока нет</div>}
            </div>
          </div>
        )}

        {/* ── APPLICATIONS TAB ── */}
        {!loading && tab === "applications" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Заявки волонтёров
                {newCount > 0 && <span className="ml-2 text-sm bg-terracotta text-white px-2 py-0.5 rounded-full">{newCount} новых</span>}
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {apps.map(app => (
                <div key={app.id} className="bg-white rounded-2xl p-6 warm-shadow border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-terracotta-light rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <span className="font-display text-lg font-bold text-foreground">{app.name}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[app.status] || "bg-gray-100 text-gray-500"}`}>
                          {STATUS_LABELS[app.status] || app.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/60 mb-3">
                        <span className="flex items-center gap-1"><Icon name="Phone" size={13} />{app.phone}</span>
                        {app.email && <span className="flex items-center gap-1"><Icon name="Mail" size={13} />{app.email}</span>}
                        <span className="flex items-center gap-1"><Icon name="Calendar" size={13} />{new Date(app.created_at).toLocaleDateString("ru-RU")}</span>
                      </div>
                      {app.motivation && (
                        <p className="text-sm text-foreground/60 bg-muted rounded-lg px-3 py-2 italic mb-3">"{app.motivation}"</p>
                      )}
                      <div className="flex gap-2 flex-wrap">
                        {Object.entries(STATUS_LABELS).map(([val, label]) => (
                          <button key={val} onClick={() => updateAppStatus(app.id, val)}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${app.status === val ? "bg-terracotta text-white border-terracotta" : "border-border text-foreground/60 hover:border-terracotta hover:text-terracotta"}`}>
                            {label}
                          </button>
                        ))}
                        <button onClick={() => deleteApp(app.id)} className="text-xs px-3 py-1.5 rounded-lg border border-border text-red-400 hover:border-red-400 hover:bg-red-50 transition-all ml-auto">
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {apps.length === 0 && <div className="text-center py-16 text-foreground/40">Заявок пока нет</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
