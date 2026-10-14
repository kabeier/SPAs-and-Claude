import { TrashIcon } from './Icons'
import { repsError, weightError } from '../utils/validate'

// One set inside an exercise block: [weight] lb × [reps] reps  🗑
// Errors show under the field as soon as the value is wrong;
// empty fields only complain after "Finish" was pressed (showEmpty).
export default function SetRow({ set, number, exerciseLabel, showEmpty, onChange, onDelete }) {
  const wErr = set.weight === '' && !showEmpty ? '' : weightError(set.weight)
  const rErr = set.reps === '' && !showEmpty ? '' : repsError(set.reps)
  const wId = `${set.id}-weight`
  const rId = `${set.id}-reps`

  return (
    <li className="set">
      <span className="set-num" aria-hidden="true">{number}</span>

      <div className="field">
        <label htmlFor={wId} className="sr-only">{exerciseLabel} set {number} weight in pounds</label>
        <div className={`num-input${wErr ? ' has-error' : ''}`}>
          <input
            id={wId}
            inputMode="decimal"
            autoComplete="off"
            placeholder="0"
            value={set.weight}
            aria-invalid={Boolean(wErr)}
            aria-describedby={wErr ? `${wId}-err` : undefined}
            onChange={(e) => onChange({ weight: e.target.value })}
          />
          <span className="unit" aria-hidden="true">lb</span>
        </div>
        {wErr && <p id={`${wId}-err`} className="error">{wErr}</p>}
      </div>

      <span className="times" aria-hidden="true">×</span>

      <div className="field">
        <label htmlFor={rId} className="sr-only">{exerciseLabel} set {number} reps</label>
        <div className={`num-input${rErr ? ' has-error' : ''}`}>
          <input
            id={rId}
            inputMode="numeric"
            autoComplete="off"
            placeholder="0"
            value={set.reps}
            aria-invalid={Boolean(rErr)}
            aria-describedby={rErr ? `${rId}-err` : undefined}
            onChange={(e) => onChange({ reps: e.target.value })}
          />
          <span className="unit" aria-hidden="true">reps</span>
        </div>
        {rErr && <p id={`${rId}-err`} className="error">{rErr}</p>}
      </div>

      <button type="button" className="icon-btn" onClick={onDelete} aria-label={`Delete set ${number}`}>
        <TrashIcon />
      </button>
    </li>
  )
}
