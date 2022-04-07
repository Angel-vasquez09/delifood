import { Box, Typography } from "@mui/material";
import { FoodLayout } from "components";

const Page404 = () => {
    return (
        <FoodLayout title="Pagina no encontrada" pageDescripcion="No hay nada que mostrar" category={false}>
            <Box
                display='flex'
                justifyContent="center"
                alignItems='center'
                height="calc(100vh - 200px)"
                sx={{ flexDiretion:  {xs: 'column', sm: 'row'}  }}
                >
                <Typography variant="h1" component='h1' fontSize={80} fontWeight={200}>404 |</Typography>
                <Typography marginLeft={2}>Pagina no encontrada</Typography>
            </Box>
        </FoodLayout>
    )
}

export default Page404;