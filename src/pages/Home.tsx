import PictureFrame from '../components/PictureFrame'
import PageTransition from '../components/PageTransition'
import AnimatedTitle from '../components/AnimatedTitle'

import HeroPhoto from '../assets/img/BGP_4962.jpg?lqip'
import GalleryPhoto1 from '../assets/img/BGP_4855.jpg?lqip'
import GalleryPhoto2 from '../assets/img/BGP_4877.jpg?lqip'
import GalleryPhoto3 from '../assets/img/BGP_4786.jpg?lqip'
import OceanCliffSvg from '../assets/img/OceanCliff.svg?react'

function Home() {
    return (
        <PageTransition>
            <AnimatedTitle
                title="Sammy and Jack"
                subtitle="June 24, 2027"
                location="Newport, RI • OceanCliff Hotel"
            />
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

            <h1 className="title text-xl xs:text-2xl sm:text-3xl md:text-4xl mt-20">Welcome to Our Love Story</h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-5 mb-10 px-5 max-w-4xl mx-auto text-center md:text-left">
                <OceanCliffSvg className="w-full max-w-full" style={{ color: "#3e4d62" }} />
            </div>
        </PageTransition>
    )
}

export default Home
