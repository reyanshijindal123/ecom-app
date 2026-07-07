"use client";

import { CreditCard, BadgeCheck, Receipt } from "lucide-react";

interface PaymentInfoProps {
  total: number;
}

export default function PaymentInfo({ total }: PaymentInfoProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 mb-6 mt-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-full bg-pink-100 p-2">
          <CreditCard className="h-5 w-5 text-pink-600" />
        </div>

        <h2 className="text-xl font-semibold">
          Payment Details
        </h2>
      </div>

      <div className="space-y-5">

        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Payment Method
          </span>

          <span className="font-semibold">
            Cash on Delivery
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Payment Status
          </span>

          <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            <BadgeCheck size={16} />
            Pending
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Transaction ID
          </span>

          <span className="font-mono text-sm">
            TXN-2026-001
          </span>
        </div>

        <hr />

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            <Receipt size={18} className="text-pink-600" />
            <span className="font-semibold">
              Total Paid
            </span>
          </div>

          <span className="text-2xl font-bold text-pink-600">
            ₹{total.toFixed(2)}
          </span>

        </div>

      </div>
    </div>
  );
}