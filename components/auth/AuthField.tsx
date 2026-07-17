"use client";

import React from "react";

interface FieldProps {
  label: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
}

export default function Field({
  label,
  icon: Icon,
  error,
  children,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-350 pointer-events-none"
        />

        <div className="[&>input]:pl-10">{children}</div>
      </div>

      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
