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
                <h1 className="title text-4xl md:text-5xl mt-5">{title}</h1>
                <h2 className="subtitle font-laluxes text-xl md:text-2xl mt-5">{subtitle}</h2>
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
            {/* SVG Filters */}
            <svg className="absolute w-0 h-0">
                <defs>
                    {/* Ink bloom filter */}
                    <filter id="ink-bloom" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur">
                            <animate
                                attributeName="stdDeviation"
                                values="30;8;2;0"
                                dur="2.5s"
                                begin="0.3s"
                                fill="freeze"
                                calcMode="spline"
                                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                            />
                        </feGaussianBlur>

                        <feMorphology in="blur" operator="dilate" radius="0" result="spread">
                            <animate
                                attributeName="radius"
                                values="15;5;1;0"
                                dur="2.5s"
                                begin="0.3s"
                                fill="freeze"
                                calcMode="spline"
                                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                            />
                        </feMorphology>

                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.04"
                            numOctaves="4"
                            result="noise"
                        />
                        <feDisplacementMap
                            in="spread"
                            in2="noise"
                            scale="3"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            result="organic"
                        />

                        <feBlend in="organic" in2="SourceGraphic" mode="normal" />
                    </filter>
                </defs>
            </svg>

            {/* Ink drop splash effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                {[
                    { x: '20%', y: '40%', delay: '0s', size: 200 },
                    { x: '50%', y: '50%', delay: '0.1s', size: 300 },
                    { x: '80%', y: '45%', delay: '0.2s', size: 180 },
                    { x: '35%', y: '55%', delay: '0.15s', size: 150 },
                    { x: '65%', y: '48%', delay: '0.25s', size: 220 },
                ].map((drop, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            left: drop.x,
                            top: drop.y,
                            width: drop.size,
                            height: drop.size,
                            transform: 'translate(-50%, -50%)',
                            background: `radial-gradient(circle, rgba(62, 77, 98, ${isAnimating ? 0 : 0.15}) 0%, transparent 70%)`,
                            opacity: isAnimating ? 0 : 1,
                            transition: `all 2s cubic-bezier(0.4, 0, 0.2, 1) ${drop.delay}`,
                            filter: 'blur(20px)',
                        }}
                    />
                ))}
            </div>

            {/* Main text with ink animation */}
            <h1
                className="title text-4xl md:text-5xl relative m-0 px-8 mt-5"
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
                {/* Ink diffusion layer */}
                <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        color: 'var(--primary-color)',
                        filter: 'url(#ink-bloom)',
                        opacity: isAnimating ? 0 : 0.6,
                        transition: 'opacity 3s ease-out 1s',
                    }}
                >
                    {title}
                </span>

                {/* Main crisp text */}
                <span className="relative">{title}</span>
            </h1>

            {/* Date and location */}
            <div
                style={{
                    opacity: isAnimating ? 1 : 0,
                    transform: isAnimating ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 1.5s ease-out 1.5s, transform 1.5s ease-out 1.5s',
                }}
            >
                <h2 className="subtitle font-laluxes text-xl md:text-2xl mt-5">
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
