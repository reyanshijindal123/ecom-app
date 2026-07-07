'use client';

import { useProducts } from '@/hooks/useProductQueries';
import ProductCard from './ProductCard';
import { ProductSkeletonGrid } from './ProductSkeleton';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Tag, Star } from 'lucide-react';
import { Product } from '@/types';

interface SectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge: { label: string; color: string };
  products: Product[];
  href: string;
}

function Section({ title, subtitle, icon, badge, products, href }: SectionProps) {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-end justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">{title}</h2>
              <span className={`hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.color}`}>
                {badge.label}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
          </div>
        </div>
        <Link
          href={href}
          className="text-xs text-[#970747] font-semibold flex items-center gap-1 hover:gap-2 transition-all hover:underline shrink-0"
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-gray-100 rounded-xl animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-6 w-40 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
      <ProductSkeletonGrid count={4} />
    </div>
  );
}

export default function HomeProductSections() {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <SectionSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
      </div>
    );
  }

  if (!products) return null;

  // Trending: most reviewed (popularity proxy)
  const trending = [...products]
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, 4);

  // Discounted: lowest price (best value)
  const discounted = [...products]
    .sort((a, b) => a.price - b.price)
    .slice(0, 4);

  // High rated: filter ≥ 4.2 stars, sort by rating
  const highRated = [...products]
    .filter((p) => p.rating.rate >= 4.2)
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 pb-6">

      {/* Divider */}
      <div className="border-t border-gray-100" />

      <Section
        title="Trending Now"
        subtitle="What shoppers are loving this week"
        icon={<TrendingUp size={18} className="text-[#970747]" />}
        badge={{ label: '🔥 Hot', color: 'bg-orange-100 text-orange-700' }}
        products={trending}
        href="/products"
      />

      <div className="border-t border-gray-100" />

      <Section
        title="Best Deals"
        subtitle="Lowest prices, highest quality"
        icon={<Tag size={18} className="text-green-600" />}
        badge={{ label: '💰 Save Big', color: 'bg-green-100 text-green-700' }}
        products={discounted}
        href="/products?sort=price-asc"
      />

      <div className="border-t border-gray-100" />

      <Section
        title="Top Rated"
        subtitle="Highly rated by verified buyers"
        icon={<Star size={18} className="text-amber-500" />}
        badge={{ label: '⭐ 4.2+', color: 'bg-amber-100 text-amber-700' }}
        products={highRated}
        href="/products?sort=rating-desc"
      />

      <div className="border-t border-gray-100" />
    </div>
  );
}
