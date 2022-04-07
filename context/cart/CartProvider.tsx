import { FC, useReducer, useEffect } from 'react';
import Cookie from 'js-cookie'
import { CartContext, cartReducer } from './'
import { ICartProduct, IOrder, ShippingAddress } from 'interfaces'
import { foodApi } from 'api';
import axios from 'axios';



export interface CartState {
     isLoaded: boolean;
     cart: ICartProduct[];
     numberOfItems: number,
     total: number,
     shippingAddress?: ShippingAddress;
}


const CART_INITIAL_STATE: CartState = {
     isLoaded: false,
     cart: [],
     numberOfItems: 0,
     total: 0,
     shippingAddress: undefined
}

export const CartProvider: FC = ({ children }) => {

     const [state,dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

     useEffect(() => {
          const shippingAddress = {
               nombre    : Cookie.get('nombre') || '',
               apellido  : Cookie.get('apellido') || '',
               direccion : Cookie.get('direccion') || '',
               direccion2: Cookie.get('direccion2') || '',
               Cpostal   : Cookie.get('Cpostal') || '',
               ciudad    : Cookie.get('ciudad') || '',
               telefono  : Cookie.get('telefono') || ''
          }
          dispatch({ type: '[Cart] - LoadAddress from cookies', payload: shippingAddress })
     },[])

     useEffect(() => {
          try {
               // Efecto para leer el carrito de la cookie
               const cookiesProduct = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
               dispatch({ type: '[Cart] - Load from cart cookies | storage', payload: cookiesProduct })
          } catch (error) {
               // Si ocurrio un error o alguien modifico las cookies
               dispatch({ type: '[Cart] - Load from cart cookies | storage', payload: [] })
          }
     },[])

     useEffect(() => {
          // Efecto para guardar el carrito en la cookie
          Cookie.set('cart', JSON.stringify(state.cart))
     },[state.cart])
     useEffect(() => {

          // Cantidad de productos en el carrito
          const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
          // Subtotal de todos los productos en el carrito por el precio de cada uno
          const total      = state.cart.reduce((prev, current) => (current.quantity * current.price) + prev, 0)

          // Efecto calcular productos del carrito de compra
          const orderSummary = {
               numberOfItems, // Cantidad de productos en el carrito,
               total      // Subtotal
          }
          dispatch({ type: '[Cart] - Update order summary', payload: orderSummary })
     },[state.cart])

     const addCartProduct = (cartProduct: ICartProduct) => {

          //Validar si el producto existe en el carrito
          const productInCart = state.cart.some(p => p._id === cartProduct._id); // Boolean
          // si no existe en el carrito, lo agrego
          if(!productInCart) return dispatch({ type: '[Cart] - Update product in cart', payload: [...state.cart,cartProduct]})

          // en este punto, quiere decir que existe el producto
          // Aumentamos la cantidad del producto para evitar duplicados en el carrito
          const updateProduct = state.cart.map(p => {
               if(p._id !== cartProduct._id) return p;
               // Actualizar la cantidad
               p.quantity += cartProduct.quantity;
               return p;
          })

          dispatch({ type: '[Cart] - Update product in cart', payload: updateProduct})
     }


     const updateCartQuantity = (product: ICartProduct) => {
          // Actualizar la cantidad de un producto del carrito de compras
          dispatch({ type: '[Cart] - Change cart quantity', payload: product });
     }

     const deleteProductCart = (product: ICartProduct) => {
          dispatch({ type: '[Cart] - Delete product in cart', payload: product });
     }

     const updateAddress = (address: ShippingAddress) => {
          Cookie.set('nombre', address.nombre);
          Cookie.set('apellido', address.apellido);
          Cookie.set('direccion', address.direccion);
          Cookie.set('direccion2', address.direccion2 || '');
          Cookie.set('Cpostal', address.Cpostal);
          Cookie.set('ciudad', address.ciudad);
          Cookie.set('telefono', address.telefono);
          dispatch({ type: '[Cart] - UpdateAddress', payload: address });
     }


     const createOrder = async(): Promise<{hasError: boolean,message: string}> => {

          if(!state.shippingAddress){
               throw new Error("No se ha definido la direccion de envio");
          };

          const body: IOrder = {
               orderItems: state.cart.map(p => ({
                    ...p
               })),
               shippingAddress: state.shippingAddress,
               numberOfItems: state.numberOfItems,
               total: state.total,
               isPaid: false,
               paidAt: '',
               estado: 'Confirmado'
          }

          try {

               const { data } = await foodApi.post<IOrder>(`/orders`, body);

               dispatch({ type: '[Cart] - Order Complete'});

               return {
                    hasError: false,
                    message: data._id!
               }
          } catch (error) {
               if(axios.isAxiosError(error)){
                    return {
                         hasError: true,
                         message: error.response?.data.message
                    }
               }

               return {
                    hasError: true,
                    message : 'Error no controlado, comuniquese con el administrador'
               }
          }
     }


     return (
          <CartContext.Provider value={{
               ...state,
               addCartProduct,
               updateCartQuantity,
               deleteProductCart,
               updateAddress,
               createOrder
          }}>
               { children }
          </CartContext.Provider>
     )
}