import { PayPalButtons } from "@paypal/react-paypal-js";
import { GetServerSideProps, NextPage } from 'next'
import { Card,CardContent,Chip, Grid, Typography, Box, Divider ,Button, CircularProgress, Paper } from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"
import { FoodLayout, EstadoOrden, CartList, OrderSummary } from 'components'
import { getSession } from 'next-auth/react'
import { dbOrders } from 'database'
import { IOrder } from 'interfaces'
import { foodApi } from "api";
import { useRouter } from 'next/router';
import { useState } from "react";
import { SHOP_CONSTANTS } from "database";


export type OrderResponseBody = {
    id: string;
    status:
        | "COMPLETED"
        | "SAVED"
        | "APPROVED"
        | "VOIDED"
        | "PAYER_ACTION_REQUIRED";
}

interface Props{
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const router = useRouter(); // Recargar la pagina cuando el pago sea exitoso
    const [ isLoading, setIsLoading ] = useState(false);
    const { shippingAddress } = order;
    const [ getActiveStep, setActiveStep ] = useState(0);

    // Metodo para realizar pagos con páypal
    /* const onOrderComplete = async(details: OrderResponseBody) => {

        if(details.status !== 'COMPLETED'){
            return alert('No se pudo completar el pedido');
        }

        setIsLoading(true);

        try {
            const { data } = await foodApi.post(`/orders/pay`,{
                transaction: details.id,
                orderId: order._id
            })

            router.reload();
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            alert("Error");
        }

    } */

    console.log(order);
    const crearEncargo = async () => {
        setIsLoading(true);
        try {
            const { data } = await foodApi.put(`/orders/pay`,{
                orderId: order._id
            })
            router.reload();
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            alert("Error");
        }
    }

	return (
		<FoodLayout title="Resumen de orden 23423" pageDescripcion="Resumen de la orden" category={false}>
            <Typography variant="h1" component="h1" noWrap>Orden: { order._id } </Typography>

            {
                order.isPaid ? (
                    <Chip
                        sx={{my: 2}}
                        label="Orden confirmada"
                        variant="outlined"
                        color="success"
                        icon={<CreditScoreOutlined />}
                    />
                ): (
                    <Chip
                        sx={{my: 2}}
                        label="Orden pendiente"
                        variant="outlined"
                        color="error"
                        icon={<CreditCardOffOutlined />}
                    />
                )
            }
            {/*  */}

            <Grid container className="fadeIn">
                <Grid item xs={12} sm={7}>

                    <CartList editable={false} product={order.orderItems}/>

                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">{ order.numberOfItems } { order.numberOfItems > 1 ? 'Productos' : 'Producto'}</Typography>

                            <Divider sx={{my: 1}} />

                            <Typography variant="subtitle2">{shippingAddress.nombre} {shippingAddress.apellido}</Typography>
                            <Typography variant="subtitle2">{shippingAddress.ciudad}</Typography>
                            <Typography variant="subtitle2">{shippingAddress.Cpostal}</Typography>
                            <Typography variant="subtitle2">{shippingAddress.direccion}</Typography>
                            <Typography variant="subtitle2">{shippingAddress.direccion2}</Typography>
                            <Typography variant="subtitle2">{shippingAddress.telefono}</Typography>

                            <Divider sx={{my: 1}} />

                            <OrderSummary items={order.numberOfItems} to={order.total} />

                            <Box sx={{mt: 3}}>
                                <Box display="flex" justifyContent="center" className="fadeIn"
                                    sx={{display: isLoading ? 'flex' : 'none'}}>
                                    <CircularProgress />
                                </Box>

                                <Box flexDirection="column" sx={{ display: isLoading ? 'none' : 'flex'}}>
                                    {
                                        order.isPaid ? (
                                            <Chip
                                                sx={{my: 2}}
                                                label="Orden confirmada"
                                                variant="outlined"
                                                color="success"
                                                icon={<CreditScoreOutlined />}
                                            />
                                        ): (
                                            /* BOTONES DE PAYPAL */
                                            <Button
                                                onClick={ crearEncargo }
                                                color="primary"
                                                className="circular-btn"
                                                fullWidth
                                                >
                                                Pedir encargo
                                            </Button>
                                        )
                                    }
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {
                    order.estado !== 'Pendiente' && (
                        <Grid item xs={12} sx={{ mt: 2 }} >
                            <Card  sx={{ p: 2 }}>
                                <Box sx={{ mb: 4, display: 'flex', justifyContent:'center'}}>
                                    <Typography variant="h4"><strong>Estado del pedido</strong></Typography>
                                </Box>

                                <EstadoOrden activeStep={
                                    order.estado === 'Preparando' ? 1 : (
                                        order.estado === 'Enviado' ? 2 : (
                                            order.estado === 'Entregado' ? 3 : 0
                                        )
                                    )
                                }
                                />

                            </Card>
                        </Grid>
                    )
                }

            </Grid>
        </FoodLayout>
	)
}



export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    //const { data } = await  // your fetch function here
    const { id = '' } = query

    const session: any = await getSession({ req });

    if(!session){
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrdersById(id.toString());

    if(!order){
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }


    if(order.user !== session.user._id){
        // El usuario solo puede ver las ordenes de el mismo
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
        }
    }
}

export default OrderPage;

/*
BOTONES DE PAYPAY
<PayPalButtons
    createOrder={(data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: `${ order.total }`,
                    },
                },
            ],
        });
    }}
    onApprove={(data, actions) => {
        return actions.order!.capture().then((details) => {
            onOrderComplete(details);
            //console.log(details);
            //const name = details.payer.name.given_name;
            //alert(`Transaction completed by ${name}`);
        });
    }}
/>

*/
