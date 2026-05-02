import {
  BarChart3,
  CalendarCheck,
  ClipboardList,
  Gauge,
  Settings,
  SlidersHorizontal,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Gauge },
  { id: "today", label: "Today", icon: CalendarCheck },
  { id: "credits", label: "Credits", icon: SlidersHorizontal },
  { id: "tasks", label: "Tasks", icon: ClipboardList },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function BottomNav({ currentPage, onNavigate }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-surface-950/95 px-2 py-2 backdrop-blur lg:hidden">
      <div className="grid grid-cols-6 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex h-14 flex-col items-center justify-center gap-1 rounded-md text-[11px] transition ${
                active
                  ? "bg-accent-500/15 text-accent-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
              }`}
              aria-label={item.label}
              title={item.label}
            >
              <Icon size={18} aria-hidden="true" />
              <span className="max-w-full truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function SidebarNav({ currentPage, onNavigate, appName }) {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-surface-950/80 p-5 lg:block">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.24em] text-accent-400">Personal OS</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">{appName}</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-medium transition ${
                active
                  ? "bg-accent-500/15 text-accent-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
              }`}
            >
              <Icon size={18} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
