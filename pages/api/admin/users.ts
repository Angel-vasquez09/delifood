import { db } from 'database'
import { IUser } from 'interfaces'
import { User } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';

type Data = 
|{ message: string }
| IUser[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getUsers(req, res)
        case 'PUT':
            return updateUsers(req, res)
        default:
            return res.status(400).json({message: 'Not found'});
    }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect();
    const users = await User.find().select('-pass').lean();
    await db.disconnect();

    return res.status(200).json(users);
}

async function updateUsers(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id = '', role = '' } = req.body;

    const validRole = ['admin','super-user','SEO','client'];


    if(!isValidObjectId(id)){

        return res.status(400).json({message: 'No existe usuaio con ese id'});
    }


    if(!validRole.includes(role)){
        return res.status(400).json({message: 'No es un rol valido'});
    }

    await db.connect();
    const user = await User.findById(id);

    if (!user) {
        await db.disconnect()
        return res.status(404).json({ message: 'User no encontrado' }) 
    };

    user.role = role;
    await user.save();
    await db.disconnect();

    return res.status(200).json({ message: 'Usuario actualizado' });
}

