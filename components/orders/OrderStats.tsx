"use client";

import { Order } from "@/types";
import { Package, CheckCircle, Clock, Truck } from "lucide-react";

interface Props {
  orders: Order[];
}

export default function OrderStats({ orders }: Props) {

  const delivered = orders.filter(
    (o) => o.status === "delivered"
  ).length;

  const processing = orders.filter(
    (o) => o.status === "processing"
  ).length;

  const shipped = orders.filter(
    (o) => o.status === "shipped"
  ).length;


  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: Package,
    },
    {
      title: "Processing",
      value: processing,
      icon: Clock,
    },
    {
      title: "Shipped",
      value: shipped,
      icon: Truck,
    },
    {
      title: "Delivered",
      value: delivered,
      icon: CheckCircle,
    },
  ];


  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl bg-white border p-5 shadow-sm"
          >
            <Icon className="text-pink-600 mb-3" size={28}/>

            <p className="text-gray-500 text-sm">
              {stat.title}
            </p>

            <h3 className="text-3xl font-bold">
              {stat.value}
            </h3>

          </div>
        );
      })}

    </div>
  );
}