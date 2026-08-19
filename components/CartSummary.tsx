interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
  onCheckout: () => void;
  disabled?: boolean;
}

export default function CartSummary({
  itemCount,
  subtotal,
  onCheckout,
  disabled,
}: CartSummaryProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-900 shadow-sm sm:p-5">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.25em] text-blue-600">
          Order Summary
        </p>
        <h2 className="text-xl font-semibold text-slate-900">Ready for pickup</h2>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <div className="flex justify-between">
          <span>Items</span>
          <span>{itemCount}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between rounded-xl bg-white px-3 py-2 text-base font-semibold text-slate-900 shadow-sm">
          <span>Total due</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={disabled}
        className="mt-4 w-full rounded-2xl bg-blue-500 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        Proceed to Checkout
      </button>
    </section>
  );
}
