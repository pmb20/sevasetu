
import React from 'react';

// Using React.FC to properly type the component and handle the 'key' prop during iteration.
const ServiceCard: React.FC<{ icon: string, title: string, desc: string, tag: string }> = ({ icon, title, desc, tag }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
    <div className="flex justify-between items-start mb-4">
      <div className="text-3xl bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-500">{tag}</span>
    </div>
    <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed mb-6">{desc}</p>
    <button className="text-blue-600 font-bold text-sm flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
      <span>Apply Now</span>
      <span>→</span>
    </button>
  </div>
);

export const PublicServices = () => {
  const services = [
    { icon: '🪪', title: 'Aadhaar Services', desc: 'Update details, download e-Aadhaar, or book appointment at center.', tag: 'IDENTIFICATION' },
    { icon: '🚗', title: 'RTO & Driving', desc: 'Learning license application, RC status, and vehicle registration.', tag: 'TRANSPORT' },
    { icon: '🏥', title: 'Ayushman Bharat', desc: 'Health insurance registration and hospital search near you.', tag: 'HEALTH' },
    { icon: '🏠', title: 'Land Records', desc: 'View digital land records (Bhu-naksha) and ownership details.', tag: 'REVENUE' },
    { icon: '🎓', title: 'Student Scholarships', desc: 'State and central scholarship programs for various categories.', tag: 'EDUCATION' },
    { icon: '🔌', title: 'Utility Bills', desc: 'Pay electricity, water, and gas bills through integrated portal.', tag: 'UTILITIES' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Digital Service Gateway</h1>
        <p className="text-gray-500 mt-2">Access all integrated government services in one place.</p>
      </header>

      <div className="relative mb-8">
        <input 
          type="text" 
          placeholder="Search for services (e.g. 'PAN Card', 'Water Tax')..." 
          className="w-full bg-white p-5 pl-14 rounded-3xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl">🔍</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => <ServiceCard key={i} {...s} />)}
      </div>
    </div>
  );
};
