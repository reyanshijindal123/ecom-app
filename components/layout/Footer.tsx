import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { ComingSoonModal } from '../ui/ComingSoonModal';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#970747] flex items-center justify-center">
                <ShoppingBag size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                VelvetStore
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Curated fashion for the bold. Discover premium pieces that define
              your style, delivered to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#970747] mb-4">
              Shop
            </h3>

            <ul className="space-y-2">
              {[
                { label: "All Products", href: "/products" },
                {
                  label: "Men's Clothing",
                  href: "/products?category=men's+clothing",
                },
                {
                  label: "Women's Clothing",
                  href: "/products?category=women's+clothing",
                },
                {
                  label: "Electronics",
                  href: "/products?category=electronics",
                },
                {
                  label: "Jewelery",
                  href: "/products?category=jewelery",
                },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#970747] mb-4">
              Help
            </h3>

            <ul className="space-y-2">
              {[
                "FAQ",
                "Shipping Policy",
                "Returns",
                "Track Order",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <ComingSoonModal featureName={item}>
                    <button
                      type="button"
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {item}
                    </button>
                  </ComingSoonModal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} VelvetStore. All rights reserved.
          </p>

          <p className="text-gray-600 text-xs">
            Powered by FakeStore API · Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}