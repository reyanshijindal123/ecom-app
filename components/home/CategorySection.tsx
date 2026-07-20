import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "./home-data";

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-black">Shop by Category</h2>

        <Link href="/products" className="text-[#970747] text-sm flex gap-1">
          All <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/products?category=${encodeURIComponent(c.slug)}`}
            className={`bg-gradient-to-br ${c.bg} rounded-2xlp-5hover:-translate-y-1 transition`}
          >
            <div className="text-3xl">{c.emoji}</div>

            <h3 className={` font-bold ${c.accent}`}>{c.name}</h3>

            <p className="text-xs">Explore →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
