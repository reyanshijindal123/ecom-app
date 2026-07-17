"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function OrderSearch({ search, setSearch }: Props) {
  return (
    <div className="mb-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by order id or product name..."
        className="
          w-full rounded-xl border
          px-5 py-3
          outline-none
          focus:ring-2 focus:ring-pink-500
        "
      />
    </div>
  );
}
