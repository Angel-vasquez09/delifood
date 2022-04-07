import { Typography }    from '@mui/material';
import type { NextPage } from 'next'

import { FoodLayout, CardList, ScreenLoading } from 'components';
import { useProducts } from 'hooks';

const Home: NextPage = () => {

  const { products, isLoading } = useProducts("/products");


  return (
    <FoodLayout title={'Food'} pageDescripcion={'Encuentra tu antojo'} category={true}>
      <Typography variant="h1" sx={{ mt: 2 }}>Food</Typography>
      <Typography variant="h2">Todos los productos</Typography>
        {
          isLoading
          ? <ScreenLoading />
          : <CardList
              products={ products }
            />
        }
    </FoodLayout>
  )
}

export default Home
