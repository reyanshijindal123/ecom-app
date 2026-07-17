"use client";

import { cn } from "@/lib/utils";
import { iconChip } from "@/lib/styles";

import { PaymentMethod } from "@/types/checkout";

export default function PaymentRow({
  method,
  selected,
  onSelect,
}: {
  method: PaymentMethod;

  selected: boolean;

  onSelect: () => void;
}) {
  const { icon: Icon, label, desc } = method;

  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all duration-150",

        selected
          ? "border-[#970747] bg-pink-50"
          : "border-gray-100 hover:border-gray-200",
      )}
    >
      <div
        className={cn(
          iconChip.base,

          iconChip.sm,

          selected ? "bg-[#970747] text-white" : "bg-gray-100 text-gray-500",
        )}
      >
        <Icon size={15} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800">{label}</p>

        <p className="text-[11px] text-gray-500">{desc}</p>
      </div>

      <div
        className={cn(
          "w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center",

          selected ? "border-[#970747]" : "border-gray-300",
        )}
      >
        {selected && (
          <div
            className="
w-2 h-2 rounded-full 
bg-[#970747]
"
          />
        )}
      </div>
    </button>
  );
}
