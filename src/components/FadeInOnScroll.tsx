import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface FadeInOnScrollProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

const FadeInOnScroll = ({ children, delay = 0, className = '' }: FadeInOnScrollProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (elementRef.current) {
                        observer.unobserve(elementRef.current);
                    }
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={elementRef}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 500ms ease-out ${delay}ms, transform 500ms ease-out ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

export default FadeInOnScroll;
