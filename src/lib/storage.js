import { defaultCreditRules } from "../data/defaultCreditRules";
import { defaultSettings } from "../data/defaultSettings";
import { defaultTasks } from "../data/defaultTasks";

export const STORAGE_KEYS = {
  settings: "discipline_os_settings",
  creditRules: "discipline_os_credit_rules",
  dailyLogs: "discipline_os_daily_logs",
  tasks: "discipline_os_tasks",
  taskCompletions: "discipline_os_task_completions",
  timerSessions: "discipline_os_timer_sessions",
};

function isBrowserStorageAvailable() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readJson(key, fallback) {
  if (!isBrowserStorageAvailable()) return fallback;

  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) return fallback;
    return JSON.parse(rawValue);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (!isBrowserStorageAvailable()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadSettings() {
  return { ...defaultSettings, ...readJson(STORAGE_KEYS.settings, defaultSettings) };
}

export function saveSettings(settings) {
  writeJson(STORAGE_KEYS.settings, settings);
}

export function loadCreditRules() {
  return readJson(STORAGE_KEYS.creditRules, defaultCreditRules);
}

export function saveCreditRules(rules) {
  writeJson(STORAGE_KEYS.creditRules, rules);
}

export function loadDailyLogs() {
  return readJson(STORAGE_KEYS.dailyLogs, []);
}

export function saveDailyLogs(logs) {
  writeJson(STORAGE_KEYS.dailyLogs, logs);
}

export function loadTasks() {
  return readJson(STORAGE_KEYS.tasks, defaultTasks);
}

export function saveTasks(tasks) {
  writeJson(STORAGE_KEYS.tasks, tasks);
}

export function loadTaskCompletions() {
  return readJson(STORAGE_KEYS.taskCompletions, []);
}

export function saveTaskCompletions(completions) {
  writeJson(STORAGE_KEYS.taskCompletions, completions);
}

export function loadTimerSessions() {
  return readJson(STORAGE_KEYS.timerSessions, []);
}

export function saveTimerSessions(sessions) {
  writeJson(STORAGE_KEYS.timerSessions, sessions);
}

export function exportAllData() {
  return {
    settings: loadSettings(),
    creditRules: loadCreditRules(),
    dailyLogs: loadDailyLogs(),
    tasks: loadTasks(),
    taskCompletions: loadTaskCompletions(),
    timerSessions: loadTimerSessions(),
    exportedAt: new Date().toISOString(),
  };
}

export function resetAllData() {
  if (!isBrowserStorageAvailable()) return;
  Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
}
