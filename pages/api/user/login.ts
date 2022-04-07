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
        case 'POST':
            return loginUser(req, res)
        default:
            res.status(405).json({ message: 'Method not allowed' })
    }
}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', pass = '' } = req.body;

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if (!user) {
        return res.status(401).json({ message: 'Email o pass no encontrado - EMAIL' })
    }

    if (!bcrypt.compareSync(pass, user.pass!)) {
        return res.status(401).json({ message: 'Email o pass no encontrado - PASS' })
    }

    const { role, name, _id } = user;

    const token = jwt.singToken(_id, email);

    return res.status(200).json({
        token,
        user: {
            email,
            role,
            name
        }
    })


}