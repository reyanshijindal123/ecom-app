"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";

import { useAuthStore } from "@/store";

import Avatar from "./Avatar";
import { DESKTOP_MENU } from "./constants";

export default function UserDropdown() {
  const router = useRouter();

  const { user, logout } = useAuthStore();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const fullName = useMemo(
    () =>
      [user?.name?.firstname, user?.name?.lastname].filter(Boolean).join(" "),
    [user],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-xl px-2.5 py-1.5 transition-all duration-200 ${
          open ? "bg-pink-50 ring-2 ring-[#970747]/20" : "hover:bg-pink-50"
        }`}
      >
        <Avatar name={fullName} size="sm" />

        <span className="hidden max-w-[80px] truncate text-sm font-semibold text-gray-700 sm:block">
          {user?.name?.firstname}
        </span>

        <ChevronDown
          size={13}
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-[100] mt-2.5 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="border-b border-pink-100 bg-gradient-to-br from-[#970747]/5 to-pink-50 px-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar name={fullName} size="lg" />

              <div className="min-w-0">
                <p className="truncate text-sm font-black text-gray-900">
                  {fullName || "User"}
                </p>

                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#970747]">
                  Member
                </p>
              </div>
            </div>
          </div>

          <div className="py-2">
            {DESKTOP_MENU.map(({ href, icon: Icon, label, desc }) => (
              <Link
                key={href}
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
                <LogOut size={14} className="text-red-500" />
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
