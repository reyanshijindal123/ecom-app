'use client';

import { useProduct, useProducts } from '@/hooks/useProductQueries';
import { useCartStore, useAuthStore } from '@/store';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, ArrowLeft, Loader2, Truck, Shield, RotateCcw, Plus, Minus, Share2, CheckCircle, Package } from 'lucide-react';
import { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import WishlistButton from '@/components/product/WishlistButton';
import { toast } from 'sonner';
import { INR, getDeliveryDate } from '@/lib/utils';
import ReviewSection from '@/components/product/ReviewSection';

const SIZES: Record<string, string[]> = {
  "women's clothing": ['XS', 'S', 'M', 'L', 'XL'],
  "men's clothing": ['S', 'M', 'L', 'XL', 'XXL'],
  'electronics': [],
  'jewelery': ['Free Size'],
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const isAuthenticated = useAuthStore(
  (state) => state.isAuthenticated
);
  const id = Number(params.id);

  const { data: product, isLoading, isError } = useProduct(id);
  const { data: allProducts } = useProducts();
  const addItem = useCartStore((s) => s.addItem);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImg, setActiveImg] = useState(0);

  const checkLogin = () => {
  if (!isAuthenticated) {
    toast.error("Please login first!", {
      description: "Login to add products to your cart.",
      action: {
        label: "Login",
        onClick: () =>
          router.push(
            `/login?redirect=${encodeURIComponent(window.location.pathname)}`
          ),
      },
    });

    return false;
  }

  return true;
};

  // Simulate multiple product images by using different sizes of same image
  const images = product ? [product.image, product.image, product.image] : [];

 const handleAdd = () => {
  if (!checkLogin()) return;

  if (!product) return;

  const sizes = SIZES[product.category] || [];

  if (sizes.length > 0 && !selectedSize) {
    toast.error("Please select a size first");
    return;
  }

  for (let i = 0; i < qty; i++) {
    addItem(product, selectedSize);
  }

  setAdded(true);

  toast.success(
    `Added ${qty} item${qty > 1 ? "s" : ""} to cart`,
    {
      description: product.title.slice(0, 40) + "...",
    }
  );

  setTimeout(() => setAdded(false), 2000);
};

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: product?.title, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  const related = allProducts?.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);
  const sizes = product ? (SIZES[product.category] || []) : [];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          <div className="bg-gray-100 rounded-3xl h-96" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-100 rounded w-1/4" />
            <div className="h-8 bg-gray-100 rounded w-full" />
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-5 bg-gray-100 rounded w-1/3" />
            <div className="h-24 bg-gray-100 rounded" />
            <div className="h-12 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-24">
        <Package size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg font-medium">Product not found</p>
        <Link href="/products" className="mt-4 inline-block text-[#970747] underline text-sm">← Back to products</Link>
      </div>
    );
  }

  const priceINR = INR(product.price);
  const mrpINR = INR(product.price * 1.35);
  const discount = Math.round(((product.price * 1.35 - product.price) / (product.price * 1.35)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 hover:text-[#970747] transition-colors">
          <ArrowLeft size={13} /> Back
        </button>
        <span>/</span>
        <Link href="/products" className="hover:text-[#970747]">Products</Link>
        <span>/</span>
        <span className="text-gray-500 capitalize truncate max-w-[120px]">{product.category}</span>
      </div>

      {/* Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mb-12">
        {/* Image Carousel */}
        <div className="space-y-3">
          <div className="bg-white rounded-3xl p-8 flex items-center justify-center border border-gray-100 shadow-sm relative overflow-hidden" style={{minHeight: 320}}>
            <div className="relative w-full h-64 md:h-72">
              <Image src={images[activeImg]} alt={product.title} fill className="object-contain transition-all duration-300" sizes="(max-width: 768px) 100vw, 50vw" priority />
            </div>
            {/* Discount badge */}
            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {discount}% OFF
            </div>
            {/* Share + Wishlist top right */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button onClick={handleShare} className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-[#970747] transition-colors">
                <Share2 size={14} />
              </button>
{/*               <WishlistButton productId={product.id} variant="card" />
 */}            </div>
          </div>
          {/* Thumbnail strip */}
          <div className="flex gap-2 justify-center">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`relative w-16 h-16 rounded-xl border-2 overflow-hidden transition-all ${activeImg === i ? 'border-[#970747] shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                <Image src={img} alt="" fill className="object-contain p-2" sizes="64px" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div>
            <span className="inline-block px-2.5 py-1 bg-pink-50 text-[#970747] text-[11px] font-bold uppercase tracking-wider rounded-full mb-3">
              {product.category}
            </span>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight mb-3">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} className={s <= Math.round(product.rating.rate) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-700">{product.rating.rate.toFixed(1)}</span>
              <span className="text-xs text-gray-400">({product.rating.count} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-pink-50 rounded-2xl px-4 py-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">{priceINR}</span>
              <span className="text-sm text-gray-400 line-through">{mrpINR}</span>
              <span className="text-sm font-bold text-green-600">{discount}% off</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">Inclusive of all taxes</p>
          </div>

          {/* Size */}
          {sizes.length > 0 && (
            <div>
              <p className="text-sm font-bold text-gray-700 mb-2">
                Size: {selectedSize ? <span className="text-[#970747]">{selectedSize}</span> : <span className="text-gray-400 font-normal">Select a size</span>}
              </p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold border-2 transition-all ${selectedSize === s ? 'border-[#970747] bg-[#970747] text-white' : 'border-gray-200 hover:border-[#970747] text-gray-600'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          {/* Quantity + Add */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Qty:</span>
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"><Minus size={13} /></button>
                <span className="px-4 py-2 text-sm font-bold border-x-2 border-gray-200 min-w-[40px] text-center">{qty}</span>
                <button onClick={() => setQty(q => Math.max(1, q-1))}
                className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"><Plus size={13} /></button>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 ${
                  added ? 'bg-green-500 text-white scale-95' : 'bg-[#970747] hover:bg-[#7a0538] text-white shadow-lg shadow-[#970747]/20 hover:-translate-y-0.5'
                }`}>
                {added ? <><CheckCircle size={16} /> Added to Cart!</> : <><ShoppingCart size={16} /> Add to Cart – {priceINR}</>}
              </button>
              <WishlistButton productId={product.id} productTitle={product.title} variant="detail" />
            </div>

            {added && <Link href="/cart" className="block text-center text-sm text-[#970747] font-semibold hover:underline">→ View Cart</Link>}
          </div>

          {/* Delivery & Trust */}
          <div className="space-y-2.5 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2.5 text-sm text-gray-600">
              <Truck size={15} className="text-green-600 shrink-0" />
              <span>Estimated delivery: <strong className="text-gray-800">{getDeliveryDate(4)}</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-600">
              <Shield size={15} className="text-blue-500 shrink-0" />
              <span>Secure payment via <strong>RazorPay</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-600">
              <RotateCcw size={15} className="text-orange-500 shrink-0" />
              <span>30-day easy returns & exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ReviewSection productId={product.id} />

      {/* Related */}
      {related && related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-black text-gray-900 mb-5">
            More in <span className="text-[#970747] capitalize">{product.category}</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
