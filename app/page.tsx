'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import {
  FaLeaf,
  FaChartLine,
  FaLightbulb,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaShieldVirus,
} from 'react-icons/fa';

const heroStats = [
  { label: 'Activities', value: '50k+', detail: 'Logged weekly by the community' },
  { label: 'Average reduction', value: '12%', detail: 'Users beat their baseline each month' },
  { label: 'Tips served', value: '350+', detail: 'Contextual suggestions every day' },
];

const categoryPulse = [
  { label: 'transport', change: '+3.4%' },
  { label: 'food', change: '+1.8%' },
  { label: 'energy', change: '-0.7%' },
];

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [featuresExpanded, setFeaturesExpanded] = useState(false);

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="container mx-auto px-4 py-16 space-y-12">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-dark-emerald-500">
              <FaLeaf />
              Carbon Track
            </p>
            <h1 className="text-5xl font-bold leading-tight text-[var(--foreground)]">
              Track daily emissions, celebrate wins, and stay motivated with guided reductions.
            </h1>
            <p className="text-lg text-[var(--muted-text)] max-w-2xl">
              Log activities, compare them to community averages, and follow personalized tips that highlight
              your highest-emission behaviours. Everything stays lightweight with local persistence when
              services go offline.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/auth/signin"
                className="rounded-full border border-[#2d3929] bg-[#4a5f40] px-6 py-3 font-semibold text-white shadow-[0_14px_30px_-18px_rgba(45,57,41,0.75)] transition-colors hover:bg-[#3b4b34]"
              >
                Get Started
              </Link>
              <button
                type="button"
                onClick={() => setFeaturesExpanded((prev) => !prev)}
                className="rounded-full border border-[#2d3929] bg-[#5a744e] px-6 py-3 font-semibold text-white shadow-[0_12px_28px_-16px_rgba(45,57,41,0.75)] transition hover:bg-[#4a5f40]"
              >
                {featuresExpanded ? 'Hide Features' : 'See Features'}
                {featuresExpanded ? <FaChevronUp className="inline ml-2" /> : <FaChevronDown className="inline ml-2" />}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 shadow-sm"
                >
                  <p className="text-sm uppercase tracking-wide text-[var(--muted-text)]">{stat.label}</p>
                  <p className="text-3xl font-bold text-[var(--foreground)]">{stat.value}</p>
                  <p className="text-sm text-[var(--muted-text)]">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-[#51644f] bg-[var(--surface-dark)] p-8 text-[#f7f2e9] shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-widest text-[#d9dfd2]">Community average</p>
                <p className="text-4xl font-bold text-[#f3e1b7]">8.4 kg CO₂</p>
              </div>
              <FaShieldVirus className="text-[#f3e1b7] text-3xl" />
            </div>
            <p className="text-sm text-[#eef2e8] mb-4">
              Compare your totals, spotlight transport hot spots, and cycle through friendly weekly goals.
            </p>
            <div className="space-y-3">
              {categoryPulse.map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span className="capitalize text-[#e2e7dc]">{row.label}</span>
                  <span className="font-semibold text-[#f3e1b7]">{row.change}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-[var(--muted-text)]">Platform insights</p>
              <h2 className="text-3xl font-bold text-[var(--foreground)]">Designed for local action</h2>
            </div>
            <p className="text-sm text-[var(--muted-text)]">{featuresExpanded ? 'Shrinking emissions in 3, 2, 1...' : 'Simple, steady, transparent.'}</p>
          </div>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${featuresExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Track activities',
                  body: 'Log transport, food, and energy habits with ready-made CO₂ factors.',
                  icon: <FaChartLine className="text-3xl text-dark-emerald-300" />,
                },
                {
                  title: 'Insights & goals',
                  body: 'Weekly goals, streaks, and tips highlight what matters most.',
                  icon: <FaLightbulb className="text-3xl text-dark-emerald-300" />,
                },
                {
                  title: 'Community pulse',
                  body: 'Compare your totals to the collective average and stay motivated.',
                  icon: <FaUsers className="text-3xl text-dark-emerald-300" />,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#5b7058] bg-[var(--surface-dark)] p-6 text-[#f7f2e9] shadow-lg transition hover:bg-[var(--surface-dark-hover)]"
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-[#e8ede2]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-[var(--muted-text)]">Ready to act?</p>
              <h3 className="text-3xl font-bold text-[var(--foreground)]">Log, compare, and reduce without losing momentum.</h3>
            </div>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-3 rounded-full border border-[#2d3929] bg-[#4a5f40] px-6 py-3 font-semibold text-white shadow-[0_14px_30px_-18px_rgba(45,57,41,0.75)] transition-colors hover:bg-[#3b4b34]"
            >
              <FaLeaf className="text-lg" />
              Create an account
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
