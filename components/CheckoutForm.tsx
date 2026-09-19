"use client";

import { type FormEvent, useState } from "react";
import { notifyError, notifySuccess } from "@/lib/notifications";
import type {
  CartItem,
  CheckoutPaymentMethod,
  CheckoutResponse,
} from "@/types/ecommerce";
import { useCart } from "./CartProvider";

interface CheckoutFormProps {
  cartId: string;
  items: CartItem[];
  subtotal: number;
  pickupLocation: string;
  onOrderPlaced: (response: CheckoutResponse) => void;
}

export default function CheckoutForm({
  cartId,
  items,
  subtotal,
  pickupLocation,
  onOrderPlaced,
}: CheckoutFormProps) {
  const { clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<CheckoutPaymentMethod | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!paymentMethod) {
      setError("Select a payment method.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/commerce/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId,
          paymentMethod,
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          customerInfo: {
            name,
            email,
            notes,
          },
        }),
      });

      const payload = (await response.json()) as CheckoutResponse & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Unable to create the order.");
      }

      clearCart();
      onOrderPlaced(payload);
      notifySuccess("Order created successfully.");

      setName("");
      setEmail("");
      setNotes("");
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Unable to create the order.";
      setError(message);
      notifyError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
    >
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">
          Checkout
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Pickup at the next general meeting
        </h2>
        <p className="text-sm text-slate-600">
          Current pickup location: <span className="font-medium">{pickupLocation}</span>
        </p>
        <p className="text-sm text-slate-600">
          Make sure the email you enter matches the email you registered with.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Full name</span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Order notes</span>
        <textarea
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Optional: shirt size, pickup notes, or membership questions"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
        />
      </label>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-slate-900">Payment Options</legend>
        <div className="grid gap-3 md:grid-cols-3">
          <label className="cursor-pointer">
            <input
              required
              type="radio"
              name="paymentMethod"
              value="zelle"
              checked={paymentMethod === "zelle"}
              onChange={() => setPaymentMethod("zelle")}
              className="peer sr-only"
            />
            <span className="block rounded-2xl border border-violet-200 bg-violet-50 p-3 transition peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500 peer-focus-visible:ring-offset-2 peer-checked:border-violet-600 peer-checked:bg-violet-100 peer-checked:ring-2 peer-checked:ring-violet-500">
              <span className="block font-semibold text-slate-900">Zelle</span>
              <span className="block break-all text-xs text-slate-600">datascience.ucsb@gmail.com</span>
            </span>
          </label>

          <label className="cursor-pointer">
            <input
              required
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
              className="peer sr-only"
            />
            <span className="block rounded-2xl border border-emerald-200 bg-emerald-50 p-3 transition peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500 peer-focus-visible:ring-offset-2 peer-checked:border-emerald-600 peer-checked:bg-emerald-100 peer-checked:ring-2 peer-checked:ring-emerald-500">
              <span className="block font-semibold text-slate-900">Cash</span>
              <span className="block text-xs leading-4 text-slate-600">Pay at the front of the room or at any meeting.</span>
            </span>
          </label>

          <label className="cursor-pointer">
            <input
              required
              type="radio"
              name="paymentMethod"
              value="venmo"
              checked={paymentMethod === "venmo"}
              onChange={() => setPaymentMethod("venmo")}
              className="peer sr-only"
            />
            <span className="block rounded-2xl border border-sky-200 bg-sky-50 p-3 transition peer-focus-visible:ring-2 peer-focus-visible:ring-sky-500 peer-focus-visible:ring-offset-2 peer-checked:border-sky-600 peer-checked:bg-sky-100 peer-checked:ring-2 peer-checked:ring-sky-500">
              <span className="block font-semibold text-slate-900">Venmo</span>
              <span className="block text-xs text-slate-600">@Satvik-Talchuru</span>
            </span>
          </label>
        </div>
        <p className="text-xs text-slate-600">
          Payment must be verified when you pick up your shirt.
        </p>
      </fieldset>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <div className="flex justify-between">
          <span>Order total</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmitting ? "Creating order..." : "Submit Order"}
      </button>
    </form>
  );
}
