import { useState, useEffect } from 'react';

interface Section {
    id: string;
    category: string;
}

interface QAndAFloatingNavProps {
    sections: Section[];
    activeSection: string;
    onNavigate: (id: string) => void;
}

const CompassIcon = ({ active, expanded }: { active: boolean; expanded: boolean }) => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        className="flex-shrink-0 transition-transform duration-300 ease-out"
        style={{
            transform: expanded ? 'scale(1.05)' : 'scale(1)',
        }}
    >
        <circle
            cx="14"
            cy="14"
            r="12"
            fill="none"
            className={`transition-all duration-300 ease-out ${active ? 'stroke-accent-gold' : 'stroke-primary-color'}`}
            strokeWidth="1"
            opacity="0.3"
        />
        <circle
            cx="14"
            cy="14"
            r="2"
            className={`transition-all duration-300 ease-out ${active ? 'fill-accent-gold' : 'fill-primary-color'}`}
        />
        <path
            d="M14 4 L15.5 12 L14 14 L12.5 12 Z"
            className={`transition-all duration-300 ease-out ${active ? 'fill-accent-gold' : 'fill-primary-color'}`}
        />
        <path
            d="M14 24 L12.5 16 L14 14 L15.5 16 Z"
            className={`transition-all duration-300 ease-out ${active ? 'fill-accent-gold' : 'fill-primary-color'}`}
            opacity="0.5"
        />
        <path
            d="M4 14 L12 12.5 L14 14 L12 15.5 Z"
            className={`transition-all duration-300 ease-out ${active ? 'fill-accent-gold' : 'fill-primary-color'}`}
            opacity="0.5"
        />
        <path
            d="M24 14 L16 15.5 L14 14 L16 12.5 Z"
            className={`transition-all duration-300 ease-out ${active ? 'fill-accent-gold' : 'fill-primary-color'}`}
        />
    </svg>
);

const QAndAFloatingNav = ({ sections, activeSection, onNavigate }: QAndAFloatingNavProps) => {
    const [navExpanded, setNavExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleNavigate = (id: string) => {
        onNavigate(id);
        setNavExpanded(false);
    };

    // Mobile: horizontal nav at bottom
    if (isMobile) {
        return (
            <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
                <div className="backdrop-blur-sm rounded-full py-3 px-4 shadow-lg border border-primary-color/10 bg-white/90">
                    <div className="flex items-center gap-3">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => handleNavigate(section.id)}
                                className="group relative flex items-center justify-center"
                                aria-label={section.category}
                            >
                                <CompassIcon active={activeSection === section.id} expanded={false} />
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        );
    }

    // Desktop: vertical nav on right side
    return (
        <nav
            className="fixed right-6 top-1/2 -translate-y-1/2 z-40"
            onMouseEnter={() => setNavExpanded(true)}
            onMouseLeave={() => setNavExpanded(false)}
        >
            <div
                className="backdrop-blur-sm shadow-lg border border-primary-color/10 bg-white/90"
                style={{
                    padding: navExpanded ? '16px 16px 16px 20px' : '16px 12px',
                    borderRadius: navExpanded ? '20px' : '28px',
                    transition: 'padding 400ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <div className="flex flex-col items-stretch gap-4">
                    {sections.map((section, index) => (
                        <button
                            key={section.id}
                            onClick={() => handleNavigate(section.id)}
                            className="group flex items-center cursor-pointer justify-end"
                            aria-label={section.category}
                        >
                            <span
                                className={`whitespace-nowrap text-sm font-laluxes tracking-wide overflow-hidden ${
                                    activeSection === section.id ? 'text-accent-gold' : 'text-primary-color'
                                }`}
                                style={{
                                    maxWidth: navExpanded ? '160px' : '0px',
                                    opacity: navExpanded ? 1 : 0,
                                    marginRight: navExpanded ? '12px' : '0px',
                                    transition: `max-width 400ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 30}ms, opacity 300ms ease-out ${navExpanded ? 100 + index * 30 : 0}ms, margin-right 400ms cubic-bezier(0.4, 0, 0.2, 1)`,
                                }}
                            >
                                {section.category}
                            </span>
                            <CompassIcon active={activeSection === section.id} expanded={navExpanded} />
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default QAndAFloatingNav;
