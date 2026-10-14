import { NavLink } from 'react-router-dom'
import { useWorkouts } from '../context/WorkoutContext'
import { BarbellIcon, HistoryIcon, HomeIcon } from './Icons'

// NavLink adds class="active" to the link for the current page.
export default function BottomNav() {
  const { draft } = useWorkouts()
  const draftHasSets = draft.exercises.some((ex) => ex.sets.length > 0)

  return (
    <nav className="tabbar" aria-label="Main">
      <NavLink to="/" end className="tab">
        <HomeIcon />
        <span>Home</span>
      </NavLink>
      <NavLink to="/log" className="tab">
        <BarbellIcon />
        <span>Log</span>
        {/* little dot = you have an unfinished workout */}
        {draftHasSets && <i className="tab-dot" aria-label="(workout in progress)" />}
      </NavLink>
      <NavLink to="/history" className="tab">
        <HistoryIcon />
        <span>History</span>
      </NavLink>
    </nav>
  )
}
