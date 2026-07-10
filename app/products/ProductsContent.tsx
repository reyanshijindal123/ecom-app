'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProductQueries';
import { useFilterStore } from '@/store';
import ProductCard from '@/components/product/ProductCard';
import { ProductSkeletonGrid } from '@/components/product/ProductSkeleton';
import SearchBar from '@/components/product/SearchBar';
import CategoryFilter from '@/components/product/CategoryFilter';
import ProductSorting from '@/components/product/ProductSorting';
import PriceRangeSlider from '@/components/product/PriceRangeSlider';
import Pagination from '@/components/Pagination';
import { Package, SlidersHorizontal, X } from 'lucide-react';
import { INR } from '@/lib/utils';

const DEFAULT_MAX = 1000;

export default function ProductsContent() {
  const { data: products, isLoading, isError } = useProducts();

  const {
    category,
    search,
    sort,
    minPrice,
    maxPrice,
    setCategory,
    resetFilters,
  } = useFilterStore();

  const searchParams = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    const cat = searchParams.get('category');

    if (cat) {
      setCategory(cat);
    }
  }, [searchParams, setCategory]);

  const filtered = useMemo(() => {
    if (!products) return [];

    type ProductType = NonNullable<typeof products>[number];

    let result = [...products];

    // Category

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    // Search

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price

    result = result.filter(
      (p) =>
        p.price >= minPrice &&
        p.price <= maxPrice
    );

    // Sorting

    const sortMap: Record<
      string,
      (a: ProductType, b: ProductType) => number
    > = {
      'title-asc': (a, b) =>
        a.title.localeCompare(b.title),

      'price-asc': (a, b) =>
        a.price - b.price,

      'price-desc': (a, b) =>
        b.price - a.price,

      'rating-desc': (a, b) =>
        b.rating.rate - a.rating.rate,
    };

    result.sort(sortMap[sort]);

    return result;
  }, [
    products,
    category,
    search,
    sort,
    minPrice,
    maxPrice,
  ]);

  // Pagination

  const totalPages = Math.ceil(
    filtered.length / productsPerPage
  );

  const indexOfLastProduct =
    currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts = filtered.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Reset page whenever filter changes

  useEffect(() => {
    setCurrentPage(1);
  }, [
    category,
    search,
    sort,
    minPrice,
    maxPrice,
  ]);

  const priceFiltered =
    minPrice > 0 || maxPrice < DEFAULT_MAX;

  const activeFilterCount =
    (category ? 1 : 0) +
    (priceFiltered ? 1 : 0);

  const hasActiveFilters =
    !!(category || search || priceFiltered);

  return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          All Products
        </h1>

        <p className="text-gray-500 mt-1">
          {isLoading
            ? "Loading..."
            : `${filtered.length} product${
                filtered.length !== 1 ? "s" : ""
              } found`}
        </p>
      </div>

      {/* Controls */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

          <div className="w-full sm:flex-1 sm: max-w-3xl">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2 shrink-0">

            <ProductSorting />

            <button
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                showFilters || activeFilterCount > 0
                  ? "bg-[#970747] text-white border-[#970747]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#970747]"
              }`}
            >
              <SlidersHorizontal size={14} />

              Filters

              {activeFilterCount > 0 && (
                <span className="bg-white text-[#970747] rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Filter Panel */}

        {showFilters && (

          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-5">

            <CategoryFilter />

            <PriceRangeSlider />

          </div>

        )}

        {/* Active Filters */}

        {hasActiveFilters && (

          <div className="mt-3 flex flex-wrap gap-2">

            {category && (
              <span className="bg-pink-50 text-[#970747] px-3 py-1 rounded-full text-xs flex items-center gap-1">

                {category}

                <button
                  onClick={() => setCategory("")}
                >
                  <X size={11} />
                </button>

              </span>
            )}

            {priceFiltered && (

              <span className="bg-pink-50 text-[#970747] px-3 py-1 rounded-full text-xs flex items-center gap-1">

                {INR(minPrice)} - {maxPrice >= DEFAULT_MAX ? "Any" : INR(maxPrice)}

                <button
                  onClick={() =>
                    useFilterStore
                      .getState()
                      .setPriceRange(0, DEFAULT_MAX)
                  }
                >
                  <X size={11} />
                </button>

              </span>

            )}

            {search && (

              <span className="bg-pink-50 text-[#970747] px-3 py-1 rounded-full text-xs flex items-center gap-1">

                "{search}"

                <button
                  onClick={() =>
                    useFilterStore
                      .getState()
                      .setSearch("")
                  }
                >
                  <X size={11} />
                </button>

              </span>

            )}

            <button
              onClick={resetFilters}
              className="text-xs underline text-gray-500"
            >
              Clear All
            </button>

          </div>

        )}

      </div>

      {/* Product Grid */}

      {isLoading ? (

        <ProductSkeletonGrid count={8} />

      ) : isError ? (

        <div className="text-center py-20">

          <p className="text-red-500 font-semibold">
            Failed to load products.
          </p>

        </div>

      ) : filtered.length === 0 ? (

        <div className="text-center py-20">

          <Package
            size={50}
            className="mx-auto text-gray-300 mb-4"
          />

          <h3 className="text-lg font-semibold">
            No Products Found
          </h3>

          <button
            onClick={resetFilters}
            className="mt-5 bg-[#970747] text-white px-6 py-2 rounded-xl"
          >
            Reset Filters
          </button>

        </div>

      ) : (

        <>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

            {currentProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

          {/* Pagination */}

          {totalPages > 1 && (

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

          )}

        </>

      )}

    </div>

  );
}