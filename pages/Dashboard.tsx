
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { GrievanceStatus } from '../types';

const data = [
  { name: 'Jan', count: 12 },
  { name: 'Feb', count: 19 },
  { name: 'Mar', count: 15 },
  { name: 'Apr', count: 22 },
  { name: 'May', count: 30 },
  { name: 'Jun', count: 25 },
];

const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: string, color: string }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-2xl mb-4`}>
      {icon}
    </div>
    <p className="text-gray-500 text-sm font-medium">{title}</p>
    <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
  </div>
);

const RecentGrievances = () => {
  const grievances = [
    { id: 'GS-882', title: 'Street light repair', status: GrievanceStatus.RESOLVED, date: '2023-10-24' },
    { id: 'GS-901', title: 'Pothole in Sector 14', status: GrievanceStatus.IN_PROGRESS, date: '2023-10-25' },
    { id: 'GS-915', title: 'Water supply delay', status: GrievanceStatus.PENDING, date: '2023-10-26' },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold mb-6">Recent Activities</h3>
      <div className="space-y-4">
        {grievances.map((g) => (
          <div key={g.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-xl shadow-sm">📑</div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{g.title}</p>
                <p className="text-xs text-gray-400">ID: {g.id} • {g.date}</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
              g.status === GrievanceStatus.RESOLVED ? 'bg-green-100 text-green-700' :
              g.status === GrievanceStatus.IN_PROGRESS ? 'bg-blue-100 text-blue-700' :
              'bg-amber-100 text-amber-700'
            }`}>
              {g.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Jayesh</h1>
        <p className="text-gray-500 mt-2">Here is the summary of your interactions with government services.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Grievances" value="12" icon="📋" color="bg-blue-50" />
        <StatCard title="Resolved" value="8" icon="✅" color="bg-green-50" />
        <StatCard title="In Progress" value="3" icon="⏳" color="bg-amber-50" />
        <StatCard title="Response Rate" value="94%" icon="⚡" color="bg-purple-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Grievance Trends</h3>
            <select className="bg-gray-50 text-sm border-none rounded-lg px-3 py-2 outline-none">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#2563eb' : '#93c5fd'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <RecentGrievances />
      </div>
    </div>
  );
};
