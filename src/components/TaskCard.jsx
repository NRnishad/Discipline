import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import { isTaskCompleted } from "../lib/taskEngine";

function scheduleText(task) {
  if (task.repeat === "daily") return "Daily";
  if (task.repeat === "weekly") return `Every ${task.weekday}`;
  if (task.repeat === "monthly") return `Day ${task.dayOfMonth} monthly`;
  if (task.repeat === "none") return task.dueDate || "One-time";
  return task.repeat;
}

export function TaskCard({ task, date, completions, dueToday, onToggle, onEdit, onDelete }) {
  const completed = isTaskCompleted(task.id, completions, date);

  return (
    <article className={`rounded-lg border p-4 ${dueToday ? "border-accent-500/25 bg-accent-500/10" : "border-white/10 bg-surface-850"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-medium text-white">{task.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{scheduleText(task)}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className="icon-button" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`} title="Edit">
            <Pencil size={15} />
          </button>
          <button type="button" className="icon-button danger-icon" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`} title="Delete">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="badge">{task.type === "habit" ? "Habit" : "Task"}</span>
        <span className="badge">{task.required ? "Required" : "Optional"}</span>
        <span className="badge">{task.priority}</span>
        <span className={task.active ? "status-on" : "status-off"}>{task.active ? "Active" : "Inactive"}</span>
      </div>

      {task.notes ? <p className="mt-4 text-sm text-slate-400">{task.notes}</p> : null}

      {dueToday ? (
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition ${
            completed
              ? "border-resolve-500/30 bg-resolve-500/15 text-resolve-300"
              : "border-white/10 bg-black/20 text-slate-200 hover:bg-white/5"
          }`}
        >
          {completed ? <CheckCircle2 size={17} /> : <Circle size={17} />}
          {completed ? "Completed today" : "Mark complete"}
        </button>
      ) : null}
    </article>
  );
}
