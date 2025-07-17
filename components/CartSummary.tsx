// import { Product } from '@/app/data/types'

// interface CartSummaryProps {
//   items: { product: Product; quantity: number }[]
//   onCheckout: () => void
// }

// const CartSummary: React.FC<CartSummaryProps> = ({ items, onCheckout }) => {
//   const subtotal = items.reduce(
//     (sum, item) => sum + item.product.price * item.quantity,
//     0
//   )
//   const tax = subtotal * 0.08 // 8% tax
//   const total = subtotal + tax

//   return (
//     <div className="bg-gray-50 p-6 rounded-lg">
//       <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//       <div className="space-y-2">
//         <div className="flex justify-between">
//           <span>Subtotal</span>
//           <span>${subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Tax (8%)</span>
//           <span>${tax.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between font-semibold border-t pt-2">
//           <span>Total</span>
//           <span>${total.toFixed(2)}</span>
//         </div>
//       </div>
//       <button
//         onClick={onCheckout}
//         className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//       >
//         Proceed to Checkout
//       </button>
//     </div>
//   )
// }

// export default CartSummary;