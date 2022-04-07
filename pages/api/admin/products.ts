import { db } from 'database'
import { IProduct } from 'interfaces'
import { Product } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data =
|{ message: string }
| IProduct[]
| IProduct
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
        case 'POST':
            return createProduct(req, res)
        case 'PUT':
            return updateProduct(req, res)
        default:
            return res.status(405).json({ message: 'Method not allowed' })

    }

}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect();
    const products = await Product.find()
        .sort({ title: 'asc' })
        .lean();
    await db.disconnect();

    return res.status(200).json(products)
}



async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { images = [] } = req.body as IProduct;

    if(images.length < 2){
        return res.status(400).json({ message: 'Es necesario dos imagenes' })
    }

    try {
        await db.connect();
        const productInDb = await Product.findOne({ slug: req.body.slug });
        if(productInDb){
            await db.disconnect()
            return res.status(400).json({ message: 'Ya existe un producto con ese slug' })
        }
        const product = new Product(req.body);
        await product.save();
        await db.disconnect();

        return res.status(201).json(product);
    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(500).json({ message: 'Error al crear el producto' })

    }
}




async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { _id = '', images = [] } = req.body as IProduct;

    if(!isValidObjectId(_id)){
        return res.status(400).json({ message: 'Invalid product id' })
    }

    if(images.length < 2){
        return res.status(400).json({ message: 'Es necesario dos imagenes' })
    }

    try {
        await db.connect();

        const product = await Product.findById(_id);
        if(!product){
            return res.status(404).json({ message: 'Mo existe un producto con ese ID' })
        }

        product.images.forEach(async(img) => {
            if(!images.includes(img)){
                // Borramos de cloudinary
                const [fileId, extencion] = img.substring(img.lastIndexOf('/') + 1).split('.');
                console.log(fileId, extencion)
                await cloudinary.uploader.destroy(fileId);
            }
        })

        await product.update(req.body);
        await db.disconnect();

        return res.status(200).json(product);
    } catch (error) {
        console.log(error)
        await db.disconnect();
        return res.status(500).json({ message: 'Error al actualizar el producto' })
    }
}

