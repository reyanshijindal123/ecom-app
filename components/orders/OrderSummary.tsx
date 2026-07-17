"use client";

interface OrderSummaryProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
}

export default function OrderSummary({
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
}: OrderSummaryProps) {
  const total = subtotal + shipping + tax - discount;

  return (
    <div className="rounded-2xl border bg-white p-6 mb-6 mt-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>

          {shipping === 0 ? (
            <span className="font-semibold text-green-600">FREE</span>
          ) : (
            <span>₹{shipping.toFixed(2)}</span>
          )}
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Discount</span>
          <span className="text-green-600">-₹{discount.toFixed(2)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>

          <span className="text-pink-600">₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
