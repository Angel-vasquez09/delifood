import { Box } from '@mui/material';
import { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styleSlide from './ProductSlideShow.module.css'

interface Props{
    images: string[];
    screenAuto?: boolean;
}



export const ProductSlideShow: FC<Props> = ({ images, screenAuto = false }) => {

    return (
        <Slide
            easing="ease"
            duration={7000}
            indicators
        >
            {
                images.map(img => {
                    const url = img
                    return (
                        <div
                            className={styleSlide['each-slide'] }
                            key={img}>
                            <div style={{
                                backgroundImage: `url(${url})`,
                                backgroundSize: 'cover'
                            }}>
                            </div>
                        </div>
                    )
                })
            }
        </Slide>
    )
}

{/* <Slide
            easing="ease"
            duration={7000}
            indicators
        > : 
            {
                images.map(img => {
                    const url = `/products/${img}`
                    return (
                        <div className={styleSlide['each-slide']} key={img}>
                            <div style={{
                                backgroundImage: `url(${url})`,
                                backgroundSize: 'cover'
                            }}>
                            </div>
                        </div>
                    )
                })
            }
        </Slide> */}