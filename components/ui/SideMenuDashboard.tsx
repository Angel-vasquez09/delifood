import { useContext, useState } from 'react';
import { Box, Divider, Drawer, Link, List, ListItem, ListItemIcon, ListSubheader, Typography } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumber, ConfirmationNumberOutlined, DashboardOutlined, LoginOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { AuthContext, UiContext } from 'context';
import { useRouter } from 'next/router'
import { MyInput } from './MyInput';
import { ListItemDrawer } from './List';

export const SideMenuDashboard = () => {

    const router = useRouter();
    const { user, isLoggedIn, logoutUser } = useContext(AuthContext);
    const { isMenuDashOpen, toggleSideMenuDash } = useContext(UiContext);

    const navigateTo = (url: string) => {
        /* toggleSideMenuDash();
        router.push(url); */
    }

    return (
    <Drawer
        open={ isMenuDashOpen }
        anchor='left'
        onClose={ toggleSideMenuDash }
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out', borderRadius: '0px' }}
    >
        <Box sx={{ width: 250, paddingTop: 8 }}>
                <Link display='flex' justifyContent={'center'} sx={{ mb: 2 }} alignItems='center'>
                    <Typography variant='h6'>Angel |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Food</Typography>
                </Link>

                <Divider sx={{mt: 2}}/>

                <ListItemDrawer />
        </Box>
    </Drawer>
    )
}