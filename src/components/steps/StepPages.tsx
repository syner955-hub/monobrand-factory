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

  const selectAll = () => {
    setConfig({ ...config, pages: availablePages.map(p => p.id) });
  };

  const selectMinimal = () => {
    setConfig({ ...config, pages: ["home", "bonus", "legit"] });
  };

  return (
    <div className="space-y-8">
      {/* Quick select */}
      <section className="glass-card p-6">
        <h3 className="text-text-primary font-semibold mb-4">Быстрый выбор</h3>
        <div className="flex gap-3">
          <button onClick={selectMinimal} className="btn-secondary text-sm">
            Минимум (3 страницы)
          </button>
          <button onClick={selectAll} className="btn-secondary text-sm">
            Все страницы ({availablePages.length})
          </button>
          <button onClick={() => setConfig({ ...config, pages: ["home"] })} className="btn-ghost text-sm">
            Только главная
          </button>
        </div>
      </section>

      {/* Pages grid */}
      <section className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-text-primary font-semibold">Страницы сайта</h3>
          <span className="text-accent-primary text-sm font-medium">
            {config.pages.length} выбрано
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availablePages.map((page) => {
            const isSelected = config.pages.includes(page.id);
            return (
              <button
                key={page.id}
                onClick={() => togglePage(page.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-3 ${
                  isSelected
                    ? "border-accent-primary bg-accent-primary/5 shadow-glow"
                    : "border-border-primary hover:border-border-hover bg-bg-tertiary"
                } ${page.required ? "ring-1 ring-accent-success/30" : ""}`}
              >
                <span className="text-xl mt-0.5">{page.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text-primary text-sm">{page.label}</span>
                    {page.required && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent-success/20 text-accent-success font-medium">
                        обязательная
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted text-xs mt-1">{page.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected
                    ? "border-accent-primary bg-accent-primary"
                    : "border-border-primary"
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

      {/* Info */}
      <div className="glass-card p-4 border-l-4 border-l-accent-info">
        <p className="text-text-secondary text-sm">
          <span className="text-accent-info font-medium">Подсказка:</span> Агент анализа определит какие интенты не покрыты конкурентами и предложит дополнительные страницы. Сейчас выбери базовый набор.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button onClick={onBack} className="btn-ghost flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </button>
        <button onClick={onNext} className="btn-primary flex items-center gap-2">
          Далее — Контент
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
