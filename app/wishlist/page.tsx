"use client";

import { useWishlistStore, useCartStore } from "@/store";
import { useProducts } from "@/hooks/useProductQueries";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { INR } from "@/lib/utils";
import { toast } from "sonner";

function WishlistContent() {
  const { ids, toggle } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const { data: products } = useProducts();

  const wishlisted = products?.filter((p) => ids.includes(p.id)) || [];

  if (wishlisted.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <Heart size={36} className="text-[#970747]/30" />
        </div>
        <h2 className="text-xl font-black text-gray-900 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 text-sm mb-7">
          Save items you love to buy later
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#970747] text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-[#7a0538] transition-colors"
        >
          Explore Products <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-500 text-sm mb-5">
        {wishlisted.length} saved {wishlisted.length === 1 ? "item" : "items"}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlisted.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group"
          >
            <Link
              href={`/products/${p.id}`}
              className="relative block h-44 bg-gray-50"
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </Link>
            <div className="p-3.5">
              <p className="text-[10px] text-[#970747] font-semibold uppercase tracking-wide mb-0.5">
                {p.category}
              </p>
              <Link href={`/products/${p.id}`}>
                <h3 className="text-xs font-bold text-gray-800 line-clamp-2 mb-2 hover:text-[#970747] transition-colors">
                  {p.title}
                </h3>
              </Link>
              <p className="text-sm font-black text-gray-900 mb-3">
                {INR(p.price)}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    addItem(p);
                    toast.success("Added to cart!");
                  }}
                  className="flex-1 flex items-center justify-center gap-1 bg-[#970747] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#7a0538] transition-colors"
                >
                  <ShoppingCart size={12} /> Add
                </button>
                <button
                  onClick={() => {
                    toggle(p.id);
                    toast("Removed from wishlist");
                  }}
                  className="w-9 flex items-center justify-center border border-gray-200 rounded-xl text-red-400 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WishlistPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <Heart size={22} className="text-[#970747] fill-[#970747]" /> My
          Wishlist
        </h1>
        <WishlistContent />
      </div>
    </ProtectedRoute>
  );
}
