'use client';

import { Product } from '@/types';
import { useCartStore } from '@/store';
import { ShoppingCart, Star, Eye, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import WishlistButton from '@/components/product/WishlistButton';
import { INR } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import {toast} from 'sonner';


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const [justAdded, setJustAdded] = useState(false);

  const inCartQty = cartItems.find((i) => i.id === product.id)?.quantity ?? 0;
  const isInCart = inCartQty > 0;

  const router = useRouter();
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

 const handleAdd = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  if (!isAuthenticated) {
    toast.error('Please login first!', {
      description: 'Please login to add products to your cart.',
      action:{
        label: 'Login',
        onClick: () => router.push('/login'),
      },
    });
    return;
  }
  if (justAdded) return;

  addItem(product);
  setJustAdded(true);
  setTimeout(() => setJustAdded(false), 2000);
};

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 relative">

        {/* In-cart badge (persists while item is in cart) */}
        {isInCart && (
          <div className="absolute top-2 left-2 z-10 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
            <Check size={8} strokeWidth={3} />
            {inCartQty > 1 ? `×${inCartQty}` : 'In cart'}
          </div>
        )}

        {/* Image area */}
        <div className="relative h-48 sm:h-52 bg-gray-50 flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Wishlist button */}
          <WishlistButton productId={product.id} variant="card" />

          {/* Green "just added" flash overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-400 pointer-events-none ${
              justAdded ? 'bg-green-500/15 opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`relative flex items-center justify-center transition-all duration-300 ${justAdded ? 'scale-100' : 'scale-50'}`}>
              {/* Ripple rings */}
              {justAdded && (
                <>
                  <span className="absolute w-16 h-16 rounded-full bg-green-400/30 animate-ping" />
                  <span className="absolute w-11 h-11 rounded-full bg-green-400/20 animate-ping" style={{ animationDelay: '75ms' }} />
                </>
              )}
              <div className="relative w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40">
                <Check size={18} className="text-white" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* View details badge */}
          {!justAdded && (
            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
              <span className="flex items-center gap-1 bg-white text-[#970747] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                <Eye size={11} /> View Details
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3.5">
          <p className="text-[10px] text-[#970747] font-semibold uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2 min-h-[2.2rem]">
            {product.title}
          </h3>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-2.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={10}
                  className={s <= Math.round(product.rating.rate) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-500">({product.rating.count})</span>
          </div>

          {/* Price + Add button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-base font-bold text-gray-900">{INR(product.price)}</span>
              <span className="text-[10px] text-gray-400 ml-1 line-through">{INR(product.price * 1.3)}</span>
            </div>

            <button
              onClick={handleAdd}
              aria-label={justAdded ? 'Added to cart' : 'Add to cart'}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 overflow-hidden ${
                justAdded
                  ? 'bg-green-500 text-white scale-95 shadow-md shadow-green-500/30'
                  : isInCart
                    ? 'bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100 hover:scale-105 active:scale-95'
                    : 'bg-[#970747] hover:bg-[#7a0538] text-white hover:scale-105 active:scale-95'
              }`}
            >
              {/* Shimmer sweep when just added */}
              {justAdded && (
                <span className="absolute inset-0 bg-white/20 animate-[shimmer_0.6s_ease-out]" />
              )}
              <span className="relative flex items-center gap-1">
                {justAdded ? (
                  <><Check size={11} strokeWidth={3} />Added!</>
                ) : isInCart ? (
                  <><Check size={11} strokeWidth={3} />In Cart</>
                ) : (
                  <><ShoppingCart size={11} />Add</>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
