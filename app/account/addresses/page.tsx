"use client";

import { useState } from "react";
import { useAddressStore } from "@/store";
import AddAddressModal from "@/components/account/AddAddressModal";
import DeleteAddressModal from "@/components/account/DeleteAddressModal";
import { toast } from "sonner";
import { MapPinned } from "lucide-react";

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
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 sm:text-4xl">
            My Addresses
          </h1>

          <p className="mt-2 max-w-md text-sm text-gray-500 sm:text-base">
            Manage your saved delivery addresses.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingAddress(null);
            setOpen(true);
          }}
          className="w-full sm:w-auto rounded-xl bg-[#970747] px-6 py-3 font-semibold text-white shadow-lg shadow-[#970747]/20 transition hover:-translate-y-0.5 hover:bg-[#7d063b]"
        >
          + Add Address
        </button>
      </div>

      {/* Empty State */}
      {addresses.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-pink-200 bg-pink-50/40 px-6 py-16 text-center">
          <h2 className="text-2xl font-bold">No Address Found</h2>

          <p className="mt-3 text-gray-500">Add your first delivery address.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="rounded-3xl border border-gray-200bg-white p-6 shadow-sm transition-all duration-300 hover:- translate-y-1 hover: shadow-xl"
            >
              {/* Name + Default Badge */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-lg">{address.fullName}</h2>

                  {address.isDefault && (
                    <span className="inline-block mt-2 text-xs bg-[#970747]/10 text-[#970747] px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="mt-5 space-y-2 text-sm leading-6 text-gray-600">
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
                  className="flex-1 rounded-xl border py-2.5 font-medium transition hover:bg-gray-100"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedId(address.id);
                    setDeleteOpen(true);
                  }}
                  className="flex-1 rounded-xl border border-red-300 py-2.5 font-medium text-red-500 transition hover:bg-red-50"
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
                  className="w-full mt-3 border border-[#970747] text-[#970747] rounded-xl py-2.5 hover:bg-pink-50"
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
