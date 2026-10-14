import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import Toast from './Toast'

// Shared frame for every page: the page itself (<Outlet/>), a toast, and the tab bar.
export default function Layout() {
  const { pathname } = useLocation()

  // Start each new page at the top, like a normal website would
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app">
      <main className="page" key={pathname}>
        <Outlet />
      </main>
      <Toast />
      <BottomNav />
    </div>
  )
}
