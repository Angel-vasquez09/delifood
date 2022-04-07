import jwt from 'jsonwebtoken';



export const singToken = (_id: string, email: string) => {
    if(!process.env.JWT_SECRET_SEED) {
        throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign(
        // Payload
        { _id, email },
        // Secret
        process.env.JWT_SECRET_SEED,
        // Opciones
        { expiresIn: '30d' }
    )
}

export const isValidToken = (token: string): Promise<string> => {

    if(!process.env.JWT_SECRET_SEED) {
        throw new Error('JWT_SECRET is not defined, revisa las variables de entorno');
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if(err) return reject('TOKEN no valido');

                const { _id } = payload as { _id: string };
                resolve( _id )
            })
        } catch (error) {
            reject('TOKEN no valido');
        }
    })
}