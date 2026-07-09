'use client';

import { useAddressStore } from '@/store';

export default function AddressesPage() {
  const { addresses } = useAddressStore();

  return (
    <div className="space-y-6">

      {/* Heading */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            My Addresses
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your delivery addresses.
          </p>
        </div>

        <button className="bg-[#970747] text-white px-5 py-3 rounded-xl">
          + Add Address
        </button>

      </div>

      {/* Address List */}

      {addresses.length === 0 ? (

        <div className="bg-white border rounded-2xl p-10 text-center">

          <h2 className="text-xl font-semibold">
            No Address Found
          </h2>

          <p className="text-gray-500 mt-2">
            Click on "Add Address" to save your first address.
          </p>

        </div>

      ) : (

        <div>
          Addresses will appear here.
        </div>

      )}

    </div>
  );
}