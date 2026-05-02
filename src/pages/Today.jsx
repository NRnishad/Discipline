import { CreditActionCard } from "../components/CreditActionCard";
import { SpendingCard } from "../components/SpendingCard";
import { TimerCard } from "../components/TimerCard";
import { TodayHabits } from "../components/TodayHabits";
import { getQuantityForRule, getQuantityByCategory } from "../lib/calculations";
import { formatDisplayDate, formatMinutes } from "../lib/dateUtils";

export function Today({
  appState,
  onToggleTask,
  onSetRuleQuantity,
  onAdjustRuleQuantity,
  onAddSpending,
  onStartTimer,
  onStopTimer,
}) {
  const earningRules = appState.creditRules.filter((rule) => rule.type === "earn");
  const spendingRules = appState.creditRules.filter((rule) => rule.type === "spend");
  const habits = appState.dueTasks.filter((task) => task.type === "habit");
  const spendingByCategory = Object.fromEntries(
    spendingRules.map((rule) => [rule.name, getQuantityByCategory(appState.todayLog, rule.name)])
  );

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">{formatDisplayDate(appState.today)}</p>
          <h1>Today</h1>
        </div>
        <div className="header-metrics">
          <span>Earned {formatMinutes(appState.todaySummary.earned)}</span>
          <span>Used {formatMinutes(appState.todaySummary.spent)}</span>
        </div>
      </header>

      <TodayHabits
        tasks={habits}
        completions={appState.taskCompletions}
        date={appState.today}
        onToggle={onToggleTask}
      />

      <section className="space-y-3">
        <div className="section-heading">
          <div>
            <h2>Credit Actions</h2>
            <p>Quantity-based earning entries</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {earningRules.map((rule) => (
            <CreditActionCard
              key={rule.id}
              rule={rule}
              quantity={getQuantityForRule(appState.todayLog, rule.id)}
              onSetQuantity={onSetRuleQuantity}
              onAdjust={onAdjustRuleQuantity}
            />
          ))}
        </div>
      </section>

      <TimerCard
        spendingRules={spendingRules}
        activeTimer={appState.activeTimer}
        onStart={onStartTimer}
        onStop={onStopTimer}
      />

      <SpendingCard
        rules={spendingRules}
        quantitiesByCategory={spendingByCategory}
        onAddSpending={onAddSpending}
      />
    </div>
  );
}
