import { useEffect, useMemo, useState } from "react";
import { Dashboard } from "./pages/Dashboard";
import { Today } from "./pages/Today";
import { Credits } from "./pages/Credits";
import { Tasks } from "./pages/Tasks";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { BottomNav, SidebarNav } from "./components/BottomNav";
import { Login } from "./pages/Login";
import {
  calculateAnalytics,
  calculateAvailableBalance,
  calculateBalanceBeforeDate,
  calculateDisciplineScore,
  calculateSummaryForDate,
  getCurrentStreak,
  getLogForDate,
  getPerfectDaysThisMonth,
  getQuantityForRule,
} from "./lib/calculations";
import { createId, getTodayKey, toDateKey } from "./lib/dateUtils";
import {
  loadCreditRules,
  loadDailyLogs,
  loadSettings,
  loadTaskCompletions,
  loadTasks,
  loadTimerSessions,
  resetAllData,
  saveCreditRules,
  saveDailyLogs,
  saveSettings,
  saveTaskCompletions,
  saveTasks,
  saveTimerSessions,
} from "./lib/storage";
import { getTasksForDate, isPerfectDay, isTaskCompleted, upsertTaskCompletion } from "./lib/taskEngine";
import { defaultCreditRules } from "./data/defaultCreditRules";
import { defaultSettings } from "./data/defaultSettings";
import { defaultTasks } from "./data/defaultTasks";
import { listenToAuthState, loginWithEmailPassword, logoutUser } from "./lib/auth";
import { loadDisciplineData, saveDisciplineData } from "./lib/cloudStorage";

const pages = {
  dashboard: Dashboard,
  today: Today,
  credits: Credits,
  tasks: Tasks,
  analytics: Analytics,
  settings: Settings,
};

function createEmptyLog(date) {
  return {
    id: `log_${date}`,
    date,
    entries: [],
    restDay: false,
    notes: "",
  };
}

function normalizeQuantity(value) {
  const quantity = Number(value);
  if (!Number.isFinite(quantity)) return 0;
  return Math.max(0, quantity);
}

function LoadingScreen({ message }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-950 px-4 text-slate-100">
      <section className="rounded-lg border border-white/10 bg-surface-850 p-6 text-center shadow-soft">
        <p className="eyebrow">Discipline OS</p>
        <h1 className="text-2xl font-semibold text-white">{message}</h1>
      </section>
    </main>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [cloudReady, setCloudReady] = useState(false);
  const [cloudError, setCloudError] = useState("");
  const [settings, setSettings] = useState(() => loadSettings());
  const [creditRules, setCreditRules] = useState(() => loadCreditRules());
  const [dailyLogs, setDailyLogs] = useState(() => loadDailyLogs());
  const [tasks, setTasks] = useState(() => loadTasks());
  const [taskCompletions, setTaskCompletions] = useState(() => loadTaskCompletions());
  const [timerSessions, setTimerSessions] = useState(() => loadTimerSessions());

  const today = getTodayKey();
  const todayLog = useMemo(() => getLogForDate(dailyLogs, today), [dailyLogs, today]);
  const todaySummary = useMemo(
    () => calculateSummaryForDate(dailyLogs, creditRules, today),
    [dailyLogs, creditRules, today]
  );
  const availableBalanceBeforeToday = useMemo(
    () => calculateBalanceBeforeDate(settings, dailyLogs, creditRules, today),
    [settings, dailyLogs, creditRules, today]
  );
  const availableBalance = useMemo(
    () => calculateAvailableBalance(settings, dailyLogs, creditRules, today),
    [settings, dailyLogs, creditRules, today]
  );
  const dueTasks = useMemo(() => getTasksForDate(tasks, today), [tasks, today]);
  const requiredDueTasks = useMemo(() => dueTasks.filter((task) => task.required), [dueTasks]);
  const completedRequiredCount = useMemo(
    () => requiredDueTasks.filter((task) => isTaskCompleted(task.id, taskCompletions, today)).length,
    [requiredDueTasks, taskCompletions, today]
  );
  const perfectDay = useMemo(
    () => isPerfectDay({
      availableBalanceBeforeToday,
      dailySummary: todaySummary,
      requiredTasks: requiredDueTasks,
      completions: taskCompletions,
      date: today,
    }),
    [availableBalanceBeforeToday, todaySummary, requiredDueTasks, taskCompletions, today]
  );
  const disciplineScore = useMemo(
    () => calculateDisciplineScore({
      settings,
      logs: dailyLogs,
      rules: creditRules,
      tasks,
      completions: taskCompletions,
      date: today,
    }),
    [settings, dailyLogs, creditRules, tasks, taskCompletions, today]
  );
  const currentStreak = useMemo(
    () => getCurrentStreak({
      settings,
      logs: dailyLogs,
      rules: creditRules,
      tasks,
      completions: taskCompletions,
      date: today,
    }),
    [settings, dailyLogs, creditRules, tasks, taskCompletions, today]
  );
  const analyticsData = useMemo(
    () => calculateAnalytics({
      settings,
      logs: dailyLogs,
      rules: creditRules,
      tasks,
      completions: taskCompletions,
      days: 14,
      endDate: today,
    }),
    [settings, dailyLogs, creditRules, tasks, taskCompletions, today]
  );
  const perfectDaysThisMonth = useMemo(
    () => getPerfectDaysThisMonth({
      settings,
      logs: dailyLogs,
      rules: creditRules,
      tasks,
      completions: taskCompletions,
      date: today,
    }),
    [settings, dailyLogs, creditRules, tasks, taskCompletions, today]
  );
  const activeTimer = useMemo(
    () => timerSessions.find((session) => session.status === "active"),
    [timerSessions]
  );
  const disciplineData = useMemo(() => ({
    schemaVersion: 1,
    settings,
    creditRules,
    dailyLogs,
    tasks,
    taskCompletions,
    timerSessions,
  }), [settings, creditRules, dailyLogs, tasks, taskCompletions, timerSessions]);

  useEffect(() => {
    return listenToAuthState((user) => {
      setAuthUser(user);
      setAuthLoading(false);
      if (!user) {
        setCloudReady(false);
      }
    });
  }, []);

  useEffect(() => saveSettings(settings), [settings]);
  useEffect(() => saveCreditRules(creditRules), [creditRules]);
  useEffect(() => saveDailyLogs(dailyLogs), [dailyLogs]);
  useEffect(() => saveTasks(tasks), [tasks]);
  useEffect(() => saveTaskCompletions(taskCompletions), [taskCompletions]);
  useEffect(() => saveTimerSessions(timerSessions), [timerSessions]);

  useEffect(() => {
    if (authLoading || !authUser) return undefined;

    let cancelled = false;

    async function loadCloudState() {
      setCloudReady(false);
      setCloudError("");

      try {
        const cloudData = await loadDisciplineData(authUser.uid);
        if (cancelled) return;

        if (cloudData) {
          setSettings({ ...defaultSettings, ...(cloudData.settings || {}) });
          setCreditRules(Array.isArray(cloudData.creditRules) && cloudData.creditRules.length
            ? cloudData.creditRules
            : defaultCreditRules);
          setDailyLogs(Array.isArray(cloudData.dailyLogs) ? cloudData.dailyLogs : []);
          setTasks(Array.isArray(cloudData.tasks) && cloudData.tasks.length ? cloudData.tasks : defaultTasks);
          setTaskCompletions(Array.isArray(cloudData.taskCompletions) ? cloudData.taskCompletions : []);
          setTimerSessions(Array.isArray(cloudData.timerSessions) ? cloudData.timerSessions : []);
        } else {
          await saveDisciplineData(authUser.uid, {
            schemaVersion: 1,
            settings,
            creditRules,
            dailyLogs,
            tasks,
            taskCompletions,
            timerSessions,
          });
        }

        if (!cancelled) {
          setCloudReady(true);
        }
      } catch (error) {
        if (!cancelled) {
          setCloudError(error.message || "Could not load Firebase data.");
          setCloudReady(true);
        }
      }
    }

    loadCloudState();

    return () => {
      cancelled = true;
    };
  }, [authLoading, authUser?.uid]);

  useEffect(() => {
    if (!authUser || !cloudReady) return undefined;

    const handle = window.setTimeout(() => {
      saveDisciplineData(authUser.uid, disciplineData).catch((error) => {
        setCloudError(error.message || "Could not save Firebase data.");
      });
    }, 600);

    return () => window.clearTimeout(handle);
  }, [authUser, cloudReady, disciplineData]);

  function updateLog(date, updater) {
    setDailyLogs((currentLogs) => {
      const existingLog = currentLogs.find((log) => log.date === date) || createEmptyLog(date);
      const updatedLog = updater(existingLog);
      const exists = currentLogs.some((log) => log.date === date);

      if (exists) {
        return currentLogs.map((log) => (log.date === date ? updatedLog : log));
      }

      return [...currentLogs, updatedLog].sort((a, b) => a.date.localeCompare(b.date));
    });
  }

  function setRuleQuantity(ruleId, quantity) {
    const safeQuantity = normalizeQuantity(quantity);

    updateLog(today, (log) => {
      const entries = log.entries.filter((entry) => !(entry.ruleId === ruleId && entry.kind === "daily_total"));
      if (safeQuantity <= 0) {
        return { ...log, entries };
      }

      return {
        ...log,
        entries: [
          ...entries,
          {
            id: `entry_${today}_${ruleId}`,
            ruleId,
            quantity: safeQuantity,
            kind: "daily_total",
            createdAt: new Date().toISOString(),
          },
        ],
      };
    });
  }

  function adjustRuleQuantity(ruleId, delta) {
    const nextQuantity = getQuantityForRule(todayLog, ruleId) + delta;
    setRuleQuantity(ruleId, nextQuantity);
  }

  function addSpending(ruleId, category, quantity, method = "manual") {
    const safeQuantity = normalizeQuantity(quantity);
    if (safeQuantity <= 0) return;

    updateLog(today, (log) => ({
      ...log,
      entries: [
        ...log.entries,
        {
          id: createId("entry"),
          ruleId,
          quantity: safeQuantity,
          category,
          method,
          createdAt: new Date().toISOString(),
        },
      ],
    }));
  }

  function startTimer(ruleId, category) {
    if (activeTimer) return;

    setTimerSessions((current) => [
      ...current,
      {
        id: createId("timer"),
        ruleId,
        category,
        startTime: new Date().toISOString(),
        endTime: null,
        durationMinutes: 0,
        status: "active",
      },
    ]);
  }

  function stopTimer(timerId) {
    const timer = timerSessions.find((session) => session.id === timerId);
    if (!timer) return;

    const endTime = new Date();
    const durationMinutes = Math.max(1, Math.round((endTime - new Date(timer.startTime)) / 60000));
    const dateKey = toDateKey(endTime);

    setTimerSessions((current) => current.map((session) => {
      if (session.id !== timerId) return session;

      return {
        ...session,
        endTime: endTime.toISOString(),
        durationMinutes,
        status: "completed",
      };
    }));

    updateLog(dateKey, (log) => ({
      ...log,
      entries: [
        ...log.entries,
        {
          id: createId("entry"),
          ruleId: timer.ruleId,
          quantity: durationMinutes,
          category: timer.category,
          method: "timer",
          timerSessionId: timer.id,
          createdAt: endTime.toISOString(),
        },
      ],
    }));
  }

  function toggleTask(taskId) {
    const completed = !isTaskCompleted(taskId, taskCompletions, today);
    setTaskCompletions((current) => upsertTaskCompletion(current, taskId, today, completed));
  }

  function saveTask(task) {
    const payload = {
      ...task,
      id: task.id || createId("task"),
      title: task.title.trim(),
      repeat: task.repeat || "none",
      required: Boolean(task.required),
      active: Boolean(task.active),
    };

    setTasks((current) => {
      if (current.some((item) => item.id === payload.id)) {
        return current.map((item) => (item.id === payload.id ? payload : item));
      }

      return [...current, payload];
    });
  }

  function deleteTask(taskId) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
    setTaskCompletions((current) => current.filter((completion) => completion.taskId !== taskId));
  }

  function saveRule(rule) {
    const payload = {
      ...rule,
      id: rule.id || createId("rule"),
      name: rule.name.trim(),
      creditValue: Number(rule.creditValue) || 0,
      thresholdQuantity: rule.thresholdQuantity ? Number(rule.thresholdQuantity) : undefined,
      active: Boolean(rule.active),
    };

    setCreditRules((current) => {
      if (current.some((item) => item.id === payload.id)) {
        return current.map((item) => (item.id === payload.id ? payload : item));
      }

      return [...current, payload];
    });
  }

  function deleteRule(ruleId) {
    setCreditRules((current) => current.filter((rule) => rule.id !== ruleId));
  }

  function toggleRule(ruleId) {
    setCreditRules((current) => current.map((rule) => (
      rule.id === ruleId ? { ...rule, active: !rule.active } : rule
    )));
  }

  function saveAppSettings(nextSettings) {
    setSettings(nextSettings);
    setCreditRules((current) => current.map((rule) => {
      if (rule.id === "rule_pushup") return { ...rule, creditValue: nextSettings.pushupCreditValue };
      if (rule.id === "rule_pullup") return { ...rule, creditValue: nextSettings.pullupCreditValue };
      if (rule.id === "rule_hand_grip") return { ...rule, creditValue: nextSettings.handGripCreditValue };
      if (rule.id === "rule_study") {
        return {
          ...rule,
          creditValue: nextSettings.studyReward,
          thresholdQuantity: nextSettings.studySessionLength,
        };
      }
      return rule;
    }));
  }

  function exportData() {
    const payload = {
      ...disciplineData,
      firebaseUser: authUser ? {
        uid: authUser.uid,
        email: authUser.email,
      } : null,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `discipline-os-export-${today}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function resetData() {
    const confirmed = window.confirm("Reset all Discipline OS data on this browser?");
    if (!confirmed) return;

    resetAllData();
    setSettings(defaultSettings);
    setCreditRules(defaultCreditRules);
    setDailyLogs([]);
    setTasks(defaultTasks);
    setTaskCompletions([]);
    setTimerSessions([]);
    setCurrentPage("dashboard");
  }

  async function handleLogout() {
    await logoutUser();
    setCurrentPage("dashboard");
  }

  const appState = {
    settings,
    creditRules,
    dailyLogs,
    tasks,
    taskCompletions,
    timerSessions,
    today,
    todayLog,
    todaySummary,
    availableBalanceBeforeToday,
    availableBalance,
    dueTasks,
    requiredDueTasks,
    completedRequiredCount,
    perfectDay,
    disciplineScore,
    currentStreak,
    activeTimer,
  };

  const CurrentPage = pages[currentPage] || Dashboard;

  if (authLoading) {
    return <LoadingScreen message="Checking Firebase session..." />;
  }

  if (!authUser) {
    return <Login onLogin={loginWithEmailPassword} />;
  }

  if (!cloudReady) {
    return <LoadingScreen message="Loading your Discipline OS data..." />;
  }

  return (
    <div className="min-h-screen bg-surface-950 text-slate-100">
      <div className="flex min-h-screen">
        <SidebarNav
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          appName={settings.appName}
          userEmail={authUser.email}
          onLogout={handleLogout}
        />
        <main className="min-w-0 flex-1 px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-surface-850 p-3 lg:hidden">
              <p className="min-w-0 truncate text-sm text-slate-300">{authUser.email}</p>
              <button type="button" onClick={handleLogout} className="secondary-button shrink-0">
                Sign out
              </button>
            </div>

            {cloudError ? (
              <div className="mb-4 rounded-lg border border-caution-500/30 bg-caution-500/10 px-4 py-3 text-sm text-caution-400">
                Firebase sync warning: {cloudError}
              </div>
            ) : null}

            <CurrentPage
              appState={appState}
              onNavigate={setCurrentPage}
              onToggleTask={toggleTask}
              onSetRuleQuantity={setRuleQuantity}
              onAdjustRuleQuantity={adjustRuleQuantity}
              onAddSpending={addSpending}
              onStartTimer={startTimer}
              onStopTimer={stopTimer}
              creditRules={creditRules}
              onSaveRule={saveRule}
              onDeleteRule={deleteRule}
              onToggleRule={toggleRule}
              onSaveTask={saveTask}
              onDeleteTask={deleteTask}
              analyticsData={analyticsData}
              perfectDaysThisMonth={perfectDaysThisMonth}
              settings={settings}
              onSaveSettings={saveAppSettings}
              onExportData={exportData}
              onResetData={resetData}
            />
          </div>
        </main>
      </div>
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}
