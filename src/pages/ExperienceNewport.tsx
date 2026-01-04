import { useState, useEffect, useCallback } from 'react';
import PageTransition from '../components/PageTransition';
import FadeInOnScroll from '../components/FadeInOnScroll';
import WaveDivider from '../components/WaveDivider';
import QAndAFloatingNav from '../components/QAndAFloatingNav';
import RecommendationCard from '../components/RecommendationCard';
import DecorativeAnchor from '../components/DecorativeAnchor';
import DecorativeDivider from '../components/DecorativeDivider';
import Bowens from '../assets/img/22b.jpg?lqip';
import LobsterBar from '../assets/img/npt-lobsterbar.jpg?lqip';
import BrickAlleyPub from '../assets/img/npt-bap.jpg?lqip';
import Midtown from '../assets/img/npt-mo.jpg?lqip';
import ClakeCooke from '../assets/img/clake-cooke.jpg?lqip';
import TheBreakers from '../assets/img/the-breakers.jpg?lqip';
import CliffWalk from '../assets/img/npt-cw.jpg?lqip';
import Thames from '../assets/img/npt-thames.jpg?lqip';
import Sailing from '../assets/img/sailing.jpg?lqip';
import BrentonPoint from '../assets/img/npt-brtn.jpg?lqip';
import Buggy from '../assets/img/buggy.jpeg?lqip';
import { ForkKnifeIcon, SailboatIcon } from '@phosphor-icons/react';

const sectionsData = [
    {
        id: 'eat',
        category: 'Places to Eat',
        navIcon: ForkKnifeIcon,
        items: [
            {
                name: '22 Bowens',
                description: 'Land and sea offerings in the heart of Newport. Sammy and Jack love the prime rib sandwich and chicken salads.',
                image: Bowens,
                link: 'https://22bowens.com'
            },
            {
                name: 'The Lobster Bar',
                description: 'Legendary lobster rolls and fresh seafood. Sammy and Jack visit here every time when in Newport.',
                image: LobsterBar,
                link: 'https://www.lobsterbarri.com'
            },
            {
                name: "Brick Alley Pub",
                description: "The classic pub experience in Newport with a wide menu. Sammy and Jack love the lobster mac and cheese. Great for large groups!",
                image: BrickAlleyPub,
                link: 'https://maps.app.goo.gl/w3KMLffv5eGhsZAEA'
            },
            {
                name: "Midtown Oyster Bar",
                description: "Some of the freshest seafood and oysters in Newport. Lobster rolls are great here, but Oysters are the star of the show!",
                image: Midtown,
                link: 'https://www.midtownoyster.com'
            },
            {
                name: "Clake Cooke House",
                description: "A charming spot with a cozy atmosphere and delicious New England fare. Known for its clam chowder and seafood dishes.",
                image: ClakeCooke,
                link: "https://www.clarkecooke.com"
            }
        ]
    },
    {
        id: 'do',
        category: 'Things to Do',
        navIcon: SailboatIcon,
        items: [
            {
                name: 'Mansion Tours',
                description: 'Take a tour through historic Gilded Age mansions including The Breakers, The Elms, Marble House, and more.',
                image: TheBreakers,
                link: 'https://www.newportmansions.org/plan-a-visit/'
            },
            {
                name: 'Cliff Walk',
                description: 'A scenic walk along Newport\'s stunning coastline, passing by many of the famous mansions.',
                image: CliffWalk,
                link: 'https://sammyandjack.com/files/cliff-walk-map.pdf'
            },
            {
                name: 'Thames Street Shopping',
                description: 'Explore boutiques, galleries, and shops along Newport\'s main street.',
                image: Thames,
                link: undefined // hide link btn
            },
            {
                name: 'Sailing & Harbor Tours',
                description: 'Experience Newport\'s sailing heritage with a harbor tour or sailing excursion on Narragansett Bay. (Note: book in advance!)',
                image: Sailing,
                link: 'https://sightsailing.com'
            },
            {
                name: 'Brenton Point State Park',
                description: 'Enjoy stunning ocean views, picnicking, and kite flying at this beautiful state park located on the western tip of Newport. Food trucks are often visiting on weekends!',
                image: BrentonPoint,
                link: 'https://riparks.ri.gov/parks/brenton-point-state-park'
            },
            {
                name: 'Rent a Beach Buggy',
                description: 'Explore Newport in a fun and thrilling mini beach buggy!',
                image: Buggy,
                link: 'https://scooterworldri.com'
            }
        ]
    }
];

function ExperienceNewport() {
    const [activeSection, setActiveSection] = useState('eat');

    const handleScroll = useCallback(() => {
        const sections = sectionsData.map(s => ({
            id: s.id,
            offset: document.getElementById(s.id)?.offsetTop || 0
        }));

        const scrollPos = window.scrollY + 200;

        for (let i = sections.length - 1; i >= 0; i--) {
            if (scrollPos >= sections[i].offset) {
                setActiveSection(sections[i].id);
                break;
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <PageTransition>
            <div className="flex justify-center flex-col items-center">
                {/* Floating Navigation */}
                <QAndAFloatingNav
                    sections={sectionsData.map(s => ({ id: s.id, category: s.category, icon: s.navIcon }))}
                    activeSection={activeSection}
                    onNavigate={scrollToSection}
                />

                {/* Header */}
                <header className="pt-8 pb-8 px-6 text-center w-full">
                    <FadeInOnScroll className="max-w-3xl mx-auto">
                        <h1 className="title md:text-5xl/20 text-4xl/15 mb-4">Experience Newport</h1>
                    </FadeInOnScroll>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-6 pb-8 w-full">
                    {sectionsData.map((section, sectionIndex) => (
                        <section key={section.id} id={section.id} className="scroll-mt-8">
                            {sectionIndex > 0 && <WaveDivider />}

                            {/* Section Header */}
                            <FadeInOnScroll className="mb-12 text-center">
                                <h2 className="font-laluxes text-2xl md:text-3xl tracking-wide">
                                    {section.category}
                                </h2>
                                <div className="mt-3 mx-auto w-12 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
                            </FadeInOnScroll>

                            {/* Items */}
                            <div className="space-y-16">
                                {section.items.map((item, itemIndex) => (
                                    <RecommendationCard
                                        key={itemIndex}
                                        name={item.name}
                                        description={item.description}
                                        image={item.image}
                                        link={item.link}
                                        index={itemIndex}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Footer decoration */}
                    <FadeInOnScroll className="mt-20 text-center">
                        <DecorativeDivider>
                            <DecorativeAnchor />
                        </DecorativeDivider>
                    </FadeInOnScroll>

                    <br />
                </main>
            </div>
        </PageTransition>
    );
}

export default ExperienceNewport;
