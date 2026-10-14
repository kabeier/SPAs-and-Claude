import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWorkouts } from '../context/WorkoutContext'
import WorkoutRow from '../components/WorkoutRow'
import { TrophyIcon } from '../components/Icons'
import { EXERCISES } from '../data/seed'
import { exerciseNames, newestFirst, personalRecords } from '../utils/workouts'

const ALL = 'all'

export default function History() {
  const { workouts } = useWorkouts()
  const [filter, setFilter] = useState(ALL)
  const [sort, setSort] = useState('newest')

  // 1. filter by exercise  2. sort by date
  const matching =
    filter === ALL ? workouts : workouts.filter((w) => w.exercises.some((ex) => ex.name === filter))
  const sorted = newestFirst(matching)
  const list = sort === 'newest' ? sorted : sorted.reverse()

  const prs = Object.entries(personalRecords(workouts)).sort((a, b) => a[0].localeCompare(b[0]))

  if (workouts.length === 0) {
    return (
      <>
        <header className="page-head">
          <h1 className="display">History</h1>
        </header>
        <div className="empty">
          <p className="empty-title">No workouts yet</p>
          <p className="empty-text">Finished workouts show up here.</p>
          <Link to="/log" className="btn btn-primary btn-big">Start Workout</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <header className="page-head">
        <h1 className="display">History</h1>
      </header>

      <div className="controls">
        <div>
          <label htmlFor="filter" className="label">Exercise</label>
          <select id="filter" className="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value={ALL}>All exercises</option>
            {exerciseNames(workouts, EXERCISES).map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="label">Sort</label>
          <select id="sort" className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {list.length > 0 ? (
        <ul className="rows">
          {list.map((w) => (
            <WorkoutRow key={w.id} workout={w} />
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p className="empty-title">No workouts match this filter</p>
          <button type="button" className="btn btn-ghost" onClick={() => setFilter(ALL)}>
            Clear filter
          </button>
        </div>
      )}

      <section className="prs" aria-labelledby="prs-title">
        <h2 id="prs-title" className="section-title">
          <span className="trophy-pop"><TrophyIcon size={22} /></span>
          Personal records
        </h2>
        <ul className="pr-list">
          {prs.map(([name, weight]) => (
            <li key={name} className="pr">
              <span className="pr-name">{name}</span>
              <span className="pr-weight">
                {weight}
                <small>lb</small>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
