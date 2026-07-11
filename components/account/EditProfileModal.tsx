"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuthStore } from "@/store";
import { toast } from "sonner";
interface Props {
  open: boolean;
  onClose: () => void;
  user: any;
}

export default function EditProfileModal({ open, onClose, user }: Props) {
  const [firstName, setFirstName] = useState("");
  const updateUser = useAuthStore((state) => state.updateUser);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  /*   const [phone, setPhone] = useState('');
   */
  useEffect(() => {
    if (user) {
      setFirstName(user.name?.firstname || "");
      setLastName(user.name?.lastname || "");
      setEmail(user.email || "");
      /*       setPhone(user.phone || '');
       */
    }
  }, [user]);
  const handleSave = () => {
    updateUser({
      ...user,
      name: {
        firstname: firstName,
        lastname: lastName,
      },
    });

    toast.success(" Profile updated successfully!");
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-2xl font-bold">Edit Profile</h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className="p-6 space-y-5">
          <div>
            <label className="block mb-2 font-medium">First Name</label>

            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Last Name</label>

            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              value={email}
              disabled
              className="w-full border rounded-lg px-4 py-3 bg-gray-100"
            />
          </div>
          {/* 
          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div> */}
        </div>

        {/* Footer */}

        <div className="border-t p-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#970747] text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
