import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import LogWorkout from './pages/LogWorkout'
import History from './pages/History'
import WorkoutDetail from './pages/WorkoutDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      {/* Layout renders the bottom nav + <Outlet/> for the current page */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<LogWorkout />} />
        <Route path="/history" element={<History />} />
        <Route path="/workout/:id" element={<WorkoutDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
