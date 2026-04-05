'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { FaLeaf, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-sm">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-4 py-4">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-[var(--foreground)] transition-colors">
          <FaLeaf className="text-dark-emerald-500" />
          <span>Carbon Tracker</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-3">
          {session ? (
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 text-sm text-[var(--muted-text)]">
                <FaUser className="text-dark-emerald-500" />
                <span>Welcome, {session.user?.name}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-2 rounded-full border border-[#2d3929] bg-[#4a5f40] px-4 py-2 font-semibold text-white shadow-[0_10px_24px_-14px_rgba(45,57,41,0.75)] transition-colors hover:bg-[#3b4b34]"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/auth/signin"
                className="flex items-center space-x-2 rounded-full border border-[#2d3929] bg-[#4a5f40] px-4 py-2 font-semibold text-white shadow-[0_10px_24px_-14px_rgba(45,57,41,0.75)] transition-colors hover:bg-[#3b4b34]"
              >
                <FaSignInAlt />
                <span>Sign In</span>
              </Link>
              <Link
                href="/auth/signup"
                className="flex items-center space-x-2 rounded-full border border-[#2d3929] bg-[#5a744e] px-4 py-2 font-semibold text-white shadow-[0_10px_24px_-14px_rgba(45,57,41,0.75)] transition-colors hover:bg-[#4a5f40]"
              >
                <FaUserPlus />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
