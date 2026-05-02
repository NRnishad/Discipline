import { Download, RotateCcw, Save } from "lucide-react";
import { useEffect, useState } from "react";

export function SettingsPanel({ settings, onSave, onExport, onReset }) {
  const [form, setForm] = useState(settings);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    onSave({
      ...form,
      dailyMaxEntertainmentMinutes: Number(form.dailyMaxEntertainmentMinutes) || 0,
      startingBalanceMinutes: Number(form.startingBalanceMinutes) || 0,
      pushupCreditValue: Number(form.pushupCreditValue) || 0,
      pullupCreditValue: Number(form.pullupCreditValue) || 0,
      handGripCreditValue: Number(form.handGripCreditValue) || 0,
      studySessionLength: Number(form.studySessionLength) || 1,
      studyReward: Number(form.studyReward) || 0,
    });
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={submit} className="rounded-lg border border-white/10 bg-surface-850 p-4">
        <h2 className="text-lg font-semibold text-white">Settings</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="label md:col-span-2">
            App name
            <input
              value={form.appName}
              onChange={(event) => updateField("appName", event.target.value)}
              className="field mt-2"
            />
          </label>
          <label className="label">
            Daily max entertainment
            <input
              type="number"
              value={form.dailyMaxEntertainmentMinutes}
              onChange={(event) => updateField("dailyMaxEntertainmentMinutes", event.target.value)}
              className="field mt-2"
            />
          </label>
          <label className="label">
            Starting balance
            <input
              type="number"
              value={form.startingBalanceMinutes}
              onChange={(event) => updateField("startingBalanceMinutes", event.target.value)}
              className="field mt-2"
            />
          </label>
          <label className="label">
            Push-up credit
            <input
              type="number"
              step="0.1"
              value={form.pushupCreditValue}
              onChange={(event) => updateField("pushupCreditValue", event.target.value)}
              className="field mt-2"
            />
          </label>
          <label className="label">
            Pull-up credit
            <input
              type="number"
              step="0.1"
              value={form.pullupCreditValue}
              onChange={(event) => updateField("pullupCreditValue", event.target.value)}
              className="field mt-2"
            />
          </label>
          <label className="label">
            Hand-grip credit
            <input
              type="number"
              step="0.1"
              value={form.handGripCreditValue}
              onChange={(event) => updateField("handGripCreditValue", event.target.value)}
              className="field mt-2"
            />
          </label>
          <label className="label">
            Study session length
            <input
              type="number"
              value={form.studySessionLength}
              onChange={(event) => updateField("studySessionLength", event.target.value)}
              className="field mt-2"
            />
          </label>
          <label className="label">
            Study reward
            <input
              type="number"
              value={form.studyReward}
              onChange={(event) => updateField("studyReward", event.target.value)}
              className="field mt-2"
            />
          </label>
          <label className="label">
            Theme
            <select value={form.theme} onChange={(event) => updateField("theme", event.target.value)} className="field mt-2">
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <button type="submit" className="primary-button mt-4">
          <Save size={17} />
          Save settings
        </button>
      </form>

      <section className="rounded-lg border border-white/10 bg-surface-850 p-4">
        <h2 className="text-lg font-semibold text-white">Data</h2>
        <div className="mt-4 space-y-3">
          <button type="button" onClick={onExport} className="secondary-button w-full">
            <Download size={17} />
            Export data
          </button>
          <button type="button" onClick={onReset} className="danger-button w-full">
            <RotateCcw size={17} />
            Reset data
          </button>
        </div>
      </section>
    </div>
  );
}
