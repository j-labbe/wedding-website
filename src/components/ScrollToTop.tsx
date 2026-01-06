import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Delay scroll reset to occur after the exit animation completes (when screen is blank)
// The spring animation with stiffness:260, damping:26, mass:0.8 takes ~450ms to settle
const SCROLL_RESET_DELAY = 450 // ms

const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0, 0)
        }, SCROLL_RESET_DELAY)

        return () => clearTimeout(timer)
    }, [pathname])

    return null
}

export default ScrollToTop
