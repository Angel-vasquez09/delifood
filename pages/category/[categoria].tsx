import { Typography } from '@mui/material'
import { CardList, FoodLayout } from 'components'
import { dbProducts } from 'database'
import { useProducts } from 'hooks'
import { IProduct } from 'interfaces'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
    products : IProduct[];
    categoria: string;
}

const Categoria: NextPage<Props> = ({ products, categoria }) => {

    return (
        <FoodLayout title={products[0].menu} pageDescripcion={`Las mejores ${ products[0].menu } de cartagena`} category={true}>
            <Typography variant="h1" sx={{ mt: 2 }}>Food</Typography>
            <Typography variant="h2">{ products[0].menu }</Typography>
            <CardList
                products={ products }
            />
        </FoodLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { categoria = '' } = params as { categoria: string };
    const products = await dbProducts.getProductByCategoria( categoria );

    if(!products){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }


    return {
        props: {
            products,
            categoria
        }
    }
}

export default Categoria