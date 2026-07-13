"use client";

import { ShoppingCart, Truck, Download, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
// Local CartItem type because `@/types` does not export CartItem
interface CartItem {
  id: string;
  quantity?: number;
  size?: string | null;
  price: number;
  [key: string]: any;
}
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

export default function OrderActions({ items, status }: OrderActionsProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const buyAgain = () => {
    items.forEach((item) => {
      // addItem expects a Product where id is a number; CartItem.id is a string here
      // convert id to number to satisfy the Product type without changing other files
      addItem({ ...item, id: Number(item.id) } as any, item.size ?? undefined);
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
    <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
      {/* Right Side Button */}
      {status !== "delivered" && status !== "cancelled" && (
        <button
          onClick={cancelOrder}
          className=" mb-6 mt-2 flex items-center gap-2 rounded-xl border border-red-500 px-5 py-3 text-red-500 hover:bg-red-50"
        >
          <XCircle size={18} />
          Cancel Order
        </button>
      )}
    </div>
  );
}
