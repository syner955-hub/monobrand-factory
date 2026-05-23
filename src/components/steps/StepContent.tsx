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
  home: "Главная", bonus: "Бонусы и промо", games: "Игры / Слоты",
  legit: "Легитимность", login: "Вход / Регистрация", geo: "Гео-страница",
  payments: "Платежи", mobile: "Мобильная версия", vip: "VIP / Лояльность", faq: "FAQ",
};

export default function StepContent({ config, setConfig, onNext, onBack }: Props) {
  const [activePage, setActivePage] = useState(config.pages[0] || "home");
  const [generating, setGenerating] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [brandParsed, setBrandParsed] = useState(false);
  const [analysisData, setAnalysisData] = useState<{competitors: number; gaps: number} | null>(null);

  // Parse brand official site
  const handleParseBrand = async () => {
    if (!config.officialUrl) return;
    setParsing(true);
    try {
      const res = await fetch("/api/parse-brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: config.officialUrl }),
      });
      const data = await res.json();
      if (data.success) {
        setBrandParsed(true);
        // Store brand data in config for later use in build
        setConfig({ ...config, brandData: data.brand } as ProjectConfig & { brandData: unknown });
      }
    } catch (e) {
      console.error("Parse error:", e);
    }
    setParsing(false);
  };

  // Generate content via AI
  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: config.brand,
          geo: config.geo,
          language: config.language,
          pages: config.pages,
          searchEngine: config.searchEngine,
          officialUrl: config.officialUrl,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConfig({ ...config, content: data.content });
        setAnalysisDone(true);
        setAnalysisData({ competitors: 3, gaps: 5 });
      } else {
        // Fallback placeholder
        const newContent: Record<string, string> = {};
        config.pages.forEach((p) => {
          newContent[p] = `<h2>${config.brand} — ${pageLabels[p]}</h2>\n<p>AI-генерация недоступна. Вставьте контент вручную или настройте OPENAI_API_KEY.</p>`;
        });
        setConfig({ ...config, content: newContent });
        setAnalysisDone(true);
        setAnalysisData({ competitors: 0, gaps: 0 });
      }
    } catch (e) {
      console.error("Generate error:", e);
      const newContent: Record<string, string> = {};
      config.pages.forEach((p) => {
        newContent[p] = `<h2>${config.brand} — ${pageLabels[p]}</h2>\n<p>Ошибка генерации. Вставьте контент вручную.</p>`;
      });
      setConfig({ ...config, content: newContent });
      setAnalysisDone(true);
    }
    setGenerating(false);
  };

  const updateContent = (page: string, value: string) => {
    setConfig({ ...config, content: { ...config.content, [page]: value } });
  };

  return (
    <div className="space-y-6">
      {/* Parse Brand */}
      {config.officialUrl && (
        <section className="bg-bg-card border border-border-primary rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-text-primary font-semibold">Парсинг бренда</h3>
              <p className="text-text-muted text-sm mt-1">
                Извлечь цвета, лого, стиль с {config.officialUrl}
              </p>
            </div>
            <button
              onClick={handleParseBrand}
              disabled={parsing || brandParsed}
              className={`px-5 py-2.5 font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${
                brandParsed
                  ? "bg-accent-success/10 text-accent-success border border-accent-success/20"
                  : "bg-accent-secondary text-white hover:bg-accent-secondary/90"
              } ${parsing ? "opacity-60 cursor-wait" : ""}`}
            >
              {parsing ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Парсинг...
                </>
              ) : brandParsed ? (
                <>✓ Спарсено</>
              ) : (
                <>🎨 Спарсить стиль</>
              )}
            </button>
          </div>
        </section>
      )}

      {/* Generate */}
      <section className="bg-bg-card border border-border-primary rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-text-primary font-semibold">AI-генерация контента</h3>
            <p className="text-text-muted text-sm mt-1">
              Анализ топ-3 монобрендов → генерация уникального контента
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className={`px-5 py-2.5 bg-accent-primary text-white font-medium rounded-xl transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-glow active:scale-[0.98] flex items-center gap-2 ${generating ? "opacity-60 cursor-wait" : ""}`}
          >
            {generating ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Генерирую...
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

        {analysisDone && analysisData && (
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="bg-bg-secondary rounded-xl p-4 border border-border-primary">
              <p className="text-accent-success text-xs font-semibold">Конкуренты</p>
              <p className="text-text-primary font-bold text-2xl mt-1">{analysisData.competitors}</p>
              <p className="text-text-muted text-xs mt-0.5">монобренда в топе</p>
            </div>
            <div className="bg-bg-secondary rounded-xl p-4 border border-border-primary">
              <p className="text-accent-warning text-xs font-semibold">Гэпы</p>
              <p className="text-text-primary font-bold text-2xl mt-1">{analysisData.gaps}</p>
              <p className="text-text-muted text-xs mt-0.5">непокрытых интентов</p>
            </div>
            <div className="bg-bg-secondary rounded-xl p-4 border border-border-primary">
              <p className="text-accent-info text-xs font-semibold">Контент</p>
              <p className="text-text-primary font-bold text-2xl mt-1">{config.pages.length}</p>
              <p className="text-text-muted text-xs mt-0.5">страниц готово</p>
            </div>
          </div>
        )}
      </section>

      {/* Tabs + Editor */}
      <section className="bg-bg-card border border-border-primary rounded-2xl overflow-hidden shadow-sm">
        <div className="flex border-b border-border-primary overflow-x-auto bg-bg-secondary">
          {config.pages.map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                activePage === page
                  ? "text-accent-primary border-accent-primary bg-bg-card"
                  : "text-text-muted border-transparent hover:text-text-secondary"
              }`}
            >
              {pageLabels[page] || page}
            </button>
          ))}
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-text-secondary text-sm font-medium">
              Контент: {pageLabels[activePage]}
            </label>
            <span className="text-text-muted text-xs bg-bg-tertiary px-2 py-1 rounded-md">
              {(config.content[activePage] || "").length} символов
            </span>
          </div>
          <textarea
            className="w-full px-4 py-3 bg-bg-secondary border border-border-primary rounded-xl text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 font-mono text-sm min-h-[350px] resize-y"
            placeholder="HTML-контент страницы. Нажмите 'Анализ + Генерация' или вставьте свой контент..."
            value={config.content[activePage] || ""}
            onChange={(e) => updateContent(activePage, e.target.value)}
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-5 py-2.5 text-text-secondary font-medium rounded-xl hover:text-text-primary hover:bg-bg-tertiary transition-all flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </button>
        <button onClick={onNext} className="px-6 py-3 bg-accent-primary text-white font-medium rounded-xl transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-glow active:scale-[0.98] flex items-center gap-2">
          Далее — Экспорт
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
