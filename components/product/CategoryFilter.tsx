"use client";

import { useCategories } from "@/hooks/useProductQueries";
import { useFilterStore } from "@/store";
import { Loader2 } from "lucide-react";

export default function CategoryFilter() {
  const { data: categories, isLoading } = useCategories();

  const { category, setCategory } = useFilterStore();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-4">
        <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
        <span className="text-sm text-gray-500">Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 pb-8">
      <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-5">
        Categories
      </h3>

      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="category"
            checked={category === ""}
            onChange={() => setCategory("")}
            className="accent-[#970747] w-4 h-4"
          />

          <span className="text-sm text-gray-700">All Products</span>
        </label>

        {categories?.map((cat) => (
          <label key={cat} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={category === cat}
              onChange={() => setCategory(cat)}
              className="accent-[#970747] w-4 h-4"
            />

            <span className="text-sm text-gray-700 capitalize">{cat}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
