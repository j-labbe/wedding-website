import React, { useState, useEffect, useRef } from 'react'
import Turnstile from 'react-turnstile'

interface ContactModalProps {
    isOpen: boolean
    onClose: () => void
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [isClosing, setIsClosing] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null)
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const turnstileRef = useRef<any>(null)

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            onClose()
            setIsClosing(false)
            setIsAnimating(false)
            setSubmitResult(null)
            setTurnstileToken(null)
            setFormData({ name: '', email: '', message: '' })
            // Reset Turnstile widget
            if (turnstileRef.current) {
                turnstileRef.current.reset()
            }
        }, 300)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate Turnstile token
        if (!turnstileToken) {
            setSubmitResult('error')
            setTimeout(() => {
                setSubmitResult(null)
            }, 3000)
            return
        }

        setIsSubmitting(true)
        
        try {
            const submitUrl = window.location.hostname === 'localhost' ? 'http://localhost:8787' : 'https://api.sammyandjack.com';
            
            const response = await fetch(`${submitUrl}/contactSubmission`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    turnstileToken,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to send message')
            }

            setSubmitResult('success')

            // Close modal after 3 seconds
            setTimeout(() => {
                handleClose()
            }, 3000)
        } catch (error) {
            console.error('Form submission failed:', error)
            setSubmitResult('error')

            // Close modal after 3 seconds
            setTimeout(() => {
                handleClose()
            }, 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Handle opening animation
    useEffect(() => {
        if (isOpen) {
            setIsClosing(false)
            // Trigger animation after a frame to ensure transition happens
            requestAnimationFrame(() => {
                setIsAnimating(true)
            })
        }
    }, [isOpen])

    if (!isOpen && !isClosing) return null

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 text-left">
            {/* Overlay */}
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isAnimating && !isClosing ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleClose}
            />

            {/* Modal */}
            <div className={`relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-[2001] transition-all duration-300 ${isAnimating && !isClosing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-sackers text-2xl text-primary-color">
                        Contact Us
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 text-3xl leading-none w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Close modal"
                    >
                        x
                    </button>
                </div>

                {submitResult ? (
                    <div
                        className={`p-4 rounded-md ${
                            submitResult === 'success'
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-red-50 border border-red-200'
                        }`}
                    >
                        <div className="flex items-center">
                            <div
                                className={`text-2xl mr-3 ${
                                    submitResult === 'success'
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }`}
                            >
                                {submitResult === 'success' ? '✓' : '✕'}
                            </div>
                            <div>
                                <h3
                                    className={`font-medium ${
                                        submitResult === 'success'
                                            ? 'text-green-900'
                                            : 'text-red-900'
                                    }`}
                                >
                                    {submitResult === 'success'
                                        ? 'Message Sent!'
                                        : 'Failed to Send'}
                                </h3>
                                <p
                                    className={`text-sm ${
                                        submitResult === 'success'
                                            ? 'text-green-700'
                                            : 'text-red-700'
                                    }`}
                                >
                                    {submitResult === 'success'
                                        ? "We'll get back to you soon."
                                        : 'Please try again later.'}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1 text-left"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                disabled={isSubmitting}
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1 text-left"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                disabled={isSubmitting}
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 mb-1 text-left"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                disabled={isSubmitting}
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({ ...formData, message: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        {/* Turnstile CAPTCHA */}
                        <Turnstile
                            // eslint-disable-next-line
                            // @ts-ignore
                            ref={turnstileRef}
                            sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAACD5n90tqkQyeRDY'}
                            onVerify={(token) => setTurnstileToken(token)}
                            onError={() => setTurnstileToken(null)}
                            onExpire={() => setTurnstileToken(null)}
                        />

                        <div className="flex gap-3 justify-end pt-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="px-4 py-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-primary-color text-white rounded-md hover:bg-primary-hover-color cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting && (
                                    <svg
                                        className="animate-spin h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                )}
                                {isSubmitting ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ContactModal
