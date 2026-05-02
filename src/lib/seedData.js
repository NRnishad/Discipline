import { defaultCreditRules } from "../data/defaultCreditRules";
import { defaultSettings } from "../data/defaultSettings";
import { defaultTasks } from "../data/defaultTasks";

export function createSeedData() {
  return {
    settings: defaultSettings,
    creditRules: defaultCreditRules,
    dailyLogs: [],
    tasks: defaultTasks,
    taskCompletions: [],
    timerSessions: [],
  };
}
