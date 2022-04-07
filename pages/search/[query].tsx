import type { NextPage, GetServerSideProps } from 'next'
import { Typography }    from '@mui/material';
import { CardList, FoodLayout }    from 'components'
import { dbProducts } from 'database';
import Product from '../../models/Product';
import { IProduct } from 'interfaces';


interface Props{
     foundProducts: boolean;
     products     : IProduct[];
     query        : string;
}

const SearchPage: NextPage<Props> = ({ foundProducts, products, query }) => {

     return (
     <FoodLayout title={'Shop Search'} pageDescripcion={'Encuentra la ropa que quieras'} category={false}>
          <Typography variant='h1' component='h1'>Buscar Productos</Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>
               { foundProducts ? query : `No existe '${query}' pero te pueden gustar estos: :)` }
          </Typography>

               <CardList products={ products }/>
     </FoodLayout>
     )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

     const { query = '' } = params as { query: string };

     if(query.length === 0){
          return {
               redirect:{
                    destination: '/',
                    permanent: false
               }
          }
     }

     let products = await dbProducts.getProductByTerm( query );

     const foundProducts = products.length > 0;

     if(!foundProducts){
          products = await dbProducts.getAllProduct();
     }

     return {
          props: {
               foundProducts,
               products,
               query
          }
     }
}

export default SearchPage
