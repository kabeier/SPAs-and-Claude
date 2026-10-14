import { EXERCISES } from '../data/seed'
import { exerciseName, useWorkouts } from '../context/WorkoutContext'
import SetRow from './SetRow'

// One exercise on the log form: picker + its list of sets + "Add set".
export default function ExerciseBlock({ exercise, index, canRemove, showEmpty }) {
  const { updateExercise, removeExercise, addSet, updateSet, removeSet } = useWorkouts()
  const pickerId = `${exercise.id}-picker`
  const label = exerciseName(exercise)

  return (
    <section className="block" aria-label={`Exercise ${index + 1}: ${label}`}>
      <div className="block-head">
        <span className="block-index" aria-hidden="true">{index + 1}</span>
        <div className="block-picker">
          <label htmlFor={pickerId} className="label">Exercise</label>
          <select
            id={pickerId}
            className="select"
            value={exercise.choice}
            onChange={(e) => updateExercise(exercise.id, { choice: e.target.value })}
          >
            {EXERCISES.map((name) => (
              <option key={name}>{name}</option>
            ))}
            <option value="Other">Other…</option>
          </select>
        </div>
        {canRemove && (
          <button type="button" className="text-btn" onClick={() => removeExercise(exercise.id)}>
            Remove
          </button>
        )}
      </div>

      {exercise.choice === 'Other' && (
        <div className="other">
          <label htmlFor={`${exercise.id}-other`} className="label">Exercise name</label>
          <input
            id={`${exercise.id}-other`}
            className="text-input"
            placeholder="e.g. Dumbbell Fly"
            value={exercise.customName}
            onChange={(e) => updateExercise(exercise.id, { customName: e.target.value })}
          />
        </div>
      )}

      {exercise.sets.length === 0 ? (
        <p className="block-empty">No sets yet. Add your first one.</p>
      ) : (
        <ol className="sets">
          {exercise.sets.map((set, i) => (
            <SetRow
              key={set.id}
              set={set}
              number={i + 1}
              exerciseLabel={label}
              showEmpty={showEmpty}
              onChange={(changes) => updateSet(exercise.id, set.id, changes)}
              onDelete={() => removeSet(exercise.id, set.id)}
            />
          ))}
        </ol>
      )}

      <button type="button" className="btn btn-line" onClick={() => addSet(exercise.id)}>
        + Add set
      </button>
    </section>
  )
}
