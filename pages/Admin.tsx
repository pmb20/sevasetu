
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const deptData = [
  { name: 'Infrastructure', value: 400 },
  { name: 'Water Resources', value: 300 },
  { name: 'Sanitation', value: 300 },
  { name: 'Public Health', value: 200 },
];

export const Admin = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administrative Overview</h1>
          <p className="text-gray-500 mt-1">Real-time statistics across all departments.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">Export CSV</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm">Add Officer</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Recent Escalations</h3>
            <div className="overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-wider">
                    <th className="pb-4">Grievance ID</th>
                    <th className="pb-4">Category</th>
                    <th className="pb-4">Citizen</th>
                    <th className="pb-4">Priority</th>
                    <th className="pb-4">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-50">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-4 font-mono font-semibold text-blue-600">SS-440{item}</td>
                      <td className="py-4 text-gray-700">Health Dept.</td>
                      <td className="py-4 text-gray-700">Amit Kumar</td>
                      <td className="py-4">
                        <span className="px-2 py-1 rounded-md bg-red-100 text-red-600 text-[10px] font-bold">CRITICAL</span>
                      </td>
                      <td className="py-4">
                        <button className="text-blue-600 font-bold hover:underline">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-center">Department Share</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deptData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deptData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl text-white shadow-xl shadow-blue-200">
            <div className="text-3xl mb-4">🏆</div>
            <h4 className="font-bold text-lg mb-2">System Performance</h4>
            <p className="text-blue-100 text-sm mb-6">AI models are processing grievances with 98% accuracy this month.</p>
            <div className="w-full bg-blue-400/30 rounded-full h-2 mb-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '98%' }}></div>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-blue-200">Auto-Correction Enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
};
