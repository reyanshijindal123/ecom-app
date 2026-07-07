'use client';

import { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFilterStore } from '@/store';

const EXAMPLES = [
  'I need something cozy for winter evenings',
  'Looking for a gift under ₹2000 for mom',
  'Show me tech products with good ratings',
  'I want stylish jewellery for a party',
];

export default function AISearchWidget() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const router = useRouter();
  const { setSearch, setCategory } = useFilterStore();

  const analyzeQuery = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setResult('');

    // Simple keyword-based AI simulation
    await new Promise(r => setTimeout(r, 1200));
    const lower = q.toLowerCase();
    let category = '';
    let suggestion = '';
    let searchTerm = '';

    if (lower.includes('women') || lower.includes('dress') || lower.includes('cozy') || lower.includes('mom') || lower.includes('girl')) {
      category = "women's clothing";
      suggestion = "I found some great women's clothing options for you! Showing curated picks based on your preference.";
      searchTerm = '';
    } else if (lower.includes('men') || lower.includes('jacket') || lower.includes('shirt') || lower.includes('formal')) {
      category = "men's clothing";
      suggestion = "Here are the best men's fashion picks matching your description!";
    } else if (lower.includes('tech') || lower.includes('electronic') || lower.includes('phone') || lower.includes('laptop') || lower.includes('gadget')) {
      category = 'electronics';
      suggestion = "Found top-rated electronics that match what you're looking for!";
    } else if (lower.includes('jewel') || lower.includes('gold') || lower.includes('ring') || lower.includes('party') || lower.includes('gift')) {
      category = 'jewelery';
      suggestion = "Beautiful jewellery picks curated just for you! Perfect for gifting or personal styling.";
    } else if (lower.includes('cheap') || lower.includes('budget') || lower.includes('₹') || lower.includes('affordable') || lower.includes('under')) {
      suggestion = "Showing you our best-value products sorted by price!";
      searchTerm = 'budget';
    } else {
      suggestion = `I'll search for "${q}" across all our categories. Here are the most relevant results!`;
      searchTerm = q;
    }

    setResult(suggestion);
    setLoading(false);

    setTimeout(() => {
      if (category) setCategory(category);
      if (searchTerm) setSearch(searchTerm);
      router.push('/products' + (category ? `?category=${encodeURIComponent(category)}` : ''));
    }, 1800);
  };

  return (
    <div className="bg-gradient-to-br from-[#970747]/5 via-pink-50 to-white border border-[#970747]/15 rounded-3xl p-5 sm:p-7">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-[#970747] to-pink-500 rounded-xl flex items-center justify-center">
          <Sparkles size={15} className="text-white" />
        </div>
        <div>
          <h3 className="text-sm font-black text-gray-900">AI Shopping Assistant</h3>
          <p className="text-[10px] text-gray-500">Describe what you're looking for</p>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && analyzeQuery(query)}
          placeholder="E.g. 'I need a gift for my sister under ₹2000'"
          className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#970747] focus:ring-2 focus:ring-[#970747]/10 transition-all placeholder:text-gray-400"
        />
        <button onClick={() => analyzeQuery(query)} disabled={loading || !query.trim()}
          className="bg-[#970747] text-white px-4 py-2.5 rounded-2xl hover:bg-[#7a0538] transition-colors disabled:opacity-50 flex items-center gap-2 text-sm font-bold">
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          {loading ? '' : 'Ask'}
        </button>
      </div>

      {/* Examples */}
      {!result && !loading && (
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map(e => (
            <button key={e} onClick={() => { setQuery(e); analyzeQuery(e); }}
              className="text-[11px] bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full hover:border-[#970747] hover:text-[#970747] transition-colors">
              {e}
            </button>
          ))}
        </div>
      )}

      {/* AI Response */}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white rounded-2xl px-4 py-3 border border-gray-100">
          <Loader2 size={14} className="animate-spin text-[#970747]" />
          Analyzing your request...
        </div>
      )}
      {result && !loading && (
        <div className="bg-white rounded-2xl px-4 py-3 border border-[#970747]/20 text-sm text-gray-700 flex items-start gap-2">
          <Sparkles size={14} className="text-[#970747] shrink-0 mt-0.5" />
          <span>{result} <span className="text-[#970747] font-semibold">Taking you there...</span></span>
        </div>
      )}
    </div>
  );
}
