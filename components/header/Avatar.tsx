interface AvatarProps {
  name?: string;
  size?: "sm" | "lg";
}

export default function Avatar({ name, size = "sm" }: AvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const dimension = size === "lg" ? "w-11 h-11 text-base" : "w-7 h-7 text-xs";

  return (
    <div
      className={`${dimension} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#970747] to-pink-400 font-bold text-white shadow-md shadow-[#970747]/20`}
    >
      {initials}
    </div>
  );
}
