import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { CardProduct, CardPromo } from './CardProduct';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};



export const PromoList = () => {
    return (
        <Box sx={{ mb: 5, mt: 2 }}>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                keyBoardControl={true}
                customTransition="all .5s"
                transitionDuration={200}
                containerClass="carousel-container"
                /* removeArrowOnDeviceType={["tablet", "mobile"]} */
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                >
                <CardPromo image = "https://media.istockphoto.com/photos/fast-food-items-like-hot-dogs-hamburgers-fries-and-pizza-picture-id180258510?k=20&m=180258510&s=612x612&w=0&h=GCtwnFdBO9WCOvW00g1ccU28yZJtyg0bXpcVHlVoT34=" />
                <CardPromo image = "https://st3.depositphotos.com/1027198/13417/i/1600/depositphotos_134178106-stock-photo-assorted-junk-food.jpg" />
                <CardPromo image = "https://s03.s3c.es/imag/_v0/770x420/2/8/d/Comida-basura.jpg" />
                <CardPromo image = "https://media.istockphoto.com/photos/fast-food-items-like-hot-dogs-hamburgers-fries-and-pizza-picture-id180258510?k=20&m=180258510&s=612x612&w=0&h=GCtwnFdBO9WCOvW00g1ccU28yZJtyg0bXpcVHlVoT34=" />
                <CardPromo image = "https://st3.depositphotos.com/1027198/13417/i/1600/depositphotos_134178106-stock-photo-assorted-junk-food.jpg" />
                <CardPromo image = "https://s03.s3c.es/imag/_v0/770x420/2/8/d/Comida-basura.jpg" />
            </Carousel>
        </Box>
    );
}
