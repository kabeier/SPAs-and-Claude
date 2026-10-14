import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useWorkouts } from '../context/WorkoutContext'
import ConfirmDialog from '../components/ConfirmDialog'
import { BackIcon, TrophyIcon } from '../components/Icons'
import { longDate, personalRecords } from '../utils/workouts'

export default function WorkoutDetail() {
  const { id } = useParams() // the ":id" part of /workout/:id
  const { getWorkout, workouts, deleteWorkout, startEditing, showToast } = useWorkouts()
  const navigate = useNavigate()
  const [askDelete, setAskDelete] = useState(false)
  const workout = getWorkout(id)

  if (!workout) {
    return (
      <div className="empty empty-page">
        <p className="empty-title">We couldn't find that workout</p>
        <p className="empty-text">It may have been deleted.</p>
        <Link to="/history" className="btn btn-ghost">Back to History</Link>
      </div>
    )
  }

  const prs = personalRecords(workouts)

  function handleEdit() {
    startEditing(workout) // copy this workout into the log form
    navigate('/log')
  }

  function handleDelete() {
    setAskDelete(false)
    deleteWorkout(workout.id)
    showToast('Workout deleted')
    navigate('/history')
  }

  return (
    <>
      <Link to="/history" className="back">
        <BackIcon /> History
      </Link>

      <header className="page-head">
        <h1 className="display">{workout.name}</h1>
        <p className="subtle">{longDate(workout.date)}</p>
      </header>

      <div className="detail">
        {workout.exercises.map((ex, exIndex) => (
          <section key={exIndex} className="detail-ex" aria-label={ex.name}>
            <h2 className="detail-name">{ex.name}</h2>
            <ol className="detail-sets">
              {ex.sets.map((set, i) => {
                // Trophy on the first set that hit the all-time heaviest weight
                const prIndex = ex.sets.findIndex((s) => s.weight === prs[ex.name])
                const isPR = set.weight > 0 && i === prIndex
                return (
                  <li key={i} className={`score${isPR ? ' is-pr' : ''}`}>
                    <span className="score-num">{set.weight > 0 ? set.weight : 'BW'}</span>
                    <span className="score-x" aria-label="by">×</span>
                    <span className="score-num">{set.reps}</span>
                    {isPR && (
                      <span className="score-pr" title="Personal record">
                        <TrophyIcon size={16} /> PR
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </section>
        ))}
      </div>

      <div className="actions actions-row">
        <button type="button" className="btn btn-ghost" onClick={handleEdit}>Edit</button>
        <button type="button" className="btn btn-danger-ghost" onClick={() => setAskDelete(true)}>
          Delete
        </button>
      </div>

      <ConfirmDialog
        open={askDelete}
        title="Delete this workout? This can't be undone."
        cancelLabel="Cancel"
        confirmLabel="Delete"
        danger
        onCancel={() => setAskDelete(false)}
        onConfirm={handleDelete}
      />
    </>
  )
}
