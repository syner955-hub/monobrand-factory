"use client";

import { ProjectConfig, SearchEngine } from "@/app/page";

interface Props {
  config: ProjectConfig;
  setConfig: (c: ProjectConfig) => void;
  onNext: () => void;
}

const geos = [
  { value: "au", label: "Австралия", flag: "🇦🇺", lang: "en" },
  { value: "ca", label: "Канада", flag: "🇨🇦", lang: "en" },
  { value: "ca-fr", label: "Канада (FR)", flag: "🇨🇦", lang: "fr" },
  { value: "gb", label: "Великобритания", flag: "🇬🇧", lang: "en" },
  { value: "de", label: "Германия", flag: "🇩🇪", lang: "de" },
  { value: "se", label: "Швеция", flag: "🇸🇪", lang: "sv" },
  { value: "no", label: "Норвегия", flag: "🇳🇴", lang: "no" },
  { value: "dk", label: "Дания", flag: "🇩🇰", lang: "da" },
  { value: "fr", label: "Франция", flag: "🇫🇷", lang: "fr" },
  { value: "jp", label: "Япония", flag: "🇯🇵", lang: "ja" },
];

const engines: { value: SearchEngine; label: string; desc: string; icon: string }[] = [
  { value: "google", label: "Google", desc: "Глубокий контент, E-E-A-T, длинные тексты", icon: "🔵" },
  { value: "bing", label: "Bing", desc: "Точные ключи, EMD, видео, IndexNow", icon: "🟢" },
  { value: "both", label: "Оба", desc: "Два сайта — максимальный охват", icon: "⚡" },
];

export default function StepBrand({ config, setConfig, onNext }: Props) {
  const canProceed = config.brand && config.geo && config.searchEngine;

  return (
    <div className="space-y-8">
      {/* Brand */}
      <section className="glass-card p-6">
        <h3 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-accent-primary/20 flex items-center justify-center text-xs">1</span>
          Бренд
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-text-secondary text-sm mb-2 block">Название бренда</label>
            <input
              type="text"
              className="input-field"
              placeholder="VegaStars Casino"
              value={config.brand}
              onChange={(e) => setConfig({ ...config, brand: e.target.value })}
            />
          </div>
          <div>
            <label className="text-text-secondary text-sm mb-2 block">Официальный сайт</label>
            <input
              type="text"
              className="input-field"
              placeholder="https://vega-stars.com"
              value={config.officialUrl}
              onChange={(e) => setConfig({ ...config, officialUrl: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-text-secondary text-sm mb-2 block">Домен для нашего сайта</label>
          <input
            type="text"
            className="input-field"
            placeholder="vegastars-casino.com"
            value={config.domain}
            onChange={(e) => setConfig({ ...config, domain: e.target.value })}
          />
          <p className="text-text-muted text-xs mt-1">EMD (exact match domain) — домен совпадает с брендом</p>
        </div>
      </section>

      {/* Geo */}
      <section className="glass-card p-6">
        <h3 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-accent-primary/20 flex items-center justify-center text-xs">2</span>
          Гео и язык
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {geos.map((g) => (
            <button
              key={g.value}
              onClick={() => setConfig({ ...config, geo: g.value, language: g.lang })}
              className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                config.geo === g.value
                  ? "border-accent-primary bg-accent-primary/10 shadow-glow"
                  : "border-border-primary hover:border-border-hover bg-bg-tertiary"
              }`}
            >
              <span className="text-2xl block mb-1">{g.flag}</span>
              <span className="text-xs font-medium text-text-secondary">{g.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Search Engine */}
      <section className="glass-card p-6">
        <h3 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-accent-primary/20 flex items-center justify-center text-xs">3</span>
          Поисковик
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {engines.map((e) => (
            <button
              key={e.value}
              onClick={() => setConfig({ ...config, searchEngine: e.value })}
              className={`p-5 rounded-xl border text-left transition-all duration-200 ${
                config.searchEngine === e.value
                  ? "border-accent-primary bg-accent-primary/10 shadow-glow"
                  : "border-border-primary hover:border-border-hover bg-bg-tertiary"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{e.icon}</span>
                <span className="font-semibold text-text-primary">{e.label}</span>
              </div>
              <p className="text-text-muted text-xs">{e.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`btn-primary flex items-center gap-2 ${!canProceed ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          Далее — Выбор страниц
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
