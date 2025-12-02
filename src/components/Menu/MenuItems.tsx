import { useFeatureFlagEnabled } from 'posthog-js/react'

const MenuItems = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}) => {
    const items = [
        { name: 'Home', link: '/' },
        { name: 'Our Story', link: '/our-story' },
        { name: 'The Cast', link: '/the-cast' },
        { name: 'The Event', link: '/the-event' },
        { name: 'Experience Newport', link: '/experience-newport' },
        { name: 'Q & A', link: '/q-and-a' },
    ]

    const rsvpEnabled = useFeatureFlagEnabled('rsvp-page')

    const actionItems = [
        { name: 'Registry', link: 'https://example.com', active: true },
        { name: 'RSVP', link: '/rsvp', active: rsvpEnabled },
    ]

    const activePage = window.location.pathname
    const currentIndex = items.findIndex((item) => item.link === activePage)

    return (
        <div
            className={`fixed z-1001 top-0 left-0 w-full max-w-[1400px] mx-auto right-0 flex flex-col ${isOpen ? 'drop-shadow-2xl' : ''} items-center justify-start transition-all duration-500 ease-in-out min-[1400px]:rounded-b-lg ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
        >
            {/* Nav items grid: desktop - 2 cols, mobile - 1 col */}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full divide-y-[3px] divide-menu-border md:divide-y-0">
                {items.map((item, index) => (
                    <a
                        key={item.name}
                        href={item.link}
                        className={`${currentIndex === index ? 'bg-primary-menu-hover-bg' : 'bg-primary-color'} w-full py-5 font-sackers text-xl font-medium text-menu-text hover:bg-primary-menu-hover-bg transition-colors duration-300 pointer-cursor ${index % 2 === 0 ? 'md:border-r-[3px] md:border-menu-border' : ''} ${index < items.length - 2 ? 'md:border-b-[3px] md:border-menu-border' : ''}`}
                        onClick={() => setIsOpen(false)}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
            {/* Action items: Registry and RSVP */}
            <div
                className={`grid w-full divide-y-[3px] divide-menu-border ${actionItems.filter((i) => i.active).length === 2 ? 'grid-cols-1 md:grid-cols-2 md:divide-y-0' : 'grid-cols-1'}`}
            >
                {actionItems
                    .filter((item) => item.active)
                    .map((item, index) => {
                        const activeCount = actionItems.filter(
                            (i) => i.active
                        ).length
                        const isOnlyItem = activeCount === 1
                        const isTwoItems = activeCount === 2
                        const isLeftItem = index === 0
                        const isRightItem = index === 1

                        return (
                            <a
                                key={item.name}
                                href={item.link}
                                className={`bg-menu-action-bg w-full py-7 font-sackers text-xl font-medium text-menu-text hover:bg-menu-action-hover-bg transition-colors duration-300 pointer-cursor ${index % 2 === 0 && isTwoItems ? 'md:border-r-[3px] md:border-menu-border' : ''} ${isOnlyItem ? 'min-[1400px]:rounded-b-lg' : ''} ${isTwoItems && isLeftItem ? 'min-[1400px]:rounded-bl-lg' : ''} ${isTwoItems && isRightItem ? 'min-[1400px]:rounded-br-lg' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </a>
                        )
                    })}
            </div>
        </div>
    )
}

export default MenuItems
