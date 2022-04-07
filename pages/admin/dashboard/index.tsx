import React from 'react';
import { Typography } from '@mui/material';

import { DashboardLayout } from 'components';

const Dashboard = () => {
    return (
        <DashboardLayout title={'Dashboard'} pageDescripcion={'Informacion general'}>
            <Typography variant="h1">Dashboard</Typography>
        </DashboardLayout>
    )
}

export default Dashboard