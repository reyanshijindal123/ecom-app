"use client";

import Image from "next/image";

import { INR } from "@/lib/utils";

export default function OrderPreview({ items }: { items: any[] }) {
  return (
    <div
      className="
bg-gray-50 rounded-xl 
p-3 max-h-40 
overflow-y-auto space-y-2
"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="
flex items-center gap-2
"
        >
          <div
            className="
relative w-9 h-9 
bg-white rounded-lg 
overflow-hidden shrink-0
"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain p-1"
              sizes="36px"
            />
          </div>

          <p
            className="
flex-1 text-xs 
text-gray-700 
line-clamp-1
"
          >
            {item.title}
          </p>

          <span
            className="
text-xs font-bold 
text-gray-900 shrink-0
"
          >
            {INR(item.price * item.quantity)}
          </span>
        </div>
      ))}
    </div>
  );
}
