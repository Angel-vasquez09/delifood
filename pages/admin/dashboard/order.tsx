import { Typography } from '@mui/material'
import { DashboardLayout } from 'components'
import React from 'react'

const Orders = () => {
    return (
        <DashboardLayout title={'Dashboard'} pageDescripcion={'Ordenes de compras'}>
            <Typography variant="h1">Ordenes de compra</Typography>
        </DashboardLayout>
    )
}

export default Orders