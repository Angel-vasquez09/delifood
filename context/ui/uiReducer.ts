import { UiState } from './'


type UiActionType =
| { type: '[Ui] - ToggleMenu' }
| { type: '[Ui] - ToggleMenuDashboard' }



export const uiReducer = (state: UiState, action: UiActionType): UiState => {
    switch(action.type){
        case '[Ui] - ToggleMenu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }

        case '[Ui] - ToggleMenuDashboard':
            return {
                ...state,
                isMenuDashOpen: !state.isMenuDashOpen
            }

        default:
            return state
    }
}