// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from 'database'
import { Product } from '../../../models'
import { IProduct } from './../../../interfaces';

type Data =
     | { message: string }
     | IProduct[]

export default function handler(
     req: NextApiRequest,
     res: NextApiResponse<Data>
) {

     switch (req.method) {
          case 'GET':
               return getProducts(req, res)
          default:
               return res.status(400).json({
                    message: 'Bad Request'
               })
     }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

     const { menu = 'all' } = req.query;

     let condition = {};

     // Valida que el solo busque las categorias que estan en la base de datos
     // hombre, mujer, niños, niñas o todos, pero si escribe alguno diferende
     // Hace la peticion de todos lo que este en la base de datos
     if (menu !== 'all' && SHOP_CONSTANTS.validMenu.includes(`${menu}`)) {
          condition = { menu, inStock: { $gt: 0 } };
     }

     await db.connect();

     const product = await Product.find(condition)
          .select('title images price inStock slug -_id')
          .lean();

     await db.disconnect()

     return res.status(200).json(product)
}
