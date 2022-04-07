import { PropsOf } from '@emotion/react';
import { Box } from '@mui/material'
import { IProduct } from 'interfaces'
import React, { FC } from 'react'
import { CardProduct } from './CardProduct'

interface Props {
    products: IProduct[];
}

export const CardList: FC<Props> = ({ products }) => {

    return (
        <Box display={'flex'} justifyContent='center' flexWrap='wrap'>
            {
                products.map((product, index) => (
                    <CardProduct
                        key={ index }
                        product={ product }
                    />
                ))
            }
        </Box>
    )
}
