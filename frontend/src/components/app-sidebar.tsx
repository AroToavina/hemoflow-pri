import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Droplets, Building2, AlertTriangle } from "lucide-react";

const items = [
  { title: "Tableau de bord", url: "/dashboard", icon: LayoutDashboard },
  { title: "Donneurs", url: "/donors", icon: Users },
  { title: "Dons", url: "/donations", icon: Droplets },
  { title: "Centres de collecte", url: "/centers", icon: Building2 },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="hidden lg:flex w-64 shrink-0 border-r border-rule bg-surface flex-col">
      <div className="px-7 pt-8 pb-10">
        <Link to="/dashboard" className="flex items-center gap-3 no-underline">
          <div className="size-9 rounded-xl bg-blood-600 grid place-items-center shadow-[0_8px_24px_-8px_var(--blood-600)]">
            <Droplets className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display font-extrabold text-[17px] text-blood-900">
              HemoFlow
            </div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-ink-muted">
              Gestion du sang
            </div>
          </div>
        </Link>
      </div>

      <div className="px-4 pb-2 text-[10px] font-medium tracking-[0.2em] uppercase text-ink-muted/70">
        Navigation
      </div>
      <nav className="flex-1 px-3 space-y-0.5">
        {items.map((item) => {
          const active = currentPath === item.url;
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline ${
                active
                  ? "bg-blood-50 text-blood-700"
                  : "text-ink-muted hover:text-ink hover:bg-surface-elevated"
              }`}
            >
              <item.icon
                className={`size-4 ${active ? "text-blood-600" : "text-ink-muted group-hover:text-ink"}`}
                strokeWidth={2}
              />
              {item.title}
              {active && <span className="ml-auto size-1.5 rounded-full bg-blood-600" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="rounded-2xl bg-ink p-5 text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 size-24 rounded-full bg-blood-600/20 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-blood-200">
              <AlertTriangle className="size-3.5" />
              <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">
                Stock critique
              </span>
            </div>
            <p className="mt-3 font-display font-bold text-2xl">O−</p>
            <p className="text-xs text-white/60 mt-0.5">3.2 L restants</p>
            <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blood-500 w-[12%]" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
