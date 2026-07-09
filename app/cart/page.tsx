'use client';

import { useCartStore, useUIStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Lock, Tag } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DeleteConfirmModal from '@/components/ui/ConfirmModal';
import { INR } from '@/lib/utils';
import { toast } from 'sonner';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';

/* ── Empty state ─────────────────────────────────────────────────────────── */
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Bag with 0 badge */}
      <div className="relative mb-8">
        <div className="w-28 h-28 bg-pink-50 rounded-full flex items-center justify-center">
          <ShoppingBag size={48} className="text-[#970747]/25" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-1 -right-1 bg-gray-900 text-white rounded-full w-9 h-9 flex items-center justify-center text-base font-black shadow-md">
          0
        </div>
      </div>

      <h2 className="text-2xl font-black text-gray-900 mb-2">0 items in your cart</h2>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-8">
        Your cart is empty. Browse our collection and add something you love.
      </p>

      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-[#970747] text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-[#7a0538] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#970747]/20"
      >
        Start Shopping <ArrowRight size={16} />
      </Link>
    </div>
  );
}

/* ── Cart with items */
function CartItems() {
  const { items, updateQuantity, clearCart, totalItems, totalPrice } = useCartStore();
  const router = useRouter();
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

const checkLogin = () => {
  if (!isAuthenticated) {
    toast.error('Please login first!', {
      description: 'Login to manage your cart.',
      action: {
        label: 'Login',
        onClick: () => router.push('/login'),
      },
    });
    return false;
  }
  return true;
};
  const { setDeleteConfirmId } = useUIStore();
  const subtotal = totalPrice();
  const shipping = subtotal * 83 > 3999 ? 0 : 99;
  const tax = subtotal * 83 * 0.18;
  const grand = subtotal * 83 + shipping + tax;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <DeleteConfirmModal />

      {/* Item list */}
      <div className="lg:col-span-2 space-y-3">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-black text-gray-900 text-lg">
            {totalItems()} {totalItems() === 1 ? 'Item' : 'Items'}
          </h2>
          <button
            onClick={() => { 
              if(!checkLogin()) return;
              clearCart();
              toast.error('Cart cleared');
            }}
            className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium"
          >
            Clear all
          </button>
        </div>

        {items.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 sm:gap-4"
          >
            <Link
              href={`/products/${item.id}`}
              className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 hover:opacity-80 transition-opacity"
            >
              <Image src={item.image} alt={item.title} fill className="object-contain p-2" sizes="80px" />
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.id}`}
                className="text-sm font-bold text-gray-800 hover:text-[#970747] transition-colors line-clamp-2 block"
              >
                {item.title}
              </Link>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-[11px] text-[#970747] font-semibold capitalize">{item.category}</p>
                {item.size && (
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">
                    Size: {item.size}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mt-3">
                {/* Qty stepper */}
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-3 py-1.5 text-sm font-black border-x-2 border-gray-200 min-w-[36px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-gray-900">{INR(item.price * item.quantity)}</span>
                  <button
                    onClick={() => {
                      if(!checkLogin()) return;
                      setDeleteConfirmId(item.id);
                    }}
                    className="text-gray-300 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Coupon */}
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-4 flex gap-2">
          <Tag size={16} className="text-gray-400 shrink-0 mt-0.5" />
          <input
            placeholder="Enter coupon code"
            className="flex-1 text-sm bg-transparent focus:outline-none text-gray-600 placeholder:text-gray-300"
          />
          <button className="text-xs font-bold text-[#970747] hover:underline">Apply</button>
        </div>
      </div>

      {/* Order summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
          <h3 className="font-black text-gray-900 text-base mb-4">Order Summary</h3>

          <div className="space-y-2.5 text-sm border-b border-gray-100 pb-4 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({totalItems()} items)</span>
              <span className="font-semibold">{INR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (18%)</span>
              <span className="font-semibold">₹{Math.round(tax)}</span>
            </div>
          </div>

          <div className="flex justify-between font-black text-gray-900 text-base mb-5">
            <span>Total</span>
            <span>₹{Math.round(grand).toLocaleString('en-IN')}</span>
          </div>

          {shipping > 0 && (
            <div className="bg-green-50 rounded-xl p-2.5 mb-4 text-xs text-green-700 text-center">
              Add {INR((3999 - subtotal * 83) / 83)} more for <strong>FREE shipping</strong> 🎉
            </div>
          )}

          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 bg-[#970747] text-white py-3.5 rounded-2xl font-black hover:bg-[#7a0538] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#970747]/20 text-sm"
          >
            <Lock size={14} /> Proceed to Checkout
          </Link>

          <Link
            href="/products"
            className="mt-3 w-full flex items-center justify-center text-xs text-gray-400 hover:text-[#970747] transition-colors py-2"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Page  */
function CartContent() {
  const items = useCartStore((s) => s.items);
  // When empty: ONLY show the empty state, nothing else
  if (items.length === 0) return <EmptyCart />;
  return <CartItems />;
}

export default function CartPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Title only shown when cart has items */}
        <CartContent />
      </div>
    </ProtectedRoute>
  );
}
