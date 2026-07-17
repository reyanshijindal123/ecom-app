'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Logo from './Logo';

export default function AuthCard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab: 'login' | 'signup' =
    searchParams.get('tab') === 'signup'
      ? 'signup'
      : 'login';

  return (
    <>
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>

        <h1 className="text-2xl font-black text-gray-900">
          {tab === 'login'
            ? 'Welcome back'
            : 'Join VelvetStore'}
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          {tab === 'login'
            ? 'Sign in to access your account'
            : 'Curated fashion, delivered to you'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-2xl mb-7">
        {(['login', 'signup'] as const).map((t) => (
          <button
            key={t}
            onClick={() => {
              if (t === 'signup') {
                router.replace('/login?tab=signup');
              } else {
                router.replace('/login');
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
          <LoginForm
            onSwitch={() =>
              router.replace('/login?tab=signup')
            }
          />
        ) : (
          <SignupForm
            onSwitch={() =>
              router.replace('/login')
            }
          />
        )}
      </div>
    </>
  );
}