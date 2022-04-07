
import { createContext } from 'react'


interface ContextProps{
    isMenuOpen         : boolean; // Menu para el cliente
    isMenuDashOpen     : boolean; // Menu para el admin
    toggleSideMenu     : () => void; // Toggle para el cliente
    toggleSideMenuDash : () => void; // Toggle para el admin
}

export const UiContext = createContext({} as ContextProps)