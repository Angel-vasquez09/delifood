import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { Typography, Grid, Box, Button, Chip, Paper, useMediaQuery } from '@mui/material';
import { FoodLayout, ProductSlideShow, SwipeableProduct, DetailProduct } from 'components';
//import { ProductSlideShow, SizeSelector } from '../../components/products';
import { ItemCounter } from 'components';
import { dbProducts } from 'database';
import { ICartProduct, IProduct } from 'interfaces';
import { useProducts } from 'hooks';
import { CartContext } from 'context';

//import { IProduct, ICartProduct, ISize } from 'interfaces';
//import { CartContext } from 'context'
//
/* interface Props{
    product: IProduct;
} */

interface Props {
    product: IProduct
}



const ProductPage: NextPage<Props> = ({ product }) => {

    const router = useRouter();
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
        router.push('/cart')
    }

    const onUpdateQueantity = (quantity: number) => {
        setAuxCartProduct({...auxCartProduct,quantity})
    }

    return (
        <FoodLayout title={'Holaaa'} pageDescripcion="Producto tal" category={false}>
            <Grid container spacing={3}>

                {/* GRID DE SLIDE */}
                <Grid item xs={12} sx={{ position: 'relative'}}>
                    <ProductSlideShow images={product.images} />
                </Grid>

                {/* GRID DE DATOS DEL PRODUCTO */}
                {
                    matches && (
                        <SwipeableProduct product={ product } />
                    )
                }

                <Grid item sx={{ display: {xs: 'none', sm: 'flex'} }} xs={12} display="flex" justifyContent="center">
                    <Box display='flex' flexDirection='column' sx={{ width: {xs: '100%', sm: '70%' } }}>
                        <Paper elevation={3} sx={{ p: 2 }}>

                            <Typography variant='h1' component='h1' noWrap>{ product.title }</Typography>

                            <DetailProduct product={ product } />

                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </FoodLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { slug = '' } = params as { slug: string };
    const product = await dbProducts.getProductBySlug( slug );

    if(!product){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }


    return {
        props: {
            product
        }
    }
}

/* export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const productSlugs = await dbProducts.getAllProductSlugs();

    return {
        paths: productSlugs.map(({ slug }) => ({
            params: { slug }
        })),
        fallback: 'blocking' //
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug = '' } = params as { slug: string };

    const product = await dbProducts.getProductBySlug( slug );

    if(!product){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            product
        },
        revalidate: 86400 // 1 day
    }
}
 */


// Estilos de un chip



export default ProductPage;