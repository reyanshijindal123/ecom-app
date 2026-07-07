'use client';

// Shimmer animation via inline style to avoid Tailwind purge issues
const shimmer = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={`rounded bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] ${className ?? ''}`}
      style={{ animation: 'shimmer 1.6s ease-in-out infinite' }}
    />
  );
}

export default function ProductSkeleton() {
  return (
    <>
      <style>{shimmer}</style>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        {/* Image area */}
        <div className="relative h-48 sm:h-52 bg-gray-50 overflow-hidden">
          <SkeletonBox className="absolute inset-0 rounded-none" />
          {/* Wishlist button ghost */}
          <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-gray-200 opacity-60" />
        </div>

        {/* Content */}
        <div className="p-3.5 space-y-2.5">
          {/* Category tag */}
          <SkeletonBox className="h-2.5 w-1/3" />

          {/* Title — two lines */}
          <div className="space-y-1.5">
            <SkeletonBox className="h-3.5 w-full" />
            <SkeletonBox className="h-3.5 w-4/5" />
          </div>

          {/* Star rating row */}
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <SkeletonBox key={i} className="w-2.5 h-2.5 rounded-sm" />
            ))}
            <SkeletonBox className="h-2.5 w-8 ml-1" />
          </div>

          {/* Price + button row */}
          <div className="flex items-center justify-between pt-1">
            <div className="space-y-1">
              <SkeletonBox className="h-5 w-20" />
              <SkeletonBox className="h-2.5 w-12" />
            </div>
            <SkeletonBox className="h-8 w-16 rounded-xl" />
          </div>
        </div>
      </div>
    </>
  );
}

export function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
