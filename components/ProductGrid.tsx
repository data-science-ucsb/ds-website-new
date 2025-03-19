import { Product } from '@/app/data/products'
import ProductCard from './ProductCard'
import { useCart } from './CartProvider'
import { toast } from 'react-hot-toast'

interface ProductGridProps {
  products: Product[]
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { dispatch } = useCart();
  
  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductGrid;