import { useState, useEffect, useRef } from 'react';

interface AnimatedTitleProps {
    title: string;
    subtitle: string;
    location: string;
}

// Module-level flag - resets on page reload, persists during React Router navigation
let hasAnimatedThisSession = false;

const AnimatedTitle = ({ title, subtitle, location }: AnimatedTitleProps) => {
    // Check if animation should run - only on first page load (not on navigation)
    const [shouldAnimate] = useState(() => {
        if (typeof window === 'undefined') return false;
        if (hasAnimatedThisSession) return false;

        // Mark as animated for this session
        hasAnimatedThisSession = true;
        return true;
    });

    const [isAnimating, setIsAnimating] = useState(!shouldAnimate);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shouldAnimate) {
            const timer = setTimeout(() => setIsAnimating(true), 300);
            return () => clearTimeout(timer);
        }
    }, [shouldAnimate]);

    // Don't render animation wrapper if we're skipping animation
    if (!shouldAnimate) {
        return (
            <div className="text-center py-10">
                <h1 className="title text-4xl md:text-5xl mt-7">{title}</h1>
                <h2 className="subtitle font-laluxes text-xl md:text-2xl mt-7">{subtitle}</h2>
                <div className="flex flex-wrap items-center justify-center mt-3 mb-5 gap-x-3 gap-y-2">
                    <h2 className="subtitle font-laluxes text-xl md:text-2xl whitespace-nowrap">
                        {location.split(' • ')[0]}
                    </h2>
                    <span className="subtitle font-laluxes text-xl md:text-2xl hidden xs:inline-block">•</span>
                    <h2 className="subtitle font-laluxes-noligatures text-xl md:text-2xl">
                        {location.split(' • ')[1]}
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="relative text-center py-10 overflow-hidden"
            style={{
                background: 'transparent',
                opacity: isAnimating ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
            }}
        >
            {/* Main text with fade and blur animation */}
            <h1
                className="title text-4xl md:text-5xl relative m-0 px-8 mt-7"
                style={{
                    color: 'var(--primary-color)',
                    opacity: isAnimating ? 1 : 0,
                    ...(isAnimating ? {} : {
                        filter: 'blur(12px)',
                        transform: 'scale(1.02)',
                    }),
                    transition: 'opacity 2.5s cubic-bezier(0.4, 0, 0.2, 1), filter 2.5s cubic-bezier(0.4, 0, 0.2, 1), transform 2.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {title}
            </h1>

            {/* Date and location */}
            <div
                style={{
                    opacity: isAnimating ? 1 : 0,
                    transform: isAnimating ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 1.5s ease-out 1.5s, transform 1.5s ease-out 1.5s',
                }}
            >
                <h2 className="subtitle font-laluxes text-xl md:text-2xl mt-7">
                    {subtitle}
                </h2>
                <div className="flex flex-wrap items-center justify-center mt-3 mb-5 gap-x-3 gap-y-2">
                    <h2 className="subtitle font-laluxes text-xl md:text-2xl whitespace-nowrap">
                        {location.split(' • ')[0]}
                    </h2>
                    <span className="subtitle font-laluxes text-xl md:text-2xl hidden xs:inline-block">•</span>
                    <h2 className="subtitle font-laluxes-noligatures text-xl md:text-2xl">
                        {location.split(' • ')[1]}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default AnimatedTitle;
