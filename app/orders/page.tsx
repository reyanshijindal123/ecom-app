"use client";

import Link from "next/link";
import { Package, ShoppingBag } from "lucide-react";
import { useOrderStore } from "@/store";
import type { Order } from "@/types";
import OrderCard from "@/components/orders/OrderCard";
import OrderStats from "@/components/orders/OrderStats";
import OrderFilter from "@/components/orders/OrderFilter";
import { useState } from "react";

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.orders) as unknown as Order[];

  console.log("ordere id:", orders);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "all" || order.status === filter;

    const matchesSearch =
      String(order.id).toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Package className="h-9 w-10 text-[#970747]" />

            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <OrderStats orders={orders} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <OrderFilter active={filter} setActive={setFilter} />
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order id or product name..."
            className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm outline-none focus:border-[#970747] focus:ring-2 focus:ring-pink-100 transition"
          />
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="mb-5 h-16 w-16 text-pink-500" />

            <h2 className="mb-2 text-3xl font-bold">No Orders Yet</h2>

            <p className="mb-6 max-w-md text-gray-500">
              Looks like you haven't placed any orders yet. Explore our products
              and place your first order.
            </p>

            <Link
              href="/products"
              className="rounded-xl bg-pink-600 px-6 py-3 text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">No matching orders found</h2>

            <p className="text-gray-500 mt-2">
              Try changing your search or filter
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
