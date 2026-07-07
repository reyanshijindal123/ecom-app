'use client';

/**
 * components/ui/DeleteConfirmModal.tsx
 * Confirmation dialog before removing an item from the cart.
 * Triggered via useUIStore.setDeleteConfirmId(id).
 */

import { useUIStore, useCartStore } from '@/store';
import { Trash2, X, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { btn, card, modal, text, iconChip } from '@/lib/styles';
import { cn } from '@/lib/utils';

export default function DeleteConfirmModal() {
  const { deleteConfirmId, setDeleteConfirmId } = useUIStore();
  const { removeItem, items } = useCartStore();

  if (deleteConfirmId === null) return null;

  const item    = items.find((i) => i.id === deleteConfirmId);
  const close   = () => setDeleteConfirmId(null);
  const confirm = () => {
    removeItem(deleteConfirmId);
    toast.error('Item removed', { description: item?.title?.slice(0, 50) });
    close();
  };

  return (
    <div className={modal.backdrop}>
      <div className={modal.overlay} onClick={close} />

      <div className={cn(modal.panel, 'max-w-[380px]')}>
        <div className={modal.strip.danger} />

        <div className="p-6">
          <button onClick={close} className={modal.closeBtn}><X size={14} /></button>

          {/* Icon */}
          <div className={cn(iconChip.base, iconChip.md, iconChip.danger, 'mx-auto mb-4')}>
            <Trash2 size={22} strokeWidth={2} />
          </div>

          <h3 className={cn(text.cardTitle, 'text-center mb-1')}>Remove item?</h3>
          <p className={cn(text.muted, 'text-center text-xs mb-5 leading-relaxed')}>
            This will be removed from your cart. You can always add it back.
          </p>

          {/* Item preview */}
          {item && (
            <div className={cn(card.flat, 'flex items-center gap-3 p-3 mb-5 bg-gray-50')}>
              <div className="relative w-14 h-14 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <Image src={item.image} alt={item.title} fill className="object-contain p-1.5" sizes="56px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug">{item.title}</p>
                <p className="text-[10px] text-[#970747] font-semibold capitalize mt-0.5">{item.category}</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                  <ShoppingBag size={10} /> Qty: {item.quantity}
                  {item.size && <span>· Size {item.size}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={close} className={cn(btn.outline, 'flex-1 py-3 text-sm')}>
              Keep it
            </button>
            <button onClick={confirm} className={cn(btn.danger, 'flex-1 py-3 text-sm')}>
              <Trash2 size={13} /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
