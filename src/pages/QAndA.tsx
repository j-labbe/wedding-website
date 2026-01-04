import { useState, useEffect, useCallback } from 'react';
import PageTransition from '../components/PageTransition';
import FadeInOnScroll from '../components/FadeInOnScroll';
import WaveDivider from '../components/WaveDivider';
import AnchorBullet from '../components/AnchorBullet';
import QAndAFloatingNav from '../components/QAndAFloatingNav';
import DecorativeAnchor from '../components/DecorativeAnchor';
import DecorativeDivider from '../components/DecorativeDivider';
import { ChurchIcon, BedIcon, ShirtFoldedIcon, GiftIcon } from "@phosphor-icons/react";

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

const faqData = [
    {
        id: 'ceremony-reception',
        category: 'Ceremony & Reception',
        navIcon: ChurchIcon,
        questions: [
            {
                q: 'What time should I arrive?',
                a: 'Please arrive 15-20 minutes before the ceremony begins to get seated.'
            },
            {
                q: 'Will the ceremony be indoors or outdoors?',
                a: 'The ceremony will be outdoors (weather permitting) with the reception indoors.'
            },
            {
                q: 'Can I take photos during the ceremony?',
                a: 'We kindly request an unplugged ceremony. Phones and cameras away until the celebration begins!'
            },
            {
                q: 'Will there be parking on-site?',
                a: 'Yes, there is complimentary parking available at the venue.'
            },
            {
                q: 'Can I bring a plus-one?',
                a: 'If your invitation includes a guest, it will say "and guest." Otherwise, we are unable to accommodate additional guests.'
            },
            {
                q: 'Are kids invited?',
                a: 'We love your little ones, but our wedding will be adults-only.'
            },
            {
                q: 'Will there be an open bar?',
                a: 'Yes! Beer, wine, and cocktails will be provided.'
            },
            {
                q: 'What if I have dietary restrictions?',
                a: 'Please include any dietary needs when you RSVP, we will happily accommodate.'
            }
        ]
    },
    {
        id: 'lodging',
        category: 'Travel & Lodging',
        navIcon: BedIcon,
        questions: [
            {
                q: 'Are there hotel blocks?',
                a: 'Yes! Details to be shared soon.'
            },
            {
                q: 'What airports are closest?',
                a: 'The closest airports are Providence - TF Green (PVD) and Boston - Logan (BOS).'
            },
            {
                q: 'Will transportation be provided?',
                a: 'A shuttle will run between the hotel block and the venue before and after the event. Times will be added closer to the date. If you are driving separately, the OceanCliff address is [65 Ridge Rd, Newport, RI 02840](https://www.google.com/maps?q=65+Ridge+Rd,+Newport,+RI+02840).'
            }
        ]
    },
    {
        id: 'attire',
        category: 'Attire',
        navIcon: ShirtFoldedIcon,
        questions: [
            {
                q: 'What should I wear?',
                a: 'For the ladies, formal black-tie attire, long gowns, or elegant evening dresses are perfect. For the gents, black-tie optional, a tux or dark suit with a tie.'
            },
            {
                q: "What's the dress code for the welcome event?",
                a: 'Resort casual. Think sundresses, blouses, or polos with shorts or slacks.'
            },
            {
                q: 'What will the weather be like?',
                a: 'Late June in Newport is typically warm and breezy, especially by the water.'
            }
        ]
    },
    {
        id: "gifts",
        category: "Gifts & Registry",
        navIcon: GiftIcon,
        questions: [
            {
                q: 'Where are you registered?',
                a: "Your presence is truly the best gift. If you'd like to browse our registry, it's linked [here](https://www.theknot.com/us/samantha-balkir-and-jack-labbe-2027-06-24/registry)."
            }
        ]
    }
];

function QAndA() {
    const [activeSection, setActiveSection] = useState('ceremony');

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
                    sections={faqData.map(s => ({ id: s.id, category: s.category, icon: s.navIcon }))}
                    activeSection={activeSection}
                    onNavigate={scrollToSection}
                />

                {/* Header */}
                <header className="pt-8 pb-8 px-6 text-center w-full">
                    <FadeInOnScroll className="max-w-3xl mx-auto">
                        <h1 className="title md:text-5xl/20 text-4xl/15 mb-4">Questions & Answers</h1>
                    </FadeInOnScroll>
                </header>

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
