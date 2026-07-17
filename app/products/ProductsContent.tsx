"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { useProducts } from "@/hooks/useProductQueries";
import { useFilterStore } from "@/store";

import ProductCard from "@/components/product/ProductCard";
import { ProductSkeletonGrid } from "@/components/product/ProductSkeleton";
import CategoryFilter from "@/components/product/CategoryFilter";
import ProductSorting from "@/components/product/ProductSorting";
import PriceRangeSlider from "@/components/product/PriceRangeSlider";
import Pagination from "@/components/Pagination";
import DesktopFilterSidebar from "@/components/product/DesktopFilterSidebar";
import { Package, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";

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
  const router = useRouter();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile Filter Modal
  const [showFilters, setShowFilters] = useState(false);

  // Desktop Filter Modal
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);

  // Mobile Sort Modal
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  // Lock background scroll whenever any modal is open
  useEffect(() => {
    if (showFilters || showSort) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showFilters, showSort]);

  const productsPerPage = 8;

  useEffect(() => {
    const cat = searchParams.get("category");

    if (cat) {
      setCategory(cat);
    }
  }, [searchParams, setCategory]);

  const filtered = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    switch (sort) {
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating-desc":
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
    }

    return result;
  }, [products, category, search, sort, minPrice, maxPrice]);

  const totalPages = Math.ceil(filtered.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filtered.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const handleClearAll = () => {
    resetFilters();
    setCurrentPage(1);

    setShowFilters(false);
    setShowDesktopFilters(false);
    setShowSort(false);

    router.push("/products");
  };

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 pb-24 lg:pb-10">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>

        <p className="mt-2 text-gray-500">{filtered.length} Products</p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Desktop Sidebar */}
        <DesktopFilterSidebar onClear={handleClearAll} />

        {/* Products Section */}
        <div className="flex-1">
          {/* Top Bar */}

          <div className="mb-6 flex items-center justify-between">
            {/* Left */}
            <p className="text-gray-500 text-sm">
              Showing {currentProducts.length} of {filtered.length} products
            </p>

            {/* Right */}
            <div className="hidden lg:flex items-center gap-3 ml-auto">
              <span className="text-sm font-semibold text-gray-700">
                Sort By
              </span>

              <div className="w-full min-w-[260px] rounded-xl border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-800 shadow-sm transition-all duration-200 hover:border-[#970747] focus:border-[#970747] focus:ring-2 focus:ring-[#970747]/20 focus:outline-none cursor-pointer">
                <ProductSorting />
              </div>
            </div>
          </div>

          {isLoading ? (
            <ProductSkeletonGrid count={8} />
          ) : isError ? (
            <div className="py-24 text-center">
              <p className="text-lg font-semibold text-red-500">
                Failed to load products.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <Package size={60} className="mx-auto mb-5 text-gray-300" />

              <h3 className="text-2xl font-bold">No Products Found</h3>

              <p className="mt-2 text-gray-500">Try changing your filters.</p>

              <button
                onClick={resetFilters}
                className="mt-6 rounded-xl bg-[#970747] px-6 py-3 text-white transition hover:bg-[#7d063b]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* Product Grid */}

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}

              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page);

                      const params = new URLSearchParams(
                        searchParams.toString(),
                      );

                      params.set("page", page.toString());

                      router.push(`/products?${params.toString()}`);
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* ================= MOBILE BOTTOM ACTION BAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex border-t bg-white lg:hidden">
        <button
          onClick={() => setShowFilters(true)}
          className="flex flex-1 items-center justify-center gap-2 border-r py-4 font-semibold"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>

        <button
          onClick={() => setShowSort(true)}
          className="flex flex-1 items-center justify-center gap-2 py-4 font-semibold"
        >
          <ArrowUpDown size={18} />
          Sort
        </button>
      </div>

      {/* ================= MOBILE FILTER MODAL ================= */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="text-xl font-bold">Filters</h2>

            <button onClick={() => setShowFilters(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-8">
            <CategoryFilter />

            <PriceRangeSlider />
          </div>

          <div className="border-t p-4 flex gap-3">
            <button
              onClick={handleClearAll}
              className="flex-1 rounded-xl border border-[#970747] py-3 font-semibold text-[#970747]"
            >
              Clear
            </button>

            <button
              onClick={() => setShowFilters(false)}
              className="flex-1 rounded-xl bg-[#970747] py-3 font-semibold text-white"
            >
              Apply
            </button>
          </div>
        </div>
      )}
      {/* ================= MOBILE SORT MODAL ================= */}
      {showSort && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="text-xl font-bold">Sort By</h2>

            <button onClick={() => setShowSort(false)}>
              <X size={24} />
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex-1 overflow-y-auto p-5">
            <div className="lg:hidden">
              <ProductSorting />
            </div>
          </div>

          {/* Bottom Button */}
          <div className="border-t p-4">
            <button
              onClick={() => setShowSort(false)}
              className="w-full rounded-xl bg-[#970747] py-3 font-semibold text-white"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
