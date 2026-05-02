import { SettingsPanel } from "../components/SettingsPanel";

export function Settings({ settings, onSaveSettings, onExportData, onResetData }) {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">System</p>
          <h1>Settings</h1>
        </div>
      </header>

      <SettingsPanel
        settings={settings}
        onSave={onSaveSettings}
        onExport={onExportData}
        onReset={onResetData}
      />
    </div>
  );
}
