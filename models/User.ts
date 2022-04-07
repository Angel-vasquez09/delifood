
import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from 'interfaces'

const userSchema = new Schema({

    name : { type: String, required: true },
    email: { type: String, unique: true, required: true },
    pass : { type: String, required: true },
    role : {
        type: String,
        enum: {
            values: ['admin','super-user','SEO','client'],
            message: '{VALUE} no es un rol valido',
            required: true
        },
        default: 'client'
    },

},{
    timestamps: true
})



const User: Model<IUser> = mongoose.models.User || model('User', userSchema)

export default User;