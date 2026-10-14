import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="empty empty-page">
      <p className="big-404" aria-hidden="true">404</p>
      <h1 className="empty-title">That page isn't in the program</h1>
      <p className="empty-text">The link might be old or mistyped.</p>
      <Link to="/" className="btn btn-primary btn-big">Back to Home</Link>
    </div>
  )
}
