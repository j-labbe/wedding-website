import { useMenu } from '../../hooks/useMenu'

const Button = () => {
    const { isOpen, toggle } = useMenu()

    return (
        <div
            className="flex flex-row max-w-min items-center cursor-pointer"
            onClick={toggle}
        >
            <div className="flex gap-4 bg-white p-2 shadow-[0px_0px_6px_2px_rgba(0,0,0,0.02)] rounded">
                <div className={`hamburger ${isOpen ? 'active' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <h3 className="ml-3 mb-1 font-sackers text-base md:text-lg hidden md:block">Menu</h3>
        </div>
    )
}

export default Button
