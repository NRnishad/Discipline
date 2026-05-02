import { AnalyticsCharts } from "../components/AnalyticsCharts";

export function Analytics({ analyticsData, perfectDaysThisMonth }) {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Progress</p>
          <h1>Analytics</h1>
        </div>
      </header>

      <AnalyticsCharts data={analyticsData} perfectDaysThisMonth={perfectDaysThisMonth} />
    </div>
  );
}
