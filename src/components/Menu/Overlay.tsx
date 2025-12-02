const Overlay = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}) => (
    <div className="fixed z-1000 top-0 left-0 w-full h-full pointer-events-none">
        <div
            className={`absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-md transition-all duration-500 ease-in-out ${isOpen ? 'pointer-events-auto' : 'opacity-0'}`}
            onClick={() => setIsOpen(false)}
        ></div>
    </div>
)

export default Overlay
