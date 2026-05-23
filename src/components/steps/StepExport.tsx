"use client";

import { useState } from "react";
import { ProjectConfig } from "@/app/page";
import JSZip from "jszip";

interface Props {
  config: ProjectConfig;
  onBack: () => void;
}

export default function StepExport({ config, onBack }: Props) {
  const [building, setBuilding] = useState(false);
  const [built, setBuilt] = useState(false);
  const [files, setFiles] = useState<Record<string, string>>({});
  const [stats, setStats] = useState<{ pages: number; totalFiles: number; searchEngine: string; hasIndexNow: boolean } | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string>("");

  const handleBuild = async () => {
    setBuilding(true);
    try {
      const res = await fetch("/api/build-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (data.success) {
        setFiles(data.files);
        setStats(data.stats);
        setBuilt(true);
        setPreviewHtml(data.files["index.html"] || "");
      }
    } catch (e) {
      console.error("Build error:", e);
    }
    setBuilding(false);
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    Object.entries(files).forEach(([path, content]) => {
      zip.file(path, content);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.brand.toLowerCase().replace(/\s+/g, "-")}-site.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePreview = () => {
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(previewHtml);
      win.document.close();
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <section className="bg-bg-card border border-border-primary rounded-2xl p-6 shadow-sm">
        <h3 className="text-text-primary font-semibold mb-4">Сводка проекта</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-bg-secondary rounded-xl p-4 border border-border-primary">
            <p className="text-text-muted text-xs font-medium">Бренд</p>
            <p className="text-text-primary font-bold mt-1 truncate">{config.brand || "—"}</p>
          </div>
          <div className="bg-bg-secondary rounded-xl p-4 border border-border-primary">
            <p className="text-text-muted text-xs font-medium">Гео</p>
            <p className="text-text-primary font-bold mt-1">{config.geo?.toUpperCase() || "—"}</p>
          </div>
          <div className="bg-bg-secondary rounded-xl p-4 border border-border-primary">
            <p className="text-text-muted text-xs font-medium">Поисковик</p>
            <p className="text-text-primary font-bold mt-1 capitalize">{config.searchEngine}</p>
          </div>
          <div className="bg-bg-secondary rounded-xl p-4 border border-border-primary">
            <p className="text-text-muted text-xs font-medium">Страниц</p>
            <p className="text-text-primary font-bold mt-1">{config.pages.length}</p>
          </div>
        </div>
        {config.domain && (
          <div className="mt-4 p-3 bg-bg-secondary rounded-xl border border-border-primary flex items-center gap-2">
            <span className="text-text-muted text-xs">Домен:</span>
            <span className="text-accent-primary font-mono text-sm font-medium">{config.domain}</span>
          </div>
        )}
      </section>

      {/* Build */}
      <section className="bg-bg-card border border-border-primary rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-text-primary font-semibold">Сборка сайта</h3>
            <p className="text-text-muted text-sm mt-1">Генерация HTML + CSS, рандомизация, SEO-оптимизация</p>
          </div>
          <button
            onClick={handleBuild}
            disabled={building}
            className={`px-5 py-2.5 bg-accent-primary text-white font-medium rounded-xl transition-all duration-200 hover:bg-accent-primary/90 hover:shadow-glow active:scale-[0.98] flex items-center gap-2 ${building ? "opacity-60 cursor-wait" : ""}`}
          >
            {building ? (
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
                {built ? "Пересобрать" : "Собрать сайт"}
              </>
            )}
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="mt-4 p-5 rounded-xl border border-accent-success/20 bg-accent-success/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-accent-success text-lg">✓</span>
              <span className="text-accent-success font-semibold">Сайт собран</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center bg-bg-card rounded-lg p-2 border border-border-primary">
                <p className="text-text-muted text-[10px] font-medium uppercase">Страниц</p>
                <p className="font-bold text-sm text-text-primary mt-0.5">{stats.pages}</p>
              </div>
              <div className="text-center bg-bg-card rounded-lg p-2 border border-border-primary">
                <p className="text-text-muted text-[10px] font-medium uppercase">Файлов</p>
                <p className="font-bold text-sm text-text-primary mt-0.5">{stats.totalFiles}</p>
              </div>
              <div className="text-center bg-bg-card rounded-lg p-2 border border-border-primary">
                <p className="text-text-muted text-[10px] font-medium uppercase">Поисковик</p>
                <p className="font-bold text-sm text-text-primary mt-0.5 capitalize">{stats.searchEngine}</p>
              </div>
              <div className="text-center bg-bg-card rounded-lg p-2 border border-border-primary">
                <p className="text-text-muted text-[10px] font-medium uppercase">IndexNow</p>
                <p className="font-bold text-sm text-text-primary mt-0.5">{stats.hasIndexNow ? "✓" : "—"}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Export options */}
      {built && (
        <section className="bg-bg-card border border-border-primary rounded-2xl p-6 shadow-sm">
          <h3 className="text-text-primary font-semibold mb-4">Экспорт</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleDownloadZip}
              className="p-5 rounded-xl border border-border-primary bg-bg-secondary hover:border-accent-primary hover:bg-accent-primary/5 transition-all text-left group hover:shadow-glow"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-3 group-hover:bg-accent-primary/20 transition-all">
                <span className="text-xl">📥</span>
              </div>
              <p className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">Скачать ZIP</p>
              <p className="text-text-muted text-xs mt-1">HTML/CSS/JS — готово к заливке на хостинг</p>
            </button>
            <button
              onClick={handlePreview}
              className="p-5 rounded-xl border border-border-primary bg-bg-secondary hover:border-accent-info hover:bg-accent-info/5 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-info/10 flex items-center justify-center mb-3 group-hover:bg-accent-info/20 transition-all">
                <span className="text-xl">👁</span>
              </div>
              <p className="font-semibold text-text-primary group-hover:text-accent-info transition-colors">Предпросмотр</p>
              <p className="text-text-muted text-xs mt-1">Открыть главную в новой вкладке</p>
            </button>
            <button
              className="p-5 rounded-xl border border-border-primary bg-bg-secondary hover:border-accent-success hover:bg-accent-success/5 transition-all text-left group opacity-60 cursor-not-allowed"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-success/10 flex items-center justify-center mb-3">
                <span className="text-xl">🚀</span>
              </div>
              <p className="font-semibold text-text-primary">Деплой</p>
              <p className="text-text-muted text-xs mt-1">Cloudflare Pages (скоро)</p>
            </button>
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-5 py-2.5 text-text-secondary font-medium rounded-xl hover:text-text-primary hover:bg-bg-tertiary transition-all flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </button>
      </div>
    </div>
  );
}
