"use client";

import { OrderStatus } from "@/types";

interface Props {
  status: OrderStatus;
}

export default function StatusBadge({ status }: Props) {
  const styles = {
    Processing: "bg-yellow-100 text-yellow-700",
    Packed: "bg-blue-100 text-blue-700",
    Shipped: "bg-indigo-100 text-indigo-700",
    "Out for Delivery": "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}