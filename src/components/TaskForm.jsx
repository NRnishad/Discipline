import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";

const blankTask = {
  title: "",
  type: "task",
  repeat: "none",
  dueDate: "",
  weekday: "friday",
  dayOfMonth: 15,
  required: true,
  priority: "medium",
  notes: "",
  active: true,
};

export function TaskForm({ editingTask, onSave, onCancel }) {
  const [form, setForm] = useState(blankTask);

  useEffect(() => {
    setForm(editingTask || blankTask);
  }, [editingTask]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!form.title.trim()) return;
    onSave({
      ...form,
      title: form.title.trim(),
      dayOfMonth: Number(form.dayOfMonth) || 1,
    });
    setForm(blankTask);
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-white/10 bg-surface-850 p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">{editingTask ? "Edit task" : "Add task"}</h2>
        {editingTask ? (
          <button type="button" onClick={onCancel} className="icon-button" aria-label="Cancel edit" title="Cancel">
            <X size={16} />
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="label md:col-span-2">
          Title
          <input
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="field mt-2"
            placeholder="Task title"
          />
        </label>

        <label className="label">
          Type
          <select value={form.type} onChange={(event) => updateField("type", event.target.value)} className="field mt-2">
            <option value="task">Task</option>
            <option value="habit">Habit</option>
          </select>
        </label>

        <label className="label">
          Repeat
          <select value={form.repeat} onChange={(event) => updateField("repeat", event.target.value)} className="field mt-2">
            <option value="none">One-time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>

        {form.repeat === "none" ? (
          <label className="label">
            Due date
            <input
              type="date"
              value={form.dueDate || ""}
              onChange={(event) => updateField("dueDate", event.target.value)}
              className="field mt-2"
            />
          </label>
        ) : null}

        {form.repeat === "weekly" ? (
          <label className="label">
            Weekday
            <select value={form.weekday} onChange={(event) => updateField("weekday", event.target.value)} className="field mt-2">
              {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </label>
        ) : null}

        {form.repeat === "monthly" ? (
          <label className="label">
            Day of month
            <input
              type="number"
              min="1"
              max="31"
              value={form.dayOfMonth}
              onChange={(event) => updateField("dayOfMonth", event.target.value)}
              className="field mt-2"
            />
          </label>
        ) : null}

        <label className="label">
          Priority
          <select value={form.priority} onChange={(event) => updateField("priority", event.target.value)} className="field mt-2">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>

        <label className="label md:col-span-2">
          Notes
          <textarea
            value={form.notes || ""}
            onChange={(event) => updateField("notes", event.target.value)}
            className="field mt-2 min-h-24"
            placeholder="Optional notes"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <label className="toggle">
          <input
            type="checkbox"
            checked={form.required}
            onChange={(event) => updateField("required", event.target.checked)}
          />
          Required
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(event) => updateField("active", event.target.checked)}
          />
          Active
        </label>
      </div>

      <button type="submit" className="primary-button mt-4">
        <Save size={17} />
        Save task
      </button>
    </form>
  );
}
