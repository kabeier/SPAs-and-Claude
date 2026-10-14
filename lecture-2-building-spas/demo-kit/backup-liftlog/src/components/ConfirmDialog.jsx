import { useEffect, useRef } from 'react'

// "Are you sure?" popup built on the native <dialog> element,
// which handles focus trapping and the Escape key for us.
export default function ConfirmDialog({ open, title, message, confirmLabel, cancelLabel, onConfirm, onCancel, danger }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault() // Escape key → treat as "cancel"
        onCancel()
      }}
    >
      <h2 id="dialog-title" className="dialog-title">{title}</h2>
      {message && <p className="dialog-text">{message}</p>}
      <div className="dialog-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel} autoFocus>
          {cancelLabel}
        </button>
        <button type="button" className={danger ? 'btn btn-danger' : 'btn btn-primary'} onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  )
}
