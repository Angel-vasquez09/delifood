import { Grid, Typography } from '@mui/material'
import { CartContext } from 'context';
import { FC, useContext } from 'react';
import { format } from 'utils';

interface Props {
    items?: number;
    to?   : number;
}

export const OrderSummary: FC<Props> = ({items, to}) => {

    const { numberOfItems, total } = useContext(CartContext);
    const numItems = items ? items : numberOfItems;
    const numTotal = to ? to : total;

	return (
		<>
			<Grid container>
			{/* <Box></Box> */}
                <Grid item xs={6}>
	                <Typography variant="h5">No. Productos</Typography>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="end">
			        <Typography>{ numItems } Items</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt: 2}} >
			        <Typography variant="subtitle1">Total</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt: 2}} display="flex" justifyContent="end">
			        <Typography variant="subtitle1">{format(numTotal)}</Typography>
                </Grid>
            </Grid>
		</>
	)
}