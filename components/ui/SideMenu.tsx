import { useContext, useState } from 'react';
import { Box, Divider, Drawer, Link, List, ListItem, ListItemIcon, ListSubheader, Typography } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumber, ConfirmationNumberOutlined, DashboardOutlined, LoginOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { AuthContext, UiContext } from 'context';
import { useRouter } from 'next/router'
import { MyInput } from './MyInput';

export const SideMenu = () => {

    const router = useRouter();
    const { user, isLoggedIn, logoutUser } = useContext(AuthContext);
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

    const [ search, setSearchTerm ] = useState('');

    const onSearchTerm = () => {
        if(search.trim().length === 0) return;
        navigateTo(`/search/${search}`)
    }

    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    }

    return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        onClose={ toggleSideMenu }
        sx={{
            backdropFilter: 'blur(4px)',
            transition: 'all 0.5s ease-out',
            borderRadius: '30px 0px 0px 30px',
            height: '100%',
        }}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>

            <List>

                <Link display='flex' justifyContent={'center'} sx={{ mb: 2}} alignItems='center'>
                    <Typography variant='h6'>Angel |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Food</Typography>
                </Link>

                <Divider sx={{mb: 2}} />

                <ListItem sx={{ display: 'flex', justifyContent: 'center'}}>
                    <MyInput side={true} />
                </ListItem>

                <Divider sx={{mt: 2}}/>

                {
                    isLoggedIn && (
                        <ListItem button className='listSide' onClick={ () => navigateTo('/orders/history') }>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined className='listIcon'/>
                            </ListItemIcon>
                            <Typography variant='h5'>Mis Ordenes</Typography>
                        </ListItem>
                    )
                }


                {
                    !isLoggedIn ? (
                        <ListItem button className='listSide' onClick={() => navigateTo(`/auth/login?p=${ router.asPath }`)}>
                            <ListItemIcon>
                                <VpnKeyOutlined className='listIcon'/>
                            </ListItemIcon>
                            <Typography variant='h5'>Ingresar</Typography>
                        </ListItem>
                    ):(
                        <ListItem button className='listSide' onClick={logoutUser}>
                            <ListItemIcon>
                                <LoginOutlined className='listIcon'/>
                            </ListItemIcon>
                            <Typography variant='h5'>Salir</Typography>
                        </ListItem>
                    )
                }



                {/* Admin */}
                {
                    user && user?.role === 'admin' && (
                        <>
                        <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem button className='listSide' onClick={() => navigateTo(`/admin`)}>
                                <ListItemIcon >
                                    <DashboardOutlined className='listIcon' />
                                </ListItemIcon>
                                <Typography variant='h5'>Dashboard</Typography>
                            </ListItem>
                        </>
                    )
                }
            </List>
        </Box>
    </Drawer>
    )
}