import * as React from 'react';
import NextLink from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Chip, Link } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IProduct } from 'interfaces';

interface PropsProduct {
    product: IProduct;
}


export const CardProduct: React.FC<PropsProduct> = ({ product }) => {

    const { title, price, images, slug } = product;

    return (
        <Card sx={{ maxWidth: 345, width: 300, m: 2 }}>
            <NextLink href={`/products/${ slug }`} passHref prefetch={ false }>
                <Link>
                    <CardActionArea>
                        {
                            product.inStock === 0 &&
                            <Chip
                                color="primary"
                                label="No disponible"
                                sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                            />
                        }
                        <CardMedia
                            component="img"
                            height="140"
                            image={images[0]}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Box display="flex" justifyContent='space-between'>
                                <Typography gutterBottom variant="h5" component="div">
                                    { title }
                                </Typography>
                                <FavoriteBorderIcon />
                            </Box>
                            <Typography gutterBottom variant="h6" component="h6">
                            $ { price }
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </NextLink>
        </Card>
    )
}


interface IPromo {
    image: string;
}
export const CardPromo: React.FC<IPromo> = ({ image }) => {
    return (
        <Card sx={{ mr: 2, mt: 2 }} className="cardProduct">
            <NextLink href={`/products/producto?`} passHref prefetch={ false }>
                <Link>
                    <CardActionArea sx={{ display: 'flex'}}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={ image }
                            alt="green iguana"
                        />
                        <CardContent sx={{ position: 'absolute'}}>
                            <Box display="flex" justifyContent='space-between'>
                                <Typography sx={{
                                        borderBottom: '4px solid white',
                                        color: 'white',
                                        borderRadius: '4px',
                                        }}
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    className="cardProduct-text"
                                >
                                Lizard
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </NextLink>
        </Card>
    )
}


