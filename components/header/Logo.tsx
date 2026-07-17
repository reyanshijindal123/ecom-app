import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#970747] shadow-sm shadow-[#970747]/30 md:h-8 md:w-8">
        <ShoppingBag
          size={14}
          className="text-white"
        />
      </div>

      <span className="text-lg font-bold tracking-tight text-[#970747] md:text-xl">
        Velvet
        <span className="text-gray-800">
          Store
        </span>
      </span>
    </Link>
  );
}