import React from 'react'
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Chip, Grid } from '@mui/material';
import { IOrder, IUser } from 'interfaces';
import useSWR from 'swr';
import { DashboardLayout } from 'components';

const columns: GridColDef[] = [
    { field: 'id',    headerName: 'ORDEN ID', align:"center" },
    { field: 'email', headerName: 'CORREO',   align:"center" },
    { field: 'name',  headerName: 'NAME',     align:"center" },
    { field: 'total', headerName: 'TOTAL',    align:"center" },
    {
        field: 'estado',
        headerName: 'Estado',
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <Chip variant="outlined" label={ row.estado }
                color={ row.estado === 'Pendiente' ? 'warning' : 'success'} />
            )
        },
        width: 140
    },
    { field: 'inStock', headerName: 'NO.PRODUCTOS', align:"center", width: 150 },
    {
        field: 'check',
        headerName: 'Ver Orden',
        renderCell: ({ row }: GridValueGetterParams) => {
            return <a href={`/admin/orders/${ row.id }`} target="_blank" rel={'noreferrer'}>
                Ver Orden
            </a>
        }
    },
    { field: 'createdAt', headerName: 'CREADA',align:"center", width: 200},
]

const OrdersPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if(!error && !data){
        return <></>
    }
    const rows = data!.map(order => ({
        id       : order._id,
        email    : (order.user as IUser).email,
        name     : (order.user as IUser).name,
        total    : order.total,
        isPaid   : order.isPaid,
        inStock  : order.numberOfItems,
        createdAt: order.createdAt,
        estado   : order.estado
    }))

    return (
        <DashboardLayout title={'Orders'} pageDescripcion={'Lista de ordenes'}>

                <Grid container>

                    <Grid item xs={12} sx={{height: 550, width: '100%'}} >
                        <DataGrid
                            rows={ rows }
                            columns={ columns }
                            pageSize={ 10 }
                            rowsPerPageOptions={ [10] }
                        />
                    </Grid>

                </Grid>

        </DashboardLayout>
    )
}

export default OrdersPage