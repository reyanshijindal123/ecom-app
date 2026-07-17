"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store";

import PasswordInput from "./PasswordInput";
import { inputBase, PASSWORD_RULES } from "./constants";

import { Loader2, ArrowRight, CheckCircle2, User, Mail } from "lucide-react";

interface SignupFormProps {
  onSwitch: () => void;
}

export default function SignupForm({ onSwitch }: SignupFormProps) {
  const router = useRouter();
  const { login } = useAuthStore();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirm: "",
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.firstname.trim()) {
      e.firstname = "First name is required";
    }

    if (!form.lastname.trim()) {
      e.lastname = "Last name is required";
    }

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email";
    }

    if (!form.username.trim()) {
      e.username = "Username is required";
    } else if (form.username.length < 3) {
      e.username = "Minimum 3 characters";
    }

    if (!form.password) {
      e.password = "Password is required";
    } else if (!PASSWORD_RULES.every((r) => r.test(form.password))) {
      e.password = "Password too weak";
    }

    if (!form.confirm) {
      e.confirm = "Confirm your password";
    } else if (form.password !== form.confirm) {
      e.confirm = "Passwords do not match";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    login({
      id: Date.now(),
      username: form.username,
      email: form.email,
      name: {
        firstname: form.firstname,
        lastname: form.lastname,
      },
    });

    router.push("/");

    setLoading(false);
  };

  const passStrength = PASSWORD_RULES.filter((r) =>
    r.test(form.password),
  ).length;

  const strengthColor =
    ["bg-red-400", "bg-amber-400", "bg-green-400"][passStrength - 1] ??
    "bg-gray-200";

  const strengthLabel = ["", "Weak", "Fair", "Strong"][passStrength];
  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {/* First Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
            First Name
          </label>

          <div className="relative">
            <User
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-350 pointer-events-none"
            />

            <input
              value={form.firstname}
              onChange={(e) => set("firstname")(e.target.value)}
              placeholder="Rahul"
              className={`${inputBase} pl-10`}
            />
          </div>

          {errors.firstname && (
            <p className="text-xs text-red-500">⚠ {errors.firstname}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Last Name
          </label>

          <input
            value={form.lastname}
            onChange={(e) => set("lastname")(e.target.value)}
            placeholder="Sharma"
            className={inputBase}
          />

          {errors.lastname && (
            <p className="text-xs text-red-500">⚠ {errors.lastname}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Email
        </label>

        <div className="relative">
          <Mail
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-350 pointer-events-none"
          />

          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="rahul@email.com"
            className={`${inputBase} pl-10`}
          />
        </div>

        {errors.email && (
          <p className="text-xs text-red-500">⚠ {errors.email}</p>
        )}
      </div>

      {/* Username */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Username
        </label>

        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold pointer-events-none">
            @
          </span>

          <input
            value={form.username}
            onChange={(e) => set("username")(e.target.value)}
            placeholder="rahul123"
            className={`${inputBase} pl-9`}
          />
        </div>

        {errors.username && (
          <p className="text-xs text-red-500">⚠ {errors.username}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Password
        </label>

        <PasswordInput
          value={form.password}
          onChange={set("password")}
          placeholder="Create a strong password"
        />

        {form.password && (
          <div className="space-y-1.5">
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    i <= passStrength ? strengthColor : "bg-gray-100"
                  }`}
                />
              ))}

              <span
                className={`text-xs font-semibold ml-1 ${
                  passStrength === 3
                    ? "text-green-600"
                    : passStrength === 2
                      ? "text-amber-600"
                      : "text-red-500"
                }`}
              >
                {strengthLabel}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1">
              {PASSWORD_RULES.map((rule) => (
                <span
                  key={rule.label}
                  className={`text-[10px] flex items-center gap-1 ${
                    rule.test(form.password)
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  <CheckCircle2
                    size={10}
                    className={
                      rule.test(form.password)
                        ? "text-green-500"
                        : "text-gray-300"
                    }
                  />

                  {rule.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {errors.password && (
          <p className="text-xs text-red-500">⚠ {errors.password}</p>
        )}
      </div>
      {/* Confirm Password */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Confirm Password
        </label>

        <PasswordInput
          value={form.confirm}
          onChange={set("confirm")}
          placeholder="Repeat your password"
        />

        {errors.confirm && (
          <p className="text-xs text-red-500">⚠ {errors.confirm}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#970747] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#7a0538] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#970747]/20 disabled:opacity-60 disabled:translate-y-0"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Creating account…
          </>
        ) : (
          <>
            Create Account
            <ArrowRight size={15} />
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#970747] font-bold hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}