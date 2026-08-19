import Image from "next/image";
import { notifySuccess } from "@/lib/notifications";
import type { CartItem as CartLine } from "@/types/ecommerce";

interface CartItemProps {
  item: CartLine;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const canAdjustQuantity = item.id === "ds-shirt-2026";

  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3">
      <div className="relative h-16 w-16 flex-shrink-0 rounded-xl bg-slate-100 sm:h-20 sm:w-20">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="rounded-xl object-contain p-2"
        />
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="break-words text-sm font-semibold text-slate-900 sm:text-base">{item.name}</h3>
          </div>
          <p className="flex-shrink-0 text-sm font-semibold text-slate-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {canAdjustQuantity ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-slate-300 text-slate-700"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {item.quantity}
              </span>
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-slate-300 text-slate-700"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          ) : (
            <span className="text-sm text-slate-500">Qty {item.quantity}</span>
          )}

          <button
            type="button"
            onClick={() => {
              onRemove(item.id);
              notifySuccess(`${item.name} removed from cart`);
            }}
            className="text-sm font-medium text-red-600 transition hover:text-red-800"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
