import { useContext } from 'react'
import { MenuContext } from '../contexts/MenuContext'

export const useMenu = () => {
    const ctx = useContext(MenuContext)
    if (!ctx) throw new Error('useMenu must be used within MenuProvider')
    return ctx
}
