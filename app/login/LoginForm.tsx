"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Logo from "@/components/auth/Logo";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") === "signup" ? "signup" : "login";

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-pink-50/60 via-white to-white">
      <div className="w-full max-w-md">
        {/* Logo + Heading */}
        <div className="text-center mb-8">
          <Logo />

          <h1 className="text-2xl font-black text-gray-900 mt-5">
            {tab === "login" ? "Welcome back" : "Join VelvetStore"}
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            {tab === "login"
              ? "Sign in to access your account"
              : "Curated fashion, delivered to you"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-2xl mb-7">
          {(["login", "signup"] as const).map((item) => (
            <button
              key={item}
              onClick={() =>
                item === "signup"
                  ? router.replace("/login?tab=signup")
                  : router.replace("/login")
              }
              className={`
                flex-1 py-2.5 rounded-xl text-sm font-bold transition-all
                ${
                  tab === item
                    ? "bg-white text-[#970747] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              {item === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
          {tab === "login" ? (
            <LoginForm onSwitch={() => router.replace("/login?tab=signup")} />
          ) : (
            <SignupForm onSwitch={() => router.replace("/login")} />
          )}
        </div>
      </div>
    </div>
  );
}
