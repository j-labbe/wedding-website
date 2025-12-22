import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import FadeInOnScroll from '../components/FadeInOnScroll';
import CastSection from '../components/CastSection';
import type { CastMember, AnimationState } from '../types/cast';
import Jack from '../assets/img/jack.jpeg?lqip';
import Sammy from "../assets/img/IMG_0068.JPG?lqip";
import Morgan from '../assets/img/Morgan.jpg?lqip';
import JGRAY from "../assets/img/10AAE7B2-2471-46E1-B21D-000071BBF24A.JPEG?lqip";
import Casey from "../assets/img/Casey.jpeg?lqip";
import Leo from "../assets/img/IMG_2423.jpg?lqip";
import Luna from "../assets/img/IMG_1131.jpg?lqip";
import Placeholder from '../assets/img/placeholder.png?lqip';

// Cast member data - defined outside component to avoid recreation on each render
const BRIDE_AND_GROOM: CastMember[] = [
    { name: 'Sammy', role: 'The Bride', image: Sammy, funFact: 'I have visited Disney over 10 times!' },
    { name: 'Jack', role: 'The Groom', image: Jack, funFact: 'I have flown a plane! I also built this website.' },
];

const PARENTS: CastMember[] = [
    { name: 'Beth', role: 'Mother of The Bride', image: Placeholder, funFact: 'Add a fun fact about Beth!' },
    { name: 'Tom', role: 'Father of The Bride', image: Placeholder, funFact: 'Add a fun fact about Tom!' },
    { name: 'Brenda', role: 'Mother of The Groom', image: Placeholder, funFact: 'Add a fun fact about Brenda!' },
    { name: 'Paul', role: 'Father of The Groom', image: Placeholder, funFact: 'Add a fun fact about Paul!' },
];

const WEDDING_PARTY: CastMember[] = [
    { name: 'Juliana', role: 'Maid of Honor', image: JGRAY, funFact: 'I\'ve been to 100 concerts!' },
    { name: 'Eve', role: 'Bridesmaid', image: Placeholder, funFact: 'Add a fun fact about Eve!' },
    { name: 'Morgan', role: 'Bridesmaid', image: Morgan, funFact: 'I currently live in the Virgin Islands working as a dolphin trainer!' },
    { name: 'Casey', role: 'Bridesmaid', image: Casey, funFact: 'My favorite animal is a groundhog!' },
    { name: 'Bailey', role: 'Bridesmaid', image: Placeholder, funFact: 'Add a fun fact about Bailey!' },
    { name: 'Sara', role: 'Bridesmaid', image: Placeholder, funFact: 'Add a fun fact about Sara!' },
    { name: 'Peter', role: 'Best Man', image: Placeholder, funFact: 'Add a fun fact about Peter!' },
    { name: 'Ryan', role: 'Groomsman', image: Placeholder, funFact: 'Add a fun fact about Ryan!' },
    { name: 'Chris', role: 'Groomsman', image: Placeholder, funFact: 'Add a fun fact about Chris!' },
    { name: 'Tommy', role: 'Groomsman', image: Placeholder, funFact: 'Add a fun fact about Tommy!' },
    { name: 'Nick', role: 'Groomsman', image: Placeholder, funFact: 'Add a fun fact about Nick!' },
    { name: '???', role: 'Groomsman', image: Placeholder, funFact: 'Add a fun fact about ???!' },
];

const PETS: CastMember[] = [
    { name: 'Luna', role: 'Bun of Honor', image: Luna, funFact: 'I only eat locally grown lettuce!' },
    { name: 'Leo', role: 'Best Bun', image: Leo, funFact: 'I love giving fist bumps!' },
];

const ALL_MEMBERS = [...BRIDE_AND_GROOM, ...PARENTS, ...WEDDING_PARTY, ...PETS];

function TheCast() {
    const [selectedMember, setSelectedMember] = useState<CastMember | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [animationState, setAnimationState] = useState<AnimationState>('idle');
    const [initialRect, setInitialRect] = useState<DOMRect | null>(null);
    const [shouldExpand, setShouldExpand] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);

    // Track scroll to update coin position
    useEffect(() => {
        if (animationState === 'idle') return;

        const initialScroll = window.scrollY;

        const handleScroll = () => {
            setScrollOffset(window.scrollY - initialScroll);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [animationState]);

    // Preload all cast member images to prevent reload on coin expand
    useEffect(() => {
        ALL_MEMBERS.forEach((member) => {
            const img = new Image();
            img.src = member.image.src;
        });
    }, []);

    const handleMemberClick = (member: CastMember, event: React.MouseEvent<HTMLDivElement>) => {
        if (animationState !== 'idle') return; // Prevent clicks during animation

        const rect = event.currentTarget.getBoundingClientRect();
        setInitialRect(rect);
        setSelectedMember(member);
        setIsFlipped(false);
        setShouldExpand(false);
        setScrollOffset(0);
        setAnimationState('expanding');

        // Use double requestAnimationFrame to ensure:
        // 1. First frame: coin renders at original grid position
        // 2. Second frame: trigger expansion + flip animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setShouldExpand(true);
                setIsFlipped(true);
            });
        });
    };

    const handleClose = () => {
        if (animationState === 'collapsing') return;

        setAnimationState('collapsing');
        setShouldExpand(false);
        setIsFlipped(false);
    };

    const handleTransitionEnd = () => {
        if (animationState === 'expanding') {
            setAnimationState('expanded');
        } else if (animationState === 'collapsing') {
            setAnimationState('idle');
            setSelectedMember(null);
            setInitialRect(null);
        }
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <PageTransition>
            <div className="flex justify-center flex-col items-center px-5">
                    <FadeInOnScroll>
                        <h1 className="title md:text-5xl/20 text-4xl/15 mt-5 mb-5">The Cast</h1>
                    </FadeInOnScroll>

                    <div className="flex flex-col items-center max-w-4xl mx-auto my-10 space-y-10">

                    <CastSection
                        members={BRIDE_AND_GROOM}
                        columns={2}
                        selectedMemberName={selectedMember?.name}
                        animationState={animationState}
                        onMemberClick={handleMemberClick}
                    />

                    <CastSection
                        members={PARENTS}
                        columns={4}
                        selectedMemberName={selectedMember?.name}
                        animationState={animationState}
                        onMemberClick={handleMemberClick}
                    />

                    <CastSection
                        members={WEDDING_PARTY}
                        columns={3}
                        selectedMemberName={selectedMember?.name}
                        animationState={animationState}
                        onMemberClick={handleMemberClick}
                    />

                    <CastSection
                        members={PETS}
                        columns={2}
                        selectedMemberName={selectedMember?.name}
                        animationState={animationState}
                        onMemberClick={handleMemberClick}
                    />
                </div>

                {/* Modal with Flip Card */}
                {selectedMember && initialRect && animationState !== 'idle' && (() => {
                    // Calculate animation values
                    // Render at final size and scale DOWN initially (avoids blur from upscaling)
                    const finalSize = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9, 500);
                    const collapsedScale = initialRect.width / finalSize;

                    // Position calculations - element is always finalSize, centered at target point
                    // Adjust for any scrolling that occurred since the coin was clicked
                    const gridCenterX = initialRect.left + initialRect.width / 2;
                    const gridCenterY = initialRect.top + initialRect.height / 2 - scrollOffset;
                    const collapsedLeft = gridCenterX - finalSize / 2;
                    const collapsedTop = gridCenterY - finalSize / 2;
                    const expandedLeft = (window.innerWidth - finalSize) / 2;
                    const expandedTop = (window.innerHeight - finalSize) / 2;

                    const flipRotation = isFlipped ? 180 : 0;

                    return (
                        <>
                            {/* Background overlay */}
                            <div
                                onClick={handleClose}
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    zIndex: 1000,
                                    opacity: shouldExpand ? 1 : 0,
                                    transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                    pointerEvents: shouldExpand ? 'auto' : 'none',
                                }}
                            />
                            {/* Animated Coin */}
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (animationState === 'expanded') {
                                        handleFlip();
                                    }
                                }}
                                onTransitionEnd={handleTransitionEnd}
                                style={{
                                    position: 'fixed',
                                    left: shouldExpand ? expandedLeft : collapsedLeft,
                                    top: shouldExpand ? expandedTop : collapsedTop,
                                    width: finalSize,
                                    height: finalSize,
                                    zIndex: 1001,
                                    cursor: 'pointer',
                                    perspective: '1000px',
                                    padding: 2,
                                    overflow: 'hidden',
                                    transform: shouldExpand ? 'scale(1)' : `scale(${collapsedScale})`,
                                    transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1), top 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        transformStyle: 'preserve-3d',
                                        transform: `rotateY(${flipRotation}deg)`,
                                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    {/* Coin edge - multiple slices for thickness */}
                                    {(() => {
                                        const thickness = 16; // pixels
                                        const slices = 16;
                                        return [...Array(slices)].map((_, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--primary-color)',
                                                    transform: `translateZ(${-thickness / 2 + (thickness * i) / (slices - 1)}px)`,
                                                }}
                                            />
                                        ));
                                    })()}

                                    {/* Front - Image */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            backfaceVisibility: 'hidden',
                                            transform: 'translateZ(8px)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: '6px solid var(--primary-color)',
                                        }}
                                    >
                                        <img
                                            src={selectedMember.image.src}
                                            alt={selectedMember.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>

                                    {/* Back - Fun Fact */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg) translateZ(8px)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#ecf5f7',
                                            borderRadius: '50%',
                                            padding: '10%',
                                            border: '6px solid var(--primary-color)',
                                        }}
                                    >
                                        <h2 className="title text-3xl md:text-4xl mb-4" style={{ color: 'var(--primary-color)' }}>
                                            Fun Fact
                                        </h2>
                                        <p className="text-center text-xl md:text-2xl" style={{ color: 'var(--primary-color)' }}>
                                            {selectedMember.funFact || 'No fun fact available yet!'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })()}
            </div>
        </PageTransition>
    )
}

export default TheCast
