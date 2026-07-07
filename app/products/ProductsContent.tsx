'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProductQueries';
import { useFilterStore } from '@/store';
import { Product, SortOption } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import { ProductSkeletonGrid } from '@/components/product/ProductSkeleton';
import SearchBar from '@/components/product/SearchBar';
import CategoryFilter from '@/components/product/CategoryFilter';
import ProductSorting from '@/components/product/ProductSorting';
import PriceRangeSlider from '@/components/product/PriceRangeSlider';
import { Package, SlidersHorizontal, X } from 'lucide-react';
import { INR } from '@/lib/utils';

const DEFAULT_MAX = 1000;

export default function ProductsContent() {
  const { data: products, isLoading, isError } = useProducts();
  const { category, search, sort, minPrice, maxPrice, setCategory, resetFilters } = useFilterStore();
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams, setCategory]);

  const filtered = useMemo(() => {
    if (!products) return [];
    let result: Product[] = [...products];

    if (category) result = result.filter((p) => p.category === category);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price filter — compare USD prices directly
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    const sortMap: Record<SortOption, (a: Product, b: Product) => number> = {
      'title-asc': (a, b) => a.title.localeCompare(b.title),
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'rating-desc': (a, b) => b.rating.rate - a.rating.rate,
    };

    result.sort(sortMap[sort]);
    return result;
  }, [products, category, search, sort, minPrice, maxPrice]);

  const priceFiltered = minPrice > 0 || maxPrice < DEFAULT_MAX;
  const activeFilterCount = (category ? 1 : 0) + (priceFiltered ? 1 : 0);
  const hasActiveFilters = !!(category || search || priceFiltered);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-500 mt-1">
          {isLoading ? 'Loading...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      {/* Controls bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex-1 w-full">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ProductSorting />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                showFilters || activeFilterCount > 0
                  ? 'bg-[#970747] text-white border-[#970747]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#970747]'
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-white text-[#970747] rounded-full w-4 h-4 text-xs flex items-center justify-center font-bold leading-none">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable filter panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <CategoryFilter />
            <PriceRangeSlider />
          </div>
        )}

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500">Active:</span>

            {category && (
              <span className="inline-flex items-center gap-1 bg-pink-50 text-[#970747] text-xs px-2.5 py-1 rounded-full font-medium">
                {category}
                <button onClick={() => setCategory('')} className="hover:text-[#7a0538]"><X size={11} /></button>
              </span>
            )}

            {priceFiltered && (
              <span className="inline-flex items-center gap-1 bg-pink-50 text-[#970747] text-xs px-2.5 py-1 rounded-full font-medium">
                {INR(minPrice)} – {maxPrice >= DEFAULT_MAX ? 'Any' : INR(maxPrice)}
                <button
                  onClick={() => useFilterStore.getState().setPriceRange(0, DEFAULT_MAX)}
                  className="hover:text-[#7a0538]"
                >
                  <X size={11} />
                </button>
              </span>
            )}

            {search && (
              <span className="inline-flex items-center gap-1 bg-pink-50 text-[#970747] text-xs px-2.5 py-1 rounded-full font-medium">
                &ldquo;{search}&rdquo;
                <button onClick={() => useFilterStore.getState().setSearch('')} className="hover:text-[#7a0538]"><X size={11} /></button>
              </span>
            )}

            <button onClick={resetFilters} className="text-xs text-gray-400 underline hover:text-[#970747] ml-1">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Product grid */}
      {isLoading ? (
        <ProductSkeletonGrid count={8} />
      ) : isError ? (
        <div className="text-center py-20 text-red-500">
          <p className="font-medium">Failed to load products.</p>
          <p className="text-sm text-gray-400 mt-1">Please try again later.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 font-semibold">No products found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or price range</p>
          <button
            onClick={resetFilters}
            className="mt-5 px-6 py-2.5 bg-[#970747] text-white rounded-xl text-sm font-semibold hover:bg-[#7a0538] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
