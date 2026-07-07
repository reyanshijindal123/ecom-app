import Link from 'next/link';
import { ArrowRight, Shield, Truck, RefreshCw, Star, Zap } from 'lucide-react';
import { ComingSoonModal } from '@/components/ui/ComingSoonModal';
import HomeProductSections from '@/components/product/HomeProductSections';

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹3,999' },
  { icon: Shield, title: 'Secure Payments', desc: 'UPI, Cards & RazorPay' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free' },
  { icon: Star, title: 'Top Rated', desc: '10,000+ happy customers' },
];

const categories = [
  { name: "Women's", slug: "women's clothing", emoji: '👗', bg: 'from-pink-50 to-rose-100', accent: 'text-rose-700' },
  { name: "Men's", slug: "men's clothing", emoji: '👔', bg: 'from-slate-50 to-blue-100', accent: 'text-blue-700' },
  { name: 'Electronics', slug: 'electronics', emoji: '📱', bg: 'from-violet-50 to-purple-100', accent: 'text-purple-700' },
  { name: 'Jewellery', slug: 'jewelery', emoji: '💎', bg: 'from-amber-50 to-yellow-100', accent: 'text-amber-700' },
];

/* ─── Handbag SVG ─────────────────────────────────────────────────────────── */
function HandbagIllustration() {
  return (
    <svg
      viewBox="0 0 320 340"
      className="w-full h-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.25)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Handles ── */}
      {/* Left handle */}
      <path
        d="M100 112 C95 70 108 45 130 38 C148 32 165 38 172 55"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
      {/* Right handle */}
      <path
        d="M220 112 C225 70 212 45 190 38 C172 32 155 38 148 55"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
      {/* Handle shadows */}
      <path
        d="M100 112 C95 70 108 45 130 38 C148 32 165 38 172 55"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        transform="translate(3, 4)"
      />
      <path
        d="M220 112 C225 70 212 45 190 38 C172 32 155 38 148 55"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        transform="translate(3, 4)"
      />

      {/* ── Bag body shadow ── */}
      <rect x="43" y="116" width="238" height="200" rx="28" fill="rgba(0,0,0,0.18)" />

      {/* ── Main bag body ── */}
      <rect x="38" y="110" width="244" height="200" rx="28" fill="white" opacity="0.96" />

      {/* ── Top flap ── */}
      <path
        d="M38 138 L38 118 Q38 110 46 110 L274 110 Q282 110 282 118 L282 138
           Q238 118 160 114 Q82 110 38 138Z"
        fill="white"
        opacity="0.75"
      />

      {/* ── Bag texture lines ── */}
      <rect x="55" y="127" width="210" height="168" rx="18"
        stroke="#970747" strokeWidth="1.5" strokeDasharray="7 4" fill="none" opacity="0.18" />

      {/* ── Center crease ── */}
      <line x1="160" y1="115" x2="160" y2="306"
        stroke="#f0a0bb" strokeWidth="1.2" opacity="0.35" />

      {/* ── Clasp ring ── */}
      <circle cx="160" cy="115" r="14" fill="#970747" opacity="0.95" />
      <circle cx="160" cy="115" r="9" fill="white" opacity="0.9" />
      <circle cx="160" cy="115" r="5" fill="#970747" opacity="0.7" />
      {/* Clasp latch */}
      <rect x="153" y="113" width="14" height="4" rx="2" fill="white" opacity="0.5" />

      {/* ── Front pocket ── */}
      <rect x="95" y="185" width="130" height="82" rx="16"
        fill="rgba(151,7,71,0.06)" stroke="rgba(151,7,71,0.2)" strokeWidth="1.2" />

      {/* Pocket zipper line */}
      <line x1="110" y1="197" x2="210" y2="197"
        stroke="rgba(151,7,71,0.3)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Zipper pull */}
      <circle cx="165" cy="197" r="4" fill="white" stroke="rgba(151,7,71,0.4)" strokeWidth="1" />
      <rect x="163" y="201" width="4" height="7" rx="1" fill="rgba(151,7,71,0.35)" />

      {/* ── Brand emboss ── */}
      <text x="160" y="235" textAnchor="middle"
        fontSize="13" fontWeight="700" fill="#970747" fontFamily="sans-serif"
        letterSpacing="3" opacity="0.5">
        VELVET
      </text>
      <text x="160" y="252" textAnchor="middle"
        fontSize="8" fontWeight="400" fill="#970747" fontFamily="sans-serif"
        letterSpacing="5" opacity="0.35">
        STORE
      </text>

      {/* ── Shine highlight ── */}
      <ellipse cx="96" cy="148" rx="22" ry="10"
        fill="rgba(255,255,255,0.45)" transform="rotate(-35 96 148)" />

      {/* ── Bottom edge shadow ── */}
      <rect x="58" y="296" width="204" height="10" rx="5"
        fill="rgba(151,7,71,0.12)" />

      {/* ── Side stitch detail ── */}
      {[130,155,180,205,230,255,280].map((y, i) => (
        <circle key={i} cx="50" cy={y} r="2" fill="rgba(151,7,71,0.2)" />
      ))}
      {[130,155,180,205,230,255,280].map((y, i) => (
        <circle key={i} cx="270" cy={y} r="2" fill="rgba(151,7,71,0.2)" />
      ))}
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-0">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#970747] via-[#b8185a] to-[#6b0332] text-white min-h-[440px] md:min-h-[540px]">
        {/* Ambient glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-pink-300/15 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">

          {/* Text side */}
          <div className="space-y-5 md:space-y-6 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold text-pink-100 tracking-widest uppercase">
              <Zap size={11} className="text-yellow-300 fill-yellow-300" /> New Season Arrivals
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight">
              Style That<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-yellow-100">
                Speaks for You
              </span>
            </h1>

            <p className="text-pink-100/90 text-base md:text-lg leading-relaxed max-w-md">
              Curated fashion, electronics, and fine jewellery. Premium quality at prices that make sense — delivered to your door across India.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-[#970747] px-6 py-3 rounded-2xl font-bold text-sm hover:bg-pink-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Shop Now <ArrowRight size={15} />
              </Link>
              <ComingSoonModal featureName="New Arrivals">
                <span className="inline-flex items-center gap-2 border-2 border-white/35 text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-white/10 hover:border-white/55 transition-all cursor-pointer">
                  New Arrivals
                </span>
              </ComingSoonModal>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {['Free Returns', 'COD Available', 'EMI Options'].map((t) => (
                <span key={t} className="text-[11px] text-pink-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Handbag side */}
          <div className="flex items-center justify-center order-1 md:order-2">
            <div className="relative w-64 h-72 md:w-80 md:h-88">
              {/* Glow ring behind bag */}
              <div className="absolute inset-8 rounded-full bg-white/8 blur-2xl" />

              {/* Bag illustration */}
              <div className="relative w-full h-full">
                <HandbagIllustration />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-black px-3 py-1.5 rounded-full shadow-lg rotate-6 select-none">
                SALE 30%
              </div>
              <div className="absolute -bottom-1 -left-2 bg-white text-[#970747] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg -rotate-3 select-none flex items-center gap-1">
                <Star size={11} className="fill-amber-400 text-amber-400" /> 4.8 Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar  */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#970747]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">{title}</p>
                  <p className="text-[10px] text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">Shop by Category</h2>
          <Link href="/products" className="text-xs text-[#970747] font-semibold flex items-center gap-1 hover:underline">
            All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {categories.map(({ name, slug, emoji, bg, accent }) => (
            <Link
              key={slug}
              href={`/products?category=${encodeURIComponent(slug)}`}
              className={`group bg-gradient-to-br ${bg} rounded-2xl p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-3xl mb-2">{emoji}</div>
              <h3 className={`font-bold text-sm ${accent}`}>{name}</h3>
              <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                Explore <ArrowRight size={10} />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Trending · Discounted · High Rated Product Sections ──────────── */}
      <HomeProductSections />

      {/* ─── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl bg-gray-900 text-white p-8 md:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle bg accent */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#970747]/20 blur-2xl pointer-events-none" />
          <div className="relative">
            <p className="text-[#970747] text-xs font-semibold uppercase tracking-widest mb-1">Limited Time</p>
            <h2 className="text-2xl md:text-3xl font-black mb-1">Up to 40% Off on Electronics</h2>
            <p className="text-gray-400 text-sm">Premium tech gear at unbeatable prices.</p>
          </div>
          <Link
            href="/products?category=electronics"
            className="relative inline-flex items-center gap-2 bg-[#970747] text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#7a0538] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#970747]/25 shrink-0"
          >
            Shop Electronics <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </div>
  );
}
