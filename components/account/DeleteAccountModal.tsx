"use client";

import { useState } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({ open, onClose }: Props) {
  const [text, setText] = useState("");

  if (!open) return null;

  const handleDelete = () => {
    if (text !== "DELETE") {
      alert("Type DELETE to confirm.");
      return;
    }

    alert("Account Deleted Successfully");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-red-600">
            <Trash2 />
            Delete Account
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-5 flex items-start gap-3 rounded-xl bg-red-50 p-4">
            <AlertTriangle className="text-red-600" />

            <p className="text-sm text-red-700">
              This action is permanent. Your account and all associated data
              will be deleted forever.
            </p>
          </div>

          <p className="mb-3 text-sm">
            Type
            <span className="mx-1 rounded bg-gray-100 px-2 py-1 font-bold">
              DELETE
            </span>
            to confirm.
          </p>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-xl border p-3 outline-none focus:border-red-500"
            placeholder="Type DELETE"
          />
        </div>

        <div className="flex justify-end gap-3 border-t p-5">
          <button onClick={onClose} className="rounded-xl border px-5 py-2">
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
