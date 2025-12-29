interface AnchorBulletProps {
    className?: string;
    size?: number;
}

const AnchorBullet = ({ className = '', size = 16 }: AnchorBulletProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`flex-shrink-0 mt-1 mr-3 opacity-60 ${className}`}
    >
        <circle cx="12" cy="5" r="2" fill="none" className="stroke-accent-gold" strokeWidth="1.5" />
        <line x1="12" y1="7" x2="12" y2="20" className="stroke-accent-gold" strokeWidth="1.5" />
        <path d="M8 18 Q12 22 16 18" fill="none" className="stroke-accent-gold" strokeWidth="1.5" />
        <line x1="6" y1="14" x2="18" y2="14" className="stroke-accent-gold" strokeWidth="1.5" />
    </svg>
);

export default AnchorBullet;
