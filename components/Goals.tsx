'use client';

import { useMemo, useState } from 'react';
import { FaBullseye, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { StoredActivity } from '@/lib/utils/localStorage';

interface GoalsProps {
  activities: StoredActivity[];
}

type GoalStatus = 'on-track' | 'behind' | 'achieved';

const getInitialGoal = () => {
  if (typeof window === 'undefined') return 10;
  const savedGoal = localStorage.getItem('carbonGoal');
  return savedGoal ? Number.parseInt(savedGoal, 10) : 10;
};

export default function Goals({ activities }: GoalsProps) {
  const [goal, setGoal] = useState<number>(getInitialGoal);

  const progressState = useMemo(() => {
    if (activities.length === 0) {
      return { progress: 0, status: 'on-track' as GoalStatus };
    }

    const now = new Date();
    const currentWeekStart = new Date(now);
    currentWeekStart.setDate(now.getDate() - now.getDay());
    currentWeekStart.setHours(0, 0, 0, 0);
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
    currentWeekEnd.setHours(23, 59, 59, 999);

    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7);
    previousWeekStart.setHours(0, 0, 0, 0);
    const previousWeekEnd = new Date(currentWeekStart);
    previousWeekEnd.setDate(previousWeekEnd.getDate() - 1);
    previousWeekEnd.setHours(23, 59, 59, 999);

    const currentWeekActivities = activities.filter((a) => {
      const date = new Date(a.date);
      return date >= currentWeekStart && date <= currentWeekEnd;
    });

    const previousWeekActivities = activities.filter((a) => {
      const date = new Date(a.date);
      return date >= previousWeekStart && date <= previousWeekEnd;
    });

    const currentTotal = currentWeekActivities.reduce((sum, a) => sum + a.co2, 0);
    const previousTotal = previousWeekActivities.reduce((sum, a) => sum + a.co2, 0);

    if (previousTotal === 0) {
      return { progress: 100, status: 'achieved' as GoalStatus };
    }

    const targetTotal = previousTotal * (1 - goal / 100);
    const reduction = previousTotal - currentTotal;
    const requiredReduction = previousTotal - targetTotal;

    if (currentTotal <= targetTotal) {
      return { progress: 100, status: 'achieved' as GoalStatus };
    }

    const progressPercent = requiredReduction > 0 ? Math.min(100, (reduction / requiredReduction) * 100) : 0;
    const status: GoalStatus = progressPercent >= 50 ? 'on-track' : 'behind';

    return { progress: progressPercent, status };
  }, [activities, goal]);

  const handleGoalChange = (newGoal: number) => {
    setGoal(newGoal);
    if (typeof window !== 'undefined') {
      localStorage.setItem('carbonGoal', newGoal.toString());
    }
  };

  const progressColor =
    progressState.status === 'achieved'
      ? 'bg-dark-emerald-300'
      : progressState.status === 'on-track'
      ? 'bg-dark-emerald-400'
      : 'bg-amber-400';

  return (
    <div className="rounded-3xl border border-[#587055] bg-[var(--surface-dark)] p-8 shadow-2xl text-[#f7f2e9]">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaBullseye className="text-dark-emerald-300" />
        <span>Weekly Goal</span>
      </h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#dce4d7] mb-2">Target Reduction (%)</label>
        <select
          value={goal}
          onChange={(e) => handleGoalChange(parseInt(e.target.value, 10))}
          className="w-full rounded-lg border border-[#587055] bg-[#415645] px-3 py-2 text-sm text-[#f7f2e9] focus:border-[#f1dcaf] focus:ring-2 focus:ring-[#f1dcaf]"
        >
          <option value={5}>5%</option>
          <option value={10}>10%</option>
          <option value={15}>15%</option>
          <option value={20}>20%</option>
          <option value={25}>25%</option>
        </select>
      </div>
      <div className="mb-4">
        <p className="mb-2 text-[#eef2e8]">Goal: Reduce emissions by {goal}% compared to last week</p>
        <div className="mb-2 h-4 w-full rounded-full border border-[#587055] bg-[#415645]">
          <div className={`${progressColor} h-4 rounded-full transition-all`} style={{ width: `${progressState.progress}%` }} />
        </div>
        <p className="text-sm text-[#d6ded0]">Progress: {progressState.progress.toFixed(1)}%</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm text-[#eef2e8]">
        {progressState.status === 'achieved' ? (
          <>
            <FaCheckCircle className="text-dark-emerald-300" />
            <span>Goal achieved!</span>
          </>
        ) : progressState.status === 'on-track' ? (
          <>
            <FaBullseye className="text-dark-emerald-300" />
            <span>On track</span>
          </>
        ) : (
          <>
            <FaExclamationTriangle className="text-amber-400" />
            <span className="text-amber-300">Behind schedule</span>
          </>
        )}
      </div>
    </div>
  );
}
