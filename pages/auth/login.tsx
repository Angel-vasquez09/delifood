import { useState, useContext, useEffect } from 'react';

import { GetServerSideProps } from 'next'
import { getSession, signIn, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link'

import { Grid, Typography, Button, TextField, Box, Link, Chip, Divider } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts'
import { useForm } from "react-hook-form";
import { AuthContext } from 'context';
import { validations } from 'utils';

type FormData = {
    email   : string,
    password: string,
};


const LoginPage = () => {

    //const { loginUser } = useContext(AuthContext);

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);
    const [ getDestino, setDestino ] = useState(router.query.p?.toString() || '/');

    const [ providers, setProvider ] = useState<any>({})

    useEffect(() => {
        getProviders().then(res => {
            setProvider(res)
        })
    }, [])

    const onLoginUser = async({ email, password }: FormData) => {
        setShowError(false);

        await signIn('credentials',{email, password});

        /* const isValidLogin = await loginUser(email, password);

        if(!isValidLogin){
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        const destino = router.query.p?.toString() || '/';
        setDestino(destino);
        router.replace(destino); */ // replace para que no pueda regresar a la pagina de login
    }

    return (
        <AuthLayout title="Ingresar" pageDescripcion={'Ingresar'}>
                <Divider />
                <form onSubmit={ handleSubmit(onLoginUser) } noValidate style={{ display: 'content'}}>
                    <Box sx={{width: 350, padding: '10px 10px'}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography
                                    display='flex' justifyContent={'center'}
                                    className="logo"
                                    sx={{ mb: 4 }}
                                    alignItems='center'>
                                    <Typography variant='h3'>Angel|</Typography>
                                    <Typography variant='h1'sx={{ ml: 0.5 }}>Food</Typography>
                                </Typography>
                                { // Mostrar error
                                    showError && (
                                        <Chip
                                            label="Usuario / Contraseña invalido"
                                            color="error"
                                            icon={<ErrorOutline />}
                                            className="fadeIn"
                                        />
                                    )
                                }

                            </Grid>
                            <Grid item xs={12} sx={{mt:1}}>
                                <TextField
                                    type="email"
                                    label="Correo"
                                    variant="outlined"
                                    fullWidth
                                    { ...register('email',{
                                        required: 'El correo es requerido',
                                        validate: validations.isEmail
                                        })
                                    }
                                    error={ !!errors.email } // error es propio de material-ui
                                    helperText={ errors.email?.message } // helpertText es propio de material-ui
                                    />
                            </Grid>
                            <Grid item xs={12} sx={{mt:1}}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    { ...register('password',{
                                        required: 'El password es requerido',
                                        minLength: {
                                            value: 6,
                                            message: 'El password debe tener al menos 6 caracteres'
                                        }
                                    }) }
                                    error={ !!errors.password } // error es propio de material-ui
                                    helperText={ errors.password?.message } // helpertText es propio de material-ui
                                />
                            </Grid>

                            <Grid item xs={12} sx={{mt:2}}>
                                <Button
                                    type="submit"
                                    color="primary"
                                    className="circular-btn"
                                    size="large"
                                    fullWidth
                                >
                                    Ingresar
                                </Button>
                            </Grid>

                            <Grid item xs={12} sx={{mt:2}} display="flex" justifyContent="center">
                            <NextLink href={`/auth/register?p=${ getDestino }`} passHref>
                                <Link underline="always">
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}} display="flex" flexDirection={'column'} justifyContent="end">
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2}}>
                            <Divider sx={ { width: '30%', mb: 2, mr: 1 } }/>
                                <Typography sx={{mb: 1}} variant="subtitle1">Or</Typography>
                            <Divider sx={ { width: '30%', mb: 2, ml: 1 } }/>
                        </Box>
                        {
                            Object.values(providers).map((item: any) => {
                                if(item.id === 'credentials') return null;
                                return (
                                    <Button
                                        key={ item.id }
                                        className="circular-btn"
                                        color="secondary"
                                        sx={{ mb: 1 }}
                                        onClick={() => signIn(item.id)}
                                    >
                                        { item.name }
                                    </Button>
                                )
                            })
                        }
                    </Grid>
                        </Grid>
                    </Box>
                </form>

        </AuthLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    // SI EXISTE UNA SESION, REDIRECCIONAR AL DESTINO
    const session = await getSession({ req }); // de next-auth

    const { p = '/' } = query

    if(session){
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }
    return {
        props: { }
    }
}

export default LoginPage;