import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { MenuProvider } from './contexts/MenuContext'
import Menu from './components/Menu/Menu'
import StickyHeader from './components/StickyHeader'
import ScrollToTop from './components/ScrollToTop'
import CookieBanner from './components/CookieBanner'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import TheCast from './pages/TheCast'
import TheEvent from './pages/TheEvent'
import ExperienceNewport from './pages/ExperienceNewport'
import QAndA from './pages/QAndA'
import RSVP from './pages/RSVP'
import getRSVPFlag from './utils/api/rsvpFlag';
import { Toaster, toast } from 'sonner';
import { useFeatureFlagStore } from './contexts/FeatureFlagStore'

function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/our-story" element={<OurStory />} />
                    <Route path="/the-cast" element={<TheCast />} />
                    <Route path="/the-event" element={<TheEvent />} />
                    <Route path="/experience-newport" element={<ExperienceNewport />} />
                    <Route path="/q-and-a" element={<QAndA />} />
                </Route>
                <Route path="/rsvp" element={<RSVP />} />
            </Routes>
        </AnimatePresence>
    )
}

function App() {
    const { rsvpEnabled, setRSVPEnabled } = useFeatureFlagStore();

    const navigate = useNavigate();
    useEffect(() => {
        getRSVPFlag()
            .then((enabled) => setRSVPEnabled(enabled))
            .catch((error) => {
                setRSVPEnabled(false);
                toast.error('An error occurred while loading the RSVP form.');
                console.error('Error getting RSVP flag:', error);
            });
    }, []);

    const isRSVPPage = window.location.pathname === '/rsvp';

    if (isRSVPPage && rsvpEnabled === null) {
        return null;
    }

    if (isRSVPPage && !rsvpEnabled) {
        navigate('/', { replace: true });
        toast.info('RSVP form is not available at this time.');
        return null;
    }
    
    return (
        <>
            <Toaster position="top-right" richColors />
            <ScrollToTop />
            <MenuProvider>
                <StickyHeader />
                <Menu />
                <AnimatedRoutes />
                <CookieBanner />
            </MenuProvider>
        </>
    )
}

export default App
