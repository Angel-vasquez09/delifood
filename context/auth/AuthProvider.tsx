import { FC, useReducer, useEffect } from 'react';
import Cookie from 'js-cookie'
import { AuthContext, authReducer } from './'
import { ICartProduct, IUser } from 'interfaces'
import { foodApi } from 'api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';



export interface AuthState {
    isLoggedIn: boolean;
    user?     : IUser;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user      : undefined
}

export const AuthProvider: FC = ({ children }) => {

    const { data, status } = useSession();

    const router = useRouter();

    const [state,dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    useEffect(() => {
        console.log({user: data?.user })
        console.log(status)
        if(status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data.user as IUser });
        }
    }, [data, status]);

    /* useEffect(() => { AUTENTICACION PERSONALIZADA
        if(Cookie.get('token')){
            // Si no existe un token en las cookies que pare
            return;
        }

        foodApi.get('/user/validate-token').then(({ data }) => {
            Cookie.set('token', data.token);
            dispatch({ type: '[Auth] - Validar', payload: data.user })
        }).catch(() => {
            Cookie.remove('token');
            dispatch({ type: '[Auth] - Validar', payload: undefined });
        })
    } ,[]) */

    const loginUser = async(email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await foodApi.post('/user/login', { email, pass: password });
            const { token, user } = data;
            Cookie.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user })
            return true;
        } catch (error) {
            return false;
        }
    }

    const registerUser = async(name: string, email: string, password: string): Promise<{hasError: boolean,message?: string}> => {
        try {
            const { data } = await foodApi.post('/user/register', { name, email, pass: password });
            const { token, user } = data;
            /* Cookie.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user }) */
            return {
                hasError: false
            }
        } catch (error) {
            if(axios.isAxiosError(error)){
                return {
                    hasError: true,
                    message : error.response?.data.message
                };
            }

            return {
                hasError: true,
                message : 'Error al registrar el usuario'
            }
        }
    }

    const logoutUser = () => {
        Cookie.remove('nombre');
        Cookie.remove('apellido');
        Cookie.remove('ciudad');
        Cookie.remove('direccion');
        Cookie.remove('direccion2');
        Cookie.remove('telefono');
        Cookie.remove('Cpostal');
        Cookie.remove('cart');
        signOut();
        //router.reload(); // Hace refresh de la pagina
        //Cookie.remove('token');
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            registerUser,
            logoutUser
        }}>
            { children }
        </AuthContext.Provider>
    )
}