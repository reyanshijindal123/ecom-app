"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Heart,
  Home,
  LogIn,
  LogOut,
  MapPin,
  Package,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import { useAuthStore } from "@/store";

import { MOBILE_AUTH_LINKS, MOBILE_GUEST_LINKS } from "./constants";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const router = useRouter();

  const { user, isAuthenticated, logout } = useAuthStore();

  const links = isAuthenticated ? MOBILE_AUTH_LINKS : MOBILE_GUEST_LINKS;

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/");
  };

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40" />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="bg-gradient-to-r from-[#970747] to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <User size={24} />
              </div>

              <div>
                {isAuthenticated ? (
                  <>
                    <h3 className="text-lg font-bold">
                      Hi, {user?.name?.firstname}
                    </h3>

                    <p className="text-sm text-white/80">Welcome back 👋</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-bold">Welcome</h3>

                    <p className="text-sm text-white/80">
                      Login to continue shopping
                    </p>
                  </>
                )}
              </div>
            </div>

            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation */}

        <div className="p-4">
          {links.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center justify-between rounded-xl px-4 py-4 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-[#970747]" />

                <span>{label}</span>
              </div>

              <ChevronRight size={18} />
            </Link>
          ))}
        </div>

        {/* Bottom */}

        <div className="absolute bottom-0 left-0 w-full border-t bg-white p-5">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#970747] py-3 font-semibold text-white transition hover:bg-[#7a0538]"
              >
                <LogIn size={18} />
                Login
              </Link>

              <Link
                href="/login?tab=signup"
                onClick={onClose}
                className="rounded-xl border border-[#970747] py-3 text-center font-semibold text-[#970747] transition hover:bg-pink-50"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
