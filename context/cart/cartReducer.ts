import { CartState } from './'
import { ShippingAddress ,ICartProduct } from 'interfaces'


type CartActionType =
| { type: '[Cart] - Load from cart cookies | storage', payload: ICartProduct[] } // Cargar desde las cookies
| { type: '[Cart] - Update product in cart', payload: ICartProduct[] } // Guardar producto en el carrito
| { type: '[Cart] - Change cart quantity', payload: ICartProduct } // Aumentar cantidad de un producto del carrito
| { type: '[Cart] - Delete product in cart', payload: ICartProduct } // Eliminar producto del carrito
| { type: '[Cart] - LoadAddress from cookies', payload: ShippingAddress } // Eliminar producto del carrito
| { type: '[Cart] - UpdateAddress', payload: ShippingAddress } // Eliminar producto del carrito
| { type: '[Cart] - Order Complete'} // Eliminar producto del carrito
| { type:'[Cart] - Update order summary',
     payload: {
          numberOfItems: number,
          total: number,
     }
  } // Eliminar producto del carrito




export const cartReducer = (state: CartState, action: CartActionType): CartState => {
     switch(action.type){
          case '[Cart] - Load from cart cookies | storage':
               return {
                    ...state,
                    isLoaded: true,
                    cart: [...action.payload]
               }

          case '[Cart] - Update product in cart':
               return {
                    ...state,
                    cart: [ ...action.payload ]
               }
          case '[Cart] - Change cart quantity':
               return {
                    ...state,
                    cart: state.cart.map(product => {
                         if(product._id !== action.payload._id) return product;
                         return action.payload;
                    })
               }
          case '[Cart] - Delete product in cart':
               return {
                    ...state,
                    cart: state.cart.filter(product => product._id !== action.payload._id)
               }
          case '[Cart] - Update order summary':
               return {
                    ...state,
                    ...action.payload
               }
          case '[Cart] - UpdateAddress': // Esta linea acualiza los datos de envio
          case '[Cart] - LoadAddress from cookies': // Esta linea carga los datos de envio
               return {
                    ...state,
                    shippingAddress: action.payload
               }
          case '[Cart] - Order Complete': // Esta linea carga los datos de envio
               return {
                    ...state,
                    cart: [],
                    numberOfItems: 0,
                    total: 0,
               }

          default:
               return state
     }
}