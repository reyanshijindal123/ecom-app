"use client";

import { useParams, useRouter } from "next/navigation";
import { useOrderStore, useCartStore } from "@/store";
import { INR } from "@/lib/utils";

import Link from "next/link";
import Image from "next/image";

import { ArrowLeft, Package } from "lucide-react";

export default function OrderDetailsPage() {
  const { id } = useParams();

  const router = useRouter();

  const orders = useOrderStore((state) => state.orders);
  console.log(orders);

  const addItem = useCartStore((state) => state.addItem);

  const order = orders.find((o) => String(o.id) === id);

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <Package size={70} className="text-gray-300" />

        <h2 className="text-2xl font-bold mt-4">Order Not Found</h2>

        <Link
          href="/orders"
          className="mt-6 rounded-xl bg-[#970747] px-6 py-3 text-white"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const buyAgain = () => {
    order.items.forEach((item: any) => {
      addItem(item, item.size);
    });

    router.push("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Back Button */}

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#970747] font-semibold"
      >
        <ArrowLeft size={18} />
        Back
      </button>
      {/* Header Card */}

      <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2">
              <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-[#970747]">
                Order Details
              </p>

              <h1 className="mt-2 text-xl font-semibold tracking-tight text-gray-900">
                Order <span className="text-[#970747]">#{order.id}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between my-8">
          <h2 className="text-2xl font-bold">Ordered Items</h2>

          <p className="text-sm text-black-500">{order.items.length} Item(s)</p>
        </div>

        <div className="space-y-6">
          {order.items.map((item: any, index) => (
            <div
              key={`${item.id}-${item.size ?? "nosize"}-${index}`}
              className="flex flex-col md:flex-row gap-6 rounded-2xl border border-black-100 p-5 "
            >
              {/* Image */}

              <div className="relative h-32 w-32 shrink-0 rounded-2xl bg-pink-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Product */}

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-6 text-black-500 text-sm">
                  <p>
                    Qty :
                    <span className="ml-2 font-semibold text-gray-900">
                      {item.quantity}
                    </span>
                  </p>

                  {item.size && (
                    <p>
                      Size :
                      <span className="ml-2 font-semibold text-gray-900">
                        {item.size}
                      </span>
                    </p>
                  )}
                </div>

                <p className="mt-5 text-3xl font-black text-[#970747]">
                  {INR(item.price)}
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={buyAgain}
                    className="rounded-xl bg-[#970747] px-5 py-2.5 text-white hover:bg-[#7a0538]"
                  >
                    Buy Again
                  </button>

                  <button className="rounded-xl border border-gray-300 px-5 py-2.5 hover:bg-gray-50">
                    Write Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
