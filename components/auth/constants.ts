export const inputBase =
  "w-full border-2 rounded-xl px-4 py-3 text-sm transition-all outline-none " +
  "focus:border-[#970747] focus:ring-4 focus:ring-[#970747]/8 placeholder:text-gray-300 " +
  "border-gray-200 bg-white text-gray-800";

export const PASSWORD_RULES = [
  {
    test: (p: string) => p.length >= 8,
    label: "At least 8 characters",
  },
  {
    test: (p: string) => /[A-Z]/.test(p),
    label: "One uppercase letter",
  },
  {
    test: (p: string) => /\d/.test(p),
    label: "One number",
  },
];
