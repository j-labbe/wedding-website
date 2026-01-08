import { useState, useEffect, useCallback } from 'react';
import PageTransition from '../components/PageTransition';
import FadeInOnScroll from '../components/FadeInOnScroll';
import WaveDivider from '../components/WaveDivider';
import AnchorBullet from '../components/AnchorBullet';
import QAndAFloatingNav from '../components/QAndAFloatingNav';
import DecorativeAnchor from '../components/DecorativeAnchor';
import DecorativeDivider from '../components/DecorativeDivider';
import config from '../config';
import type { QAndASection } from '../types/PageTypes';

// Simple markdown link parser - converts [text](url) to clickable links
function parseMarkdownLinks(text: string): React.ReactNode {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
        // Add text before the link
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        // Add the link
        parts.push(
            <a
                key={match.index}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-70 transition-opacity"
            >
                {match[1]}
            </a>
        );
        lastIndex = match.index + match[0].length;
    }

    // Add remaining text after the last link
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
}

function QAndA() {
    const [activeSection, setActiveSection] = useState('ceremony');

    const page = config.pages.find(p => p.id === "q-and-a");
    const faqData = page?.content as QAndASection[] || [];

    const handleScroll = useCallback(() => {
        const sections = faqData.map(s => ({
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
            <article>
                <title>Q & A - Sammy and Jack</title>
            </article>
            <div className="flex justify-center flex-col items-center">
                {/* Floating Navigation */}
                <QAndAFloatingNav
                    sections={faqData.map(s => ({ id: s.id, category: s.category, icon: s.navIcon }))}
                    activeSection={activeSection}
                    onNavigate={scrollToSection}
                />

                {/* Main Content */}
                <main className="max-w-2xl mx-auto px-6 pb-8 w-full text-left">
                    {faqData.map((section, sectionIndex) => (
                        <section key={section.id} id={section.id} className="scroll-mt-8">
                            {sectionIndex > 0 && <WaveDivider />}

                            {/* Section Header */}
                            <FadeInOnScroll className="mb-10 text-center">
                                <h2 className="font-laluxes text-2xl md:text-3xl tracking-wide">
                                    {section.category}
                                </h2>
                                <div className="mt-3 mx-auto w-12 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
                            </FadeInOnScroll>

                            {/* Questions */}
                            <div className="space-y-10">
                                {section.questions.map((item, qIndex) => (
                                    <FadeInOnScroll
                                        key={qIndex}
                                        delay={qIndex * 100}
                                    >
                                        <article className="group">
                                            <div className="flex items-start">
                                                <AnchorBullet />
                                                <div className="flex-1">
                                                    <h3 className="font-laluxes-noligatures text-lg md:text-xl mb-3 leading-relaxed">
                                                        {item.q}
                                                    </h3>
                                                    <p className="text-base leading-relaxed font-light opacity-80">
                                                        {parseMarkdownLinks(item.a)}
                                                    </p>
                                                </div>
                                            </div>
                                        </article>
                                    </FadeInOnScroll>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Footer decoration */}
                    <FadeInOnScroll className="mt-20 text-center">
                        <DecorativeDivider className="mt-6">
                            <DecorativeAnchor />
                        </DecorativeDivider>
                    </FadeInOnScroll>

                    <br />
                </main>
            </div>
        </PageTransition>
    );
}

export default QAndA;
