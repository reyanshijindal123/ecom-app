"use client";

import * as Slider from "@radix-ui/react-slider";
import { useFilterStore } from "@/store";
import { INR } from "@/lib/utils";

const MAX_PRICE = 1000;

export default function PriceRangeSlider() {
  const { minPrice, maxPrice, setPriceRange } = useFilterStore();

  return (
    <div className="border-b border-gray-200 pb-6">
      {/* Heading */}
      <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-gray-900">
        Price
      </h3>

      {/* Slider */}
      <Slider.Root
        className="relative flex h-6 w-full items-center"
        min={0}
        max={MAX_PRICE}
        step={5}
        value={[minPrice, maxPrice]}
        onValueChange={([min, max]) => setPriceRange(min, max)}
      >
        <Slider.Track className="relative h-1 w-full rounded-full bg-gray-300">
          <Slider.Range className="absolute h-full rounded-full bg-[#ff3f6c]" />
        </Slider.Track>

        <Slider.Thumb className="block h-4 w-4 rounded-full border-[3px] border-[#ff3f6c] bg-white shadow-sm outline-none transition-transform hover:scale-110 focus:scale-110" />

        <Slider.Thumb className="block h-4 w-4 rounded-full border-[3px] border-[#ff3f6c] bg-white shadow-sm outline-none transition-transform hover:scale-110 focus:scale-110" />
      </Slider.Root>

      {/* Selected Range */}
      <div className="mt-3 text-base font-semibold text-gray-900">
        {INR(minPrice)} - {maxPrice >= MAX_PRICE ? `${INR(MAX_PRICE)}+` : INR(maxPrice)}
      </div>
    </div>
  );
}