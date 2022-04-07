// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { Product } from '../../../models'
import { IProduct } from './../../../interfaces';

type Data = 
| { message: string }
| IProduct[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

     switch(req.method){
          case 'GET':
               return searchProduct(req, res)
          default: 
               return res.status(400).json({
                    message: 'Bad Request'
               })
     }
}

const searchProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) =>  {

     
     await db.connect();
     
     let { q = '' } = req.query;

     if(q.length === 0){
          return res.status(400).json({
               message: 'Debe especificar el query de busqueda'
          })
     }
     //* Convertir todo a minuscula
     q = q.toString().toLowerCase();
     const product = await Product.find({
          $text: { $search: q }
     })
     .select('title images price inStock slug -_id')
     .lean();

     await db.disconnect()

     if(!product){
          return res.status(404).json({ message: "No existe el producto"})
     }

     return res.status(200).json( product );
}
