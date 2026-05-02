import { DashboardCards } from "../components/DashboardCards";
import { formatDisplayDate } from "../lib/dateUtils";

export function Dashboard({ appState, onNavigate }) {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">{formatDisplayDate(appState.today)}</p>
          <h1>{appState.settings.appName}</h1>
        </div>
      </header>

      <DashboardCards
        summary={appState.todaySummary}
        availableBalance={appState.availableBalance}
        perfectDay={appState.perfectDay}
        disciplineScore={appState.disciplineScore}
        currentStreak={appState.currentStreak}
        dueTasks={appState.dueTasks}
        completedDueCount={appState.completedRequiredCount}
        onNavigate={onNavigate}
      />
    </div>
  );
}
