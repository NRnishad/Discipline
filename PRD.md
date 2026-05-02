# PRD: Discipline OS

## 1. Product Overview

**Product name:** Discipline OS  
**Product type:** Personal discipline, habit, task, and screen-time credit tracker  
**Version:** MVP / LocalStorage-first version  
**Primary platform:** Responsive web app  
**Design direction:** Minimal dark-mode UI based on the Google Stitch design concept

Discipline OS is a personal productivity and self-control app that helps the user earn entertainment time through disciplined actions. The app combines three core systems:

1. **Credit system** — the user earns entertainment credits through productive actions such as push-ups, pull-ups, hand-grip presses, and study.
2. **Habit and task system** — the user tracks daily habits, one-time tasks, weekly tasks, and monthly tasks.
3. **Analytics system** — the user monitors earned credits, entertainment usage, daily balance, habit completion, fitness progress, and perfect days.

The MVP should be a front-end-only React app using LocalStorage for persistence. The goal is to validate the daily workflow before adding authentication, cloud database, or backend services.

---

## 2. Problem Statement

The user wants to reduce uncontrolled entertainment usage and build discipline through measurable effort. Current screen-time tracking alone is not enough because it only shows time spent after the fact. The user needs a system where entertainment is intentionally earned through useful actions.

The user also wants a daily operating system for life tasks, including recurring habits and scheduled personal maintenance tasks such as cutting nails weekly or getting a haircut monthly.

---

## 3. Product Goals

### Primary goals

- Help the user control entertainment usage by requiring earned credits.
- Track fitness, study, habits, and recurring personal tasks in one dashboard.
- Make the current day easy to manage.
- Provide simple charts to monitor discipline over time.
- Keep the MVP simple, fast, and usable without backend setup.

### Secondary goals

- Make all earning and spending rules configurable.
- Support future migration to Firebase, MongoDB, or another backend.
- Allow the product to grow into a larger personal operating system.

---

## 4. Non-Goals for MVP

The first version should not include:

- User authentication
- Cloud sync
- Notifications
- Mobile app build
- AI recommendations
- Complex calendar integrations
- Social features
- Multiple user accounts
- Payment features
- Backend APIs

These can be considered later after the localStorage version works well.

---

## 5. Target User

The initial target user is a single person who wants to build self-discipline by tracking:

- Exercise
- Study
- Quran reading
- LeetCode practice
- Screen-time usage
- Entertainment usage
- Recurring personal tasks
- Daily discipline score

The app should feel serious, clean, and focused rather than playful or gamified.

---

## 6. Core Concept

The app is built around one daily question:

> Did I earn my entertainment today, and did I complete my important tasks?

The app should always help the user understand:

1. How much entertainment time is available?
2. How much entertainment time has been used?
3. What tasks and habits are due today?
4. Is today a disciplined day?
5. What is the current progress trend?

---

## 7. Key Definitions

### Credit

A credit is earned time that can be spent on entertainment.

Example:

- 1 push-up = 1 minute
- 1 pull-up = 5 minutes
- 1 hand-grip press = 0.5 minutes
- 25 minutes study = 5 minutes

### Spending

Spending is entertainment usage that consumes credits.

Examples:

- YouTube entertainment
- Social media
- Gaming
- Movies or series
- Other entertainment

### Habit

A habit is a recurring completion-based item.

Examples:

- Read Quran daily
- Solve one LeetCode daily
- Exercise daily

### Task

A task is an item that can be one-time or recurring.

Examples:

- Cut nails every Friday
- Haircut every month on the selected date
- Complete a specific task by end of today

### Credit Action

A credit action is a quantity-based activity that earns or spends credits.

Examples:

- Push-ups: quantity in reps
- Pull-ups: quantity in reps
- Study: quantity in minutes
- Entertainment: quantity in minutes

---

## 8. Core Rules

### 8.1 Entertainment must be earned

Entertainment should reduce the user’s available balance.

Formula:

```text
available_balance = previous_balance + credits_earned_today - entertainment_used_today
```

### 8.2 Productive screen time does not count as entertainment

Phone or computer usage for study, coding, Quran reading, work, or learning should not reduce credits.

### 8.3 Credit actions are quantity-based

Push-ups, pull-ups, hand-grip presses, study minutes, and entertainment minutes should be logged with numeric values.

### 8.4 Habits and tasks are completion-based

Quran reading, LeetCode, exercise habit, nail cutting, haircut, and similar items should be tracked as done/not done.

### 8.5 Exercise can exist in both systems

Exercise can be a daily habit checkbox, while push-ups and pull-ups are logged as quantity-based credit actions.

Example:

- Exercise habit: completed
- Push-ups: 50 reps
- Pull-ups: 10 reps

### 8.6 Daily habits reset daily

Daily habits should appear each day. Missed daily habits should affect streaks and perfect-day status, but should not create endless overdue items.

### 8.7 Weekly tasks appear on selected weekday

Example:

- Cut nails every Friday

### 8.8 Monthly tasks appear on selected day of month

Example:

- Haircut every 15th day of the month

### 8.9 Perfect day

A perfect day occurs when:

```text
entertainment_used_today <= credits_earned_today + previous_balance
AND all required habits/tasks due today are completed
```

---

## 9. MVP Feature List

### 9.1 Dashboard

The dashboard is the main home screen.

It should show:

- App name: Discipline OS
- Today’s discipline score
- Available entertainment balance
- Credits earned today
- Entertainment used today
- Net balance today
- Perfect day status
- Current streak
- Today’s required tasks summary
- Quick action buttons

Quick actions:

- Add activity
- Start entertainment timer
- Add task
- Complete habit

---

### 9.2 Today Screen

The Today screen is the operational center of the app.

It should include three sections.

#### Section A: Habits

Display completion-based daily habits.

Default habits:

- Exercise
- Read Quran
- Solve 1 LeetCode
- Study
- Log screen time

Each habit card should show:

- Habit title
- Required or optional label
- Completion checkbox
- Streak indicator
- Completed state

#### Section B: Credit Actions

Display quantity-based earning actions.

Default actions:

- Push-ups
- Pull-ups
- Hand-grip presses
- Study minutes

Each action card should include:

- Action name
- Unit
- Current logged quantity
- Minus button
- Plus button
- Numeric input
- Earned minutes preview

#### Section C: Entertainment Spending

Display spending actions.

Default spending categories:

- YouTube
- Social media
- Gaming
- Movies/series
- Other entertainment

The user should have two ways to add entertainment time:

1. Manual entry
2. Start/stop timer

Manual entry is for cases where the user already knows the time spent.

Timer is for cases where the user starts entertainment now and wants exact tracking.

Timer calculation:

```text
used_minutes = end_time - start_time
```

---

### 9.3 Credit Rules Management

The user must be able to add, edit, delete, activate, and deactivate credit rules.

Credit rules should support two categories:

1. Earning rules
2. Spending rules

Default earning rules:

| Action | Reward |
|---|---:|
| Push-up | +1 minute per rep |
| Pull-up | +5 minutes per rep |
| Hand grip | +0.5 minutes per press |
| Study | +5 minutes per 25 minutes |

Default spending rules:

| Action | Cost |
|---|---:|
| Entertainment | -1 minute per minute |
| YouTube | -1 minute per minute |
| Gaming | -1 minute per minute |
| Social media | -1 minute per minute |
| Movies/series | -1 minute per minute |
| Other entertainment | -1 minute per minute |

Each rule should include:

- ID
- Name
- Type: earn or spend
- Unit: rep, press, minute, session, etc.
- Rate value
- Rate unit
- Active/inactive state
- Optional notes

Example:

```json
{
  "id": "rule_pushup",
  "name": "Push-up",
  "type": "earn",
  "unit": "rep",
  "creditValue": 1,
  "creditUnit": "minute",
  "active": true
}
```

---

### 9.4 Task and Habit Manager

The Tasks screen should manage both one-time tasks and recurring habits.

Supported task types:

- One-time task
- Daily habit
- Weekly task
- Monthly task

Task examples:

- Read Quran daily
- Solve one LeetCode daily
- Exercise daily
- Cut nails every Friday
- Haircut every month on selected date

Each task card should show:

- Title
- Type
- Repeat frequency
- Due date or schedule
- Priority badge
- Required/optional label
- Completed status for today if applicable
- Edit button
- Delete button

Task form fields:

- Task title
- Task type
- Repeat frequency
- Due date
- Day of week
- Day of month
- Required toggle
- Priority
- Notes
- Active toggle

---

### 9.5 Analytics

Analytics should provide simple visual feedback.

Required chart cards:

1. Credits earned vs entertainment used
2. Daily balance trend
3. Habit completion rate
4. Perfect days this month
5. Fitness progress
6. Study minutes trend

Fitness progress should include:

- Push-ups
- Pull-ups
- Hand-grip presses

Charts should be simple and readable in dark mode.

---

### 9.6 Settings

Settings should allow the user to configure the system.

Settings fields:

- App name
- Daily max entertainment limit
- Starting balance
- Push-up credit value
- Pull-up credit value
- Hand-grip credit value
- Study session length
- Study reward
- Theme mode, default dark
- Reset data button
- Export data button

Important: even if credit rules are configurable in the Credits screen, common defaults can also appear in Settings for easier access.

---

## 10. Navigation Structure

The app should use simple navigation with six main sections:

1. Dashboard
2. Today
3. Credits
4. Tasks
5. Analytics
6. Settings

For mobile, use bottom navigation or a compact tab bar.

For desktop, use a left sidebar or top navigation.

---

## 11. UX Requirements

### Visual style

- Minimal dark mode
- Black or dark gray background
- Soft cards
- Rounded corners
- Clear typography
- Calm, serious, focused style
- Sparse accent colors
- No playful gamification-heavy design

### UX principles

- The Dashboard should be understandable in under 5 seconds.
- Today’s tasks should be visible without digging through menus.
- Credit balance should always be clear.
- Manual entry should be fast.
- Timer should be easy to start and stop.
- The app should not punish the user with clutter after missed daily habits.

---

## 12. Data Model

### 12.1 Settings

```js
const settings = {
  appName: "Discipline OS",
  dailyMaxEntertainmentMinutes: 120,
  startingBalanceMinutes: 0,
  theme: "dark"
};
```

### 12.2 Credit Rules

```js
const creditRules = [
  {
    id: "rule_pushup",
    name: "Push-up",
    type: "earn",
    unit: "rep",
    creditValue: 1,
    creditUnit: "minute",
    active: true
  },
  {
    id: "rule_pullup",
    name: "Pull-up",
    type: "earn",
    unit: "rep",
    creditValue: 5,
    creditUnit: "minute",
    active: true
  },
  {
    id: "rule_hand_grip",
    name: "Hand grip",
    type: "earn",
    unit: "press",
    creditValue: 0.5,
    creditUnit: "minute",
    active: true
  },
  {
    id: "rule_study",
    name: "Study",
    type: "earn",
    unit: "minute",
    creditValue: 5,
    creditUnit: "minute",
    thresholdQuantity: 25,
    active: true
  },
  {
    id: "rule_entertainment",
    name: "Entertainment",
    type: "spend",
    unit: "minute",
    creditValue: 1,
    creditUnit: "minute",
    active: true
  }
];
```

### 12.3 Daily Logs

```js
const dailyLogs = [
  {
    id: "log_2026-05-02",
    date: "2026-05-02",
    entries: [
      {
        id: "entry_1",
        ruleId: "rule_pushup",
        quantity: 50,
        createdAt: "2026-05-02T10:00:00"
      },
      {
        id: "entry_2",
        ruleId: "rule_entertainment",
        quantity: 30,
        category: "YouTube",
        method: "manual",
        createdAt: "2026-05-02T20:00:00"
      }
    ],
    restDay: false,
    notes: "Good day"
  }
];
```

### 12.4 Timer Sessions

```js
const timerSessions = [
  {
    id: "timer_1",
    ruleId: "rule_entertainment",
    category: "YouTube",
    startTime: "2026-05-02T20:00:00",
    endTime: "2026-05-02T20:30:00",
    durationMinutes: 30,
    status: "completed"
  }
];
```

### 12.5 Tasks

```js
const tasks = [
  {
    id: "task_quran_daily",
    title: "Read Quran",
    type: "habit",
    repeat: "daily",
    required: true,
    priority: "high",
    active: true,
    notes: "Daily reading habit"
  },
  {
    id: "task_leetcode_daily",
    title: "Solve 1 LeetCode",
    type: "habit",
    repeat: "daily",
    required: true,
    priority: "high",
    active: true
  },
  {
    id: "task_cut_nails",
    title: "Cut nails",
    type: "task",
    repeat: "weekly",
    weekday: "friday",
    required: true,
    priority: "medium",
    active: true
  },
  {
    id: "task_haircut",
    title: "Haircut",
    type: "task",
    repeat: "monthly",
    dayOfMonth: 15,
    required: false,
    priority: "medium",
    active: true
  }
];
```

### 12.6 Task Completions

```js
const taskCompletions = [
  {
    id: "completion_1",
    taskId: "task_quran_daily",
    date: "2026-05-02",
    completed: true,
    completedAt: "2026-05-02T21:00:00"
  }
];
```

---

## 13. Core Logic

### 13.1 Calculate earned credits

```js
function calculateEntryCredits(entry, rule) {
  if (!rule.active) return 0;

  if (rule.type === "earn") {
    if (rule.thresholdQuantity) {
      return Math.floor(entry.quantity / rule.thresholdQuantity) * rule.creditValue;
    }

    return entry.quantity * rule.creditValue;
  }

  return 0;
}
```

### 13.2 Calculate spent credits

```js
function calculateEntrySpend(entry, rule) {
  if (!rule.active) return 0;

  if (rule.type === "spend") {
    return entry.quantity * rule.creditValue;
  }

  return 0;
}
```

### 13.3 Calculate daily summary

```js
function calculateDailySummary(log, rules) {
  let earned = 0;
  let spent = 0;

  for (const entry of log.entries) {
    const rule = rules.find(rule => rule.id === entry.ruleId);
    if (!rule) continue;

    earned += calculateEntryCredits(entry, rule);
    spent += calculateEntrySpend(entry, rule);
  }

  return {
    earned,
    spent,
    net: earned - spent
  };
}
```

### 13.4 Get tasks for date

```js
function getTasksForDate(tasks, date) {
  const targetDate = new Date(date);
  const weekday = targetDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  const dayOfMonth = targetDate.getDate();

  return tasks.filter(task => {
    if (!task.active) return false;

    if (task.repeat === "daily") return true;

    if (task.repeat === "weekly") {
      return task.weekday === weekday;
    }

    if (task.repeat === "monthly") {
      return task.dayOfMonth === dayOfMonth;
    }

    if (task.repeat === "none") {
      return task.dueDate === date;
    }

    return false;
  });
}
```

### 13.5 Check perfect day

```js
function isPerfectDay({ availableBalanceBeforeToday, dailySummary, requiredTasks, completions, date }) {
  const enoughCredits = dailySummary.spent <= availableBalanceBeforeToday + dailySummary.earned;

  const allRequiredCompleted = requiredTasks.every(task => {
    return completions.some(completion => {
      return completion.taskId === task.id &&
        completion.date === date &&
        completion.completed === true;
    });
  });

  return enoughCredits && allRequiredCompleted;
}
```

---

## 14. LocalStorage Architecture

Use LocalStorage keys:

```text
discipline_os_settings
discipline_os_credit_rules
discipline_os_daily_logs
discipline_os_tasks
discipline_os_task_completions
discipline_os_timer_sessions
```

Create a storage service:

```text
src/lib/storage.js
```

Required functions:

- loadSettings()
- saveSettings(settings)
- loadCreditRules()
- saveCreditRules(rules)
- loadDailyLogs()
- saveDailyLogs(logs)
- loadTasks()
- saveTasks(tasks)
- loadTaskCompletions()
- saveTaskCompletions(completions)
- loadTimerSessions()
- saveTimerSessions(sessions)
- exportAllData()
- resetAllData()

---

## 15. Suggested Technical Stack

### MVP stack

- React
- Vite
- Tailwind CSS
- Recharts
- date-fns
- lucide-react
- LocalStorage

### Future stack options

Option A: Firebase

- Firebase Auth
- Firestore
- Firebase Hosting

Option B: MERN

- MongoDB
- Express
- React
- Node.js

Recommendation: start with LocalStorage, then migrate to Firebase if cross-device sync becomes important.

---

## 16. Suggested Folder Structure

```text
src/
  components/
    DashboardCards.jsx
    TodayHabits.jsx
    CreditActionCard.jsx
    SpendingCard.jsx
    TimerCard.jsx
    TaskCard.jsx
    TaskForm.jsx
    CreditRuleCard.jsx
    CreditRuleForm.jsx
    AnalyticsCharts.jsx
    SettingsPanel.jsx
    BottomNav.jsx

  pages/
    Dashboard.jsx
    Today.jsx
    Credits.jsx
    Tasks.jsx
    Analytics.jsx
    Settings.jsx

  lib/
    storage.js
    calculations.js
    taskEngine.js
    dateUtils.js
    seedData.js

  data/
    defaultSettings.js
    defaultCreditRules.js
    defaultTasks.js

  App.jsx
  main.jsx
  index.css
```

---

## 17. Acceptance Criteria

### Dashboard

- User can see available entertainment balance.
- User can see credits earned today.
- User can see entertainment used today.
- User can see whether today is a perfect day.
- User can access quick actions.

### Today

- User can complete habits.
- User can log quantity-based credit actions.
- User can manually add entertainment spending.
- User can start and stop an entertainment timer.
- User can see total earned and spent for today.

### Credits

- User can view earning rules.
- User can view spending rules.
- User can add a new rule.
- User can edit an existing rule.
- User can delete a rule.
- User can activate or deactivate a rule.

### Tasks

- User can create daily, weekly, monthly, and one-time tasks.
- User can edit tasks.
- User can delete tasks.
- User can mark today’s tasks complete.
- Weekly tasks appear only on selected weekdays.
- Monthly tasks appear only on selected dates.

### Analytics

- User can view credits earned vs entertainment used.
- User can view balance trend.
- User can view habit completion rate.
- User can view perfect days.
- User can view fitness and study progress.

### Settings

- User can update app settings.
- User can export all data.
- User can reset all data.

### Persistence

- Data persists after page refresh.
- No backend is required.

---

## 18. Codex Build Prompt

Use the following prompt for Codex:

```text
Build a front-end-only React + Vite + Tailwind CSS web app called Discipline OS.

The app should use LocalStorage only. Do not add backend, authentication, Firebase, MongoDB, or external APIs in the MVP.

The app is a minimal dark-mode personal discipline tracker. It helps the user earn entertainment time through productive actions and track daily habits, recurring tasks, and analytics.

Main screens:
1. Dashboard
2. Today
3. Credits
4. Tasks
5. Analytics
6. Settings

Core requirements:
- Use a clean minimal dark UI.
- Use responsive mobile-first layout.
- Use rounded cards, clear typography, and subtle accent colors.
- Use Recharts for charts.
- Use date-fns for date helpers.
- Use lucide-react for icons.

Dashboard:
- Show available entertainment balance.
- Show credits earned today.
- Show entertainment used today.
- Show net balance today.
- Show perfect day status.
- Show current streak.
- Show quick action buttons.

Today screen:
- Show daily habits as checkboxes.
- Show credit actions as quantity inputs.
- Show entertainment spending with manual entry and start/stop timer.
- Default habits: Exercise, Read Quran, Solve 1 LeetCode, Study, Log screen time.
- Default credit actions: Push-ups, Pull-ups, Hand-grip presses, Study minutes.
- Default spending categories: YouTube, Social media, Gaming, Movies/series, Other entertainment.

Credits screen:
- Allow add, edit, delete, activate, and deactivate credit rules.
- Support earning rules and spending rules.
- Default earning rules: push-up +1 min per rep, pull-up +5 min per rep, hand grip +0.5 min per press, study +5 min per 25 minutes.
- Default spending rules: entertainment categories cost 1 credit minute per minute used.

Tasks screen:
- Manage one-time, daily, weekly, and monthly tasks.
- Tasks can be required or optional.
- Tasks can have priority.
- Weekly tasks appear on selected weekday.
- Monthly tasks appear on selected day of month.
- Default tasks: Read Quran daily, Solve 1 LeetCode daily, Exercise daily, Cut nails weekly, Haircut monthly.

Analytics screen:
- Show credits earned vs entertainment used.
- Show daily balance trend.
- Show habit completion rate.
- Show perfect days this month.
- Show fitness progress.
- Show study minutes trend.

Settings screen:
- App name.
- Daily max entertainment limit.
- Starting balance.
- Theme setting default dark.
- Export data.
- Reset data.

Data model:
- settings
- creditRules
- dailyLogs
- timerSessions
- tasks
- taskCompletions

Create the following structure:
src/components
src/pages
src/lib
src/data

Important architecture:
- Keep calculations in src/lib/calculations.js.
- Keep task recurrence logic in src/lib/taskEngine.js.
- Keep LocalStorage functions in src/lib/storage.js.
- Keep seed/default data in src/data.
- Keep UI components reusable and clean.

Core behavior:
- Credit actions are quantity-based.
- Habits and tasks are completion-based.
- Entertainment can be added manually or through a timer.
- Perfect day means entertainment used is covered by available credits and all required due tasks/habits are complete.
- Daily habits reset every day and should not create endless overdue items.

Deliver a working app with clean code, no placeholder pages, and useful default data.
```

---

## 19. Future Enhancements

Potential future improvements:

- Firebase sync
- User login
- Cloud backup
- Notifications and reminders
- PWA install support
- Calendar view
- Weekly/monthly reports
- Import/export JSON
- AI daily coach
- Mobile app wrapper
- Streak repair rules
- Advanced recurrence rules
- Screen-time API integration if available

---

## 20. MVP Success Criteria

The MVP is successful if the user can use it daily to:

- Log fitness and study actions
- Earn entertainment credits
- Track entertainment spending
- Complete habits and tasks
- See whether the day was disciplined
- Review progress through charts
- Keep all data after refresh using LocalStorage
