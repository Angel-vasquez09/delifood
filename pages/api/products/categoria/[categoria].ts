// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../../database'
import { Product } from '../../../../models'
import { IProduct } from '../../../../interfaces';

type Data =
    | { message: string }
    | IProduct[]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'GET':
            return getProductByCategoria(req, res)
        default:
            return res.status(400).json({
                message: 'Bad Request'
            })
    }
}

const getProductByCategoria = async (req: NextApiRequest, res: NextApiResponse<Data>) => {


    await db.connect();

    const { categoria } = req.query;
    const products = await Product.find({ menu: categoria }).lean();

    await db.disconnect()

    if (!products) {
        return res.status(404).json({ message: "No existe el categoria" })
    }

    return res.json(products);
}
