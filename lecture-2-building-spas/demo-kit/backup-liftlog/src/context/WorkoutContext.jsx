import { createContext, useContext, useState } from 'react'
import { EXERCISES, SEED_WORKOUTS } from '../data/seed'

// All app data lives here, in React state at the top of the app.
// No localStorage, no backend: a page refresh resets everything.
const WorkoutContext = createContext(null)

let nextId = 1
const makeId = (prefix) => `${prefix}${Date.now().toString(36)}${nextId++}`

function todayLabel() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function blankExercise() {
  return { id: makeId('e'), choice: EXERCISES[0], customName: '', sets: [] }
}

function blankDraft() {
  return { editingId: null, name: `Workout — ${todayLabel()}`, exercises: [blankExercise()] }
}

// Turn a saved workout into an editable draft (numbers → strings for inputs)
function workoutToDraft(workout) {
  return {
    editingId: workout.id,
    name: workout.name,
    exercises: workout.exercises.map((ex) => ({
      id: makeId('e'),
      choice: EXERCISES.includes(ex.name) ? ex.name : 'Other',
      customName: EXERCISES.includes(ex.name) ? '' : ex.name,
      sets: ex.sets.map((s) => ({ id: makeId('s'), weight: String(s.weight), reps: String(s.reps) })),
    })),
  }
}

export function exerciseName(ex) {
  return ex.choice === 'Other' ? ex.customName.trim() || 'Other exercise' : ex.choice
}

export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState(SEED_WORKOUTS)
  const [draft, setDraft] = useState(blankDraft)
  const [toast, setToast] = useState(null)

  // ----- saved workouts -----
  const getWorkout = (id) => workouts.find((w) => w.id === id)

  const deleteWorkout = (id) => setWorkouts((all) => all.filter((w) => w.id !== id))

  // Save the current draft: creates a new workout, or updates the one being edited.
  function saveDraft() {
    const exercises = draft.exercises
      .filter((ex) => ex.sets.length > 0)
      .map((ex) => ({
        name: exerciseName(ex),
        sets: ex.sets.map((s) => ({ weight: Number(s.weight), reps: Number(s.reps) })),
      }))
    const name = draft.name.trim() || `Workout — ${todayLabel()}`

    if (draft.editingId) {
      setWorkouts((all) =>
        all.map((w) => (w.id === draft.editingId ? { ...w, name, exercises } : w)),
      )
    } else {
      const workout = { id: makeId('w'), name, date: new Date().toISOString(), exercises }
      setWorkouts((all) => [workout, ...all])
    }
    setDraft(blankDraft())
  }

  // ----- the in-progress draft on /log -----
  const resetDraft = () => setDraft(blankDraft())
  const startEditing = (workout) => setDraft(workoutToDraft(workout))
  const renameDraft = (name) => setDraft((d) => ({ ...d, name }))

  const addExercise = () =>
    setDraft((d) => ({ ...d, exercises: [...d.exercises, blankExercise()] }))

  const removeExercise = (exId) =>
    setDraft((d) => ({ ...d, exercises: d.exercises.filter((ex) => ex.id !== exId) }))

  const updateExercise = (exId, changes) =>
    setDraft((d) => ({
      ...d,
      exercises: d.exercises.map((ex) => (ex.id === exId ? { ...ex, ...changes } : ex)),
    }))

  // New set copies the previous set's weight & reps to save typing
  const addSet = (exId) =>
    setDraft((d) => ({
      ...d,
      exercises: d.exercises.map((ex) => {
        if (ex.id !== exId) return ex
        const last = ex.sets[ex.sets.length - 1]
        const newSet = { id: makeId('s'), weight: last?.weight ?? '', reps: last?.reps ?? '' }
        return { ...ex, sets: [...ex.sets, newSet] }
      }),
    }))

  const updateSet = (exId, setId, changes) =>
    setDraft((d) => ({
      ...d,
      exercises: d.exercises.map((ex) =>
        ex.id !== exId
          ? ex
          : { ...ex, sets: ex.sets.map((s) => (s.id === setId ? { ...s, ...changes } : s)) },
      ),
    }))

  const removeSet = (exId, setId) =>
    setDraft((d) => ({
      ...d,
      exercises: d.exercises.map((ex) =>
        ex.id !== exId ? ex : { ...ex, sets: ex.sets.filter((s) => s.id !== setId) },
      ),
    }))

  // ----- toast messages ("Workout saved") -----
  const showToast = (message) => setToast({ id: Date.now(), message })
  const hideToast = () => setToast(null)

  const value = {
    workouts,
    getWorkout,
    deleteWorkout,
    draft,
    saveDraft,
    resetDraft,
    startEditing,
    renameDraft,
    addExercise,
    removeExercise,
    updateExercise,
    addSet,
    updateSet,
    removeSet,
    toast,
    showToast,
    hideToast,
  }

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
}

// Any component can call useWorkouts() to read or change the data.
export function useWorkouts() {
  return useContext(WorkoutContext)
}
