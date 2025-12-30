interface DecorativeAnchorProps {
    size?: number;
    className?: string;
}

const DecorativeAnchor = ({ size = 24, className = '' }: DecorativeAnchorProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`mx-4 ${className}`}
    >
        <circle cx="12" cy="5" r="2" fill="none" className="stroke-primary-color" strokeWidth="1" />
        <line x1="12" y1="7" x2="12" y2="18" className="stroke-primary-color" strokeWidth="1" />
        <path d="M8 16 Q12 20 16 16" fill="none" className="stroke-primary-color" strokeWidth="1" />
        <line x1="6" y1="12" x2="18" y2="12" className="stroke-primary-color" strokeWidth="1" />
    </svg>
);

export default DecorativeAnchor;
