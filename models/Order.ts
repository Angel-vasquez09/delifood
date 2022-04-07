
import mongoose, { Schema, model, Model } from 'mongoose';
import { IOrder } from 'interfaces'

const orderSchema = new Schema({

    user : { type: Schema.Types.ObjectId, ref: 'User', required: true }, // informacion del usuario
    orderItems: [ // Productos del pedido
        {
            _id     : { type: Schema.Types.ObjectId, ref: 'Product', required: true},
            images  : { type: String, required: true},
            price   : { type: Number, required: true},
            slug    : { type: String, required: true},
            title   : { type: String, required: true},
            quantity: { type: Number, required: true},
        }
    ],
    shippingAddress: { // Datos de la compra
        nombre    : { type: String, required: true},
        apellido  : { type: String, required: true},
        direccion : { type: String, required: true},
        direccion2: { type: String                },
        Cpostal   : { type: String, required: true},
        ciudad    : { type: String, required: true},
        telefono  : { type: String, required: true},
    },
    numberOfItems : { type: Number, required: true},
    total         : { type: Number, required: true},

    isPaid        : { type: Boolean, required: true, default: false},
    paidAt        : { type: String                },
    estado        : {
        type: String,
        enum: {
            values: ['Pendiente','Confirmado','Preparando','Enviado','Entregado'],
            message: 'No es un estado valido'
        },
        default: 'Pendiente'
    },

    transactionId : { type: String                },


},{
    timestamps: true
})



const Order: Model<IOrder> = mongoose.models.Order || model('Order', orderSchema)

export default Order;