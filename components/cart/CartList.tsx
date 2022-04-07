import React, { FC, useContext } from 'react'
import NextLink from 'next/link';
import { CardActionArea, CardMedia, Grid, Typography, Box, Link,Button, Card  } from '@mui/material'
import { ItemCounter } from '../ui'
import { CartContext } from 'context';
import { ICartProduct, IOrderItem } from 'interfaces';

interface Props{
    editable: boolean,
    product?: IOrderItem[]
}

export const CartList: FC<Props> = ({ editable, product }) => {

    const { cart, updateCartQuantity, deleteProductCart  } = useContext(CartContext);

    const updateQuantityCartAndCookie = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity(product);
    }

    const onDeleteProduct = (product: ICartProduct) => {
        deleteProductCart(product);
    }

    const productToShow = product ? product : cart;

	return (
		<Box sx={{ p: { sm: 1 } }}>
			{
                productToShow.map(product => (
                    <Card key={product.slug}  sx={{ display: 'flex', alignItems: 'center', mb: 2, height: {xs: '80px', lg: '145px'} }}>
                        <Grid spacing={1} container>
                            <Grid item xs={4}>
                                <NextLink href={`/products/${product.slug}`} passHref>
                                    <Link>
                                        <CardActionArea>
                                            <CardMedia
                                                image={`${product.images}`}
                                                component='img'
                                                sx={ { borderRadius: '5px', objectFit: 'cover'} }
                                            />
                                        </CardActionArea>
                                    </Link>
                                </NextLink>
                            </Grid>

                            <Grid item xs={5}  display="flex" alignItems={'center'}>
                                <Box display="flex" justifyContent={'center'} flexDirection="column">
                                    <Typography noWrap variant="h5" sx={{ width: { xs: '120px', md: 'auto' }, mb: { xs: 1, md: 2}, fontSize: { xs: 14, md: 20 } }}>{ product.title }</Typography>
                                    {
                                        editable
                                        ? <ItemCounter
                                            currentValue={product.quantity}
                                            maxValue={ 10 }
                                            updateQuantity={ (value: number) => updateQuantityCartAndCookie(product as ICartProduct,value) } />
                                        : <Typography variant="h5">{product.quantity} Producto(s)</Typography>
                                    }
                                </Box>
                            </Grid>

                            <Grid item xs={3} display="flex" justifyContent={'center'} alignItems="center" flexDirection="column">
                                <Typography sx={{fontSize: { xs: 14, md: 20 }}} variant="subtitle1">${ product.price }</Typography>
                                {
                                    editable && (
                                        <Button
                                            onClick={() =>  onDeleteProduct(product as ICartProduct) }
                                            variant="text"
                                            color="error">
                                            Remover
                                        </Button>
                                    )
                                }
                            </Grid>

                        </Grid>
                    </Card>
                ))
            }
		</Box>
	)
}