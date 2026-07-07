'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShoppingBag, Menu, X, Heart, LogOut, User,
  Package, ChevronDown, Search, Mail, MapPin,
  Settings, Bookmark,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useCartStore, useAuthStore, useWishlistStore } from '@/store';
import SearchBar from '@/components/product/SearchBar';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/wishlist', label: 'Wishlist' },
  { href: '/orders', label: 'Orders' },
];

/* ─── User Avatar ──────────────────────────────────────────────────────────── */
function Avatar({ name, size = 'sm' }: { name?: string; size?: 'sm' | 'lg' }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';
  const dim = size === 'lg' ? 'w-11 h-11 text-base' : 'w-7 h-7 text-xs';
  return (
    <div className={`${dim} rounded-full bg-gradient-to-br from-[#970747] to-pink-400 flex items-center justify-center font-bold text-white shrink-0 shadow-md shadow-[#970747]/20`}>
      {initials}
    </div>
  );
}

/* ─── User Dropdown ────────────────────────────────────────────────────────── */
function UserDropdown() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const fullName = [user?.name?.firstname, user?.name?.lastname].filter(Boolean).join(' ');

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push('/');
  };

  const menuLinks = [
    { href: '/orders', icon: Package, label: 'My Orders', desc: 'Track your orders' },
    { href: '/wishlist', icon: Bookmark, label: 'Wishlist', desc: 'Your saved items' },
    { href: '/account?tab=profile', icon: Settings, label: 'Account Settings', desc: 'Edit profile & preferences' },
  ];

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded-xl px-2.5 py-1.5 transition-all duration-200 ${
          open ? 'bg-pink-50 ring-2 ring-[#970747]/20' : 'hover:bg-pink-50'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Avatar name={fullName} size="sm" />
        <span className="hidden sm:block text-sm font-semibold text-gray-700 max-w-[80px] truncate">
          {user?.name?.firstname}
        </span>
        <ChevronDown
          size={13}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 mt-2.5 w-64 bg-white rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">

          {/* User identity card */}
          <div className="px-4 py-4 bg-gradient-to-br from-[#970747]/5 to-pink-50 border-b border-pink-100">
            <div className="flex items-center gap-3 mb-2.5">
              <Avatar name={fullName} size="lg" />
              <div className="min-w-0">
                <p className="text-sm font-black text-gray-900 truncate">{fullName || 'User'}</p>
                <p className="text-[10px] text-[#970747] font-semibold uppercase tracking-wide">Member</p>
              </div>
            </div>

            {/* User details */}
            <div className="space-y-1">
              {user?.email && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Mail size={11} className="text-gray-400 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}
              {user?.username && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <User size={11} className="text-gray-400 shrink-0" />
                  <span>@{user.username}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin size={11} className="text-gray-400 shrink-0" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div className="py-1.5">
            {menuLinks.map(({ href, icon: Icon, label, desc }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-pink-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-[#970747]/10 flex items-center justify-center transition-colors shrink-0">
                  <Icon size={14} className="text-gray-500 group-hover:text-[#970747] transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-[#970747] transition-colors leading-tight">
                    {label}
                  </p>
                  <p className="text-[10px] text-gray-400 leading-tight">{desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Divider + Logout */}
          <div className="border-t border-gray-100 p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-xl bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                <LogOut size={14} className="text-red-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-500 leading-tight">Log out</p>
                <p className="text-[10px] text-red-400/70 leading-tight">Sign out of your account</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Header ────────────────────────────────────────────────────────────────── */
export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
  const totalItems = useCartStore((s) => s.totalItems);
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16 gap-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#970747] flex items-center justify-center shadow-sm shadow-[#970747]/30">
              <ShoppingBag size={14} className="text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-[#970747]">
              Velvet<span className="text-gray-800">Store</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors duration-150 ${
                  pathname === href
                    ? 'text-[#970747] border-b-2 border-[#970747] pb-0.5'
                    : 'text-gray-600 hover:text-[#970747]'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-xs">
            <SearchBar compact />
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Mobile search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-1.5 text-gray-500 hover:text-[#970747] transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative hidden sm:flex p-1.5 text-gray-500 hover:text-[#970747] transition-colors">
              <Heart size={20} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#970747] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-1.5 text-gray-500 hover:text-[#970747] transition-colors">
              <ShoppingBag size={20} />
              {mounted && totalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-[#970747] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {totalItems()}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-[#970747] transition-colors px-3 py-1.5">
                  Login
                </Link>
                <Link href="/signup" className="text-sm font-bold bg-[#970747] text-white px-4 py-1.5 rounded-xl hover:bg-[#7a0538] transition-colors">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 text-gray-600 hover:text-[#970747] ml-0.5"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden pb-3 pt-1">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === href ? 'bg-pink-50 text-[#970747]' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Heart size={15} />
              Wishlist
              {mounted && wishlistCount > 0 && (
                <span className="bg-[#970747] text-white text-xs px-1.5 py-0.5 rounded-full">{wishlistCount}</span>
              )}
            </Link>
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 text-sm font-medium border border-gray-200 rounded-xl hover:border-[#970747] hover:text-[#970747] transition-colors">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 text-sm font-bold bg-[#970747] text-white rounded-xl hover:bg-[#7a0538] transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
