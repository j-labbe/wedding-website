import type { ReactNode } from 'react';

interface DecorativeDividerProps {
    children: ReactNode;
    className?: string;
}

const DecorativeDivider = ({ children, className = '' }: DecorativeDividerProps) => (
    <div className={`flex items-center justify-center opacity-40 ${className}`}>
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-gold" />
        {children}
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-gold" />
    </div>
);

export default DecorativeDivider;
