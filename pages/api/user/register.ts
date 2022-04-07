import { db } from 'database'
import { User } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { jwt, validations } from 'utils'

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
            return registerUser(req, res)
        default:
            res.status(405).json({ message: 'Method not allowed' })
    }
}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', email = '', pass = '' } = req.body;

    if(name.length < 2){
        return res.status(400).json({ message: 'El nombre debe tener al menos 3 caracteres' })
    }

    if(pass.length < 8){
        return res.status(401).json({ message: 'La contraseña debe tener al menos 8 caracteres' })
    }

    if(!validations.isValidEmail(email)){
        return res.status(400).json({ message: 'Formato de correo invalido' })
    }


    await db.connect();
    const user = await User.findOne({ email });

    if (user) {
        return res.status(401).json({ message: 'Email ya esta registrado' })
    }

    const saveUser = new User({
        name,
        email: email.toLowerCase(),
        pass: bcrypt.hashSync(pass),
        role: 'client'
    })

    try{
        await saveUser.save({ validateBeforeSave: true })
    }catch(error){
        await db.disconnect();
        return res.status(500).json({ message: 'Hubo un error' });
    }

    const { role, _id } = saveUser;

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
