import { Suspense } from 'react';
import ProductsContent from './ProductsContent';
import { Loader2 } from 'lucide-react';

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-[#970747]" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
