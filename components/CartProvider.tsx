// import { createContext, useContext, useReducer, ReactNode } from 'react'
// import { Product } from '@/app/data/products'

// interface CartItem {
//   product: Product
//   quantity: number
// }

// interface CartState {
//   items: CartItem[]
// }

// type CartAction =
//   | { type: 'ADD_TO_CART'; payload: Product }
//   | { type: 'REMOVE_FROM_CART'; payload: string }
//   | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }

// const CartContext = createContext<{
//   state: CartState
//   dispatch: React.Dispatch<CartAction>
// } | null>(null)

// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case 'ADD_TO_CART': {
//       const existingItem = state.items.find(
//         item => item.product.id === action.payload.id
//       )

//       if (existingItem) {
//         return {
//           ...state,
//           items: state.items.map(item =>
//             item.product.id === action.payload.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           ),
//         }
//       }

//       return {
//         ...state,
//         items: [...state.items, { product: action.payload, quantity: 1 }],
//       }
//     }
//     // ... other cases
//     default:
//       return state
//   }
// }

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer(cartReducer, { items: [] })

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   )
// }

// export const useCart = () => {
//   const context = useContext(CartContext)
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider')
//   }
//   return context
// }