'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaLeaf, FaEnvelope, FaLock, FaSignInAlt, FaArrowLeft } from 'react-icons/fa';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const inputClass =
    'w-full rounded-xl border border-[var(--border)] bg-[#fffaf1] px-3 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-text)] transition focus:border-dark-emerald-500 focus:ring-2 focus:ring-dark-emerald-300';

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[0_25px_60px_-25px_rgba(47,61,41,0.35)]">
        <div className="text-center mb-8">
          <FaLeaf className="mx-auto mb-4 text-4xl text-dark-emerald-500" />
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Welcome Back</h1>
          <p className="text-[var(--muted-text)]">Sign in to your Carbon Tracker account.</p>
        </div>
        {error && (
          <div className="mb-6 rounded-2xl border border-[#d0ab6c] bg-[#fbf3e4] px-4 py-3 text-sm text-[#6d5126]">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--muted-text)] mb-2">Email Address</label>
            <div className="relative">
              <FaEnvelope className="pointer-events-none absolute left-3 top-3 text-[var(--muted-text)]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputClass} pl-10`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--muted-text)] mb-2">Password</label>
            <div className="relative">
              <FaLock className="pointer-events-none absolute left-3 top-3 text-[var(--muted-text)]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pl-10`}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#2d3929] bg-[#4a5f40] py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_14px_30px_-18px_rgba(45,57,41,0.75)] transition hover:bg-[#3b4b34] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
            ) : (
              <>
                <FaSignInAlt />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>
        <div className="mt-4">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#5a744e] bg-[#e5ede0] py-3 text-sm font-semibold uppercase tracking-wide text-[#2d3929] transition hover:bg-[#cfdcc7]"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
        </div>
        <div className="mt-6 text-center text-sm text-[var(--muted-text)]">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-semibold text-dark-emerald-500 hover:text-dark-emerald-400">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
