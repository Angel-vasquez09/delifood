import { Chip, Stack, Link } from '@mui/material'
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
interface ICategorias {
    category: 'Arepas'|'Pizza'|'Hog dog'|'Hambuerguesas'|'Bebidas'|'Combos'|'Adicionales'
}
export const Categorias = () => {

    const categorias: ICategorias[] = [
        {category: 'Arepas'       },
        {category: 'Pizza'        },
        {category: 'Hog dog'      },
        {category: 'Hambuerguesas'},
        {category: 'Bebidas'      },
        {category: 'Combos'       },
        {category: 'Adicionales'  },
    ]

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const { query } = useRouter();
    const { categoria } = query;

    console.log(!!categoria)


    return (
        /* Hacer escrol de categorias */
        <Stack
            sx={{display: 'flex', justifyContent: { xs: 'start', md: 'center'}, overflowX: 'scroll'}}
            direction="row"
            spacing={1}
            className="scroll"
            >

                {
                    categorias.map((item, index) =>

                        (
                            <NextLink key={index} href={`/category/${item.category}`} passHref>
                                <Link>
                                    <Chip
                                        label={item.category}
                                        variant="outlined"
                                        color={ (query.categoria === item.category) ? 'secondary' : 'primary' }
                                        onClick={handleClick}
                                    />
                                </Link>
                            </NextLink>
                        )
                    )
                }
        </Stack>
    )
}
