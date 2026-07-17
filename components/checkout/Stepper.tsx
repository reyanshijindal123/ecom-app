"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Step } from "@/types/checkout";

const STEPS: Step[] = ["address", "payment", "success"];

export default function Stepper({ current }: { current: Step }) {
  const labels = ["Address", "Payment"];

  return (
    <ol className="flex items-center gap-2 text-xs font-semibold mb-6">
      {labels.map((label, i) => {
        const step = STEPS[i];

        const isDone = STEPS.indexOf(current) > i;

        const isActive = current === step;

        return (
          <li key={step} className="flex items-center gap-2">
            {i > 0 && <ChevronRight size={12} className="text-gray-300" />}

            <span
              className={cn(
                "px-3 py-1 rounded-full capitalize transition-colors",

                isActive && "bg-[#970747] text-white",

                isDone && "bg-green-100 text-green-700",

                !isActive && !isDone && "bg-gray-100 text-gray-400",
              )}
            >
              {i + 1}. {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
