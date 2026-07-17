"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";

import { useAuthStore, useCartStore, useWishlistStore } from "@/store";

import SearchBar from "@/components/product/SearchBar";

import UserDropdown from "@/components/header/UserDropdown";
import MobileDrawer from "@/components/header/MobileDrawer";
import CountBadge from "@/components/header/CountBadge";

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const totalItems = useCartStore((state) => state.totalItems);

  const wishlistCount = useWishlistStore((state) => state.ids.length);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-16 lg:px-8">
        {/* Logo */}

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#970747] shadow-sm shadow-[#970747]/30 md:h-8 md:w-8">
            <ShoppingBag size={14} className="text-white" />
          </div>

          <span className="text-lg font-bold tracking-tight text-[#970747] md:text-xl">
            Velvet
            <span className="text-gray-800">Store</span>
          </span>
        </Link>

        {/* Desktop Search */}

        {!isAuthPage && (
          <div className="hidden max-w-lg flex-1 md:block">
            <Suspense fallback={null}>
              <SearchBar compact />
            </Suspense>
          </div>
        )}

        {/* Right Section */}

        <div className="flex items-center gap-2">
          {/* Mobile Search */}

          {!isAuthPage && (
            <button
              onClick={() => setSearchOpen((prev) => !prev)}
              className="p-1.5 text-gray-500 transition-colors hover:text-[#970747] md:hidden"
            >
              <Search size={20} />
            </button>
          )}

          {/* Wishlist */}

          {isAuthenticated && (
            <Link
              href="/wishlist"
              className="relative hidden p-1.5 text-gray-500 transition-colors hover:text-[#970747] sm:flex"
            >
              <Heart size={20} />

              {mounted && <CountBadge count={wishlistCount} />}
            </Link>
          )}

          {/* Cart */}

          {isAuthenticated && (
            <Link
              href="/cart"
              className="relative hidden p-1.5 text-gray-500 transition-colors hover:text-[#970747] sm:flex"
            >
              <ShoppingBag size={20} />

              {mounted && <CountBadge count={totalItems()} />}
            </Link>
          )}

          {/* Desktop Auth */}

          <div className="hidden lg:block">
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="rounded-xl border border-[#970747] px-4 py-2 text-sm font-semibold text-[#970747] transition hover:bg-pink-50"
                >
                  Login
                </Link>

                <Link
                  href="/login?tab=signup"
                  className="rounded-xl bg-[#970747] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7a0538]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="p-1.5 text-gray-600 transition-colors hover:text-[#970747] lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {/* Mobile Search */}

      {!isAuthPage && searchOpen && (
        <div className="px-4 pb-3 md:hidden">
          <SearchBar />
        </div>
      )}

      {/* Mobile Drawer */}

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
