"use client";

import { useRef, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import CheckoutForm from "@/components/CheckoutForm";
import { useCart } from "@/components/CartProvider";
import { products } from "@/app/data/products";
import type { CheckoutResponse } from "@/types/ecommerce";

const pickupLocation = "TD-W 1700";

export default function Store() {
  const { cartId, hasHydrated, items, itemCount, subtotal, setQuantity, removeItem } =
    useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderResult, setOrderResult] = useState<CheckoutResponse | null>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const orderConfirmationRef = useRef<HTMLElement>(null);

  const canCheckout = itemCount > 0 && hasHydrated;

  function openCheckout() {
    setShowCheckout(true);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function showOrderConfirmation(response: CheckoutResponse) {
    setOrderResult(response);
    setShowCheckout(false);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        orderConfirmationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  return (
    <div className="space-y-6 px-3 py-6 sm:px-4">
      {orderResult ? (
        <section
          ref={orderConfirmationRef}
          className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6"
        >
          <h2 className="text-2xl font-semibold text-emerald-950">
            Order {orderResult.order.id} created
          </h2>
          <p className="mt-2 text-sm text-emerald-900">{orderResult.message}</p>
          {orderResult.nextSteps?.length ? (
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-emerald-900">
              {orderResult.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-5">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              Items
            </h2>
          </div>
          <ProductGrid products={products} />
        </div>

        <aside className="space-y-6">
          <CartSummary
            itemCount={itemCount}
            subtotal={subtotal}
            disabled={!canCheckout}
            onCheckout={openCheckout}
          />

          <section className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-slate-900">Your cart</h2>
            </div>

            {!hasHydrated ? (
              <p className="text-sm text-slate-500">Loading your saved cart...</p>
            ) : items.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
                Your cart is empty right now.
              </p>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={setQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            )}
          </section>
        </aside>
      </section>

      {showCheckout ? (
        <div ref={checkoutRef}>
          <CheckoutForm
            cartId={cartId}
            items={items}
            subtotal={subtotal}
            pickupLocation={pickupLocation}
            onOrderPlaced={showOrderConfirmation}
          />
        </div>
      ) : null}
    </div>
  )
}
