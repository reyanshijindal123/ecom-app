'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store';
import { api } from '@/lib/api';
import {
  ShoppingBag, Eye, EyeOff, Loader2, Info,
  User, Mail, Lock, ArrowRight, CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

// ─── Shared field styles ───────────────────────────────────────────────────
const inputBase =
  'w-full border-2 rounded-xl px-4 py-3 text-sm transition-all outline-none ' +
  'focus:border-[#970747] focus:ring-4 focus:ring-[#970747]/8 placeholder:text-gray-300 ' +
  'border-gray-200 bg-white text-gray-800';

// ─── Input wrapper with icon ───────────────────────────────────────────────
function Field({
  label, icon: Icon, error, children,
}: {
  label: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-350 pointer-events-none" />
        <div className="[&>input]:pl-10">{children}</div>
      </div>
      {error && <p className="text-xs text-red-500 flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  );
}

// ─── Password field ────────────────────────────────────────────────────────
function PasswordInput({
  value, onChange, placeholder = '••••••••',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-350 pointer-events-none z-10" />
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}

        className={`${inputBase} pl-10 pr-10`}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#970747] transition-colors"
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}

// ─── Logo ──────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group">
      <div className="w-10 h-10 rounded-xl bg-[#970747] flex items-center justify-center shadow-lg shadow-[#970747]/25 group-hover:scale-105 transition-transform">
        <ShoppingBag size={18} className="text-white" />
      </div>
      <span className="text-xl font-black tracking-tight text-[#970747]">
        Velvet<span className="text-gray-800">Store</span>
      </span>
    </Link>
  );
}

// ─── Login Form ────────────────────────────────────────────────────────────
function LoginTab({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { login } = useAuthStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.login(username, password);
      const users = await fetch('https://fakestoreapi.com/users').then((r) => r.json());
      const found = users.find((u: { username: string }) => u.username === username);
      if (found) {
        login(found);
        router.push(redirect);
      } else {
        setError('Credentials valid but user not found. Try: johnd / m38rmF$');
      }
    } catch {
      setError('Invalid username or password. Try: johnd / m38rmF$');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Demo hint */}
      <div className="flex gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3.5">
        <Info size={15} className="text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-700 leading-relaxed">
          <span className="font-bold block mb-0.5">Demo credentials</span>
          Username: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">johnd</code>
          {' '}· Password: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">m38rmF$</code>
           <p>
              This project uses demo credentials provided by the FakestoreAPI
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
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
        <PasswordInput value={password} onChange={setPassword} />
        <div className="flex justify-end">
          <button type="button" className="text-xs text-[#970747] hover:underline font-medium">
            Forgot password?
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-3 flex items-start gap-2">
          <span className="shrink-0 mt-0.5">⚠</span> {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#970747] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#7a0538] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#970747]/20 disabled:opacity-60 disabled:translate-y-0"
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" /> Signing in…</>
        ) : (
          <>Login <ArrowRight size={15} /></>
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        New to VelvetStore?{' '}
        <button type="button" onClick={onSwitch} className="text-[#970747] font-bold hover:underline">
          Create account
        </button>
      </p>
    </form>
  );
}

// ─── Signup Form ───────────────────────────────────────────────────────────
const PASSWORD_RULES = [
  { test: (p: string) => p.length >= 8, label: 'At least 8 characters' },
  { test: (p: string) => /[A-Z]/.test(p), label: 'One uppercase letter' },
  { test: (p: string) => /\d/.test(p), label: 'One number' },
];

function SignupTab({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    firstname: '', lastname: '', email: '', username: '', password: '', confirm: '',
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

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
    await new Promise(r => setTimeout(r, 900));
    login({
      id: Date.now(),
      username: form.username,
      email: form.email,
      name: { firstname: form.firstname, lastname: form.lastname },
    });
    router.push('/');
    setLoading(false);
  };

  const passStrength = PASSWORD_RULES.filter(r => r.test(form.password)).length;
  const strengthColor = ['bg-red-400', 'bg-amber-400', 'bg-green-400'][passStrength - 1] ?? 'bg-gray-200';
  const strengthLabel = ['', 'Weak', 'Fair', 'Strong'][passStrength];

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">First Name</label>
          <div className="relative">
            <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-350 pointer-events-none" />
            <input
              value={form.firstname}
              onChange={(e) => set('firstname')(e.target.value)}
              placeholder="Rahul"
              className={`${inputBase} pl-10`}
            />
          </div>
          {errors.firstname && <p className="text-xs text-red-500">⚠ {errors.firstname}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Name</label>
          <input
            value={form.lastname}
            onChange={(e) => set('lastname')(e.target.value)}
            placeholder="Sharma"
            className={inputBase}
          />
          {errors.lastname && <p className="text-xs text-red-500">⚠ {errors.lastname}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
        <div className="relative">
          <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-350 pointer-events-none" />
          <input
            type="email"
            value={form.email}
            onChange={(e) => set('email')(e.target.value)}
            placeholder="rahul@email.com"
            className={`${inputBase} pl-10`}
          />
        </div>
        {errors.email && <p className="text-xs text-red-500">⚠ {errors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Username</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold pointer-events-none">@</span>
          <input
            value={form.username}
            onChange={(e) => set('username')(e.target.value)}
            placeholder="rahul123"
            className={`${inputBase} pl-9`}
          />
        </div>
        {errors.username && <p className="text-xs text-red-500">⚠ {errors.username}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
        <PasswordInput value={form.password} onChange={set('password')} placeholder="Create a strong password" />
        {form.password && (
          <div className="space-y-1.5">
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= passStrength ? strengthColor : 'bg-gray-100'}`} />
              ))}
              <span className={`text-xs font-semibold ml-1 ${passStrength === 3 ? 'text-green-600' : passStrength === 2 ? 'text-amber-600' : 'text-red-500'}`}>
                {strengthLabel}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {PASSWORD_RULES.map((r) => (
                <span key={r.label} className={`text-[10px] flex items-center gap-1 ${r.test(form.password) ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle2 size={10} className={r.test(form.password) ? 'text-green-500' : 'text-gray-300'} />
                  {r.label}
                </span>
              ))}
            </div>
          </div>
        )}
        {errors.password && <p className="text-xs text-red-500">⚠ {errors.password}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Confirm Password</label>
        <PasswordInput value={form.confirm} onChange={set('confirm')} placeholder="Repeat your password" />
        {errors.confirm && <p className="text-xs text-red-500">⚠ {errors.confirm}</p>}
      </div>

    
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#970747] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#7a0538] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#970747]/20 disabled:opacity-60 disabled:translate-y-0"
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" /> Creating account…</>
        ) : (
          <>Create Account <ArrowRight size={15} /></>
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-[#970747] font-bold hover:underline">
          Sign in
        </button>
      </p>
    </form>
  );
}

// ─── Main Auth Page ────────────────────────────────────────────────────────
export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();


const tab: "login" | "signup" =
  searchParams.get("tab") === "signup" ? "signup" : "login";

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-pink-50/60 via-white to-white">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          
          <h1 className="text-2xl font-black text-gray-900">
            {tab === 'login' ? 'Welcome back' : 'Join VelvetStore'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {tab === 'login'
              ? 'Sign in to access your account'
              : 'Curated fashion, delivered to you'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-gray-100 p-1 rounded-2xl mb-7">
          {(['login', 'signup'] as const).map((t) => (
            <button
              key={t}
            onClick={() => {
  if (t === "signup") {
    router.replace("/login?tab=signup");
  } else {
    router.replace("/login");
  }
}}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                tab === t
                  ? 'bg-white text-[#970747] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
          {tab === 'login' ? (
            <LoginTab 
            onSwitch ={() => {
              router.replace("/login?tab=signup");
            }}/>
         
          ) : (
            <SignupTab 
            onSwitch ={() => {
              router.push("/login");
            }}/>
          )}
        </div>
      </div>
    </div>
  );
}
