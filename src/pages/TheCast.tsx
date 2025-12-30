import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import FadeInOnScroll from '../components/FadeInOnScroll';
import PairedRow from '../components/PairedRow';
import TutorialHint from '../components/TutorialHint';
import { shouldShowTutorial, markTutorialSeen } from '../utils/tutorialStorage';
import type { CastMember, PairedMembers, AnimationState } from '../types/cast';
import Jack from '../assets/img/jack.jpeg?lqip';
import Sammy from "../assets/img/IMG_0068.JPG?lqip";
import Paul from "../assets/img/paul.JPG?lqip";
import Brenda from '../assets/img/brenda.JPG?lqip';
import Tom from '../assets/img/tom.jpg?lqip';
import Beth from '../assets/img/beth.jpg?lqip';
import Morgan from '../assets/img/Morgan.jpg?lqip';
import JGRAY from "../assets/img/10AAE7B2-2471-46E1-B21D-000071BBF24A.JPEG?lqip";
import Casey from "../assets/img/casey_pic.jpeg?lqip";
import Eve from "../assets/img/IMG_6051.jpg?lqip";
import Tommy from "../assets/img/tommy.PNG?lqip";
import Nick from "../assets/img/IMG_2972.jpeg?lqip";
import Bailey from "../assets/img/bailey.PNG?lqip";
import Sara from "../assets/img/sara.JPG?lqip";
import Leo from "../assets/img/IMG_2423.jpg?lqip";
import Luna from "../assets/img/IMG_1131.jpg?lqip";
import Placeholder from '../assets/img/placeholder.png?lqip';

// Individual cast members
const SAMMY: CastMember = { name: 'Sammy', role: 'The Bride', image: Sammy, funFact: 'Jack first met my Mom in palm tree swimtrunks in the middle of the winter! (He claims he had no clean laundry!)' };
const JACK: CastMember = { name: 'Jack', role: 'The Groom', image: Jack, funFact: 'Sammy had her first drink in my freshman dorm room, a raspberry White Claw! (She called it a "raincloud in her head")' };
const BETH: CastMember = { name: 'Beth', role: 'Mother of The Bride', image: Beth, funFact: 'I applied to Survivor and dream of being casted one day!' };
const TOM: CastMember = { name: 'Tom', role: 'Father of The Bride', image: Tom, funFact: 'Add a fun fact about Tom!' };
const BRENDA: CastMember = { name: 'Brenda', role: 'Mother of The Groom', image: Brenda, funFact: 'Add a fun fact about Brenda!' };
const PAUL: CastMember = { name: 'Paul', role: 'Father of The Groom', image: Paul, funFact: 'Grillmaster.' };
const JULIANA: CastMember = { name: 'Juliana', role: 'Maid of Honor', image: JGRAY, funFact: 'I\'ve been to 100 concerts! (Some of which I organized at Penn State!)' };
const EVE: CastMember = { name: 'Eve', role: 'Bridesmaid', image: Eve, funFact: 'I conquered the Philly Half Marathon!' };
const MORGAN: CastMember = { name: 'Morgan', role: 'Bridesmaid', image: Morgan, funFact: 'I currently live in the Virgin Islands working as a dolphin trainer!' };
const CASEY: CastMember = { name: 'Casey', role: 'Bridesmaid', image: Casey, funFact: 'My favorite animal is a groundhog! I even went to Punxsutawney once to celebrate Groundhog Day!' };
const BAILEY: CastMember = { name: 'Bailey', role: 'Bridesmaid', image: Bailey, funFact: 'Add a fun fact about Bailey!' };
const SARA: CastMember = { name: 'Sara', role: 'Bridesmaid', image: Sara, funFact: 'Add a fun fact about Sara!' };
const PETER: CastMember = { name: 'Peter', role: 'Best Man', image: Placeholder, funFact: 'Add a fun fact about Peter!' };
const RYAN: CastMember = { name: 'Ryan', role: 'Groomsman', image: Placeholder, funFact: 'Add a fun fact about Ryan!' };
const CHRIS: CastMember = { name: 'Chris', role: 'Groomsman', image: Placeholder, funFact: 'Add a fun fact about Chris!' };
const TOMMY: CastMember = { name: 'Tommy', role: 'Groomsman', image: Tommy, funFact: 'Add a fun fact about Tommy!' };
const NICK: CastMember = { name: 'Nick', role: 'Groomsman', image: Nick, funFact: 'I\'m a triplet with my two other brothers, Ryan and Andrew!' };
const MYSTERY: CastMember = { name: 'Mystery', role: 'Groomsman', image: Placeholder, funFact: 'Add a fun fact about ???!' };
const LUNA: CastMember = { name: 'Luna', role: 'Bun of Honor', image: Luna, funFact: 'I only eat locally grown lettuce!' };
const LEO: CastMember = { name: 'Leo', role: 'Best Bun', image: Leo, funFact: 'I love giving fist bumps!' };

const BRIDE_AND_GROOM: PairedMembers[] = [
    { left: SAMMY, right: JACK },
];

const PARENTS: PairedMembers[] = [
    { left: BETH, right: TOM },
    { left: BRENDA, right: PAUL },
];

const WEDDING_PARTY: PairedMembers[] = [
    { left: JULIANA, right: PETER },
    { left: EVE, right: RYAN },
    { left: MORGAN, right: CHRIS },
    { left: CASEY, right: NICK },
    { left: BAILEY, right: TOMMY },
    { left: SARA, right: MYSTERY },
];

const PETS: PairedMembers[] = [
    { left: LUNA, right: LEO },
];

const ALL_MEMBERS = [SAMMY, JACK, BETH, TOM, BRENDA, PAUL, JULIANA, EVE, MORGAN, CASEY, BAILEY, SARA, PETER, RYAN, CHRIS, TOMMY, NICK, MYSTERY, LUNA, LEO];

function TheCast() {
    const [selectedMember, setSelectedMember] = useState<CastMember | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [animationState, setAnimationState] = useState<AnimationState>('idle');
    const [initialRect, setInitialRect] = useState<DOMRect | null>(null);
    const [shouldExpand, setShouldExpand] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [showTutorial, setShowTutorial] = useState(false);

    useEffect(() => {
        if (shouldShowTutorial()) {
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
    }, []);

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
                    <FadeInOnScroll>
                        <h1 className="title md:text-5xl/20 text-4xl/15 mt-5 mb-5">The Cast</h1>
                    </FadeInOnScroll>

                    <div className="flex flex-col items-center max-w-4xl mx-auto my-10 space-y-6">
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
