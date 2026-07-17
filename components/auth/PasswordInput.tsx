"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { inputBase } from "./constants";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PasswordInput({
  value,
  onChange,
  placeholder = "••••••••",
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Lock
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-350 pointer-events-none z-10"
      />

      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputBase} pl-10 pr-10`}
      />

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#970747] transition-colors"
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}
