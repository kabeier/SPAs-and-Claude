import { useEffect } from 'react'
import { useWorkouts } from '../context/WorkoutContext'

// Small message that pops up above the tab bar and hides itself.
export default function Toast() {
  const { toast, hideToast } = useWorkouts()

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(hideToast, 2600)
    return () => clearTimeout(timer)
  }, [toast]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div className="toast" key={toast.id}>
          <span className="toast-check" aria-hidden="true">✓</span>
          {toast.message}
        </div>
      )}
    </div>
  )
}
