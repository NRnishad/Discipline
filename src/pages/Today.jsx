import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CreditActionCard } from "../components/CreditActionCard";
import { EarningActionForm } from "../components/EarningActionForm";
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
  onSaveRule,
  onDeleteRule,
}) {
  const [showActionForm, setShowActionForm] = useState(false);
  const [editingAction, setEditingAction] = useState(null);
  const earningRules = appState.creditRules.filter((rule) => rule.type === "earn");
  const spendingRules = appState.creditRules.filter((rule) => rule.type === "spend");
  const habits = appState.dueTasks.filter((task) => task.type === "habit");
  const spendingByCategory = Object.fromEntries(
    spendingRules.map((rule) => [rule.name, getQuantityByCategory(appState.todayLog, rule.name)])
  );

  function openAddAction() {
    setEditingAction(null);
    setShowActionForm(true);
  }

  function openEditAction(rule) {
    setEditingAction(rule);
    setShowActionForm(true);
  }

  function saveAction(action) {
    onSaveRule(action);
    setEditingAction(null);
    setShowActionForm(false);
  }

  function closeActionForm() {
    setEditingAction(null);
    setShowActionForm(false);
  }

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
          <button type="button" onClick={openAddAction} className="secondary-button">
            <PlusCircle size={17} />
            Add action
          </button>
        </div>
        {showActionForm ? (
          <EarningActionForm
            editingAction={editingAction}
            onSave={saveAction}
            onCancel={closeActionForm}
          />
        ) : null}
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {earningRules.map((rule) => (
            <CreditActionCard
              key={rule.id}
              rule={rule}
              quantity={getQuantityForRule(appState.todayLog, rule.id)}
              onSetQuantity={onSetRuleQuantity}
              onAdjust={onAdjustRuleQuantity}
              onEdit={openEditAction}
              onDelete={onDeleteRule}
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
