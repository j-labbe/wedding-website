import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface LightboxProps {
    isOpen: boolean
    onClose: () => void
    src: string
    alt?: string
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring' as const,
            stiffness: 260,
            damping: 26,
            mass: 0.8,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: {
            duration: 0.2,
            ease: 'easeOut' as const,
        },
    },
}

const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, src, alt = 'Image' }) => {
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

    const lightboxContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[2000] flex items-center justify-center"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
                        variants={backdropVariants}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    />

                    {/* Close button */}
                    <motion.button
                        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors p-2 cursor-pointer"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.1 }}
                        aria-label="Close lightbox"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
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
                    </motion.button>

                    {/* Image container */}
                    <motion.div
                        className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                        variants={imageVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[90vh] object-contain shadow-2xl"
                            style={{ imageOrientation: 'from-image' }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )

    return createPortal(lightboxContent, document.body)
}

export default Lightbox
