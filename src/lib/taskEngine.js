import { format, parseISO, subDays } from "date-fns";

export function getTasksForDate(tasks, date) {
  const targetDate = parseISO(date);
  const weekday = format(targetDate, "EEEE").toLowerCase();
  const dayOfMonth = targetDate.getDate();

  return tasks.filter((task) => {
    if (!task.active) return false;

    if (task.repeat === "daily") return true;

    if (task.repeat === "weekly") {
      return task.weekday === weekday;
    }

    if (task.repeat === "monthly") {
      return Number(task.dayOfMonth) === dayOfMonth;
    }

    if (task.repeat === "none") {
      return task.dueDate === date;
    }

    return false;
  });
}

export function getRequiredTasksForDate(tasks, date) {
  return getTasksForDate(tasks, date).filter((task) => task.required);
}

export function isTaskCompleted(taskId, completions, date) {
  return completions.some((completion) => (
    completion.taskId === taskId &&
    completion.date === date &&
    completion.completed
  ));
}

export function upsertTaskCompletion(completions, taskId, date, completed) {
  const existing = completions.find((completion) => (
    completion.taskId === taskId && completion.date === date
  ));

  if (existing) {
    return completions.map((completion) => {
      if (completion.id !== existing.id) return completion;
      return {
        ...completion,
        completed,
        completedAt: completed ? new Date().toISOString() : null,
      };
    });
  }

  return [
    ...completions,
    {
      id: `completion_${taskId}_${date}`,
      taskId,
      date,
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    },
  ];
}

export function getTaskStreak(task, completions, date) {
  if (task.repeat !== "daily") {
    return isTaskCompleted(task.id, completions, date) ? 1 : 0;
  }

  let count = 0;
  let cursor = parseISO(date);

  for (let index = 0; index < 365; index += 1) {
    const key = format(cursor, "yyyy-MM-dd");
    if (!isTaskCompleted(task.id, completions, key)) break;
    count += 1;
    cursor = subDays(cursor, 1);
  }

  return count;
}

export function isPerfectDay({ availableBalanceBeforeToday, dailySummary, requiredTasks, completions, date }) {
  const enoughCredits = dailySummary.spent <= availableBalanceBeforeToday + dailySummary.earned;
  const allRequiredCompleted = requiredTasks.every((task) => (
    completions.some((completion) => (
      completion.taskId === task.id &&
      completion.date === date &&
      completion.completed === true
    ))
  ));

  return enoughCredits && allRequiredCompleted;
}
