import { lastSevenDays } from '../utils/workouts'

// Seven boxes for the last seven days, filled in on days you trained —
// like ticking off days in a training notebook.
export default function WeekStrip({ workouts }) {
  const days = lastSevenDays(workouts)
  return (
    <ol className="week" aria-label="Last 7 days">
      {days.map(({ day, trained }, i) => (
        <li
          key={day.toISOString()}
          className={`week-day${trained ? ' is-trained' : ''}${i === 6 ? ' is-today' : ''}`}
          aria-label={`${day.toLocaleDateString('en-US', { weekday: 'long' })}: ${trained ? 'trained' : 'rest'}`}
        >
          <span className="week-box" />
          <span className="week-letter">
            {day.toLocaleDateString('en-US', { weekday: 'narrow' })}
          </span>
        </li>
      ))}
    </ol>
  )
}
