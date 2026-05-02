import { Download, RotateCcw, Save } from "lucide-react";
import { useEffect, useState } from "react";

const themeOptions = [
  { value: "dark", label: "Dark" },
  { value: "graphite", label: "Graphite" },
  { value: "forest", label: "Forest" },
  { value: "ember", label: "Ember" },
  { value: "midnight", label: "Midnight" },
];

const colorThemeOptions = [
  { value: "discipline", label: "Discipline" },
  { value: "dracula", label: "Dracula" },
  { value: "nord", label: "Nord" },
  { value: "gruvbox", label: "Gruvbox" },
  { value: "monokai", label: "Monokai" },
  { value: "solarized", label: "Solarized Dark" },
  { value: "catppuccin", label: "Catppuccin" },
];

const animationOptions = [
  { value: "off", label: "Off" },
  { value: "subtle", label: "Subtle" },
  { value: "lively", label: "Lively" },
  { value: "slide", label: "Slide" },
  { value: "pop", label: "Pop" },
  { value: "flow", label: "Flow" },
  { value: "pulse", label: "Pulse" },
];

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
      appName: form.appName || "Discipline OS",
      dailyMaxEntertainmentMinutes: Number(form.dailyMaxEntertainmentMinutes) || 0,
      startingBalanceMinutes: Number(form.startingBalanceMinutes) || 0,
      theme: form.theme || "dark",
      colorTheme: form.colorTheme || "discipline",
      animationLevel: form.animationLevel || "subtle",
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
            Layout theme
            <select value={form.theme || "dark"} onChange={(event) => updateField("theme", event.target.value)} className="field mt-2">
              {themeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <label className="label">
            Colour theme
            <select
              value={form.colorTheme || "discipline"}
              onChange={(event) => updateField("colorTheme", event.target.value)}
              className="field mt-2"
            >
              {colorThemeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <div className={`colour-preview color-${form.colorTheme || "discipline"} md:col-span-2`} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <label className="label">
            Animations
            <select
              value={form.animationLevel || "subtle"}
              onChange={(event) => updateField("animationLevel", event.target.value)}
              className="field mt-2"
            >
              {animationOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
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
