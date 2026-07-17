"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CreditCard, ArrowRight } from "lucide-react";
import { Order } from "@/types";
import StatusBadge from "./StatusBadge";

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  const firstItem = order.items[0];
  if (!firstItem) {
    return (
      <div className="bg-white rounded-3xl p-6">
        <p>No items found in this order.</p>
      </div>
    );
  }
  const previewItems = order.items.slice(0, 3);
  const remainingItems = order.items.length - 3;
  const orderDate =
    (order as any).createdAt ?? (order as any).date ?? "Unknown date";

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Product Images Preview */}
        <div className="flex items-center gap-3">
          {previewItems.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="relative h-20 w-20 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-2"
              />
            </Link>
          ))}

          {remainingItems > 0 && (
            <Link
              href={`/orders/${order.id}`}
              className="
        h-20 w-20 rounded-xl 
        bg-pink-50 
        flex items-center justify-center
        text-pink-600
        font-bold
        hover:bg-pink-100
      "
            >
              +{remainingItems}
            </Link>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex flex-col gap-3 md:flex-row md:justify-between">
            <div>
              <Link
                href={`/products/${firstItem.id}`}
                className="text-xl font-bold text-gray-900 hover:text-[#970747] transition"
              >
                {firstItem.title}
              </Link>
            </div>

            <StatusBadge status={order.status} />
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays size={16} />
              <span>{orderDate}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CreditCard size={16} />
              <span>₹{order.total.toFixed(2)}</span>
            </div>

            <div className="text-sm text-gray-500">
              {order.items.length} Item(s)
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/orders/${order.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#970747] px-6 py-3 font-medium text-white hover:bg-[#7a0538] transition"
            >
              View Details
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
