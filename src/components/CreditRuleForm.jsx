import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";

const blankRule = {
  name: "",
  type: "earn",
  unit: "minute",
  creditValue: 1,
  creditUnit: "minute",
  thresholdQuantity: "",
  active: true,
  notes: "",
};

export function CreditRuleForm({ editingRule, onSave, onCancel }) {
  const [form, setForm] = useState(blankRule);

  useEffect(() => {
    setForm(editingRule ? { ...editingRule, thresholdQuantity: editingRule.thresholdQuantity || "" } : blankRule);
  }, [editingRule]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!form.name.trim()) return;

    onSave({
      ...form,
      name: form.name.trim(),
      creditValue: Number(form.creditValue) || 0,
      thresholdQuantity: form.thresholdQuantity ? Number(form.thresholdQuantity) : undefined,
    });
    setForm(blankRule);
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-white/10 bg-surface-850 p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">{editingRule ? "Edit rule" : "Add rule"}</h2>
        {editingRule ? (
          <button type="button" onClick={onCancel} className="icon-button" aria-label="Cancel edit" title="Cancel">
            <X size={16} />
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="label md:col-span-2">
          Rule name
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="field mt-2"
            placeholder="Rule name"
          />
        </label>

        <label className="label">
          Type
          <select value={form.type} onChange={(event) => updateField("type", event.target.value)} className="field mt-2">
            <option value="earn">Earn</option>
            <option value="spend">Spend</option>
          </select>
        </label>

        <label className="label">
          Unit
          <input
            value={form.unit}
            onChange={(event) => updateField("unit", event.target.value)}
            className="field mt-2"
            placeholder="rep, minute, session"
          />
        </label>

        <label className="label">
          Credit value
          <input
            type="number"
            step="0.1"
            value={form.creditValue}
            onChange={(event) => updateField("creditValue", event.target.value)}
            className="field mt-2"
          />
        </label>

        <label className="label">
          Threshold quantity
          <input
            type="number"
            min="0"
            value={form.thresholdQuantity}
            onChange={(event) => updateField("thresholdQuantity", event.target.value)}
            className="field mt-2"
            placeholder="Optional"
          />
        </label>

        <label className="label md:col-span-2">
          Notes
          <textarea
            value={form.notes || ""}
            onChange={(event) => updateField("notes", event.target.value)}
            className="field mt-2 min-h-24"
            placeholder="Optional notes"
          />
        </label>
      </div>

      <label className="toggle mt-4">
        <input
          type="checkbox"
          checked={form.active}
          onChange={(event) => updateField("active", event.target.checked)}
        />
        Active
      </label>

      <button type="submit" className="primary-button mt-4">
        <Save size={17} />
        Save rule
      </button>
    </form>
  );
}
