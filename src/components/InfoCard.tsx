interface InfoCardProps {
    title: string;
    items: string[];
}

const InfoCard = ({ title, items }: InfoCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
            <div style={{ containerType: 'inline-size' }}>
                <h2 className="title font-laluxes mb-6 text-center whitespace-nowrap" style={{ color: 'var(--primary-color)', fontSize: 'clamp(1rem, 7cqi, 2.5rem)' }}>
                    {title}
                </h2>
            </div>
            <ul className="text-md md:text-lg space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <span className="mr-3 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary-color)' }}>•</span>
                        <span className="flex-1 text-left leading-snug">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InfoCard;
