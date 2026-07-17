import Link from "next/link";
import { ArrowRight, Star, Zap } from "lucide-react";

import { ComingSoonModal } from "@/components/ui/ComingSoonModal";
import HandbagIllustration from "./HandbagIllustration";

export default function HeroSection() {
  return (
    <section
      className="
relative overflow-hidden 
bg-gradient-to-br 
from-[#970747] via-[#b8185a] to-[#6b0332]
text-white 
min-h-[440px] md:min-h-[540px]
"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
absolute -top-24 -left-24 
w-80 h-80 rounded-full 
bg-white/10 blur-3xl
"
        />

        <div
          className="
absolute -bottom-24 -right-24
w-96 h-96 rounded-full
bg-pink-300/15 blur-3xl
"
        />
      </div>

      <div
        className="
relative max-w-7xl mx-auto
px-4 sm:px-6 lg:px-8
py-14 md:py-20
grid md:grid-cols-2 gap-10
items-center
"
      >
        {/* TEXT */}

        <div className="space-y-6">
          <div
            className="
inline-flex items-center gap-2
bg-white/15
px-3 py-1.5
rounded-full
text-xs
"
          >
            <Zap size={11} />
            New Season Arrivals
          </div>

          <h1
            className="
text-4xl sm:text-5xl md:text-6xl
font-black
"
          >
            Style That
            <br />
            <span
              className="
text-transparent
bg-clip-text
bg-gradient-to-r
from-pink-200 to-yellow-100
"
            >
              Speaks for You
            </span>
          </h1>

          <p className="text-pink-100 max-w-md">
            Curated fashion, electronics, and fine jewellery. Premium quality at
            prices that make sense.
          </p>

          <div className="flex gap-3">
            <Link
              href="/products"
              className="
bg-white text-[#970747]
px-6 py-3
rounded-2xl
font-bold
flex items-center gap-2
"
            >
              Shop Now
              <ArrowRight size={15} />
            </Link>

            <ComingSoonModal featureName="New Arrivals">
              <span
                className="
border-2 border-white/40
px-6 py-3
rounded-2xl
cursor-pointer
"
              >
                New Arrivals
              </span>
            </ComingSoonModal>
          </div>

          <div className="flex gap-3 text-xs">
            <span>🟢 Free Returns</span>

            <span>🟢 COD Available</span>

            <span>🟢 EMI Options</span>
          </div>
        </div>

        {/* BAG */}

        <div className="flex justify-center">
          <div
            className="
relative
w-64 h-72
md:w-80 md:h-88
"
          >
            <HandbagIllustration />

            <div
              className="
absolute -top-2 -right-2
bg-yellow-400
text-black
px-3 py-1
rounded-full
text-xs
"
            >
              SALE 30%
            </div>

            <div
              className="
absolute -bottom-1 -left-2
bg-white
text-[#970747]
px-3 py-1
rounded-full
text-xs
flex gap-1
"
            >
              <Star size={11} />
              4.8 Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
