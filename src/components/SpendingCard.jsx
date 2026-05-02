import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { clampNumber, formatMinutes } from "../lib/dateUtils";

export function SpendingCard({ rules, quantitiesByCategory, onAddSpending }) {
  const activeRules = rules.filter((rule) => rule.active);
  const [category, setCategory] = useState(activeRules[0]?.name || "Entertainment");
  const [minutes, setMinutes] = useState(15);

  function submit(event) {
    event.preventDefault();
    const selectedRule = activeRules.find((rule) => rule.name === category) || activeRules[0];
    const quantity = clampNumber(minutes);
    if (!selectedRule || quantity <= 0) return;
    onAddSpending(selectedRule.id, selectedRule.name, quantity, "manual");
    setMinutes(15);
  }

  return (
    <section className="space-y-3">
      <div className="section-heading">
        <div>
          <h2>Entertainment Spending</h2>
          <p>Manual entries consume credit minutes</p>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-[0.8fr_1.2fr]">
        <form onSubmit={submit} className="rounded-lg border border-white/10 bg-surface-850 p-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <label className="label">
              Category
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="field mt-2">
                {activeRules.map((rule) => (
                  <option key={rule.id} value={rule.name}>{rule.name}</option>
                ))}
              </select>
            </label>
            <label className="label">
              Minutes
              <input
                type="number"
                min="0"
                value={minutes}
                onChange={(event) => setMinutes(event.target.value)}
                className="field mt-2"
              />
            </label>
          </div>
          <button type="submit" className="primary-button mt-4 w-full">
            <PlusCircle size={17} />
            Add spending
          </button>
        </form>

        <div className="grid gap-3 sm:grid-cols-2">
          {activeRules.map((rule) => (
            <article key={rule.id} className="rounded-lg border border-white/10 bg-surface-850 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="min-w-0 truncate text-sm font-medium text-white">{rule.name}</h3>
                <span className="badge">-{rule.creditValue}/{rule.unit}</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">
                {formatMinutes(quantitiesByCategory[rule.name] || 0)}
              </p>
              <p className="mt-1 text-sm text-slate-400">Used today</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
