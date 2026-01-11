import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface ComingSoonModalProps {
    isOpen: boolean
    onClose: () => void
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring' as const,
            stiffness: 260,
            damping: 26,
            mass: 0.8,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: {
            duration: 0.2,
            ease: 'easeOut' as const,
        },
    },
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, onClose }) => {
    const handleEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        },
        [onClose]
    )

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = ''
        }
    }, [isOpen, handleEscape])

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        variants={backdropVariants}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    />

                    {/* Modal content */}
                    <motion.div
                        className="relative z-10 rounded-lg shadow-2xl max-w-md w-full p-8 text-center"
                        style={{ backgroundColor: '#ecf5f7' }}
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-3 right-3 text-primary-text/60 hover:text-primary-text transition-colors p-1"
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Title */}
                        <h2 className="font-laluxes-noligatures text-3xl md:text-4xl mb-4 text-primary-text">
                            Coming Soon
                        </h2>

                        {/* Description */}
                        <p className="text-primary-text/80 text-lg leading-relaxed mb-6">
                            We're putting the final touches on our registry. It will be available to browse shortly!
                        </p>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="bg-accent-gold/90 hover:bg-accent-gold text-white font-sackers text-sm tracking-wider px-8 py-3 rounded transition-colors duration-200 cursor-pointer"
                        >
                            Got It
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )

    return createPortal(modalContent, document.body)
}

export default ComingSoonModal
