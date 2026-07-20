"use client";

import { useUIStore, useCartStore } from "@/store";
import { Trash2, X, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { btn, card, modal, text, iconChip } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function ClearCartModal() {
  const { clearCartModal, setClearCartModal } = useUIStore();
  const { clearCart, totalItems } = useCartStore();

  if (!clearCartModal) return null;

  const close = () => setClearCartModal(false);

  const confirm = () => {
    clearCart();
    toast.success("Cart cleared successfully");
    close();
  };

  return (
    <div className={modal.backdrop}>
      <div className={modal.overlay} onClick={close} />

      <div className={cn(modal.panel, "max-w-[380px]")}>
        <div className={modal.strip.danger} />

        <div className="p-6">
          <button onClick={close} className={modal.closeBtn}>
            <X size={14} />
          </button>

          {/* Icon */}
          <div
            className={cn(
              iconChip.base,
              iconChip.md,
              iconChip.danger,
              "mx-auto mb-4",
            )}
          >
            <Trash2 size={22} strokeWidth={2} />
          </div>

          <h3 className={cn(text.cardTitle, "text-center mb-1")}>
            Clear Cart?
          </h3>

          <p
            className={cn(
              text.muted,
              "text-center text-xs mb-5 leading-relaxed",
            )}
          >
            This will remove every item from your shopping cart. This action
            cannot be undone.
          </p>

          {/* Preview */}
          <div
            className={cn(
              card.flat,
              "bg-gray-50 p-4 rounded-xl text-center mb-5",
            )}
          >
            <div className="flex justify-center mb-2">
              <ShoppingCart size={26} className="text-[#970747]" />
            </div>

            <p className="font-semibold text-gray-800">
              {totalItems()} {totalItems() === 1 ? "item" : "items"} will be
              removed.
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Your cart will become empty.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={close}
              className={cn(btn.outline, "flex-1 py-3 text-sm")}
            >
              Cancel
            </button>

            <button
              onClick={confirm}
              className={cn(btn.danger, "flex-1 py-3 text-sm")}
            >
              <Trash2 size={13} />
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
