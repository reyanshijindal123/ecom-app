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

import {
  Package,
  SlidersHorizontal,
  ArrowUpDown,
  X,
} from "lucide-react";

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
    if (showFilters || showDesktopFilters || showSort) {
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
  }, [showFilters, showDesktopFilters, showSort]);

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
          p.description.toLowerCase().includes(q)
      );
    }

    result = result.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

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
  }, [
    products,
    category,
    search,
    sort,
    minPrice,
    maxPrice,
  ]);

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
      <h1 className="text-3xl font-bold text-gray-900">
        All Products
      </h1>

      <p className="mt-2 text-gray-500">
        {filtered.length} Products
      </p>
    </div>

    {/* Main Layout */}
    <div className="flex gap-8">

      {/* Products Section */}
      <div className="flex-1">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">

          {/* Showing Products */}
          <p className="text-sm text-gray-500">
            Showing {currentProducts.length} of {filtered.length} products
          </p>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Filter Button */}
            <button
              onClick={() => setShowDesktopFilters(true)}
              className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 font-semibold transition-all hover:border-[#970747] hover:text-[#970747] hover:shadow-md"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

            {/* Sort */}
            <div className="flex items-center gap-3">

              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                Sort By
              </span>

              <div className="w-56">
                <ProductSorting />
              </div>

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

    <Package
      size={60}
      className="mx-auto mb-5 text-gray-300"
    />

    <h3 className="text-2xl font-bold">
      No Products Found
    </h3>

    <p className="mt-2 text-gray-500">
      Try changing your filters.
    </p>

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

        <ProductCard
          key={product.id}
          product={product}
        />

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
              searchParams.toString()
            );

            params.set("page", page.toString());

            router.push(
              `/products?${params.toString()}`
            );

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
      <h2 className="text-xl font-bold">
        Filters
      </h2>

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
         {/* ================= DESKTOP FILTER MODAL ================= */}

      {showDesktopFilters && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setShowDesktopFilters(false)}
            className="hidden lg:block fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="hidden lg:flex fixed inset-0 z-50 items-center justify-center p-6">

            <div className="w-full max-w-2xl rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">

              <div className="flex items-center justify-between bg-gradient-to-r from-[#970747] to-pink-600 px-8 py-6">

                <div>
                  <h2 className="text-2xl font-bold text-white">Filters</h2>
                  <p className="text-pink-100 text-sm mt-1">
                    Refine your shopping experience
                  </p>
                </div>

                <button
                  onClick={() => setShowDesktopFilters(false)}
                  className="h-11 w-11 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
                >
                  <X className="text-white" size={22} />
                </button>

              </div>

              <div className="max-h-[65vh] overflow-y-auto p-8 space-y-8 bg-gray-50">
                <div className="rounded-2xl bg-white p-6 shadow-sm border">
                  <CategoryFilter />
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm border">
                  <PriceRangeSlider />
                </div>
              </div>

              <div className="flex gap-4 border-t bg-white p-6">
                <button
                  onClick={handleClearAll}
                  className="flex-1 rounded-xl border border-[#970747] py-3 font-semibold text-[#970747] transition hover:bg-pink-50"
                >
                  Clear All
                </button>

                <button
                  onClick={() => setShowDesktopFilters(false)}
                  className="flex-1 rounded-xl bg-[#970747] py-3 font-semibold text-white transition hover:bg-[#7a0538] shadow-lg shadow-pink-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* ================= MOBILE SORT MODAL ================= */}
{showSort && (
  <div className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col">

    <div className="flex items-center justify-between border-b px-5 py-4">
      <h2 className="text-xl font-bold">
        Sort By
      </h2>

      <button onClick={() => setShowSort(false)}>
        <X size={24} />
      </button>
    </div>

    <div className="flex-1 p-5">

      <ProductSorting />

    </div>

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
