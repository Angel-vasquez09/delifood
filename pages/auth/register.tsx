import { useState, useContext} from 'react';
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { Grid, Typography, Button, TextField, Box, Link, Chip } from '@mui/material';
import { AuthLayout } from 'components'
import { useForm, SubmitHandler } from "react-hook-form";
import { validations } from 'utils';
import { foodApi } from 'api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from 'context';
import { getSession, signIn } from 'next-auth/react';


type FormData = {
    name    : string,
    email   : string,
    password: string,
};

const RegisterPage = () => {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const { registerUser } = useContext(AuthContext);
    const [ getDestino, setDestino ] = useState(router.query.p?.toString() || '/');

    const onRegister = async({ name, email, password }: FormData) => {
        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password);

        if(hasError){
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        await signIn('credentials',{email, password});
        /* const destino = router.query.p?.toString() || '/';
        setDestino(destino);
        router.replace(destino); */ // replace para que no pueda regresar a la pagina de login
    }


    return (
        <AuthLayout title="Registrar" pageDescripcion={''}>
            <form onSubmit={ handleSubmit(onRegister)} noValidate>
                <Box sx={{width: 350, padding: '10px 20px'}}>
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
                                        label={errorMessage}
                                        color="error"
                                        icon={<ErrorOutline />}
                                        className="fadeIn"
                                    />
                                )
                            }
                        </Grid>
                        <Grid item xs={12} sx={{mt:1}}>
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                { ...register('name',{
                                    required: 'El nombre es requerido',
                                    minLength: {
                                        value: 2,
                                        message: 'El nombre debe tener al menos 2 caracteres'
                                    }
                                })}
                                error={ !!errors.name } // error es propio de material-ui
                                helperText={ errors.name?.message } // helpertText es propio de material-ui
                            />
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
                                        value: 8,
                                        message: 'El password debe tener al menos 8 caracteres'
                                    }
                                }) }
                                error={ !!errors.password } // error es propio de material-ui
                                helperText={ errors.password?.message } // helpertText es propio de material-ui
                            />
                        </Grid>

                        <Grid item xs={12} sx={{mt:2}}>
                            <Button type="submit" color="primary" className="circular-btn" size="large" fullWidth>
                                Crear
                            </Button>
                        </Grid>

                        <Grid item xs={12} sx={{mt:2}} display="flex" justifyContent="center">
                            <NextLink href={`/auth/login?p=${ getDestino }`} passHref>
                                <Link underline="always">
                                    ¿Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}


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

export default RegisterPage;