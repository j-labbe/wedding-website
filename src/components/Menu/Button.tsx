const Button = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}) => (
    <div
        className="flex flex-row md:p-4 max-w-min items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
    >
        <div className="flex gap-4 bg-white p-2 shadow-[0px_0px_6px_2px_rgba(0,0,0,0.02)]">
            <div className={`hamburger ${isOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <h3 className="ml-5 mb-1 font-sackers text-lg ">Menu</h3>
    </div>
)

export default Button
