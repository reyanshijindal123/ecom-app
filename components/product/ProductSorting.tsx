'use client';

import { SortOption } from '@/types';
import { useFilterStore } from '@/store';
import { ArrowUpDown } from 'lucide-react';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'title-asc', label: 'Name A–Z' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Top Rated' },
];

export default function ProductSorting() {
  const { sort, setSort } = useFilterStore();

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown size={14} className="text-gray-400 shrink-0" />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortOption)}
        className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-[#970747] focus:ring-1 focus:ring-[#970747]/20 text-gray-700 cursor-pointer"
      >
        {sortOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
