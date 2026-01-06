import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import PairedRow from '../components/PairedRow';
import TutorialHint from '../components/TutorialHint';
import { shouldShowTutorial, markTutorialSeen } from '../utils/tutorialStorage';
import type { CastMember, PairedMembers, AnimationState } from '../types/cast';
import config from '../config';

function TheCast() {
    const [selectedMember, setSelectedMember] = useState<CastMember | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [animationState, setAnimationState] = useState<AnimationState>('idle');
    const [initialRect, setInitialRect] = useState<DOMRect | null>(null);
    const [shouldExpand, setShouldExpand] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [showTutorial, setShowTutorial] = useState(false);

    const castPage = config.pages.find(p => p.id === 'the-cast');
    const castMembers = castPage && castPage.name === 'The Cast' ? castPage.content.members : [];
    
    const ALL_MEMBERS: CastMember[] = castMembers.flatMap(pair => [pair.left, pair.right]);
    
    const BRIDE_AND_GROOM: PairedMembers[] = castMembers.filter(m => m.role === 'The Couple');
    const PARENTS: PairedMembers[] = castMembers.filter(m => m.role === 'The Parents');
    const WEDDING_PARTY: PairedMembers[] = castMembers.filter(m => m.role === 'Bridal Party & Groomsmen');
    const PETS: PairedMembers[] = castMembers.filter(m => m.role === 'Pets');

    useEffect(() => {
        if (shouldShowTutorial()) {
            //eslint-disable-next-line
            setShowTutorial(true);
        }
    }, []);

    const dismissTutorial = () => {
        setShowTutorial(false);
        markTutorialSeen();
    };

    useEffect(() => {
        if (animationState === 'idle') return;

        const initialScroll = window.scrollY;

        const handleScroll = () => {
            setScrollOffset(window.scrollY - initialScroll);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [animationState]);

    useEffect(() => {
        ALL_MEMBERS.forEach((member) => {
            const img = new Image();
            img.src = member.image.src;
        });
    }, [ALL_MEMBERS]);

    const handleMemberClick = (member: CastMember, event: React.MouseEvent<HTMLDivElement>) => {
        if (animationState !== 'idle') return;

        if (showTutorial) {
            dismissTutorial();
        }

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
                    <div className="flex flex-col items-center max-w-4xl mx-auto mt-5 space-y-6">
                        {/* Bride & Groom */}
                        {BRIDE_AND_GROOM.map((pair, index) => (
                            <PairedRow
                                key={`bride-groom-${index}`}
                                left={pair.left}
                                right={pair.right}
                                selectedMemberName={selectedMember?.name}
                                animationState={animationState}
                                onMemberClick={handleMemberClick}
                                leftOverlay={index === 0 ? <TutorialHint visible={showTutorial} /> : undefined}
                            />
                        ))}

                        {/* Parents */}
                        {PARENTS.map((pair, index) => (
                            <PairedRow
                                key={`parents-${index}`}
                                left={pair.left}
                                right={pair.right}
                                selectedMemberName={selectedMember?.name}
                                animationState={animationState}
                                onMemberClick={handleMemberClick}
                            />
                        ))}

                        {/* Wedding Party */}
                        {WEDDING_PARTY.map((pair, index) => (
                            <PairedRow
                                key={`wedding-party-${index}`}
                                left={pair.left}
                                right={pair.right}
                                selectedMemberName={selectedMember?.name}
                                animationState={animationState}
                                onMemberClick={handleMemberClick}
                            />
                        ))}

                        {/* Pets */}
                        {PETS.map((pair, index) => (
                            <PairedRow
                                key={`pets-${index}`}
                                left={pair.left}
                                right={pair.right}
                                selectedMemberName={selectedMember?.name}
                                animationState={animationState}
                                onMemberClick={handleMemberClick}
                            />
                        ))}
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
                    const COIN_THICKNESS = 16;
                    const COIN_SLICES = 16;

                    return (
                        <>
                            {/* Background overlay */}
                            <div
                                onClick={handleClose}
                                className="fixed inset-0 bg-black/80 z-[1000] transition-opacity duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
                                style={{
                                    opacity: shouldExpand ? 1 : 0,
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
                                className="fixed z-[1001] cursor-pointer overflow-hidden p-1 rounded-full bg-transparent"
                                style={{
                                    left: shouldExpand ? expandedLeft : collapsedLeft,
                                    top: shouldExpand ? expandedTop : collapsedTop,
                                    width: finalSize,
                                    height: finalSize,
                                    perspective: '1000px',
                                    transform: shouldExpand ? 'scale(1)' : `scale(${collapsedScale})`,
                                    transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1), top 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            >
                                <div
                                    className="relative w-full h-full"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        transform: `rotateY(${flipRotation}deg)`,
                                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    {/* Coin edge - multiple slices for thickness */}
                                    {[...Array(COIN_SLICES)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-full h-full rounded-full bg-primary"
                                            style={{
                                                transform: `translateZ(${-COIN_THICKNESS / 2 + (COIN_THICKNESS * i) / (COIN_SLICES - 1)}px)`,
                                            }}
                                        />
                                    ))}

                                    {/* Front - Image */}
                                    <div
                                        className="absolute w-full h-full flex flex-col items-center justify-center bg-white rounded-full overflow-hidden border-9 md:border-10"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            transform: 'translateZ(8px)',
                                        }}
                                    >
                                        <img
                                            src={selectedMember.image.src}
                                            alt={selectedMember.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Back - Fun Fact */}
                                    <div
                                        className="absolute w-full h-full flex flex-col items-center justify-center bg-[#ecf5f7] rounded-full p-[10%] border-7 md:border-8"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg) translateZ(8px)',
                                        }}
                                    >
                                        <h2 className="title text-3xl md:text-4xl mb-10 text-primary">
                                            Fun Fact
                                        </h2>
                                        <p className="text-center text-xl md:text-2xl text-primary">
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
