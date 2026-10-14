import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WorkoutProvider } from './context/WorkoutContext'
import App from './App'
import './index.css'

// GitHub Pages has no SPA fallback: the site's 404.html sends deep links here as ?p=/history
const redirected = new URLSearchParams(location.search).get('p')
if (redirected) history.replaceState(null, '', import.meta.env.BASE_URL.replace(/\/$/, '') + redirected)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <WorkoutProvider>
        <App />
      </WorkoutProvider>
    </BrowserRouter>
  </StrictMode>,
)
