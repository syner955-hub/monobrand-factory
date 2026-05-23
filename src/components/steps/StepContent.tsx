"use client";

import { useState } from "react";
import { ProjectConfig } from "@/app/page";

interface Props {
  config: ProjectConfig;
  setConfig: (c: ProjectConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

const pageLabels: Record<string, string> = {
  home: "Главная",
  bonus: "Бонусы и промо",
  games: "Игры / Слоты",
  legit: "Легитимность",
  login: "Вход / Регистрация",
  geo: "Гео-страница",
  payments: "Платежи",
  mobile: "Мобильная версия",
  vip: "VIP / Лояльность",
  faq: "FAQ",
};

export default function StepContent({ config, setConfig, onNext, onBack }: Props) {
  const [activePage, setActivePage] = useState(config.pages[0] || "home");
  const [generating, setGenerating] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    // TODO: вызов AI-агентов (Агент 1 → Агент 2)
    await new Promise((r) => setTimeout(r, 2000));
    setAnalysisDone(true);
    setGenerating(false);
    
    // Placeholder content
    const newContent: Record<string, string> = {};
    config.pages.forEach((p) => {
      newContent[p] = `<h2>${config.brand} — ${pageLabels[p]}</h2>\n<p>Контент будет сгенерирован AI-агентом на основе анализа конкурентов...</p>`;
    });
    setConfig({ ...config, content: newContent });
  };

  const updateContent = (page: string, value: string) => {
    setConfig({ ...config, content: { ...config.content, [page]: value } });
  };

  return (
    <div className="space-y-6">
      {/* Analysis & Generate */}
      <section className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-text-primary font-semibold">AI-генерация контента</h3>
            <p className="text-text-muted text-sm mt-1">
              Агент проанализирует топ-3 монобренда в выдаче и сгенерирует уникальный контент
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className={`btn-primary flex items-center gap-2 ${generating ? "opacity-60" : ""}`}
          >
            {generating ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Анализирую...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {analysisDone ? "Перегенерировать" : "Анализ + Генерация"}
              </>
            )}
          </button>
        </div>

        {/* Analysis status */}
        {analysisDone && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-bg-tertiary rounded-xl p-3 border border-border-primary">
              <p className="text-accent-success text-xs font-medium">Конкуренты</p>
              <p className="text-text-primary font-bold text-lg">3</p>
              <p className="text-text-muted text-xs">монобренда найдено</p>
            </div>
            <div className="bg-bg-tertiary rounded-xl p-3 border border-border-primary">
              <p className="text-accent-warning text-xs font-medium">Гэпы</p>
              <p className="text-text-primary font-bold text-lg">5</p>
              <p className="text-text-muted text-xs">непокрытых интентов</p>
            </div>
            <div className="bg-bg-tertiary rounded-xl p-3 border border-border-primary">
              <p className="text-accent-info text-xs font-medium">Контент</p>
              <p className="text-text-primary font-bold text-lg">{config.pages.length}</p>
              <p className="text-text-muted text-xs">страниц готово</p>
            </div>
          </div>
        )}
      </section>

      {/* Page tabs + Editor */}
      <section className="glass-card overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-border-primary overflow-x-auto">
          {config.pages.map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                activePage === page
                  ? "text-accent-primary border-accent-primary bg-accent-primary/5"
                  : "text-text-muted border-transparent hover:text-text-secondary hover:bg-bg-hover"
              }`}
            >
              {pageLabels[page] || page}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-text-secondary text-sm font-medium">
              Контент: {pageLabels[activePage]}
            </label>
            <span className="text-text-muted text-xs">
              {(config.content[activePage] || "").length} символов
            </span>
          </div>
          <textarea
            className="input-field font-mono text-sm min-h-[400px] resize-y"
            placeholder="HTML-контент страницы. Сгенерируйте через AI или вставьте свой..."
            value={config.content[activePage] || ""}
            onChange={(e) => updateContent(activePage, e.target.value)}
          />
          <p className="text-text-muted text-xs mt-2">
            Поддерживается HTML. Можно редактировать после генерации.
          </p>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-between">
        <button onClick={onBack} className="btn-ghost flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </button>
        <button onClick={onNext} className="btn-primary flex items-center gap-2">
          Далее — Экспорт
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
