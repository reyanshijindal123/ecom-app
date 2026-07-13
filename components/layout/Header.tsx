"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Menu,
  X,
  Heart,
  LogOut,
  User,
  Package,
  ChevronDown,
  Search,
  MapPin,
  LogIn,
  ChevronRight,
  Home,
} from "lucide-react";
import { Suspense } from "react";

import { useState, useRef, useEffect } from "react";

import { useCartStore, useAuthStore, useWishlistStore } from "@/store";

import SearchBar from "@/components/product/SearchBar";

/*                                   Avatar                                   */

function Avatar({ name, size = "sm" }: { name?: string; size?: "sm" | "lg" }) {
  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const dimension = size === "lg" ? "w-11 h-11 text-base" : "w-7 h-7 text-xs";

  return (
    <div
      className={`${dimension} rounded-full bg-gradient-to-br from-[#970747] to-pink-400 flex items-center justify-center font-bold text-white shrink-0 shadow-md shadow-[#970747]/20`}
    >
      {initials}
    </div>
  );
}

/*                              Desktop User Menu                             */

function UserDropdown() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const fullName = [user?.name?.firstname, user?.name?.lastname]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  const menuLinks = [
    {
      href: "/account",
      icon: User,
      label: "My Account",
      desc: "Manage your profile",
    },
    {
      href: "/orders",
      icon: Package,
      label: "Orders",
      desc: "Track your orders",
    },
    {
      href: "/account/addresses",
      icon: MapPin,
      label: "Addresses",
      desc: "Manage delivery addresses",
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-xl px-2.5 py-1.5 transition-all duration-200 ${
          open ? "bg-pink-50 ring-2 ring-[#970747]/20" : "hover:bg-pink-50"
        }`}
      >
        <Avatar name={fullName} size="sm" />

        <span className="hidden sm:block text-sm font-semibold text-gray-700 max-w-[80px] truncate">
          {user?.name?.firstname}
        </span>

        <ChevronDown
          size={13}
          className={`transition-transform duration-200 text-gray-400 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2.5 w-64 rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-gradient-to-br from-[#970747]/5 to-pink-50 px-4 py-4 border-b border-pink-100">
            <div className="flex items-center gap-3">
              <Avatar name={fullName} size="lg" />

              <div className="min-w-0">
                <p className="truncate text-sm font-black text-gray-900">
                  {fullName || "User"}
                </p>

                <p className="text-[10px] uppercase tracking-wide font-semibold text-[#970747]">
                  Member
                </p>
              </div>
            </div>
          </div>

          <div className="py-2">
            {menuLinks.map(({ href, icon: Icon, label, desc }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-pink-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-[#970747]/10">
                  <Icon
                    size={14}
                    className="text-gray-500 transition-colors group-hover:text-[#970747]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-[#970747]">
                    {label}
                  </p>

                  <p className="text-[10px] text-gray-400">{desc}</p>
                </div>
              </Link>
            ))}
          </div>

         <div className="border-t border-gray-100 p-2">
  <button
    onClick={handleLogout}
    className="group flex w-full items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-red-50"
  >
    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 transition-all group-hover:bg-red-100">
      <LogOut
        size={14}
        className="text-red-500"
      />
    </div>

    <div className="flex flex-col items-start">
      <span className="text-sm font-semibold text-red-500">
        Log out
      </span>

      <span className="text-xs text-red-300">
        Sign out of your account
      </span>
    </div>
  </button>
</div>



        </div>
      )}
    </div>
  );
}

/* --------------------------- Header starts here --------------------------- */

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = useCartStore((state) => state.totalItems);
  const wishlistCount = useWishlistStore((state) => state.ids.length);
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-16 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#970747] shadow-sm shadow-[#970747]/30 md:h-8 md:w-8">
            <ShoppingBag size={14} className="text-white" />
          </div>

          <span className="text-lg font-bold tracking-tight text-[#970747] md:text-xl">
            Velvet
            <span className="text-gray-800">Store</span>
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden max-w-lg flex-1 md:block">
          <Suspense fallback={null}>
            <SearchBar compact />
          </Suspense>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Mobile Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-1.5 text-gray-500 transition-colors hover:text-[#970747] md:hidden"
          >
            <Search size={20} />
          </button>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative hidden p-1.5 text-gray-500 transition-colors hover:text-[#970747] sm:flex"
          >
            <Heart size={20} />

            {mounted && wishlistCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#970747] text-[9px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative hidden p-1.5 text-gray-500 transition-colors hover:text-[#970747] sm:flex"
          >
            <ShoppingBag size={20} />

            {mounted && totalItems() > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#970747] text-[9px] font-bold text-white">
                {totalItems()}
              </span>
            )}
          </Link>

          {/* Desktop Auth */}
          <div className="hidden lg:block">
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-[#970747]"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="rounded-xl bg-[#970747] px-4 py-1.5 text-sm font-bold text-white transition-colors hover:bg-[#7a0538]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-gray-600 transition-colors hover:text-[#970747] lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="px-4 pb-3 md:hidden">
          <SearchBar />
        </div>
      )}

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#970747] to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <User size={24} />
              </div>

              <div>
                {isAuthenticated ? (
                  <>
                    <h3 className="font-bold text-lg">
                      Hi, {useAuthStore.getState().user?.name?.firstname}
                    </h3>
                    <p className="text-sm text-white/80">Welcome back 👋</p>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold text-lg">Welcome</h3>
                    <p className="text-sm text-white/80">
                      Login to continue shopping
                    </p>
                  </>
                )}
              </div>
            </div>

            <button onClick={() => setMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation */}

        <div className="p-4">
          {isAuthenticated ? (
            <>
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-4 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <User size={20} className="text-[#970747]" />
                  <span>My Account</span>
                </div>
                <ChevronRight size={18} />
              </Link>

              <Link
                href="/orders"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-4 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Package size={20} className="text-[#970747]" />
                  <span>Orders</span>
                </div>
                <ChevronRight size={18} />
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-4 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Heart size={20} className="text-[#970747]" />
                  <span>Wishlist</span>
                </div>
                <ChevronRight size={18} />
              </Link>

              <Link
                href="/account/addresses"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-4 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-[#970747]" />
                  <span>Addresses</span>
                </div>
                <ChevronRight size={18} />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-4 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Home size={20} className="text-[#970747]" />
                  <span>Home</span>
                </div>
                <ChevronRight size={18} />
              </Link>

              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-4 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag size={20} className="text-[#970747]" />
                  <span>Shop Products</span>
                </div>
                <ChevronRight size={18} />
              </Link>
            </>
          )}
        </div>

        {/* Bottom Button */}

        <div className="absolute bottom-0 left-0 w-full border-t bg-white p-5">
          {!isAuthenticated ? (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#970747] py-3 font-semibold text-white hover:bg-[#7a0538]"
            >
              <LogIn size={18} />
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                useAuthStore.getState().logout();
                setMobileOpen(false);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
