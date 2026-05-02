import { isSameMonth, parseISO, subDays, format } from "date-fns";
import { getPastDateKeys, getTodayKey, isDateBefore } from "./dateUtils";
import { getTasksForDate, isPerfectDay } from "./taskEngine";

export function calculateEntryCredits(entry, rule) {
  if (!rule?.active) return 0;

  if (rule.type === "earn") {
    const quantity = Number(entry.quantity) || 0;
    if (rule.thresholdQuantity) {
      return Math.floor(quantity / Number(rule.thresholdQuantity)) * Number(rule.creditValue || 0);
    }

    return quantity * Number(rule.creditValue || 0);
  }

  return 0;
}

export function calculateEntrySpend(entry, rule) {
  if (!rule?.active) return 0;

  if (rule.type === "spend") {
    return (Number(entry.quantity) || 0) * Number(rule.creditValue || 0);
  }

  return 0;
}

export function calculateDailySummary(log, rules) {
  let earned = 0;
  let spent = 0;

  for (const entry of log?.entries || []) {
    const rule = rules.find((item) => item.id === entry.ruleId);
    if (!rule) continue;

    earned += calculateEntryCredits(entry, rule);
    spent += calculateEntrySpend(entry, rule);
  }

  return {
    earned,
    spent,
    net: earned - spent,
  };
}

export function getLogForDate(logs, date) {
  return logs.find((log) => log.date === date) || {
    id: `log_${date}`,
    date,
    entries: [],
    restDay: false,
    notes: "",
  };
}

export function calculateSummaryForDate(logs, rules, date) {
  return calculateDailySummary(getLogForDate(logs, date), rules);
}

export function calculateBalanceBeforeDate(settings, logs, rules, date) {
  const startingBalance = Number(settings.startingBalanceMinutes) || 0;
  const previousNet = logs
    .filter((log) => isDateBefore(log.date, date))
    .reduce((total, log) => total + calculateDailySummary(log, rules).net, 0);

  return startingBalance + previousNet;
}

export function calculateAvailableBalance(settings, logs, rules, date = getTodayKey()) {
  const beforeToday = calculateBalanceBeforeDate(settings, logs, rules, date);
  const today = calculateSummaryForDate(logs, rules, date);

  return beforeToday + today.net;
}

export function calculateDisciplineScore({
  settings,
  logs,
  rules,
  tasks,
  completions,
  date = getTodayKey(),
}) {
  const summary = calculateSummaryForDate(logs, rules, date);
  const balanceBefore = calculateBalanceBeforeDate(settings, logs, rules, date);
  const dueTasks = getTasksForDate(tasks, date);
  const requiredTasks = dueTasks.filter((task) => task.required);
  const completedRequired = requiredTasks.filter((task) =>
    completions.some((completion) => (
      completion.taskId === task.id &&
      completion.date === date &&
      completion.completed
    ))
  ).length;

  const completionScore = requiredTasks.length
    ? (completedRequired / requiredTasks.length) * 70
    : 70;
  const creditCovered = summary.spent <= balanceBefore + summary.earned;
  const creditScore = creditCovered ? 30 : Math.max(0, 30 - Math.abs(balanceBefore + summary.net));

  return Math.round(Math.min(100, completionScore + creditScore));
}

export function calculateAnalytics({
  settings,
  logs,
  rules,
  tasks,
  completions,
  days = 14,
  endDate = getTodayKey(),
}) {
  const dateKeys = getPastDateKeys(days, endDate);
  let runningBalance = calculateBalanceBeforeDate(settings, logs, rules, dateKeys[0]);

  return dateKeys.map((date) => {
    const log = getLogForDate(logs, date);
    const summary = calculateDailySummary(log, rules);
    const dueTasks = getTasksForDate(tasks, date);
    const requiredTasks = dueTasks.filter((task) => task.required);
    const completedRequired = requiredTasks.filter((task) =>
      completions.some((completion) => (
        completion.taskId === task.id &&
        completion.date === date &&
        completion.completed
      ))
    ).length;

    const pushups = getQuantityForRule(log, "rule_pushup");
    const pullups = getQuantityForRule(log, "rule_pullup");
    const handGrip = getQuantityForRule(log, "rule_hand_grip");
    const study = getQuantityForRule(log, "rule_study");
    const balanceBefore = runningBalance;
    runningBalance += summary.net;

    return {
      date,
      label: format(parseISO(date), "MMM d"),
      earned: summary.earned,
      spent: summary.spent,
      net: summary.net,
      balance: runningBalance,
      habitCompletionRate: requiredTasks.length
        ? Math.round((completedRequired / requiredTasks.length) * 100)
        : 100,
      perfect: isPerfectDay({
        availableBalanceBeforeToday: balanceBefore,
        dailySummary: summary,
        requiredTasks,
        completions,
        date,
      }) ? 1 : 0,
      pushups,
      pullups,
      handGrip,
      study,
    };
  });
}

export function getPerfectDaysThisMonth({ settings, logs, rules, tasks, completions, date = getTodayKey() }) {
  const target = parseISO(date);
  return logs.filter((log) => {
    if (!isSameMonth(parseISO(log.date), target)) return false;
    const balanceBefore = calculateBalanceBeforeDate(settings, logs, rules, log.date);
    const summary = calculateDailySummary(log, rules);
    const requiredTasks = getTasksForDate(tasks, log.date).filter((task) => task.required);
    return isPerfectDay({
      availableBalanceBeforeToday: balanceBefore,
      dailySummary: summary,
      requiredTasks,
      completions,
      date: log.date,
    });
  }).length;
}

export function getCurrentStreak({ settings, logs, rules, tasks, completions, date = getTodayKey() }) {
  let count = 0;
  let cursor = parseISO(date);

  for (let index = 0; index < 365; index += 1) {
    const key = format(cursor, "yyyy-MM-dd");
    const balanceBefore = calculateBalanceBeforeDate(settings, logs, rules, key);
    const summary = calculateSummaryForDate(logs, rules, key);
    const requiredTasks = getTasksForDate(tasks, key).filter((task) => task.required);
    const perfect = isPerfectDay({
      availableBalanceBeforeToday: balanceBefore,
      dailySummary: summary,
      requiredTasks,
      completions,
      date: key,
    });

    if (!perfect) break;
    count += 1;
    cursor = subDays(cursor, 1);
  }

  return count;
}

export function getQuantityForRule(log, ruleId) {
  return (log?.entries || [])
    .filter((entry) => entry.ruleId === ruleId)
    .reduce((total, entry) => total + (Number(entry.quantity) || 0), 0);
}

export function getQuantityByCategory(log, category) {
  return (log?.entries || [])
    .filter((entry) => entry.category === category)
    .reduce((total, entry) => total + (Number(entry.quantity) || 0), 0);
}
