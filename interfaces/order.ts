import { IUser } from "./user";

export interface IOrder{
    _id?           : string;
    user?          : IUser | string;
    orderItems     : IOrderItem[];
    shippingAddress: ShippingAddress;
    paymentResult? : string;

    numberOfItems  : number;
    total          : number;
    isPaid         : boolean; // Si el pago fue exitoso
    paidAt         : string; // Fecha de pago

    transactionId? : string;
    estado         : 'Pendiente'|'Confirmado'|'Preparando'|'Enviado'|'Entregado';

    createdAt?     : string;
    updatedAt?     : string;
}



export interface IOrderItem{
    _id      : string;
    title    : string;
    quantity : number;
    slug     : string;
    images   : string;
    price    : number;
}



export interface ShippingAddress {
    nombre     : string,
    apellido   : string,
    direccion  : string,
    direccion2?: string,
    Cpostal    : string,
    ciudad     : string,
    telefono   : string
}