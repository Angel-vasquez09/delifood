import NextLink from 'next/link'
import { Card,CardContent, CardActionArea, CardMedia, Grid, Typography, Box, Link,Divider ,Button, Chip } from '@mui/material'
import { FoodLayout } from 'components'
import { CartList, OrderSummary } from '../../components/cart'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from 'context'
import Cookie from 'js-cookie';
import { useRouter } from 'next/router'

const SummaryPage = () => {

    const router = useRouter();
    const { shippingAddress, createOrder } = useContext(CartContext);

    const [ isPosting, setIsPosting ] = useState(false); // Desabilitar el boton cuando despues que se envia la orden
    const [errorMessage, setErrorMessage ] = useState('');

    useEffect(() => {
        if(!Cookie.get('nombre')){
            router.push('/checkout/address')
        }
    } ,[shippingAddress, router])


    const onCreateOrder = async() => {
        setIsPosting(true); // Desactivamos el boton para que no interrumpa la peticion
        const { hasError, message } = await createOrder();
        if(hasError){
            setIsPosting(false); // Desactivamos el boton para que no interrumpa la peticion
            setErrorMessage(message);
            return;
        }

        router.replace(`/orders/${ message }`); // Replace es para que la persona no pueda volver a la pagina de orden
    }


	return (
		<FoodLayout title="Resumen de orden" pageDescripcion="Resumen de la orden" category={false}>
            <Typography variant="h1" component="h1">Carrito</Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable={false} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Resumen</Typography>

                            <Divider sx={{my: 1}} />

                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">Direccion de entrega</Typography>
                                <NextLink href="/checkout/address" passHref>
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>


                            <Typography variant="subtitle2">{ shippingAddress?.nombre     || '' } { shippingAddress?.apellido   || '' }</Typography>
                            <Typography variant="subtitle2">{ shippingAddress?.telefono   || '' }</Typography>
                            <Typography variant="subtitle2">{ shippingAddress?.ciudad     || '' }</Typography>
                            <Typography variant="subtitle2">{ shippingAddress?.Cpostal    || '' }</Typography>
                            <Typography variant="subtitle2">{ shippingAddress?.direccion  || '' }</Typography>
                            <Typography variant="subtitle2">{ shippingAddress?.direccion2 || '' }</Typography>

                            <Divider sx={{my: 1}} />

                            <Box display="flex" justifyContent="end">
                                <NextLink href="/cart" passHref>
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{mt: 3}} display="flex" flexDirection={'column'}>
                                <Button
                                    color="secondary"
                                    className="circular-btn"
                                    fullWidth
                                    onClick={onCreateOrder}
                                    >
                                    Confirmar Orden
                                </Button>

                                <Chip
                                    label={errorMessage}
                                    color="error"
                                    sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                                />

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </FoodLayout>
	)
}
export default SummaryPage;


