import { db } from 'database'
import { User } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { jwt } from 'utils'

type Data =
|{ message: string }
|{
    token: string,
    user: {
        email: string,
        role: string,
        name: string
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return checkJWT(req, res)
        default:
            res.status(405).json({ message: 'Method not allowed' })
    }
}

const checkJWT = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { token = '' } = req.cookies;

    let userId = "";

    try {
        userId = await jwt.isValidToken(token);
    } catch (error) {
        return res.status(401).json({ message: 'Token invalido' })
    }

    await db.disconnect();
    const user = await User.findById(userId);
    await db.connect();

    if(!user){
        return res.status(401).json({ message: 'Usuario no existe' })
    }

    const { _id, email, role, name } = user;

    return res.status(200).json({
        token: jwt.singToken( _id, email ),
        user: {
            email,
            role,
            name
        }
    })


}
