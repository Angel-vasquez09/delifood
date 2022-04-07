import { DashboardLayout } from 'components'
import React from 'react'
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import { IProduct} from 'interfaces';
import useSWR from 'swr';
import NextLink from 'next/link';

const columns: GridColDef[] = [
    {
        field: 'img',
        headerName: 'FOTO',
        align: 'center',
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <a href={`/products/${row.slug}`} target="_blank" rel='noreferrer'>
                    <CardMedia
                        component="img"
                        className="fadeIn"
                        image={`${row.img}`}
                    />
                </a>
            )
        }
    },
    {
        field: 'title',
        headerName: 'TITULO',
        align: 'center',
        width: 200,
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <NextLink href={`/admin/products/${row.slug}`} passHref>
                    <Link underline='always'>
                        {row.title}
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'inStock',   headerName: 'STOCK'    ,align: 'center'             },
    { field: 'price',     headerName: 'PRECIO'   ,align: 'center'             },
    { field: 'categoria', headerName: 'CATEGORIA',align: 'center'             }
]



const ProductsPage = () => {

    const { data, error } = useSWR<IProduct[]>('/api/admin/products');

    if(!error && !data){
        return <></>
    }
    const rows = data!.map(product => ({
        id       : product._id,
        img      : product.images[0],
        title    : product.title,
        inStock  : product.inStock,
        price    : product.price,
        slug     : product.slug,
        categoria: product.menu
    }))

    return (
        <DashboardLayout title={'Producto'} pageDescripcion={'Detalles del producto'}>

                <Box display="flex" justifyContent={'end'} sx={{mb: 2}}>
                    <Button
                        className="circular-btn"
                        startIcon={<AddOutlined />}
                        color="primary"
                        href={'/admin/products/new'}
                    >
                        Crear producto
                    </Button>
                </Box>

                <Grid container>

                    <Grid item xs={12} sx={{height: 500, width: '100%'}} >
                        <DataGrid
                            rows={ rows }
                            columns={ columns }
                            pageSize={ 10 }
                            rowsPerPageOptions={ [10] }
                        />
                    </Grid>

                </Grid>


        </DashboardLayout>
    )
}

export default ProductsPage