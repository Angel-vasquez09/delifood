import { GetServerSideProps, NextPage } from 'next'
import { Card,CardContent,Chip, Grid, Typography, Box, Divider, Button} from '@mui/material'
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"
import { DashboardLayout, EstadoOrden } from 'components'
import { CartList, OrderSummary } from 'components/cart'
import { dbOrders } from 'database'
import { IOrder } from 'interfaces'
import IconButton from '@mui/material/IconButton';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useState } from 'react'
import { foodApi } from 'api'


interface Props{
    order: IOrder
}
interface ActivateStep{
    step: number
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;
    const [ loading, setLoading ] = useState(false);
    const [ activeStep, setActiveStep ] = useState<ActivateStep>({step: 0});
    const { step } = activeStep;

    const updateEstado = ( num: number ) => {

        let newStep = step + num;

        if(newStep < 0 || newStep > 3){
            return
        }

        setActiveStep({step: newStep});

    }

    const onUpdateEstadoOrderDb = async () => {
        setLoading(true);
        const estado = step === 0 ? 'Confirmado' : step === 1 ? 'Preparando' : step === 2 ? 'Enviado' : 'Entregado';
        try {
            await foodApi.put(`/admin/orders`,{
                id: order._id,
                estado
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            alert("Error al actualizar el estado, intentelo nuevamente");
        }
    }


	return (
		<DashboardLayout title={'Orders'} pageDescripcion={'Lista de ordenes'}>

            {
                order.isPaid ? (
                    <Chip
                        sx={{my: 2}}
                        label="Orden Confirmada"
                        variant="outlined"
                        color="success"
                        icon={<CreditScoreOutlined />}
                    />
                ): (
                    <Chip
                        sx={{my: 2}}
                        label="Pendiente"
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
                                {
                                    order.isPaid ? (
                                        <Chip
                                            sx={{my: 2}}
                                            label="Orden Confirmada"
                                            variant="outlined"
                                            color="success"
                                            icon={<CreditScoreOutlined />}
                                        />
                                    ): (
                                        <Chip
                                            sx={{my: 2}}
                                            label="Pendiente"
                                            variant="outlined"
                                            color="error"
                                            icon={<CreditCardOffOutlined />}
                                        />
                                    )
                                }
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

                                <EstadoOrden activeStep={ step } />

                                <Divider sx={{my: 4}} />
                                <Box display="flex" justifyContent='space-between'>
                                    <Box>
                                        <IconButton color="primary" onClick={() => updateEstado(+1)}>
                                            <ArrowForwardOutlinedIcon />
                                        </IconButton>
                                        <IconButton color="primary" onClick={() => updateEstado(-1)}>
                                            <ArrowBackOutlinedIcon />
                                        </IconButton>
                                    </Box>
                                    <Button
                                        disabled={loading}
                                        onClick={ onUpdateEstadoOrderDb }
                                        size='large'
                                        color="primary"
                                        className="circular-btn">
                                        Actualizar Estado
                                    </Button>
                                </Box>

                            </Card>
                        </Grid>
                    )
                }
            </Grid>
        </DashboardLayout>
	)
}



export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    //const { data } = await  // your fetch function here
    const { id = '' } = query

    const order = await dbOrders.getOrdersById(id.toString());

    if(!order){
        return {
            redirect: {
                destination: `/admin/orders`,
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


