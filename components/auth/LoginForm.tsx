"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore } from "@/store";
import { api } from "@/lib/api";

import Field from "./AuthField";
import PasswordInput from "./PasswordInput";
import { inputBase } from "./constants";

import { User, Info, Loader2, ArrowRight } from "lucide-react";

interface LoginFormProps {
  onSwitch: () => void;
}

export default function LoginForm({ onSwitch }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";
  const { login } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await api.login(username, password);

      const users = await fetch("https://fakestoreapi.com/users").then((r) =>
        r.json(),
      );

      const found = users.find(
        (u: { username: string }) => u.username === username,
      );

      if (found) {
        login(found);
        router.push(redirect);
      } else {
        setError("Credentials valid but user not found. Try: johnd / m38rmF$");
      }
    } catch {
      setError("Invalid username or password. Try: johnd / m38rmF$");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Demo credentials */}
      <div className="flex gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3.5">
        <Info size={15} className="text-amber-500 shrink-0 mt-0.5" />

        <div className="text-xs text-amber-700 leading-relaxed">
          <span className="font-bold block mb-0.5">Demo credentials</span>
          Username:{" "}
          <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">
            johnd
          </code>{" "}
          · Password:{" "}
          <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">
            m38rmF$
          </code>
          <p className="mt-1">
            This project uses demo credentials provided by the FakestoreAPI.
          </p>
        </div>
      </div>

      <Field label="Username" icon={User}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="johnd"
          required
          className={inputBase}
        />
      </Field>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Password
        </label>

        <PasswordInput value={password} onChange={setPassword} />

        <div className="flex justify-end">
          <button
            type="button"
            className="text-xs text-[#970747] hover:underline font-medium"
          >
            Forgot password?
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-3 flex items-start gap-2">
          <span className="shrink-0 mt-0.5">⚠</span>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#970747] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#7a0538] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#970747]/20 disabled:opacity-60 disabled:translate-y-0"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            Login
            <ArrowRight size={15} />
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        New to VelvetStore?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#970747] font-bold hover:underline"
        >
          Create account
        </button>
      </p>
    </form>
  );
}
