"use client";

import { MapPin, Phone, User } from "lucide-react";
import { Address } from "../AddressForm";

interface ShippingAddressProps {
  address: Address;
}

export default function ShippingAddress({
  address,
}: ShippingAddressProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 mb-6 mt-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-full bg-pink-100 p-2">
          <MapPin className="h-5 w-5 text-pink-600" />
        </div>

        <h2 className="text-xl font-semibold">
          Shipping Address
        </h2>
      </div>

      <div className="space-y-4">

        {/* Customer Name */}
        <div className="flex items-start gap-3">
          <User className="mt-1 h-5 w-5 text-gray-500" />

          <div>
            <p className="text-sm text-gray-500">
              Customer
            </p>

            <p className="font-semibold">
              {address.fullName}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 h-5 w-5 text-gray-500" />

          <div>
            <p className="text-sm text-gray-500">
              Delivery Address
            </p>

            <p className="font-medium">
              {address.address}
            </p>

            <p>
              {address.city}, {address.state}
            </p>

            <p>{address.pincode}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="mt-1 h-5 w-5 text-gray-500" />

          <div>
            <p className="text-sm text-gray-500">
              Contact Number
            </p>

            <p className="font-medium">
              {address.phone}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}