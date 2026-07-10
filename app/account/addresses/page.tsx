"use client";

import { useState } from "react";
import { useAddressStore } from "@/store";
import AddAddressModal from "@/components/account/AddAddressModal";
import DeleteAddressModal from "@/components/account/DeleteAddressModal";
import { toast } from "sonner";

export default function AddressesPage() {
  const [open, setOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const addresses = useAddressStore((state) => state.addresses);
  const setDefault = useAddressStore((state) => state.setDefault);
  const deleteAddress = useAddressStore((state) => state.deleteAddress);

  const handleDelete = () => {
    if (selectedId === null) return;

    deleteAddress(selectedId);

    toast.success("Address deleted successfully");

    setDeleteOpen(false);
    setSelectedId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">My Addresses</h1>
          <p className="text-gray-500 mt-2">
            Manage your saved delivery addresses.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingAddress(null);
            setOpen(true);
          }}
          className="bg-[#970747] text-white px-5 py-3 rounded-lg hover:bg-[#7d063b]"
        >
          + Add Address
        </button>
      </div>

      {/* Empty State */}
      {addresses.length === 0 ? (
        <div className="mt-10 bg-white border rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-bold">No Address Found</h2>

          <p className="text-gray-500 mt-2">
            Add your first delivery address.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white border rounded-2xl p-6 shadow-sm"
            >
              {/* Name + Default Badge */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-lg">
                    {address.fullName}
                  </h2>

                  {address.isDefault && (
                    <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="mt-5 space-y-1 text-gray-700">
                <p>{address.phone}</p>
                <p>{address.line1}</p>

                {address.line2 && <p>{address.line2}</p>}

                <p>
                  {address.city}, {address.state}
                </p>

                <p>{address.pincode}</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setEditingAddress(address);
                    setOpen(true);
                  }}
                  className="flex-1 border rounded-lg py-2 hover:bg-gray-100"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedId(address.id);
                    setDeleteOpen(true);
                  }}
                  className="flex-1 border border-red-500 text-red-500 rounded-lg py-2 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>

              {/* Default Button */}
              {!address.isDefault && (
                <button
                  onClick={() => {
                    setDefault(address.id);
                    toast.success("Default address updated");
                  }}
                  className="w-full mt-3 border border-[#970747] text-[#970747] rounded-lg py-2 hover:bg-pink-50"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AddAddressModal
        open={open}
        address={editingAddress}
        onClose={() => {
          setOpen(false);
          setEditingAddress(null);
        }}
      />

      {/* Delete Modal */}
      <DeleteAddressModal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedId(null);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}