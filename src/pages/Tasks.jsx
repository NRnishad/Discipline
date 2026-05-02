import { useState } from "react";
import { TaskCard } from "../components/TaskCard";
import { TaskForm } from "../components/TaskForm";

export function Tasks({ appState, onSaveTask, onDeleteTask, onToggleTask }) {
  const [editingTask, setEditingTask] = useState(null);
  const dueTaskIds = new Set(appState.dueTasks.map((task) => task.id));

  function saveTask(task) {
    onSaveTask(task);
    setEditingTask(null);
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Habits and tasks</p>
          <h1>Tasks</h1>
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <TaskForm editingTask={editingTask} onSave={saveTask} onCancel={() => setEditingTask(null)} />

        <section className="space-y-3">
          <div className="section-heading">
            <div>
              <h2>Task list</h2>
              <p>Daily, weekly, monthly, and one-time items</p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {appState.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                date={appState.today}
                completions={appState.taskCompletions}
                dueToday={dueTaskIds.has(task.id)}
                onToggle={onToggleTask}
                onEdit={setEditingTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
