import { useLocation } from 'react-router-dom'
import { useRef, useState, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import config from '../../config'
import StickyNavbar from './StickyNavbar'
import MenuButton from '../Menu/Button'
import { useStickyHeader } from './useStickyHeader'

// Map route paths to page IDs from config
const routeToPageId: Record<string, string> = {
    '/': 'home',
    '/our-story': 'our-story',
    '/the-cast': 'the-cast',
    '/the-event': 'the-event',
    '/experience-newport': 'experience-newport',
    '/q-and-a': 'q-and-a',
}

const getPageTitle = (pathname: string): string => {
    const pageId = routeToPageId[pathname]
    if (!pageId) return ''

    const page = config.pages.find((p) => p.id === pageId)
    if (!page) return ''

    // Handle different content structures
    if (page.content && typeof page.content === 'object' && 'title' in page.content) {
        return page.content.title as string
    }

    // Fallback to page name
    return page.name
}

// Interpolation helper
const lerp = (start: number, end: number, progress: number) => {
    return start + (end - start) * progress
}

// Easing function for smoother animation
const easeOutQuad = (t: number) => t * (2 - t)

const NAVBAR_HEIGHT = 80
const SCROLL_RANGE = 120

const titleTransition = {
    type: 'spring' as const,
    stiffness: 260,
    damping: 26,
    mass: 0.8,
    delay: 0.2,
}

const StickyHeader = () => {
    const location = useLocation()
    const { progress: rawProgress } = useStickyHeader(SCROLL_RANGE)
    const progress = easeOutQuad(rawProgress)
    const title = getPageTitle(location.pathname)
    const placeholderRef = useRef<HTMLDivElement>(null)
    const [measurements, setMeasurements] = useState({
        placeholderTop: 0,
        placeholderHeight: 80, // Matches the 5rem placeholder
        windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    })

    // Measure the placeholder position
    useLayoutEffect(() => {
        const measure = () => {
            if (placeholderRef.current) {
                const rect = placeholderRef.current.getBoundingClientRect()
                setMeasurements({
                    placeholderTop: rect.top + window.scrollY,
                    placeholderHeight: rect.height,
                    windowWidth: window.innerWidth,
                })
            }
        }

        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [location.pathname])

    // Calculate font size (animates as user scrolls)
    const startFontSize = 48
    const endFontSize = 28
    const fontSize = lerp(startFontSize, endFontSize, progress)

    // Calculate position
    // The title should:
    // 1. At progress=0: Be at its natural position (follow scroll)
    // 2. At progress=1: Be fixed at navbar center
    //
    // Since title is fixed-positioned, we interpolate between:
    // - "following scroll" position: where the placeholder would be in viewport
    // - "fixed" position: center of navbar

    const scrollY = rawProgress * SCROLL_RANGE // Derived from progress
    const placeholderCenter = measurements.placeholderTop + measurements.placeholderHeight / 2

    // Where the title WOULD be if it followed the scroll
    const followingPosition = placeholderCenter - scrollY
    // Where the title ends up (fixed in navbar)
    const fixedPosition = NAVBAR_HEIGHT / 2

    // Interpolate between following and fixed positions
    const currentY = lerp(followingPosition, fixedPosition, progress)

    return (
        <>
            {/* Sticky navbar (bar and menu button) */}
            <StickyNavbar progress={progress}>
                {/* Left: Menu button */}
                <div className="flex-shrink-0">
                    <MenuButton />
                </div>

                {/* Right: Empty spacer for balance */}
                <div className="flex-shrink-0 w-24 md:w-32" />
            </StickyNavbar>

            {/* Spacer to prevent content from going under fixed navbar */}
            <div className="h-20" />

            {/* Placeholder - maintains layout space for the title */}
            <div
                ref={placeholderRef}
                className="w-full text-center"
                style={{
                    height: '5rem',
                    marginBottom: '3rem',
                    paddingTop: '0.5rem'
                }}
                aria-hidden="true"
            />

            {/* Morphing title - starts large, shrinks into navbar on scroll */}
            {/* On mobile, gradually offset to center between menu button and right edge */}
            <div
                className="fixed left-0 right-0 flex justify-center items-center pointer-events-none"
                style={{
                    top: 0,
                    height: `${currentY * 2}px`,
                    zIndex: 101,
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={`title-${location.pathname}`}
                        className="title text-center whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={titleTransition}
                        style={{
                            fontSize: `clamp(20px, 7vw, ${fontSize}px)`,
                            // On mobile only, shift right as title moves into navbar to center between menu and edge
                            marginLeft: measurements.windowWidth < 768 ? `${lerp(0, 50, progress)}px` : 0,
                        }}
                    >
                        {title}
                    </motion.h1>
                </AnimatePresence>
            </div>
        </>
    )
}

export default StickyHeader
