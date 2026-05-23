"use client";

import { ProjectConfig } from "@/app/page";

interface Props {
  config: ProjectConfig;
  setConfig: (c: ProjectConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

const availablePages = [
  { id: "home", label: "Главная", desc: "Основная страница бренда — welcome, hero, CTA", required: true, icon: "🏠" },
  { id: "bonus", label: "Бонусы и промо", desc: "No deposit bonus, promo codes, free spins", required: false, icon: "🎁" },
  { id: "games", label: "Игры / Слоты", desc: "Каталог игр, провайдеры, популярные слоты", required: false, icon: "🎰" },
  { id: "legit", label: "Легитимность", desc: "Лицензия, безопасность, is legit, отзывы", required: false, icon: "🛡️" },
  { id: "login", label: "Вход / Регистрация", desc: "Как войти, скачать приложение, инструкция", required: false, icon: "🔑" },
  { id: "geo", label: "Гео-страница", desc: "Специфика для выбранной страны/региона", required: false, icon: "🌍" },
  { id: "payments", label: "Платежи", desc: "Способы депозита и вывода, лимиты", required: false, icon: "💳" },
  { id: "mobile", label: "Мобильная версия", desc: "Приложение, мобильный сайт, скачивание", required: false, icon: "📱" },
  { id: "vip", label: "VIP / Лояльность", desc: "Программа лояльности, VIP-уровни, кэшбэк", required: false, icon: "👑" },
  { id: "faq", label: "FAQ", desc: "Частые вопросы (из PAA выдачи)", required: false, icon: "❓" },
];

export default function StepPages({ config, setConfig, onNext, onBack }: Props) {
  const togglePage = (pageId: string) => {
    const page = availablePages.find(p => p.id === pageId);
    if (page?.required) return;
    const pages = config.pages.includes(pageId)
      ? config.pages.filter(p => p !== pageId)
      : [...config.pages, pageId];
    setConfig({ ...config, pages });
  };

  const selectAll = () => setConfig({ ...config, pages: availablePages.map(p => p.id) });
  const selectMinimal = () => setConfig({ ...config, pages: ["home", "bonus", "legit"] });

  return (
    <div className="space-y-6">
      {/* Quick select */}
      <section className="bg-bg-card border border-border-primary rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-text-primary font-semibold">Быстрый выбор</h3>
          <span className="text-sm font-semibold text-accent-primary bg-accent-primary/8 px-3 py-1 rounded-full">
            {config.pages.length} страниц
          </span>
        </div>
        <div className="flex gap-3 mt-3">
          <button onClick={selectMinimal} className="px-4 py-2 bg-bg-tertiary border border-border-primary text-text-secondary text-sm font-medium rounded-lg hover:border-border-hover hover:bg-bg-hover transition-all">
            Минимум (3)
          </button>
          <button onClick={selectAll} className="px-4 py-2 bg-bg-tertiary border border-border-primary text-text-secondary text-sm font-medium rounded-lg hover:border-border-hover hover:bg-bg-hover transition-all">
            Все ({availablePages.length})
          </button>
          <button onClick={() => setConfig({ ...config, pages: ["home"] })} className="px-4 py-2 text-text-muted text-sm font-medium rounded-lg hover:text-text-secondary hover:bg-bg-tertiary transition-all">
            Только главная
          </button>
        </div>
      </section>

      {/* Pages grid */}
      <section className="bg-bg-card border border-border-primary rounded-2xl p-6 shadow-sm">
        <h3 className="text-text-primary font-semibold mb-4">Страницы сайта</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availablePages.map((page) => {
            const isSelected = config.pages.includes(page.id);
            return (
              <button
                key={page.id}
                onClick={() => togglePage(page.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-3 ${
                  isSelected
                    ? "border-accent-primary bg-accent-primary/5 ring-1 ring-accent-primary/15"
                    : "border-border-primary hover:border-border-hover bg-bg-secondary hover:bg-bg-hover"
                } ${page.required ? "ring-1 ring-accent-success/20" : ""}`}
              >
                <span className="text-xl mt-0.5">{page.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium text-sm ${isSelected ? "text-accent-primary" : "text-text-primary"}`}>{page.label}</span>
                    {page.required && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-accent-success/10 text-accent-success font-semibold">
                        обязательная
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted text-xs mt-1 leading-relaxed">{page.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected ? "border-accent-primary bg-accent-primary" : "border-border-primary"
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tip */}
      <div className="bg-accent-info/5 border border-accent-info/20 rounded-xl p-4">
        <p className="text-text-secondary text-sm">
          <span className="text-accent-info font-semibold">Подсказка:</span> Агент анализа определит непокрытые интенты и предложит дополнительные страницы автоматически.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-5 py-2.5 text-text-secondary font-medium rounded-xl hover:text-text-primary hover:bg-bg-tertiary transition-all flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </button>
        <button onClick={onNext} className="px-6 py-3 bg-accent-primary text-white font-medium rounded-xl transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-glow active:scale-[0.98] flex items-center gap-2">
          Далее — Контент
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
