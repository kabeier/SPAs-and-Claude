import { Link } from 'react-router-dom'
import { useWorkouts } from '../context/WorkoutContext'
import WeekStrip from '../components/WeekStrip'
import { ChevronIcon } from '../components/Icons'
import { daysAgo, lastSevenDays, newestFirst } from '../utils/workouts'

export default function Home() {
  const { workouts } = useWorkouts()
  const last = newestFirst(workouts)[0]
  const thisWeek = lastSevenDays(workouts).filter((d) => d.trained).length

  return (
    <>
      <header className="page-head">
        <p className="brand">Liftlog</p>
        <h1 className="display">Ready to lift?</h1>
      </header>

      {last ? (
        <>
          <Link to={`/workout/${last.id}`} className="last-card">
            <span className="last-label">Last workout, {daysAgo(last.date)}</span>
            <span className="last-name">{last.name}</span>
            <span className="last-meta">
              {last.exercises.length} exercises
              <ChevronIcon />
            </span>
          </Link>

          <section className="stat" aria-label="This week">
            <p className="stat-number">
              {thisWeek}
              <span className="stat-unit">{thisWeek === 1 ? 'workout' : 'workouts'} this week</span>
            </p>
            <WeekStrip workouts={workouts} />
          </section>
        </>
      ) : (
        <div className="empty">
          <p className="empty-title">No workouts yet — start your first one!</p>
          <p className="empty-text">Log your sets as you go. It takes seconds.</p>
        </div>
      )}

      <div className="actions">
        <Link to="/log" className="btn btn-primary btn-big">Start Workout</Link>
        <Link to="/history" className="btn btn-ghost">View History</Link>
      </div>
    </>
  )
}
