"use client";

import CategoryFilter from "./CategoryFilter";
import PriceRangeSlider from "./PriceRangeSlider";

interface Props {
  onClear: () => void;
}

export default function DesktopFilterSidebar({ onClear }: Props) {
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-24 h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-8">Filters</h2>

        {/* Category */}
        <div className="mb-8">
          <CategoryFilter />
        </div>

        {/* Price */}
        <div className="mb-8">
          <PriceRangeSlider />
        </div>

        <button
          onClick={onClear}
          className="mt-4 w-full rounded-xl border border-[#970747] py-3 font-semibold text-[#970747] transition hover:bg-[#970747] hover:text-white"
        >
          Clear All
        </button>
      </div>
    </aside>
  );
}
