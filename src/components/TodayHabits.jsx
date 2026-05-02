import { CheckCircle2, Circle } from "lucide-react";
import { getTaskStreak, isTaskCompleted } from "../lib/taskEngine";

export function TodayHabits({ tasks, completions, date, onToggle }) {
  return (
    <section className="space-y-3">
      <div className="section-heading">
        <div>
          <h2>Habits</h2>
          <p>Daily completion checkpoints</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tasks.map((task) => {
          const completed = isTaskCompleted(task.id, completions, date);
          const streak = getTaskStreak(task, completions, date);

          return (
            <button
              key={task.id}
              type="button"
              onClick={() => onToggle(task.id)}
              className={`rounded-lg border p-4 text-left transition ${
                completed
                  ? "border-resolve-500/35 bg-resolve-500/10"
                  : "border-white/10 bg-surface-850 hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-base font-medium text-white">{task.title}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="badge">{task.required ? "Required" : "Optional"}</span>
                    <span className="badge">{streak} day streak</span>
                  </div>
                </div>
                {completed ? (
                  <CheckCircle2 className="shrink-0 text-resolve-400" size={22} aria-hidden="true" />
                ) : (
                  <Circle className="shrink-0 text-slate-500" size={22} aria-hidden="true" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
