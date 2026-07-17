"use client";

import { CheckCircle, Package } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn, getDeliveryDate } from "@/lib/utils";

import { btn, text, iconChip } from "@/lib/styles";

export default function SuccessScreen({
  orderId,
  total,
}: {
  orderId: string;

  total: number;
}) {
  const router = useRouter();

  return (
    <div className="text-center py-16 px-4">
      <div
        className={cn(
          iconChip.base,
          iconChip.success,
          "w-20 h-20 mx-auto mb-5",
        )}
      >
        <CheckCircle size={40} className="text-green-500" />
      </div>

      <h2 className={cn(text.pageTitle, "mb-2")}>Order Placed! 🎉</h2>

      <p className={cn(text.muted, "mb-1")}>
        Your order has been placed successfully.
      </p>

      <p className={cn(text.micro, "mb-1")}>
        Order ID:
        <span className="font-mono font-semibold text-gray-600 ml-1">
          {orderId}
        </span>
      </p>

      <p className={cn(text.micro, "mb-6")}>
        Estimated delivery:
        <strong className="text-gray-700 ml-1">{getDeliveryDate(5)}</strong>
      </p>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => router.push("/orders")}
          className={cn(btn.primary, btn.md)}
        >
          <Package size={15} />
          Track Order
        </button>

        <button
          onClick={() => router.push("/")}
          className={cn(btn.outline, btn.md)}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
