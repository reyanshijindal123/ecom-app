"use client";

import { ShoppingCart, Truck, Download, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types";
import { useCartStore } from "@/store";

interface OrderActionsProps {
  items: CartItem[];
  status:
    | "processing"
    | "packed"
    | "shipped"
    | "out-for-delivery"
    | "delivered"
    | "cancelled";
}

export default function OrderActions({
  items,
  status,
}: OrderActionsProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const buyAgain = () => {
    items.forEach((item) => {
      addItem(item, item.size);
    });

    router.push("/cart");
  };

  const downloadInvoice = () => {
    alert("Invoice download feature will be added soon.");
  };

  const trackOrder = () => {
    alert("Live order tracking coming soon.");
  };

  const cancelOrder = () => {
    alert("Cancel Order feature coming soon.");
  };

  return (
    <div className="mt-8 flex flex-wrap gap-4">

      <button
        onClick={buyAgain}
        className="flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 text-white transition hover:bg-pink-700"
      >
        <ShoppingCart size={18} />
        Buy Again
      </button>

      <button
        onClick={trackOrder}
        className="flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800"
      >
        <Truck size={18} />
        Track Order
      </button>

      <button
        onClick={downloadInvoice}
        className="flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800"
      >
        <Download size={18} />
        Download Invoice
      </button>

      {status !== "delivered" && status !== "cancelled" && (
        <button
          onClick={cancelOrder}
          className="flex items-center gap-2 rounded-xl border border-red-500 px-5 py-3 text-red-500 hover:bg-red-50"
        >
          <XCircle size={18} />
          Cancel Order
        </button>
      )}
    </div>
  );
}