import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces'

const productSchema = new Schema({
    description:{
        type: String, required: true
    },
    images:[
        { type:String }
    ],
    inStock:{
        type: Number, required: true, default: 0
    },
    price:{
        type: Number, required: true, default: 0
    },
    slug:{type: String, required: true, unique: true},
    tags:[ {type: String} ],
    title:{type:String, required: true, default: ''},
    menu:{
        type: String,
        enum: {
            values: ['Arepas','Pizza','Hog dog','Hamburguesas','Bebidas','Combos','Adicionales'],
            message: '{VALUE} no es un menu valido'
        },
        default: 'Arepas'
    }
},{
    timestamps: true
})


// TODO: Crear indice de Mongo
productSchema.index({ title: 'text', tags: 'text' })

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema)

export default Product;