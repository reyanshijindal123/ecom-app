'use client';

import { useFilterStore } from '@/store';
import { useCategories } from '@/hooks/useProductQueries';
import { Loader2 } from 'lucide-react';

export default function CategoryFilter() {
  const { category, setCategory } = useFilterStore();
  const { data: categories, isLoading } = useCategories();

  const allCategories = ['', ...(categories || [])];

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-400">
        <Loader2 size={14} className="animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        Category
      </h3>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((cat) => {
          const label = cat === '' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1);
          const isActive = category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#970747] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-[#970747]'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
