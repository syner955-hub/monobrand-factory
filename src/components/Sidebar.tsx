"use client";

interface Step {
  id: number;
  label: string;
  icon: string;
}

interface SidebarProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function Sidebar({ steps, currentStep, onStepClick }: SidebarProps) {
  return (
    <aside className="w-[260px] h-screen bg-bg-card border-r border-border-primary flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-border-primary">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h2 className="text-text-primary font-bold text-sm">MonoBrand</h2>
            <p className="text-text-muted text-xs">Site Factory</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <nav className="flex-1 p-4">
        <p className="text-text-muted text-[11px] font-semibold uppercase tracking-wider mb-4 px-3">
          Процесс создания
        </p>
        <ul className="space-y-1">
          {steps.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => onStepClick(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  currentStep === s.id
                    ? "bg-accent-primary/8 border border-accent-primary/20 text-accent-primary shadow-sm"
                    : currentStep > s.id
                    ? "text-accent-success hover:bg-bg-hover"
                    : "text-text-muted hover:bg-bg-hover hover:text-text-secondary"
                }`}
              >
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                    currentStep === s.id
                      ? "bg-accent-primary text-white shadow-glow"
                      : currentStep > s.id
                      ? "bg-accent-success text-white"
                      : "bg-bg-tertiary text-text-muted border border-border-primary"
                  }`}
                >
                  {currentStep > s.id ? "✓" : s.id}
                </span>
                <span className="text-sm font-medium">{s.label}</span>
                {currentStep === s.id && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border-primary">
        <div className="bg-bg-tertiary rounded-xl p-4 border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-xs">Проектов</p>
              <p className="text-text-primary font-bold text-xl">0</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center">
              <span className="text-accent-primary text-lg">📦</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
