import { useState, useEffect } from 'react'
import PictureFrame from '../components/PictureFrame'
import PageTransition from '../components/PageTransition'
import AnimatedTitle from '../components/AnimatedTitle'

import HeroPhoto from '../assets/img/BGP_4962.jpg?lqip'
import GalleryPhoto1 from '../assets/img/BGP_4855.jpg?lqip'
import GalleryPhoto2 from '../assets/img/BGP_4877.jpg?lqip'
import GalleryPhoto3 from '../assets/img/BGP_4786.jpg?lqip'
import OceanCliffSvg from '../assets/img/OceanCliff.svg?react'

// Module-level flag - resets on page reload, persists during React Router navigation
let hasAnimatedHomeContent = false;

function Home() {
    // Check if animation should run - only on first page load (not on navigation)
    const [shouldAnimate] = useState(() => {
        if (typeof window === 'undefined') return false;
        if (hasAnimatedHomeContent) return false;

        // Mark as animated for this session
        hasAnimatedHomeContent = true;
        return true;
    });

    const [showHero, setShowHero] = useState(!shouldAnimate);
    const [showGallery1, setShowGallery1] = useState(!shouldAnimate);
    const [showGallery2, setShowGallery2] = useState(!shouldAnimate);
    const [showGallery3, setShowGallery3] = useState(!shouldAnimate);
    const [showHeading, setShowHeading] = useState(!shouldAnimate);
    const [showSvg, setShowSvg] = useState(!shouldAnimate);

    useEffect(() => {
        if (shouldAnimate) {
            // Stagger the animations
            const timer1 = setTimeout(() => setShowHero(true), 2000);
            const timer2 = setTimeout(() => setShowGallery1(true), 2300);
            const timer3 = setTimeout(() => setShowGallery2(true), 2400);
            const timer4 = setTimeout(() => setShowGallery3(true), 2500);
            const timer5 = setTimeout(() => setShowHeading(true), 2600);
            const timer6 = setTimeout(() => setShowSvg(true), 2800);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
                clearTimeout(timer4);
                clearTimeout(timer5);
                clearTimeout(timer6);
            };
        }
    }, [shouldAnimate]);

    return (
        <PageTransition>
            <AnimatedTitle
                title="Sammy and Jack"
                subtitle="June 24, 2027"
                location="Newport, RI • OceanCliff Hotel"
            />
            <div
                style={{
                    opacity: showHero ? 1 : 0,
                    transform: showHero ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
            >
                <PictureFrame lqip={HeroPhoto} size="large" alt="Sammy and Jack" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10">
                <div
                    className="flex justify-center"
                    style={{
                        opacity: showGallery1 ? 1 : 0,
                        transform: showGallery1 ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                    }}
                >
                    <PictureFrame
                        lqip={GalleryPhoto1}
                        size="small"
                        alt="Sammy and Jack"
                    />
                </div>
                <div
                    className="flex justify-center"
                    style={{
                        opacity: showGallery2 ? 1 : 0,
                        transform: showGallery2 ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                    }}
                >
                    <PictureFrame
                        lqip={GalleryPhoto2}
                        size="small"
                        alt="Sammy and Jack"
                    />
                </div>
                <div
                    className="flex justify-center"
                    style={{
                        opacity: showGallery3 ? 1 : 0,
                        transform: showGallery3 ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                    }}
                >
                    <PictureFrame
                        lqip={GalleryPhoto3}
                        size="small"
                        alt="Sammy and Jack"
                    />
                </div>
            </div>

            <h1
                className="title text-xl xs:text-2xl sm:text-3xl md:text-4xl mt-20"
                style={{
                    opacity: showHeading ? 1 : 0,
                    transform: showHeading ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
            >
                Welcome to Our Love Story
            </h1>

            <div
                className="flex flex-col md:flex-row items-center justify-center gap-4 mt-5 mb-10 px-5 max-w-4xl mx-auto text-center md:text-left"
                style={{
                    opacity: showSvg ? 1 : 0,
                    transform: showSvg ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
            >
                <OceanCliffSvg className="w-full max-w-full" style={{ color: "#3e4d62" }} />
            </div>
        </PageTransition>
    )
}

export default Home
