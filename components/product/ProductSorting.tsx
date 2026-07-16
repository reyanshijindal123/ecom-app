"use client";

import { useFilterStore } from "@/store";
import {
  ArrowUpAZ,
  IndianRupee,
  Star,
  CheckCircle2,
} from "lucide-react";

const options = [
  {
    value: "title-asc",
    label: "Name A-Z",
    description: "Sort alphabetically",
    icon: ArrowUpAZ,
  },
  {
    value: "price-asc",
    label: "Price: Low to High",
    description: "Lowest price first",
    icon: IndianRupee,
  },
  {
    value: "price-desc",
    label: "Price: High to Low",
    description: "Highest price first",
    icon: IndianRupee,
  },
  {
    value: "rating-desc",
    label: "Top Rated",
    description: "Highest rated products",
    icon: Star,
  },
];

export default function ProductSorting() {
  const { sort, setSort } = useFilterStore();

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-64 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium focus:border-[#970747] focus:outline-none"
        >
          <option value="title-asc">Name A-Z</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Top Rated</option>
        </select>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="space-y-4 lg:hidden">
        {options.map((option) => {
          const Icon = option.icon;

          return (
            <button
              key={option.value}
              onClick={() => setSort(option.value)}
              className={`w-full rounded-2xl border p-5 text-left transition ${
                sort === option.value
                  ? "border-[#970747] bg-pink-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      sort === option.value
                        ? "bg-[#970747] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold">
                      {option.label}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </div>

                {sort === option.value && (
                  <CheckCircle2
                    size={24}
                    className="text-[#970747]"
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}