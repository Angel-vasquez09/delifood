import React, { FC } from 'react'
import { Box } from '@mui/material';
import Head from 'next/head';

import { Categorias, SideMenu, Navbar, PromoList } from 'components';

interface Props {
    title: string;
    pageDescripcion: string;
    category: boolean;
}

export const FoodLayout: FC<Props> = ({children,title,pageDescripcion, category}) => {
    return (
        <>
            <Head>
                <title>{title}</title>

                <meta name="description" content={pageDescripcion}/>
                <meta name="og:title" content={title}/>
                <meta name="og:description" content={pageDescripcion}/>
            </Head>
            <nav>
                <Navbar />
            </nav>

            <SideMenu />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 10px'
            }}>

                {
                    category && (
                        <>
                        <PromoList />
                        <Categorias />
                        </>
                    )
                }

                { children }
            </main>

            <footer>

            </footer>
        </>
    )
}
