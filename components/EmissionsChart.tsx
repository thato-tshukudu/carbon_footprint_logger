'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaChartBar } from 'react-icons/fa';

interface EmissionsChartProps {
  data: { category: string; co2: number }[];
}

export default function EmissionsChart({ data }: EmissionsChartProps) {
  return (
    <div className="rounded-3xl border border-[#587055] bg-[var(--surface-dark)] p-8 shadow-2xl text-[#f7f2e9]">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaChartBar className="text-dark-emerald-300" />
        <span>Emissions by Category</span>
      </h2>
      {data.length === 0 ? (
        <div className="text-center py-12">
          <FaChartBar className="text-[2.75rem] text-dark-emerald-300 mx-auto mb-4" />
          <p className="text-lg text-[#eef2e8]">No data to display yet.</p>
          <p className="text-sm text-[#d6ded0]">Log some activities to see your emissions breakdown!</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#60765c" />
            <XAxis dataKey="category" tick={{ fill: '#f2eee5', fontSize: 12 }} axisLine={{ stroke: '#60765c' }} />
            <YAxis
              tick={{ fill: '#f2eee5', fontSize: 12 }}
              axisLine={{ stroke: '#60765c' }}
              label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft', fill: '#f2eee5' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f8f3ea',
                border: '1px solid #d8cebd',
                borderRadius: '8px',
                boxShadow: '0 10px 30px -12px rgba(0, 0, 0, 0.6)',
                color: '#253329',
              }}
              formatter={(value: number | undefined) =>
                value != null ? [`${value.toFixed(2)} kg CO₂`, 'Emissions'] : ['0 kg CO₂', 'Emissions']
              }
            />
            <Bar dataKey="co2" fill="#0ef1a2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
