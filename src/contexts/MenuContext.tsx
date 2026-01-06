import { createContext, useState, type ReactNode } from 'react'

export interface MenuContextType {
    isOpen: boolean
    toggle: () => void
    close: () => void
    open: () => void
}

export const MenuContext = createContext<MenuContextType | null>(null)

export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <MenuContext.Provider
            value={{
                isOpen,
                toggle: () => setIsOpen((prev) => !prev),
                close: () => setIsOpen(false),
                open: () => setIsOpen(true),
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}
