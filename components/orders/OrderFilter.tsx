"use client";

interface Props {
  active: string;
  setActive: (status: string) => void;
}

const filters = [
  "all",
  "processing",
  "shipped",
  "delivered",
];

export default function OrderFilter({
  active,
  setActive,
}: Props) {

  return (
    <div className="flex flex-wrap gap-3 mb-6 mt-2">
    {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={`px-5 py-2  rounded-xl font-semibold capitalize transition ${
            active === filter
              ? "bg-pink-600 text-black border"
              : ""
          }`}
        >
          {filter} 
        </button>
      ))}

    </div>
  );
}