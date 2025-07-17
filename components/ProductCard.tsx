// import Image from 'next/image'
// import { Product } from '../app/data/products'

// interface ProductCardProps {
//   product: Product
//   onAddToCart: (product: Product) => void
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//       <div className="relative h-48">
//         <Image
//           src={product.image}
//           alt={product.name}
//           fill
//           className="object-cover"
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//         <p className="text-gray-600 text-sm mb-4">{product.description}</p>
//         <div className="flex items-center justify-between">
//           <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
//           <button
//             onClick={() => onAddToCart(product)}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductCard;