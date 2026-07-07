'use client';

import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useFilterStore, useSearchStore } from '@/store';
import { useRef, useState, useEffect } from 'react';

const POPULAR = ['Wireless headphones', 'Gold jewellery', 'Men jacket', 'Laptop backpack', 'Smart watch'];

interface SearchBarProps { compact?: boolean; }

export default function SearchBar({ compact = false }: SearchBarProps) {
  const { search, setSearch } = useFilterStore();
  const { history, addSearch, clearHistory } = useSearchStore();
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (!containerRef.current?.contains(e.target as Node)) setFocused(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (value: string) => {
    setSearch(value);
    if (value && pathname !== '/products') router.push('/products');
  };

  const handleSelect = (term: string) => {
    setSearch(term);
    addSearch(term);
    setFocused(false);
    if (pathname !== '/products') router.push('/products');
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) { addSearch(search.trim()); setFocused(false); if (pathname !== '/products') router.push('/products'); }
  };

  const showDropdown = focused && (history.length > 0 || POPULAR.length > 0);
  const filtered = search ? POPULAR.filter(p => p.toLowerCase().includes(search.toLowerCase())) : POPULAR;

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search size={compact ? 14 : 16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={compact ? 'Search...' : 'Search products...'}
            className={`bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#970747] focus:ring-2 focus:ring-[#970747]/10 transition-all w-full text-sm
              ${compact ? 'pl-8 pr-7 py-1.5 text-xs' : 'pl-9 pr-9 py-2.5'}`}
          />
          {search && (
            <button type="button" onClick={() => { setSearch(''); inputRef.current?.focus(); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={compact ? 12 : 14} />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {!search && history.length > 0 && (
            <div>
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1"><Clock size={10} />Recent</span>
                <button onClick={clearHistory} className="text-[10px] text-gray-400 hover:text-red-400">Clear</button>
              </div>
              {history.slice(0, 4).map(h => (
                <button key={h} onClick={() => handleSelect(h)}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-[#970747] transition-colors">
                  <Clock size={12} className="text-gray-300 shrink-0" />{h}
                </button>
              ))}
            </div>
          )}
          {filtered.length > 0 && (
            <div>
              <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1"><TrendingUp size={10} />Popular</span>
              </div>
              {filtered.slice(0, 5).map(p => (
                <button key={p} onClick={() => handleSelect(p)}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-[#970747] transition-colors">
                  <TrendingUp size={12} className="text-[#970747]/40 shrink-0" />{p}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
