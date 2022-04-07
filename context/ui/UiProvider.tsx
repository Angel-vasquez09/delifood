import { FC, useReducer } from 'react';
import { UiContext, uiReducer } from './'



export interface UiState {
    isMenuOpen    : boolean;
    isMenuDashOpen: boolean;
}


const UI_INITIAL_STATE: UiState = {
    isMenuOpen    : false,
    isMenuDashOpen: false,
}

export const UiProvider: FC = ({ children }) => {

    const [state,dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggleSideMenu = () => {
        dispatch({type: '[Ui] - ToggleMenu'})
    }

    const toggleSideMenuDash = () => {
        dispatch({type: '[Ui] - ToggleMenuDashboard'})
    }

    return (
        <UiContext.Provider value={{
            ...state,
            toggleSideMenu,
            toggleSideMenuDash
        }}>
            { children }
        </UiContext.Provider>
    )
}