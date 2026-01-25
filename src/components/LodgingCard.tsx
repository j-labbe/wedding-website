import { useState } from 'react';
import FadeInOnScroll from './FadeInOnScroll';
import Lightbox from './Lightbox';
import { MapPinIcon } from '@phosphor-icons/react';
import type { LodgingSection } from '../types/PageTypes';

interface LodgingCardProps {
    hotel: LodgingSection['hotels'][number];
}

function LodgingCard({ hotel }: LodgingCardProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    return (
        <FadeInOnScroll className="h-full">
            <div className="bg-primary-color/[0.01] rounded-lg overflow-hidden border border-accent-gold/20 hover:border-accent-gold/40 transition-all duration-300 h-full flex flex-col">
                {/* Hotel Image */}
                {hotel.image && (
                    <>
                        <div
                            className="relative w-full cursor-pointer"
                            style={{ aspectRatio: '16 / 10' }}
                            onClick={() => setIsLightboxOpen(true)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setIsLightboxOpen(true)}
                            aria-label={`View ${hotel.name} image in lightbox`}
                        >
                            <img
                                src={hotel.image.lqip}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover"
                                aria-hidden="true"
                            />
                            <img
                                src={hotel.image.src}
                                alt={hotel.name}
                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                                style={{ opacity: isImageLoaded ? 1 : 0 }}
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        </div>
                        <Lightbox
                            isOpen={isLightboxOpen}
                            onClose={() => setIsLightboxOpen(false)}
                            src={hotel.image.src}
                            alt={hotel.name}
                        />
                    </>
                )}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Group 1: Name, Price, Description */}
                    <div className="flex-grow">
                        <div className="text-center mb-2">
                            <h4 className="font-laluxes text-xl tracking-wide">{hotel.name}</h4>
                            <span className="text-accent-gold font-medium">{hotel.price}</span>
                        </div>
                        {hotel.description && (
                            <p className="text-base italic opacity-70 text-center">{hotel.description}</p>
                        )}
                    </div>
                    
                    {/* Group 2: Address, Website */}
                    <div className="pt-4 mt-4 border-t border-accent-gold/10 text-center">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 opacity-60 hover:opacity-100 text-base mb-3 transition-opacity"
                        >
                            <MapPinIcon size={18} className="text-accent-gold flex-shrink-0" />
                            <span>{hotel.address}</span>
                        </a>
                        <a
                            href={hotel.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent-gold uppercase text-sm tracking-widest font-medium group"
                        >
                            <span>Visit Website</span>
                            <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        </FadeInOnScroll>
    );
}

export default LodgingCard;
