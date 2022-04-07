import { useContext } from 'react'
import { Button,Card,TextField, CardActionArea, CardMedia, Grid, Typography, Box, Link,  } from '@mui/material'
import { FoodLayout } from 'components'
import { useForm, SubmitHandler } from "react-hook-form";
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { CartContext } from 'context';

interface FormData{
    nombre     : string,
    apellido   : string,
    direccion  : string,
    direccion2?: string,
    Cpostal    : string,
    ciudad     : string,
    telefono   : string
}

const getAddressFromCookie = () => {
    return {
        nombre    : Cookie.get('nombre') || '',
        apellido  : Cookie.get('apellido') || '',
        direccion : Cookie.get('direccion') || '',
        direccion2: Cookie.get('direccion2') || '',
        Cpostal   : Cookie.get('Cpostal') || '',
        ciudad    : Cookie.get('ciudad') || '',
        telefono  : Cookie.get('telefono') || ''
    }
}

const AddressPage = () => {

    const router = useRouter();
    const { updateAddress } = useContext(CartContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues : getAddressFromCookie()
    });

    const onRevisar = (data: FormData) => {
        updateAddress(data);
        router.push('/checkout/summary');
    }

	return (
		<FoodLayout title="Direccion" pageDescripcion="Confirmar direccion" category={false}>
            <form onSubmit={ handleSubmit(onRevisar)} noValidate>
                <Typography variant="h1" component="h1">Direccion</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nombre*"
                            variant="outlined"
                            fullWidth
                            { ...register('nombre',{
                                required: 'El nombre es requerido',
                                minLength: {
                                    value: 2,
                                    message: 'El nombre debe tener al menos 2 caracteres'
                                }
                            })}
                            error={ !!errors.nombre } // error es propio de material-ui
                            helperText={ errors.nombre?.message } // helpertText es propio de material-ui
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        label="Apellido*"
                        variant="outlined"
                        fullWidth
                        { ...register('apellido',{
                            required: 'El apellido es requerido'
                        })}
                        error={ !!errors.apellido } // error es propio de material-ui
                        helperText={ errors.apellido?.message } // helpertText es propio de material-ui
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                        label="Direccion*"
                        variant="outlined"
                        fullWidth
                        { ...register('direccion',{
                            required: 'El apellido es requerido'
                        })}
                        error={ !!errors.direccion } // error es propio de material-ui
                        helperText={ errors.direccion?.message } // helpertText es propio de material-ui
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        label="Direccion 2"
                        variant="outlined"
                        fullWidth
                        { ...register('direccion2')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                        label="Codigo postal*"
                        variant="outlined"
                        fullWidth
                        { ...register('Cpostal',{
                            required: 'El codigo postal es requerido'
                        })}
                        error={ !!errors.Cpostal } // error es propio de material-ui
                        helperText={ errors.Cpostal?.message } // helpertText es propio de material-ui
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        label="Ciudad"
                        variant="outlined"
                        fullWidth
                        { ...register('ciudad',{
                            required: 'La ciudad es requerida'
                        })}
                        error={ !!errors.ciudad } // error es propio de material-ui
                        helperText={ errors.ciudad?.message } // helpertText es propio de material-ui
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        label="Telefono"
                        variant="outlined"
                        fullWidth
                        { ...register('telefono',{
                            required: 'El telefono es requerida'
                        })}
                        error={ !!errors.telefono } // error es propio de material-ui
                        helperText={ errors.telefono?.message } // helpertText es propio de material-ui
                        />
                    </Grid>
                </Grid>

                <Box sx={{mt: 5}} display="flex" justifyContent="center">
                    <Button type="submit" color="secondary" className="circular-btn" size="large">
                        Revisar Pedido
                    </Button>
                </Box>
            </form>
        </FoodLayout>
	)
}

export default AddressPage;