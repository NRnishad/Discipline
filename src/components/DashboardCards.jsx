import {
  Activity,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Flame,
  MinusCircle,
  PlusCircle,
  Timer,
} from "lucide-react";
import { formatMinutes } from "../lib/dateUtils";

function MetricCard({ title, value, subtitle, icon: Icon, tone = "neutral" }) {
  const tones = {
    neutral: "border-white/10 bg-surface-850",
    positive: "border-resolve-500/25 bg-resolve-500/10",
    caution: "border-caution-500/25 bg-caution-500/10",
    danger: "border-danger-500/25 bg-danger-500/10",
    accent: "border-accent-500/25 bg-accent-500/10",
  };

  return (
    <section className={`rounded-lg border p-4 ${tones[tone]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className="rounded-md bg-white/5 p-2 text-slate-200">
          <Icon size={20} aria-hidden="true" />
        </div>
      </div>
      {subtitle ? <p className="mt-3 text-sm text-slate-400">{subtitle}</p> : null}
    </section>
  );
}

export function DashboardCards({
  summary,
  availableBalance,
  perfectDay,
  disciplineScore,
  currentStreak,
  dueTasks,
  completedDueCount,
  onNavigate,
}) {
  const requiredTasks = dueTasks.filter((task) => task.required);
  const balanceTone = availableBalance >= 0 ? "positive" : "danger";

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Available balance"
          value={formatMinutes(availableBalance)}
          subtitle="Entertainment credit after today"
          icon={Timer}
          tone={balanceTone}
        />
        <MetricCard
          title="Earned today"
          value={formatMinutes(summary.earned)}
          subtitle="Fitness and study credits"
          icon={PlusCircle}
          tone="positive"
        />
        <MetricCard
          title="Used today"
          value={formatMinutes(summary.spent)}
          subtitle="Entertainment spending"
          icon={MinusCircle}
          tone={summary.spent > summary.earned ? "caution" : "neutral"}
        />
        <MetricCard
          title="Net today"
          value={formatMinutes(summary.net)}
          subtitle="Earned minus used"
          icon={Activity}
          tone={summary.net >= 0 ? "accent" : "danger"}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-lg border border-white/10 bg-surface-850 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-400">Today discipline score</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-5xl font-semibold text-white">{disciplineScore}</span>
                <span className="pb-2 text-sm text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:min-w-80">
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <BadgeCheck size={17} />
                  Perfect day
                </div>
                <p className={`mt-2 text-lg font-semibold ${perfectDay ? "text-resolve-400" : "text-caution-400"}`}>
                  {perfectDay ? "On track" : "Incomplete"}
                </p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Flame size={17} />
                  Current streak
                </div>
                <p className="mt-2 text-lg font-semibold text-white">{currentStreak} days</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-surface-850 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">Required today</p>
              <p className="mt-1 text-xl font-semibold text-white">
                {completedDueCount}/{requiredTasks.length} complete
              </p>
            </div>
            <CalendarDays className="text-accent-400" size={24} aria-hidden="true" />
          </div>
          <div className="mt-4 space-y-2">
            {requiredTasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center justify-between gap-3 rounded-md bg-black/20 px-3 py-2">
                <span className="min-w-0 truncate text-sm text-slate-200">{task.title}</span>
                <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-400">{task.priority}</span>
              </div>
            ))}
            {requiredTasks.length === 0 ? (
              <p className="text-sm text-slate-400">No required items are due today.</p>
            ) : null}
          </div>
        </section>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <button type="button" onClick={() => onNavigate("today")} className="action-button">
          <PlusCircle size={18} />
          Add activity
        </button>
        <button type="button" onClick={() => onNavigate("today")} className="action-button">
          <Timer size={18} />
          Start timer
        </button>
        <button type="button" onClick={() => onNavigate("tasks")} className="action-button">
          <CalendarDays size={18} />
          Add task
        </button>
        <button type="button" onClick={() => onNavigate("today")} className="action-button">
          <CheckCircle2 size={18} />
          Complete habit
        </button>
      </section>
    </div>
  );
}
