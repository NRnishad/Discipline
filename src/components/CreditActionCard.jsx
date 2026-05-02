import { Minus, Pencil, Plus, Trash2 } from "lucide-react";
import { calculateEntryCredits } from "../lib/calculations";
import { clampNumber, formatMinutes } from "../lib/dateUtils";

export function CreditActionCard({ rule, quantity, onSetQuantity, onAdjust, onEdit, onDelete }) {
  const preview = calculateEntryCredits({ quantity }, rule);
  const step = rule.unit === "minute" ? 5 : 1;

  return (
    <article className="rounded-lg border border-white/10 bg-surface-850 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-medium text-white">{rule.name}</h3>
          <p className="mt-1 text-sm text-slate-400">
            {rule.thresholdQuantity
              ? `${formatMinutes(rule.creditValue)} per ${rule.thresholdQuantity} ${rule.unit}s`
              : `${formatMinutes(rule.creditValue)} per ${rule.unit}`}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className={rule.active ? "status-on" : "status-off"}>
            {rule.active ? "Active" : "Inactive"}
          </span>
          {onEdit ? (
            <button type="button" className="icon-button" onClick={() => onEdit(rule)} aria-label={`Edit ${rule.name}`} title="Edit">
              <Pencil size={15} />
            </button>
          ) : null}
          {onDelete ? (
            <button type="button" className="icon-button danger-icon" onClick={() => onDelete(rule.id)} aria-label={`Delete ${rule.name}`} title="Delete">
              <Trash2 size={15} />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          className="icon-button"
          onClick={() => onAdjust(rule.id, -step)}
          aria-label={`Decrease ${rule.name}`}
          title={`Decrease ${rule.name}`}
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          min="0"
          step={step}
          value={quantity}
          onChange={(event) => onSetQuantity(rule.id, clampNumber(event.target.value))}
          className="field text-center"
          aria-label={`${rule.name} quantity`}
        />
        <button
          type="button"
          className="icon-button"
          onClick={() => onAdjust(rule.id, step)}
          aria-label={`Increase ${rule.name}`}
          title={`Increase ${rule.name}`}
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="mt-4 rounded-md bg-black/20 p-3">
        <p className="text-sm text-slate-400">Earned preview</p>
        <p className="mt-1 text-lg font-semibold text-resolve-400">{formatMinutes(preview)}</p>
      </div>
    </article>
  );
}
