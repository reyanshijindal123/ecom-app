'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  MapPin,
  Settings,
  LogOut,
} from 'lucide-react';

export default function AccountSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/account',
      icon: LayoutDashboard,
    },
    {
      title: 'Orders',
      href: '/account/orders',
      icon: Package,
    },
    {
      title: 'Addresses',
      href: '/account/addresses',
      icon: MapPin,
    },
    {
      title: 'Settings',
      href: '/account/settings',
      icon: Settings,
    },
  ];

  return (
    <aside className="bg-white rounded-2xl border shadow-sm p-6 h-fit sticky top-24">

      {/* Profile */}

      <div className="flex flex-col items-center">

  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#970747] to-pink-500 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
    JD
  </div>

  <h2 className="mt-4 text-xl font-bold">
    John Doe
  </h2>

  <p className="text-gray-500 text-sm">
    john@gmail.com
  </p>

</div>

      <hr className="my-6" />

      {/* Menu */}

      <nav className="space-y-2">

        {menuItems.map(({ title, href, icon: Icon }) => (

          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              pathname === href
                ? 'bg-[#970747] text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <Icon size={18} />
            {title}
          </Link>

        ))}

      </nav>

      <hr className="my-6" />

      <button
        className="flex items-center gap-3 text-red-500 hover:bg-red-50 px-4 py-3 rounded-xl w-full transition"
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  );
}