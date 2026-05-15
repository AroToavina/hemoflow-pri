import type { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { Search, Bell } from "lucide-react";

export function DashboardShell({
  title,
  eyebrow,
  actions,
  children,
}: {
  title: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AppSidebar />
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b border-rule bg-surface/80 backdrop-blur sticky top-0 z-10 flex items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-ink-muted">HemoFlow</span>
            <span className="text-ink-muted/50">/</span>
            <span className="font-medium">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="size-9 grid place-items-center rounded-lg text-ink-muted hover:text-ink hover:bg-surface-elevated transition-colors">
              <Search className="size-4" />
            </button>
            <button className="size-9 grid place-items-center rounded-lg text-ink-muted hover:text-ink hover:bg-surface-elevated transition-colors relative">
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-blood-600" />
            </button>
            <div className="ml-2 flex items-center gap-3 pl-3 border-l border-rule">
              <div className="text-right leading-tight">
                <p className="text-xs font-semibold">Dr. A. Lefebvre</p>
                <p className="text-[10px] text-ink-muted">Médecin Chef</p>
              </div>
              <div className="size-9 rounded-full bg-gradient-to-br from-blood-500 to-blood-700 grid place-items-center text-white text-xs font-bold">
                AL
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 lg:px-10 pt-10 pb-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            {eyebrow && (
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-blood-600 mb-3">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-ink leading-[0.95]">
              {title}
            </h1>
          </div>
          {actions}
        </div>

        <div className="px-6 lg:px-10 pb-16 flex-1">{children}</div>
      </main>
    </div>
  );
}
