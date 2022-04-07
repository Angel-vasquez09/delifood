import React from 'react'
import NextLink from 'next/link'
import { Typography, Box, Link } from '@mui/material'
import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { FoodLayout } from 'components'


const EmptyPage = () => {
	return (
            <FoodLayout title="Carrito Vacio" pageDescripcion="No hay articulos en el carrito de compras" category={false}>
                <Box
                    display='flex'
                    justifyContent="center"
                    alignItems='center'
                    height="calc(100vh - 200px)"
                    sx={{ flexDiretion:  {xs: 'column', sm: 'row'}  }}
                    >
                        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />

                        <Box display="flex" flexDirection="column" alignItems="center" >
                            <Typography marginLeft={2}>Su carrido esta vacion</Typography>
                            <NextLink href="/" passHref>
                                <Link typography="h4" color="secondary">
                                    Regresar
                                </Link>
                            </NextLink>

                        </Box>

                </Box>
            </FoodLayout>
	)
}

export default EmptyPage;