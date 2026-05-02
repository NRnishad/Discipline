import { PauseCircle, PlayCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function getElapsedMinutes(activeTimer, now) {
  if (!activeTimer?.startTime) return 0;
  return Math.max(0, Math.floor((now - new Date(activeTimer.startTime)) / 60000));
}

export function TimerCard({ spendingRules, activeTimer, onStart, onStop }) {
  const activeRules = spendingRules.filter((rule) => rule.active);
  const [category, setCategory] = useState(activeRules[0]?.name || "YouTube");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!activeRules.some((rule) => rule.name === category) && activeRules[0]) {
      setCategory(activeRules[0].name);
    }
  }, [activeRules, category]);

  const elapsed = useMemo(() => getElapsedMinutes(activeTimer, now), [activeTimer, now]);
  const activeRule = activeRules.find((rule) => rule.name === category) || activeRules[0];

  return (
    <section className="rounded-lg border border-accent-500/25 bg-accent-500/10 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-accent-300">Entertainment timer</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {activeTimer ? `${elapsed} min` : "Stopped"}
          </p>
          {activeTimer ? (
            <p className="mt-1 text-sm text-slate-300">{activeTimer.category} in progress</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="label min-w-52">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="field mt-2"
              disabled={Boolean(activeTimer)}
            >
              {activeRules.map((rule) => (
                <option key={rule.id} value={rule.name}>{rule.name}</option>
              ))}
            </select>
          </label>
          {activeTimer ? (
            <button type="button" onClick={() => onStop(activeTimer.id)} className="danger-button">
              <PauseCircle size={18} />
              Stop
            </button>
          ) : (
            <button
              type="button"
              onClick={() => activeRule && onStart(activeRule.id, activeRule.name)}
              className="primary-button"
            >
              <PlayCircle size={18} />
              Start
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
