import axios from 'axios'
import { db } from 'database'
import { Order } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return payOrder(req, res) // Con paypal
        case 'PUT':
            return Encargar(req, res) // Orden en proceso
        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }

}

const getPaypalBererToken = async (): Promise<string | null> => {
    const PAYPAL_ID = process.env.NEXT_PUBLIC_PAYPAL_ID;
    const PAYPAL_SECRET =process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${PAYPAL_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');

    try {


        const { data } = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${base64Token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        return data.access_token;

    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response!.data)
            console.log("Error al obtener el token de paypal con axios")
        }else{
            console.log("Error al obtener el token de paypal")
            console.log(error)
        }

        return null;
    }
}

async function payOrder(req: NextApiRequest, res: NextApiResponse<Data>) {

    const paypalBearerToken = await getPaypalBererToken();

    if(!paypalBearerToken){
        return res.status(400).json({ message: 'Error al obtener el token de paypal' })
    }

    const { transaction, orderId } = req.body;

    // validar si es mongo id valido
    if(!isValidObjectId(orderId)){
        return res.status(400).json({ message: 'El id del pedido no es valido' })
    }

    const { data } = await axios.get(`${process.env.PAYPAL_ORDERS_URL}/${transaction}`,{
        headers: {
            'Authorization': `Bearer ${paypalBearerToken}`
        }
    })

    if(data.status !== 'COMPLETED'){
        return res.status(401).json({ message: 'La orden no se completo' })
    }

    await db.connect();

    const order = await Order.findById(orderId);

    if(!order){
        await db.disconnect();
        return res.status(400).json({ message: 'Orden no encontrada en la base de datos' })
    }


    if(order.total !== Number(data.purchase_units[0].amount.value)){
        await db.disconnect();
        return res.status(400).json({ message: 'El monto de paypal y la orden no coinciden' })
    }

    order.transactionId = transaction;
    order.isPaid = true;
    await order.save();

    await db.disconnect();

    return res.status(200).json({ message: 'Orden pagada !!!' })
}

export const Encargar = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { orderId } = req.body;

    // validar si es mongo id valido
    if(!isValidObjectId(orderId)){
        return res.status(400).json({ message: 'El id del pedido no es valido' })
    }

    await db.connect();

    const order = await Order.findById(orderId);

    if(!order){
        await db.disconnect();
        return res.status(400).json({ message: 'Orden no encontrada en la base de datos' })
    }

    order.isPaid = true;
    await order.save();

    await db.disconnect();

    return res.status(200).json({ message: 'Orden pagada !!!' })
}
