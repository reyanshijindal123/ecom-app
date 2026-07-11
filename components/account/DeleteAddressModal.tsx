'use client';

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteAddressModal({
  open,
  onClose,
  onDelete,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        <div className="border-b p-6">
          <h2 className="text-2xl font-bold text-red-600">
            Delete Address
          </h2>

          <p className="mt-2 text-gray-600">
            Are you sure you want to delete this address?
            <br />
            This action cannot be undone.
          </p>
        </div>

<div className="flex items-center justify-end gap-3 p-6">
  <button
    onClick={onClose}
    className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
  >
    Cancel
  </button>

  <button
    onClick={onDelete}
    className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
  >
    Delete
  </button>
</div>
      
      </div>
    </div>
  );
}