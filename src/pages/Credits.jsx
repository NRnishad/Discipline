import { useState } from "react";
import { CreditRuleCard } from "../components/CreditRuleCard";
import { CreditRuleForm } from "../components/CreditRuleForm";

export function Credits({ creditRules, onSaveRule, onDeleteRule, onToggleRule }) {
  const [editingRule, setEditingRule] = useState(null);
  const earningRules = creditRules.filter((rule) => rule.type === "earn");
  const spendingRules = creditRules.filter((rule) => rule.type === "spend");

  function saveRule(rule) {
    onSaveRule(rule);
    setEditingRule(null);
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Rules</p>
          <h1>Credits</h1>
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <CreditRuleForm editingRule={editingRule} onSave={saveRule} onCancel={() => setEditingRule(null)} />

        <div className="space-y-5">
          <section className="space-y-3">
            <div className="section-heading">
              <div>
                <h2>Earning rules</h2>
                <p>Productive actions that add credits</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {earningRules.map((rule) => (
                <CreditRuleCard
                  key={rule.id}
                  rule={rule}
                  onEdit={setEditingRule}
                  onDelete={onDeleteRule}
                  onToggle={onToggleRule}
                />
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div className="section-heading">
              <div>
                <h2>Spending rules</h2>
                <p>Entertainment categories that consume credits</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {spendingRules.map((rule) => (
                <CreditRuleCard
                  key={rule.id}
                  rule={rule}
                  onEdit={setEditingRule}
                  onDelete={onDeleteRule}
                  onToggle={onToggleRule}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
