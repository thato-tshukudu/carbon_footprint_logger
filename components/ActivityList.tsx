'use client';

import { FaList, FaCalendarAlt, FaLeaf } from 'react-icons/fa';

interface Activity {
  _id?: string;
  type: string;
  category: string;
  value: number;
  unit: string;
  co2: number;
  description?: string;
  date: string;
}

interface ActivityListProps {
  activities: Activity[];
  filter: string;
}

export default function ActivityList({ activities, filter }: ActivityListProps) {
  const filteredActivities = filter === 'all' ? activities : activities.filter((a) => a.category === filter);

  return (
    <div className="rounded-3xl border border-[#587055] bg-[var(--surface-dark)] p-8 shadow-2xl text-[#f7f2e9]">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaList className="text-dark-emerald-300" />
        <span>Activity History</span>
      </h2>
      {filteredActivities.length === 0 ? (
        <div className="text-center py-12">
          <FaLeaf className="text-[2.75rem] text-dark-emerald-300 mx-auto mb-4" />
          <p className="text-lg text-[#eef2e8]">No activities logged yet.</p>
          <p className="text-sm text-[#d6ded0]">Start tracking your carbon footprint and watch the chart grow.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <div
              key={activity._id || index}
              className="rounded-2xl border border-[#5d735a] bg-[#415645] p-4 transition hover:bg-[#49604c]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-[180px]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-[#f7f2e9]">{activity.type}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold text-[#223127] ${
                        activity.category === 'transport'
                          ? 'bg-dark-emerald-400'
                          : activity.category === 'food'
                          ? 'bg-dark-emerald-300'
                          : 'bg-dark-emerald-200'
                      }`}
                    >
                      {activity.category}
                    </span>
                  </div>
                  <div className="mb-2 flex flex-wrap items-center gap-4 text-sm text-[#eef2e8]">
                    <span>
                      {activity.value} {activity.unit}
                    </span>
                    <span className="flex items-center gap-1 text-[#d6ded0]">
                      <FaCalendarAlt />
                      <span>{activity.date}</span>
                    </span>
                  </div>
                  {activity.description && (
                    <p className="text-[#d6ded0] text-sm italic">{activity.description}</p>
                  )}
                </div>
                <div className="text-right min-w-[90px]">
                  <div className="text-2xl font-bold text-dark-emerald-300">{activity.co2.toFixed(2)}</div>
                  <div className="text-sm text-[#d6ded0]">kg CO₂</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
