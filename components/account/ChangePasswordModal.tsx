'use client';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl">
        <h2 className="text-xl font-bold">
          Change Password
        </h2>

        <button
          onClick={onClose}
          className="mt-4 bg-[#970747] text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}