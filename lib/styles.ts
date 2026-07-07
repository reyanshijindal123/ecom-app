
export const BRAND = '#970747';
export const BRAND_DARK = '#7a0538';

// ─── Buttons ─────────────────────────────────────────────────────────────────
export const btn = {
  /** Solid brand CTA — e.g. "Add to cart", "Sign in" */
  primary:
    'inline-flex items-center justify-center gap-2 bg-[#970747] text-white font-bold rounded-2xl ' +
    'hover:bg-[#7a0538] active:scale-95 transition-all hover:-translate-y-0.5 ' +
    'shadow-lg shadow-[#970747]/20 disabled:opacity-60 disabled:pointer-events-none',

  /** Outline / secondary */
  outline:
    'inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-bold ' +
    'rounded-2xl hover:border-[#970747] hover:text-[#970747] active:scale-95 transition-all',

  /** Destructive (delete / logout) */
  danger:
    'inline-flex items-center justify-center gap-2 bg-red-500 text-white font-bold rounded-2xl ' +
    'hover:bg-red-600 active:scale-95 transition-all shadow-lg shadow-red-500/20',

  /** Ghost / text-only */
  ghost:
    'inline-flex items-center justify-center gap-1 text-sm font-semibold text-gray-500 ' +
    'hover:text-[#970747] transition-colors',

  /** Sizes — combine with a variant above */
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-sm',
  full: 'w-full py-3.5 text-sm',
} as const;

// ─── Inputs ──────────────────────────────────────────────────────────────────
export const input = {
  /** Standard text input */
  base:
    'w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm placeholder:text-gray-300 ' +
    'focus:outline-none focus:border-[#970747] focus:ring-2 focus:ring-[#970747]/8 transition-all bg-white text-gray-800',

  /** Compact variant (search bars, table cells) */
  compact:
    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-300 ' +
    'focus:outline-none focus:border-[#970747] focus:ring-1 focus:ring-[#970747]/10 transition-all bg-white text-gray-800',

  /** Error state — append to base or compact */
  error: 'border-red-400 focus:border-red-500 focus:ring-red-500/10',

  /** Input label */
  label: 'block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5',
} as const;

// ─── Cards ───────────────────────────────────────────────────────────────────
export const card = {
  /** Default elevated card */
  base: 'bg-white rounded-2xl border border-gray-100 shadow-sm',

  /** Card with hover lift */
  hover: 'bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5',

  /** Flat / outlined (e.g. filter panel, coupon) */
  flat: 'bg-white rounded-2xl border border-gray-100',

  /** Pink tinted (e.g. brand accent sections) */
  brand: 'bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100',

  /** Inner padding sizes */
  p: {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-7',
  },
} as const;

// ─── Badges / Pills ───────────────────────────────────────────────────────────
export const badge = {
  /** Brand pink pill */
  brand: 'inline-flex items-center gap-1 bg-pink-50 text-[#970747] text-xs font-semibold px-2.5 py-1 rounded-full',

  /** Success green */
  success: 'inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full',

  /** Warning amber */
  warning: 'inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full',

  /** Danger red */
  danger: 'inline-flex items-center gap-1 bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full',

  /** Neutral gray */
  gray: 'inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full',
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────
export const text = {
  pageTitle: 'text-2xl sm:text-3xl font-black text-gray-900',
  sectionTitle: 'text-xl sm:text-2xl font-black text-gray-900',
  cardTitle: 'text-base font-black text-gray-900',
  muted: 'text-sm text-gray-500',
  micro: 'text-[11px] text-gray-400',
  brand: 'text-[#970747] font-semibold',
  error: 'text-xs text-red-500',
} as const;

// ─── Layout ───────────────────────────────────────────────────────────────────
export const layout = {
  /** Standard page container */
  page: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',

  /** Narrower checkout/form container */
  narrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6',

  /** Section divider */
  divider: 'border-t border-gray-100',

  /** Sticky sidebar */
  sticky: 'sticky top-20',
} as const;

// ─── Modal ────────────────────────────────────────────────────────────────────
export const modal = {
  backdrop: 'fixed inset-0 z-[200] flex items-center justify-center p-4',
  overlay: 'absolute inset-0 bg-black/50 backdrop-blur-[2px]',
  panel: 'relative bg-white rounded-3xl shadow-2xl w-full overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300',
  closeBtn: 'absolute top-5 right-5 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all',
  strip: {
    brand: 'h-1.5 w-full bg-gradient-to-r from-[#970747] via-pink-400 to-[#970747]',
    danger: 'h-1.5 w-full bg-gradient-to-r from-red-400 via-red-500 to-red-400',
    success: 'h-1.5 w-full bg-gradient-to-r from-green-400 via-green-500 to-green-400',
    blue: 'h-1.5 w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400',
  },
} as const;

// ─── Icon chip (icon inside a small rounded box) ──────────────────────────────
export const iconChip = {
  base: 'flex items-center justify-center rounded-xl transition-colors shrink-0',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  brand: 'bg-pink-50 text-[#970747]',
  gray: 'bg-gray-100 text-gray-500',
  success: 'bg-green-50 text-green-600',
  danger: 'bg-red-50 text-red-500',
} as const;
