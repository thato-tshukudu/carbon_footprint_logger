'use client';

import { tips } from '@/lib/data/tips';
import { FaLightbulb, FaCheckCircle } from 'react-icons/fa';

interface TipsProps {
  categoryData: Record<string, number>;
}

export default function Tips({ categoryData }: TipsProps) {
  const entries = Object.entries(categoryData);

  if (entries.length === 0) {
    return (
      <div className="rounded-3xl border border-[#587055] bg-[var(--surface-dark)] p-8 shadow-2xl text-[#f7f2e9]">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaLightbulb className="text-dark-emerald-300" />
          <span>Reduction Tips</span>
        </h2>
        <p className="text-[#eef2e8]">Log an activity to unlock personalized tips and weekly goals.</p>
      </div>
    );
  }

  const highestCategoryEntry = entries.reduce((a, b) => (a[1] > b[1] ? a : b));
  const highestCategory = highestCategoryEntry[0];
  const categoryTips = tips[highestCategory as keyof typeof tips] || [];

  return (
    <div className="space-y-4 rounded-3xl border border-[#587055] bg-[var(--surface-dark)] p-8 shadow-2xl text-[#f7f2e9]">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <FaLightbulb className="text-dark-emerald-300" />
        <span>Reduction Tips</span>
      </h2>
      <p className="text-[#eef2e8]">
        Your highest emissions come from{' '}
        <span className="font-semibold text-dark-emerald-300 capitalize">{highestCategory}</span>. Try these tips:
      </p>
      <ul className="space-y-3">
        {categoryTips.map((tip, index) => (
          <li key={index} className="flex items-start gap-3 text-[#eef2e8]">
            <FaCheckCircle className="mt-1 text-dark-emerald-300 flex-shrink-0" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
