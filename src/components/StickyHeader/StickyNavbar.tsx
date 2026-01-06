import type { ReactNode } from 'react'

interface StickyNavbarProps {
    children: ReactNode
    progress: number
}

const StickyNavbar = ({ children, progress }: StickyNavbarProps) => {
    // Increase background opacity as user scrolls
    const bgOpacity = 0.7 + progress * 0.25

    return (
        <nav
            className="fixed top-0 left-0 right-0 h-20 z-[100]
                       backdrop-blur-md
                       border-b border-primary-color/10
                       flex items-center px-4 md:px-8
                       transition-[background-color,border-color] duration-200"
            style={{
                backgroundColor: `rgba(236, 245, 247, ${bgOpacity})`,
                borderBottomColor: progress > 0.5 ? 'rgba(62, 77, 98, 0.15)' : 'transparent',
            }}
        >
            {children}
        </nav>
    )
}

export default StickyNavbar
