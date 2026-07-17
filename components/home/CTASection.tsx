import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section
      className="
max-w-7xl mx-auto
px-4 py-10
"
    >
      <div
        className="
rounded-3xl
bg-gray-900
text-white
p-8 md:p-12
flex justify-between
items-center
gap-6
"
      >
        <div>
          <p className="text-[#970747] text-xs">LIMITED TIME</p>

          <h2 className="text-3xl font-black">Up to 40% Off on Electronics</h2>
        </div>

        <Link
          href="/products?category=electronics"
          className="
bg-[#970747]
px-7 py-3
rounded-2xl
flex gap-2
"
        >
          Shop Electronics
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
