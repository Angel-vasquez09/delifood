import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from 'database';
import { Order } from 'models';
import { IOrder } from 'interfaces';
import { isValidObjectId } from 'mongoose';

type Data =
| { message: string }
| IOrder[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            return getOrders(req, res)
        case 'PUT':
            return updateEstadoOrder(req, res)
        default:
            return res.status(400).json({ message: 'Not found' });
    }


}

async function getOrders(req: NextApiRequest, res: NextApiResponse<Data>) {


    await db.connect();
    const orders = await Order.find()
        .sort({ createdAt: 'desc' })
        .populate('user', 'name email')
        .lean();
    await db.disconnect();

    return res.status(200).json(orders);
}

async function updateEstadoOrder(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id, estado } = req.body;

    if(!isValidObjectId(id)){
        return res.status(400).json({ message: 'Invalid product id' })
    }

    if(!SHOP_CONSTANTS.validEstados.includes(estado)){
        return res.status(400).json({ message: 'Estado no valido' })
    }

    await db.connect();

    await Order.findByIdAndUpdate(id, { estado }, { new: true });
    await db.disconnect();

    return res.status(200).json({ message: 'Estado actualizado' })
}
