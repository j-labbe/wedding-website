import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Menu from './components/Menu/Menu'
import CookieBanner from './components/CookieBanner'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import TheCast from './pages/TheCast'
import TheEvent from './pages/TheEvent'
import ExperienceNewport from './pages/ExperienceNewport'
import QAndA from './pages/QAndA'

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
                    {/* <Route path="/rsvp" element={<RSVP />} /> */}
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Menu />
            <AnimatedRoutes />
            <CookieBanner />
        </BrowserRouter>
    )
}

export default App
