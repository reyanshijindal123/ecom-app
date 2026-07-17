interface CountBadgeProps {
  count: number;
}

export default function CountBadge({
  count,
}: CountBadgeProps) {
  if (count <= 0) return null;

  return (
    <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#970747] text-[9px] font-bold text-white">
      {count}
    </span>
  );
}