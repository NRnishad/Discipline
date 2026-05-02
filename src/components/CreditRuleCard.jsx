import { Pencil, Power, Trash2 } from "lucide-react";
import { formatMinutes } from "../lib/dateUtils";

export function CreditRuleCard({ rule, onEdit, onDelete, onToggle }) {
  return (
    <article className="rounded-lg border border-white/10 bg-surface-850 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-medium text-white">{rule.name}</h3>
          <p className="mt-1 text-sm text-slate-400">
            {rule.type === "earn" ? "+" : "-"}
            {formatMinutes(rule.creditValue)}
            {rule.thresholdQuantity ? ` per ${rule.thresholdQuantity} ${rule.unit}s` : ` per ${rule.unit}`}
          </p>
        </div>
        <span className={rule.active ? "status-on" : "status-off"}>{rule.active ? "Active" : "Inactive"}</span>
      </div>

      {rule.notes ? <p className="mt-4 text-sm text-slate-400">{rule.notes}</p> : null}

      <div className="mt-4 flex items-center gap-2">
        <button type="button" className="icon-button" onClick={() => onEdit(rule)} aria-label={`Edit ${rule.name}`} title="Edit">
          <Pencil size={15} />
        </button>
        <button type="button" className="icon-button" onClick={() => onToggle(rule.id)} aria-label={`Toggle ${rule.name}`} title="Toggle active">
          <Power size={15} />
        </button>
        <button type="button" className="icon-button danger-icon" onClick={() => onDelete(rule.id)} aria-label={`Delete ${rule.name}`} title="Delete">
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
}
