import { Link } from 'react-router-dom'
import { ChevronIcon } from './Icons'
import { countSets } from '../utils/workouts'

// One line in the History list. The whole row is a link to the detail page.
export default function WorkoutRow({ workout }) {
  const date = new Date(workout.date)
  const exerciseCount = workout.exercises.length

  return (
    <li>
      <Link to={`/workout/${workout.id}`} className="row">
        <span className="row-date" aria-hidden="true">
          <span className="row-month">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
          <span className="row-day">{String(date.getDate()).padStart(2, '0')}</span>
        </span>
        <span className="row-body">
          <span className="row-name">{workout.name}</span>
          <span className="row-meta">
            <span className="sr-only">{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, </span>
            {exerciseCount} {exerciseCount === 1 ? 'exercise' : 'exercises'}, {countSets(workout)} sets
          </span>
        </span>
        <ChevronIcon />
      </Link>
    </li>
  )
}
