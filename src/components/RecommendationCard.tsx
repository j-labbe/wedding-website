import { useState } from 'react';
import FadeInOnScroll from './FadeInOnScroll';
import Lightbox from './Lightbox';

interface LQIPData {
    lqip: string;
    src: string;
    width: number;
    height: number;
}

interface RecommendationCardProps {
    name: string;
    description: string;
    image: LQIPData;
    link?: string;
    index: number;
}

const RecommendationCard = ({ name, description, image, link, index }: RecommendationCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const isImageRight = index % 2 === 0; // Even index: text left, image right

    return (
        <FadeInOnScroll delay={(index % 4) * 100}>
            <article
                className="flex flex-col md:flex-row gap-6 md:gap-12 items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Section - always first on mobile, staggered on desktop */}
                <div
                    className={`w-full md:w-1/2 relative ${
                        isImageRight ? 'md:order-2' : 'md:order-1'
                    }`}
                >
                    {/* Gold offset border */}
                    <div
                        className="absolute inset-0 border border-accent-gold/60 rounded transition-all duration-300 ease-out"
                        style={{
                            backgroundColor: isHovered ? 'var(--color-accent-gold)' : 'transparent',
                            transform: isHovered
                                ? `translate(${isImageRight ? '16px' : '-16px'}, 16px)`
                                : `translate(${isImageRight ? '12px' : '-12px'}, 12px)`,
                        }}
                    />
                    {/* Image container */}
                    <div
                        className="relative overflow-hidden rounded bg-primary-color/5 cursor-pointer"
                        style={{ aspectRatio: '16 / 10' }}
                        onClick={() => setIsLightboxOpen(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setIsLightboxOpen(true)}
                        aria-label={`View ${name} image in lightbox`}
                    >
                        {/* LQIP placeholder */}
                        <img
                            src={image.lqip}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ imageOrientation: 'from-image' }}
                            aria-hidden="true"
                        />
                        {/* Full resolution image */}
                        <img
                            src={image.src}
                            alt={name}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-out"
                            style={{
                                opacity: isImageLoaded ? 1 : 0,
                                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                imageOrientation: 'from-image',
                            }}
                            onLoad={() => setIsImageLoaded(true)}
                        />
                    </div>
                    <Lightbox
                        isOpen={isLightboxOpen}
                        onClose={() => setIsLightboxOpen(false)}
                        src={image.src}
                        alt={name}
                    />
                </div>

                {/* Text Section - always second on mobile, staggered on desktop */}
                <div
                    className={`w-full md:w-1/2 flex flex-col justify-center text-left ${
                        isImageRight ? 'md:order-1 md:text-left' : 'md:order-2 md:text-right'
                    }`}
                >
                    {/* Title with anchor bullet */}
                    <div
                        className={`flex items-center gap-3 mb-4 flex-row ${
                            isImageRight ? '' : 'md:flex-row-reverse'
                        }`}
                    >
                        <h3 className="font-laluxes text-xl md:text-2xl tracking-wide">
                            {name}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="text-base leading-relaxed font-light opacity-80 mb-4">
                        {description}
                    </p>

                    {/* Learn More link - only shown if link is defined */}
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 text-accent-gold uppercase text-sm tracking-widest font-medium group ${
                                isImageRight ? '' : 'md:justify-end'
                            }`}
                        >
                            {!isImageRight && (
                                <span className="transition-transform duration-200 group-hover:-translate-x-1 hidden md:inline">
                                    &larr;
                                </span>
                            )}
                            <span>Learn More</span>
                            {isImageRight ? (
                                <span className="transition-transform duration-200 group-hover:translate-x-1">
                                    &rarr;
                                </span>
                            ) : (
                                <span className="transition-transform duration-200 group-hover:translate-x-1 md:hidden">
                                    &rarr;
                                </span>
                            )}
                        </a>
                    )}
                </div>
            </article>
        </FadeInOnScroll>
    );
};

export default RecommendationCard;
