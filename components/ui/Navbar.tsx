import { AppBar, Link, Toolbar, Typography, Box, IconButton, Badge, Input, InputAdornment } from '@mui/material'
import React, { useContext } from 'react'
import NextLink from 'next/link';
import { SearchOutlined, ShoppingCartOutlined, Menu } from '@mui/icons-material';
import { CartContext, UiContext } from 'context';
import { MyInput } from './MyInput';

export const Navbar = () => {

    const { toggleSideMenu } = useContext(UiContext);
    const { numberOfItems } = useContext(CartContext);

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Angel |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Food</Typography>
                    </Link>
                </NextLink>

                <Box flex={ 1 }/>

                {/* Buscador */}
                <MyInput side={false} />
                {/* Buscador */}

                <Box flex={ 1 }/>

                <IconButton
                    onClick={ toggleSideMenu }
                    sx={ { display: {xs: 'flex', sm: 'none'}} }>
                    <SearchOutlined />
                </IconButton>


                <NextLink href="/cart" passHref>
                    <Link>
                        <IconButton>
                            <Badge color="secondary" badgeContent={ numberOfItems }>
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <IconButton
                    onClick={ toggleSideMenu }
                    //sx={ { display: {xs: 'flex', sm: 'none'}} }
                >
                    <Menu />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
