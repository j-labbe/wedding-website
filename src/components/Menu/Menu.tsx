import { useState } from 'react'
import Button from './Button'
import Overlay from './Overlay'
import MenuItems from './MenuItems'

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button isOpen={isOpen} setIsOpen={setIsOpen} />
            <Overlay isOpen={isOpen} setIsOpen={setIsOpen} />
            <MenuItems isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}

export default Menu
