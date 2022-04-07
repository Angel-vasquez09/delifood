import { Grid, Typography, Link, Chip } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import NextLink from 'next/link'
import { FoodLayout } from '../../components/layouts'
import { getSession } from 'next-auth/react'
import { dbOrders } from 'database'
import { IOrder } from 'interfaces'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Nombre completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra si el usuario pago la orden',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                ? <Chip color="success" label="Pagada" variant="outlined" />
                : <Chip color="error" label="No Pagada" variant="outlined" />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref>
                    <Link underline="always">
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref>
                    <Link underline="always">
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    },
]

/* const rows = [
    { id: 1, paid: true, fullName: 'Luis Angel' },
    { id: 2, paid: false,fullName: 'Luis Antonio' },
    { id: 3, paid: true, fullName: 'Petra del cristo' },
    { id: 4, paid: true, fullName: 'Liz Yeimi' },
    { id: 5, paid: false,fullName: 'Usuario' }
] */

interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    const rows = orders.map((order, i) => ({
        id: i + 1,
        fullName: `${order.shippingAddress.nombre} ${order.shippingAddress.apellido}`,
        paid: order.isPaid,
        orderId: order._id
    }))

	return (
		<FoodLayout title="Historial de ordenes" pageDescripcion="Historial del cliente" category={false}>
            <Typography variant="h1" component="h1">Historial de ordenes</Typography>

            <Grid container>

                <Grid item xs={12} sx={{height: 650, width: '100%'}} >
                    <DataGrid
                        rows={ rows }
                        columns={ columns }
                        pageSize={ 10 }
                        rowsPerPageOptions={ [10] }
                    />
                </Grid>

            </Grid>
        </FoodLayout>
	)
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await  getSession({ req });

    if(!session){
        return {
            redirect: {
                destination: `/auth/login?p=/orders/history`,
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrdersByUserId(session.user._id);



    return {
        props: {
            orders
        }
    }
}

export default HistoryPage;