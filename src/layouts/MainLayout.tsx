import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ContactModal from '../components/ContactModal'
import { recordEvent, ANALYTICS_EVENTS } from '../utils/analytics'

function MainLayout() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)

    const handleModalOpen = () => {
        recordEvent(ANALYTICS_EVENTS.CONTACT_MODAL_OPENED, {
            source: 'footer',
        })
        setIsContactModalOpen(true)
    }

    return (
        <>
            <Outlet />

            <footer className="w-full py-8 flex flex-col items-center justify-center mt-20 text-primary-color border-t border-primary-color/20">
                <div className="flex gap-4 mb-3 text-sm">
                    <a href="/terms.txt" target="_blank" className="hover:underline cursor-pointer">
                        Terms
                    </a>
                    <span>•</span>
                    <a href="/privacy-policy.txt" target="_blank" className="hover:underline cursor-pointer">
                        Privacy
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
        </>
    )
}

export default MainLayout
