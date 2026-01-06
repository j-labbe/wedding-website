import { useState, useEffect, useCallback } from 'react';
import PageTransition from '../components/PageTransition';
import FadeInOnScroll from '../components/FadeInOnScroll';
import WaveDivider from '../components/WaveDivider';
import QAndAFloatingNav from '../components/QAndAFloatingNav';
import RecommendationCard from '../components/RecommendationCard';
import DecorativeAnchor from '../components/DecorativeAnchor';
import DecorativeDivider from '../components/DecorativeDivider';
import config from '../config';
import type { ExperienceNewportSection } from '../types/PageTypes';


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
