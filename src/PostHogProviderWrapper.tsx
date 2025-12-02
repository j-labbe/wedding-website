import type { PropsWithChildren } from 'react'
import { PostHogProvider } from 'posthog-js/react'
import { shouldEnableTracking } from './utils/cookieConsent'

const PostHogProviderWrapper = ({ children }: PropsWithChildren) => {
    if (window.location.host !== 'sammyandjack.com') {
        console.warn(
            'PostHogProviderWrapper: Skipping PostHogProvider in non-production environment'
        )
        return <>{children}</>
    }

    // Check if tracking should be enabled (respects explicit consent and implicit consent)
    const hasConsented = shouldEnableTracking()

    const options = {
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        defaults: '2025-05-24',
        autocapture: false,
        // Disable tracking only if user has explicitly declined
        // Enable by default for implicit consent (user continues to use site)
        opt_out_capturing_by_default: !hasConsented,
    } as const

    console.log(
        `[PostHog] Initializing with tracking ${hasConsented ? 'enabled' : 'disabled'} based on consent`
    )

    return (
        <PostHogProvider
            apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
            options={options}
        >
            {children}
        </PostHogProvider>
    )
}

export default PostHogProviderWrapper
