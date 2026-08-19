"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/ecommerce";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const canAdjustQuantity = product.id === "ds-shirt-2026";
  const [showShirtBack, setShowShirtBack] = useState(false);

  useEffect(() => {
    if (!canAdjustQuantity) {
      return;
    }

    const interval = window.setInterval(() => {
      setShowShirtBack((isShowingBack) => !isShowingBack);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [canAdjustQuantity]);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-44 bg-slate-100 [perspective:1000px]">
        {canAdjustQuantity ? (
          <div
            className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
              showShirtBack ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden]">
              <Image
                src={product.image}
                alt={`${product.name} front`}
                fill
                className="origin-top scale-[2] object-contain"
              />
            </div>
            <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <Image
                src={product.image}
                alt={`${product.name} back`}
                fill
                className="origin-bottom scale-[2] object-contain"
              />
            </div>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="space-y-2">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-blue-600">
            {product.category}
          </p>
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <p className="text-sm leading-5 text-slate-600">{product.description}</p>
        </div>

        <div className="mt-auto space-y-3 pt-4">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-xl font-bold text-slate-900">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-xs text-slate-500">
                {product.inStock === false ? "Unavailable" : "Pickup"}
              </p>
            </div>

            {canAdjustQuantity ? (
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-slate-600" htmlFor={product.id}>
                  Qty
                </label>
                <input
                  id={product.id}
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(Math.max(1, Number(event.target.value) || 1))
                  }
                  className="w-14 rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                />
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product, canAdjustQuantity ? quantity : 1)}
            disabled={product.inStock === false}
            className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
