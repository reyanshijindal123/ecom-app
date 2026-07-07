'use client';
import { useState } from 'react';
import { Modal } from './Modal';
import { Sparkles, Loader2, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFilterStore } from '@/store';

interface AISearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function AISearchModal({ open, onClose }: AISearchModalProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const router = useRouter();
  const { setSearch, setCategory } = useFilterStore();

  const handleAISearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSuggestion('');
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `You are a shopping assistant for VelvetStore, an e-commerce app using the FakeStore API. Available categories: "men's clothing", "women's clothing", "electronics", "jewelery".
              
User is looking for: "${query}"

Respond with a JSON object only (no markdown):
{
  "searchTerm": "keyword to search",
  "category": "category name or empty string",
  "suggestion": "1-2 sentence friendly response about what you found/recommended"
}`,
            },
          ],
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text ?? '';
      const cleaned = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setSuggestion(parsed.suggestion);
      setSearch(parsed.searchTerm);
      if (parsed.category) setCategory(parsed.category);
    } catch {
      setSuggestion("I found some great options! Let me show you the products.");
      setSearch(query);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    router.push('/products');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="AI Shopping Assistant" className="max-w-lg">
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#970747] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles size={14} className="text-white" />
          </div>
          <p className="text-sm text-gray-600">
            Describe what you&apos;re looking for in natural language and I&apos;ll find the best products for you!
          </p>
        </div>

        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. I need a gift for my girlfriend who loves jewellery and fashion..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#970747] resize-none h-24"
            onKeyDown={(e) => { if (e.key === 'Enter' && e.ctrlKey) handleAISearch(); }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {['Trendy women\'s outfit', 'Budget electronics', 'Gold jewellery', 'Smart casual men'].map(s => (
            <button key={s} onClick={() => setQuery(s)} className="text-xs px-3 py-1.5 bg-pink-50 text-[#970747] rounded-full hover:bg-pink-100 transition-colors">
              {s}
            </button>
          ))}
        </div>

        {suggestion && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-sm text-green-800">
            <span className="font-semibold">AI: </span>{suggestion}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleAISearch}
            disabled={loading || !query.trim()}
            className="flex-1 flex items-center justify-center gap-2 bg-[#970747] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#7a0538] transition-colors disabled:opacity-60"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
            {loading ? 'Searching...' : 'Ask AI'}
          </button>
          {suggestion && (
            <button
              onClick={handleApply}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors"
            >
              <Search size={15} /> View Results
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
