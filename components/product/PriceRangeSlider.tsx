'use client';

import * as Slider from '@radix-ui/react-slider';
import { useFilterStore } from '@/store';
import { INR } from '@/lib/utils';

// FakeStore API prices go up to ~$1000 USD
const MAX_USD = 1000;

export default function PriceRangeSlider() {
  const { minPrice, maxPrice, setPriceRange } = useFilterStore();

  const minINR = Math.round(minPrice * 83);
  const maxINR = Math.round(maxPrice * 83);

  return (
    <div className="space-y-3">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Price Range
        </h3>
        <span className="text-xs text-[#970747] font-semibold bg-pink-50 px-2 py-0.5 rounded-full">
          {INR(minPrice)} – {maxPrice >= MAX_USD ? 'Any' : INR(maxPrice)}
        </span>
      </div>

      {/* Dual-thumb slider */}
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-6"
        min={0}
        max={MAX_USD}
        step={5}
        value={[minPrice, maxPrice]}
        onValueChange={([min, max]) => setPriceRange(min, max)}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-1.5">
          <Slider.Range className="absolute bg-[#970747] rounded-full h-full" />
        </Slider.Track>

        {[0, 1].map((i) => (
          <Slider.Thumb
            key={i}
            className="block w-5 h-5 bg-white border-2 border-[#970747] rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#970747]/30 cursor-grab active:cursor-grabbing transition-shadow"
          />
        ))}
      </Slider.Root>

      {/* Min / Max labels */}
      <div className="flex justify-between text-[10px] text-gray-400 font-medium">
        <span>₹0</span>
        <span>₹{(MAX_USD * 83).toLocaleString('en-IN')}+</span>
      </div>

      {/* Quick-select pills */}
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {[
          { label: 'Under ₹5K', min: 0, max: 60 },
          { label: '₹5K–₹20K', min: 60, max: 240 },
          { label: '₹20K–₹50K', min: 240, max: 600 },
          { label: '₹50K+', min: 600, max: MAX_USD },
        ].map(({ label, min, max }) => {
          const isActive = minPrice === min && maxPrice === max;
          return (
            <button
              key={label}
              onClick={() => setPriceRange(min, max)}
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all duration-150 ${
                isActive
                  ? 'bg-[#970747] text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-pink-50 hover:text-[#970747]'
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
