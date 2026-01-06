interface NavbarTitleProps {
    title: string
    progress: number
}

const NavbarTitle = ({ title, progress }: NavbarTitleProps) => {
    // Title fades in and scales up as user scrolls
    const opacity = progress
    const scale = 0.9 + progress * 0.1

    return (
        <h1
            className="title text-xl md:text-2xl transition-opacity duration-150 origin-center whitespace-nowrap"
            style={{
                opacity,
                transform: `scale(${scale})`,
                pointerEvents: progress > 0.5 ? 'auto' : 'none',
            }}
        >
            {title}
        </h1>
    )
}

export default NavbarTitle
