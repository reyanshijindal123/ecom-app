'use client';

import { useWishlistStore, useAuthStore } from '@/store';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {toast} from "sonner";

interface WishlistButtonProps {
  productId: number;
  productTitle?: string;
  /** 'card' = small floating pill in top-right corner of card image
   *  'detail' = larger standalone button on product detail page */
  variant?: 'card' | 'detail';
  className?: string;
}

export default function WishlistButton({
  productId,
  productTitle,
  variant = 'card',
  className = '',
}: WishlistButtonProps) {
  const { toggle, isWishlisted } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const wishlisted = isWishlisted(productId);
  const [animating, setAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
  toast.error("Please login first to add items to your wishlist.");

  setTimeout(() => {
    router.push("/login?redirect=/wishlist");
  }, 1000);

  return;
}

    setAnimating(true);
    toggle(productId);
    setTimeout(() => setAnimating(false), 400);
  };

  /* ── Card variant ── */
  if (variant === 'card') {
    return (
      <button
        onClick={handleClick}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`
          absolute top-2.5 right-2.5 z-10
          w-8 h-8 rounded-full shadow-md
          flex items-center justify-center
          transition-all duration-200
          ${wishlisted
            ? 'bg-[#970747] text-white scale-110'
            : 'bg-white text-gray-400 hover:text-[#970747] hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100 sm:scale-90 sm:group-hover:scale-100'
          }
          ${animating ? 'scale-125' : ''}
          ${className}
        `}
      >
        <Heart
          size={14}
          className={`transition-all duration-200 ${wishlisted ? 'fill-white' : ''} ${animating ? 'scale-125' : ''}`}
        />
      </button>
    );
  }

  /* ── Detail variant ── */
  return (
    <button
      onClick={handleClick}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
      title={productTitle ? (wishlisted ? `Remove "${productTitle}" from wishlist` : `Save "${productTitle}" to wishlist`) : undefined}
      className={`
        group flex items-center gap-2.5 px-5 py-3.5 rounded-2xl border-2 font-semibold text-sm
        transition-all duration-200
        ${wishlisted
          ? 'border-[#970747] bg-[#970747]/5 text-[#970747]'
          : 'border-gray-200 bg-white text-gray-600 hover:border-[#970747] hover:text-[#970747] hover:bg-[#970747]/5'
        }
        ${animating ? 'scale-95' : 'hover:-translate-y-0.5'}
        ${className}
      `}
    >
      <Heart
        size={18}
        className={`transition-all duration-300 ${wishlisted ? 'fill-[#970747] scale-110' : 'group-hover:scale-110'} ${animating ? 'scale-125' : ''}`}
      />
      <span>{wishlisted ? 'Wishlisted' : 'Save to Wishlist'}</span>
    </button>
  );
}
