// Three sample workouts so the app isn't empty on first load.
// There is no database: refreshing the page resets to exactly this.

export const EXERCISES = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Overhead Press',
  'Barbell Row',
  'Pull-up',
]

// Small helper to keep the seed data short: sets('135x8', '145x6')
function sets(...pairs) {
  return pairs.map((pair) => {
    const [weight, reps] = pair.split('x').map(Number)
    return { weight, reps }
  })
}

export const SEED_WORKOUTS = [
  {
    id: 'w3',
    name: 'Push Day',
    date: '2026-10-12T18:00:00',
    exercises: [
      { name: 'Bench Press', sets: sets('135x8', '145x6', '155x4') },
      { name: 'Overhead Press', sets: sets('85x8', '95x6', '95x5') },
      { name: 'Dips', sets: sets('0x12', '0x10') },
      { name: 'Tricep Pushdown', sets: sets('50x12', '50x12') },
    ],
  },
  {
    id: 'w2',
    name: 'Leg Day',
    date: '2026-10-10T09:30:00',
    exercises: [
      { name: 'Squat', sets: sets('185x5', '205x5', '225x3') },
      { name: 'Romanian Deadlift', sets: sets('135x10', '155x8') },
      { name: 'Leg Press', sets: sets('270x12', '320x10') },
      { name: 'Walking Lunge', sets: sets('40x12', '40x12') },
      { name: 'Calf Raise', sets: sets('90x15', '90x15') },
    ],
  },
  {
    id: 'w1',
    name: 'Pull Day',
    date: '2026-10-08T17:45:00',
    exercises: [
      { name: 'Deadlift', sets: sets('225x5', '275x3', '295x1') },
      { name: 'Barbell Row', sets: sets('115x8', '135x8') },
      { name: 'Pull-up', sets: sets('0x8', '0x6') },
      { name: 'Bicep Curl', sets: sets('30x10', '30x10') },
    ],
  },
]
