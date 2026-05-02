import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";

const blankAction = {
  name: "",
  unit: "rep",
  creditValue: 1,
  thresholdQuantity: "",
  active: true,
};

export function EarningActionForm({ editingAction, onSave, onCancel }) {
  const [form, setForm] = useState(blankAction);

  useEffect(() => {
    setForm(editingAction
      ? { ...editingAction, thresholdQuantity: editingAction.thresholdQuantity || "" }
      : blankAction);
  }, [editingAction]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!form.name.trim()) return;

    onSave({
      ...form,
      name: form.name.trim(),
      type: "earn",
      creditUnit: "minute",
      creditValue: Number(form.creditValue) || 0,
      thresholdQuantity: form.thresholdQuantity ? Number(form.thresholdQuantity) : undefined,
      active: Boolean(form.active),
    });
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-accent-500/25 bg-accent-500/10 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-white">
          {editingAction ? "Edit action" : "Add action"}
        </h3>
        <button type="button" onClick={onCancel} className="icon-button" aria-label="Close action form" title="Close">
          <X size={16} />
        </button>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="label">
          Action name
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="field mt-2"
            placeholder="Push-ups, Pull-ups, Study"
          />
        </label>

        <label className="label">
          Unit
          <input
            value={form.unit}
            onChange={(event) => updateField("unit", event.target.value)}
            className="field mt-2"
            placeholder="rep, minute, press"
          />
        </label>

        <label className="label">
          Reward minutes
          <input
            type="number"
            step="0.1"
            min="0"
            value={form.creditValue}
            onChange={(event) => updateField("creditValue", event.target.value)}
            className="field mt-2"
          />
        </label>

        <label className="label">
          Threshold
          <input
            type="number"
            min="0"
            value={form.thresholdQuantity}
            onChange={(event) => updateField("thresholdQuantity", event.target.value)}
            className="field mt-2"
            placeholder="Optional"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="toggle">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(event) => updateField("active", event.target.checked)}
          />
          Active
        </label>
        <button type="submit" className="primary-button">
          <Save size={17} />
          Save action
        </button>
      </div>
    </form>
  );
}
