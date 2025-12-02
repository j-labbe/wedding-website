import { useState } from 'react'
// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Menu from './components/Menu/Menu'
import PictureFrame from './components/PictureFrame'
import ContactModal from './components/ContactModal'
import CookieBanner from './components/CookieBanner'
import { recordEvent, ANALYTICS_EVENTS } from './utils/analytics'

import HeroPhoto from './assets/img/BGP_4962.jpg?lqip'
import GalleryPhoto1 from './assets/img/BGP_4855.jpg?lqip'
import GalleryPhoto2 from './assets/img/BGP_4877.jpg?lqip'
import GalleryPhoto3 from './assets/img/BGP_4786.jpg?lqip'
// import OceanCliffSvg from './assets/img/OceanCliff.svg'

function App() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)

    const handleModalOpen = () => {
        recordEvent(ANALYTICS_EVENTS.CONTACT_MODAL_OPENED, {
            source: 'footer',
        })
        setIsContactModalOpen(true)
    }

    return (
        <>
            <Menu />

            {/* <h1 className="font-littlelove text-7xl">Sammy and Jack</h1>
            <h2 className="subtitle font-laluxes text-2xl mt-12">
                June 24, 2027
            </h2> */}

            <h1 className="title text-5xl">Sammy and Jack</h1>
            <h2 className="subtitle font-laluxes text-2xl mt-10">
                June 24, 2027
            </h2>



            <div className="flex flex-row items-center justify-center mt-3">
                <h2 className="subtitle font-laluxes text-2xl mt-3 mb-10">
                    Newport, RI •
                </h2>
                <h2 className="subtitle font-laluxes-noligatures text-2xl mt-3 ml-2 mb-10">
                    OceanCliff Hotel
                </h2>
            </div>
            <PictureFrame lqip={HeroPhoto} size="large" alt="Sammy and Jack" />

            <div className="flex flex-row justify-evenly space-between w-full mt-10">
                <PictureFrame
                    lqip={GalleryPhoto1}
                    size="small"
                    alt="Sammy and Jack"
                />
                <PictureFrame
                    lqip={GalleryPhoto2}
                    size="small"
                    alt="Sammy and Jack"
                />
                <PictureFrame
                    lqip={GalleryPhoto3}
                    size="small"
                    alt="Sammy and Jack"
                />
            </div>

            <h1 className="title text-4xl mt-20">Welcome to Our Love Story</h1>

            {/* <OceanCliffSvg /> */}

            <footer className="w-full py-8 flex flex-col items-center justify-center mt-20 text-primary-color border-t border-primary-color/20">
                <div className="flex gap-4 mb-3 text-sm">
                    <a href="/terms.txt" target="_blank" className="hover:underline cursor-pointer">
                        Terms & Conditions
                    </a>
                    <span>•</span>
                    <a href="/privacy-policy.txt" target="_blank" className="hover:underline cursor-pointer">
                        Privacy Policy
                    </a>
                    <span>•</span>
                    <button
                        onClick={handleModalOpen}
                        className="hover:underline cursor-pointer"
                    >
                        Contact Us
                    </button>
                </div>
                <p className="font-sackers text-sm">
                    &copy; {new Date().getFullYear()} Jack Labbe & Samantha Balkir
                </p>
                <button
                        onClick={handleModalOpen}
                        className="opacity-50 mt-3 hover:underline cursor-pointer"
                    >
                        Love this site? Feel free to reach out!
                    </button>
            </footer>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />

            <CookieBanner />
        </>
    )
}

export default App
