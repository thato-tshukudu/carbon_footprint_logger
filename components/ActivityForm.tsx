'use client';

import { useState } from 'react';
import { activities } from '@/lib/data/activities';
import { FaCalendarAlt, FaComment, FaSave } from 'react-icons/fa';

export interface ActivityEntry {
  type: string;
  category: string;
  value: number;
  unit: string;
  co2: number;
  description?: string;
  date: string;
}

interface ActivityFormProps {
  onSubmit: (activity: ActivityEntry) => void;
}

export default function ActivityForm({ onSubmit }: ActivityFormProps) {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const activity = activities.find((a) => a.id === selectedActivity);
    if (!activity || !value) {
      setLoading(false);
      return;
    }

    const co2 = parseFloat(value) * activity.co2Factor;
    const newActivity = {
      type: activity.type,
      category: activity.category,
      value: parseFloat(value),
      unit: activity.unit,
      co2,
      description,
      date,
    };

    onSubmit(newActivity);
    setSelectedActivity('');
    setValue('');
    setDescription('');
    setLoading(false);
  };

  const inputBase =
    'w-full rounded-lg border px-3 py-3 text-sm text-[#f7f2e9] transition focus:outline-none';

  const fieldBorder = 'border-[#587055] focus:border-[#f1dcaf] focus:ring-[#f1dcaf]';

  return (
    <div className="rounded-3xl border border-[#587055] bg-[var(--surface-dark)] p-8 shadow-2xl text-[#f7f2e9]">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaSave className="text-dark-emerald-300" />
        <span>Log New Activity</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#dce4d7] mb-2">Activity Type</label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className={`${inputBase} ${fieldBorder} bg-[#415645]`}
              required
            >
              <option value="">Select an activity</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.type} ({activity.unit})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#dce4d7] mb-2">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={`${inputBase} ${fieldBorder} bg-[#415645]`}
              placeholder="Enter value"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#dce4d7] mb-2">Date</label>
            <div className="relative">
              <FaCalendarAlt className="pointer-events-none absolute left-3 top-3 text-dark-emerald-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`${inputBase} ${fieldBorder} pl-10 bg-[#415645]`}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#dce4d7] mb-2">Description (Optional)</label>
            <div className="relative">
              <FaComment className="absolute left-3 top-3 text-dark-emerald-400" />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${inputBase} ${fieldBorder} pl-10 bg-[#415645]`}
                placeholder="Add a note"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-full border border-[#2d3929] bg-[#4a5f40] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_-18px_rgba(45,57,41,0.75)] transition hover:bg-[#3b4b34] disabled:opacity-60"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              <>
                <FaSave />
                <span>Save Activity</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
