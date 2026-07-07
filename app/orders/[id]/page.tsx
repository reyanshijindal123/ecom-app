"use client";

import { useParams, useRouter } from "next/navigation";
import { useOrderStore, useCartStore } from "@/store";
import Image from "next/image";
import ShippingAddress from "@/components/orders/ShippingAddress";
import PaymentInfo from "@/components/orders/PaymentInfo";
import OrderSummary from "@/components/orders/OrderSummary";
import OrderActions from "@/components/orders/OrderActions";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  ShoppingCart,
  XCircle,
} from "lucide-react";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const orders = useOrderStore((state) => state.orders);
  const addItem = useCartStore((state) => state.addItem);

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Package size={80} className="text-gray-300" />
        <h2 className="text-2xl font-bold mt-4">Order Not Found</h2>

        <Link
          href="/orders"
          className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-xl"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const buyAgain = () => {
    order.items.forEach((item) => addItem(item, item.size));
    router.push("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-pink-600 font-semibold mb-8"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg border p-8">
        <div className="flex justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Order <span className="text-sm text-black-500">#{order.id}</span>
            </h1>
            <p className="text-gray-500 mb-6 mt-2">Ordered on {order.date}</p>
          </div>

          <span
            className={`px-5 py-2 rounded-full font-semibold
            ${
              order.status === "processing"
                ? "bg-yellow-100 text-yellow-700"
                : order.status === "shipped"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
            }`}
          >
            {order.status.toUpperCase()}
          </span>
        </div>

        {/* <hr className="my-8" /> */}

        <h2 className="text-2xl font-bold mt-2 mb-6">Ordered Items</h2>

        <div className="space-y-6">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col mt-2 mb-6 md:flex-row gap-5 border rounded-xl p-4"
            >
              <div className="relative w-28 h-28 bg-gray-100 rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-3"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.title}</h3>

                <p className="text-gray-500 mt-2">₹{item.price}</p>

                <p className="text-gray-500">Quantity : {item.quantity}</p>

                {item.size && (
                  <p className="text-gray-500">Size : {item.size}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* <hr className="my-8" /> */}

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <ShippingAddress address={order.address} />

          <PaymentInfo total={order.total} />
        </div>
        <div className="mt-8">
          <OrderSummary
            subtotal={order.total}
            shipping={0}
            tax={0}
            discount={0}
          />
        </div>

        {/* <hr className="my-8" /> */}
        <OrderActions items={order.items} status={order.status} />
      </div>
    </div>
  );
}
