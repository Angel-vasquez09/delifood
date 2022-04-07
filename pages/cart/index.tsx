import { Card,CardContent, Grid, Typography, Box, Divider ,Button } from '@mui/material'
import { FoodLayout, Swipeable } from 'components'
import { CartList, OrderSummary } from 'components'
import { useEffect, useContext } from 'react';
import { CartContext } from 'context';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';


const CartPage = () => {

    const router = useRouter();
    const { isLoaded, cart } = useContext(CartContext);
    const matches = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        // Verificar si hay productos en el carrito
        // Si no hay productos, redireccionar a la pagina de producto vacio
        if(isLoaded && cart.length === 0) {
            router.replace('/cart/empty');
        }
    } , [ isLoaded, cart, router ])

    if(!isLoaded && cart.length === 0) {
        // Evitar mostrar el componente hasta que se verifique el carrito
        return (<></>);
    }

	return (
		<FoodLayout title="Carrito 3" pageDescripcion="Carrito de la tienda" category={false}>
            <Typography variant="h1" component="h1">Carrito</Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    {/* Lista de productos */}
                    <CartList editable />
                    {/* Lista de productos */}
                </Grid>

                {
                    matches && (
                        <Swipeable />
                    )
                }

                <Grid item xs={12} sm={5} sx={{ display: {xs: 'none', sm: 'block'}}}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Orden</Typography>

                            <Divider sx={{my: 1}} />

                            <OrderSummary />

                            <Box sx={{mt: 3}}>
                                <Button
                                    color="primary"
                                    className="circular-btn"
                                    fullWidth
                                    href="/checkout/address"
                                    >
                                    Checkout
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </FoodLayout>
	)
}

export default CartPage;


