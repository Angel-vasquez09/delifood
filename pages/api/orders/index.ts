import { db } from 'database'
import { IOrder } from 'interfaces'
import { Order, Product } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type Data =
| { message: string }
| IOrder

export default function handdler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrder(req, res)
        default:
            res.status(405).json({ message: 'Method not allowed' })
    }

}


async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { orderItems, total } = req.body as IOrder;

    // Verificar que el usuario este autenticado
    const session: any = await getSession({ req });

    if(!session) {
        return res.status(401).json({ message: 'Debe esta autenticado' })
    }

    // Crear un arreglo con los productos que el usuario quiere comprar
    const productsId = orderItems.map(item => item._id);
    await db.connect();

    // Obtener todos los productos de la base de datos que esten en la lista (productsId)
    const dbProducts = await Product.find({ _id: { $in: productsId } });


    try {

        const backenTotal = orderItems.reduce((prev, current) => {
            const productPrice = dbProducts.find(product => product.id === current._id)?.price
            if(!productPrice) {
                throw new Error('Verifique el carrito de nuevo, producto no encontrado')
            }
            return prev + (productPrice * current.quantity)
        },0)

        if(total !== backenTotal){
            throw new Error('El total no coincide con el monto')
        }

        // TODO:  todo bien, todo correcto
        const userId = session.user._id;
        const newOrder = new Order({...req.body, isPaid: false, user: userId});
        newOrder.total = Math.round(newOrder.total * 100) / 100; // Redondear el total a 2 decimales
        await newOrder.save();
        return res.status(201).json( newOrder );


    } catch (error: any) {
        await db.disconnect();
        console.log(error)
        return res.status(400).json({
            message: error.message || 'Revise logs del servidor'
        })
    }

}

