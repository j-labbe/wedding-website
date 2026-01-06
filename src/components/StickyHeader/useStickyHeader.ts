import { useState, useEffect, useRef } from 'react'

interface UseStickyHeaderReturn {
    progress: number
    isScrolled: boolean
}

export const useStickyHeader = (scrollRange: number = 150): UseStickyHeaderReturn => {
    const [progress, setProgress] = useState(0)
    const ticking = useRef(false)

    useEffect(() => {
        const updateProgress = () => {
            const newProgress = Math.min(1, Math.max(0, window.scrollY / scrollRange))
            setProgress(newProgress)
            ticking.current = false
        }

        const handleScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(updateProgress)
                ticking.current = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        // Initial calculation
        updateProgress()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [scrollRange])

    return {
        progress,
        isScrolled: progress > 0,
    }
}
