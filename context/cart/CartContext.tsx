import { createContext } from 'react'
import { ICartProduct } from 'interfaces'
import { ShippingAddress } from 'interfaces';

interface ContextProps{
     isLoaded : boolean;
     cart: ICartProduct[];
     numberOfItems: number,
     total: number,

     shippingAddress?: ShippingAddress;

     //Metodos
     addCartProduct    : (cartProduct: ICartProduct) => void;
     updateCartQuantity: (product: ICartProduct)     => void;
     deleteProductCart : (product: ICartProduct)     => void;
     updateAddress     : (address: ShippingAddress)  => void;
     createOrder       : ()  => Promise<{hasError: boolean,message: string}>;
}

export const CartContext = createContext({} as ContextProps)