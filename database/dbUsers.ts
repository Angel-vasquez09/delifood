import { db } from "database";
import { User } from "models";
import bcrypt from 'bcryptjs';


export const checkUserEmailPassword = async (email: string, password: string) => {

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if(!user){
        return null;
    }

    if(!bcrypt.compareSync(password, user.pass!)){
        return null;
    }

    const { role, name, _id } = user;

    return {
        role,
        name,
        _id,
        email: email.toLocaleLowerCase()
    }

}

// Crear usuario mediante autenticacion por red social
export const createToDbUser = async(oAuthEmail: string, oAuthName: string) => {
    /*
    * Si un usuario intenta iniciar sesion con  una red social
    * primero verificamos si el usuario ya existe en la base de datos
    * si no existe lo creamos
    */
    await db.connect();
    const user = await User.findOne({ email: oAuthEmail });
    if(user){
        // Si existe en la base de datos lo retornamos
        await db.disconnect();
        const { role, name, _id, email } = user;
        return {
            role,
            name,
            _id,
            email: email.toLocaleLowerCase()
        };
    }

    // Si no existe en la base de datos lo creamos y retornamos
    const newUser = new User({
        email: oAuthEmail,
        name: oAuthName,
        role: 'client',
        pass: '@',
    })
    await newUser.save();
    await db.disconnect();

    const { role, name, _id, email } = newUser;

    return {
        role,
        name,
        _id,
        email: email.toLocaleLowerCase()
    }

}