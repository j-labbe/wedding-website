import { useState, useEffect, useRef } from 'react'
import { usePostHog } from 'posthog-js/react'
import {
    hasConsentChoice,
    setConsent,
} from '../utils/cookieConsent'

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [showProgress, setShowProgress] = useState(false)
    const posthog = usePostHog()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const implicitConsentTimerRef = useRef<any | null>(null)
    const hasImplicitlyConsentedRef = useRef(false)
    const hasStartedProgressRef = useRef(false)

    useEffect(() => {
        // Only show banner if user hasn't made a choice yet
        if (!hasConsentChoice()) {
            // Small delay for smooth entrance animation
            setTimeout(() => setShowBanner(true), 100)

            // Set up implicit consent listeners
            const handleInteraction = () => {
                // Only start once
                if (hasStartedProgressRef.current) return
                hasStartedProgressRef.current = true

                // Start progress bar animation
                setShowProgress(true)
            }

            // Listen for scroll and click as signs of continued usage
            window.addEventListener('scroll', handleInteraction, { passive: true })
            window.addEventListener('click', handleInteraction)

            return () => {
                window.removeEventListener('scroll', handleInteraction)
                window.removeEventListener('click', handleInteraction)
                if (implicitConsentTimerRef.current) {
                    clearTimeout(implicitConsentTimerRef.current)
                }
            }
        }
    }, [posthog])

    const handleImplicitAccept = () => {
        if (hasImplicitlyConsentedRef.current) return
        hasImplicitlyConsentedRef.current = true

        setConsent('accepted')
        setIsClosing(true)

        // Enable PostHog tracking
        if (posthog) {
            posthog.opt_in_capturing()
            console.log('[Analytics] User implicitly accepted tracking (continued usage)')
        }

        // Hide banner after closing animation
        setTimeout(() => {
            setShowBanner(false)
        }, 300)
    }

    const handleProgressComplete = () => {
        if (!hasConsentChoice()) {
            handleImplicitAccept()
        }
    }

    const handleAccept = () => {
        setConsent('accepted')
        setIsClosing(true)

        // Enable PostHog tracking
        if (posthog) {
            posthog.opt_in_capturing()
            console.log('[Analytics] User explicitly accepted tracking')
        }

        // Hide banner after animation
        setTimeout(() => {
            setShowBanner(false)
        }, 300)
    }

    const handleDecline = () => {
        setConsent('declined')
        setIsClosing(true)

        // Disable PostHog tracking
        if (posthog) {
            posthog.opt_out_capturing()
            console.log('[Analytics] User declined tracking')
        }

        // Hide banner after animation
        setTimeout(() => {
            setShowBanner(false)
        }, 300)
    }

    if (!showBanner) {
        return null
    }

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-primary-color/20 shadow-lg transition-all duration-300 ease-out ${
                isClosing
                    ? 'translate-y-full opacity-0'
                    : 'translate-y-0 opacity-100'
            }`}
            style={{
                animation: isClosing ? 'none' : 'slideUp 0.4s ease-out'
            }}
        >
            <style>{`
                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                @keyframes progressBar {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }
            `}</style>
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm text-primary-color">
                        We use analytics to improve your experience and understand
                        how our site is used. By continuing to use this site, you consent to analytics tracking.{' '}
                        <a
                            href="/privacy-policy.txt"
                            target="_blank"
                            className="underline hover:opacity-70"
                        >
                            Learn more
                        </a>
                    </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                    <button
                        onClick={handleDecline}
                        className="px-4 py-2 text-sm border border-primary-color/30 rounded hover:bg-primary-color/5 transition-all duration-200 cursor-pointer hover:scale-105"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="relative overflow-hidden px-4 py-2 text-sm bg-primary-color text-white rounded hover:opacity-90 transition-all duration-200 cursor-pointer hover:scale-105"
                    >
                        Accept
                        {showProgress && (
                            <div
                                className="absolute bottom-0 left-0 h-1 bg-white/60"
                                style={{
                                    animation: 'progressBar 5s linear forwards'
                                }}
                                onAnimationEnd={handleProgressComplete}
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CookieBanner
