import { useState, useEffect, useCallback } from 'react';
import PageTransition from '../components/PageTransition';
import FadeInOnScroll from '../components/FadeInOnScroll';
import WaveDivider from '../components/WaveDivider';
import QAndAFloatingNav from '../components/QAndAFloatingNav';
import RecommendationCard from '../components/RecommendationCard';
import DecorativeAnchor from '../components/DecorativeAnchor';
import DecorativeDivider from '../components/DecorativeDivider';
import LodgingSectionContent from '../components/LodgingSectionContent';
import config from '../config';
import type { ExperienceNewportSection } from '../types/PageTypes';
import { parseMarkdownBold } from '../utils/parseMarkdown';


function ExperienceNewport() {
    const [activeSection, setActiveSection] = useState('eat');

    const page = config.pages.find(p => p.id === "experience-newport");
    const sectionsData = page?.content as ExperienceNewportSection[] || [];

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
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Handle initial hash navigation on page load
    useEffect(() => {
        const hash = window.location.hash.slice(1); // Remove the '#'
        if (hash) {
            // Delay to ensure DOM is fully rendered and page animations complete
            const timeoutId = setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    const headerOffset = 100; // Account for sticky header + some padding
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    setActiveSection(hash);
                }
            }, 500); // Wait for page transition animation to complete
            return () => clearTimeout(timeoutId);
        }
    }, []);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <PageTransition>
            <article>
                <title>Experience Newport - Sammy and Jack</title>
            </article>
            <div className="flex justify-center flex-col items-center">
                {/* Floating Navigation */}
                <QAndAFloatingNav
                    sections={sectionsData.map(s => ({ id: s.id, category: s.category, icon: s.navIcon }))}
                    activeSection={activeSection}
                    onNavigate={scrollToSection}
                />

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
                                {section.lodgingDescription && (
                                    <p className="mt-4 text-base max-w-2xl mx-auto opacity-70">
                                        {parseMarkdownBold(section.lodgingDescription)}
                                    </p>
                                )}
                            </FadeInOnScroll>

                            {/* Items - for eat/do sections */}
                            {section.items && (
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
                            )}

                            {/* Lodging - for stay section */}
                            {section.lodging && (
                                <div className="space-y-8">
                                    {section.lodging.map((lodgingSection, lodgingIndex) => (
                                        <LodgingSectionContent
                                            key={lodgingIndex}
                                            section={lodgingSection}
                                        />
                                    ))}
                                </div>
                            )}
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
