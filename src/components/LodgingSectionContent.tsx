import FadeInOnScroll from './FadeInOnScroll'
import LodgingCard from './LodgingCard'
import type { LodgingSection } from '../types/PageTypes'
import { parseMarkdown } from '../utils/parseMarkdown'

interface LodgingSectionContentProps {
    section: LodgingSection
}

function LodgingSectionContent({ section }: LodgingSectionContentProps) {
    return (
        <div className="mb-12">
            <FadeInOnScroll>
                <h3 className="font-laluxes text-2xl tracking-wide mb-2">
                    {section.title}
                </h3>
                <p className="text-base mb-6 opacity-70">
                    {parseMarkdown(section.description)}
                </p>
            </FadeInOnScroll>
            {section.hotels.length > 0 ? (
                <div
                    className={`grid gap-4 md:grid-cols-2 ${section.hotels.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}
                >
                    {section.hotels.map((hotel, index) => (
                        <LodgingCard key={index} hotel={hotel} />
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default LodgingSectionContent
