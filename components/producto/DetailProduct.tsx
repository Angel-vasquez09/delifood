import React,{ FC, useContext, useState } from 'react'
import { useRouter } from 'next/router';

import { CartContext } from 'context';
import { ICartProduct, IProduct } from 'interfaces';
import { Box, Button, Chip, Typography, useMediaQuery } from '@mui/material';
import { ItemCounter } from 'components/ui';
interface Props {
    product: IProduct;
}
export const DetailProduct: FC<Props> = ({ product }) => {

    const { push, asPath } = useRouter();
    const { addCartProduct } = useContext(CartContext);
    const matches = useMediaQuery('(max-width:600px)');

    const [ auxCartProduct, setAuxCartProduct ] = useState<ICartProduct>({
        _id         : product._id,
        images      : product.images[0],
        price       : product.price,
        slug        : product.slug,
        menu        : product.menu,
        title       : product.title,
        quantity    : 1
    })




    const onAddCart = () => {
        addCartProduct(auxCartProduct)
        push('/cart')
    }

    const onUpdateQueantity = (quantity: number) => {
        setAuxCartProduct({...auxCartProduct,quantity})
    }

    return (
        <>

            <Box
                display="flex"
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={{ my: 6, display: { xs: 'none', sm: 'flex'} }}>

                <Typography sx={{ fontSize: 24 }} variant='subtitle2' component='h2'>$ { product.price }</Typography>

                <ItemCounter
                    currentValue={auxCartProduct.quantity}
                    maxValue={3}
                    updateQuantity={onUpdateQueantity}
                />
            </Box>

            <Box sx={{ my: 6, display: { xs: 'flex', sm: 'none' }, justifyContent: 'center' }}>
                <ItemCounter
                    mediaQuery={true}
                    currentValue={auxCartProduct.quantity}
                    maxValue={3}
                    updateQuantity={onUpdateQueantity}
                />
            </Box>

            {/*  Descripcion */}

            <Box>
                <Typography variant='h2'>Descripcion</Typography>
                <Typography variant='body2'>{ product.description }</Typography>
            </Box>
            {/* onClick={ onAddCart } */}
            <Box display={'flex'} justifyContent='center' sx={{ mt: 5 }}>
                {
                    (product.inStock > 0) ? (
                        <Button onClick={ onAddCart } size='large'  color="primary" className="circular-btn">
                            Agregar al carrito
                        </Button>
                    ): (
                        <Chip label="No hay disponibles" color="error" variant="outlined"/>
                        )
                }
            </Box>
        </>
    )
}

export default DetailProduct