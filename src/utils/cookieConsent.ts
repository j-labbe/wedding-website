/**
 * Cookie consent management utilities
 * Handles storing and retrieving user's analytics consent preferences
 */

const COOKIE_NAME = 'analytics_consent'
const COOKIE_EXPIRY_DAYS = 365

export type ConsentValue = 'accepted' | 'declined' | null

/**
 * Check if the browser has Do Not Track enabled
 */
export function hasDoNotTrack(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return false
    }

    // Check multiple DNT properties for browser compatibility
    const dnt =
        navigator.doNotTrack ||
        (window as any).doNotTrack ||
        (navigator as any).msDoNotTrack

    return dnt === '1' || dnt === 'yes'
}

/**
 * Set a cookie with the given name, value, and expiry
 */
function setCookie(name: string, value: string, days: number): void {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`
}

/**
 * Get a cookie value by name
 */
function getCookie(name: string): string | null {
    const nameEQ = `${name}=`
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
}

/**
 * Delete a cookie by name
 */
function deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

/**
 * Check if the user has already made a consent choice
 */
export function hasConsentChoice(): boolean {
    return getCookie(COOKIE_NAME) !== null
}

/**
 * Get the user's current consent choice
 */
export function getConsent(): ConsentValue {
    const value = getCookie(COOKIE_NAME)
    if (value === 'accepted' || value === 'declined') {
        return value as ConsentValue
    }
    return null
}

/**
 * Set the user's consent choice
 */
export function setConsent(consent: 'accepted' | 'declined'): void {
    setCookie(COOKIE_NAME, consent, COOKIE_EXPIRY_DAYS)
}

/**
 * Clear the user's consent choice (resets to show banner again)
 */
export function clearConsent(): void {
    deleteCookie(COOKIE_NAME)
}

/**
 * Check if analytics tracking should be enabled based on consent
 * Returns true if user has accepted OR if no choice has been made (implicit consent)
 * Returns false if user has explicitly declined
 */
export function shouldEnableTracking(): boolean {
    const consent = getConsent()

    // Explicit decline
    if (consent === 'declined') {
        return false
    }

    // Explicit accept or no choice yet (implicit consent through continued usage)
    // The banner will handle setting consent to 'accepted' after user interaction
    return consent === 'accepted' || consent === null
}
