import { db } from 'database';
import { Order, Product, User } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    numberOfOrders         : number;
    paidOrders             : number;
    notPaidOrders          : number;
    numberOfClients        : number;
    numberOfProducts       : number;
    productsWithNoInventory: number;
    lowInventory           : number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect();

    const [ // Resolver varias promises en una sola, es mas rapido que hacerlo individualmente
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory
    ] = await Promise.all([
        Order.count(),
        Order.find({estado: { $eq: 'Entregado'}}).count(),
        User.find({role: 'client'}).count(),
        Product.find().count(),
        Product.find({inStock: 0}).count(),
        Product.find({inStock: {$lte: 10}}).count()
    ])
    await db.disconnect();

    return res.status(200).json({
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders: numberOfOrders - paidOrders,
    });
}