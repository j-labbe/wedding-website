interface WaveDividerProps {
    className?: string;
}

const WaveDivider = ({ className = '' }: WaveDividerProps) => (
    <svg
        viewBox="0 0 1200 40"
        className={`w-full h-8 my-12 opacity-20 ${className}`}
        preserveAspectRatio="none"
    >
        <path
            d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20"
            fill="none"
            className="stroke-primary-color"
            strokeWidth="1.5"
        />
        <path
            d="M0,28 Q150,8 300,28 T600,28 T900,28 T1200,28"
            fill="none"
            className="stroke-primary-color"
            strokeWidth="1"
            opacity="0.5"
        />
    </svg>
);

export default WaveDivider;
