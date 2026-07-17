'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 group"
    >
      <div className="w-10 h-10 rounded-xl bg-[#970747] flex items-center justify-center shadow-lg shadow-[#970747]/25 group-hover:scale-105 transition-transform">
        <ShoppingBag size={18} className="text-white" />
      </div>

      <span className="text-xl font-black tracking-tight text-[#970747]">
        Velvet<span className="text-gray-800">Store</span>
      </span>
    </Link>
  );
}