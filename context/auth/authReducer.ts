import { IUser } from 'interfaces'
import { AuthState } from './'

type AuthActionType =
| { type: '[Auth] - Login', payload: IUser } // Login'}
| { type: '[Auth] - Logout',} // Logout'}
| { type: '[Auth] - Validar', payload: IUser | undefined} // Validar token'}




export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch(action.type){
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }
        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined
            }
        case '[Auth] - Validar':
            return {
                ...state,
                isLoggedIn: action.payload === undefined ? false : true,
                user: action.payload
            }
        default:
            return state
    }
}