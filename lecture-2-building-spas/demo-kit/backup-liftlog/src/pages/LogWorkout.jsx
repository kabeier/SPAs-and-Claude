import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWorkouts } from '../context/WorkoutContext'
import ExerciseBlock from '../components/ExerciseBlock'
import ConfirmDialog from '../components/ConfirmDialog'
import { repsError, weightError } from '../utils/validate'

export default function LogWorkout() {
  const { draft, renameDraft, addExercise, saveDraft, resetDraft, showToast } = useWorkouts()
  const navigate = useNavigate()
  const [triedFinish, setTriedFinish] = useState(false) // show "empty field" errors after Finish
  const [askDiscard, setAskDiscard] = useState(false)

  const allSets = draft.exercises.flatMap((ex) => ex.sets)
  const hasErrors = allSets.some((s) => weightError(s.weight) || repsError(s.reps))
  const isEditing = Boolean(draft.editingId)

  function handleFinish() {
    if (allSets.length === 0) {
      setAskDiscard(true)
      return
    }
    if (hasErrors) {
      setTriedFinish(true)
      // Move focus to the first broken field so it's easy to fix
      setTimeout(() => document.querySelector('[aria-invalid="true"]')?.focus(), 0)
      return
    }
    saveDraft()
    showToast('Workout saved')
    navigate('/history')
  }

  function handleDiscard() {
    const backTo = isEditing ? `/workout/${draft.editingId}` : '/'
    setAskDiscard(false)
    resetDraft()
    navigate(backTo)
  }

  return (
    <>
      <header className="page-head">
        <h1 className="display">{isEditing ? 'Edit workout' : 'Log workout'}</h1>
        {isEditing && (
          <Link to={`/workout/${draft.editingId}`} className="text-btn" onClick={resetDraft}>
            Cancel edit
          </Link>
        )}
      </header>

      <form
        className="log-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          handleFinish()
        }}
      >
        <div className="name-field">
          <label htmlFor="workout-name" className="label">Workout name</label>
          <input
            id="workout-name"
            className="text-input name-input"
            value={draft.name}
            onChange={(e) => renameDraft(e.target.value)}
          />
        </div>

        {draft.exercises.map((exercise, i) => (
          <ExerciseBlock
            key={exercise.id}
            exercise={exercise}
            index={i}
            canRemove={draft.exercises.length > 1}
            showEmpty={triedFinish}
          />
        ))}

        <button type="button" className="btn btn-dashed" onClick={addExercise}>
          + Add exercise
        </button>

        <div className="finish">
          {triedFinish && hasErrors && (
            <p className="form-error" role="alert">Fix the fields marked in red to finish.</p>
          )}
          <button type="submit" className="btn btn-primary btn-big">
            Finish Workout
          </button>
        </div>
      </form>

      <ConfirmDialog
        open={askDiscard}
        title="Discard empty workout?"
        message="You haven't logged any sets yet."
        cancelLabel="Keep logging"
        confirmLabel="Discard"
        danger
        onCancel={() => setAskDiscard(false)}
        onConfirm={handleDiscard}
      />
    </>
  )
}
