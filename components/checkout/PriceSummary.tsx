"use client";

import { cn, INR } from "@/lib/utils";

import { card, layout, text } from "@/lib/styles";

export default function PriceSummary({
  subtotal,
  shippingCost,
  tax,
  grand,
  totalItems,
  savings,
}: {
  subtotal: number;

  shippingCost: number;

  tax: number;

  grand: number;

  totalItems: number;

  savings: number;
}) {
  const row = "flex justify-between text-sm text-gray-600";

  return (
    <div className={cn(card.base, card.p.md, layout.sticky)}>
      <h3 className={cn(text.cardTitle, "mb-4")}>Price Details</h3>

      <div
        className="
space-y-2.5 
border-b border-gray-100 
pb-4 mb-4
"
      >
        <div className={row}>
          <span>Price ({totalItems} items)</span>

          <span className="font-semibold">{INR(subtotal / 83)}</span>
        </div>

        <div className={row}>
          <span>Discount</span>

          <span
            className="
text-green-600 
font-semibold
"
          >
            -{INR(savings / 83)}
          </span>
        </div>

        <div className={row}>
          <span>Delivery</span>

          <span className="font-semibold">
            {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
          </span>
        </div>

        <div className={row}>
          <span>GST (18%)</span>

          <span className="font-semibold">₹{Math.round(tax)}</span>
        </div>
      </div>

      <div
        className="
flex justify-between 
font-black text-gray-900 
text-base mb-3
"
      >
        <span>Total Amount</span>

        <span>₹{Math.round(grand).toLocaleString("en-IN")}</span>
      </div>

      <p
        className="
text-xs text-green-600 
font-semibold
"
      >
        You save ₹{Math.round(savings).toLocaleString("en-IN")}
        on this order!
      </p>
    </div>
  );
}
