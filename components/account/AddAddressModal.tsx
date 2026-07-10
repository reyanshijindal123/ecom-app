'use client';

import { useState } from 'react';
import { useAddressStore } from '@/store';
import { toast } from 'sonner';
import {useEffect } from "react";



interface Props {
  open: boolean;
  onClose: () => void;
  address?: any;
}

export default function AddAddressModal({
  open,
  onClose,
  address,
}: Props) {
  const addAddress = useAddressStore((state) => state.addAddress);
  const updateAddress = useAddressStore(
  (state) => state.updateAddress
);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  useEffect(() => {
    if (address) {
      setFullName(address.fullName);
      setPhone(address.phone);
      setLine1(address.line1);
      setLine2(address.line2);
      setCity(address.city);
      setState(address.state);
      setPincode(address.pincode);
    } else {
      setFullName('');
      setPhone('');
      setLine1('');
      setLine2('');
      setCity('');
      setState('');
      setPincode('');
    }
  }, [address]);


  if (!open) return null;
  const handleSave = () => {
  if (
    !fullName ||
    !phone ||
    !line1 ||
    !city ||
    !state ||
    !pincode
  ) {
    toast.error("Please fill all fields");
    return;
  }

  const newAddress = {
    id: address ? address.id : Date.now(),
    fullName,
    phone,
    line1,
    line2,
    city,
    state,
    pincode,
    isDefault: address ? address.isDefault : false,
  };

  if (address) {
    updateAddress(newAddress);
    toast.success("Address updated successfully");
  } else {
    addAddress(newAddress);
    toast.success("Address added successfully");
  }

  onClose();
};

       
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl">

        {/* Header */}

        <div className="border-b px-6 py-4 flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Add Address
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-4">

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full border rounded-lg p-3"
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            placeholder="House No, Street, Area"
            className="w-full border rounded-lg p-3"
          />

          <input
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
            placeholder="Landmark (Optional)"
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="border rounded-lg p-3"
            />

            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              className="border rounded-lg p-3"
            />

          </div>

          <input
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Pincode"
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Footer */}

        <div className="border-t p-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-[#970747] hover:bg-[#7c053b] text-white px-5 py-2 rounded-lg"
          >
            {address ? "Update Address" : "Save Address"}
          </button>

        </div>

      </div>

    </div>
  );
}