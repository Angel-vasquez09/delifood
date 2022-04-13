import { Typography } from '@mui/material'
import { CardList, FoodLayout } from 'components'
import { useProducts } from 'hooks'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { ScreenLoading } from '../../components/ui/ScreenLoading';


const Categoria: NextPage = () => {

    const { query } = useRouter();
    const { products, isLoading } = useProducts(`/products/categoria/${query.categoria}`);

    return (
        <FoodLayout title={`${query.categoria}`} pageDescripcion={`Las mejores ${query.categoria } de cartagena`} category={true}>
            <Typography variant="h1" sx={{ mt: 2 }}>Food</Typography>
            <Typography variant="h2">{ query.categoria }</Typography>
            {
                isLoading
                ? <ScreenLoading />
                : <CardList
                    products={ products }
                    />
            }
        </FoodLayout>
    )
}

export default Categoria