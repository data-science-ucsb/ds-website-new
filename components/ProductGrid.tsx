"use client";

import { notify, notifySuccess } from "@/lib/notifications";
import type { Product } from "@/types/ecommerce";
import ProductCard from "./ProductCard";
import { useCart } from "./CartProvider";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart();

  function handleAddToCart(product: Product, quantity: number) {
    const { bundleResolved, blockedReason } = addItem(product, quantity);

    if (blockedReason === "bundle") {
      notify("Only one bundle can be added. You can still add more Club Tees.", {
        id: "bundle-limit",
        icon: "!",
      });
      return;
    }

    if (blockedReason === "membership") {
      notify("Only one Member Pass can be added. You can still add more Club Tees.", {
        id: "member-pass-limit",
        icon: "!",
      });
      return;
    }

    if (blockedReason === "membership_included") {
      notify("Your bundle already includes a Member Pass. You can still add more Club Tees.", {
        id: "member-pass-limit",
        icon: "!",
      });
      return;
    }

    if (bundleResolved) {
      notify("Tee + membership bundle applied to your cart.", {
        id: "bundle-applied",
        icon: "!",
      });
      return;
    }

    notifySuccess(`${quantity} x ${product.name} added to cart`);
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
