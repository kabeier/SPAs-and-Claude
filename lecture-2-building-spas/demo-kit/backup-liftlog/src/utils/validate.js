// Validation for one set row. Returns an error message, or '' if valid.
// Values come straight from <input> so they are strings.

export function weightError(value) {
  if (value.trim() === '') return 'Enter a weight (0 for bodyweight)'
  const n = Number(value)
  if (Number.isNaN(n) || n < 0) return 'Weight must be a number, 0 or more'
  return ''
}

export function repsError(value) {
  if (value.trim() === '') return 'Enter your reps'
  const n = Number(value)
  if (!Number.isInteger(n) || n < 1) return 'Reps must be a whole number above 0'
  return ''
}
