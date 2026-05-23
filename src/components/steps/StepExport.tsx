"use client";

import { useState } from "react";
import { ProjectConfig } from "@/app/page";

interface Props {
  config: ProjectConfig;
  onBack: () => void;
}

export default function StepExport({ config, onBack }: Props) {
  const [exporting, setExporting] = useState(false);
  const [preview, setPreview] = useState(false);
  const [qaScore, setQaScore] = useState<number | null>(null);

  const handleExport = async () => {
    setExporting(true);
    // TODO: Агент 3 (сборка) + Агент 4 (QA) → ZIP
    await new Promise((r) => setTimeout(r, 2000));
    setQaScore(87);
    setExporting(false);
  };

  const handleDownload = () => {
    // TODO: реальная генерация ZIP
    alert("ZIP будет скачан после подключения генератора");
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <section className="glass-card p-6">
        <h3 className="text-text-primary font-semibold mb-4">Сводка проекта</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-bg-tertiary rounded-xl p-4 border border-border-primary">
            <p className="text-text-muted text-xs mb-1">Бренд</p>
            <p className="text-text-primary font-bold truncate">{config.brand || "—"}</p>
          </div>
          <div className="bg-bg-tertiary rounded-xl p-4 border border-border-primary">
            <p className="text-text-muted text-xs mb-1">Гео</p>
            <p className="text-text-primary font-bold">{config.geo?.toUpperCase() || "—"}</p>
          </div>
          <div className="bg-bg-tertiary rounded-xl p-4 border border-border-primary">
            <p className="text-text-muted text-xs mb-1">Поисковик</p>
            <p className="text-text-primary font-bold capitalize">{config.searchEngine}</p>
          </div>
          <div className="bg-bg-tertiary rounded-xl p-4 border border-border-primary">
            <p className="text-text-muted text-xs mb-1">Страниц</p>
            <p className="text-text-primary font-bold">{config.pages.length}</p>
          </div>
        </div>
        {config.domain && (
          <div className="mt-4 p-3 bg-bg-tertiary rounded-xl border border-border-primary">
            <p className="text-text-muted text-xs mb-1">Домен</p>
            <p className="text-accent-primary font-mono text-sm">{config.domain}</p>
          </div>
        )}
      </section>

      {/* Build & QA */}
      <section className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-text-primary font-semibold">Сборка и проверка</h3>
            <p className="text-text-muted text-sm mt-1">
              Агент соберёт сайт из шаблона и проведёт QA-аудит
            </p>
          </div>
          <button
            onClick={handleExport}
            disabled={exporting}
            className={`btn-primary flex items-center gap-2 ${exporting ? "opacity-60" : ""}`}
          >
            {exporting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Собираю...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Собрать сайт
              </>
            )}
          </button>
        </div>

        {/* QA Score */}
        {qaScore !== null && (
          <div className="mt-4 p-4 rounded-xl border border-border-primary bg-bg-tertiary">
            <div className="flex items-center justify-between mb-3">
              <span className="text-text-secondary text-sm font-medium">QA Score</span>
              <span className={`text-2xl font-bold ${
                qaScore >= 80 ? "text-accent-success" : qaScore >= 60 ? "text-accent-warning" : "text-accent-danger"
              }`}>
                {qaScore}/100
              </span>
            </div>
            <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  qaScore >= 80 ? "bg-accent-success" : qaScore >= 60 ? "bg-accent-warning" : "bg-accent-danger"
                }`}
                style={{ width: `${qaScore}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center">
                <p className="text-accent-success text-xs font-medium">SEO</p>
                <p className="text-text-primary font-bold">✓ OK</p>
              </div>
              <div className="text-center">
                <p className="text-accent-success text-xs font-medium">Mobile</p>
                <p className="text-text-primary font-bold">✓ OK</p>
              </div>
              <div className="text-center">
                <p className="text-accent-success text-xs font-medium">Speed</p>
                <p className="text-text-primary font-bold">95</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Export options */}
      {qaScore !== null && qaScore >= 80 && (
        <section className="glass-card p-6">
          <h3 className="text-text-primary font-semibold mb-4">Экспорт</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleDownload}
              className="p-5 rounded-xl border border-border-primary bg-bg-tertiary hover:border-accent-primary hover:bg-accent-primary/5 transition-all text-left group"
            >
              <div className="text-2xl mb-2">📥</div>
              <p className="font-medium text-text-primary group-hover:text-accent-primary">Скачать ZIP</p>
              <p className="text-text-muted text-xs mt-1">HTML/CSS/JS/img — готово к заливке</p>
            </button>
            <button
              onClick={() => setPreview(true)}
              className="p-5 rounded-xl border border-border-primary bg-bg-tertiary hover:border-accent-info hover:bg-accent-info/5 transition-all text-left group"
            >
              <div className="text-2xl mb-2">👁</div>
              <p className="font-medium text-text-primary group-hover:text-accent-info">Предпросмотр</p>
              <p className="text-text-muted text-xs mt-1">Открыть в новой вкладке</p>
            </button>
            <button
              className="p-5 rounded-xl border border-border-primary bg-bg-tertiary hover:border-accent-success hover:bg-accent-success/5 transition-all text-left group"
            >
              <div className="text-2xl mb-2">🚀</div>
              <p className="font-medium text-text-primary group-hover:text-accent-success">Деплой</p>
              <p className="text-text-muted text-xs mt-1">Cloudflare Pages (скоро)</p>
            </button>
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <button onClick={onBack} className="btn-ghost flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </button>
      </div>
    </div>
  );
}
