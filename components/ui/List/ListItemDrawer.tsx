import { CategoryOutlined, ConfirmationNumber, ConfirmationNumberOutlined, ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, Divider, Link, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import React, { FC } from 'react'
import { MyListItem } from './ListItem'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useRouter } from 'next/router';

interface Props {
    open?: boolean;
}

export const ListItemDrawer: FC<Props> = ({ open = true }) => {

    const { asPath, push } = useRouter();


    const [ openCollapse, setOpenCollapse ] = React.useState({
        openUser     : false,
        openProductos: false
    });
    const { openUser, openProductos } = openCollapse;

    const handleCollapse = ( collapse: string, open: boolean ) => {
        setOpenCollapse({
            ...openCollapse,
            [collapse]: open
        });
    }

    const navigateTo = (url: string) => {
        push(url);
    }

    return (
        <>
            <List>

                <MyListItem
                    open={open}
                    onClick={ () => navigateTo('/admin') }
                    className={asPath === '/admin' ? 'activate' : ''}
                    title={'Dashboard'}
                    icon={
                        <ConfirmationNumberOutlined
                            className={`listIcon ${asPath === '/admin' ? 'item' : ''}`}
                        />}
                />

                <ListItem
                    className={asPath === '/admin/products' ? 'listSide activate' : 'listSide'}
                    button
                    onClick={() => handleCollapse('openProductos', !openProductos)}>
                    <ListItemIcon>
                        <InboxIcon
                            className={`listIcon ${asPath === '/admin/products' ? 'item' : ''}`}
                        />
                    </ListItemIcon>
                    <Typography
                        sx={{ opacity: open ? 1 : 0 }}
                        variant='subtitle2'>Productos</Typography>
                    {openProductos ? <ExpandLess sx={{ ml: 5 }} /> : <ExpandMore sx={{ ml: 5 }} />}
                </ListItem>
                <Collapse in={openProductos} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                        <MyListItem
                            sx={{ pl: 4 }}
                            onClick={ () => navigateTo('/admin/products') }
                            className={asPath === '/admin/products' ? 'activate' : ''}
                            open={open}
                            title={'Lista Producto'}
                            icon={
                                <CategoryOutlined
                                    className={`listIcon ${asPath === '/admin/products' ? 'item' : ''}`}
                                />}
                        />

                        <MyListItem
                            sx={{ pl: 4 }}
                            open={open}
                            onClick={ () => navigateTo('/admin/products/new') }
                            className={asPath === '/admin/products/newProducto' ? 'activate' : ''}
                            title={'Add Producto'}
                            icon={
                                <CategoryOutlined
                                    className={`listIcon ${asPath === '/admin/products/new' ? 'item' : ''}`}
                                />}
                        />

                    </List>
                </Collapse>

                <MyListItem
                    open={open}
                    onClick={ () => navigateTo('/admin/orders') }
                    title={'Ordenes'}
                    className={asPath === '/admin/orders' ? 'activate' : ''}
                    icon={
                        <ConfirmationNumber
                            className={`listIcon ${asPath === '/admin/orders' ? 'item' : ''}`}
                        />}
                />

                <ListItem
                    className={asPath === '/admin/orders' ? 'listSide activate' : 'listSide'}
                    button onClick={() => handleCollapse('openUser', !openUser)}>
                    <ListItemIcon>
                        <InboxIcon
                            className={`listIcon ${asPath === '/admin/orders' ? 'item' : ''}`}
                        />
                    </ListItemIcon>
                    <Typography
                        sx={{ opacity: open ? 1 : 0 }}
                        variant='subtitle2'>Usuarios</Typography>
                    {openUser ? <ExpandLess sx={{ ml: 5 }} /> : <ExpandMore sx={{ ml: 5 }} />}
                </ListItem>
                <Collapse in={openUser} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <MyListItem
                            sx={{ pl: 4 }}
                            open={open}
                            onClick={ () => navigateTo('/admin/users') }
                            className={asPath === '/admin/users' ? 'activate' : ''}
                            title={'List Usuario'}
                            icon={
                                <CategoryOutlined
                                    className={`listIcon ${asPath === '/admin/users' ? 'item' : ''}`}
                                />}
                        />
                    </List>
                </Collapse>

            </List>
        </>
    )
}
