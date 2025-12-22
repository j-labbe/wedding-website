import { motion, AnimatePresence } from 'framer-motion';

interface TutorialHintProps {
    visible: boolean;
}

// Coral accent colors that complement the navy primary
const HOTSPOT_COLOR = '#E8736C';
const HOTSPOT_BORDER = '#F2A8A3'; // Lighter coral for the border

function TutorialHint({ visible }: TutorialHintProps) {
    // Clicking the hotspot lets the click bubble up to the parent coin
    // which triggers the flip animation and dismisses the tutorial
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute z-10 pointer-events-none"
                    style={{
                        // Position on bottom-right edge of the circular coin
                        bottom: '10%',
                        right: '10%',
                    }}
                    aria-label="Click or tap on photos to see fun facts."
                >
                    {/* Hotspot: pulsing dot with ripple effect */}
                    <span className="relative flex h-7 w-7">
                        {/* Outer ripple - uses CSS animation */}
                        <span
                            className="absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{
                                backgroundColor: HOTSPOT_COLOR,
                                animation: 'hotspot-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                            }}
                        />
                        {/* Inner solid dot */}
                        <span
                            className="relative inline-flex rounded-full h-7 w-7 shadow-lg"
                            style={{
                                backgroundColor: HOTSPOT_COLOR,
                                boxShadow: `0 0 0 3px ${HOTSPOT_BORDER}, 0 0 12px ${HOTSPOT_COLOR}`,
                            }}
                        />
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default TutorialHint;
