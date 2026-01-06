import PictureFrame from '../components/PictureFrame'
import PageTransition from '../components/PageTransition'

import HeroPhoto from '../assets/img/BGP_4962.jpg?lqip'
import GalleryPhoto1 from '../assets/img/BGP_4855.jpg?lqip'
import GalleryPhoto2 from '../assets/img/BGP_4877.jpg?lqip'
import GalleryPhoto3 from '../assets/img/BGP_4786.jpg?lqip'
import OceanCliffSvg from '../assets/img/OceanCliff.svg?react'

function Home() {
    return (
        <PageTransition>
            {/* Subtitle and location - title is now handled by StickyHeader */}
            <div className="text-center mb-8">
                <h2 className="subtitle font-laluxes text-xl md:text-2xl mt-2">June 24, 2027</h2>
                <div className="flex flex-wrap items-center justify-center mt-3 gap-x-3 gap-y-2">
                    <h2 className="subtitle font-laluxes text-xl md:text-2xl whitespace-nowrap">
                        Newport, RI
                    </h2>
                    <span className="subtitle font-laluxes-noligatures text-xl md:text-2xl hidden xs:inline-block">•</span>
                    <h2 className="subtitle font-laluxes-noligatures text-xl md:text-2xl">
                        OceanCliff Hotel
                    </h2>
                </div>
            </div>

            <PictureFrame lqip={HeroPhoto} size="large" alt="Sammy and Jack" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10">
                <div className="flex justify-center">
                    <PictureFrame
                        lqip={GalleryPhoto1}
                        size="small"
                        alt="Sammy and Jack"
                    />
                </div>
                <div className="flex justify-center">
                    <PictureFrame
                        lqip={GalleryPhoto2}
                        size="small"
                        alt="Sammy and Jack"
                    />
                </div>
                <div className="flex justify-center">
                    <PictureFrame
                        lqip={GalleryPhoto3}
                        size="small"
                        alt="Sammy and Jack"
                    />
                </div>
            </div>

            <h1 className="title text-xl xs:text-2xl sm:text-3xl md:text-4xl mt-20">
                Welcome to Our Love Story
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-5 mb-10 px-5 max-w-4xl mx-auto text-center md:text-left">
                <OceanCliffSvg className="w-full max-w-full" style={{ color: "#3e4d62" }} />
            </div>
        </PageTransition>
    )
}

export default Home
