import { Product } from '../app/data/types'
import Image from 'next/image'

interface CartItemProps {
  item: Product
  quantity: number
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  quantity,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative w-24 h-24">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="px-2 py-1 border rounded"
            onClick={() => onUpdateQuantity(item.id, quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="px-2 py-1 border rounded"
            onClick={() => onUpdateQuantity(item.id, quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  )
}

export default CartItem;