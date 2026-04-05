'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Header from '@/components/Header';
import ActivityForm from '@/components/ActivityForm';
import ActivityList from '@/components/ActivityList';
import EmissionsChart from '@/components/EmissionsChart';
import Tips from '@/components/Tips';
import Goals from '@/components/Goals';
import { communityAverage } from '@/lib/data/tips';
import { loadLocalActivities, persistLocalActivities, StoredActivity } from '@/lib/utils/localStorage';
import { FaPlus, FaChartBar, FaLightbulb, FaFilter } from 'react-icons/fa';

const createLocalId = () => {
  if (typeof window !== 'undefined' && 'crypto' in window && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

interface FetchedActivity {
  _id?: string;
  id?: string;
  type?: string;
  category?: string;
  value?: number;
  unit?: string;
  co2?: number;
  description?: string;
  date?: string | Date;
}

type Activity = StoredActivity;

const normalizeActivityFromApi = (activity: FetchedActivity): Activity => {
  const safeDate = activity?.date ? new Date(activity.date) : new Date();
  return {
    _id: activity._id ?? activity.id ?? createLocalId(),
    type: activity.type ?? 'Unknown activity',
    category: activity.category ?? 'transport',
    value: Number(activity.value ?? 0),
    unit: activity.unit ?? 'unit',
    co2: Number(activity.co2 ?? 0),
    description: activity.description,
    date: safeDate.toISOString().split('T')[0],
  };
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [metricsExpanded, setMetricsExpanded] = useState(true);
  const [serviceMode, setServiceMode] = useState<'live' | 'offline'>('live');
  const [serviceMessage, setServiceMessage] = useState('Connecting to live services...');

  const updateActivities = (newActivity: Activity) => {
    setActivities((prev) => {
      const updated = [newActivity, ...prev];
      persistLocalActivities(updated);
      return updated;
    });
  };

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/activities');
      if (!res.ok) {
        throw new Error('Unable to load activities.');
      }
      const data = await res.json();
      const normalized = Array.isArray(data) ? data.map(normalizeActivityFromApi) : [];
      setActivities(normalized);
      persistLocalActivities(normalized);
      setServiceMode('live');
      setServiceMessage('Live carbon services synced with your account.');
    } catch (err) {
      console.error('Failed to load activities', err);
      setActivities(loadLocalActivities());
      setServiceMode('offline');
      setServiceMessage('Offline mode: activities stay in your browser until the service returns.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    fetchActivities();
  }, [session, status, router, fetchActivities]);

  const addActivity = async (activity: Omit<Activity, '_id'>) => {
    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity),
      });

      if (!res.ok) {
        throw new Error('Service rejected the activity.');
      }

      const saved = await res.json();
      updateActivities(normalizeActivityFromApi(saved));
      setServiceMode('live');
      setServiceMessage('Activity synced with the live carbon service.');
    } catch (err) {
      console.error('Failed to post activity', err);
      updateActivities({ ...activity, _id: createLocalId() });
      setServiceMode('offline');
      setServiceMessage('Live service unreachable. Entry saved locally.');
    } finally {
      setShowForm(false);
    }
  };

  const totalEmissions = activities.reduce((sum, a) => sum + a.co2, 0);
  const categoryData = activities.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + a.co2;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryData).map(([category, co2]) => ({ category, co2 }));

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-emerald-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <div className="container mx-auto px-4 py-10 space-y-8">
        <div className="space-y-2 max-w-3xl">
          <h1 className="text-5xl font-bold text-[var(--foreground)]">Your Carbon Dashboard</h1>
          <p className="text-[var(--muted-text)]">Monitor emissions, identify hot spots, and get tips to reduce your daily impact.</p>
        </div>

        {serviceMessage && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm shadow-inner transition mb-1 ${
              serviceMode === 'live'
                ? 'bg-[var(--surface-dark)] border-[#587055] text-[#f7f2e9]'
                : 'bg-amber-900/90 border-amber-600 text-amber-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaLightbulb className={serviceMode === 'live' ? 'text-dark-emerald-300' : 'text-amber-200'} />
              <span>{serviceMessage}</span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={() => setMetricsExpanded(!metricsExpanded)}
            className="rounded-full border border-[#2d3929] bg-[#4a5f40] px-5 py-2 font-semibold text-white shadow-[0_12px_28px_-18px_rgba(45,57,41,0.75)] transition hover:bg-[#3b4b34]"
          >
            {metricsExpanded ? 'Hide Metrics' : 'Show Metrics'}
          </button>
          <span className="text-sm text-[var(--muted-text)]">Track your ups and downs</span>
        </div>

        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${metricsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl text-[var(--foreground)]">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[var(--foreground)]">Total Emissions</h2>
                <FaChartBar className="text-dark-emerald-300 text-2xl" />
              </div>
              <p className="mb-2 text-4xl font-bold text-[var(--foreground)]">{totalEmissions.toFixed(2)} kg CO₂</p>
              <p className="mb-1 text-sm text-[var(--muted-text)]">Community Average: {communityAverage} kg CO₂</p>
              <p className={`text-sm font-semibold ${totalEmissions < communityAverage ? 'text-dark-emerald-300' : 'text-amber-600'}`}>
                {totalEmissions < communityAverage ? '🎉 Below average' : '⚠️ Above average'}
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl text-[var(--foreground)]">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[var(--foreground)]">Activities Logged</h2>
                <FaPlus className="text-dark-emerald-300 text-2xl" />
              </div>
              <p className="mb-2 text-4xl font-bold text-[var(--foreground)]">{activities.length}</p>
              <p className="text-sm text-[var(--muted-text)]">Keep logging to improve your insights.</p>
            </div>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl text-[var(--foreground)]">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[var(--foreground)]">Filter View</h2>
                <FaFilter className="text-dark-emerald-300 text-2xl" />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[#fffaf1] px-3 py-2 text-sm text-[var(--foreground)] focus:border-dark-emerald-500 focus:ring-2 focus:ring-dark-emerald-300"
              >
                <option value="all">All Categories</option>
                <option value="transport">Transport</option>
                <option value="food">Food</option>
                <option value="energy">Energy</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-full border border-[#2d3929] bg-[#4a5f40] px-6 py-3 font-semibold text-white shadow-[0_14px_30px_-18px_rgba(45,57,41,0.75)] transition hover:bg-[#3b4b34]"
          >
            <FaPlus />
            <span>{showForm ? 'Cancel' : 'Log New Activity'}</span>
          </button>
          <span className="text-sm text-[var(--muted-text)]">Entries stay in local storage when the service is down.</span>
        </div>

        {showForm && (
          <div className="mb-8">
            <ActivityForm onSubmit={addActivity} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EmissionsChart data={chartData} />
          <Tips categoryData={categoryData} />
        </div>

        <Goals activities={activities} />

        <ActivityList activities={activities} filter={filter} />
      </div>
    </div>
  );
}
