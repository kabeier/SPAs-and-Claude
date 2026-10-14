// Pure helper functions — no React in here, easy to read and test.

const DAY = 24 * 60 * 60 * 1000

export function newestFirst(workouts) {
  return [...workouts].sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function countSets(workout) {
  return workout.exercises.reduce((total, ex) => total + ex.sets.length, 0)
}

// "Oct 12"
export function shortDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// "Monday, Oct 12"
export function longDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

// "today", "yesterday", "3 days ago"
export function daysAgo(iso) {
  const days = Math.round((startOfDay(new Date()) - startOfDay(iso)) / DAY)
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  return `${days} days ago`
}

// The last 7 days (oldest → today), each marked if a workout happened that day.
export function lastSevenDays(workouts) {
  const today = startOfDay(new Date())
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today.getTime() - (6 - i) * DAY)
    const trained = workouts.some((w) => startOfDay(w.date).getTime() === day.getTime())
    return { day, trained }
  })
}

// Personal records: heaviest weight ever lifted for each exercise.
// Returns { 'Bench Press': 155, Squat: 225, ... } (bodyweight-only moves are skipped)
export function personalRecords(workouts) {
  const prs = {}
  for (const workout of workouts) {
    for (const ex of workout.exercises) {
      for (const set of ex.sets) {
        if (set.weight > 0 && set.weight > (prs[ex.name] ?? 0)) {
          prs[ex.name] = set.weight
        }
      }
    }
  }
  return prs
}

// The standard lifts plus every exercise name used in a workout, A→Z (History filter)
export function exerciseNames(workouts, standard = []) {
  const names = new Set([...standard, ...workouts.flatMap((w) => w.exercises.map((ex) => ex.name))])
  return [...names].sort()
}
