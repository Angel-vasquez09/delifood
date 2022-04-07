import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimits, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { DashboardLayout } from 'components'
import { SummaryTitle } from 'components'

import { DashBoardSummary } from 'interfaces';

const DashboardPage = () => {

    const { data, error } = useSWR<DashBoardSummary>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000, // refrescar datos cada 30 seconds
    })

    const [ getRefresh, setRefresh ] = useState(30);

    useEffect(() => {
        const int = setInterval(() => {
            setRefresh(In => In > 0 ? In - 1 : 30);
        }, 1000);
        return () => clearInterval(int);
    }, [])

    if(!error && !data) {
        return <></>
    }

    if(error){
        return <h1>Error al cargar la informacion</h1>
    }

    const {
        numberOfOrders = 0,
        paidOrders,
        notPaidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory
    } = data!;


    return (
        <DashboardLayout title={'Dashboard'} pageDescripcion={'Informacion general'}>
            <Grid container spacing={2}>

            <SummaryTitle
                        title={numberOfOrders}
                        subtitle={'Ordenes totales'}
                        icon={
                            <CreditCardOutlined
                                color="secondary" sx={{fontSize: 40}} />}
                    />
                    <SummaryTitle
                        title={notPaidOrders}
                        subtitle={'Ordenes pendientes'}
                        icon={
                            <CreditCardOffOutlined
                                color="error" sx={{fontSize: 40}} />}
                    />
                    <SummaryTitle
                        title={paidOrders}
                        subtitle={'Ordenes Entregadas'}
                        icon={
                            <AttachMoneyOutlined
                                color="success" sx={{fontSize: 40}} />}
                    />
                    <SummaryTitle
                        title={numberOfProducts}
                        subtitle={'Productos totales'}
                        icon={
                            <CategoryOutlined
                                color="primary" sx={{fontSize: 40}} />}
                    />
                    <SummaryTitle
                        title={numberOfClients}
                        subtitle={'Clientes'}
                        icon={
                            <GroupOutlined
                                color="warning" sx={{fontSize: 40}} />}
                    />
                    <SummaryTitle
                        title={productsWithNoInventory}
                        subtitle={'Sin existencia'}
                        icon={
                            <CancelPresentationOutlined
                                color="error" sx={{fontSize: 40}} />}
                    />
                    <SummaryTitle
                        title={lowInventory}
                        subtitle={'Bajo inventario'}
                        icon={
                            <ProductionQuantityLimitsOutlined
                                color="warning" sx={{fontSize: 40}} />}
                    />
                    <SummaryTitle
                        title={getRefresh}
                        subtitle={'Actualizacion'}
                        icon={
                            <AccessTimeOutlined
                                color="secondary" sx={{fontSize: 40}} />}
                    />

            </Grid>
        </DashboardLayout>
    )
}

export default DashboardPage