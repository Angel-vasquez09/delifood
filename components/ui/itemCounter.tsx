import { FC } from 'react';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material' ;


interface Props{
    currentValue  : number;
    maxValue      : number;
    mediaQuery?   : boolean;
    updateQuantity: (newValue: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updateQuantity, mediaQuery = false }) => {

    const aumValue = () => {
        if(currentValue === maxValue){
            return;
        }
        updateQuantity(currentValue + 1)
    }

    const dismValue = () => {
        if(currentValue === 1){
            return;
        }
        updateQuantity(currentValue - 1)
    }


    return (
        <Box
            display='flex'
            alignItems= 'center'
            sx={{
                width: { xs: '90%', sm: 'auto' },
                borderRadius: '30px',
                border: '2px solid #464953',
                justifyContent: { xs: 'space-between', sm: 'center' },
                padding: { xs: '6px', sm: '0' },
            }}
        >
            <IconButton
                sx={{ p: 0}}
                onClick={ dismValue }
            >
                <Typography
                    variant="h5"
                    sx={{ width: 40, textAlign: 'center', fontSize: { xs: 30, md: 20} }}>-</Typography>
            </IconButton>
            <Typography variant="h5" sx={{ width: 40, textAlign: 'center', fontSize: { xs: 20, md: 20} }}>{ currentValue }</Typography>
            <IconButton
                sx={{ p: 0}}
                onClick={ aumValue }
            >
                <Typography variant="h5" sx={{ width: 40, textAlign: 'center', fontSize: { xs: 30, md: 20} }}>+</Typography>
            </IconButton>
        </Box>
    )
}
