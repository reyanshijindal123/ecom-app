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

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg dark:bg-zinc-900 dark:border-zinc-800">

      <div className="flex flex-col gap-6 md:flex-row">

        {/* Product Image */}
        <div className="relative h-28 w-28 overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={firstItem.image}
            alt={firstItem.title}
            fill
            className="object-contain p-3"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">

          <div className="flex flex-col gap-3 md:flex-row md:justify-between">

            <div>

              <h2 className="text-lg font-semibold line-clamp-2">
                {firstItem.title}
              </h2>

              {order.items.length > 1 && (
                <p className="mt-1 text-sm text-gray-500">
                  + {order.items.length - 1} more item(s)
                </p>
              )}

            </div>

            <StatusBadge status={order.status} />

          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays size={16} />
              <span>{order.date}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CreditCard size={16} />
              <span>₹{order.total.toFixed(2)}</span>
            </div>

            <div className="text-sm text-gray-500">
              {order.items.length} Item(s)
            </div>

          </div>

          <div className="mt-6 flex flex-wrap gap-3">

            <Link
              href={`/orders/${order.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-2.5 text-white transition hover:bg-pink-700"
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