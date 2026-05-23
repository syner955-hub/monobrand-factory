"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import StepBrand from "@/components/steps/StepBrand";
import StepPages from "@/components/steps/StepPages";
import StepContent from "@/components/steps/StepContent";
import StepExport from "@/components/steps/StepExport";

export type SearchEngine = "google" | "bing" | "both";

export interface ProjectConfig {
  brand: string;
  officialUrl: string;
  geo: string;
  language: string;
  domain: string;
  searchEngine: SearchEngine;
  pages: string[];
  content: Record<string, string>;
}

const defaultConfig: ProjectConfig = {
  brand: "",
  officialUrl: "",
  geo: "",
  language: "en",
  domain: "",
  searchEngine: "google",
  pages: ["home"],
  content: {},
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ProjectConfig>(defaultConfig);

  const steps = [
    { id: 1, label: "Бренд", icon: "🎯" },
    { id: 2, label: "Страницы", icon: "📄" },
    { id: 3, label: "Контент", icon: "✍️" },
    { id: 4, label: "Экспорт", icon: "🚀" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar steps={steps} currentStep={step} onStepClick={setStep} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{steps[step - 1].icon}</span>
              <h1 className="text-2xl font-bold text-text-primary">
                {steps[step - 1].label}
              </h1>
              <span className="text-text-muted text-sm ml-auto">
                Шаг {step} из {steps.length}
              </span>
            </div>
            <div className="h-1 bg-bg-tertiary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full transition-all duration-500"
                style={{ width: `${(step / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          {step === 1 && (
            <StepBrand config={config} setConfig={setConfig} onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <StepPages config={config} setConfig={setConfig} onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && (
            <StepContent config={config} setConfig={setConfig} onNext={() => setStep(4)} onBack={() => setStep(2)} />
          )}
          {step === 4 && (
            <StepExport config={config} onBack={() => setStep(3)} />
          )}
        </div>
      </main>
    </div>
  );
}
