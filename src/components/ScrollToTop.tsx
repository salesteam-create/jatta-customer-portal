import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Router navigation keeps the scroll position by default, which reads badly in a demo. */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
