"use client";

import { useOrderStore } from "@/store";
import Image from "next/image";
import Link from "next/link";

export default function OrdersPage() {
  const { orders } = useOrderStore();

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-10 text-center">
        <h2 className="text-2xl font-bold">No Orders Yet</h2>

        <p className="text-gray-500 mt-3">Place your first order.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-xl border shadow-sm p-6"
        >
          <div className="flex justify-between">
            <div>
              <h2 className="font-bold">Order #{order.id}</h2>

              <p className="text-gray-500">{order.date}</p>
            </div>

            <span className="text-[#970747] font-semibold">{order.status}</span>
          </div>

          <hr className="my-5" />
          {order.items.map((item) => (
            <Link
              href={`/products/${item.id}`}
              key={item.id}
              className="flex items-center gap-4 mb-4 hover:bg-gray-50 p-3 rounded-xl transition"
            >
              <div className="relative h-16 w-16">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold hover:text-[#970747]">
                  {item.title}
                </h3>

                <p className="text-gray-500">Qty : {item.quantity}</p>
              </div>

              <p className="font-bold">₹{Math.round(item.price * 83)}</p>
            </Link>
          ))}

          <hr />

          <div className="flex justify-between mt-5">
            <h2 className="font-bold">Total</h2>

            <h2 className="font-bold text-[#970747]">
              ₹{Math.round(order.total)}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
