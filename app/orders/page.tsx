"use client";

import Link from "next/link";
import { Package, ShoppingBag } from "lucide-react";
import { useOrderStore } from "@/store";
import OrderCard from "@/components/orders/OrderCard";
import OrderStats from "@/components/orders/OrderStats";

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.orders);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">

      {/* Header */}
      <div className="mb-10 flex items-center gap-3">
        <Package className="h-8 w-8 text-pink-600" />

        <div>
          <h1 className="text-4xl font-bold">
            My Orders
          </h1>

          <p className="text-gray-500 mt-1">
            Track and manage your purchases
          </p>
        </div>
      </div>


      {/* Stats */}
      <OrderStats orders={orders} />


      {/* Empty State */}
      {orders.length === 0 ? (

        <div className="min-h-[40vh] flex flex-col items-center justify-center px-6 text-center">

          <ShoppingBag className="mb-5 h-16 w-16 text-pink-500" />

          <h2 className="mb-2 text-3xl font-bold">
            No Orders Yet
          </h2>

          <p className="mb-6 max-w-md text-gray-500">
            Looks like you haven't placed any orders yet.
            Explore our products and place your first order.
          </p>

          <Link
            href="/products"
            className="rounded-xl bg-pink-600 px-6 py-3 text-white transition hover:bg-pink-700"
          >
            Continue Shopping
          </Link>

        </div>

      ) : (

        /* Orders List */
        <div className="space-y-6">

          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}

        </div>

      )}

    </div>
  );
}