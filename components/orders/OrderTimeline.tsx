"use client";

import {
  PackageCheck,
  Package,
  Truck,
  Bike,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { OrderStatus } from "@/types";

interface Props {
  status: OrderStatus;
}

const steps = [
  {
    title: "Order Placed",
    value: "Processing",
    icon: PackageCheck,
  },
  {
    title: "Packed",
    value: "Packed",
    icon: Package,
  },
  {
    title: "Shipped",
    value: "Shipped",
    icon: Truck,
  },
  {
    title: "Out for Delivery",
    value: "Out for Delivery",
    icon: Bike,
  },
  {
    title: "Delivered",
    value: "Delivered",
    icon: CheckCircle2,
  },
];

const statusIndex: Record<OrderStatus, number> = {
  Processing: 0,
  Packed: 1,
  Shipped: 2,
  "Out for Delivery": 3,
  Delivered: 4,
  Cancelled: -1,
};

export default function OrderTimeline({ status }: Props) {
  if (status === "Cancelled") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 flex items-center gap-3">
        <XCircle className="text-red-600" />
        <div>
          <h3 className="font-semibold text-red-700">Order Cancelled</h3>

          <p className="text-sm text-red-500">This order has been cancelled.</p>
        </div>
      </div>
    );
  }

  const current = statusIndex[status];

  return (
    <div className="bg-white rounded-3xl border p-8 shadow-sm">
      <h2 className="font-bold text-lg mb-8">Order Tracking</h2>

      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed = index <= current;

          return (
            <div key={step.value} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`h-14 w-14 rounded-full flex items-center justify-center transition

                  ${
                    completed
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <Icon size={24} />
                </div>

                <p
                  className={`mt-3 text-sm text-center font-medium

                  ${completed ? "text-green-600" : "text-gray-500"}`}
                >
                  {step.title}
                </p>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 rounded-full

                  ${index < current ? "bg-green-500" : "bg-gray-200"}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
