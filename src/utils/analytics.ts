import posthog from 'posthog-js'
import { shouldEnableTracking } from './cookieConsent'

// Define event types as constants for type safety and consistency
// Note: PageViews are automatically tracked by PostHog with defaults: '2025-05-24'
export const ANALYTICS_EVENTS = {
    CONTACT_MODAL_OPENED: 'contact_modal_opened',
} as const

export type AnalyticsEventType = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS]

interface EventMetadata {
    [key: string]: string | number | boolean | undefined
}

/**
 * Record an analytics event
 * @param eventType - The type of event to record
 * @param metadata - Optional metadata to attach to the event
 */
export const recordEvent = (
    eventType: AnalyticsEventType,
    metadata?: EventMetadata
): void => {
    try {
        // Check if user has consented to tracking
        if (!shouldEnableTracking()) {
            console.log(
                `[Analytics] Event not recorded (no consent): ${eventType}`
            )
            return
        }

        // Only record if PostHog is initialized and not in development
        if (typeof window !== 'undefined' && posthog) {
            posthog.capture(eventType, metadata)
            console.log(`[Analytics] Event recorded: ${eventType}`, metadata)
        }
    } catch (error) {
        console.error('[Analytics] Failed to record event:', error)
    }
}

/**
 * Identify a user (useful for future user tracking)
 * @param userId - Unique identifier for the user
 * @param properties - Optional user properties
 */
export const identifyUser = (
    userId: string,
    properties?: EventMetadata
): void => {
    try {
        if (typeof window !== 'undefined' && posthog) {
            posthog.identify(userId, properties)
        }
    } catch (error) {
        console.error('[Analytics] Failed to identify user:', error)
    }
}

/**
 * Reset the user session (useful for logout scenarios)
 */
export const resetUser = (): void => {
    try {
        if (typeof window !== 'undefined' && posthog) {
            posthog.reset()
        }
    } catch (error) {
        console.error('[Analytics] Failed to reset user:', error)
    }
}
